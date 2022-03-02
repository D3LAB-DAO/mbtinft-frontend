/*
 * Declarations
 */
let contract_CGV = '';
let contract_CHINGGU = '';
let contract_MBTINFT = '';
let account = '';
let tokenID = '';

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

async function getInferencePrice(_contract, _account, _inference_price) {
  if (_contract === '' || _account === '') return;
  switch(parseInt(_inference_price)) {
    case FASTEST: return parseInt(await fastest_MBTINFT(_contract, _account));
    case FASTER: return parseInt(await faster_MBTINFT(_contract, _account));
    case AVERAGE: return parseInt(await average_MBTINFT(_contract, _account));
    case SLOWER: return parseInt(await slower_MBTINFT(_contract, _account));
    case SLOWEST: return parseInt(await slowest_MBTINFT(_contract, _account));
  }
  return 0;
}

async function getFriendtokenIDList(_contract, _account) {
  if (_contract === '' || _account === '') return;
  let friends = await collectables_CHINGGU(_contract, _account);
  return friends;
}

async function getFriendProperties(_contract, _account, _token_id) {
  if (_contract === '' || _account === '') return;
  let properties = await properties_CHINGGU(_contract, _account, _token_id);

  // parse to int
  properties['amount'] = parseInt(properties['amount']);
  properties['decision'] = parseInt(properties['decision']);
  properties['energy'] = parseInt(properties['energy']);
  properties['information'] = parseInt(properties['information']);
  properties['love'] = parseInt(properties['love']);
  properties['popularity'] = parseInt(properties['popularity']);
  properties['rarity'] = parseInt(properties['rarity']);
  properties['relate'] = parseInt(properties['relate']);
  properties['sp'] = parseInt(properties['sp']);

  properties[0] = parseInt(properties[0]);
  properties[1] = parseInt(properties[1]);
  properties[2] = parseInt(properties[2]);
  properties[3] = parseInt(properties[3]);
  properties[4] = parseInt(properties[4]);
  properties[5] = parseInt(properties[5]);
  properties[6] = parseInt(properties[6]);
  properties[7] = parseInt(properties[7]);
  properties[8] = parseInt(properties[8]);
  return properties;
}

async function getMbtiString(_contract, _account, _energy, _information, _decision, _relate) {
  if (_contract === '' || _account === '') return;
  let mbti = await getMBTI_CHINGGU(_contract, _account, _energy, _information, _decision, _relate);
  return mbti;
}

/* 
 * Request functions
 */
async function requestApprove(_contract, _account, _spender) {
  if (_contract === '' || _account === '') return;
  $('#approve-text').text('승인중..');
  let response = await approveMax_CGV(_contract, _account, _spender);
  updateApprovalText(_contract, _account, _spender);
}

async function requestMint(_contract, _account, _job) {
  if (_contract === '' || _account === '') return;
  let response = await mint_CHINGGU(_contract, _account, _job);
}

async function requestUpload(_contract, _account, _key, _token_id, _max_length, _inference_price) {
  if (_contract === '' || _account === '') return;
  let response = await upload_MBTINFT(_contract, _account, _key, _token_id, _max_length, _inference_price);
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

async function requestMintCGV(_contract, _account, _amount) {
  if (_contract === '' || _account === '') return;
  let response = await mint_CGV(_contract, _account, _amount);
}

async function requestTeach(_contract, _account, _token_id, _E, _I, _S, _N, _T, _F, _J, _P) {
  if (_contract === '' || _account === '') return;

  // before teach
  $('button#teach').removeClass('is-success');
  $('button#teach').addClass('is-error');
  $('span#teach').text('업데이트중..');

  // request teach
  await teach_CHINGGU(_contract, _account, _token_id, _E, _I, _S, _N, _T, _F, _J, _P);

  // after teach
  await updateFriendInfoOnClick(_token_id);
  $('button#teach').removeClass('is-error');
  $('button#teach').addClass('is-success');
  $('span#teach').text('💸업데이트');
}