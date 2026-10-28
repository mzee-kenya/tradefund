const navButtons = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const crumb = document.getElementById('pageCrumb');
const sidebar = document.getElementById('sidebar');
const modalBackdrop = document.getElementById('modalBackdrop');
const toast = document.getElementById('toast');
let selectedChallenge = { plan: 'Pro', fee: '$99' };
let toastTimer;

const pageNames = {
  dashboard: 'Dashboard', challenges: 'Challenges', account: 'Trading account',
  payments: 'Payments', rules: 'Rules & requirements', profile: 'My profile', support: 'Help & support'
};

function showPage(name) {
  if (!pageNames[name]) return;
  pages.forEach(page => page.classList.toggle('active', page.id === `page-${name}`));
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.page === name));
  crumb.textContent = pageNames[name];
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

navButtons.forEach(button => button.addEventListener('click', () => showPage(button.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(button => {
  button.addEventListener('click', () => showPage(button.dataset.goto));
});
document.getElementById('mobileMenu').addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.choose-plan').forEach(button => {
  button.addEventListener('click', () => {
    selectedChallenge = { plan: button.dataset.plan, fee: button.dataset.fee };
    document.getElementById('selectedPlan').textContent = selectedChallenge.plan;
    document.getElementById('selectedFee').textContent = selectedChallenge.fee;
    document.getElementById('modalTitle').textContent = `Start the ${selectedChallenge.plan} challenge?`;
    document.getElementById('modalDescription').textContent = 'Review your selected package before continuing.';
    modalBackdrop.classList.add('show');
  });
});
function closeModal() { modalBackdrop.classList.remove('show'); }
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('cancelChallenge').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', event => { if (event.target === modalBackdrop) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
document.getElementById('confirmChallenge').addEventListener('click', () => {
  closeModal();
  notify(`${selectedChallenge.plan} selected. Connect a real payment provider to enable checkout.`);
  showPage('payments');
});

document.querySelector('.notice-close').addEventListener('click', () => {
  document.querySelector('.notice').style.display = 'none';
});
document.getElementById('paymentHelp').addEventListener('click', () => notify('Add the firm’s official payment support contact before launch.'));
document.getElementById('rulesAck').addEventListener('click', () => notify('Thanks. Please read the complete official terms before trading.'));
document.getElementById('saveProfile').addEventListener('click', () => notify('Demo only: profile changes have not been saved to a server.'));
document.getElementById('emailSupport').addEventListener('click', () => notify('Add the official support email address to enable this action.'));
document.getElementById('whatsappSupport').addEventListener('click', () => notify('Add the firm’s verified WhatsApp Business number to connect support.'));
document.getElementById('chartRange').addEventListener('change', event => {
  notify(`${event.target.value} selected. Chart currently displays illustrative sample data.`);
});
