const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.topbar nav');

function closeNavigation() {
  if (!menuButton || !navigation) return;
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Menüyü aç');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
  });

  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNavigation);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigation();
  });
}

document.querySelectorAll('.year').forEach(node => {
  node.textContent = new Date().getFullYear();
});

const serviceField = document.querySelector('#contact-form select[name="service"]');
if (serviceField) {
  const requestedService = new URLSearchParams(window.location.search).get('hizmet');
  if (requestedService) {
    const matchingOption = Array.from(serviceField.options).find(option => option.textContent.trim() === requestedService);
    if (matchingOption) serviceField.value = matchingOption.value;
  }
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(contactForm);
    const message = [
      'Merhaba BRK Garage, hizmet ve randevu hakkında bilgi almak istiyorum.',
      `Ad soyad: ${values.get('name') || ''}`,
      `Araç: ${values.get('vehicle') || 'Belirtilmedi'}`,
      `Hizmet: ${values.get('service') || 'Belirtilmedi'}`,
      `Tercih edilen tarih: ${values.get('date') || 'Belirtilmedi'}`,
      `Tercih edilen zaman: ${values.get('time') || 'Belirtilmedi'}`,
      `Not: ${values.get('note') || 'Yok'}`
    ].join('\n');
    window.open(`https://wa.me/905441723633?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}
