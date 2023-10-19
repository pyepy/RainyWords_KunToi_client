/*var userData = {
  'username':"",
  'login':0,
}*/

var userName = "";
var userLogin = 0;

function updateName (x) {
  userName = x;
  console.log(`username: ${userName}`);
}

function updateLogin (x) {
  userLogin = x;
  console.log(`login: ${userLogin}`);
}

export { 
  userName, updateName,
  userLogin, updateLogin,
};