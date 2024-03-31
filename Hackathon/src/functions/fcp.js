// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

// Function to fetch FCP data for a specific country from the World Bank API for the specified year range
async function fetchCountryFCPData(countryCode, startYear, endYear) {
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.CON.FERT.PT.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        // Extract years and FCP values
        const FCPData = {};

        // Initialize FCP data with null values for all years in the range
        for (let year = startYear; year <= endYear; year++) {
            FCPData[year] = null;
        }

        // Fill in FCP data for available years
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const FCP = parseFloat(entry.value);
            FCPData[year] = FCP;
        });

        // Convert FCP data to array format
        const FCPArray = Object.entries(FCPData).map(([year, FCP]) => [year.toString(), FCP]);
        
        return FCPArray;
    } catch (error) {
        console.error(error);
    }
}

// Function to plot FCP graph using Google Charts
async function plotFCPGraph(countryCode, startYear, endYear) {
    const FCPData = await fetchCountryFCPData(countryCode, startYear, endYear);

    // Create the data table
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Year');
    dataTable.addColumn('number', '% of fertilizer production');
    dataTable.addRows(FCPData);

    // Set chart options
    const options = {
        title: 'Fertilizer consumption (% of fertilizer production)',
        curveType: 'function',
        legend: { position: 'top-right' },
        hAxis: {
            title: 'Year' 
        },
        vAxis: {
            title: '% of fertilizer production',
            format: 'short'
        }
    };
    // Instantiate and draw the chart
    const chart = new google.visualization.LineChart(document.getElementById('fcp-chart'));
    chart.draw(dataTable, options);
}

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    flagIcon.style.backgroundImage = `url(../sources/images/${countryCode}.png)`;

}

// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    updateFlagIcon('IN');
    plotFCPGraph('IN', 1970, 2023);
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    updateFlagIcon('CN');
    plotFCPGraph('CN', 1970, 2023);
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    updateFlagIcon('US');
    plotFCPGraph('US', 1970, 2023);
});

// Variable to store the currently selected country code
let selectedCountryCode = '';

// Function to update the flag icon based on the selected country
function updateFlagIcon(countryCode) {
    const flagIcon = document.getElementById('flagIcon');
    flagIcon.style.backgroundImage = `url(../sources/images/${countryCode}.png)`;
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
    console.log(startYear);
    plotFCPGraph(countryCode, startYear, endYear);
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getSelectedCountryCode();
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotFCPGraph(countryCode, startYear, endYear);
});
    
