/*var userData = {
  'username':"",
  'login':0,
}*/

var userName = "";
var userLogin = 0;
var userDiff = 1;
var userSpeed = 1;

function updateName (x) {
  userName = x;
  console.log(`username: ${userName}`);
}

function updateLogin (x) {
  userLogin = x;
  console.log(`login: ${userLogin}`);
}

function updateDiff (x) {
  userDiff = x;
  console.log(`difficulty: ${userDiff}`);
}

function updateSpeed (x) {
  userSpeed = x;
  console.log(`fallingSpeed: ${userSpeed}`);
}

export { 
  userName, updateName,
  userLogin, updateLogin,
  userDiff, updateDiff,
  userSpeed, updateSpeed
};