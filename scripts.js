function searchEmployee() {
    const employeeId = document.getElementById('employee-id').value;

    if (!employeeId) {
        alert('Please enter an Employee ID.');
        return;
    }

    fetch('http://localhost:3000/getEmployeeDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ epf: employeeId }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Employee not found.');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('employee-details').innerHTML = `
                <h2>Employee Details</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>Position:</strong> ${data.position}</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('employee-details').innerHTML = `
                <p style="color: red;">Employee not found.</p>
            `;
        });
}
