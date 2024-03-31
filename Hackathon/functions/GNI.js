// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

let cc = ''

async function fetchCountryGNIData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/NY.GNP.MKTP.CD?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const gniData = {};

        for (let year = startYear; year <= endYear; year++) {
            gniData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const gni = parseFloat(entry.value);
            gniData[year] = gni;
        });
    
        const gniArray = Object.entries(gniData).map(([year, gni]) => [year.toString(), gni]);
            
        return gniArray;
    } catch (error) {
        console.error(error);
    }
}

async function plotGNIGraph(countryCode, startYear=1970, endYear=2023) {
    const gniData = await fetchCountryGNIData(countryCode, startYear, endYear);

    // Create the data table
    const gniDataTable = new google.visualization.DataTable();
    gniDataTable.addColumn('string', 'Year');
    gniDataTable.addColumn('number', 'GNI (USD)');
    gniDataTable.addRows(gniData);

    // Set chart options
    const options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Year' // Set x-axis label to "Year"
        },
        vAxis: {
            title: 'GNI (USD)',
            format: "short", 
        }
    };

    // Instantiate and draw the chart
    const gniChart = new google.visualization.LineChart(document.getElementById('gniChart'));
    
    gniChart.draw(gniDataTable, { ...options, title: 'GNI (USD)' });
}


// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    cc = "IN"
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotGNIGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(../sources/images/${cc}.png)`;
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    cc = "CN";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotGNIGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(../sources/images/${cc}.png)`;
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    cc = "US";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotGNIGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(../sources/images/${cc}.png)`;
});


// Function to get the selected country code
function getCC() {
    return cc;
}

// Function to update the graph when the slider value changes
document.getElementById('startYearSlider').addEventListener('input', function() {
    const startYear = parseInt(this.value);
    document.getElementById('startYearValue').textContent = startYear;
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    const countryCode = getCC(); // Add this line to get the selected country code
    document.getElementById('endYearSlider').setAttribute('min', startYear);
    plotGNIGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getCC(); // Add this line to get the selected country code
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotGNIGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});