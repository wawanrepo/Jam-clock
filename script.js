let alarmTime = null;
let timerInterval = null;
let timerRemaining = 0;

function updateClock() {
  const now = new Date();
  const jam = now.getHours().toString().padStart(2, '0');
  const menit = now.getMinutes().toString().padStart(2, '0');
  const detik = now.getSeconds().toString().padStart(2, '0');
  const hari = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById("jam-digital").textContent = `${jam}:${menit}:${detik}`;
  document.getElementById("tanggal-hari").textContent = hari;

  if (alarmTime) {
    const [ah, am] = alarmTime.split(':').map(Number);
    const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    const alarmSeconds = ah * 3600 + am * 60;
    const diff = alarmSeconds - nowSeconds;
    const container = document.getElementById("container");

    if (diff <= 10 && diff >= -10) {
      container.classList.add("alarm-active");
      document.getElementById("alarmStatus").textContent =
        diff > 0 ? `⏰ Alarm akan berbunyi dalam ${diff} detik` : "⏰ Alarm aktif!";
    } else {
      container.classList.remove("alarm-active");
    }
  }

  setTimeout(updateClock, 1000);
}

function setAlarm() {
  const hour = document.getElementById("alarmHour").value.padStart(2, '0');
  const minute = document.getElementById("alarmMinute").value.padStart(2, '0');
  alarmTime = `${hour}:${minute}`;
  document.getElementById("alarmStatus").textContent = `Alarm diatur ke ${alarmTime}`;
}

function startTimer() {
  const m = parseInt(document.getElementById("timerMinute").value || "0");
  const s = parseInt(document.getElementById("timerSecond").value || "0");
  timerRemaining = m * 60 + s;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timerRemaining > 0) {
      timerRemaining--;
      const tm = Math.floor(timerRemaining / 60).toString().padStart(2, '0');
      const ts = (timerRemaining % 60).toString().padStart(2, '0');
      document.getElementById("timerDisplay").textContent = `⏳ ${tm}:${ts}`;
    } else {
      document.getElementById("timerDisplay").textContent = "⏳ Timer selesai!";
      clearInterval(timerInterval);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", updateClock);
