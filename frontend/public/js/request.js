var account = '';
var token_remain = 0.000;

async function connectMetamask() {
  if (typeof window.ethereum !== 'undefined') {
    // Metamask installed
    window.web3 = new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    $('.showMetamaskStatus').html(account.substr(0, 4) + '..' + account.substr(account.length-2, 2));
    $('#connect_metamask_button').attr('data-bs-original-title', account).tooltip('show');
    $('#coin_icon').attr('data-bs-original-title', token_remain.toFixed(3) + ' CGV').tooltip('hide');
    $('#mint_tooltip').attr('data-bs-original-title', '함께할 칭구를 선택하세요!').tooltip('hide');
    $('#mint_button').attr('disabled', false);
    $('.nav-profile').css("visibility", "visible");
    console.log(window.contract);
  } else {
    // Metamask not installed
    $('.showMetamaskStatus').html("Error!");
    $('#connect_metamask_button').attr('data-bs-original-title', "Metamask required").tooltip('show');
  }
}

async function mintNFT() {
    var checked_profile = $(':radio[name="profiles"]:checked').val();
    console.log(checked_profile);
    if (typeof checked_profile !== 'undefined') {
      // TODO 'checked_profile' 넘기기
      $('#mint_tooltip').attr('data-bs-original-title', '').tooltip('hide');
      let response = await window.contract.methods.mintNFT(0, account).send({ from: account });
      console.log(response);
    }
}

async function echo(msg) {
    let response = await window.contract.methods.echo(msg).send({ from: account });
    var reply_message = response.events.Echo.returnValues[0];
    return reply_message;
}

/* curl test */
function sendInferenceReq(msg, response_len, temp) {
    /* curl -X POST -H 'Content-Type: application/json' http://44.200.190.196:33327/predict -d '{"prompt": "안녕하세요"}' */
    var querydata = '{"prompt": "' + msg + '", "temperature": ' + temp + ', "max_length": ' + response_len + '}';
    console.log("Send prompt", querydata);
    return $.ajax({
      url: 'http://44.200.190.196:33327/predict',
      type: 'POST',
      contentType: 'application/json',
      data: querydata
    });
}