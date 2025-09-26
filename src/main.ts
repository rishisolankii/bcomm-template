import '@angular/localize/init';

import('./bootstrap')
	.catch(err => console.error(err));

// Check if the template is loaded Standalone
// This is used to handle the mock data accordingly
(window as any).__REMOTE_STANDALONE__ = true;