// Function to copy the article number to clipboard
function copyToClipboard() {
  const articleNumberElement = document.getElementById('articleNumberReadonly');
  if (articleNumberElement) {
    const articleNumber = articleNumberElement.value || articleNumberElement.textContent; // Get value or text
    navigator.clipboard.writeText(articleNumber)
      .then(() => {
        alert('Article number copied to clipboard: ' + articleNumber);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  } else {
    alert('Article number element not found!');
  }
}


// Function to create the copy button
function createCopyButton() {
  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy Article Number';
  copyButton.style.position = 'fixed';
  copyButton.style.bottom = '20px';
  copyButton.style.right = '20px';
  copyButton.style.padding = '10px 15px';
  copyButton.style.backgroundColor = '#007bff';
  copyButton.style.color = '#fff';
  copyButton.style.border = 'none';
  copyButton.style.borderRadius = '5px';
  copyButton.style.cursor = 'pointer';
  copyButton.style.zIndex = '1000';
  
  // Add click event to the button
  copyButton.addEventListener('click', copyToClipboard);

  // Add the button to the body
  document.body.appendChild(copyButton);
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', createCopyButton);
