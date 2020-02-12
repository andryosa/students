let hero = {
    top: 70,
    left: 47
};

var score = 0;

let missiles = [];

let invaders = [{
        top: 1,
        left: 33
    },
    {
        top: 1,
        left: 40
    },
    {
        top: 1,
        left: 47
    },
    {
        top: 1,
        left: 54
    },
    {
        top: 1,
        left: 61
    },
    {
        top: 8,
        left: 33
    },
    {
        top: 8,
        left: 40
    },
    {
        top: 8,
        left: 47
    },
    {
        top: 8,
        left: 54
    },
    {
        top: 8,
        left: 61
    },
    {
        top: 15,
        left: 33
    },
    {
        top: 15,
        left: 40
    },
    {
        top: 15,
        left: 47
    },
    {
        top: 15,
        left: 54
    },
    {
        top: 15,
        left: 61
    },
    {
        top: 22,
        left: 33
    },
    {
        top: 22,
        left: 40
    },
    {
        top: 22,
        left: 47
    },
    {
        top: 22,
        left: 54
    },
    {
        top: 22,
        left: 61
    },
]

document.onkeydown = (e) => {
    // keycode left = 37 right = 39
    // Move left
    if (e.key === "ArrowLeft") {
        hero.left -= 1;
        moveHero()
        // Move right
    } else if (e.key === "ArrowRight") {
        hero.left += 1;
        moveHero()
    }
    // Shoot
    else if (e.key === " ") {
        missiles.push({
            left: hero.left + 1.4,
            top: hero.top - 1.4
        })
        drawMissiles()
    }
}

// MOVE HERO
function moveHero() {
    document.getElementById("hero").style.left = hero.left + "vw";
}

// DRAW MISSILES
function drawMissiles() {
    // alert("No");
    document.getElementById("missiles").innerHTML = ""
    for (let missile = 0; missile < missiles.length; missile++) {
        document.getElementById("missiles").innerHTML += `<div><p class='missile' style='left:${missiles[missile].left}vw ; top:${missiles[missile].top}vh;'>code</p></div>`;
    }
    // hitDetectionInvader();
}
//  MOVE MISSILES
function moveMissiles() {
    for (let missile = 0; missile < missiles.length; missile++) {
        missiles[missile].top -= 1;
    }
}
//  DRAW INVADERS
function drawInvaders() {
    // alert("No");
    document.getElementById("invaders").innerHTML = ""
    for (let invader = 0; invader < invaders.length; invader++) {
        let invaderElement = document.createElement("img");
        invaderElement.classList = "invader";
        invaderElement.src = `IMG/Invaders/i${invader}.png`
        invaderElement.style.left = `${invaders[invader].left}vw`
        invaderElement.style.top = `${invaders[invader].top}vw`
        invaderElement.id = `${invader}`

        document.getElementById("invaders").appendChild(invaderElement);
    }
}


//  MOVE INVADERS
function moveInvaders() {
    for (let invader = 0; invader < invaders.length; invader++) {
        invaders[invader].top += 0.05;
        // console.log(invaders)
    }
}

function hitDetectionInvader() {
    missiles.forEach((missile) => {
        //console.log(ins)
        for (let invader = 0; invader < invaders.length; invader++) {
            if (missile.left >= invaders[invader].left && missile.left <= (invaders[invader].left + 7) && missile.top <= (invaders[invader].top + 22)) {

                missiles.splice(missile, 1);
                let hit = invaders.splice(invader, 1);
                //    console.log(hit[0].top)
                console.log(invaders[invader])
                let invaderElement = Array.from(document.querySelectorAll(".invader"))


                let el = invaderElement[invader]
                el.remove()
                score += 10;
                console.log(score)
                setTimeout(youWon, 1000)
            }
        }
    })
}

function youWon(event) {
    if (score == 20) {
        document.getElementById("game").remove();
        document.getElementById("go").remove();
        document.getElementById("youWon").style.display ="flex"

// MUSICPLAYER

song.pause()
    song2.play();
    }
}

// GAME LOOP
function gameLoop() {
    drawInvaders();
    setTimeout(gameLoop, 150)
    moveInvaders();
    moveMissiles();
    drawMissiles();
    hitDetectionInvader()
}
gameLoop()
