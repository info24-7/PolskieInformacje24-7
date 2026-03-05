function updateDate(){

const el=document.getElementById("current-date");

const now=new Date();

const days=[
'Niedziela',
'Poniedziałek',
'Wtorek',
'Środa',
'Czwartek',
'Piątek',
'Sobota'
];

const dayName=days[now.getDay()];

const day=String(now.getDate()).padStart(2,'0');
const month=String(now.getMonth()+1).padStart(2,'0');
const year=now.getFullYear();

const hours=String(now.getHours()).padStart(2,'0');
const minutes=String(now.getMinutes()).padStart(2,'0');

el.textContent=`${dayName} ${day}.${month}.${year} ${hours}:${minutes}`;

}

updateDate();
setInterval(updateDate,60000);



const hamburger=document.getElementById("hamburger");
const menu=document.getElementById("menu");

hamburger.onclick=()=>{

if(menu.style.display==="flex"){
menu.style.display="none";
}else{
menu.style.display="flex";
}

};



const feeds=[

"https://api.rss2json.com/v1/api.json?rss_url=https://www.rmf24.pl/fakty/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.polsatnews.pl/rss/polska.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://tvn24.pl/najnowsze.xml"

];

async function loadNews(){

const container=document.getElementById("articles");

container.innerHTML="Ładowanie artykułów...";

let articles=[];

for(const url of feeds){

try{

const response=await fetch(url);
const data=await response.json();

data.items.forEach(item=>{

articles.push({
title:item.title,
desc:item.description,
img:item.thumbnail,
link:item.link
});

});

}catch(e){
console.log("Błąd RSS",e);
}

}

showArticles(articles.slice(0,15));

}



function showArticles(list){

const container=document.getElementById("articles");

container.innerHTML="";

list.forEach(a=>{

const div=document.createElement("div");
div.className="article";

div.innerHTML=`

<img src="${a.img}">

<h2>${a.title}</h2>

<p>${a.desc.substring(0,120)}...</p>

<a href="${a.link}" target="_blank">Czytaj więcej</a>

`;

container.appendChild(div);

});

}



loadNews();
