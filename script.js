const board =
document.getElementById("board");


const menu =
document.getElementById("menu");


const game =
document.getElementById("game");



let holes=[];

let score=0;

let miss=0;


let speed=1000;

let grid=3;


let running=false;

let paused=false;


let timer;



let high =
localStorage.getItem("highscore") || 0;


document.getElementById("high").innerText =
high;





function selectLevel(level){


menu.style.display="none";

game.style.display="block";



if(level==="easy"){

grid=3;

speed=1100;

}


if(level==="medium"){

grid=5;

speed=700;

}


if(level==="hard"){

grid=9;

speed=400;

}



createBoard();

startGame();


}






function createBoard(){


board.innerHTML="";



board.style.gridTemplateColumns =
`repeat(${grid},1fr)`;



holes=[];



for(let i=0;i<grid*grid;i++){


let hole =
document.createElement("div");


hole.className="hole";


hole.style.width =
`${300/grid}px`;


hole.style.height =
`${300/grid}px`;



let mole =
document.createElement("div");


mole.className="mole";


hole.appendChild(mole);



board.appendChild(hole);



holes.push(mole);



mole.onclick=(e)=>{


e.stopPropagation();



hitMole(mole,e);



};


}



}






function startGame(){


running=true;


timer=setInterval(showMole,speed);


}







function showMole(){


if(!running || paused)
return;



holes.forEach(m=>{

m.classList.remove("up");

});



let random =
holes[
Math.floor(Math.random()*holes.length)
];



random.classList.add("up");



setTimeout(()=>{


if(random.classList.contains("up")){


random.classList.remove("up");


miss++;


update();



if(miss>=20)

gameOver();


}



},speed);





}






function hitMole(m,e){


if(
!running ||
paused
)

return;



if(m.classList.contains("up")){


score++;


m.classList.remove("up");



showHammer(e);



if(score%5===0){


speed-=100;


clearInterval(timer);

timer=setInterval(
showMole,
Math.max(200,speed)
);


}



if(score%8===0){

speed-=100;

}


update();


}



}







function update(){


document.getElementById("score")
.innerText=score;


document.getElementById("miss")
.innerText=miss;




if(score>high){


high=score;


localStorage.setItem(
"highscore",
high
);


document.getElementById("high")
.innerText=high;


}



}







function pauseGame(){

paused=!paused;

}







function restartGame(){

location.reload();

}







function gameOver(){


running=false;


clearInterval(timer);



alert(
"GAME OVER\nScore: "+score
);


location.reload();


}







function showHammer(e){


let h =
document.getElementById("hammer");

h.style.left =
e.clientX+"px";


h.style.top =
e.clientY+"px";


h.style.display="block";



setTimeout(()=>{

h.style.display="none";

},150);



}
