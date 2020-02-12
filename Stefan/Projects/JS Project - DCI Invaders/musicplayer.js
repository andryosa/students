let audioplayer = document.querySelector(".audioplayer")
let song = new Audio("./Music/Lobo_Loco_-_10_-_Old_Ralley_ID_1200.mp3")
// document.getElementById("song")
let song2 = new Audio("./Music/Strassmeir_Dachaur_Bauernkapelle_-_Werdenfelser_Trompeten_Landler.mp3")
// document.getElementById("song2")

// console.log(audioplayer)
audioplayer.addEventListener("click",(e)=>{
    // console.log(e.target)
    if(e.target.id=="play"){
        e.target.classList = "playerButton fas fa-pause";
        e.target.id = "stop"
        song.play()
        // autoplay = true
        // song.load()
    }
    else if(e.target.id=="stop"){
        e.target.classList = "playerButton fas fa-play";
        e.target.id = "play"
        song.pause() 
        song2.pause()

    }
})