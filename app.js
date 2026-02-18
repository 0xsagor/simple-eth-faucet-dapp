const CONTRACT_ADDRESS = "PASTE_DEPLOYED_ADDRESS";

const ABI = [
  "function requestFunds() external",
];

let provider;
let signer;
let contract;

const statusEl = document.getElementById("status");

document.getElementById("connect").onclick = async () => {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  statusEl.innerText = "Wallet Connected";
};

document.getElementById("claim").onclick = async () => {
  try {
    const tx = await contract.requestFunds();
    statusEl.innerText = "Transaction sent...";
    await tx.wait();
    statusEl.innerText = "ETH received!";
  } catch (err) {
    statusEl.innerText = err.reason || err.message;
  }
};
