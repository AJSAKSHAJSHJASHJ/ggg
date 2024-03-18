function Show() {
    var player1 = document.getElementById("plyr1");
    var player2 = document.getElementById("plyr2");
    var ins1 = player1.value;
    var ins2 = player2.value;
    var inst;

    if (ins1 == "" && ins2 != null) {
        inst = ins2;
    }
    else if (ins1 != null && ins2 == "") {
        inst = ins1;
    }
    else if (ins1 === "" && ins2 === ""){
        alert("Please select from these dropdown boxes");
    }
    else {
        player1.value = "";
        player2.value = "";
        alert("Please select only one from these two dropdowns")
    }
    if (inst != "undefined") {
         document.getElementById('instruct').innerHTML = inst;
    }
}
function Game() {
    window.location.href = "game.html";
}

function back() {
    window.location.href = "registration.html"
}