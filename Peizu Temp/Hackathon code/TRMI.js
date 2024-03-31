// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});

let cc = ''

async function fetchCountryTRMData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/FI.RES.TOTL.MO?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const trmData = {};

        for (let year = startYear; year <= endYear; year++) {
            trmData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const trm = parseFloat(entry.value);
            trmData[year] = trm;
        });
    
        const trmArray = Object.entries(trmData).map(([year, trm]) => [year.toString(), trm]);
            
        return trmArray;
    } catch (error) {
        console.error(error);
    }
}

async function fetchCountryTRMGData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/FI.RES.TOTL.CD?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const trmData = {};

        for (let year = startYear; year <= endYear; year++) {
            trmData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const trm = parseFloat(entry.value);
            trmData[year] = trm;
        });
    
        const trmArray = Object.entries(trmData).map(([year, trm]) => [year.toString(), trm]);
            
        return trmArray;
    } catch (error) {
        console.error(error);
    }
}

async function fetchCountryTRMEDData(countryCode, startYear=1970, endYear=2023){
    // Construct the API URL with the country code and date range
    const url = `http://api.worldbank.org/v2/countries/${countryCode}/indicators/FI.RES.TOTL.DT.ZS?date=${startYear}:${endYear}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the World Bank API');
        }
        const data = await response.json();

        const trmData = {};

        for (let year = startYear; year <= endYear; year++) {
            trmData[year] = null;
        }
    
        data[1].forEach(entry => {
            const year = parseInt(entry.date);
            const trm = parseFloat(entry.value);
            trmData[year] = trm;
        });
    
        const trmArray = Object.entries(trmData).map(([year, trm]) => [year.toString(), trm]);
            
        return trmArray;
    } catch (error) {
        console.error(error);
    }
}

async function plotTRMGraph(countryCode, startYear=1970, endYear=2023) {
    const trmData = await fetchCountryTRMData(countryCode, startYear, endYear);
    const trmgData = await fetchCountryTRMGData(countryCode, startYear, endYear);
    const trmedData = await fetchCountryTRMEDData(countryCode, startYear, endYear);

    // Create the data table
    const trmDataTable = new google.visualization.DataTable();
    trmDataTable.addColumn('string', 'Year');
    trmDataTable.addColumn('number', 'Total Reserves in Months of Import');
    trmDataTable.addRows(trmData);

    const trmgDataTable = new google.visualization.DataTable();
    trmgDataTable.addColumn('string', 'Year');
    trmgDataTable.addColumn('number', 'Total reserves (includes gold, current US$)');
    trmgDataTable.addRows(trmgData);

    const trmedDataTable = new google.visualization.DataTable();
    trmedDataTable.addColumn('string', 'Year');
    trmedDataTable.addColumn('number', 'Total reserves (% of total external debt)');
    trmedDataTable.addRows(trmedData);

    // Set chart options
    const options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Year' // Set x-axis label to "Year"
        },
        vAxis: {
            title: 'Total Reserves',
            format: "short", 
        }
    };

    // Instantiate and draw the chart
    const trmChart = new google.visualization.LineChart(document.getElementById('trmChart'));
    const trmgChart = new google.visualization.LineChart(document.getElementById('trmgChart'));
    const trmedChart = new google.visualization.LineChart(document.getElementById('trmedChart'));
    
    trmChart.draw(trmDataTable, { ...options, title: 'Total Reserves in Months of Import' });
    trmgChart.draw(trmgDataTable, { ...options, title: 'Total reserves (includes gold, current US$)' });
    trmedChart.draw(trmedDataTable, { ...options, title: 'Total reserves (% of total external debt)' });
}

document.getElementById('flagIcon').style.backgroundImage = `url(${cc}.png)` 

// Event listener for India button
document.getElementById('indiaButton').addEventListener('click', function() {
    cc = "IN"
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotTRMGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(${cc}.png)`;
});

// Event listener for China button
document.getElementById('chinaButton').addEventListener('click', function() {
    cc = "CN";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotTRMGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(${cc}.png)`;
});

// Event listener for USA button
document.getElementById('usaButton').addEventListener('click', function() {
    cc = "US";
    const startYear = parseInt(document.getElementById('startYearValue').textContent);
    const endYear = parseInt(document.getElementById('endYearSlider').value);
    plotTRMGraph(cc, startYear, endYear);
    document.getElementById('flagIcon').style.backgroundImage = `url(${cc}.png)`;
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
    plotTRMGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});

document.getElementById('endYearSlider').addEventListener('input', function() {
    const endYear = parseInt(this.value);
    document.getElementById('endYearValue').textContent = endYear;
    const startYear = parseInt(document.getElementById('startYearSlider').value);
    const countryCode = getCC(); // Add this line to get the selected country code
    document.getElementById('startYearSlider').setAttribute('max', endYear);
    plotTRMGraph(countryCode, startYear, endYear); // Pass countryCode as the first parameter
});