// DATA

function updateDate() {

const dateEl = document.getElementById("current-date");
const now = new Date();

const days = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
const dayName = days[now.getDay()];

const day = String(now.getDate()).padStart(2,'0');
const month = String(now.getMonth()+1).padStart(2,'0');
const year = now.getFullYear();

const hours = String(now.getHours()).padStart(2,'0');
const minutes = String(now.getMinutes()).padStart(2,'0');

dateEl.textContent = `${dayName} ${day}.${month}.${year} ${hours}:${minutes}`;

}

updateDate();
setInterval(updateDate, 60000);


// HAMBURGER

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {

if(menu.style.display === "flex"){

menu.style.display = "none";

}else{

menu.style.display = "flex";

}

});


// FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";

import {

getFirestore,
collection,
getDocs,
query,
orderBy

} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "API_KEY",
authDomain: "AUTH_DOMAIN",
projectId: "PROJECT_ID"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// RSS ŹRÓDŁA

const feeds = [

"https://api.rss2json.com/v1/api.json?rss_url=https://www.rmf24.pl/fakty/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.polsatnews.pl/rss/polska.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://tvn24.pl/najnowsze.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://wiadomosci.gazeta.pl/pub/rss/wiadomosci.htm",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.wprost.pl/rss",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.rp.pl/rss",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.bankier.pl/rss/wiadomosci.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://sport.interia.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://geekweek.interia.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://antyweb.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.spidersweb.pl/feed"

];


// USUWANIE DUPLIKATÓW

function normalize(title){

return title
.toLowerCase()
.replace(/[^\w\s]/gi,"")
.trim()

}


// ŁADOWANIE NEWSÓW

async function loadNews(){

const container = document.getElementById("articles")

let allArticles = []
let titles = new Set()

// TWOJE ARTYKUŁY

const q = query(collection(db,"articles"),orderBy("created","desc"))

const snapshot = await getDocs(q)

snapshot.forEach(doc=>{

const a = doc.data()

allArticles.push({

title: a.title,
image: a.image,
description: a.content,
link: "#"

})

titles.add(normalize(a.title))

})


// RSS

for(const url of feeds){

try{

const res = await fetch(url)
const data = await res.json()

data.items.forEach(article=>{

const clean = normalize(article.title)

if(!titles.has(clean)){

titles.add(clean)

allArticles.push({

title: article.title,
image: article.thumbnail || "",
description: article.description,
link: article.link

})

}

})

}catch(e){

console.log("rss error")

}

}


// SORTOWANIE

allArticles = allArticles.slice(0,40)

displayArticles(allArticles)

}


// WYŚWIETLANIE

function displayArticles(list){

const container = document.getElementById("articles")

container.innerHTML=""

list.forEach(article=>{

const div = document.createElement("div")

div.className="article"

div.innerHTML=`

<img src="${article.image}">

<h2>${article.title}</h2>

<p>${article.description.substring(0,120)}...</p>

<a href="${article.link}" target="_blank">
Czytaj więcej
</a>

`

container.appendChild(div)

})

}


loadNews()
