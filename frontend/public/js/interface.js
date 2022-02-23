/* Constants */
const PAGES = ['startPage', 'trainingPage', 'chattingPage', 'rankingPage', 'governancePage', 'walletPage'];
const START_PAGE = 0;
const CHATTING_PAGE = 2;
const WALLET_PAGE = 5;

/* Saved Values on Frontend */
let current_page = 0;
let try_page = 0;
let msg_count = 0;

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

let response_length = 128;
let temperature = 0.8;
let inference_price = 2;

/*
 * Onclick functions
 */
async function connectOnClick() {
    if (account !== '') return;

    // connect to metamask
    let success = await connectMetamask();

    if (success) {
        // set elements
        $('.showMetamaskStatus').html(account.substr(0, 4) + '..' + account.substr(account.length - 2, 2));
        $('#connect_metamask_button').attr('data-bs-original-title', account).tooltip('show');
        $('#mint_tooltip').attr('data-bs-original-title', '함께할 칭구를 선택하세요!').tooltip('hide');
        $('#mint_button').attr('disabled', false);
        $('.nav-profile').css("visibility", "visible");

        // update elements by request
        let _token_contract = contract_CGV;
        let _account = account;
        let _spender = CONTRACT_MBTINFT_ADDR;
        await updateBalanceOfCGV(_token_contract, _account);
        await updateApprovalText(_token_contract, _account, _spender);

        movePageOnClick(try_page);
    }
    else {
        console.log("metamask connection failed!");
    }
}

function movePageOnClick(targetIdx) {
    if (targetIdx == current_page) return;
    if (account == '' && targetIdx != START_PAGE) {
        try_page = targetIdx;
        targetIdx = WALLET_PAGE;
    }
    $('#' + PAGES[current_page]).hide();
    $('#' + PAGES[targetIdx]).show();
    current_page = targetIdx;
}

function openConfigOnClick() {
    $('input#response_length_field').val(response_length);
    $('input#temperature_field').val(temperature);
    $('select#inference_price_select').val(inference_price);
}

function saveConfigOnClick() {
    response_length = $('input#response_length_field').val();
    temperature = $('input#temperature_field').val();
    inference_price = $('select#inference_price_select').val();
}

async function updateBalanceOfCGVOnClick() {
    let _token_contract = contract_CGV;
    let _account = account;

    await updateBalanceOfCGV(_token_contract, _account);
}

async function requestMintOnClick() {
    let _contract = contract_CHINGGU;
    let _account = account;
    let _token_id = NFT_TOKEN_ID;

    // todo : pass `checked_profile` to mint function
    let checked_profile = $(':radio[name="profiles"]:checked').val();
    console.log("checked_profile :", checked_profile);
    if (typeof checked_profile !== 'undefined') {
        $('#mint_tooltip').attr('data-bs-original-title', '').tooltip('hide');
        let response = await requestMint(_contract, _account, _token_id);
    }
}

async function sendMessageOnClick() {
    let _token_contract = contract_CGV;
    let _contract = contract_MBTINFT;
    let _account = account;
    let _spender = CONTRACT_MBTINFT_ADDR;
    let request_allowance = 200000000; // demo feature

    let allowance = await getAllowanceOfCGV(_token_contract, _account, _spender);
    if (allowance == 0) {
        requestApprove(_token_contract, _account, _spender, request_allowance);
    } else {
        let message = $('input#message_field').val();
        let message_html = `
        <section class="message -right">
            <div class="nes-balloon from-right chat-balloon">
                <p>` + message + `</p>
            </div>
        </section>
        `;
        $(".message-list").append(message_html);
        drawLoadingStatus(true, false);
        $('input#message_field').val('');
        window.scrollTo(0, document.body.scrollHeight);
        drawLoadingStatus(false, true);
        let mode = $('select#message_select').val();
        sendRequestAndDrawResponse(_contract, _account, message, mode, response_length, temperature, inference_price, msg_count);
    }
}

/*
 * Request functions
 */

async function updateBalanceOfCGV(_contract, _account) {
    if (_contract === '' || _account === '') return;
    let token_string = await getBalanceOfCGV(_contract, _account);
    $('#coin_icon').attr('data-bs-original-title', token_string + ' CGV').tooltip('show');
}

async function updateApprovalText(_contract, _account, _spender) {
    if (_contract === '' || _account === '') return;
    let allowance = await getAllowanceOfCGV(_contract, _account, _spender);
    if (allowance > 0) $('#approve-text').text('전송');
    else $('#approve-text').text('승인');
}

async function sendRequestAndDrawResponse(_contract, _account, _msg, _mode, _response_length, _temperature, _inference_price, _index) {
    if (_contract === '' || _account === '') return;
    // 1. 서버에 요청 (TEST_SERVER)
    console.log("---- 1. request message key to server")
    let message_key = await requestMessageKey(_contract, _account, NFT_TOKEN_ID, _mode, _msg, _temperature, _response_length);
    console.log("----> message_key = ", message_key);

    if (typeof message_key === 'undefined') {
        console.log("message key undefined error!");
        let reply_message = "서버 연결 에러입니다. 새로고침 해주세요.";
        drawResponse(_index, reply_message)
        return;
    }

    // 2. 서버의 응답을 넣어 컨트랙트에 요청
    console.log("---- 2. request upload to contract")
    _inference_price = await getInferencePrice(_contract, _account); // TODO 설정에서 반영해서 이 함수에 전달되도록
    await requestUpload(_contract, _account, '0x' + message_key, _response_length, _inference_price);
    console.log("---- request to contract finish")

    // 3. 서버에 응답이 들어갈때까지 계속 체크
    console.log("---- 3. request reply to server")
    let delay = 1000; // interval 1sec request
    setTimeout(async function request() {
        let reply_message = await requestReply(message_key);
        if (typeof reply_message.data === 'undefined') {
            // please wait
            console.log("----> please wait..", reply_message);
        } else {
            // success!
            console.log("----> success!! reply_message = ", reply_message);
            reply_message = reply_message.data.result;

            // Draw answer here.
            drawResponse(_index, reply_message)
            return;
        }
        setTimeout(request, delay);
    }, delay);
}

/*
 * Draw functions
 */

function drawLoadingStatus(isOwner, isLoading) {
    if (isLoading) {
        let loading_html = "";
        let name = "";
        if (isOwner) {
            loading_html = `
            <section id ="my-message-loading" class="message -right">
                <div class="nes-balloon from-left chat-balloon" style="padding-bottom:3px; padding-top:7px;">
                    <div class="spinner-border" style="width: 2rem; height: 2rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
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
        $("#message-status-text").text(name + "님이 작성중입니다...");
    }
    else {
        if (isOwner) { $("#my-message-loading").remove(); }
        else { $("#message-loading").remove(); }
        $("#message-status-text").text("");
    }
}

function drawSpinner() {
    if ($("#my-message-loading").length == 0) {
        drawLoadingStatus(true, true);
    } else if ($('input#message_field').val() == "") {
        drawLoadingStatus(true, false);
    }
}

function drawResponse(_index, _reply_message) {
    console.log('msg#' + _index + ' : ' + _reply_message);
    let message_html = `
    <section class="message -left">
        <i><img src="../src/enfp.png" style="width:100px; height:100px;"></i>
        <div id="receive-message-` + _index + `" class="nes-balloon from-left chat-balloon left-balloon" data-bs-toggle="modal" data-bs-target="#like-modal">
            <p>` + _reply_message + `</p>
            <i class="nes-icon is-medium heart set-like"></i>
        </div>
    </section>
    `;
    drawLoadingStatus(false, false);
    $(".message-list").append(message_html);
    $("#receive-message-" + _index).hover(
        function () {
            $(this).find(".set-like").css("visibility", "visible");
        }, function () {
            $(this).find(".set-like").css("visibility", "hidden");
        }
    );
    window.scrollTo(0, document.body.scrollHeight);
    msg_count += 1;
}