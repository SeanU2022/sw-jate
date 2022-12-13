import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// this is also declared in webpack.config.js
const serviceWorkerDistFile = "service-worker.js"

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  // Workbox() must match sw-jate/client/webpack.config.js>InjectManifest>swDest:
  // const workboxSW = new Workbox('/src-sw.js');
  const workboxSW = new Workbox('/' + serviceWorkerDistFile);
  console.log('register service worker => register service worker')
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
