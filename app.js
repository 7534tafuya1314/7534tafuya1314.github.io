(function () {
  var badge = document.getElementById('badge');
  var passkey = document.getElementById('passkey');
  var hint = document.getElementById('hint');

  function setBadge(text, state) {
    badge.textContent = text;
    badge.className = 'badge ' + state;
  }

  function show(text) {
    passkey.textContent = text;
  }

  fetch('key.txt?t=' + Date.now(), { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.text();
    })
    .then(function (text) {
      var matched = text.match(/\d+/);
      if (!matched) {
        show('—');
        setBadge('暂无办匙', 'off');
        hint.textContent = '仓库内尚未写入办匙。';
        return;
      }
      show(matched[0]);
      setBadge('办匙在线', 'on');
      hint.textContent = '本页办匙由《QL密钥生成》写入，供《API自定义》注册校验读取。';
    })
    .catch(function (error) {
      show('—');
      setBadge('读取失败', 'off');
      hint.textContent = '读取失败：' + error.message;
    });
})();
