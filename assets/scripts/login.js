const trysession = document.getElementById("createacc");
let loggingInUser;

function handleLogin(e) {
    e.preventDefault();

    let logInData = {
        name: document.getElementById("uname").value,
        password: document.getElementById("upass").value,
    };
    loggingInUser = logInData;
    fetch("https://data-store-server-production.up.railway.app/users/")
    .then(r => r.json())
    .then(userValidator)
}
function userValidator(users){
    users.forEach(showUser);
}
function showUser(object){
    const attemptlog = []
    attemptlog.push(object.username)
    attemptlog.push(object.password)
    if (attemptlog[0] == loggingInUser.name && attemptlog[1] == loggingInUser.password){
        window.location.replace("https://abdu-10.github.io/building-project/static/home.html")
    }else{
        console.log("invalid username or password")
    }
    trysession.reset()
}
trysession.addEventListener("submit", handleLogin)