function Enter() {
    var user = document.getElementById("user");
    var pass = document.getElementById("pass");
    var username = user.value;
    var password = pass.value;
    var storageU = JSON.parse(localStorage.getItem("username"));
    var storageP = JSON.parse(localStorage.getItem("password"));
    if (username == "Sky" && password == "Sky123") {
        alert("Welcome, " + username);
        window.location.href = "instruction.html"
    }
    else if (username == storageU && password == storageP) {
        alert("Welcome, " + storageU);
        window.location.href = "instruction.html"
    }
    else if (username == "" || password == "") {
        alert("Please fill in the following");
    }
    else {
        user.value = "";
        pass.value = "";
        alert("Wrong password/username. Or press arrow up for sign up");
    }
}

function signup() {
    var user = document.getElementById("user");
    var pass = document.getElementById("pass");
    var username = user.value;
    var password = pass.value;
    var us = JSON.stringify(username);
    var ps = JSON.stringify(password);

    localStorage.setItem("username", us);
    localStorage.setItem("password", ps);

    user.value = ""
    pass.value = ""
}

function ss() {
    document.querySelector('#sign').style.display = "block";
}
window.addEventListener('keydown', (event) => {
    if (event.key === "ArrowUp") {
        ss();
    }
})

window.addEventListener('keydown', (event) => {
    if (event.key === "Enter"){
        Enter();
    }
})

function back() {
    window.location.href = "Loading.html";
}