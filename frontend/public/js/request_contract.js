/*
  CGV
*/

async function balanceOf_CGV(_contract, _account) {
    console.log("-- [request] balanceOf_CGV");
    let response = await _contract.methods.balanceOf(_account).call({ from: _account });
    console.log("-- [response] balanceOf_CGV :", response);
    return response;
}

async function allowance_CGV(_contract, _account, _spender) {
    console.log("-- [request] allowance_CGV");
    let response = await _contract.methods.allowance(_account, _spender).call({ from: _account });
    console.log("-- [response] allowance_CGV :", response);
    return response;
}

async function approve_CGV(_contract, _account, _spender, _amount) {
    console.log("-- [request] approve_CGV");
    let response = await _contract.methods.approve(_spender, _amount).send({ from: _account });
    console.log("-- [response] approve_CGV :", response);
    return response;
}

/*
  CHINGGU
*/

async function mint_CHINGGU(_contract, _account, _token_id) {
    console.log("-- [request] mint_CHINGGU");
    let response = await _contract.methods.mint(_account, _token_id).send({ from: _account });
    console.log("-- [response] mint_CHINGGU :", response);
    return response;
}


/*
  MBTINFT
*/

async function nonces_MBTINFT(_contract, _account, _token_id) {
    console.log("-- [request] nonces_MBTINFT");
    let response = await _contract.methods.nonces(_account, _token_id).call({ from: _account });
    console.log("-- [response] nonces_MBTINFT :", response);
    return response;
}

async function allPriorities_MBTINFT(_contract, _account) {
    console.log("-- [request] allPriorities_MBTINFT");
    let response = await _contract.methods.allPriorities().call({ from: _account });
    console.log("-- [response] allPriorities_MBTINFT :", response);
    return response;
}

async function upload_MBTINFT(_contract, _account, _key, _max_length, _inference_price) {
    console.log("-- [request] upload_MBTINFT");
    let response = await _contract.methods.upload(_key, _max_length, _inference_price).send({ from: _account });
    console.log("-- [response] upload_MBTINFT :", response);
    return response;
}