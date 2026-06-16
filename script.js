const menu = document.getElementById("menu");
const game = document.getElementById("game");
const board = document.getElementById("board");

let score = 0;
let miss = 0;

let grid = 3;
let speed = 1000;

let timer;
let running = false;
let paused = false;

let moles = [];

let highScore =
localStorage.getItem("highscore") || 0;


document.getElementById("high").innerText = highScore;



function selectLevel(level){

    console.log("Level selected:", level);


    menu.style.display = "none";
    game.style.display = "block";



    if(level === "easy"){

        grid = 3;
        speed = 1000;

    }


    if(level === "medium"){

        grid = 5;
        speed = 600;

    }


    if(level === "hard"){

        grid = 9;
        speed = 300;

    }


    createBoard();


    running = true;


    timer = setInterval(
        spawnMole,
        speed
    );

}





function createBoard(){


    board.innerHTML = "";

    board.style.gridTemplateColumns =
    `repeat(${grid},1fr)`;


    moles=[];



    for(let i=0;i<grid*grid;i++){


        let hole =
        document.createElement("div");


        hole.className="hole";



        let mole =
        document.createElement("div");


        mole.className="mole";



        hole.appendChild(mole);

        board.appendChild(hole);


        moles.push(mole);



        mole.onclick=function(e){


            e.stopPropagation();


            hit(mole,e);


        };


    }


}






function spawnMole(){


    if(!running || paused)
        return;



    moles.forEach(m=>{

        m.classList.remove("up");

    });



    let random =
    Math.floor(
    Math.random()*moles.length);



    let mole =
    moles[random];


    mole.classList.add("up");



    setTimeout(()=>{


        if(mole.classList.contains("up")){


            mole.classList.remove("up");


            miss++;


            update();



            if(miss>=20){

                endGame();

            }


        }


    },speed);



}







function hit(mole,e){


    if(!mole.classList.contains("up"))
        return;



    score++;


    mole.classList.remove("up");



    showHammer(e);



    if(score%5===0){


        speed -= 100;


        if(speed < 150)
            speed=150;


        clearInterval(timer);


        timer=setInterval(
            spawnMole,
            speed
        );


    }




    update();


}






function update(){


document.getElementById("score")
.innerText=score;


document.getElementById("miss")
.innerText=miss;



if(score>highScore){


highScore=score;


localStorage.setItem(
"highscore",
highScore
);


document.getElementById("high")
.innerText=highScore;


}


}







function pauseGame(){


paused=!paused;


}







function restartGame(){

location.reload();

}







function endGame(){


running=false;


clearInterval(timer);


alert(
"Game Over\nScore: "+score
);


location.reload();


}






function showHammer(e){


let hammer =
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
