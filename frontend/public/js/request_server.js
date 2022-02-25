const TEST_SERVER = 'http://23.21.19.102:33327/';

async function upload_SERVER(_address, _tokenID, _nonce, _mode, _prompt, _temperature, _max_length) {
    _prompt = _prompt.replace(/\"/gi, "\\\"");
    var querydata = '{"address": "' + _address + '", "tokenId" : ' + _tokenID + ', "nonce": ' + _nonce + ', "mode": ' + _mode + ', "prompt": "' + _prompt + '", "temperature": ' + _temperature + ', "max_length": ' + _max_length + '}';
    console.log("-- [request] upload_SERVER :", querydata);
    return new Promise((resolve, reject) => { 
      $.ajax({
        url: TEST_SERVER + 'upload',
        type: 'POST',
        contentType: 'application/json',
        async: true,
        data: querydata,
        success: (res) => {
          resolve(res);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }

async function download_SERVER(_key) {
    var querydata = '{"key": "' + _key + '"}';
    console.log("-- [request] download_SERVER :", querydata);
    return new Promise((resolve, reject) => { 
      $.ajax({
        url: TEST_SERVER + 'download',
        type: 'POST',
        contentType: 'application/json',
        async: true,
        data: querydata,
        success: (res) => {
          resolve(res);
        },
        error: (e) => {
          reject(e);
        }
      });
    });
  }