//global variables
let godmode=true;

let daBall = {
    left: 575,
    top: 70
}
let daBallO = document.getElementById('daBall');

let daBallMiddleX = daBallO.offsetWidth / 2;

let daPadO = document.getElementById('pad');
let daPadMiddleX = daPadO.offsetWidth / 2;

let wallO = document.querySelector('.wallStyle');
let ballOutO = document.getElementById('ballOut');
//console.log(ballOutO);
let padMaxY = wallO.clientLeft + wallO.clientWidth - daPadO.clientWidth - 5;
let addX = 1,
    addY = 0; //these are added to the balls position
let loopcntr = 0; // just a loopcounter to see if the loop runs
let gamePaused = true;
let gameOver = false;
let gameStart= true;
let globalInterval = 10;
if (godmode){globalInterval=2;}
let playerScore = 0;
let scoreDisplay = document.querySelector('.score');
let hScoreDisplay = document.querySelector('.highscore');
let highScore = 0;
let brickcounter = 75;
addY = -1;
elem=document.querySelector('.main');

if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }

////end global 


// eventlisteners
document.addEventListener("DOMContentLoaded", bricksInit());
document.querySelector(".main").addEventListener("mousemove", function (event) {
    padMove(event);
});
document.querySelector(".main").addEventListener("click", function () {
  if (!gameStart){newGame()};
});
document.getElementById('wellcomeLogIn').addEventListener("click", loginF);
//document.getElementById('wellcomeRegister').addEventListener("click", loginF);
document.getElementById('wellcomeRegister').addEventListener("click", registerF);
/* document.querySelector('#saveId').addEventListener('click', addToListF); 

  // Remove task event
  document.querySelector('#tbodyId').addEventListener('click', deleteItem); 
*/
  
  
// eventhandler


function loginF(){
  //login
  // get data from ls
  // datastructure gamerTAG e-mail password highscore
  let userlist;
  if(localStorage.getItem('bdwuserLS') === null){
    userlist = [];
  } else {
    userlist = JSON.parse(localStorage.getItem('bdwuserLS'));
  }

  //check login data
  let tagMailT= document.getElementById("tmIn").value;
  //check if tagmail is there indexOf
  let chkN;
    chkN=userlist.indexOf(tagMailT); 
  if(!chkN==-1){
    
    while (chkN%4==2){
//if gamertag or mail is used as password by other
      chkNNew=userlist.indexOf(tagMailT,chkN);
      chkN=chkNNew; 
    }
    if (chkN%4==1){chkN-=1;} // check if search is for email instead of tag
  }else{/*no such tag or email, try again*/}

    let psswrdT= document.getElementById("pwIn").value;
if (psswrdT==userlist[chkN+2]){console.log('gogogo') }else{console.log('no such tag or email, try again')}

  console.log(tagMailT, psswrdT);

  let eMail=userlist[chkN+2];
  let pHS=userlist[chkN+3]; //personal HS

  //ok, go
// no account inside, try again.

 newGame(event);gameStart=false;  goDisplay.style.visibility = 'hidden';
  goDisplay.innerHTML='';
}
function registerF(){

  goDisplay = document.getElementById('gameover');
  goMessage = `<br>
  <h3>Registration! You know the deal!</h2>
  <form action="">
  <h5>GamerTAG</h4>
 <input id="gtInR" type="text" name="TAGMAIL" placeholder="awesomeGamer">
 <br>
 <h5>E-Mail</h4>
 <input id="mailInR" type="text" name="TAGMAIL" placeholder="awesomeGamer">
 <br>
 <h5>Password:</h4>
  <input id="pwInR"type="password" name="passWord" placeholder="iamsherlocked">
  <br>
  <h5>repeat Password:</h4>
  <input id="pwInreR"type="password" name="passWord" placeholder="iamsherlocked">
  <br>
  <div id="wellcomeRegisterR" class="brick red" style="font-size: small;width: 7vw; height: 5vh; position:absolute; left: 31.5vw; top: 60vh;"><br><p>Register</p>
  </div>
</form> 
  
  `
  goDisplay.innerHTML = goMessage;
 // goDisplay.style.visibility = "visible";

  //register
  // get data from ls
  //check login data
//ok, go
// no account inside, try again.


  // end
 // newGame();gameStart=false;  goDisplay.style.visibility = 'hidden';
 // goDisplay.innerHTML='';
}

function newGame() {
    console.log('howdy')
    if (gameOver) {
        goDisplay.style.visibility = 'hidden';
        goDisplay.innerHTML=''
        gamePaused = false;
        gameOver = false;
        gameStart=false;
daBall.top=70;
        playerScore = 0;
         brickcounter = 75;
        addY = -1;
       // addX=1;
bricksInit();
        initGameLoop();

    }

}


function padMove(e) {

    let y = e.clientX - wall.offsetLeft;
    if (y < wall.clientLeft) {
        y = wall.scrollLeft
    }
    //console.log(y);
    if (y < padMaxY) {
        daPadO.style.left = y + "px";
    } else {
        daPadO.style.left = padMaxY + "px";
    }
}

////end eventhandler


//function section



function bricksInit() {

    let wall = document.getElementById('wall');

    daBall.left = parseInt(wall.offsetWidth / 2) + wall.offsetLeft;

    // build brickwall
    let divO;
    for (row = 0; row < 5; row++) {
        for (key = 0; key < 16; key++) {
            testBrick =  (document.getElementById('brick' + (((row + 1) * 100) + key)));

            if (testBrick){testBrick.remove();

            }
            // Create element
            divO = document.createElement('div');

            // Add class
            let rndmBricks = ['brick red', 'brick blue', 'brick green', 'brick yellow'];
            divO.className = rndmBricks[Math.floor(Math.random() * 4)]; //'brick red';

            //  divO.innerText='  .'

            // Add id
            divO.id = ('brick' + (((row + 1) * 100) + key));

            divO.style.zIndex = ('10');
            divO.style.left = (`${key*4.9+1}vw`);
            divO.style.top = (`${row*5+10}vh`); //multiplier defines
            divO.visCstm = true;

            wall.appendChild(divO);
            //        brickcounter = 75;
            addX=1;
            
        }
    }
}
// end bricksInit

/* collDtctn collision detection
the idea is to compare the positions and dimensions of two html elements by their left, top, 
width and heightproperties. the function will return the edge where the main object collides 
with the collider or if no collision happend returns the boolean value false. false can be 
easyly used to create a simple first test like if (!collDtctn(mainObj, mOx, collider, cx)).

if a collision happend, it returns the edge where it happend as a string i.e. bottom, top,
left, right.

mainObj is the main object, mOx is a multiplier for the mainObj values,
collider is an element that may or may not have collided with the main object 
and cx is the multiplier for the second element. 

the x in mOx and cx stand for multiplied, not for an x coordinate. these multipliers 
make it easier to check html elements that look round */
function collDtctn(mainObj, mOx, collider, cx) {

    // get the positions of the four edges for both objects
    let mOt = mainObj.offsetTop; //value of the top edge
    let mOb = mOt + mainObj.offsetHeight; //value of the bottom edge
    let mOl = mainObj.offsetLeft;
    let mOr = mOl + mainObj.offsetWidth;

    let ct = collider.offsetTop; //value of the top edge
    let cb = ct + collider.offsetHeight; //value of the bottom edge
    let cl = collider.offsetLeft;
    let cr = cl + collider.offsetWidth;

    // distance from mainObj to collider as long as all 4 are >0 return false
    dt = mOt - cb;
    db = ct - mOb;

    //check if collision happend
    if (mOt <= cb && mOb > cb && ((mOr > cl && mOr < cr) || (mOl > cl && mOl < cr))) {
        //    console.log('top');
        return 'top'
    }

    if (mOb > ct && mOt < ct && ((mOr > cl && mOr < cr) || (mOl > cl && mOl < cr))) {
        //   console.log('bottom', mOb);
        return 'bottom'
    }
    return false
}

function ballmove() {
    daBall.top = daBall.top + addY+(addY>0?-1*Math.abs(addX/10):Math.abs(addX/10));
    daBallO.style.top = daBall.top + 'vh';
    if (daBallO.offsetTop + 5 <= wallO.clientTop) {
        addY = Math.abs(addY)
    }
    if (daBallO.offsetLeft + 5 <= wallO.clientLeft) {
        addX = Math.abs(addX)
    }
    if (daBallO.offsetLeft + daBallO.clientWidth >= wallO.clientLeft + wallO.clientWidth) {
        addX = Math.abs(addX) * -1
    }


    //addX=0;
    daBallO.offsetLeft = daBall.left;
    //console.log(daBall.left, addX);

    daBall.left = daBall.left + addX;

    daBallO.style.left = daBall.left + 'px';
}

function chckBrickCllsn() {
    console.log(brickcounter, 'new')

    let brick;
    for (r = 100; r < 600; r += 100) {
        for (b = 0; b < 16; b++) {

            brick = document.querySelector('#brick' + (r + b));
            // console.log(brick);
            //  console.log(collDtctn(daBallO,100,brick,100))      ;
            if (brick) {
                result = collDtctn(daBallO, 100, brick, 100);

                if (result == 'top') {
                   
                    brick.remove();

                    addY = Math.abs(addY);
                    //   console.log('t');
                    playerScore += 10;
                    scoreDisplay.innerHTML = 'Your Score :' + playerScore;
                    if (highScore < playerScore) {

                        highScore = playerScore;

                        hScoreDisplay.innerHTML = 'Highscore :' + highScore;
                        brickcounter -= 1;
                    }

                }
                if (result == 'bottom') {
                    brick.remove();

                    addY = Math.abs(addY) * -1;
                    //   console.log('b');
                    playerScore += 10;
                    scoreDisplay.innerHTML = 'Your Score :' + playerScore;
                    if (highScore < playerScore) {

                        highScore = playerScore;
                        hScoreDisplay.innerHTML = 'Highscore :' + highScore;
                        brickcounter -= 1;

                    }


                }
            }
 //           if (brickcounter < 1) {
                if (!document.querySelector('.brick')) {
                    //clearInterval(running)
                daBall.top = 70;
                daBall.left = daBallO.offsetWidth / 2 + daBallO.offsetLeft;
                bricksInit();

                brickcounter = 75;
            }

        }
    }
}

function chckBallOutCllsn() {
    if (collDtctn(daBallO, 100, ballOutO, 100) == 'bottom') {
        //  console.log('ballout');
if(godmode){addY = Math.abs(addY) * -1;}else{gameOver = true;} // game mode
     ///    addY = Math.abs(addY) * -1; // god mode  
        // addY=0;
        // addX=0;
    }
}

function chckPadCllsn() {
    if (collDtctn(daBallO, 100, daPadO, 100) == 'bottom') {
        addY = Math.abs(addY) * -1;
        //   console.log('b');
        if (daPadO.offsetLeft + daPadO.clientWidth * .35 > daBallO.offsetLeft && addX > -5) {
            addX -= 1;

        } else
        if (daPadO.offsetLeft + daPadO.clientWidth * .65 < daBallO.offsetLeft && addX < 5) {
            addX += 1
        } //else{addX=0}
    }
}


//main gameloop here
function initGameLoop() {
    running = setInterval(gameLoop, globalInterval); // starts the gameloop
}

function gameOverF() {
    clearInterval(running);
    goDisplay = document.getElementById('gameover');
    goMessage = `<br>
    <h3>Game Over</h2>
    <h4>You played well...</h3>
    <br>
    <h4>...for a blind, onehanded wookie</h3>
    <br>
    <h4>your score is ${playerScore}</h3>
    <br>
    <h4>wanna play again?</h3>
    <h4>push the left mousebutton and have fun</h3>
    <br>
    
    `
    goDisplay.innerHTML = goMessage;
    goDisplay.style.visibility = "visible";
    // goDisplay.style.cursor="pointer" 
}

function wellcomeF() {
  //  clearInterval(running);
    goDisplay = document.getElementById('gameover');
    goDisplay.style.visibility = "visible";
    
    // goDisplay.style.cursor="pointer" 
}

function gameLoop() {
    console.log(gameStart);
    if (!gameStart){
    console.log(addX, addY);
    loopcntr++;
    //    setTimeout(gameLoop, 10);
    if (gameOver) {
        gameOverF();

    }
    ballmove();
    chckBrickCllsn();
    chckPadCllsn();
    chckBallOutCllsn();
}}

initGameLoop();
wellcomeF();
  
  //end of gamesection





