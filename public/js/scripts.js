
function toggle_visibility(id, element) {
    var e = document.getElementById(id); // Get the content to toggle

    // Check current display state
    var isVisible = e.style.display === 'block' || getComputedStyle(e).display !== 'none';

    if (isVisible) {
        e.style.display = 'none'; // Hide the content
      
    } else {
        e.style.display = 'block'; // Show the content
     
    }
}
