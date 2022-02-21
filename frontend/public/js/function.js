var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

var response_length = 128;
var temperature = 0.8;
var inference_price = 2;

const PAGES = ['startPage', 'trainingPage', 'chattingPage', 'rankingPage', 'governancePage', 'walletPage'];
const START_PAGE = 0;
const WALLET_PAGE = 5;
var current_page = 0;
var try_page = 0;

var msg_count = 0;

function movePage(targetIdx) {
  if (targetIdx == current_page) return;
  if (account == '' && targetIdx != START_PAGE) {
      try_page = targetIdx;
      targetIdx = WALLET_PAGE;
  }

  $('#'+PAGES[current_page]).hide();
  $('#'+PAGES[targetIdx]).show();
  current_page = targetIdx;
}

async function connect() {
    if (account !== '') return;
    await connectMetamask();
    movePage(try_page);
}

function setLoadingStatus(isOwner, isLoading) {
    if ( isLoading ) {
        var loading_html = "";
        var name = "";
        if ( isOwner ) {
            loading_html = `
            <section id ="my-message-loading" class="message -right">
                <div class="nes-balloon from-left chat-balloon" style="padding-bottom:3px; padding-top:7px;">
                    <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <i><img src="../src/intp.png" style="width:100px; height:100px;"></i>
            </section>
            `
            name = account;
        }
        else {
            loading_html = `
            <section id="message-loading" class="message -left">
                <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
                <div class="nes-balloon from-left chat-balloon" style="padding-bottom:3px; padding-top:7px;">
                    <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </section>
            `
            name = '칭구';
        }
        $(".message-list").append(loading_html);
        $("#message-status-text").text(name+"님이 작성중입니다...");
    }
    else {
        if ( isOwner ) { $("#my-message-loading").remove(); }
        else { $("#message-loading").remove(); }
        $("#message-status-text").text("");
    }
}

function drawSpinner() {
    if ($("#my-message-loading").length == 0) {
        setLoadingStatus(true, true);
    } else if ($('input#message_field').val() == "") {
        setLoadingStatus(true, false);
    }
}

async function sendRequestAndDrawResponse(msg, index) {
    let reply_message = await echo(msg); // TODO: index와 함께 요청
    console.log('msg#' + index + ' : ' + reply_message);
    var message_html = `
    <section class="message -left">
        <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
        <div id="receive-message-` + index + `" class="nes-balloon from-left chat-balloon left-balloon" data-bs-toggle="modal" data-bs-target="#like-modal">
            <p>` + reply_message + `</p>
            <i class="nes-icon is-medium heart set-like"></i>
        </div>
    </section>
    `;
    setLoadingStatus(false, false);
    $(".message-list").append(message_html);
    $("#receive-message-"+index).hover(
        function() {
            $(this).find( ".set-like" ).css( "visibility", "visible" );
        }, function() {
            $(this).find( ".set-like" ).css( "visibility", "hidden" );
        }
    );
    window.scrollTo(0,document.body.scrollHeight);
    msg_count += 1;
   /*
    // TODO: index와 함께 요청
    sendInferenceReq(msg, response_length, temperature).done(function(reply_message){
        console.log('msg#' + index + ' : ' + reply_message);
        var message_html = `
        <section class="message -left">
            <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
            <div id="receive-message-` + index + `" class="nes-balloon from-left chat-balloon left-balloon" data-bs-toggle="modal" data-bs-target="#like-modal">
                <p>` + reply_message + `</p>
                <i class="nes-icon is-medium heart set-like"></i>
            </div>
        </section>
        `;
        setLoadingStatus(false, false);
        $(".message-list").append(message_html);
        $("#receive-message-"+index).hover(
        function() {
            $(this).find( ".set-like" ).css( "visibility", "visible" );
        }, function() {
            $(this).find( ".set-like" ).css( "visibility", "hidden" );
        }
    );
        window.scrollTo(0,document.body.scrollHeight);
        msg_count += 1;
    });
    */
}

function sendMessage() {
    var message = $('input#message_field').val();
    var message_html = `
    <section class="message -right">
        <div class="nes-balloon from-right chat-balloon">
            <p>` + message + `</p>
        </div>
    </section>
    `;
    $(".message-list").append(message_html);
    setLoadingStatus(true, false);
    $('input#message_field').val('');
    console.log("selected option = " + $('select#message_select').val());
    window.scrollTo(0,document.body.scrollHeight);
    setLoadingStatus(false, true);
    sendRequestAndDrawResponse(message, msg_count);
}

function openConfig() {
    $('input#response_length_field').val(response_length);
    $('input#temperature_field').val(temperature);
    $('select#inference_price_select').val(inference_price);
}

function saveConfig() {
    response_length = $('input#response_length_field').val();
    temperature = $('input#temperature_field').val();
    inference_price = $('select#inference_price_select').val();
}