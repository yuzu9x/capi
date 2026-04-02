document.addEventListener('DOMContentLoaded', () => {
    const capi = document.getElementById('capi');
    const initialScene = document.getElementById('initial-scene');
    const doorsScene = document.getElementById('doors-scene');
    const instructions = document.getElementById('instructions');
  
    // Animate the orb
    setTimeout(() => {
      capi.style.opacity = 1;
      capi.style.transform = 'scale(1)';
      // Set starting position
      capi.style.left = (window.innerWidth / 2 - capi.offsetWidth / 2) + 'px';
      capi.style.top = (window.innerHeight / 2 - capi.offsetHeight / 2) + 'px';
    }, 100);
  
    let isDragging = false;
    let offsetX, offsetY;
  
    // Drag CAPI
    capi.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - capi.offsetLeft;
      offsetY = e.clientY - capi.offsetTop;
      capi.style.cursor = 'grabbing';
    });
  
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        capi.style.cursor = 'grab';
        checkDoorDrop();
      }
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        capi.style.position = 'absolute';
        capi.style.left = (e.clientX - offsetX) + 'px';
        capi.style.top = (e.clientY - offsetY) + 'px';
      }
    });
  
    function checkDoorDrop() {
      const door1 = document.getElementById('door1');
      const door2 = document.getElementById('door2');
  
      const capiRect = capi.getBoundingClientRect();
      const door1Rect = door1.getBoundingClientRect();
      const door2Rect = door2.getBoundingClientRect();
  
      if (isOverlap(capiRect, door1Rect)) {
        enterRoom('door1');
      } else if (isOverlap(capiRect, door2Rect)) {
        enterRoom('door2');
      }
    }
  
    function isOverlap(rect1, rect2) {
      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      );
    }
  
    function enterRoom(doorId) {
      initialScene.style.display = 'none';
      doorsScene.style.display = 'none';
      alert(`Entered ${doorId === 'door1' ? 'Room 1' : 'Room 2'}`);
    }
  
    // ----------------------------------------
    // Handle instructions: Stay visible for 4 seconds
    // then fade out smoothly
    // ----------------------------------------
  
    // After 4 seconds, start fade out
    setTimeout(() => {
      instructions.style.transition = 'opacity 1s ease';
      instructions.style.opacity = 0;
      // Disable pointer events so clicks pass through during fade
      instructions.style.pointerEvents = 'none';
  
      // After transition ends, hide the instructions completely
      instructions.addEventListener('transitionend', () => {
        instructions.style.display = 'none';
      });
    }, 4000);
  });