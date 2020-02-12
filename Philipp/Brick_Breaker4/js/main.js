let game;
game = new Game();

if (game.checkLogin()) {
    game.createlobby()
    game.createNavbar('profile')
    console.log(game.shadows)
} else {
    game.createLogin()
    game.createNavbar('main')
}

console.log(game)

function registerHandler(e) {
    document.getElementById('output').innerHTML = '';
    let data;
    const accountName = document.getElementById('accountName').value
    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const passWord = document.getElementById('passWord').value
    const passWordR = document.getElementById('passWordR').value

    if (accountName == '' || firstName == '' || lastName == '' || email == '') {
        //div.className = 'text-warning'
        document.getElementById('output').className = 'text-warning text-center py-3'
        document.getElementById('output').innerHTML = 'Please fill out every Input';

    } else {
        if (passWord != passWordR) {
            document.getElementById('output').className = 'text-warning text-center py-3'
            document.getElementById('output').innerHTML = 'Your Password does not match';
        } else {

            data = JSON.parse(localStorage.getItem('data'))

            const account = new Account(accountName, firstName, lastName, email, passWord, 0, (data == null ? 0 : data.length), true, true, true, true, true, 16.67)
            console.log(data)
            console.log(account)
            let check = true;
            if (data == null) {

                data = [];
            } else {

                data.forEach(element => {
                    if (element.accountName == account.accountName) {
                        document.getElementById('output').innerHTML = 'This Account Name is allready taken, please choose a different one'
                        document.getElementById('output').className = 'text-warning text-center py-3'
                        check = false
                    }
                });

            }
            if (check) {
                data.push(account)
                localStorage.setItem('data', JSON.stringify(data))
                game.logIn(account)
                game.createlobby()
            }
        }
    }
    e.preventDefault()
}

function StartGameHandler(e) {
    if (game.intervalId != undefined) {
        game.clearGame()
    }
    const onePlayer = document.getElementById('onePlayer').checked
    const twoPlayer = document.getElementById('twoPlayer').checked
    if (onePlayer) {
        game.playerLifes = 6
        game.score = 0;
        game.EventListenerAdding()
        game.refreshContainer()
        game.createCanvas()
        game.drawCanvas()
        game.createBricks(game.randomNumGen)
        game.playMusic()
        game.drawGame()
    } else {
        game.playerLifes = 6
        game.score = 0;
        game.EventListenerAdding()
        game.refreshContainer()
        game.createCanvas()
        game.drawCanvas()
        game.aiCreateBricks(game.randomNumGen)
        game.drawGameVsAi()
    }
    e.preventDefault()
}

function loginHandler(e) {
    document.getElementById('output').innerHTML = '';
    let data;
    const accountName = document.getElementById('accountName').value
    const passWord = document.getElementById('passWord').value
    if (accountName == '' || passWord == '') {
        document.getElementById('output').className = 'text-warning text-center py-3'
        document.getElementById('output').innerHTML = accountName == '' && passWord == '' ? 'Please fill in Account Name & Password' : accountName == '' ? 'Please fill in your Account Name' : 'Please fill in your Password'
    } else {
        data = JSON.parse(localStorage.getItem('data'))
        if (data == null) {
            document.getElementById('output').className = 'text-warning text-center py-3'
            document.getElementById('output').innerHTML = 'Can not find your Account';
        } else {
            let check = true;
            data.forEach(acc => {
                if (acc.accountName == accountName) {
                    check = false
                    if (acc.passWord == passWord) {
                        const account = new Account(acc.accountName, acc.firstName, acc.lastName, acc.email, acc.passWord, acc.highScore, acc.id, true, acc.shadows, acc.shadowsCatcher, acc.shading, acc.fog, acc.fps)
                        game.logIn(account)
                        saveDataLocal()
                        game.createlobby()
                    } else {
                        document.getElementById('output').className = 'text-warning text-center py-3'
                        document.getElementById('output').innerHTML = 'Password is not correct';
                    }
                }
            })
            if (check) {
                document.getElementById('output').className = 'text-warning text-center py-3'
                document.getElementById('output').innerHTML = 'Can not find your Account';
            }

        }
    }
    e.preventDefault()
}

function getRegisterHandler(e) {

    game.createRegister()
    e.preventDefault()
}

function tryAgainHandler(e) {

    if (e.target.value == 'yes') {
        if (game.aiActive) {
            game.playerLifes = 6
            game.aiLifes = 6
            game.score = 0;
            game.cleanCanvas()
            game.refreshContainer()
            game.createCanvas()
            game.drawCanvas()
            game.aiCreateBricks(game.randomNumGen)
            game.playMusic()
            game.drawGameVsAi()
        } else {
            game.playerLifes = 6
            game.score = 0;
            game.refreshContainer()
            game.createCanvas()
            game.drawCanvas()
            game.createBricks(game.randomNumGen)
            game.playMusic()
            game.drawGame()
        }
    } else {
        game.stopMusic()
        game.refreshContainer()
        game.cleanCanvas()
        game.createlobby()
    }
    e.preventDefault()
}

function logoutHandler(e) {
    if (game.intervalId != undefined) {
        game.clearGame()
    }
    game.login = false;
    saveDataLocal()
    game.logOut();

    game.cleanCanvas()
    game.refreshContainer()
    game.createNavbar('game')
    e.preventDefault()
}

function newLoginHandler(e) {
    game.cleanCanvas()
    game.refreshContainer()
    game.createLogin()
    e.preventDefault()
}

function graphicHandler(e) {
    if (e.target.id == "sb") {
        if (e.target.value == "on") {
            game.shadows = false;
            e.target.value = 'off'
            e.target.children[0].textContent = 'off'
            e.target.children[0].className = 'text-danger'
        } else {
            game.shadows = true;
            e.target.value = 'on'
            e.target.children[0].textContent = 'on';
            e.target.children[0].className = 'text-success'
        }
    } else if (e.target.id == "sc") {
        if (e.target.value == "on") {
            game.shadowsCatcher = false;
            e.target.value = 'off';
            e.target.children[0].textContent = 'off';
            e.target.children[0].className = 'text-danger'
        } else {
            game.shadowsCatcher = true;
            e.target.value = 'on'
            e.target.children[0].textContent = 'on'
            e.target.children[0].className = 'text-success'
        }
    } else if (e.target.id == "sh") {
        if (e.target.value == "on") {
            game.shading = false;
            e.target.value = 'off'
            e.target.children[0].textContent = 'off'
            e.target.children[0].className = 'text-danger'
        } else {
            game.shading = true;
            e.target.value = 'on'
            e.target.children[0].textContent = 'on'
            e.target.children[0].className = 'text-success'
        }
    } else if (e.target.id == "fg") {
        if (e.target.value == "on") {
            game.fog = false;
            e.target.value = 'off'
            e.target.children[0].textContent = 'off'
            e.target.children[0].className = 'text-danger'
        } else {
            game.fog = true;
            e.target.value = 'on'
            e.target.children[0].textContent = 'on'
            e.target.children[0].className = 'text-success'
        }
    } else if (e.target.id == "fps") {
        if (e.target.value == "30") {
            game.fps = 16.67;
            e.target.value = '60'
            e.target.children[0].className = 'text-danger'
            e.target.children[1].className = 'text-success'
            e.target.children[2].className = 'text-danger'
        } else if (e.target.value == "60") {
            game.fps = 8.33;
            e.target.value = '120'
            e.target.children[0].className = 'text-danger'
            e.target.children[1].className = 'text-danger'
            e.target.children[2].className = 'text-success'
        } else {
            game.fps = 33.33;
            e.target.value = '30'
            e.target.children[0].className = 'text-success'
            e.target.children[1].className = 'text-danger'
            e.target.children[2].className = 'text-danger'
        }
    }
    saveDataLocal()
    e.preventDefault()
}

function getLobbyHandler(e) {
    game.stopMusic()
    if (game.intervalId != undefined) {
        game.clearGame()
    }
    if (game.login == true) {
        saveDataLocal()
        game.cleanCanvas()
        game.refreshContainer()
        game.createlobby()
    } else {
        game.cleanCanvas()
        game.refreshContainer()
    }
    e.preventDefault();
}

function getLoginHandler() {
    game.refreshContainer()
    game.createLogin()
}

function getLeaderBoardHandler() {
    game.refreshContainer()
    game.createLeaderBoard()
}

function saveDataLocal() {
    const account = new Account(game.accountName, game.firstName, game.lastName, game.email, game.passWord, game.highScore, game.id, game.login, game.shadows, game.shadowsCatcher, game.shading, game.fog, game.fps)
    let data = JSON.parse(localStorage.getItem('data'))
    data.forEach((acc, i) => {
        if (acc.id == game.id) {
            data[i] = account;
        }
    })
    localStorage.setItem('data', JSON.stringify(data))
}


window.onload = function () {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data != null) {
        data.forEach((acc, i) => {
            if (acc.login) {
                const account = new Account(game.accountName, game.firstName, game.lastName, game.email, game.passWord, game.highScore, game.id, game.login, game.shadows, game.shadowsCatcher, game.shading, game.fog, game.fps)
                game.logIn(account)
                game.login = true;
                data[i] = account;
                console.log(account.shadows)
            }
        })
    }
}

/* function updateGame() {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data != null) {
        console.log(data)
        data.forEach((acc) => {
            if (acc.login) {
                const account = new Account(acc.accountName, acc.firstName, acc.lastName, acc.email, acc.passWord, acc.highScore, acc.id, acc.logIn)
                game.logIn(account)
            }
        })
    }
} */