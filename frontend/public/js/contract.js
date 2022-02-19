const CONTRACT_ADDR = '0xbC8329e74De0Ee0A91f05aEc7387eEe27Fc09235';
const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "_echo",
				"type": "string"
			}
		],
		"name": "Echo",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "input",
				"type": "string"
			}
		],
		"name": "echo",
		"outputs": [
			{
				"internalType": "string",
				"name": "output",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "helloWorld",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner_",
				"type": "address"
			}
		],
		"name": "mintNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nft",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];