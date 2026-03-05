import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import {
getFirestore,
collection,
getDocs,
addDoc,
query,
orderBy,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

/* FIREBASE */

const firebaseConfig = {
apiKey: "AIzaSyDqHvuF1iV5MaDwuGd_gQ1_AbpsEb456aU",
authDomain: "polskieinformacje24-7.firebaseapp.com",
projectId: "polskieinformacje24-7",
storageBucket: "polskieinformacje24-7.firebasestorage.app",
messagingSenderId: "1097149063778",
appId: "1:1097149063778:web:e009bec68709625826e73b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* DATA */

function updateDate(){

const dateEl = document.getElementById("current-date");
const now = new Date();

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


/* MENU MOBILE */

const hamburger=document.getElementById("hamburger");
const menu=document.getElementById("menu");

hamburger.addEventListener("click",()=>{

if(menu.style.display==="flex"){
menu.style.display="none";
}else{
menu.style.display="flex";
}

});


/* RSS ŹRÓDŁA */

const feeds=[

"https://api.rss2json.com/v1/api.json?rss_url=https://www.rmf24.pl/fakty/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.polsatnews.pl/rss/polska.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://tvn24.pl/najnowsze.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://wiadomosci.gazeta.pl/pub/rss/wiadomosci.htm",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.bankier.pl/rss/wiadomosci.xml",
"https://api.rss2json.com/v1/api.json?rss_url=https://sport.interia.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://geekweek.interia.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://antyweb.pl/feed",
"https://api.rss2json.com/v1/api.json?rss_url=https://www.spidersweb.pl/feed"

];


/* NORMALIZACJA TYTUŁU */

function normalize(title){

return title.toLowerCase().replace(/[^\w\s]/gi,"").trim()

}


/* ŁADOWANIE NEWSÓW */

async function loadNews(){

const container=document.getElementById("articles")

let articles=[]
let titles=new Set()


/* TWOJE ARTYKUŁY FIREBASE */

const q=query(collection(db,"articles"),orderBy("created","desc"))

const snapshot=await getDocs(q)

snapshot.forEach(doc=>{

const a=doc.data()

articles.push({

title:a.title,
image:a.image,
description:a.content,
link:"#"

})

titles.add(normalize(a.title))

})


/* RSS */

for(const url of feeds){

try{

const res=await fetch(url)
const data=await res.json()

data.items.forEach(article=>{

const clean=normalize(article.title)

if(!titles.has(clean)){

titles.add(clean)

articles.push({

title:article.title,
image:article.thumbnail || "",
description:article.description,
link:article.link

})

}

})

}catch(e){
console.log("rss error")
}

}


articles=articles.slice(0,40)

displayArticles(articles)

}


/* WYŚWIETLANIE */

function displayArticles(list){

const container=document.getElementById("articles")

container.innerHTML=""

list.forEach(article=>{

const div=document.createElement("div")

div.className="article"

div.innerHTML=`

<img src="${article.image}">

<h2>${article.title}</h2>

<p>${article.description.substring(0,120)}...</p>

<a href="${article.link}" target="_blank">Czytaj więcej</a>

`

container.appendChild(div)

})

}

loadNews()
