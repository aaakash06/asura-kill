let isEnabled = true;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.enabled !== undefined) {
    isEnabled = message.enabled;
  }
});
// Configure these values for your needs
const TARGET_URL = "https://asuracomic.net";
const OVERLAY_SELECTORS = [".fixed"];

function removeOverlays() {
  OVERLAY_SELECTORS.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.remove();
      console.log(`Removed overlay`);
    });
  });
}

// Check if current URL matches target domain and subpaths
if (window.location.href.includes(TARGET_URL)) {
  // Run immediately on page load
  removeOverlays();

  // Create MutationObserver to detect dynamically added overlays
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      removeOverlays();
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
