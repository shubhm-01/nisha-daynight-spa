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

  // Persistent quick-contact actions on every page.
  if (!document.querySelector('.floating-contact')) {
    const quickContact = document.createElement('div');
    quickContact.className = 'floating-contact';
    quickContact.setAttribute('aria-label', 'Quick contact');

    const whatsapp = document.createElement('a');
    whatsapp.className = 'float-whatsapp';
    whatsapp.href = 'https://wa.me/917349048239?text=' + encodeURIComponent('Hello Nisha Daynight Spa, I would like to enquire about your services.');
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
    whatsapp.setAttribute('aria-label', 'Chat with Nisha Daynight Spa on WhatsApp');
    whatsapp.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.85 11.85 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.96L.08 24l6.31-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.47-8.42ZM12.09 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.38a9.88 9.88 0 1 1 8.39 4.64Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.5l-.58-.01c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg><span class="float-label">WhatsApp</span>';
    
    const call = document.createElement('a');
    call.className = 'float-call';
    call.href = 'tel:+917349048239';
    call.setAttribute('aria-label', 'Call Nisha Daynight Spa');
    call.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg><span class="float-label">Call Now</span>';

    quickContact.append(whatsapp, call);
    document.body.appendChild(quickContact);
  }

})();