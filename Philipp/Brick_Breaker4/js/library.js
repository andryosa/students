class Game {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d') //The getContext() method returns an object that provides methods and properties for drawing on the canvas.
        this.ballR = 10
        //Ball Position
        this.x = this.canvas.width / 2
        this.y = this.canvas.height - 60
        //Ball Direction
        this.movementX = 7
        this.movementY = -5
        //Catcher Dimensions

        // Key Boolean
        this.rightKey = false
        this.leftKey = false
        // Key Boolean 2nd Player
        this.rightKey2 = false
        this.leftKey2 = false
        //Bricks Grid
        this.brickRows = 3
        this.brickCol = 15
        this.aiBrickRows = 4
        this.aiBrickCol = 12
        this.brickCount = this.brickRows * this.brickCol;
        //Brick Dimensions
        this.brickW = ((this.canvas.width / this.brickCol) / 100) * 75
        this.brickOffset = (this.canvas.width - (this.brickW * this.brickCol)) / (this.brickCol + 1)
        this.aiBrickOffset = (this.canvas.width - (this.brickW * this.aiBrickCol)) / (this.aiBrickCol + 1)
        this.brickH = 40
        this.brickOffsetLeft = this.brickOffset
        this.brickPadding = this.brickOffset
        this.brickOffsetTop = 60
        this.aiBrickOffsetTop = (window.innerHeight / 2) - ((this.brickH * this.aiBrickRows) + (this.aiBrickOffset * (this.aiBrickRows - 1)) / 2)
        this.bricks;
        //catcher 
        this.catcherH = 15
        this.catcherW = 30 // this.canvas.width/8 //this.brickW * 1.5
        this.catcherX = (this.canvas.width - this.catcherW) / 2
        this.catcherY = this.canvas.height
        this.catcherX2 = this.catcherX + this.catcherW
        this.catcherY2 = this.canvas.height
        this.catcherSpeed = 12
        this.catcher;
        //2nd catcher 
        this.catcherSecondH = 15
        this.catcherSecondW = 30
        this.catcherSecondX = (this.canvas.width - this.catcherSecondW) / 2
        this.catcherSecondY = 0
        this.catcherSecondX2 = this.catcherSecondX + this.catcherSecondW
        this.catcherSecondY2 = 0
        //Collision Temp
        this.collisionBrickWTemp = false;
        this.collisionBrickHTemp = false;
        //Accoun Data
        this.accountName;
        this.firstName;
        this.lastName;
        this.email;
        this.passWord;
        this.highScore = 0;
        this.id;
        this.login = false;
        //misc
        this.score = 0;
        this.gradientsize = this.canvas.width * 5;
        this.playerLifes = 6;
        this.aiLifes = 6;
        this.aiActive = false;
        this.pausedGame = false;
        this.shadows = false;
        this.shadowsCatcher = false;
        this.shading = false;
        this.Fog = false;
        this.fps = 16.67;
        this.intervalId;
        this.running = false;
        this.audio = new Audio('./music/audio_file.mp3');
    }

    createCanvas() {
        const canvases = Array.from(document.getElementsByTagName('canvas'))
        if (canvases.length > 0) {
            canvases.forEach(canvas => {
                canvas.remove();
            })
        }

        this.canvas = document.createElement('canvas')
        this.canvas.id = 'canvas'
        document.body.appendChild(this.canvas)
        /*  document.getElementById('canvas').style.top = 0
         document.getElementById('canvas').style.position = 'absolute'
         document.getElementById('canvas').style.zIndex - 10; */
        this.ctx = this.canvas.getContext('2d')
    }

    drawCanvas(x = window.innerWidth, y = window.innerHeight) {
        this.ctx.canvas.width = x // 100 * 99
        this.ctx.canvas.height = y - 56 // 100 * 88
        this.x = this.canvas.width / 2
        this.y = this.canvas.height - 60
        this.brickW = ((this.canvas.width / this.brickCol) / 100) * 75
        this.brickOffset = (this.canvas.width - (this.brickW * this.brickCol)) / (this.brickCol + 1)
        this.brickOffsetLeft = this.brickOffset
        this.brickPadding = this.brickOffset
        this.catcherW = this.brickW * 2
        this.catcherSecondW = this.brickW * 2

    }
    randomNumGen(minNum, MaxNum) {
        return Math.floor(Math.random() * MaxNum) + minNum
    }

    randomNegativeGen(minNum, maxNum) {
        return Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    }


    createBricks(callback) {
        this.bricks = [];
        this.brickCount = this.brickRows * this.brickCol;
        for (let c = 0; c < this.brickCol; c++) {
            for (let r = 0; r < this.brickRows; r++) {
                this.bricks.push({
                    //push coordinates of the pivot point for each brick
                    x: (c * (this.brickW + this.brickPadding)) + this.brickOffsetLeft,
                    y: (r * (this.brickH + this.brickPadding)) + this.brickOffsetTop,
                    x2: ((c * (this.brickW + this.brickPadding)) + this.brickOffsetLeft) + this.brickW,
                    y2: ((r * (this.brickH + this.brickPadding)) + this.brickOffsetTop) + this.brickH,
                    status: 1,
                    lifes: callback(1, 4),
                    collisionBrickWTemp: false
                });
            }
        }
    }

    aiCreateBricks(callback) {

        this.bricks = [];
        this.brickCount = this.aiBrickRows * this.aiBrickCol;

        for (let c = 1; c < this.aiBrickCol + 1; c++) {
            for (let r = 1; r < this.aiBrickRows + 1; r++) {
                this.bricks.push({
                    //push coordinates of the pivot point for each brick
                    x: (c * (this.brickW + this.brickPadding)) + this.brickOffsetLeft,
                    y: (r * (this.brickH + this.brickPadding)) + this.aiBrickOffsetTop,
                    x2: ((c * (this.brickW + this.brickPadding)) + this.brickOffsetLeft) + this.brickW,
                    y2: ((r * (this.brickH + this.brickPadding)) + this.aiBrickOffsetTop) + this.brickH,
                    status: c % 2 ? 0 : 1,
                    lifes: callback(1, 4),
                    collisionBrickWTemp: false
                });
            }
        }
    }

    drawBall() {
        this.ctx.beginPath(); //The CanvasRenderingContext2D.beginPath() method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
        this.ctx.arc(this.x, this.y, this.ballR, 0, Math.PI * 2); //void ctx.arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
        this.ctx.fillStyle = "#ffffcc"; //The CanvasRenderingContext2D.fillStyle property of the Canvas 2D API specifies the color, gradient, or pattern to use inside shapes.
        this.ctx.fill() //method of the Canvas 2D API fills the current or given path with the current fillStyle
        this.ctx.closePath() //method of the Canvas 2D API attempts to add a straight line from the current point to the start of the current sub-path. If the shape has already been closed or has only one point, this function does nothing.
        //This method doesn't draw anything to the canvas directly. You can render the path using the stroke() or fill() methods.

    }

    drawBackground() {
        this.ctx.beginPath()
        let gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.gradientsize);

        gradient.addColorStop(0, '#ffff55');
        gradient.addColorStop(.5, '#00cccc');
        gradient.addColorStop(1, '#005566');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.closePath()
    }

    drawFog() {
        this.ctx.beginPath()
        let gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.gradientsize);

        gradient.addColorStop(0, '#ffff5566');
        gradient.addColorStop(.5, '#00cccc11');
        gradient.addColorStop(1, '#00667711');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.closePath()
    }

    drawcatcher() {
        this.ctx.beginPath();
        this.ctx.rect(this.catcherX, this.canvas.height - this.catcherH, this.catcherW, this.catcherH);
        this.ctx.fillStyle = "#00CC00"
        this.ctx.fill();
        this.ctx.closePath();
        this.catcher = {
            x: this.catcherX,
            y: this.canvas.height - this.catcherH,
            x2: this.catcherX + this.catcherW,
            y2: this.canvas.height
        }
    }

    drawcatcherSecond() {
        this.ctx.beginPath();
        this.ctx.rect(this.catcherSecondX, 0, this.catcherSecondW, this.catcherSecondH);
        this.ctx.fillStyle = "#00CC00"
        this.ctx.fill();
        this.ctx.closePath();
    }

    //EventListener
    EventListenerAdding() {
        document.addEventListener("keydown", this.keyDown, false);
        document.addEventListener("keyup", this.keyUp, false);
    }

    //eventHandler have to "refere" to game not "this" // this referece to "document" 
    keyDown(e) {
        game.rightKey = game.rightPressed(e);
        game.leftKey = game.leftPressed(e);
        game.rightKey2 = game.rightPressed2(e)
        game.leftKey2 = game.leftPressed2(2)
        game.pausePressed(e)
    }

    keyUp(e) {
        game.rightKey = game.rightPressed(e) ? false : game.rightKey;
        game.leftKey = game.leftPressed(e) ? false : game.leftKey;
        game.rightKey2 = game.rightPressed2(e) ? false : game.rightKey2;
        game.leftKey2 = game.leftPressed2(e) ? false : game.leftKey2;
    }

    rightPressed(e) {
        return e.keyCode == 39;
    }

    leftPressed(e) {
        return e.keyCode == 37;
    }
    rightPressed2(e) {

        return e.keyCode == 68;
    }
    leftPressed2(e) {
        return e.keyCode == 65;
    }
    pausePressed(e) {
        if (e.keyCode == 80 && this.running) {
            if (this.pausedGame == false) {
                this.pausedGame = true
                document.getElementById('container').innerHTML = `<div id="pauseContainer" class="mx-auto my-auto">
                <h1 id="pausedGame"> Game Paused</h1>
                </div>`
            } else {
                this.pausedGame = false
                document.getElementById('pauseContainer').remove()
            }
        }
    }

    drawBricks(outOfCanvas) {
        let centerPointX;
        let centerPointY;
        let xVec;
        let yVec;
        let multiplier = 1000
        let obj;
        let gradient;
        let brickColor;
        let gradientLenght;
        let VecComb;
        this.bricks.forEach(brick => {
            //if brick does not exist , don't draw
            if (!brick.status) return;
            //else draws each Brick
            this.ctx.beginPath();
            this.ctx.rect(brick.x, brick.y, this.brickW, this.brickH)
            this.ctx.fillStyle = brick.lifes == 1 ? "green" : brick.lifes == 2 ? "blue" : brick.lifes == 3 ? "#cccc00" : 'red';
            this.ctx.fill();
            this.ctx.lineWidth = "1";
            //this.ctx.strokeStyle = brick.lifes == 1 ? "lightgreen" : brick.lifes == 2 ? "lightblue" : brick.lifes == 3 ? "lightyellow" : 'lightred';
            this.ctx.strokeStyle = 'rgba(255, 255, 255 ,0.5)';
            // this.ctx.stroke()
            this.ctx.closePath();

            //Shading
            if (this.shading) {
                let alpha;
                let alpha2;
                let offset = 15
                let dist = 1000 //1000
                //dynamic shading model
                let gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 400)
                let gradient2 = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.canvas.width + this.canvas.height)
                gradient2.addColorStop(0, 'rgba(0, 0, 0, 0)');
                gradient2.addColorStop(1, `rgba(0, 0, 0, 1)`);
                this.ctx.beginPath()
                //top Poly

                if (this.x - brick.x < 0) {
                    alpha = 1 - (Math.abs(this.x - brick.x) / dist)
                    alpha2 = 1 - (Math.abs(this.y - (brick.y + this.brickH / 2)) / dist)
                    alpha = alpha * alpha2;
                    alpha = Math.min(alpha, 1)
                    gradient.addColorStop(0, `rgba(255, 255, 128, ${alpha})`);
                    gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');

                    // this.ctx.fillStyle = `rgba(220, 220, 0, ${alpha})`
                    this.ctx.fillStyle = gradient
                } else {
                    //alpha = 0
                    alpha = (Math.abs(this.x - brick.x) / dist)
                    alpha = Math.min(alpha, 1)
                    gradient2.addColorStop(1, `rgba(0, 0, 0, ${alpha/3})`);
                    this.ctx.fillStyle = gradient2
                }
                //this.ctx.strokeStyle = '#cccc00'+alpha.toFixed(1)*10
                this.ctx.moveTo(brick.x, brick.y);
                this.ctx.lineTo((brick.x + offset), (brick.y + offset));
                this.ctx.lineTo((brick.x + offset), (brick.y2 - offset));
                this.ctx.lineTo(brick.x, (brick.y2));
                //this.ctx.stroke()
                this.ctx.fill()
                this.ctx.closePath();

                //bottom Poly//
                this.ctx.beginPath()
                if (this.y - brick.y2 > 0) {
                    /*   alpha = this.normalizeNumber(this.y - brick.y2 ,this.canvas.height,brick.y2)*10
                      alpha =(Math.abs(alpha.toPrecision(2))) */
                    alpha = 1 - (Math.abs(this.y - brick.y2) / dist)
                    alpha2 = 1 - (Math.abs(this.x - (brick.x + this.brickW / 2)) / dist)
                    alpha = alpha * alpha2;
                    alpha = Math.min(alpha, 1)
                    gradient.addColorStop(0, `rgba(255, 255, 128, ${alpha})`);
                    this.ctx.fillStyle = gradient
                } else {
                    //alpha = 0
                    alpha = (Math.abs(this.y - brick.y) / dist)
                    alpha = Math.min(alpha, 1)
                    gradient2.addColorStop(1, `rgba(0, 0, 0, ${alpha/3})`);
                    this.ctx.fillStyle = gradient2
                }

                //this.ctx.fillStyle = `rgba(220, 220, 0, ${alpha})`
                //this.ctx.strokeStyle = '#cccc00'+alpha.toFixed(1)*10
                this.ctx.moveTo(brick.x, brick.y2);
                this.ctx.lineTo((brick.x + offset), (brick.y2 - offset));
                this.ctx.lineTo((brick.x2 - offset), (brick.y2 - offset));
                this.ctx.lineTo((brick.x2), (brick.y2));
                //this.ctx.stroke()
                this.ctx.fill()
                this.ctx.closePath();

                this.ctx.beginPath()
                //right Poly
                if (this.x - brick.x2 > 0) {
                    /*   alpha = this.normalizeNumber(this.x - brick.x2 ,this.canvas.width,brick.x2)*10
                      alpha =1-(Math.abs(alpha.toPrecision(2))) */
                    alpha = 1 - (Math.abs(this.x - brick.x2) / dist)
                    alpha2 = 1 - (Math.abs(this.y - (brick.y + this.brickH / 2)) / dist)
                    alpha = alpha * alpha2;
                    alpha = Math.min(alpha, 1)
                    gradient.addColorStop(0, `rgba(255, 255, 128, ${alpha})`);
                    this.ctx.fillStyle = gradient
                } else {
                    //alpha = 0
                    alpha = (Math.abs(this.x - brick.x2) / dist)
                    alpha = Math.min(alpha, 1)
                    gradient2.addColorStop(1, `rgba(0, 0, 0, ${alpha/3})`);
                    this.ctx.fillStyle = gradient2
                }

                //this.ctx.fillStyle = `rgba(220, 220, 0, ${alpha})`
                //this.ctx.strokeStyle = '#cccc00'+alpha.toFixed(1)*10
                this.ctx.moveTo(brick.x2, brick.y2);
                this.ctx.lineTo((brick.x2 - offset), (brick.y2 - offset));
                this.ctx.lineTo((brick.x2 - offset), (brick.y + offset));
                this.ctx.lineTo((brick.x2), (brick.y));
                //this.ctx.stroke()
                this.ctx.fill()
                this.ctx.closePath();
                this.ctx.beginPath();

                //top Poly
                if (this.y - brick.y < 0) {
                    /*   alpha = this.normalizeNumber(this.y- brick.y ,brick.y,0)*10
                      alpha =(Math.abs(alpha.toPrecision(2))) */
                    alpha = 1 - (Math.abs(this.y - brick.y) / dist)
                    alpha2 = 1 - (Math.abs(this.x - (brick.x + this.brickW / 2)) / dist)
                    alpha = alpha * alpha2;
                    alpha = Math.min(alpha, 1)
                    gradient.addColorStop(0, `rgba(255, 255, 128, ${alpha})`);
                    this.ctx.fillStyle = gradient
                } else {
                    //alpha = 0
                    alpha = (Math.abs(this.x - brick.y2) / dist)
                    alpha = Math.min(alpha, 1)
                    gradient2.addColorStop(1, `rgba(0, 0, 0, ${alpha/3})`);
                    this.ctx.fillStyle = gradient2
                }

                //this.ctx.fillStyle = `rgba(220, 220, 0, ${alpha})`
                //this.ctx.strokeStyle = '#cccc00'+alpha.toFixed(1)*10
                this.ctx.moveTo(brick.x2, brick.y);
                this.ctx.lineTo((brick.x2 - offset), (brick.y + offset));
                this.ctx.lineTo((brick.x + offset), (brick.y + offset));
                this.ctx.lineTo((brick.x), (brick.y));
                //this.ctx.stroke()
                this.ctx.fill()
                this.ctx.closePath();
            }
        });
    }



    normalizeNumber(val, max, min) {
        return (val - min) / (max - min);
    }



    collisionDetection() {
        this.bricks.forEach(brick => {
            //if brick does not exist, don't detect collision
            if (!brick.status) return;
            //True if x is bigger than the left side position and  smaller than the right side position /
            let collisionBrickW = this.x >= brick.x && this.x <= brick.x + this.brickW,
                //True if y is bigger than the Bottom side position and smaller than the Top  side position 

                collisionBrickH = this.y >= brick.y && this.y <= brick.y + this.brickH;
            
            // If true , Ball is inside the Brick

            if (collisionBrickW && collisionBrickH) {
                // by collision invert Ball Movement
                if (brick.collisionBrickWTemp) {

                    this.movementY = -this.movementY;

                } else {

                    this.movementX = -this.movementX;

                }
                //reduce lifes
                brick.lifes--;
                //add to score
                this.score += brick.lifes == 3 ? 250 : brick.lifes == 2 ? 150 : brick.lifes == 1 ? 100 : 50
                // and delete the brick if lifes is at 0
                brick.status = brick.lifes == 0 ? 0 : 1;
                // reduce brick count
                if (brick.status == 0) this.brickCount--;
                // assigne the last approach direction

            }
            brick.collisionBrickWTemp = collisionBrickW
        })

    }

    drawScore() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 16px Arial"
        this.ctx.fillText(`Score : ${this.score}`, 100, 20);
        if (this.score > this.highScore) {
            this.highScore = this.score
            this.updateNavScore()
        }
    }

    drawLifes() {
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 16px Arial"
        this.ctx.fillText(`lifes : ${this.playerLifes}`, 12, 20);
        if (this.aiActive) {
            this.ctx.fillStyle = "white";
            this.ctx.font = "bold 16px Arial"
            this.ctx.fillText(`AI lifes : ${this.aiLifes}`, this.canvas.width - 100, 20);
        }
    }

    reduceLife() {
        this.x = this.canvas.width / 2
        this.y = this.canvas.height - 60
        if (this.fps == 33.33) {
            this.movementX = 16
            this.movementY = -10
            this.catcherSpeed = 24
        } else if (this.fps == 16.67) {
            this.movementX = 8
            this.movementY = -5
            this.catcherSpeed = 12
        } else {
            this.movementX = 4
            this.movementY = -2.5
            this.catcherSpeed = 6
        }
        this.playerLifes--;
    }
    aiReduceLife() {
        this.x = this.canvas.width / 2
        this.y = 60
        if (this.fps == 33.33) {
            this.movementX = -16
            this.movementY = 10
            this.catcherSpeed = 24
        } else if (this.fps == 16.67) {
            this.movementX = -8
            this.movementY = 5
            this.catcherSpeed = 12
        } else {
            this.movementX = -4
            this.movementY = 2.5
            this.catcherSpeed = 6
        }
        this.aiLifes--;
    }

    //arrow function will link "this" to where it is written not executed?
    outOfCanvas = (vert1, xVec, vert2, yVec) => {
        let endx;
        let endy;
        if (Math.sign(xVec) == 1 && Math.sign(yVec) == 1) {
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 - xVec;

                yVec = yVec * i;
                endy = vert2 - yVec;
                if (endx < 0 && endy < 0) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }

        } else if (Math.sign(xVec) == -1 && Math.sign(yVec) == 1) {
            xVec = Math.abs(xVec)
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 + xVec;

                yVec = yVec * i;
                endy = vert2 - yVec;
                if (endx > this.ctx.canvas.width && endy < 0) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }

        } else if (Math.sign(xVec) == 1 && Math.sign(yVec) == -1) {
            yVec = Math.abs(yVec)
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 - xVec;

                yVec = yVec * i;
                endy = vert2 + yVec;
                if (endx < 0 && endy > this.ctx.canvas.height) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }

        } else if (Math.sign(xVec) == -1 && Math.sign(yVec) == -1) {
            xVec = Math.abs(xVec)
            yVec = Math.abs(yVec)
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 + xVec;

                yVec = yVec * i;
                endy = vert2 + yVec;
                if (endx > this.ctx.canvas.width && endy > this.ctx.canvas.height) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }


            ///////////////////////////////////////////////
            ///////////////////////////////////////////////

        } else if (Math.sign(xVec) == 0 && Math.sign(yVec) == 1) {

            for (let i = 1;; i++) {
                xVec = 0;
                endx = vert1 + xVec;

                yVec = yVec * i;
                endy = vert2 - yVec;
                if (endy < 0) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }
        } else if (Math.sign(xVec) == 0 && Math.sign(yVec) == -1) {
            yVec = Math.abs(yVec)
            for (let i = 1;; i++) {
                xVec = 0;
                endx = vert1 + xVec;

                yVec = yVec * i;
                endy = vert2 + yVec;
                if (endy > this.ctx.canvas.height) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }
        } else if (Math.sign(xVec) == 1 && Math.sign(yVec) == 0) {
            yVec = Math.abs(yVec)
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 - xVec;

                yVec = 0;
                endy = vert2 + yVec;
                if (endx < 0) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }
        } else if (Math.sign(xVec) == -1 && Math.sign(yVec) == 0) {
            xVec = Math.abs(xVec)
            for (let i = 1;; i++) {
                xVec = xVec * i;
                endx = vert1 + xVec;

                yVec = 0;
                endy = vert2 + yVec;
                if (endx > this.ctx.canvas.width) {
                    return {
                        endx: endx,
                        endy: endy
                    }
                }
            }
        } else if (Math.sign(xVec) == 0 && Math.sign(yVec) == 0) {
            xVec = 0;
            endx = vert1 + xVec;

            yVec = 0;
            endy = vert2 + yVec;
            return {
                endx: endx,
                endy: endy
            }

        }
    }

    drawShadows(outOfCanvas) {
        let xVec1;
        let yVec1;
        let xVec2;
        let yVec2;
        let obj;
        let gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.gradientsize);
        /*  gradient.addColorStop(0, '#888822');
         gradient.addColorStop(.5, '#009999');
         gradient.addColorStop(1, '#006677'); */
        gradient.addColorStop(0, '#888822');
        gradient.addColorStop(.5, '#008888');
        gradient.addColorStop(1, '#005566');
        if (this.shadowsCatcher) {

            this.ctx.strokeStyle = gradient
            this.ctx.fillStyle = gradient;

            //Catcher Shadow//
            xVec1 = (this.x - this.catcherX)
    
            yVec1 = (this.y - this.canvas.height - this.catcherH)
            obj = outOfCanvas(this.catcherX, xVec1, (this.canvas.height - this.catcherH), yVec1)
            xVec1 = obj.endx
            yVec1 = obj.endy
            this.ctx.beginPath();

            this.ctx.moveTo(this.catcherX, (this.canvas.height - this.catcherH));
            this.ctx.lineTo(xVec1, yVec1);
            xVec2 = (this.x - this.catcherX)
            yVec2 = (this.y - (this.canvas.height - this.catcherH))
            obj = outOfCanvas(this.catcherX, xVec2, (this.canvas.height - this.catcherH), yVec2)
            xVec2 = obj.endx
            yVec2 = obj.endy
            this.ctx.lineTo(xVec2, yVec2);
            this.ctx.lineTo(this.catcherX, this.canvas.height);
            this.ctx.stroke()
            this.ctx.fill()


            this.ctx.moveTo(this.catcherX, this.canvas.height);
            this.ctx.lineTo(xVec2, yVec2);
            xVec1 = (this.x - (this.catcherX + this.catcherW))
            yVec1 = (this.y - (this.canvas.height - this.catcherH))
            obj = outOfCanvas((this.catcherX + this.catcherW), xVec1, (this.canvas.height - this.catcherH), yVec1)


            xVec1 = obj.endx
            yVec1 = obj.endy
            this.ctx.lineTo(xVec1, yVec1);
            this.ctx.lineTo((this.catcherX + this.catcherW), this.canvas.height);
            this.ctx.fill()
            this.ctx.stroke()


            this.ctx.moveTo((this.catcherX + this.catcherW), this.canvas.height);
            this.ctx.lineTo(xVec1, yVec1);
            xVec2 = (this.x - (this.catcherX + this.catcherW))
            yVec2 = (this.y - (this.canvas.height - this.catcherH))
            obj = outOfCanvas((this.catcherX + this.catcherW), xVec2, (this.canvas.height - this.catcherH), yVec2)
            xVec2 = obj.endx
            yVec2 = obj.endy
            this.ctx.lineTo(xVec2, yVec2);
            this.ctx.lineTo((this.catcherX + this.catcherW), (this.canvas.height - this.catcherH));
            this.ctx.fill()
            this.ctx.stroke()
            this.ctx.closePath();
        }
        if (this.shadows) {
            this.bricks.forEach(brick => {
                if (brick.status == 0) {
                    return;
                } else {

                    //first EdgeShadow

                    //calc vector for vertex1
                    xVec1 = (this.x - brick.x)

                    yVec1 = (this.y - brick.y)

                    obj = outOfCanvas(brick.x, xVec1, brick.y, yVec1)
                    xVec1 = obj.endx
                    yVec1 = obj.endy
                    this.ctx.beginPath();
                    //this.ctx.strokeStyle = '#006677'


                    this.ctx.strokeStyle = gradient
                    this.ctx.fillStyle = gradient;
                    //this.ctx.fillStyle = '#006677'
                    this.ctx.moveTo(brick.x, brick.y);
                    this.ctx.lineTo(xVec1, yVec1);
                    //calc vector for vertex2
                    xVec2 = (this.x - brick.x)

                    yVec2 = (this.y - brick.y2)

                    obj = outOfCanvas(brick.x, xVec2, brick.y2, yVec2)
                    xVec2 = obj.endx
                    yVec2 = obj.endy
                    this.ctx.lineTo(xVec2, yVec2);
                    this.ctx.lineTo(brick.x, brick.y2);
                    this.ctx.stroke()
                    this.ctx.fill()

                    //second EdgeShadow
                    this.ctx.moveTo(brick.x, brick.y2);
                    this.ctx.lineTo(xVec2, yVec2);

                    xVec1 = (this.x - brick.x2)

                    yVec1 = (this.y - brick.y2)

                    obj = outOfCanvas(brick.x2, xVec1, brick.y2, yVec1)
                    xVec1 = obj.endx
                    yVec1 = obj.endy
                    this.ctx.lineTo(xVec1, yVec1);
                    this.ctx.lineTo(brick.x2, brick.y2);

                    this.ctx.fill()
                    this.ctx.stroke()

                    //third EdgeShadow
                    this.ctx.moveTo(brick.x2, brick.y2);
                    this.ctx.lineTo(xVec1, yVec1);

                    xVec2 = (this.x - brick.x2)
                    yVec2 = (this.y - brick.y)

                    obj = outOfCanvas(brick.x2, xVec2, brick.y, yVec2)
                    xVec2 = obj.endx
                    yVec2 = obj.endy
                    this.ctx.lineTo(xVec2, yVec2);
                    this.ctx.lineTo(brick.x2, brick.y);

                    this.ctx.fill()
                    this.ctx.stroke()

                    this.ctx.closePath();
                }
            })
        }
    }

    cleanCanvas() {
        const canvases = Array.from(document.getElementsByTagName('canvas'))
        if (canvases.length > 0) {
            canvases.forEach(canvas => {
                canvas.remove();
            })
        }
    }

    logOut() {
        this.aiActive = false;
        this.aiLifes = 6;
        this.accountName;
        this.firstName;
        this.lastName;
        this.email;
        this.passWord;
        this.highScore = 0;
        this.login = false;
        this.shadows
        this.shadowsCatcher
        this.shading
        this.fog
        this.fps
    }

    checkLogin() {
        const data = JSON.parse(localStorage.getItem('data'))
        if (data == null) {
            return false;
        } else {
            let check = false
            data.forEach(acc => {
                if (acc.login){
                     check = true;
                this.aiActive = false;
                this.aiLifes = 6;
                this.accountName = acc.accountName
                this.firstName = acc.firstName
                this.lastName = acc.lastName
                this.email = acc.email
                this.passWord = acc.passWord
                this.highScore = acc.highScore
                this.id = acc.id;
                this.login = acc.login
                this.shadows = acc.shadows
                this.shadowsCatcher = acc.shadowsCatcher
                this.shading = acc.shading
                this.fog = acc.fog
                this.fps = acc.fps
}
            })
            if (check) return true;
        }
    }

    drawTryAgainScreen() {
        document.getElementById('container').innerHTML = `
        <div class="card col-sm-6  col-md-4 col-lg-3 pt-3  mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg ">
            <div class="card-head text-center border-secondary">
                <h2>Try Again ?</h2>
            </div>
            <div class="card-body">
                <div class="py-3" id="output"></div>
                <div class="container text-center ">
                    <form onclick=tryAgainHandler(event)>
                        <button value="yes" class=" m-3   btn btn-lg btn-success   text-center"
                            type="submit">Yes</button>
                        <button value="no" class=" m-3 btn btn-lg btn-danger   text-center"
                            type="submit">No</button>
                    </form>
                </div>
            </div>
        </div>`;
    }

    drawYouWonScreen() {
        document.getElementById('container').innerHTML = `
        <div class="card col-sm-6 col-md-4 col-lg-3  pt-3  mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg ">
            <div class="card-head text-center border-secondary">
                <h1>Congratulation</h1>
                <h2>You Won</h2>
                <br><br><br>
                <h2>Do you want to try again?</h2>
            </div>
            <div class="card-body">
                <div class="py-3" id="output"></div>
                <div class="container text-center ">
                    <form onclick=tryAgainHandler(event)>
                        <button value="yes" class=" m-3   btn btn-lg btn-success   text-center"
                            type="submit">Yes</button>
                        <button value="no" class=" m-3 btn btn-lg btn-danger   text-center" type="submit">No</button>
                    </form>
                </div>
            </div>
        </div>`;
    }

    clearGame() {
        this.running = false;
        clearInterval(this.intervalId)
    }

    playMusic() {
        this.audio.play();
    }

    stopMusic() {
        this.audio.pause()
    }

    artificialIntelligence() {
        let right = false;
        let left = false;
        let margin = 120
        let pointOfInterest = this.x - ((this.catcherW / 2) + this.randomNumGen(0, margin) * this.randomNegativeGen())
        if (pointOfInterest > this.catcherSecondX) {
            right = true;
        } else {
            left = true;
        }
        let maxX2 = this.canvas.width - this.catcherSecondW,
            minX2 = 0,
            catcherDelta2 = right ? this.catcherSpeed : left ? -(this.catcherSpeed) : 0;

        this.catcherSecondX = this.catcherSecondX + catcherDelta2;
        this.catcherSecondX = Math.min(this.catcherSecondX, maxX2);
        this.catcherSecondX = Math.max(this.catcherSecondX, minX2);
    }

    draw = () => {
        const that = this
        if (GameOver()) {
            this.aiActive = false;
            this.stopMusic()
            this.running = false;
            console.log('gameover')
            clearInterval(this.intervalId)
            this.drawTryAgainScreen()
            return;
        }
        if (GameWon()) {
            this.aiActive = false;
            clearInterval(this.intervalId)
            this.drawYouWonScreen()
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.shadows) {
            this.drawBackground()
        }
        this.drawShadows(this.outOfCanvas);
        this.drawBricks(this.outOfCanvas);
        this.drawBall();
        this.drawcatcher();
        if (this.fog) {
            this.drawFog();
        }
        this.drawLifes();
        this.drawScore();
        this.collisionDetection();

        if (this.pausedGame === true) {
            return;
        }

        //////////////////
        /// Game Logic ///

        if (hitCanvasWall())
            that.movementX = -that.movementX;

        if (hitCanvasTop() || hitCatcher())
            //invert y movement 
            that.movementY = -that.movementY;

        if (loss()) {
            that.reduceLife()
        };

        // all functions executed in if conditions

        function GameOver() {
            return that.playerLifes == 0
        }

        function GameWon() {
            return that.brickCount == 0
        }

        function hitCatcher() {
            return hitCanvasBottom() && ballOverCatcher();
        }
        // checks if the ball and Catcher are in the same x space
        function ballOverCatcher() {
            return that.x > that.catcherX && that.x < that.catcherX + that.catcherW;
        }

        function hitCanvasBottom() {
            return that.y + that.movementY > that.canvas.height - that.ballR;
        }
        // game over if ball hits the canvas bottom but the Catcher in not in the same x space
        function loss() {
            return hitCanvasBottom() && !ballOverCatcher()
        }

        function hitCanvasWall() {
            return that.x + that.movementX > that.canvas.width - that.ballR || that.x + that.movementX < that.ballR;
        }

        function hitCanvasTop() {
            return that.y + that.movementY < that.ballR;
        }

        /*  function xOutOfBounds() {
             return that.x + that.movementX > that.canvas.width - that.ballR || that.x + that.movementX < that.ballR;
         } */
        function setMovement() {
            let x = Math.floor(Math.random() * 10) + (-4)
            that.movementX = x
            that.movementY = Math.abs(x) - 6
        }

        let maxX = that.canvas.width - that.catcherW,
            minX = 0,
            catcherDelta = that.rightKey ? this.catcherSpeed : that.leftKey ? -(this.catcherSpeed) : 0;

        that.catcherX = that.catcherX + catcherDelta;
        that.catcherX = Math.min(that.catcherX, maxX);
        that.catcherX = Math.max(that.catcherX, minX);

        //Append movement
        that.x += that.movementX;
        that.y += that.movementY;
    }

    /////////////////////////////////////////////////////////////////////////
    ////////////////////    Vs Artificial Inteligence     ///////////////////

    drawVsAi = () => {
        const that = this
        if (GameOver()) {
            this.stopMusic()
            this.running = false;
            console.log('gameover')
            clearInterval(this.intervalId)
            this.drawTryAgainScreen()
            return;
        }
        if (GameWon()) {
            clearInterval(this.intervalId)
            this.drawYouWonScreen()
            return;
        }

        if (aiGameWon()) {
            clearInterval(this.intervalId)
            this.drawYouWonScreen()
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.shadows) {
            this.drawBackground()
        }
        this.drawShadows(this.outOfCanvas);
        this.drawBricks(this.outOfCanvas);
        this.drawBall();

        this.drawcatcherSecond();
        this.drawcatcher();
        if (this.fog) {
            this.drawFog();
        }
        this.drawLifes();
        this.drawScore();
        this.collisionDetection();

        if (this.pausedGame === true) {
            return;
        }
        this.artificialIntelligence();
        //////////////////
        /// Game Logic ///
        //////////////////

        if (hitCanvasWall())
            that.movementX = -that.movementX;

        if (hitCatcher())
            that.movementY = -that.movementY;

        // reduce ai lifes

        if (aiHitCatcher()) {
            that.movementY = -that.movementY;
        }

        if (loss()) {
            that.reduceLife()
        };
        if (aiLoss()) {
            this.aiReduceLife()
        }

        function GameOver() {
            return that.playerLifes == 0
        }

        function GameWon() {
            return that.brickCount == 0
        }

        function aiGameWon() {
            return that.aiLifes == 0
        }

        function hitCatcher() {
            return hitCanvasBottom() && ballOverCatcher();
        }

        function aiHitCatcher() {
            return hitCanvasTop() && aiBallOverCatcher();
        }

        // checks if the ball and Catcher are in the same x space
        function ballOverCatcher() {
            return that.x > that.catcherX && that.x < that.catcherX + that.catcherW;
        }

        function aiBallOverCatcher() {
            return that.x > that.catcherSecondX && that.x < that.catcherSecondX + that.catcherW;
        }

        function hitCanvasBottom() {
            return that.y + that.movementY > that.canvas.height - that.ballR;
        }
        // game over if ball hits the canvas bottom but the Catcher in not in the same x space
        function loss() {
            return hitCanvasBottom() && !ballOverCatcher()
        }

        function aiLoss() {
            return hitCanvasTop() && !aiBallOverCatcher()
        }

        function hitCanvasTop() {
            return that.y + that.movementY < 0;
        }

        function hitCanvasWall() {
            return that.x + that.movementX > that.canvas.width - that.ballR || that.x + that.movementX < that.ballR;
        }

        function hitCanvasTop() {
            return that.y + that.movementY < that.ballR;
        }

        /*  function xOutOfBounds() {
             return that.x + that.movementX > that.canvas.width - that.ballR || that.x + that.movementX < that.ballR;
         } */
        function setMovement() {
            let x = Math.floor(Math.random() * 10) + (-4)
            that.movementX = x
            that.movementY = Math.abs(x) - 6
        }

        let maxX = that.canvas.width - that.catcherW,
            minX = 0,
            catcherDelta = that.rightKey ? this.catcherSpeed : that.leftKey ? -(this.catcherSpeed) : 0;

        that.catcherX = that.catcherX + catcherDelta;
        that.catcherX = Math.min(that.catcherX, maxX);
        that.catcherX = Math.max(that.catcherX, minX);

        //Append movement
        that.x += that.movementX;
        that.y += that.movementY;
    }

    drawGame(fpsInput) {
        if (!fpsInput) {
            fpsInput = this.fps
        }
        if (this.fps == 33.33) {
            this.movementX = 16;
            this.movementY = -10;
            this.catcherSpeed = 24
        } else if (this.fps == 16.67) {
            this.movementX = 8;
            this.movementY = -5;
            this.catcherSpeed = 12
        } else {
            this.movementX = 4
            this.movementY = -2.5
            this.catcherSpeed = 6
        }
        //this.pausePressed = false
        this.running = true
        this.intervalId = setInterval(this.draw, fpsInput)
    }



    drawGameVsAi(fpsInput) {
        this.aiActive = true;
        if (!fpsInput) {
            fpsInput = this.fps
        }
        if (this.fps == 33.33) {
            this.movementX = 16;
            this.movementY = -10;
            this.catcherSpeed = 24
        } else if (this.fps == 16.67) {
            this.movementX = 8;
            this.movementY = -5;
            this.catcherSpeed = 12
        } else {
            this.movementX = 4
            this.movementY = -2.5
            this.catcherSpeed = 6
        }
        this.running = true
        //this.pausePressed = false
        this.intervalId = setInterval(this.drawVsAi, fpsInput)
    }

    logIn(account) {
        if (account) {
            this.login = account.login;
            this.accountName = account.accountName
            this.firstName = account.firstName
            this.lastName = account.lastName
            this.email = account.email
            this.highScore = account.highScore
            this.passWord = account.passWord
            this.id = account.id
            this.shadows = account.shadows;
            this.shadowsCatcher = account.shadowsCatcher;
            this.shading = account.shading;
            this.fog = account.fog;
            this.fps = account.fps;
        }

        const nav = document.getElementById('profile')
        nav.innerHTML = `<li id="navScore" class="nav-item ml-auto"><a class="nav-link">HighScore : ${this.highScore}</a></li>
        <li class="nav-item dropdown ml-auto">
            <a class="nav-link dropdown-toggle text-light" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                ${this.accountName} </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-info bg-dark shadow-lg"
                aria-labelledby="navbarDropdownMenuLink-4">
                <div class="card mx-2">
                    <div class="card-head">
                    </div>
                    <div class="card-body bg-dark">
                        <button onclick=logoutHandler(event) class="btn btn-block btn-primary">LogOut</button>
                    </div>
                </div>
            </div>
        </li>   `
      

    }

    updateNavScore() {
        document.getElementById('navScore').innerHTML = `<a class="nav-link">HighScore : ${this.highScore}</a>`
    }

    createNavbar(x) {
        let nav;
        if (x == 'main') {
            nav = document.getElementById('nav')
            nav.innerHTML = ` <a class="navbar-brand" href="#">BreakOut.io</a>
            <ul id="profile" class="navbar-nav ml-auto">
          `

        } else if (x == 'game') {
            nav = document.getElementById('nav')
            nav.innerHTML = ` <a class="navbar-brand" href="#">BreakOut</a>
            <ul class="navbar-nav font-weight-bold">
                <li class="nav-item">
                    <a onclick=getLobbyHandler(event) class="nav-link" href="#">Main Menu</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="graphics" data-toggle="dropdown">
                        Graphics
                    </a>
                    <div onclick=graphicHandler(event) class="dropdown-menu bg-dark  font-weight-bold">
                        <a id="sb" value=${this.shadows ? "on" : "off" } class="dropdown-item text-light" href="#">shadows Bricks : <span class=${this.shadows ? "text-success" : "text-danger" }>${this.shadows ? "on" : "off" } </span> </a>
                        <a id="sc" value=${this.shadowsCatcher ? "on" : "off" }  class="dropdown-item text-light" href="#">shadows Catcher: <span class=${this.shadowsCatcher ? "text-success" : "text-danger" }>${this.shadowsCatcher ? "on" : "off" }</span> </a>
                        <a id="sh" value=${this.shading ? "on" : "off" } class="dropdown-item text-light" href="#">Shading : <span class=${this.shading ? "text-success" : "text-danger" }>${this.shading ? "on" : "off" }</span> </a>
                        <a id="fg" value=${this.fog ? "on" : "off" } class="dropdown-item text-light" href="#"> Fog : <span class=${this.fog ? "text-success" : "text-danger" }>${this.fog ? "on" : "off" }</span> </a>
                        <a id="fps" value=${this.fps == 33.33 ?"30" : 16.67?  "60": "120" } class="dropdown-item text-light" href="#"> FPS : <span class=${this.fps ==33.33? "text-success" : "text-danger" }>
                        30</span> | <span class=${this.fps ==16.67 ? "text-success" : "text-danger" }>
                        60</span> | <span class=${this.fps ==8.33? "text-success" : "text-danger" }>
                       120</span></a>
                    </div>
                </li>
                 <li class="nav-item">
                    <a onclick=getLeaderBoardHandler(event) class="nav-link" href="#">Leader Board</a>
                </li>

            </ul>
            <ul id="profile" class="navbar-nav ml-auto font-weight-bold">
                <li id="logIn" class="nav-item ml-auto"><a class="nav-link" onclick=newLoginHandler(event)> Login</a></li>
            </ul>`
        }
    }
    createRegister() {
        const container = document.getElementById('container')
        container.innerHTML = ` <div class="card col-sm-6 col-md-4 col-lg-3 pt-5  mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg ">
        <div class="card-head text-center">
            <h2>Register an Account</h2>
        </div>
        <div class="card-body">
            <form id="form">
                <div>
                    <div class="form-group">
                        <label for="accountName">Account Name*</label>
                        <input id="accountName" class="form-control" type="text" placeholder="Account Name">
                    </div>
                    <div class="form-group">
                        <label for="firstName">Firstname*</label>
                        <input id="firstName" class="form-control" type="text" placeholder="Lastname">
                    </div>
                    <div class="form-group">
                        <label for="lastName">Lastname*</label>
                        <input id="lastName" class="form-control" type="text" placeholder="Lastname">
                    </div>
                    <div class="form-group">
                        <label for="email">email*</label>
                        <input id="email" class="form-control" type="text" placeholder="email">
                    </div>
                    <div class="form-group">
                        <label for="passWord">Password*</label>
                        <input id="passWord" class="form-control" type="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="passWordR">repeat Password*</label>
                        <input id="passWordR" class="form-control" type="password" placeholder="repeat Password">
                    </div>
                </div>
                <div class="py-3" id="output"></div>
                <div class="container text-center ">
                    <button onclick=registerHandler(event) class="btn btn-primary btn-block text-center"
                        type="submit">Submit</button>
                </div>
            </form>
            <hr class="bg-secondary">
            <div class="card-footer p-4  text-center ">
                <div class="card-text">
                    You allready have an Account? 
                    <br>
                    <a href='' onclick=getLoginHandler(event) > Back to the Login </a>
                </div>
            </div>
        </div>
    </div>`

    }
    createLogin() {
        const container = document.getElementById('container')
        container.innerHTML = `<div id="container" class="col-12 row position-absolute  bg-transparent">
        <div
            class="card col-sm-6 col-md-4 col-lg-3 pt-5 my-5 mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg ">
            <div class="card-head text-center border-secondary">
                <h2>Login</h2>
            </div>
            <div class="card-body">
                <form id="form">
                    <div>
                        <div class="form-group">
                            <label for="accountName">Account Name*</label>
                            <input id="accountName" class="form-control" type="text" placeholder="Account Name">
                        </div>
                        <div class="form-group">
                            <label for="passWord">Password*</label>
                            <input id="passWord" class="form-control" type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="py-3" id="output"></div>
                    <div class="container text-center ">
                        <button onclick=loginHandler(event) class="btn btn-primary btn-block text-center"
                            type="submit">login</button>
                    </div>
                </form>
            </div>
            <hr class="bg-secondary">
            <div class="card-footer p-4  text-center ">
                <div class="card-text">
                    new Visitor? <a href='' onclick=getRegisterHandler(event) > Create an Account</a>
                </div>
            </div>
        </div>
    </div> `
    }

    createlobby() {
        this.aiActive = false;
        this.aiLifes = 6;
        const container = document.getElementById('container')
        container.innerHTML = `<div
        class="card col-sm-6 col-md-4 col-lg-3 py-5  mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg ">
        <div class="card-head text-center">
            <h4>welcome to</h4>
            <h1>Breakout</h1>
        </div>
        <div class="btn-group btn-group-toggle p-4  " data-toggle="buttons">
            <label class="btn btn-info active">
              <input id="onePlayer" type="radio" name="options" id="option1" autocomplete="off" checked> One Player
            </label>
            <label class="btn btn-info">
              <input id="twoPlayer" type="radio" name="options" id="option2" autocomplete="off"> vs AI
            </label>
          </div>
        <div class="card-body">
            <button onclick=StartGameHandler(event) class="btn btn-primary btn-block ">Start Game</button>
        </div>
    </div>`
    }

    //leaderBoardList
    createLeaderBoard() {
        document.getElementById('container').innerHTML = `<div
        class="card col-sm-6 col-md-5 col-lg-4 py-5  mx-auto my-auto  bg-dark text-light rounded border border-secondary shadow-lg overflow-auto">
        <div class="card-head text-center">
            <h1 class="font-weight-bold">Leader Board</h1>
        </div>
        <div class="card-body text-center">
            <ul id="leaderBoardList" class="list-group list-group-flush text-light">
            </ul>
        </div>
    </div>`
        const data = JSON.parse(localStorage.getItem('data'))
        const leaderBoard = document.getElementById("leaderBoardList")
        data.sort((x, y) => {
            return y.highScore - x.highScore;
        })
        data.forEach(acc => {
            leaderBoard.innerHTML += `<li class="list-group-item list-group-item-dark bg-dark text-light">
            ${acc.accountName}  : ${acc.highScore}</li>`
        })
    }

    refreshContainer() {
        const container = document.getElementById('container')
        container.innerHTML = '';
    }

    /* static account(accountName, firstName, lastName, email, passWord, data) {
        this.accountName = accountName,
            this.firstName = firstName,
            this.lastName = lastName,
            this.email = email,
            this.passWord = passWord,
            this.id = data == null ? 0 : data.length
    } */

    setData(data) {
        this.shadows = data.shadows;
        this.shadowsCatcher = data.shadowsCatcher;
        this.shading = data.shading;
    }
}

class Account {
    constructor(accountName, firstName, lastName, email, passWord, highScore, id, login, shadows, shadowsCatcher, shading, fog, fps) {
        this.accountName = accountName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passWord = passWord;
        this.highScore = highScore;
        this.id = id;
        this.login = login;
        this.shadows = shadows;
        this.shadowsCatcher = shadowsCatcher;
        this.shading = shading;
        this.fog = fog;
        this.fps = fps;
    }
}