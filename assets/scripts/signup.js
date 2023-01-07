const createuser = document.getElementById('createacc');

createuser.addEventListener("submit", handleSubmit)

function handleSubmit(e) {   
    e.preventDefault();
    let userData = {
        username: document.getElementById("uname").value,
        image: document.getElementById("uimage").value,
        city: document.getElementById("ucity").value,
        password: document.getElementById("upass").value,
    };
    fetch("https://data-store-server-production.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    .then(r => r.json())
    .then( (userObject) => {
        if (userObject !== {} || ""){
            //replace here with autologin
            window.location.assign("./index.html");
            alert("Account created successfully, proceed to log in");
        }else{
            console.log("Error creating account")
            // this will be replaced by a prompt for the user to retry
        }
    });
    createuser.reset("")
}