// Funkcja do daty
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

// Hamburger menu mobile
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  if(menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
});
