function request(method, url, callback, body) {
  fetch(url, {
    method,
    body
  }).then(res=>res.text()).then(res=>callback(res));
}