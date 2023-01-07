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

            //use this in local dev
            window.location = "../../index.html"

            //use this in gh depoly
            //window.location.replace("https://abdu-10.github.io/building-project/index.html");
            alert("Account created successfully, proceed to log in");
        }else{
            console.log("Error creating account")
            // this will be replaced by a prompt for the user to retry
        }
    });
    createuser.reset("")
}