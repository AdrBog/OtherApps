// This addon lets you add keyboard shortcuts to OtherApps

document.addEventListener('keydown', e => {
    // Save
    if (e.ctrlKey && e.key === 's')
        save();

    // Test the app
    if (e.key == 'F5') {
        e.preventDefault();
        test();
    }
})