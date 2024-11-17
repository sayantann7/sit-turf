document.addEventListener('DOMContentLoaded', () => {
    const statusForm = document.getElementById('statusForm');
    const statusIndicator = document.getElementById('statusIndicator');
    const occupancyStatus = document.getElementById('occupancyStatus');
    const playerInput = document.getElementById('playerInput');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const updateBtn = document.getElementById('updateBtn');
    const lastUpdated = document.getElementById('lastUpdated');

    function updateStatus() {
        const count = parseInt(playerInput.value);
        if (count > 0) {
            statusIndicator.classList.add('occupied');
            statusIndicator.classList.remove('available');
            occupancyStatus.textContent = 'Turf is currently occupied';
        } else {
            statusIndicator.classList.add('available');
            statusIndicator.classList.remove('occupied');
            occupancyStatus.textContent = 'Turf is available';
        }
        updateLastUpdated();
    }

    function updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: 'numeric',
            hour12: true 
        });
        lastUpdated.textContent = timeString;
    }

    function updatePlayerCount(newCount) {
        const count = Math.max(0, newCount);
        playerInput.value = count;
        updateStatus();
    }

    decreaseBtn.addEventListener('click', () => {
        updatePlayerCount(parseInt(playerInput.value) - 1);
    });

    increaseBtn.addEventListener('click', () => {
        updatePlayerCount(parseInt(playerInput.value) + 1);
    });

    // statusForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    //     // Simulate updating status
    //     updateBtn.textContent = 'Updating...';
    //     updateBtn.disabled = true;

    //     setTimeout(() => {
    //         updateStatus();
    //         updateBtn.textContent = 'Update Status';
    //         updateBtn.disabled = false;
    //     }, 1000);
    // });

    // Initial status update
    updateStatus();
});