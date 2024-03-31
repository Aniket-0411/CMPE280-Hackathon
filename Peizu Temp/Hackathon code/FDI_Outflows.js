// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

// Function to fetch FDI_Outflow data for a specific country from the World Bank API for the specified year range
async function fetchCountryFDI_OutflowData(countryCode, startYear, endYear) {
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/BM.KLT.DINV.WD.GD.ZS?date=${startYear}:${endYear}&format=json`
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        // Extract years and FDI_Outflow values
        const FDI_OutflowData = {};

        // Initialize FDI_Outflow data with null values for all years in the range
        for (let year = startYear; year <= endYear; year++) {
            FDI_OutflowData[year] = null;
        }

        // Fill in FDI_Outflow data for available years
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const FDI_Outflow = parseFloat(entry.value);
            FDI_OutflowData[year] = FDI_Outflow;
        });

        // Convert FDI_Outflow data to array format
        const FDI_OutflowArray = Object.entries(FDI_OutflowData).map(([year, FDI_Outflow]) => [year.toString(), FDI_Outflow]);
        
        return FDI_OutflowArray;
    } catch (error) {
        console.error(error);
    }
}

// Function to plot FDI_Outflow graph using Google Charts
async function plotFDI_OutflowGraph(countryCode, startYear, endYear) {
    const FDI_OutflowData = await fetchCountryFDI_OutflowData(countryCode, startYear, endYear);

    // Create the data table
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Year');
    dataTable.addColumn('number', '% FDI_Outflow');
    dataTable.addRows(FDI_OutflowData);

    // Set chart options
    const options = {
        title: 'Country FDI Outflow(% of GDP))',
        curveType: 'function',
        legend: { position: 'top-right' },
        hAxis: {
            title: 'Year'
        },
        vAxis: {
            title: '% FDI Outflow',
            format: 'short'
        }
    };

    // Instantiate and draw the chart
    const chart = new google.visualization.LineChart(document.getElementById('fdi-outflow-chart'));
    
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
    plotFDI_OutflowGraph('IN', 1970, 2023);
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    updateFlagIcon('CN');
    plotFDI_OutflowGraph('CN', 1970, 2023);
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    updateFlagIcon('US');
    plotFDI_OutflowGraph('US', 1970, 2023);
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
    plotFDI_OutflowGraph(countryCode, startYear, endYear);
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getSelectedCountryCode();
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotFDI_OutflowGraph(countryCode, startYear, endYear);
});

