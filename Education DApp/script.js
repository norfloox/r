const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const contractABI = [...]; // Replace with your contract ABI

const web3 = new Web3(window.ethereum);

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function loadStudentInfo() {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];

    if (account) {
        const studentInfo = await contract.methods.students(account).call();
        document.getElementById('studentName').innerText = studentInfo.name;
        document.getElementById('studentAge').innerText = studentInfo.age;
    }
}

async function loadCourseList() {
    const courseList = await contract.methods.courses().call();
    const ul = document.getElementById('courseList');
    ul.innerHTML = '';
    courseList.forEach((course, index) => {
        const li = document.createElement('li');
        li.innerText = `Course ${index}: ${course.name} (Fee: ${course.fee} ETH)`;
        ul.appendChild(li);
    });
}

async function enroll() {
    const courseIndex = document.getElementById('enrollCourseIndex').value;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const account = accounts[0];

    if (account) {
        try {
            await contract.methods.enrollStudent(courseIndex).send({ from: account });
            alert('Enrollment successful!');
        } catch (error) {
            alert('Enrollment failed: ' + error.message);
        }
    }
}

loadStudentInfo();
loadCourseList();
