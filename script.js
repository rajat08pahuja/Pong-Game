alert("Are you Ready🎈🎈");
let x = true;
let y = true;

let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let body = document.querySelector("body");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let leftPlayerLives = 3;
let rightPlayerLives = 3;

body.addEventListener("keydown" , function(e){
    console.log(e.key);
    if(e.key == 'w'){
        movePaddle(leftPaddle , -window.innerHeight*0.1);
    } else if(e.key == 's'){
        movePaddle(leftPaddle , window.innerHeight*0.1);
    } else if(e.key == 'ArrowUp'){
        movePaddle(rightPaddle , -window.innerHeight*0.1);
    } else if(e.key == 'ArrowDown'){
        movePaddle(rightPaddle , window.innerHeight*0.1);
    }
})

function movePaddle(cPaddle , change){
    let cPaddleCoords = cPaddle.getBoundingClientRect();
    if(cPaddleCoords.top + change >= board.getBoundingClientRect().top && cPaddleCoords.bottom + change <= board.getBoundingClientRect().bottom){
        cPaddle.style.top = cPaddleCoords.top + change + "px";
    }
}

function setColor(idx){
    let colors = document.querySelectorAll(".fa-circle");
    colors[idx].style.color = "#686de0";
}

function moveBall(){
    let ballCoord = ball.getBoundingClientRect();
    let boardCoord = board.getBoundingClientRect();
    let leftPaddleCoords = leftPaddle.getBoundingClientRect();
    let rightPaddleCoords = rightPaddle.getBoundingClientRect();
    let boardTop = boardCoord.top;
    let boardLeft = boardCoord.left;
    let boardRight = boardCoord.right;
    let boardBottom = boardCoord.bottom;
    let ballTop = ballCoord.top;
    let ballLeft = ballCoord.left;
    let ballRight = ballCoord.right;
    let ballBottom = ballCoord.bottom;

    let hasTouchedLeft = ballLeft <= boardLeft;
    let hasTouchedRight =  ballRight >= boardRight;

    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColor(leftPlayerLives);
            if(leftPlayerLives == 0){
                alert("Game Over. Player 🅱 has won 💥💥");
                document.location.reload();
            } else{
                return resetGame();
            }
        } else{
            rightPlayerLives--;
            setColor(rightPlayerLives + 3);
            if(rightPlayerLives == 0){
                alert("Game Over. Player 🅰 has won 💥💥");
                document.location.reload();
            } else{
                return resetGame();
            }
        }
    }

    function resetGame(){
        ball.style.top = window.innerHeight * 0.45 + "px";
        ball.style.left = window.innerWidth * 0.5 + "px";
        requestAnimationFrame(moveBall);
    }
    
    if(ballTop <= boardTop || ballBottom >= boardBottom){
        y = !y;
    }

    // collisions with paddles
    if(ballLeft <= leftPaddleCoords.right && ballRight >= leftPaddleCoords.left && ballTop + 30 >= leftPaddleCoords.top && ballBottom - 30 <= leftPaddleCoords.bottom){
        x = !x;
    }

    if(ballLeft <= rightPaddleCoords.right && ballRight >= rightPaddleCoords.left && ballTop + 30 >= rightPaddleCoords.top && ballBottom - 30 <= rightPaddleCoords.bottom){
        x = !x;
    }
    
    
    ball.style.top = y == true ? ballTop + 4 + "px" : ballTop - 4 + "px";
    ball.style.left = x == true ? ballLeft + 4 + "px" : ballLeft - 4 + "px";
    
    requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);