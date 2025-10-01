// Service worker that immediately unregisters itself
console.log('🧹 Service worker loaded - unregistering immediately');

self.addEventListener('install', function(event) {
  console.log('SW: Install event - skipping waiting');
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('SW: Activate event - unregistering self');
  event.waitUntil(
    self.registration.unregister().then(function() {
      console.log('SW: Successfully unregistered');
      return self.clients.matchAll();
    }).then(function(clients) {
      clients.forEach(client => {
        console.log('SW: Reloading client');
        client.navigate(client.url);
      });
    })
  );
});

// Don't handle any fetch events
self.addEventListener('fetch', function(event) {
  // Let the browser handle all requests normally
  return;
});