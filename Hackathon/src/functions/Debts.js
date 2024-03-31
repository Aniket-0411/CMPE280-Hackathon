// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

let cc = ''

async function fetchCountryDSData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/DT.TDS.DPPF.XP.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const dsData = {};

        for (let year = startYear; year <= endYear; year++) {
            dsData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const ds = parseFloat(entry.value);
            dsData[year] = ds;
        });
    
        const dsArray = Object.entries(dsData).map(([year, ds]) => [year.toString(), ds]);
            
        return dsArray;
    } catch (error) {
        console.error(error);
    }
}

async function fetchCountryDSPData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/DT.TDS.DECT.GN.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const dspData = {};

        for (let year = startYear; year <= endYear; year++) {
            dspData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const dsp = parseFloat(entry.value);
            dspData[year] = dsp;
        });
    
        const dspArray = Object.entries(dspData).map(([year, dsp]) => [year.toString(), dsp]);
            
        return dspArray;
    } catch (error) {
        console.error(error);
    }
}

async function plotDSGraph(countryCode, startYear=1970, endYear=2023) {
    const dsData = await fetchCountryDSData(countryCode, startYear, endYear);
    const dspData = await fetchCountryDSPData(countryCode, startYear, endYear);

    // Create the data table
    const dsDataTable = new google.visualization.DataTable();
    dsDataTable.addColumn('string', 'Year');
    dsDataTable.addColumn('number', 'Debt service (PPG and IMF only)');
    dsDataTable.addRows(dsData);

    const dspDataTable = new google.visualization.DataTable();
    dspDataTable.addColumn('string', 'Year');
    dspDataTable.addColumn('number', 'Total debt service (% of GNI)');
    dspDataTable.addRows(dspData);

    // Set chart options
    const options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Year' // Set x-axis label to "Year"
        },
        vAxis: {
            title: 'Debt services',
            format: "short", 
        }
    };

    // Instantiate and draw the chart
    const dsChart = new google.visualization.LineChart(document.getElementById('dsChart'));
    const dspChart = new google.visualization.LineChart(document.getElementById('dspChart'));
    
    dsChart.draw(dsDataTable, { ...options, title: 'Debt service (PPG and IMF only, % of exports of goods, services and primary income)' });
    dspChart.draw(dspDataTable, { ...options, title: 'Total debt service (% of GNI)' });
}

// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    cc = "IN"
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotDSGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(../sources/images/${cc}.png)`;
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    cc = "CN";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotDSGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(../sources/images/${cc}.png)`;
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    cc = "US";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotDSGraph(cc, startYear, endYear);
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
    plotDSGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getCC(); // Add this line to get the selected country code
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotDSGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});