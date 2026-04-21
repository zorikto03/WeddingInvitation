
const track = document.querySelector('.slides-track');
const slides = document.querySelectorAll('.slide');
const counter = document.querySelector('.counter');
const prev = document.querySelector('.arrow.left');
const next = document.querySelector('.arrow.right');

let current = 0;

function updateSlider() {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${current * slideWidth}px)`;
  counter.textContent = `${current + 1}/${slides.length}`;
}

next.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  updateSlider();
});

prev.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  updateSlider();
});

updateSlider();

function sendMail(event) {
  event.preventDefault();

  const inputs = document.querySelectorAll('input[type="text"]');
  const name = inputs[0].value;
  const guest = inputs[1].value;
  const attend = document.querySelector('input[name="attend"]:checked');

  const attendValue = attend ? attend.value : "Не указано";

  let attendText = "";
  if (attendValue === "yes") {
    attendText = "Да, с удовольствием";
  } else if (attendValue === "no") {
    attendText = "Не смогу";
  } else {
    attendText = "Не указано";
  }

  if (!name) {
    alert("Введите имя");
    return;
  }

  // 👉 СРАЗУ показываем модалку
  showSuccessMessage();

  // 👉 а запрос отправляем в фоне
  fetch("https://script.google.com/macros/s/AKfycbyikm0yisNLA0AdVGqGs_eB-K6uR2zr4_cT7B4Bfzk2WIS6JDW341PBETWbPIs6tJyn/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      name: name,
      attend: attendText,
      guest: guest || "Нет"
    })
  });

  document.querySelector('.send-button').style.pointerEvents = "none";
}
function showSuccessMessage() {
  const modal = document.getElementById("success-modal");
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("success-modal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("success-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};