/*
 * Declarations
 */
let contract_CGV = '';
let contract_CHINGGU = '';
let contract_MBTINFT = '';
let account = '';

const NFT_TOKEN_ID = 124; // [demo feature]

/* 
 * Initialize functions
 */
async function connectMetamask() {
  // metamask installed
  if (typeof window.ethereum !== 'undefined') {
    // set global variables (contract, account)
    window.web3 = new Web3(window.ethereum);
    contract_CGV = await new window.web3.eth.Contract(CONTRACT_CGV_ABI, CONTRACT_CGV_ADDR);
    contract_CHINGGU = await new window.web3.eth.Contract(CONTRACT_CHINGGU_ABI, CONTRACT_CHINGGU_ADDR);
    contract_MBTINFT = await new window.web3.eth.Contract(CONTRACT_MBTINFT_ABI, CONTRACT_MBTINFT_ADDR);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    return true;
  }

  // metamask not installed
  else {
    $('.showMetamaskStatus').html("Error!");
    $('#connect_metamask_button').attr('data-bs-original-title', "Metamask required").tooltip('show');
    return false;
  }
}

/* 
 * Getter functions
 */
async function getBalanceOfCGV(_contract, _account) {
  if (_contract === '' || _account === '') return;
  let token_remain = BigInt(await balanceOf_CGV(_contract, _account));
  let token_int = token_remain / BigInt(1000000000000000000);
  let token_float = token_remain % BigInt(1000000000000000000);
  let token_string = token_int.toString() + '.' + token_float.toString().substr(0, 3);
  return token_string;
}

async function getAllowanceOfCGV(_contract, _account, _spender) {
  if (_contract === '' || _account === '') return;
  let allowance = await allowance_CGV(_contract, _account, _spender);
  return allowance;
}

async function getInferencePrice(_contract, _account) {
  if (_contract === '' || _account === '') return;
  let response = await allPriorities_MBTINFT(_contract, _account);
  let price = parseInt(response['maxP']) + 1; // [demo feature] return fastest price
  return price;
}

/* 
 * Request functions
 */
async function requestApprove(_contract, _account, _spender, _amount) {
  if (_contract === '' || _account === '') return;
  $('#approve-text').text('승인중..');
  let response = await approve_CGV(_contract, _account, _spender, _amount);
  updateApprovalText(_contract, _account, _spender);
}

async function requestMint(_contract, _account, _token_id) {
  if (_contract === '' || _account === '') return;
  let response = await mint_CHINGGU(_contract, _account, _token_id);
}

async function requestUpload(_contract, _account, _key, _max_length, _inference_price) {
  if (_contract === '' || _account === '') return;
  let response = await upload_MBTINFT(_contract, _account, _key, _max_length, _inference_price);
}

async function requestMessageKey(_contract, _account, _token_id, _mode, _prompt, _temperature, _response_length) {
  if (_contract === '' || _account === '') return;
  let nonce = await nonces_MBTINFT(_contract, _account, _token_id);
  try {
    let message_key = await upload_SERVER(_account, _token_id, nonce, _mode, _prompt, _temperature, _response_length);
    if (typeof message_key.data === 'undefined') {
      console.log("----> error! return.", message_key);
      return;
    } else {
      message_key = message_key.data.key;
      return message_key;
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

async function requestReply(_key) {
  if (_key === '' || typeof _key === 'undefined') return;
  let reply_message = await download_SERVER(_key);
  return reply_message;
}