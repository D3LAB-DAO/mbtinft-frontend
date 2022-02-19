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
    console.log("Response:" + response.events.Echo.returnValues[0]);
    var message_html = `
    <section class="message -left">
            <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
            <div class="nes-balloon from-left chat-balloon">
              <p>네에~ ` + reply_message + `~</p>
            </div>
          </section>
    `;
    setLoadingStatus(false, false);
    $(".message-list").append(message_html);
    window.scrollTo(0,document.body.scrollHeight);
}