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
        document.getElementById('Frame').data = 'FDI_Inflows.html';
    });

    // Event listener for FDI Outflows link
    document.getElementById('fdiOutflowsLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'FDI_Outflows.html';
    });

    // Event listener for Agriculture contribution link
    document.getElementById('ac').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'AgriContribution.html';
    });

    // Event listener for Manufacturing Value Added link
    document.getElementById('manu').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'Manufacturing.html';
    });

    // Event listener for AFF Annual Growth link
    document.getElementById('avap').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'AFF.html';
    });

    // Event listener for FCKA link
    document.getElementById('fcka').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'fcka.html';
    });

    // Event listener for FCP link
    document.getElementById('fcp').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'fcp.html';
    });

    // Event listener for Total Reserves link
    document.getElementById('tr').addEventListener('click', (e) => {
        e.preventDefault();
        const frame = document.getElementById('Frame');
        frame.data = 'TRMI.html';
    });

    document.getElementById('ds').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("Frame").data = "Debts.html";
    });

    document.getElementById('gni').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("Frame").data = "GNI.html";
    });
});

// Get all buttons
const buttons = document.querySelectorAll('button');

// Add click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        this.classList.add('active');
        // You can add logic here to handle chart data based on the clicked button
    });
});