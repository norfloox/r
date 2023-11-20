const Web3 = require('web3');
const contractAbi = [...]; // Your contract's ABI
const contractAddress = '0x...'; // Your contract's address

const web3 = new Web3('http://localhost:8545'); // Connect to your Ethereum node

const healthcareContract = new web3.eth.Contract(contractAbi, contractAddress);

document.addEventListener('DOMContentLoaded', () => {
    const registerDoctorButton = document.getElementById('registerDoctor');
    const registerPatientButton = document.getElementById('registerPatient');
    const assignDoctorButton = document.getElementById('assignDoctor');
    const updateDiagnosisButton = document.getElementById('updateDiagnosis');

    registerDoctorButton.addEventListener('click', async () => {
        const doctorName = document.getElementById('doctorName').value;
        await healthcareContract.methods.registerDoctor(doctorName).send({ from: web3.eth.accounts[0] });
    });

    registerPatientButton.addEventListener('click', async () => {
        const patientName = document.getElementById('patientName').value;
        const patientAge = document.getElementById('patientAge').value;
        await healthcareContract.methods.addPatient(patientName, patientAge, '').send({ from: web3.eth.accounts[0] });
    });

    assignDoctorButton.addEventListener('click', async () => {
        const patientAddress = web3.eth.accounts[0]; // Replace with the patient's address
        const doctorAddress = web3.eth.accounts[1]; // Replace with the doctor's address
        await healthcareContract.methods.assignDoctor(patientAddress, doctorAddress).send({ from: web3.eth.accounts[1] });
    });

    updateDiagnosisButton.addEventListener('click', async () => {
        const diagnosis = document.getElementById('diagnosis').value;
        await healthcareContract.methods.updateDiagnosis(diagnosis).send({ from: web3.eth.accounts[1] });
    });
});
