// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

// Function to fetch FCKA data for a specific country from the World Bank API for the specified year range
async function fetchCountryFCKAData(countryCode, startYear, endYear) {
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/AG.CON.FERT.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        // Extract years and FCKA values
        const FCKAData = {};

        // Initialize FCKA data with null values for all years in the range
        for (let year = startYear; year <= endYear; year++) {
            FCKAData[year] = null;
        }

        // Fill in FCKA data for available years
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const FCKA = parseFloat(entry.value);
            FCKAData[year] = FCKA;
        });

        // Convert FCKA data to array format
        const FCKAArray = Object.entries(FCKAData).map(([year, FCKA]) => [year.toString(), FCKA]);
        
        return FCKAArray;
    } catch (error) {
        console.error(error);
    }
}

// Function to plot FCKA graph using Google Charts
async function plotFCKAGraph(countryCode, startYear, endYear) {
    const FCKAData = await fetchCountryFCKAData(countryCode, startYear, endYear);

    // Create the data table
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Year');
    dataTable.addColumn('number', 'Kilogram per Hectare');
    dataTable.addRows(FCKAData);

    // Set chart options
    const options = {
        title: 'Fertilizer consumption (kilograms per hectare of arable land)',
        curveType: 'function',
        legend: { position: 'top-right' },
        hAxis: {
            title: 'Year' 
        },
        vAxis: {
            title: 'Kilogram per Hectare',
            format: 'short'
        }
    };
    // Instantiate and draw the chart
    const chart = new google.visualization.LineChart(document.getElementById('fcka-chart'));
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
    plotFCKAGraph('IN', 1970, 2023);
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    updateFlagIcon('CN');
    plotFCKAGraph('CN', 1970, 2023);
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    updateFlagIcon('US');
    plotFCKAGraph('US', 1970, 2023);
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
    console.log(startYear);
    plotFCKAGraph(countryCode, startYear, endYear);
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getSelectedCountryCode();
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotFCKAGraph(countryCode, startYear, endYear);
});

