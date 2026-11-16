// ===== القائمة الجانبية على الموبايل =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menu-btn');

function toggleMenu() {
  sidebar.classList.toggle('translate-x-full');
  overlay.classList.toggle('hidden');
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
}


// ===== تقسيم الجدول لصفحات =====
document.querySelectorAll('[data-paginate]').forEach(setupPagination);

function setupPagination(box) {
  const perPage = Number(box.dataset.paginate);
  const rows = [...box.querySelectorAll('tbody tr')];
  const info = box.querySelector('[data-page-info]');
  const nav = box.querySelector('[data-page-buttons]');
  const pages = Math.ceil(rows.length / perPage);
  let current = 1;

  function show(page) {
    current = page;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    rows.forEach((row, i) => {
      row.hidden = i < start || i >= end;
    });

    info.textContent = `عرض ${start + 1}–${Math.min(end, rows.length)} من ${rows.length}`;
    drawButtons();
  }

  function drawButtons() {
    nav.innerHTML = '';
    nav.append(makeButton('‹', current - 1, current === 1));
    for (let p = 1; p <= pages; p++) {
      nav.append(makeButton(p, p, false, p === current));
    }
    nav.append(makeButton('›', current + 1, current === pages));
  }

  function makeButton(label, page, disabled, active) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.disabled = disabled;
    btn.className = 'min-w-[31px] h-[31px] rounded-lg border transition ' +
      (active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-[#557480] hover:bg-[#eaf5f5]') +
      (disabled ? ' opacity-40 cursor-not-allowed' : '');
    btn.addEventListener('click', () => show(page));
    return btn;
  }

  show(1);
}


// ===== مفاتيح التشغيل والإيقاف =====
document.querySelectorAll('[data-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const isOn = btn.getAttribute('aria-checked') === 'true';
    btn.setAttribute('aria-checked', String(!isOn));
  });
});


// ===== اختيار لون بصفحة المظهر =====
const swatches = document.querySelectorAll('[data-swatch]');
const checkIcon = '<svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4 10-10"/></svg>';

swatches.forEach((sw) => {
  sw.addEventListener('click', () => {
    swatches.forEach((other) => {
      other.classList.remove('outline-[3px]', 'outline-sun');
      other.classList.add('outline-1', 'outline-line');
      other.innerHTML = '';
    });
    sw.classList.remove('outline-1', 'outline-line');
    sw.classList.add('outline-[3px]', 'outline-sun');
    sw.innerHTML = checkIcon;
  });
});


// ===== إظهار كلمة المرور =====
const passBtn = document.getElementById('toggle-password');
if (passBtn) {
  passBtn.addEventListener('click', () => {
    const input = document.getElementById('login-pass');
    input.type = input.type === 'password' ? 'text' : 'password';
  });
}
