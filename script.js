// Data do casamento: 19/11/2025
const weddingDate = new Date(2025, 10, 19, 0, 0, 0); // mês 10 = novembro (0-index)

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function computeYMD(from, to) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    const prevMonth = new Date(to.getFullYear(), to.getMonth() - 1, 1);
    const add = daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
    days += add;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  if (years < 0) {
    return null; // casamento ainda não aconteceu
  }

  return { years, months, days };
}

function updateCounter() {
  const now = new Date();
  const ymd = computeYMD(weddingDate, now);

  const yearsEl = document.getElementById('years');
  const monthsEl = document.getElementById('months');
  const daysEl = document.getElementById('days');
  const raw = document.getElementById('raw-difference');

  if (!ymd) {
    const diffMs = weddingDate - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    yearsEl.textContent = '-';
    monthsEl.textContent = '-';
    daysEl.textContent = diffDays + ' dias (até o casamento)';
    raw.textContent = '';
    return;
  }

  yearsEl.textContent = ymd.years;
  monthsEl.textContent = ymd.months;
  daysEl.textContent = ymd.days;
  raw.textContent = `Atualizado em: ${now.toLocaleString()}`;
}

updateCounter();
setInterval(updateCounter, 30000);

document.getElementById('year-now').textContent = new Date().getFullYear();
