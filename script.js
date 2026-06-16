const holes =
document.querySelectorAll(".hole");


const moles =
document.querySelectorAll(".mole");


let score=0;

let miss=0;

let time=30;

let timer;

let running=false;

let paused=false;


let speed=900;


let highScore =
localStorage.getItem("highscore") || 0;


document.getElementById("high").innerText =
highScore;



function randomHole(){

let index =
Math.floor(Math.random()*holes.length);

return holes[index];

}



function showMole(){


if(!running || paused)
return;


moles.forEach(m=>
m.classList.remove("up"));


let hole=randomHole();

let mole =
hole.querySelector(".mole");


mole.classList.add("up");



setTimeout(()=>{


if(mole.classList.contains("up")){

mole.classList.remove("up");

miss++;

document.getElementById("miss").innerText=miss;

}


},speed);


speed =
Math.max(400,900-score*15);


}




function startGame(){


if(running)
return;


running=true;

paused=false;


timer=setInterval(()=>{


if(!paused){


time--;

document.getElementById("time").innerText=time;


if(time<=0){

endGame();

}

}

},1000);



gameLoop=setInterval(showMole,800);


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

clearInterval(gameLoop);


alert(
"Game Over!\nScore: "+score
);


}



moles.forEach(mole=>{


mole.addEventListener("click",e=>{


if(!running || paused)
return;


if(mole.classList.contains("up")){


score++;


document.getElementById("score").innerText =
score;



mole.classList.remove("up");



if(score>highScore){

highScore=score;

localStorage.setItem(
"highscore",
highScore
);

document.getElementById("high").innerText=
highScore;

}



showHammer(e);


}

else{


miss++;

document.getElementById("miss").innerText=
miss;


}


});

});




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

},200);


}
