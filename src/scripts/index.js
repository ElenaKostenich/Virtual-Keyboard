import { keys } from './key';
import '../styles/style.scss';

const body = document.querySelector('body');

let keyboardFild = class Keyboard {
  createContainer() {
    let container = document.createElement('div');
    let title = document.createElement('h1');
    let textarea = document.createElement('textarea');
    let keyboard = document.createElement('div');
    let leng = document.createElement('p');
    let text = document.createElement('p');
    leng.className = 'leng';
    text.className = 'text';
    container.className = 'container';
    title.className = 'keyboard-title';
    textarea.className = 'keyboard-textarea';
    keyboard.className = 'keyboard';
    textarea.id = 'textarea';
    textarea.autofocus = true;
    keyboard.id = 'keyboard';
    title.innerHTML = 'RSS Virtual Keyboard';
    leng.innerHTML =
      'Для переключения языка комбинация: левыe shift + левыe alt';
    text.innerHTML = 'Клавиатура создана в операционной системе Windows';
    body.append(container);
    container.append(title);
    container.append(textarea);
    container.append(keyboard);
    container.append(leng);
    container.append(text);
    return keyboard;
  }
  createKeys() {
    let out = '';
    for (let i = 0; i < keys.length; i++) {
      out += `<div class="k-key ${keys[i].code}" data='${keys[i].code}'> ${keys[i].key} </div>`;
    }
    document.querySelector('#keyboard').innerHTML = out;
    let pressed = new Set();
    document.addEventListener('keydown', (e) => {
      document.querySelector('#textarea').focus();

      if (e.code == 'AltLeft' || e.code == 'ShiftLeft') {
        document.querySelector('#textarea').focus();
        pressed.add(e.code);
        if (pressed.size == 2) {
          out = '';
          for (let i = 0; i < keys.length; i++) {
            out += `<div class="k-key ${keys[i].code}" data='${keys[i].code}'>${keys[i].keyRu}</div>`;
          }
          document.querySelector('#keyboard').innerHTML = out;
        }
      }

      document.querySelectorAll('.k-key').forEach((item) => {
        item.classList.remove('active');
      });

      document
        .querySelector('#keyboard .k-key[data="' + e.code + '"]')
        .classList.add('active');
      if (e.code == 'Tab') {
        e.preventDefault();
        textarea.value += '    ';
      }
      setTimeout(function removeClassListKey() {
        document.querySelectorAll('.k-key').forEach((item) => {
          item.classList.remove('active');
        });
      }, 500);
    });

    document.querySelectorAll('.k-key').forEach((item) => {
      item.addEventListener('click', (e) => {
        document.querySelector('#textarea').focus();

        item.classList.add('active');
        let atr = e.target.getAttribute('data');
        keys.map((el) => {
          if (el.code == atr) {
            if (atr == 'Enter') {
              textarea.value += '\n';
            } else if (atr == 'Tab') {
              textarea.value += '    ';
            } else if (
              atr == 'MetaLeft' ||
              atr == 'ControlLeft' ||
              atr == 'ControlRight' ||
              atr == 'AltLeft' ||
              atr == 'AltRight' ||
              atr == 'NumpadDecimal' ||
              atr == 'ShiftLeft' ||
              atr == 'ShiftRight' ||
              atr == 'CapsLock'
            ) {
              textarea.value += '';
            } else if (atr == 'Backspace') {
              textarea.value += '';
            } else {
              if (pressed.size == 2) {
                textarea.value += 555;
              } else {
                textarea.value += el.key;
              }
            }
          }
        });

        textarea.onfocus = () => {
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              textarea.value.length;
          });
        };
        setTimeout(function removeClassListKey() {
          document.querySelectorAll('.k-key').forEach((item) => {
            item.classList.remove('active');
          });
        }, 500);
      });
    });
    pressed.clear();
    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
    });
  }
};

new keyboardFild().createContainer();
new keyboardFild().createKeys();
