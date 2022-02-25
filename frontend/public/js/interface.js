/* Constants */
// Page Types
const PAGES = ['startPage', 'trainingPage', 'chattingPage', 'rankingPage', 'governancePage', 'walletPage'];
const START_PAGE = 0;
const CHATTING_PAGE = 2;
const WALLET_PAGE = 5;

// Message Types
const WRITING_TYPE = 0;
const CHATTING_TYPE = 1;
const QNA_TYPE = 2;
const THREE_LINE_TYPE = 3;

// MBTI Types
const ESTJ = 0;
const ISTJ = 1;
const ENTJ = 2;
const INTJ = 3;
const ESFJ = 4;
const ISFJ = 5;
const ENFJ = 6;
const INFJ = 7;
const ESTP = 8;
const ISTP = 9;
const ENTP = 10;
const INTP = 11;
const ESFP = 12;
const ISFP = 13;
const ENFP = 14;
const INFP = 15;
const NEUTRAL = 16;

// Inference Prices
const FASTEST = 0;
const FASTER = 1;
const AVERAGE = 2;
const SLOWER = 3;
const SLOWEST = 4;

/* Saved Values on Frontend */
let current_page = 0;
let try_page = 0;
let msg_count = 0;

let response_length = 128;
let temperature = 0.8;
let inference_price = 2;

let friends_dict = [];
let friend_mbti_string = '';

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

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
        let _nft_contract = contract_CHINGGU;
        let _account = account;
        let _spender = CONTRACT_MBTINFT_ADDR;
        await updateBalanceOfCGV(_token_contract, _account);
        await updateApprovalText(_token_contract, _account, _spender);
        await updateFriendList(_nft_contract, _account);
        if (Object.keys(friends_dict).length > 0)
            await updateFriendInfoOnClick(Object.keys(friends_dict)[0]);

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

async function updateBalanceOfCGVOnHover() {
    let _token_contract = contract_CGV;
    let _account = account;

    await updateBalanceOfCGV(_token_contract, _account);
}

async function requestMintCGVOnClick() {
    let _token_contract = contract_CGV;
    let _account = account;
    let _amount = BigInt(100*10e18); // demo feature
    
    await requestMintCGV(_token_contract, _account, _amount);
    await updateBalanceOfCGV(_token_contract, _account);
}

async function requestMintOnClick() {
    let _contract = contract_CHINGGU;
    let _account = account;

    let checked_profile_str = $(':radio[name="profiles"]:checked').val();
    let checked_profile_enum = getMbtiTypeFromString(checked_profile_str);
    console.log("checked_profile :", checked_profile_str, checked_profile_enum);
    if (typeof checked_profile_str !== 'undefined') {
        $('#mint_tooltip').attr('data-bs-original-title', '').tooltip('hide');
        await requestMint(_contract, _account, checked_profile_enum);
        await updateFriendList(_nft_contract, _account);
        if (Object.keys(friends_dict).length > 0)
            await updateFriendInfoOnClick(Object.keys(friends_dict)[0]);
    }
}

async function sendMessageOnClick() {
    let _token_contract = contract_CGV;
    let _contract = contract_MBTINFT;
    let _account = account;
    let _token_id = tokenID;
    let _spender = CONTRACT_MBTINFT_ADDR;

    let allowance = await getAllowanceOfCGV(_token_contract, _account, _spender);
    if (allowance == 0) {
        requestApprove(_token_contract, _account, _spender);
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
        sendRequestAndDrawResponse(_contract, _account, _token_id, message, mode, response_length, temperature, inference_price, msg_count);
    }
}

function updateFriendMessageOnClick() {
    let message_type = parseInt($('select#message_select').val());
    let reply_message = '';
    switch(message_type) {
        case WRITING_TYPE: reply_message = "안녕! 나랑 릴레이 소설 쓸래? 첫문장을 먼저 말해줘."; break;
        case CHATTING_TYPE: reply_message = "안녕!"; break;
        case QNA_TYPE: reply_message = "안녕? 궁금한 것을 물어봐줘."; break;
        case THREE_LINE_TYPE: reply_message = "안녕! 삼행시를 위한 제시어를 말해줘."; break;
    }
    if (msg_count == 0) { $('#first-balloon').text(reply_message); }
    else { drawResponse(msg_count, reply_message); }
}

function getMbtiTypeFromString(_checked_profile_str) {
    switch(_checked_profile_str) {
        case 'isfp': return ISFP;
        case 'infp': return INFP;
        case 'enfp': return ENFP;
        case 'istp': return ISTP;
        case 'estp': return ESTP;
        case 'intp': return INTP;
        case 'entp': return ENTP;
        case 'isfj': return ISFJ;
        case 'esfj': return ESFJ;
        case 'infj': return INFJ;
        case 'enfj': return ENFJ;
        case 'istj': return ISTJ;
        case 'estj': return ESTJ;
        case 'intj': return INTJ;
        case 'entj': return ENTJ;
        case 'esfp': return ESFP;
        case 'neutral': return NEUTRAL;
      }
    return -1;
}

function getMbtiStringFromType(_checked_profile_type) {
    switch(parseInt(_checked_profile_type)) {
        case ISFP: return 'isfp';
        case INFP: return 'infp';
        case ENFP: return 'enfp';
        case ISTP: return 'istp';
        case ESTP: return 'estp';
        case INTP: return 'intp';
        case ENTP: return 'entp';
        case ISFJ: return 'isfj';
        case ESFJ: return 'esfj';
        case INFJ: return 'infj';
        case ENFJ: return 'enfj';
        case ISTJ: return 'istj';
        case ESTJ: return 'estj';
        case INTJ: return 'intj';
        case ENTJ: return 'entj';
        case NEUTRAL: return 'neutral';
      }
    return '';
}

async function getMbtiStringFromTokenID(_contract, _account, _tokenID) {
    let _energy = friends_dict[_tokenID]['energy'];
    let _information = friends_dict[_tokenID]['information'];
    let _decision = friends_dict[_tokenID]['decision'];
    let _relate = friends_dict[_tokenID]['relate'];
    let result_mbti = await getMbtiString(_contract, _account, _energy, _information, _decision, _relate);
    return result_mbti.toLowerCase();
}

function updateFriendListOnClick() {
    let _nft_contract = contract_CHINGGU;
    let _account = account;
    updateFriendList(_nft_contract, _account);
}

async function updateFriendInfoOnClick(_tokenID) {
    let _nft_contract = contract_CHINGGU;
    let _account = account;
    tokenID = _tokenID;
    
    friend_mbti_string = await getMbtiStringFromTokenID(_nft_contract, _account, _tokenID);
    let _amount = friends_dict[_tokenID]['amount'];
    let _love = friends_dict[_tokenID]['love'];
    let _rarity = friends_dict[_tokenID]['rarity'];
    let _popularity = friends_dict[_tokenID]['popularity'];
    let _energy = friends_dict[_tokenID]['energy'];
    let _information = friends_dict[_tokenID]['information'];
    let _decision = friends_dict[_tokenID]['decision'];
    let _relate = friends_dict[_tokenID]['relate'];
    let _sp = friends_dict[_tokenID]['sp'];

    // set images
    $('img#current-friend').attr("src", '../src/' + friend_mbti_string + '-sm.png');
    $('img.friend-info-image').attr("src", '../src/' + friend_mbti_string + '.png');

    // set texts
    $('p#friend-info-message').text('안녕 난 ' + friend_mbti_string + '야');
    $('.educated-degree').text('200B+'+_amount);
    $('.mbti-string').text(friend_mbti_string);
    $('.remain-sp').text('(SP: ' + _sp + ')');

    // set love icons
    let _love_icons = $('.stat-love-icon');
    for (let i = 0; i < _love_icons.length; i++) {
        $(_love_icons[i]).removeClass('is-half is-transparent');
        let standard = 10**(i);
        let ratio = _love / standard;
        if (i < 4) $(_love_icons[i]).attr('data-bs-original-title', _love + '/' + standard);
        if (ratio >= 1) continue;
        else if (ratio >= 0.5) $(_love_icons[i]).addClass('is-half');
        else $(_love_icons[i]).addClass('is-transparent');
    }

    // set rarity icons
    let _rarity_icons = $('.stat-rarity-icon');
    for (let i = 0; i < _rarity_icons.length; i++) {
        $(_rarity_icons[i]).removeClass('is-transparent');
        if (_rarity <= i) $(_rarity_icons[i]).addClass('is-transparent');
    }

    // set popularity icons
    let _popularity_icons = $('.stat-popularity-icon');
    for (let i = 0; i < _popularity_icons.length; i++) {
        $(_popularity_icons[i]).removeClass('is-empty');
        let standard = 10**(i);
        let ratio = _popularity / standard;
        if (i < 4) $(_popularity_icons[i]).attr('data-bs-original-title', _popularity + '/' + standard);
        if (ratio >= 1) continue;
        else $(_popularity_icons[i]).addClass('is-empty');
    }

    // set bars
    $('#energy-bar').removeClass('is-reverse is-reverse-primary is-primary');
    let _energy_value = 0;
    let _energy_tooltip = '';
    if (_energy >= 50) {
        $('#energy-bar').addClass('is-primary'); // E
        _energy_value = _energy;
        _energy_tooltip = 'E(' + _energy_value + '%)';
    }
    else if (_energy < 50) {
        $('#energy-bar').addClass('is-reverse is-reverse-primary'); // I
        _energy_value = 100 - _energy;
        _energy_tooltip = 'I(' + _energy_value + '%)';
    }
    $('#energy-bar').attr('value', _energy);
    $('#energy-bar').attr('data-label', _energy_value + '%');
    $('#energy-bar').attr('data-bs-original-title', _energy_tooltip);

    $('#information-bar').removeClass('is-reverse is-reverse-success is-success');
    let _information_value = 0;
    let _information_tooltip = '';
    if (_information >= 50) {
        $('#information-bar').addClass('is-success'); // S
        _information_value = _information;
        _information_tooltip = 'S(' + _information_value + '%)';
    }
    else if (_information < 50) {
        $('#information-bar').addClass('is-reverse is-reverse-success'); // N
        _information_value = 100 - _information;
        _information_tooltip = 'N(' + _information_value + '%)';
    }
    $('#information-bar').attr('value', _information);
    $('#information-bar').attr('data-label', _information_value + '%');
    $('#information-bar').attr('data-bs-original-title', _information_tooltip);

    $('#decision-bar').removeClass('is-reverse is-reverse-warning is-warning');
    let _decision_value = 0;
    let _decision_tooltip = '';
    if (_decision >= 50) {
        $('#decision-bar').addClass('is-warning'); // T
        _decision_value = _decision;
        _decision_tooltip = 'T(' + _decision_value + '%)';
    }
    else if (_decision < 50) {
        $('#decision-bar').addClass('is-reverse is-reverse-warning'); // F
        _decision_value = 100 - _decision;
        _decision_tooltip = 'F(' + _decision_value + '%)';
    }
    $('#decision-bar').attr('value', _decision);
    $('#decision-bar').attr('data-label', _decision_value + '%');
    $('#decision-bar').attr('data-bs-original-title', _decision_tooltip);

    $('#relate-bar').removeClass('is-reverse is-reverse-error is-error');
    let _relate_value = 0;
    let _relate_tooltip = '';
    if (_relate >= 50) {
        $('#relate-bar').addClass('is-error'); // J
        _relate_value = _relate;
        _relate_tooltip = 'J(' + _relate_value + '%)';
    }
    else if (_relate < 50) {
        $('#relate-bar').addClass('is-reverse is-reverse-error'); // P
        _relate_value = 100 - _relate;
        _relate_tooltip = 'P(' + _relate_value + '%)';
    }
    $('#relate-bar').attr('value', _relate);
    $('#relate-bar').attr('data-label', _relate_value + '%');
    $('#relate-bar').attr('data-bs-original-title', _relate_tooltip);

    // update chattings
    updateFriendChattingPage(_tokenID);
}

async function updateFriendChattingPage(_tokenID) {
    $(".message-list").empty();
    msg_count = 0;
    let first_message_html = `
        <section class="message -left">
          <i><img class="friend-info-image" src="../src/` + friend_mbti_string + `.png" style="width:100px; height:100px;"></i>
          <!-- Balloon -->
          <div class="nes-balloon from-left chat-balloon left-balloon">
            <p id="first-balloon">안녕! 나랑 릴레이 소설 쓸래? 첫문장을 먼저 말해줘.</p>
          </div>
        </section>
        `;
    $(".message-list").append(first_message_html);
    $('#message_select').val(WRITING_TYPE);
}

/*
 * Request functions
 */

async function updateBalanceOfCGV(_contract, _account) {
    if (_contract === '' || _account === '') return;
    let token_string = await getBalanceOfCGV(_contract, _account);
    $('#coin_icon').attr('data-bs-original-title', token_string + ' CGV (click to mint!)');
}

async function updateApprovalText(_contract, _account, _spender) {
    if (_contract === '' || _account === '') return;
    let allowance = await getAllowanceOfCGV(_contract, _account, _spender);
    if (allowance > 0) $('#approve-text').text('전송');
    else $('#approve-text').text('승인');
}

async function updateFriendList(_contract, _account) {
    if (_contract === '' || _account === '') return;
    let friend_list = await getFriendtokenIDList(_contract, _account);
    for (let i = 0; i < friend_list.length; i++) {
        let _tokenID = friend_list[i];
        if (_tokenID in friends_dict) delete friends_dict[_tokenID];
        friends_dict[_tokenID] = await getFriendProperties(_contract, _account, _tokenID);
        let mbti_string = await getMbtiStringFromTokenID(_contract, _account, _tokenID);
        if ($('#'+friend_list[i]).length == 0){
            let friend_profile_html = `<img type="button" id=` + _tokenID + ` class="friend-profile" src="../src/` + mbti_string + `-sm.png" onclick="updateFriendInfoOnClick(this.id)" data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-original-title="` + mbti_string + `(ID#` + _tokenID + `)">`
            $("div#friend-list").append(friend_profile_html);
            tooltipTriggerList.push($('#'+_tokenID));
            tooltipList.push(new bootstrap.Tooltip($('#'+_tokenID)));
        }
    }
}

async function sendRequestAndDrawResponse(_contract, _account, _token_id, _msg, _mode, _response_length, _temperature, _inference_price, _index) {
    if (_contract === '' || _account === '') return;
    // 1. 서버에 요청 (TEST_SERVER)
    console.log("---- 1. request message key to server")
    let message_key = await requestMessageKey(_contract, _account, _token_id, _mode, _msg, _temperature, _response_length);
    console.log("----> message_key = ", message_key);

    if (typeof message_key === 'undefined') {
        console.log("message key undefined error!");
        let reply_message = "서버 연결 에러입니다. 새로고침 해주세요.";
        drawResponse(_index, reply_message);
        return;
    }

    // 2. 서버의 응답을 넣어 컨트랙트에 요청
    console.log("---- 2. request upload to contract")
    _inference_price_value = await getInferencePrice(_contract, _account, _inference_price); // TODO 설정에서 반영해서 이 함수에 전달되도록
    await requestUpload(_contract, _account, '0x' + message_key, _token_id, _response_length, _inference_price_value);
    console.log("---- request to contract finish")

    // 3. 서버에 응답이 들어갈때까지 계속 체크
    console.log("---- 3. request reply to server")
    let delay = 1000; // interval 1sec request
    setTimeout(async function request() {
        let reply_message = '';
        try {
            reply_message = await requestReply(message_key);
        } catch {
            reply_message = "서버 연결 에러입니다. 새로고침 해주세요.";
            drawResponse(_index, reply_message)
            return;
        }
        if (typeof reply_message.data === 'undefined') {
            // please wait
            console.log("----> please wait. error code:", reply_message);
        } else {
            // success!
            console.log("----> success!! reply_message = ", reply_message);
            reply_message = reply_message.data.result;

            // Draw answer here.
            reply_message = reply_message.replace(/\n/gi, "<br/>");
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
                <i><img src="../src/` + friend_mbti_string + `.png" style="width:100px; height:100px;"></i>
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
        <i><img src="../src/` + friend_mbti_string + `.png" style="width:100px; height:100px;"></i>
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