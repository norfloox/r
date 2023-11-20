// Import Web3.js library and create a new instance
// const Web3 = require('web3');
// const web3 = new Web3('http://localhost:8545'); // Update with your Ethereum node URL

// Define your contract address and ABI
// const contractAddress = '<YOUR_CONTRACT_ADDRESS>';
// const contractABI = <'YOUR_CONTRACT_ABI'>;

// Instantiate the contract
// const contract = new web3.eth.Contract(contractABI, contractAddress);

const candidateAll = [
    {
        name: "Anik",
        voteCount: 0,
    },
    {
        name: "Varun",
        voteCount: 0,
    },
    {
        name: "Mitesh",
        voteCount: 0,
    },
];

// Function to populate the candidate select dropdown
async function populateCandidates() {
    const candidateList = document.getElementById("candidate-list");
    const candidateSelect = document.getElementById("candidate-select");

    // const candidatesCount = await contract.methods.candidatesCount().call();
    const candidatesCount = candidateAll.length;

    for (let i = 0; i < candidatesCount; i++) {
        // const candidate = await contract.methods.candidates(i).call();
        const candidate = candidateAll[i];
        console.log(candidate);
        candidateList.innerHTML += `<li>${candidate.name}: ${candidate.voteCount} votes</li>`;
        candidateSelect.innerHTML += `<option value="${i}">${candidate.name}</option>`;
    }
}

// Function to handle the vote button click event
async function vote() {
    const candidateId = document.getElementById("candidate-select").value;

    try {
        // await contract.methods.vote(candidateId).send({ from: web3.eth.defaultAccount });
        alert("Vote recorded successfully!");
        // populateCandidates();
        displayResults();
    } catch (error) {
        console.error(error);
        alert("Error: Unable to vote.");
    }
}

// Function to display voting results
async function displayResults() {
    const resultsList = document.getElementById('results-list');

    // const candidatesCount = await contract.methods.candidatesCount().call();

    resultsList.innerHTML = ''; // Clear previous results

    for (let i = 1; i <= candidateAll.length; i++) {
        // const candidate = await contract.methods.candidates(i).call();
        const candidate = candidateAll[i];
        resultsList.innerHTML += `<li>${candidate.name}: ${candidate.voteCount} votes</li>`;
    }
}

// Main function
window.addEventListener("load", async () => {
    // Enable Web3 provider (e.g., MetaMask)
    // if (window.ethereum) {
    //     await window.ethereum.enable();
    //     web3.eth.defaultAccount = window.ethereum.selectedAddress;
    // } else {
    //     alert('Please install MetaMask or another Ethereum wallet to use this application.');
    // }

    // Populate candidates and display results
    populateCandidates();
    displayResults();

    // Add event listener for the vote button
    document.getElementById('vote-button').addEventListener('click', vote);
});
