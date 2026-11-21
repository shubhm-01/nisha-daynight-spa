(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');

  const closeMenu = () => {
    if (!toggle || !menu) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) closeMenu();
      else {
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      }
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('.year').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const dateInput = document.querySelector('#guest-date');
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    dateInput.min = localToday;
  }

  const bookingForm = document.querySelector('#booking-form');
  const error = document.querySelector('#form-error');
  if (bookingForm) {
    const query = new URLSearchParams(window.location.search);
    const experience = query.get('experience');
    const treatmentSelect = document.querySelector('#guest-treatment');
    if (experience && treatmentSelect) {
      const option = Array.from(treatmentSelect.options).find((item) => item.text.trim() === experience);
      if (option) option.selected = true;
      else {
        const custom = document.createElement('option');
        custom.value = experience;
        custom.textContent = experience;
        custom.selected = true;
        treatmentSelect.appendChild(custom);
      }
    }

    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;
      const data = new FormData(bookingForm);
      const values = {
        name: String(data.get('guestName') || '').trim(),
        phone: String(data.get('guestPhone') || '').trim(),
        treatment: String(data.get('treatment') || '').trim(),
        date: String(data.get('date') || '').trim(),
        time: String(data.get('time') || '').trim(),
        note: String(data.get('note') || '').trim()
      };
      if (!values.name || !values.phone || !values.treatment) {
        if (error) error.hidden = false;
        return;
      }
      if (error) error.hidden = true;
      const message = [
        'Hello Nisha Daynight Spa, I would like to request an appointment.',
        '',
        'Name: ' + values.name,
        'Phone: ' + values.phone,
        'Treatment / Experience: ' + values.treatment,
        'Preferred date: ' + (values.date || 'Flexible / to be discussed'),
        'Preferred time: ' + (values.time || 'Flexible / to be discussed'),
        'Notes: ' + (values.note || 'None'),
        '',
        'Please confirm current availability, session duration and final price.'
      ].join('\n');
      window.location.href = 'https://wa.me/917349048239?text=' + encodeURIComponent(message);
    });
  }
})();