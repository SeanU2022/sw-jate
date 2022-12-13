const butInstall = document.getElementById('buttonInstall');
const textHeader = document.getElementById('textHeader');

// Logic for installing the PWA
// Event handler for the `beforeinstallprompt`
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  butInstall.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';

  butInstall.addEventListener('click', () => {
    event.prompt();
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
  });
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  console.log('👍', 'appinstalled', event);
});
