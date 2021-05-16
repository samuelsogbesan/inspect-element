const addButton = document.getElementById('add-button');

addButton.addEventListener('click', async function(event) {
  let isInspectorActive = await storage.get('isInspectorActive');

  storage.set('isInspectorActive', !isInspectorActive);
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'isInspectorActive') {
      if (newValue === true) {
        addButton.value = 'deactivate';
      } else if (newValue === false) {
        addButton.value = 'activate';
      }
    }
  }
});

const main = async () => {
  let val = await storage.get('isInspectorActive');
  if (val === true) {
    addButton.value = 'deactivate';
  } else {
    addButton.value = 'activate';
  }
}

main();
