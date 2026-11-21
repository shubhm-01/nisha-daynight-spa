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
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      }
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const dateInput = document.querySelector('#guest-date');
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    dateInput.min = localToday;
  }

  const bookingForm = document.querySelector('#booking-form');
  const formError = document.querySelector('#form-error');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      const formData = new FormData(bookingForm);
      const guestName = String(formData.get('guestName') || '').trim();
      const guestPhone = String(formData.get('guestPhone') || '').trim();
      const treatment = String(formData.get('treatment') || '').trim();
      const date = String(formData.get('date') || '').trim();
      const note = String(formData.get('note') || '').trim();

      if (!guestName || !guestPhone || !treatment) {
        if (formError) formError.hidden = false;
        return;
      }
      if (formError) formError.hidden = true;

      const message = [
        'Hello Nisha Daynight Spa, I would like to request an appointment.',
        '',
        'Name: ' + guestName,
        'Phone: ' + guestPhone,
        'Treatment: ' + treatment,
        'Preferred date: ' + (date || 'Flexible / to be discussed'),
        'Notes: ' + (note || 'None'),
        '',
        'Please confirm availability, duration and final price.'
      ].join('\n');

      const whatsappUrl = 'https://wa.me/917349048239?text=' + encodeURIComponent(message);
      window.location.href = whatsappUrl;
    });
  }
})();