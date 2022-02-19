var account = '';

async function connectMetamask() {
  if (typeof window.ethereum !== 'undefined') {
    // Metamask installed
    window.web3 = new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDR);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    $('.showMetamaskStatus').html(account.substr(0, 4) + '..' + account.substr(account.length-2, 2));
    $('#connectMetamaskButton').attr('data-bs-original-title', account).tooltip('show');
    console.log(window.contract)
  } else {
    // Metamask not installed
    $('.showMetamaskStatus').html("Error!");
    $('#connectMetamaskButton').attr('data-bs-original-title', "Metamask required").tooltip('show');
  }
}

async function mintNFT() {
    let response = await window.contract.methods.mintNFT(0, account).send({ from: account });
    console.log(response);
}

async function echo(msg) {
    let response = await window.contract.methods.echo(msg).send({ from: account });
    var reply_message = response.events.Echo.returnValues[0];
    return reply_message;
}

/* curl test */
function sendInferenceReq(msg) {
    /* curl -X POST -H 'Content-Type: application/json' http://44.200.190.196:33327/predict -d '{"prompt": "안녕하세요"}' */
    var querydata = '{"prompt": "' + msg + '", "temperature": 0.8, "max_length": 128}';
    console.log("Send prompt", querydata);
    return $.ajax({
      url: 'http://44.200.190.196:33327/predict',
      type: 'POST',
      contentType: 'application/json',
      data: querydata
    });
}