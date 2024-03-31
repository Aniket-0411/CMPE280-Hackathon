const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post('/api/draw-sankey', (req, res) => {
    const { years, crop } = req.body;
    let fileURL = "";

    if(crop == "rice"){
        if(years == "2022"){
            fileURL = "US_Rice_IV_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Rice_IV_2021.csv";
        }
        else{
            fileURL = "US_Rice_IV_2020.csv";
        }
    }
    else if(crop == "wheat"){
        if(years == "2022"){
            fileURL = "US_Wheat_IV_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Wheat_IV_2021.csv";
        }
        else{
            fileURL = "US_Wheat_IV_2020.csv";
        } 
    }
    else{
        if(years == "2022"){
            fileURL = "US_Corn_IV_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Corn_IV_2021.csv";
        }
        else{
            fileURL = "US_Corn_IV_2020.csv";
        }  
    }
    fs.readFile(fileURL, 'utf8', (err, csvData) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return res.status(500).send('Error reading CSV file');
        }

        const rows = csvData.split('\n');
        const data = rows.slice(1, -1).map(row => {
            row = row.replace(/, /g, "_");
            row = row.replace(/"/g, "");
            const columns = row.split(',');
            return {
                reporterCountry: columns[1],
                partnerCountry: columns[2],
                importQuantity: parseFloat(columns[6]),
            };
        });
        res.json(data);
    });
});

app.post('/api/draw-pie', (req, res) => {
    const { years, crop } = req.body;
    let fileURL = "";
    if(crop == "rice"){
        if(years == "2022"){
            fileURL = "US_Rice_IQ_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Rice_IQ_2021.csv";
        }
        else{
            fileURL = "US_Rice_IQ_2020.csv";
        }
    }
    else if(crop == "wheat"){
        if(years == "2022"){
            fileURL = "US_Wheat_IQ_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Wheat_IQ_2021.csv";
        }
        else{
            fileURL = "US_Wheat_IQ_2020.csv";
        } 
    }
    else{
        if(years == "2022"){
            fileURL = "US_Corn_IQ_2022.csv";
        }
        else if(years == "2021"){
            fileURL = "US_Corn_IQ_2021.csv";
        }
        else{
            fileURL = "US_Corn_IQ_2020.csv";
        }  
    }

    fs.readFile(fileURL, 'utf8', (err, csvData) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return res.status(500).send('Error reading CSV file');
        }

        const rows = csvData.split('\n');

        const data = rows.slice(1, -1).map(row => {
            row = row.replace(/, /g, "_");
            row = row.replace(/"/g, "");
            const columns = row.split(',');
            return {
                partnerCountry: columns[2],
                importQuantity: parseFloat(columns[6]),
            };
        });
        res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
