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


/*


This code is performing two main tasks:

Ensuring DOM Readiness: The onDomReady function ensures that any tasks or operations that depend on the DOM are not executed until the page's DOM is fully loaded. It checks if the document.readyState is loading, which means the DOM is still being parsed. If it's still loading, it waits for the DOMContentLoaded event to trigger, which indicates that the DOM is fully loaded and safe to manipulate. If the DOM is already ready (i.e., document.readyState is not loading), it immediately executes the callback function.

Example:

javascript
Copy
Edit
const onDomReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};
Intercepting and Modifying the alert Function: The second part of the code is modifying the built-in alert function to intercept and override its behavior. Instead of showing an actual alert box with a message, it logs the message to the console. This is done by using Object.defineProperty to replace the original alert function with a custom one that just prints the message to the console.

Example:

javascript
Copy
Edit
Object.defineProperty(window, 'alert', {
  value: (msg) => console.log(`Alert intercepted: ${msg}`),
  writable: false,
});
Overall Explanation:
The first block ensures that any DOM manipulation only happens after the page has finished loading.
The second block modifies the alert function to prevent actual pop-up alerts and instead log the message to the console. This can be helpful in debugging or preventing disruptive pop-up alerts during execution.
Why use these techniques?
DOM readiness: Ensures that scripts which manipulate DOM elements only run once the page structure is completely loaded.
Intercepting alert: Prevents default browser alerts, which can be disruptive during script execution, and instead logs those messages to the console, allowing developers to better track them.




*/