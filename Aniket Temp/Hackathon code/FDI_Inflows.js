// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

// Function to fetch GDP data for a specific country from the World Bank API for the specified year range
async function fetchCountryGDPData(countryCode, startYear, endYear) {
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/BX.KLT.DINV.WD.GD.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        // Extract years and GDP values
        const gdpData = {};

        // Initialize GDP data with null values for all years in the range
        for (let year = startYear; year <= endYear; year++) {
            gdpData[year] = null;
        }

        // Fill in GDP data for available years
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const gdp = parseFloat(entry.value);
            gdpData[year] = gdp;
        });

        // Convert GDP data to array format
        const gdpArray = Object.entries(gdpData).map(([year, gdp]) => [year.toString(), gdp]);
        
        return gdpArray;
    } catch (error) {
        console.error(error);
    }
}

// Function to plot GDP graph using Google Charts
async function plotGDPGraph(countryCode, startYear, endYear) {
    const gdpData = await fetchCountryGDPData(countryCode, startYear, endYear);

    // Create the data table
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Year');
    dataTable.addColumn('number', 'GDP');
    dataTable.addRows(gdpData);

    // Set chart options
    const options = {
        title: 'Country FDI Inflow(% of GDP)',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Year' // Set x-axis label to "Year"
        },
        vAxis: {
            title: 'FDI Inflow', // Set y-axis label to "GDP (in USD)"
            format: 'short' // Formats y-axis labels to use "short" notation (e.g., 1K, 1M, 1B)
        }
    };

    // Instantiate and draw the chart
    const chart = new google.visualization.LineChart(document.getElementById('fdi-inflow-chart'));
    
    chart.draw(dataTable, options);
}

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    // Assuming the file names for flags are named by their country codes, e.g., "IN.png" for India
    flagIcon.style.backgroundImage = `url(${countryCode}.png)`;

}

// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    updateFlagIcon('IN');
    plotGDPGraph('IN', 1970, 2023);
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    updateFlagIcon('CN');
    plotGDPGraph('CN', 1970, 2023);
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    updateFlagIcon('US');
    plotGDPGraph('US', 1970, 2023);
});

// Variable to store the currently selected country code
let selectedCountryCode = '';

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    // Assuming the file names for flags are named by their country codes, e.g., "IN.png" for India
    flagIcon.style.backgroundImage = `url(${countryCode}.png)`;
    selectedCountryCode = countryCode; // Update the selectedCountryCode variable
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
    const countryCode = getSelectedCountryCode(); // Add this line to get the selected country code
    document.getElementById('endYearSlider').setAttribute('min', startYear);
    plotGDPGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getSelectedCountryCode(); // Add this line to get the selected country code
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotGDPGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});

