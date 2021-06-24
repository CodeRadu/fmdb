const root = document.getElementById("root");
let loginState = 0;
let loginForm;
let username;
let password;
let loginButton;
let logoutButton;

setTimeout(() => {
  if(localStorage.getItem('fmdb/login')==='1'){
    username={value: localStorage.getItem('fmdb/user')};
    password={value: localStorage.getItem('fmdb/pass')};
    login();
  }
  
  function reload() {
    root.innerHTML = null;
    if (!loginState) {
      root.append(getLoginPage());
      loginForm = document.getElementById("loginForm");
      username = document.getElementById("Username");
      password = document.getElementById("Password");
      loginButton=document.getElementById('loginButton');
      loginForm.addEventListener("submit", (e) => login(e));
    }
    else {
      root.append(getMainPage());
      logoutButton=document.getElementById('logoutBtn');
      logoutButton.addEventListener('click', ()=>logout());
    }
  }
  
  function getLoginPage() {
    const element = document.createElement("div");
    element.innerHTML = `
      <form id="loginForm">
        <label for="Username">Username</label>
        <input type="text" name="Username" id="Username" required/>
        <label for="Password">Password</label>
        <input type="password" name="Password" id="Password" required/>
        <button type="submit" id="loginButton">Login</button>
      </form>
    `;
    return element;
  }
  function getMainPage(){
    const element = document.createElement("div");
    element.innerHTML = `
      Logged in as ${localStorage.getItem('fmdb/user')}
      <br>
      <button id="logoutBtn">Logout</button>
    `;
    return element;
  }
  reload();
  
  function debug(...message) {
    console.log("[Debug] FMDB: ", ...message);
  }
  
  function login(e){
    e?.preventDefault();
    debug('Logging in..');
    request('GET', `https://home.venovedo.ro/api/?action=login&username=${username.value}&password=${password.value}`, res=>{
      if(res==='ok'){
        debug('Login ok');
        loginState=1;
        if(e){
          localStorage.setItem('fmdb/user', username.value);
          localStorage.setItem('fmdb/pass', password.value);
        }
        localStorage.setItem('fmdb/login', 1);
        reload();
      }
      else {
        debug('Login error');
        loginButton.innerText='Login error';
        localStorage.removeItem('fmdb/user');
        localStorage.removeItem('fmdb/pass');
        localStorage.removeItem('fmdb/login');
        reload();
      }
    }, null);
  }
  function logout(){
    loginState=0;
    localStorage.removeItem('fmdb/user');
    localStorage.removeItem('fmdb/pass');
    localStorage.removeItem('fmdb/login');
    debug('Logout ok');
    reload();
  }
}, 100);
