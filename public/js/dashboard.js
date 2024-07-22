document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.href = '/index.html';
});

document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    const response = await fetch('/api/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken')
        }
    });
    const data = await response.json();
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.subject}</td>
            <td>${item.marks}</td>
            <td>
                <button onclick="openEditModal('${item._id}', '${item.name}', '${item.subject}', '${item.marks}')">Edit</button>
                <button onclick="deleteData('${item._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function openEditModal(id, name, subject, marks) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-subject').value = subject;
    document.getElementById('edit-marks').value = marks;
    document.getElementById('edit-modal').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});

document.getElementById('edit-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const subject = document.getElementById('edit-subject').value;
    const marks = document.getElementById('edit-marks').value;

    const response = await fetch('/api/data', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ id, name, subject, marks })
    });
    const result = await response.json();
    document.getElementById('edit-modal').style.display = 'none';
    fetchData();
});

document.getElementById('add-data-button').addEventListener('click', () => {
    document.getElementById('add-modal').style.display = 'block';
});

document.querySelector('.close-add').addEventListener('click', () => {
    document.getElementById('add-modal').style.display = 'none';
});

document.getElementById('add-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('add-name').value;
    const subject = document.getElementById('add-subject').value;
    const marks = parseInt(document.getElementById('add-marks').value);

    const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('authToken')
        },
        body: JSON.stringify({ name, subject, marks })
    });
    const result = await response.json();
    document.getElementById('add-modal').style.display = 'none';
    fetchData();
});

async function deleteData(id) {
    if (confirm('Are you sure you want to delete this data?')) {
        try {
            const response = await fetch(`/api/data/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('authToken')
                }
            });
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.msg || 'Failed to delete data');
            }
            const result = await response.json();
            fetchData();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    }
}
