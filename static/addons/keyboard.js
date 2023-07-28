// This addon lets you add keyboard shortcuts to OtherApps
// The copy and paste shortcuts are edited in "copypaste.js"

document.addEventListener('keydown', e => {
    // Save
    if (e.ctrlKey && e.key === 's'){
        e.preventDefault();
        save();
    }

    // Test the app
    if (e.key == 'F5') {
        e.preventDefault();
        test();
    }
})