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

async function approveMax_CGV(_contract, _account, _master) {
    console.log("-- [request] approveMax_CGV");
    let response = await _contract.methods.approveMax(_master).send({ from: _account });
    console.log("-- [response] approveMax_CGV :", response);
    return response;
}

async function mint_CGV(_contract, _account, _amount) {
    console.log("-- [request] mint_CGV");
    let response = await _contract.methods.mint(_account, _amount).send({ from: _account });
    console.log("-- [response] mint_CGV :", response);
    return response;
}

/*
  CHINGGU
*/

async function mint_CHINGGU(_contract, _account, _job) {
    console.log("-- [request] mint_CHINGGU");
    let response = await _contract.methods.mint(_job).send({ from: _account });
    console.log("-- [response] mint_CHINGGU :", response);
    return response;
}

async function collectables_CHINGGU(_contract, _account) {
    console.log("-- [request] collectables_CHINGGU");
    let response = await _contract.methods.collectables(_account).call({ from: _account });
    console.log("-- [response] collectables_CHINGGU :", response);
    return response;
}

async function properties_CHINGGU(_contract, _account, _token_id) {
    console.log("-- [request] properties_CHINGGU");
    let response = await _contract.methods.properties(_account, _token_id).call({ from: _account });
    console.log("-- [response] properties_CHINGGU :", response);
    return response;
}

async function getMBTI_CHINGGU(_contract, _account, _energy, _information, _decision, _relate) {
    console.log("-- [request] getMBTI_CHINGGU");
    let response = await _contract.methods.getMBTI(_energy, _information, _decision, _relate).call({ from: _account });
    console.log("-- [response] getMBTI_CHINGGU :", response);
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

async function upload_MBTINFT(_contract, _account, _key, _token_id, _max_length, _inference_price) {
    console.log("-- [request] upload_MBTINFT");
    let response = await _contract.methods.upload(_key, _token_id, _max_length, _inference_price).send({ from: _account });
    console.log("-- [response] upload_MBTINFT :", response);
    return response;
}

async function fastest_MBTINFT(_contract, _account) {
    console.log("-- [request] fastest_MBTINFT");
    let response = await _contract.methods.fastest().call({ from: _account });
    console.log("-- [response] fastest_MBTINFT :", response);
    return response;
}

async function faster_MBTINFT(_contract, _account) {
    console.log("-- [request] faster_MBTINFT");
    let response = await _contract.methods.faster().call({ from: _account });
    console.log("-- [response] faster_MBTINFT :", response);
    return response;
}

async function average_MBTINFT(_contract, _account) {
    console.log("-- [request] average_MBTINFT");
    let response = await _contract.methods.average().call({ from: _account });
    console.log("-- [response] average_MBTINFT :", response);
    return response;
}

async function slower_MBTINFT(_contract, _account) {
    console.log("-- [request] slower_MBTINFT");
    let response = await _contract.methods.slower().call({ from: _account });
    console.log("-- [response] slower_MBTINFT :", response);
    return response;
}

async function slowest_MBTINFT(_contract, _account) {
    console.log("-- [request] slowest_MBTINFT");
    let response = await _contract.methods.slowest().call({ from: _account });
    console.log("-- [response] slowest_MBTINFT :", response);
    return response;
}