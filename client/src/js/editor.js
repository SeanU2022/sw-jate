// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // replaces this.editor.on('blur', () => {
    const butSave = document.getElementById('buttonSave');
    butSave.addEventListener('click', async () => {
      console.log('Save clicked');
      putDb(localStorage.getItem('content'));
    });

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb()
      .then((data) => {
        if (data.length === 0) {
          console.log('we do not have IndexDB data, using localStorage or resolving to header')
          this.editor.setValue( localData || header)
        } else {
          console.log('we do have data in IndexDB')
          const dataSeparator = `============================================================\n`
          let element = ``
          data.forEach((dataElement) => {element = element + dataSeparator + `=> Note ${dataElement.id}: \n` + dataElement.note + `\n`})
          this.editor.setValue(element)
        }
        console.info('Loaded data from IndexedDB, injecting into editor');
      });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus (this has been replaced by butSave)
    // this.editor.on('blur', () => {
    //   console.log('The editor has lost focus');
    //   putDb(localStorage.getItem('content'));
    // });

  }
}
