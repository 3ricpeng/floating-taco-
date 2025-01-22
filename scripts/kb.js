(function () {
  "use strict";

  /*
  console.log('KB script running at document_start!');

  // Ensure DOM-dependent tasks wait until the DOM is ready
  const onDomReady = (callback) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  };

  // Example: Early interception or global modification
  console.log('Intercepting global objects...');
  Object.defineProperty(window, 'alert', {
    value: (msg) => console.log(`Alert intercepted: ${msg}`),
    writable: false,
  });
  */

  /*******EARLY LOAD BEGIN ***************/

  console.log("Incident script running at document_start!");

  // Early loading functionality
  const earlyLoad = () => {
    console.log("Early load initializing...");
    // Prepare critical logic or data here
  };

  // Ensure DOM-dependent tasks wait until the DOM is ready
  const onDomReady = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  };

  // Call early loading
  earlyLoad();
  /*******EARLY LOAD END ***************/

  // Define buttons specific to the KB page
  const kbButtons = [
    { text: "Copy KB#", action: copyArticleId, id: "copyArticleId" },
    { text: "Scroll to Top", action: scrollToTop, id: "scrollToTop" },
    { text: "Scroll to Bottom", action: scrollToBottom, id: "scrollToBottom" },
  ];
  let alertsEnabled = false;

  // Button actions

  /**
   * Copy the Article ID
   * Finds the Article ID from the page and copies it to the clipboard.
   */
  function copyArticleId() {
    const articleIdElement = document.querySelector("#articleNumber"); // Select the hidden input by its ID
    if (articleIdElement) {
      const articleId = articleIdElement.value.trim(); // Get the value of the input
      if (articleId) {
        navigator.clipboard
          .writeText(articleId)
          .then(() => {
            if (alertsEnabled) {
              alert(`Article ID "${articleId}" copied to clipboard!`);
            }
          })
          .catch((err) => {
            console.error("Failed to copy Article ID:", err);
            if (alertsEnabled) {
              alert("Failed to copy Article ID.");
            }
          });
      } else {
        if (alertsEnabled) {
          alert("Article ID is empty.");
        }
      }
    } else {
      if (alertsEnabled) {
        alert("Article ID element not found.");
      }
    }
  }

  /**
   * Scroll to the top of the page.
   */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    alert("Scrolled to the top!");
  }

  /**
   * Scroll to the bottom of the page.
   */
  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    alert("Scrolled to the bottom!");
  }

  // Initialize buttons after the DOM is ready
  onDomReady(() => {
    console.log("DOM ready. Adding KB buttons...");
    ButtonUtils.createButtonContainer(kbButtons);
  });
})();
