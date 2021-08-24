document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowUp':
            alert('ArrowUp key down');
            break;
        case 'ArrowDown':
            alert('ArrowDown key down');
            break;
        case 'ArrowRight':
            alert('ArrowRight key down');
            break;
        case 'ArrowLeft':
            alert('ArrowLeft key down');
            break;
                
    
        default:
            break;
    }
});