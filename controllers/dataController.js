const Data = require('../models/Data');

exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.addData = async (req, res) => {
  const { name, subject, marks } = req.body;
  try {
    let existingData = await Data.findOne({ name, subject });
    if (existingData) {

      existingData.marks += marks;
      await existingData.save();
      res.json(existingData);
    } else {
      const newData = new Data({ name, subject, marks });
      const data = await newData.save();
      res.json(data);
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
};


exports.updateData = async (req, res) => {
  const { id, name, subject, marks } = req.body;
  try {
    let data = await Data.findById(id);
    if (!data) return res.status(404).json({ msg: 'Data not found' });

    data.name = name;
    data.subject = subject;
    data.marks = marks;

    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    await Data.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Data removed' });
  } catch (err) {
    console.error('Error deleting data:', err.message);
    res.status(500).json({ msg: 'Server error while deleting data' });
  }
};
