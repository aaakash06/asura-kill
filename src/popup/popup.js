const toggleButton = document.getElementById("toggle-button");

// Load the current state from storage
chrome.storage.sync.get("enabled", (data) => {
  const isEnabled = data.enabled !== undefined ? data.enabled : true;
  updateButton(isEnabled);
});

// Toggle the extension state
toggleButton.addEventListener("click", () => {
  chrome.storage.sync.get("enabled", (data) => {
    const isEnabled = data.enabled !== undefined ? data.enabled : true;
    const newState = !isEnabled;
    chrome.storage.sync.set({ enabled: newState }, () => {
      updateButton(newState);
      // Send a message to the content script to update its behavior
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { enabled: newState });
      });
    });
  });
});

// Update the button text and state
function updateButton(isEnabled) {
  toggleButton.textContent = isEnabled ? "Disable" : "Enable";
  toggleButton.style.backgroundColor = isEnabled ? "#4CAF50" : "#f44336";
}
