// Handle Login
const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('login-container');
const uploadContainer = document.getElementById('upload-container');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Static check for login
    if (username === 'admin' && password === 'admin') {
        // Hide login form and show upload dashboard
        loginContainer.classList.add('hidden');
        uploadContainer.classList.remove('hidden');
    } else {
        loginError.textContent = 'Invalid username or password!';
    }
});

// Handle Document Upload
const uploadForm = document.getElementById('uploadForm');
const documentTableBody = document.querySelector('#documentTable tbody');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const customerName = document.getElementById('customerName').value;
    const panCard = document.getElementById('panCard').files[0];
    const aadharCard = document.getElementById('aadharCard').files[0];
    const salarySlip = document.getElementById('salarySlip').files[0];

    if (panCard && aadharCard && salarySlip) {
        addDocumentRow(customerName, 'PAN Card', 'Uploaded', panCard);
        addDocumentRow(customerName, 'Aadhar Card', 'Uploaded', aadharCard);
        addDocumentRow(customerName, 'Salary Slip', 'Uploaded', salarySlip);
    }

    // Clear form
    uploadForm.reset();
});

// Function to add a row to the document table with Edit and Delete buttons
function addDocumentRow(customerName, documentType, status, file) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${customerName}</td>
        <td>${documentType}</td>
        <td>${status}</td>
        <td class="action-buttons">
            <button class="view-btn">View</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;
    documentTableBody.appendChild(row);

    // Handle View button
    const viewButton = row.querySelector('.view-btn');
    viewButton.addEventListener('click', () => {
        const objectUrl = URL.createObjectURL(file);
        window.open(objectUrl, '_blank');
    });

    // Handle Delete button
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        row.remove();
    });

    // Handle Edit button
    const editButton = row.querySelector('.edit-btn');
    editButton.addEventListener('click', () => {
        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.addEventListener('change', (event) => {
            const newFile = event.target.files[0];
            if (newFile) {
                file = newFile; // Replace the old file with the new one
                alert('Document updated successfully!');
            }
        });
        newFileInput.click(); // Trigger the file selection dialog
    });
}
