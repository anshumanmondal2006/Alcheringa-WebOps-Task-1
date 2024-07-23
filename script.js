document.addEventListener('DOMContentLoaded', () => {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById('userTable');
            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="fullName">${user.firstName} ${user.lastName}</td>
                    <td class="username">${user.username}</td>
                    <td class="email">${user.email}</td>
                    <td>
                        <button class="edit" onclick="editRow(this)"><i class="fas fa-edit"></i>Edit</button>
                        <button class="delete" onclick="deleteRow(this)"><i class="fas fa-trash"></i>Delete</button>
                    </td>
                `;
                userTable.appendChild(row);
            });
        });

    window.toggleDropdown = (id) => {
        const dropdown = document.getElementById(id);
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    };
});

function editRow(button) {
    const row = button.closest('tr');
    const fullNameCell = row.querySelector('.fullName');
    const usernameCell = row.querySelector('.username');
    const emailCell = row.querySelector('.email');

    if (button.innerText.trim() === 'Edit') {
        fullNameCell.innerHTML = `<input type="text" value="${fullNameCell.innerText}">`;
        usernameCell.innerHTML = `<input type="text" value="${usernameCell.innerText}">`;
        emailCell.innerHTML = `<input type="text" value="${emailCell.innerText}">`;
        button.innerHTML = '<i class="fas fa-save"></i>Save';
        button.classList.remove('edit');
        button.classList.add('save');
    } else {
        const newFullName = fullNameCell.querySelector('input').value;
        const newUsername = usernameCell.querySelector('input').value;
        const newEmail = emailCell.querySelector('input').value;

        fullNameCell.innerText = newFullName;
        usernameCell.innerText = newUsername;
        emailCell.innerText = newEmail;
        button.innerHTML = '<i class="fas fa-edit"></i>Edit';
        button.classList.remove('save');
        button.classList.add('edit');
    }
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}
