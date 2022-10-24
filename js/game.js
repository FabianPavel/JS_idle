const mine = document.getElementById('btn');
const clickUp = document.getElementById('earn');
const c = document.getElementById('coins');
const autoUp = document.getElementById('autoEarn');
const timeA = document.getElementById('autoTime');
const ascend = document.getElementById("ascend");

const hack = document.getElementById("hack");
let ezMoney = 0;

let coins = 0;
let time = 2000;
let exponent = 1.4;
let a = 0;
let ascendBonus = 0;

let coolDown = 400;
let timer = Date.now();

let earns = 1;
let autoEarns = 1;
let asEarns = 1;
let asAutoEarns = 1;

let clickOrder = 1;
let autoOrder = 1;
let timeOrder = 1;

let clickPrice = 10;
let autoPrice = 20;
let timePrice = 40;

function auto(){
    coins += autoEarns;
}

setInterval( function (){
    if(coins < 1000){
        c.innerHTML = `your coins:` + (coins).toFixed(3);
    }
    else if(coins >= 1000 && coins < 1000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(3)} K`;
    }
    else if(coins >= 1000000 && coins < 1000000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(3)} M`;
    }
    else if(coins >= 1000000000 && coins < 1000000000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(3)}B`;
    }
    else if(coins >= 1000000000000 && coins < 1000000000000000) {
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(3)}T`;
    }
}, 10);

mine.addEventListener('click', function(){
    if(Date.now() >= timer) {
        coins += earns;
        c.innerHTML = `your coins: ${coins}`;
        timer = Date.now() + coolDown;
    }
});

clickUp.addEventListener('click', function(){
   if(coins >= clickPrice){
       coins -= clickPrice;
       earns += clickOrder;
       clickPrice = Math.ceil(clickPrice * (exponent + clickOrder / 2));
       clickOrder += 1;
       clickUp.innerHTML = `upgrade ${clickOrder} price: ${clickPrice}`;
   }
});

autoUp.addEventListener('click', function(){
   if(coins >= autoPrice){
       coins -= autoPrice;
       autoPrice = Math.ceil(autoPrice * (exponent + autoOrder / 2));
       autoOrder += 1;
       autoUp.innerHTML = `auto ${autoOrder} price: ${autoPrice}`;
       setInterval(auto, time);
       a = 1;
   }
});

timeA.addEventListener('click',  () =>{
   if(coins >= timePrice){
        coins -= timePrice;
        time = Math.ceil(time / ((exponent * timeOrder) /  timeOrder));
        timePrice = Math.ceil(timePrice * ((exponent + timeOrder) / 2));
        console.log(time);
        timeOrder += 1;
        timeA.innerHTML = `auto ${timeOrder} price: ${timePrice}`;
        if(a === 1){
           setInterval(auto, time);
        }
   }
});

ascend.addEventListener('click', () =>{
    ascendBonus += (coins / 100000);
    coins = 0;
    asEarns += ascendBonus;
    earns = asEarns;
    asAutoEarns += ascendBonus;
    autoEarns = asAutoEarns;
});

hack.addEventListener('click', () => {
    ezMoney = prompt("how many ?");
    console.log(ezMoney);
    coins += ezMoney;
});