//  1st CHOICE 
document.querySelector(".enter").addEventListener("click", whoWillYouChoose)

function whoWillYouChoose(e) {
    e.target.remove();

    document.querySelector("#playerPick").style.display = "block";
    e.preventDefault()
}

function letsGo(e) {
    // Display change    
    document.getElementById("playerPick").remove()
    document.getElementById("game").style.display = "block";

    // MUSIC START
    let audioplayer = document.getElementById("play")
    audioplayer.classList = "playerButton fas fa-pause";
        audioplayer.id = "stop";
        song.play() ;
        // song.load();
    audioplayer.parentElement.classList = "playerAnim"
    // console.log(audioplayer.parentElement)

    //LET'S GO!!        
    let go =document.createElement("p")
    go.id= "go"
    go.innerHTML = `OK GO!`
    document.querySelector(".containerEnter").appendChild(go)

    // PLAYERS
    // Saf-1 
    if (e.id === "p1") {
        document.getElementById("picked").innerHTML = `<img src="IMG/Invaders/Saf1.png" id="hero" alt="">`
    }
    // DCI
    else if (e.id === "p2") {
        document.getElementById("picked").innerHTML = `<img src="IMG/Invaders/dci.png" id="hero" alt="">`
    }
    // A-Matt
    else if (e.id === "p3") {
        document.getElementById("picked").innerHTML = `<img src="IMG/Invaders/Ahmad.png" id="hero" alt="">`
    }
    event.preventDefault()
}