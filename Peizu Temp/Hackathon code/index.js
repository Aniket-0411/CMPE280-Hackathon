document.addEventListener('DOMContentLoaded', function() {

    hideAnnotationsByDefault();

    // Event listener for GDP link
    document.getElementById('gdpLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'GDP.html';
        hideAnnotationsByDefault();
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
        hideAnnotationsByDefault();
    });

    // Event listener for FDI Outflows link
    document.getElementById('fdiOutflowsLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('Frame').data = 'FDI_Outflows.html';
        hideAnnotationsByDefault();
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

    document.getElementById('import').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById("Frame").data = "Import.html";
    });

    //Save annotations to local storage
    document.getElementById('annotations').addEventListener('change', (e) => {
        console.log("Value changed");
        var objectData = document.getElementById('Frame').getAttribute('data');
        var country = localStorage.getItem('Country');
        objectData += country;                                  //Unique Variable name according to Country and graph
        var annotationsText = document.getElementById('annotations').value;
        localStorage.setItem(objectData,annotationsText);
        console.log(objectData,annotationsText);
    });

    function hideAnnotationsByDefault(){
        var annotations = document.querySelector('.annotations');
        annotations.style.display = 'none';
    }
    function checkAnnotationsVisibility(){
        var objectData = document.getElementById('Frame').getAttribute('data');
        var userType = localStorage.getItem('userType');
        var annotations = document.querySelector('.annotations');
        if(userType == 'ECON Researcher'){
            if (objectData.trim() == 'GDP.html' || objectData.trim() == 'FDI_Outflows.html' || objectData.trim() == 'FDI_Inflows.html') {
                annotations.style.display = 'block';
            } else {
                annotations.style.display = 'none';
            }
        } else{
            annotations.style.display = 'none';
        }
    }

    function LoadAnnotationsText(){
        var objectData = document.getElementById('Frame').getAttribute('data');
        var country = localStorage.getItem('Country');
        objectData += country;
        var LoadText = localStorage.getItem(objectData);
        console.log(objectData,country);
        if(objectData != null){
            var annotationsText = document.getElementById('annotations');
            annotationsText.value = LoadText;
        }
    }
    
    window.addEventListener("message", function(event) {
        if (event.data === "InvokeIndexJsAnnotationsLoad") {
            checkAnnotationsVisibility();
            setTimeout(function() {
                LoadAnnotationsText();              //Execute after 10ms because index Event listener takes time to setup
            }, 10);                         
            
        }
    });
});
