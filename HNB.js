function searchEmployee() {
    const employeeId = document.getElementById('employee-id').value;

    if (!employeeId) {
        alert('Please enter an Employee ID.');
        return;
    }

    console.log('Sending request to backend...');
    fetch('http://localhost:3000/getEmployeeDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId }),
    })
        .then(response => {
            console.log('Received response:', response);
            if (!response.ok) {
                throw new Error('Employee not found or server error.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Employee data:', data);
            displayEmployeeDetails(data);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Employee not found or an error occurred.');
        });
}
