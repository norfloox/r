const Web3 = require("web3");
const web3 = new Web3("YOUR_ETHEREUM_NODE_URL");
const contractAddress = "YOUR_CONTRACT_ADDRESS";

const educationalCertificatesContract = new web3.eth.Contract(ABI, contractAddress);

// Assuming you have a student's Ethereum address and the certificate details
const studentAddress = "STUDENT_ETHEREUM_ADDRESS";
const institution = "Your University";
const degree = "Computer Science";
const year = 2023;

educationalCertificatesContract.methods
    .storeCertificate(institution, degree, year)
    .send({ from: studentAddress })
    .on("transactionHash", function (hash) {
        console.log("Transaction hash:", hash);
    })
    .on("receipt", function (receipt) {
        console.log("Certificate stored successfully");
    });
