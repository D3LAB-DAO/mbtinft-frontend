var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

const PAGES = ['startPage', 'trainingPage', 'chattingPage'];

function movePage(targetIdx) {
  var idx;
  for (idx = 0; idx < PAGES.length; idx++) {
    if ( idx == targetIdx ) $('#'+PAGES[idx]).show();
    else $('#'+PAGES[idx]).hide();
  }
}

function sendMessage() {
    var message = $('input#message_field').val();
    var message_html = `
    <section class="message -right">
        <div class="nes-balloon from-right chat-balloon">
            <p>` + message + `</p>
        </div>
        <i><img src="../src/intp.png" style="width:100px; height:100px;"></i>
    </section>
    `;
    $(".message-list").append(message_html);
    $('input#message_field').val('');
    window.scrollTo(0,document.body.scrollHeight);
}