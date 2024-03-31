// Load the Google Charts library
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['sankey']});
// google.charts.setOnLoadCallback(drawChart);

function drawAll(crop){
    if(document.getElementById("years").textContent == "Years"){
        return;
    }
    else{
        const years = document.getElementById("years").textContent;

        drawSankey(crop, years);
        drawChart(crop, years);
    }
}

function drawSankey(crop, years) {
    const data = {
        years: years,
        crop: crop,
    }

    fetch('http://localhost:3002/api/draw-sankey', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Reporter Country');
        dataTable.addColumn('string', 'Partner Country');
        dataTable.addColumn('number', 'Import Value');

        data.forEach(item => {
            dataTable.addRow([item.reporterCountry, item.partnerCountry, parseFloat(item.importQuantity)]);
            console.log(item.reporterCountry, item.partnerCountry, parseFloat(item.importQuantity))
        });

        var options = {
            title: `Import Value of ${crop} ${years} (1000 USD)`,
            height: 600,
        };

        var chart = new google.visualization.Sankey(document.getElementById('sankey'));
        chart.draw(dataTable, options);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

function drawChart(crop, years) {
    const data = {
        years: years,
        crop: crop,
    }

    fetch('http://localhost:3002/api/draw-pie', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(data),
    }).then(response => response.json()).then(data => {
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('string', 'Partner Country');
        dataTable.addColumn('number', 'Import Quantity');

        data.forEach(item => {
            dataTable.addRow([item.partnerCountry, parseFloat(item.importQuantity)]);
        });

        var options = {
            title: `Import Quantity of ${crop} ${years} (T)`,
            width: 900,
            height: 500,
        };

        var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
        chart.draw(dataTable, options);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

function setYear(year){
    let years = document.getElementById("years");
    years.innerText = year;
    const details = document.querySelectorAll("details");
    details.forEach(detail => {
        detail.open = false;
    })
    document.getElementById('pie_chart').innerHTML = null;
    document.getElementById('sankey').innerHTML = null;
}