document.addEventListener('DOMContentLoaded', function() {
    // Event listener for GDP link
    document.getElementById('gdpLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'GDP.html';
    });

    // Event listener for macroeconomic menu item
    document.querySelectorAll('.expandable').forEach(function(item) {
        item.addEventListener('click', function() {
            this.classList.toggle('active'); // Toggle the active class
            const submenu = this.nextElementSibling;
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block'; // Toggle display of submenu
        });
    });

    // Event listener for FDI Inflows link
    document.getElementById('fdiInflowsLink').addEventListener('click', function(event) {
        event.preventDefault();
        // Add functionality to plot FDI Inflows graph
    });

    // Event listener for FDI Outflows link
    document.getElementById('fdiOutflowsLink').addEventListener('click', function(event) {
        event.preventDefault();
        // Add functionality to plot FDI Outflows graph
    });

    // Event listener for Total Reserves link
    document.getElementById('tr').addEventListener('click', function(event) {
        event.preventDefault();
        const frame = document.getElementById('Frame');
        frame.data = 'TRMI.html';
    });
});
