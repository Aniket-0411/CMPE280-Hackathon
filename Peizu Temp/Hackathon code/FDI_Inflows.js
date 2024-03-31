// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});


async function fetchCountryData(countryCode, startYear, endYear) {
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/BX.KLT.DINV.WD.GD.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        // Extract years and FDI_inflow values
        const FDI_inflow_data = {};

        // Initialize FDI_inflow data with null values for all years in the range
        for (let year = startYear; year <= endYear; year++) {
            FDI_inflow_data[year] = null;
        }

        // Fill in FDI_inflow data for available years
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const FDI_inflow = parseFloat(entry.value);
            FDI_inflow_data[year] = FDI_inflow;
        });

        // Convert FDI_inflow data to array format
        const FDI_inflowArray = Object.entries(FDI_inflow_data).map(([year, FDI_inflow]) => [year.toString(), FDI_inflow]);
        
        return FDI_inflowArray;
    } catch (error) {
        console.error(error);
    }
}

// Function to plot FDI_inflow graph using Google Charts
async function plotFDI_inflowGraph(countryCode, startYear, endYear) {
    const FDI_inflow_data = await fetchCountryData(countryCode, startYear, endYear);

    // Create the data table
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Year');
    dataTable.addColumn('number', ' % FDI_inflow');
    dataTable.addRows(FDI_inflow_data);

    // Set chart options
    const options = {
        title: 'Country FDI Inflow(% of GDP)',
        curveType: 'function',
        legend: { position: 'top-right' },
        hAxis: {
            title: 'Year' 
        },
        vAxis: {
            title: '% FDI Inflow',
            format: 'short'
        }
    };
    // Instantiate and draw the chart
    const chart = new google.visualization.LineChart(document.getElementById('fdi-inflow-chart'));
    chart.draw(dataTable, options);
}

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    flagIcon.style.backgroundImage = `url(${countryCode}.png)`;

}

// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    updateFlagIcon('IN');
    plotFDI_inflowGraph('IN', 1970, 2023);
    localStorage.setItem('Country','IN');                       //For annotations
    window.parent.postMessage("InvokeIndexJsAnnotationsLoad", "*");  //For annotations
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    updateFlagIcon('CN');
    plotFDI_inflowGraph('CN', 1970, 2023);
    localStorage.setItem('Country','CN');                       //For annotations
    window.parent.postMessage("InvokeIndexJsAnnotationsLoad", "*");  //For annotations
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    updateFlagIcon('US');
    plotFDI_inflowGraph('US', 1970, 2023);
    localStorage.setItem('Country','US');                       //For annotations
    window.parent.postMessage("InvokeIndexJsAnnotationsLoad", "*");  //For annotations
});

// Variable to store the currently selected country code
let selectedCountryCode = '';

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    flagIcon.style.backgroundImage = `url(${countryCode}.png)`;
    selectedCountryCode = countryCode;
}

// Function to get the selected country code
function getSelectedCountryCode() {
    return selectedCountryCode;
}

// Function to update the graph when the slider value changes
document.getElementById('startYearSlider').addEventListener('input', function() {
    const startYear = parseInt(this.value);
    document.getElementById('startYearValue').textContent = startYear;
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    const countryCode = getSelectedCountryCode();
    document.getElementById('endYearSlider').setAttribute('min', startYear);
    plotFDI_inflowGraph(countryCode, startYear, endYear);
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getSelectedCountryCode();
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotFDI_inflowGraph(countryCode, startYear, endYear);
});

