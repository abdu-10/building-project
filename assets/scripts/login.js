const trysession = document.getElementById("createacc");
const display = document.getElementById("pagearea");
let loggingInUser;
let loggedInUser;
let postContainer;
trysession.addEventListener("submit", handleLogin)

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
    const attemptlog = [];
    
    attemptlog.push(object.username)
    attemptlog.push(object.password)
    if (attemptlog[0] == loggingInUser.name && attemptlog[1] == loggingInUser.password){
        loggedInUser = object;
        // redirect me to home if my credentials are valid
        renderHome();
    }else{
        console.log("invalid username or password")
    }
    trysession.reset()
}

function renderHome(){
    display.innerHTML = `
    <div class="maincontainer">
    <nav class="navbar">
        <div class="tittletext">
            <h3><span class="dropcap">T</span>ruck<span class="dropcap">C</span>hat</h3>
        </div>            
        <div class="links">
            <ul>
                <li id="myposts">My Posts</li>
                <li id="newpost">Post</li>
                <li id="upic"><img src="${loggedInUser.image}" width="2px" alt="pic"></li>
                <li id="uname">${loggedInUser.username}</li>
            </ul>
        </div>          
    </nav>

    <section id="posts">        
    </section>
    <div>
        <footer>

        </footer>
    </div>
</div>
    ` 
getPosts();
document.getElementById("newpost").addEventListener("click", showPostForm)
postContainer = document.getElementById("posts");
pimage = document.getElementById("itempic");
}

function showPostForm(){
    display.innerText = "";
    display.innerHTML = `
    <div class="formcontainer">
        <form id="postform">
            <h3><img src="" alt=""><span>${loggedInUser.username}</span></h3>
            <h4>${loggedInUser.city}</h4>
            <textarea id="description" placeholder="Enter Item description" name="desc" cols="30">                
            </textarea>
            <label for="img">Provide an Image link</label>
           <input type="url" name="img" id="image">
           <button class="buttons">Post Item</button>
        </form>
    </div>
    `
    document.getElementById("postform").addEventListener("submit", handlePostItem)
}

function handlePostItem(e){
    e.preventDefault();
    let itemData = {
        description: document.getElementById("description").value,
        image: document.getElementById("image").value,
        owner: `${loggedInUser.username}`,
        location: `${loggedInUser.city}`
    };
    console.log(itemData);
    fetch("https://data-store-server-production.up.railway.app/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
    getPosts();
    // As an additional, view the posted item
    //otherwise, send me back to home
}

function getPosts(){
    fetch("https://data-store-server-production.up.railway.app/posts")
    .then( r => r.json())
    .then(postsHandler)
}
function postsHandler(posts){
    posts.forEach(renderPost)

}
function renderPost(post){
    const postCont = document.createElement("div");
    postCont.setAttribute("class", "postcontainer")

    const imagecont = document.createElement("div");
    imagecont.setAttribute("class", "imagecontainer");
    imagecont.innerHTML = `
        <img
        id="itempic"
        src= ${post.image}
        alt="item"
        /> 
    `
    postCont.appendChild(imagecont);

    
    const postDet = document.createElement("div");
    postCont.setAttribute("class", "postdetails");
    postDet.innerHTML = `
    <p>
        <h4>Description:</h4>
        <span class="itemdesc">${post.description}</span>
    </p>
    <p>
        <h4>Location:</h4>
        <span class="itemdesc">${post.location}</span>
    </p>
    <p>
        <h4>By:</h4>
        <span class="itemdesc">${post.owner}</span>
    </p>
    `
    postCont.appendChild(postDet);

    const postReact = document.createElement("div");
    postReact.setAttribute("class", "reaction");
    postReact.innerHTML = `
    <h3>Comments</h3>
    <h3><span id="likecount">23</span><i class="fa fa-thumbs-up" style="color:blue">Like</i></h3>    
    `
    postCont.appendChild(postReact)
    postContainer.appendChild(postCont)
}


