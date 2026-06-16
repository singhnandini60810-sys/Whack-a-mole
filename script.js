const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");

const level = document.getElementById("level");
const startBtn = document.getElementById("start");

const scoreText = document.getElementById("score");
const missText = document.getElementById("miss");
const timeText = document.getElementById("time");
const highText = document.getElementById("high");


let score = 0;
let miss = 0;
let time = 30;

let running = false;
let paused = false;

let moleSpeed = 700;

let timer;
let gameLoop;


let highScore =
localStorage.getItem("highscore") || 0;


highText.innerText = highScore;



// Enable start after selecting level

level.addEventListener("change",()=>{


    if(level.value){

        startBtn.disabled = false;

        moleSpeed = Number(level.value);

    }

});




// Start game

function startGame(){


    if(running)
        return;


    running = true;
    paused = false;


    timer = setInterval(()=>{


        if(!paused){


            time--;


            timeText.innerText = time;



            if(time <= 0){

                endGame();

            }

        }


    },1000);




    gameLoop =
    setInterval(
        showMole,
        moleSpeed
    );


}





// Random mole appearance

function showMole(){


    if(!running || paused)
        return;



    moles.forEach(mole=>{

        mole.classList.remove("up");

    });




    let randomIndex =
    Math.floor(
        Math.random()*moles.length
    );



    let mole =
    moles[randomIndex];



    mole.classList.add("up");



    setTimeout(()=>{


        if(mole.classList.contains("up")){


            mole.classList.remove("up");


            miss++;


            missText.innerText = miss;


        }


    },moleSpeed);

}





// Mole hit detection

moles.forEach(mole=>{


    mole.addEventListener("click",(event)=>{


        event.stopPropagation();



        if(!running || paused)
            return;




        if(mole.classList.contains("up")){


            score++;


            scoreText.innerText =
            score;



            mole.classList.remove("up");



            showHammer(event);



            updateHighScore();


        }


    });


});






// Miss clicking empty holes

holes.forEach(hole=>{


    hole.addEventListener("click",()=>{


        if(
            running &&
            !paused
        ){


            miss++;


            missText.innerText =
            miss;


        }


    });


});






// High score system

function updateHighScore(){


    if(score > highScore){


        highScore = score;


        localStorage.setItem(
            "highscore",
            highScore
        );


        highText.innerText =
        highScore;


    }


}






// Pause

function pauseGame(){


    if(!running)
        return;


    paused = !paused;



    document.querySelector("button:nth-of-type(2)")
    .innerText =
    paused ? "Resume" : "Pause";


}






// Restart

function restartGame(){


    clearInterval(timer);

    clearInterval(gameLoop);


    score = 0;

    miss = 0;

    time = 30;


    scoreText.innerText = 0;

    missText.innerText = 0;

    timeText.innerText = 30;



    moles.forEach(m=>{

        m.classList.remove("up");

    });



    running = false;

    paused = false;


    startBtn.disabled =
    !level.value;


}






// Game over

function endGame(){


    running = false;


    clearInterval(timer);

    clearInterval(gameLoop);



    moles.forEach(m=>{

        m.classList.remove("up");

    });



    alert(
        "🎮 Game Over!\n\nScore: "
        + score +
        "\nMiss: "
        + miss
    );


}






// Hammer animation

function showHammer(e){


    const hammer =
    document.getElementById("hammer");


    hammer.style.left =
    e.clientX + "px";


    hammer.style.top =
    e.clientY + "px";


    hammer.style.display =
    "block";



    setTimeout(()=>{


        hammer.style.display =
        "none";


    },200);


}
