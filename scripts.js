function validateForm() {
    const name = document.getElementById('name').value;
    const dept = document.getElementById('dept').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const namePattern = /^[A-Za-z\s]+$/;
    const deptPattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phonePattern = /^\d{10}$/;

    if (!namePattern.test(name)) {
        alert("Name must contain only letters and spaces.");
        return false;
    }

    if (!deptPattern.test(dept)) {
        alert("Department must contain only letters and spaces.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Email must be in the format example@gmail.com.");
        return false;
    }

    if (!phonePattern.test(phone)) {
        alert("Phone number must be 10 digits.");
        return false;
    }

    return true;
}

function submitForm() {
    if (!validateForm()) return;
    
    const name = document.getElementById('name').value;
    const dept = document.getElementById('dept').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const userData = {
        name: name,
        dept: dept,
        email: email,
        phone: phone
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('actions').style.display = 'block';
}

function editData() {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users && users.length > 0) {
        const userData = users[users.length - 1]; // Edit the last added user

        document.getElementById('name').value = userData.name;
        document.getElementById('dept').value = userData.dept;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;

        document.getElementById('submitBtn').style.display = 'inline-block';
        document.getElementById('actions').style.display = 'none';

        // Remove the user to update with new data
        users.pop();
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function deleteData() {
    localStorage.removeItem('users');
    
    document.getElementById('loginForm').reset();
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('displayData').style.display = 'none';
}

function displayAllUsers() {
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users) {
        const userDetails = document.getElementById('userDetails');
        userDetails.innerHTML = ''; // Clear existing data
        users.forEach(userData => {
            userDetails.innerHTML += `
                <tr>
                    <td>${userData.name}</td>
                    <td>${userData.dept}</td>
                    <td>${userData.email}</td>
                    <td>${userData.phone}</td>
                </tr>
            `;
        });
        document.getElementById('displayData').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    clearForm();
});

function clearForm() {
    document.getElementById('loginForm').reset();
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('actions').style.display = 'none';
    document.getElementById('displayData').style.display = 'none';
}
