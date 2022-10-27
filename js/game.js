const mine = document.getElementById('btn');
const clickUp = document.getElementById('earn');
const c = document.getElementById('coins');
const autoUp = document.getElementById('autoEarn');
const timeA = document.getElementById('autoTime');
const ascend = document.getElementById("ascend");
const ascend2 = document.getElementById("ascend2");
const close =  document.getElementById("close");

const hack = document.getElementById("hack");
let ezMoney = 0;

let coins = 0;
let time = 2000;
let exponent = 1.4;
let a = 0;
let ascendBonus = 0;
let autoAs = 0;
let timeout = 0;

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
        c.innerHTML = `your coins:` + (coins).toFixed(2);
    }
    else if(coins >= 1000 && coins < 1000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(2)} K`;
    }
    else if(coins >= 1000000 && coins < 1000000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(2)} M`;
    }
    else if(coins >= 1000000000 && coins < 1000000000000){
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(2)}B`;
    }
    else if(coins >= 1000000000000 && coins < 1000000000000000) {
        c.innerHTML = `your coins: ${(coins / 1000).toFixed(2)}T`;
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
   else{
       document.getElementById("hidden").style.display = "inline";

       timeout = setTimeout(() =>{
           document.getElementById("hidden").style.display = "none";
       },1000);
   }
});

autoUp.addEventListener('click', function(){
   if(coins >= autoPrice){
       coins -= autoPrice;
       autoPrice = Math.ceil(autoPrice * (exponent + autoOrder / 2));
       autoOrder += 1;
       autoUp.innerHTML = `auto ${autoOrder} price: ${autoPrice}`;
       a = 1;
       autoAs = setInterval(auto, time);
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
           autoAs =setInterval(auto, time);
       }
   }
});

ascend.addEventListener('click', () =>{
    //show div with info about ascend + close/continue
    document.getElementById("hid").style.display = "inline";
    //run ascend
    ascend2.addEventListener('click', () =>{
    //calculate ascend bonus, set coins back to 0
    ascendBonus += (coins / 100000);
    coins = 0;
    //make earns bigger after ascend using ascend bonus
    asEarns += ascendBonus;
    earns = asEarns;
    asAutoEarns += ascendBonus;
    autoEarns = asAutoEarns;
    //set variables back to start value
    autoOrder = 1;
    clickOrder = 1;
    timeOrder = 1;
    time = 2000;
    timePrice = 40;
    autoPrice = 20;
    clickPrice = 10;
    //clear auto earning
    a = 0;
    clearInterval(autoAs);
    //again broadcast level and price of upgrades
    clickUp.innerHTML = `upgrade ${clickOrder} price: ${clickPrice}`;
    autoUp.innerHTML = `auto ${autoOrder} price: ${autoPrice}`;
    timeA.innerHTML = `auto ${timeOrder} price: ${timePrice}`;
    document.getElementById("hid").style.display = "none";
    });
    //close div with info about ascend + close/continue
    close.addEventListener('click', () => {
        document.getElementById("hid").style.display = "none";
    });
});

hack.addEventListener('click', () => {
    ezMoney = prompt("how many ?");
    console.log(ezMoney);
    coins += ezMoney;
});