const board = document.getElementById("board");
const menu = document.getElementById("menu");
const game = document.getElementById("game");

let holes = [];

let score = 0;
let miss = 0;

let speed = 1000;
let grid = 3;

let running = false;
let paused = false;

let timer;


let high =
localStorage.getItem("highscore") || 0;


document.getElementById("high").innerText = high;



function selectLevel(level){

    // hide menu
    menu.style.display = "none";

    // show game
    game.style.display = "block";


    if(level === "easy"){

        grid = 3;
        speed = 1000;

    }


    if(level === "medium"){

        grid = 5;
        speed = 650;

    }


    if(level === "hard"){

        grid = 9;
        speed = 350;

    }


    createBoard();


    startGame();

}





function createBoard(){


    board.innerHTML = "";

    holes = [];


    board.style.gridTemplateColumns =
    `repeat(${grid},1fr)`;


    let size =
    Math.min(300, window.innerWidth*0.8) / grid;



    for(let i=0;i<grid*grid;i++){


        let hole =
        document.createElement("div");


        hole.className="hole";


        hole.style.width =
        size+"px";


        hole.style.height =
        size+"px";




        let mole =
        document.createElement("div");


        mole.className="mole";



        hole.appendChild(mole);


        board.appendChild(hole);



        holes.push(mole);




        mole.addEventListener("click",(e)=>{


            e.stopPropagation();


            hitMole(mole,e);


        });


    }

}







function startGame(){


    running=true;


    clearInterval(timer);


    timer =
    setInterval(
        showMole,
        speed
    );


}







function showMole(){


    if(!running || paused)
        return;



    holes.forEach(m=>{

        m.classList.remove("up");

    });



    let mole =
    holes[
        Math.floor(
        Math.random()*holes.length)
    ];



    mole.classList.add("up");




    setTimeout(()=>{


        if(mole.classList.contains("up")){


            mole.classList.remove("up");


            miss++;


            update();



            if(miss >= 20){

                gameOver();

            }


        }


    },speed);


}








function hitMole(mole,e){


    if(!running || paused)
        return;



    if(mole.classList.contains("up")){


        score++;


        mole.classList.remove("up");



        showHammer(e);



        // increase speed every 5 hits

        if(score % 5 === 0){


            speed -= 100;


            if(speed < 150)
                speed = 150;



            clearInterval(timer);


            timer =
            setInterval(
                showMole,
                speed
            );


        }



        update();


    }


}







function update(){


    document.getElementById("score")
    .innerText = score;


    document.getElementById("miss")
    .innerText = miss;



    if(score > high){


        high = score;


        localStorage.setItem(
            "highscore",
            high
        );


        document.getElementById("high")
        .innerText = high;

    }


}








function pauseGame(){


    paused = !paused;


}







function restartGame(){

    location.reload();

}








function gameOver(){


    running=false;


    clearInterval(timer);



    alert(
        "🐹 GAME OVER\n\nScore : "
        +score+
        "\nMiss : "
        +miss
    );



    location.reload();

}








function showHammer(e){


    const hammer =
    document.getElementById("hammer");



    hammer.style.left =
    e.clientX+"px";


    hammer.style.top =
    e.clientY+"px";


    hammer.style.display="block";



    setTimeout(()=>{

        hammer.style.display="none";


    },150);


}
