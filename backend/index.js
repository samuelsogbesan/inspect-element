// Setup Popup
const popup = document.createElement('span');
popup.id = 'popup';
popup.className = 'hidden';
document.body.appendChild(popup);

const getSelector = element => (element.classList.length > 0 && element.className !== 'highlighted' ? `.${element.getAttribute('class')}` : '').replace('highlighted', '').trim().replace(' ', '.') + (element.id !== '' ? `#${element.id}` : '');

let highlight = (target) => {
  target.classList.add('highlighted');
  popup.innerHTML = getSelector(target);
  popup.classList.remove('hidden');
}

let removeHighlight = (target) => {
  target.classList.remove('highlighted');
  popup.classList.add('hidden');
}

/**
 * Handles the functionality for inspector mode.
 * @param {*} event 
 */
const inspectorHandler = event => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  if (event.target) {
    highlight(event.target);
    event.target.addEventListener('mouseout', inspectorTarget_MouseLeave);
  }
}

const inspectorTarget_MouseLeave = event => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  removeHighlight(event.target);
  event.target.removeEventListener('mouseout', inspectorTarget_MouseLeave);
}

const activateInspector = () => {
  document.addEventListener('mousemove', inspectorHandler);
}

const deactiveInspector = () => {
  document.removeEventListener('mousemove', inspectorHandler);
}

// Listen for inspector on / off signal.
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'isInspectorActive') {
      if (newValue === true) {
        activateInspector();
      } else if (newValue === false) {
        deactiveInspector();
      }
    }
  }
});
