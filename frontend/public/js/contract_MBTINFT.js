/* MBTINFT (main) */
const CONTRACT_MBTINFT_ADDR = '0xD66D074037EB5A9ea54324f93BF021BeC9234162';
const CONTRACT_MBTINFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "cgv_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "chinggu_",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "inferencer_",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "name": "accounts",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cgv",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "chinggu",
    "outputs": [
      {
        "internalType": "contract IERC721",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "inferencer",
    "outputs": [
      {
        "internalType": "contract InferencerInterface",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "name": "keys",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "lockedTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "pending",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
    "name": "permit_nonces",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "queue",
    "outputs": [
      {
        "internalType": "int128",
        "name": "idCount",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "name": "tokenIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "cgv_",
        "type": "address"
      }
    ],
    "name": "setCgv",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "chinggu_",
        "type": "address"
      }
    ],
    "name": "setChinggu",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "inferencer_",
        "type": "address"
      }
    ],
    "name": "setInferencer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMax",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "id",
        "type": "int128"
      }
    ],
    "name": "getById",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "i",
        "type": "uint256"
      }
    ],
    "name": "getByIndex",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "size",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "idCount",
    "outputs": [
      {
        "internalType": "int128",
        "name": "",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "id",
        "type": "int128"
      }
    ],
    "name": "indices",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allPriorities",
    "outputs": [
      {
        "internalType": "int128[]",
        "name": "ps",
        "type": "int128[]"
      },
      {
        "internalType": "int128",
        "name": "maxP",
        "type": "int128"
      },
      {
        "internalType": "int128",
        "name": "minP",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "fastest",
    "outputs": [
      {
        "internalType": "int128",
        "name": "p",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "faster",
    "outputs": [
      {
        "internalType": "int128",
        "name": "p",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "average",
    "outputs": [
      {
        "internalType": "int128",
        "name": "p",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "slower",
    "outputs": [
      {
        "internalType": "int128",
        "name": "p",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "slowest",
    "outputs": [
      {
        "internalType": "int128",
        "name": "p",
        "type": "int128"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "inferencePrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "permit",
    "outputs": [
      {
        "internalType": "int128",
        "name": "id",
        "type": "int128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "key",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "inferencePrice",
        "type": "uint256"
      }
    ],
    "name": "upload",
    "outputs": [
      {
        "internalType": "int128",
        "name": "id",
        "type": "int128"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int128",
        "name": "id",
        "type": "int128"
      }
    ],
    "name": "cancle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "inference",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "maxLength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "inferencePrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "inferenceWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "E",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "I",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "S",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "N",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "T",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "F",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "J",
        "type": "uint64"
      },
      {
        "internalType": "uint64",
        "name": "P",
        "type": "uint64"
      }
    ],
    "name": "teach",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];