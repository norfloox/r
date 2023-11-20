window.addEventListener("load", async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your smart contract address
        const contractABI = []; // Replace with your smart contract ABI

        window.contract = new web3.eth.Contract(contractABI, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        document.getElementById("userAddress").textContent = userAddress;

        updateBalances();
    } else {
        console.error(
            "Web3 not found. Please install a Web3-enabled browser like MetaMask."
        );
    }
});

async function updateBalances() {
    const userBalance = await contract.methods
        .getBalance()
        .call({ from: web3.eth.defaultAccount });
    const contractBalance = await contract.methods
        .getContractBalance()
        .call({ from: web3.eth.defaultAccount });

    document.getElementById("userBalance").textContent = userBalance + " ETH";
    document.getElementById("contractBalance").textContent = contractBalance + " ETH";
}

async function depositFunds() {
    const amount = document.getElementById("depositAmount").value;
    await contract.methods
        .deposit()
        .send({
            from: web3.eth.defaultAccount,
            value: web3.utils.toWei(amount, "ether"),
        });
    updateBalances();
}

async function withdrawFunds() {
    const amount = document.getElementById("withdrawAmount").value;
    await contract.methods
        .withdraw(web3.utils.toWei(amount, "ether"))
        .send({ from: web3.eth.defaultAccount });
    updateBalances();
}
