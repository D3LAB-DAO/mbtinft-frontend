var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

const PAGES = ['startPage', 'trainingPage', 'chattingPage'];

async function connectMetamask() {
  if (typeof window.ethereum !== 'undefined') {
    // Metamask installed
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    $('.showMetamaskStatus').html(account.substr(0, 4) + '..' + account.substr(account.length-2, 2));
    $('#connectMetamaskButton').attr('data-bs-original-title', account).tooltip('show');
  } else {
    // Metamask not installed
    $('.showMetamaskStatus').html("Error!");
    $('#connectMetamaskButton').attr('data-bs-original-title', "Metamask required").tooltip('show');
  }
}

function movePage(targetIdx) {
  var idx;
  for (idx = 0; idx < PAGES.length; idx++) {
    if ( idx == targetIdx ) $('#'+PAGES[idx]).show();
    else $('#'+PAGES[idx]).hide();
  }
}