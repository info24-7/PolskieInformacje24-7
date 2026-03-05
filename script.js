// DATA

function updateDate(){

const dateEl=document.getElementById("current-date");

const now=new Date();

const days=['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];

const dayName=days[now.getDay()];

const day=String(now.getDate()).padStart(2,'0');
const month=String(now.getMonth()+1).padStart(2,'0');
const year=now.getFullYear();

const hours=String(now.getHours()).padStart(2,'0');
const minutes=String(now.getMinutes()).padStart(2,'0');

dateEl.textContent=`${dayName} ${day}.${month}.${year} ${hours}:${minutes}`;

}

updateDate();
setInterval(updateDate,60000);


// MENU MOBILE

const hamburger=document.getElementById("hamburger");
const menu=document.getElementById("menu");

hamburger.addEventListener("click",()=>{

if(menu.style.display==="flex"){
menu.style.display="none";
}else{
menu.style.display="flex";
}

});


// RSS NEWS

const feeds=[

"https://api.rss2json.com/v1/api.json?rss_url=https://www.rmf24.pl/fakty/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.polsatnews.pl/rss/polska.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://tvn24.pl/najnowsze.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://wiadomosci.gazeta.pl/pub/rss/wiadomosci.htm",
"https://api.rss2json.com/v1/api.json?rss_url=https://sport.interia.pl/feed"

];

async function loadNews(){

const container=document.getElementById("articles");

container.innerHTML="Ładowanie newsów...";

let articles=[];

for(const url of feeds){

try{

const res=await fetch(url);
const data=await res.json();

data.items.forEach(article=>{

articles.push({

title:article.title,
image:article.thumbnail || "",
description:article.description,
link:article.link

});

});

}catch(e){

console.log("RSS error");

}

}

displayArticles(articles.slice(0,20));

}

function displayArticles(list){

const container=document.getElementById("articles");

container.innerHTML="";

list.forEach(article=>{

const div=document.createElement("div");

div.className="article";

div.innerHTML=`

<img src="${article.image}">

<h2>${article.title}</h2>

<p>${article.description.substring(0,120)}...</p>

<a href="${article.link}" target="_blank">Czytaj więcej</a>

`;

container.appendChild(div);

});

}

loadNews();
