// Register a service worker that immediately unregisters itself
console.log('🧹 RegisterSW: Loading self-destructing service worker');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js', { scope: './' })
    .then(function(registration) {
      console.log('🧹 RegisterSW: Self-destructing SW registered');
      
      // Force update to activate the new service worker
      registration.update();
      
      // Listen for the service worker to be activated
      registration.addEventListener('updatefound', function() {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', function() {
          if (newWorker.state === 'activated') {
            console.log('🧹 RegisterSW: New SW activated, reloading page');
            window.location.reload();
          }
        });
      });
    })
    .catch(function(error) {
      console.log('🧹 RegisterSW: Failed to register SW:', error);
    });
}