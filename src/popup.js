document.getElementById("fillFields").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillFormFields,
  });
});

function fillFormFields() {
  let fieldMappings = {
    "rent or mortgage": "437",
    utilities: "82",
    food: "873",
    clothing: "75",
    "household necessities": "90",
    "medical expenses": "90",
    "educational expense": "90",
    savings: "24322",
    "Assets owned by student": "1278",
    "father's work": "3593",
    "your work": "1203",
    "Parent 1": "San Bahadur Bagale Thapa",
    Occupation: "Driver",
    Employer: "B.K. AAYUSH COSTRUCTION PVT. LTD.",
    Exchange: "133.47",
  };
  // Find all label elements
  const labels = document.getElementsByTagName("label");

  for (const label of labels) {
    // Get all text content, including nested elements
    const labelText = label.innerText.trim().toLowerCase();

    // Check if this label matches any of our mappings
    for (const [key, value] of Object.entries(fieldMappings)) {
      if (labelText.includes(key)) {
        // Find the associated input
        let input;
        if (label.getAttribute("for")) {
          input = document.getElementById(label.getAttribute("for"));
        }
        // If we found an input, fill it
        if (input) {
          input.value = value;
          // Dispatch an input event to trigger any listeners
          input.dispatchEvent(new Event("input", { bubbles: true }));
          break;
        }
      }
    }
  }
}
