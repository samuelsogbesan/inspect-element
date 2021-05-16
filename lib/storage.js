/**
 * A wrapper for the Chrome Extension's "local storage".
 */
var storage = {}

/**
 * Sets the value of a key-value pair in storage. Overwrites value if already exists.
 * @param {*} key the key
 * @param {*} value the value
 */
storage.set = (key, value) => {
  let data = {};
  data[key] = value;

  chrome.storage.local.set(data, function() {});
}

/**
 * Fetches a value from storage.
 * @param {*} key the target key-value pair, identified by key.
 * @returns a promise resolving to the value if it exists.
 */
storage.get = async (key) => {
  let res = await new Promise(function(resolve, reject)
    {
      chrome.storage.local.get([key], function(result) { resolve(result[key]); }
    )}
  );

  return res;
}
