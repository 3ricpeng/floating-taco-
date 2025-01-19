(function () {
  'use strict';

  // Define buttons specific to the KB page
  const kbButtons = [
    { text: 'Copy KB#', action: copyKB, id: 'copyKB' },
    { text: 'Scroll to Top', action: scrollToTop, id: 'scrollToTop' }
  ];

  // Button actions
  function copyKB() {
    alert('Copying KB#');
    // Add KB copy logic here
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Load buttons after the page is ready
  window.addEventListener('load', () => {
    ButtonUtils.createButtonContainer(kbButtons);
  });
})();
