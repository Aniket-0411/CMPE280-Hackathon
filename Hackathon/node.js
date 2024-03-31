const express = require("express");
require("dotenv").config();
const fs = require("fs");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "src")));
console.log("__dirname: ", __dirname);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/src/templates/Index.html"))
);

app.post("/api/call-gpt", async (req, res) => {
  //Process the prompt
  let prompt = req.body.prompt;

  let response = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system", //Prompt Engineering
        content:
          "You are a helpful assistant trained on https://data.unicef.org/wp-content/uploads/2023/07/SOFI-2023.pdf. Don't mention that it's a link. Politely disregard any other topic.}",
      },
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
  };

  await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
    },
    body: JSON.stringify(response),
  })
    .then((response) => response.json())
    .then((json) => {
      //Handle Response
      const data = {
        response: json.choices[0].message.content,
      };
      res.send({ data });
    });
});

app.post("/api/draw-sankey", (req, res) => {
  const { years, crop } = req.body;
  let fileURL = "";

  if (crop == "rice") {
    if (years == "2022") {
      fileURL = "sources/csv/US_Rice_IV_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Rice_IV_2021.csv";
    } else {
      fileURL = "sources/csv/US_Rice_IV_2020.csv";
    }
  } else if (crop == "wheat") {
    if (years == "2022") {
      fileURL = "sources/csv/US_Wheat_IV_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Wheat_IV_2021.csv";
    } else {
      fileURL = "sources/csv/US_Wheat_IV_2020.csv";
    }
  } else {
    if (years == "2022") {
      fileURL = "sources/csv/US_Corn_IV_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Corn_IV_2021.csv";
    } else {
      fileURL = "sources/csv/US_Corn_IV_2020.csv";
    }
  }
  fs.readFile(fileURL, "utf8", (err, csvData) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      return res.status(500).send("Error reading CSV file");
    }

    const rows = csvData.split("\n");
    const data = rows.slice(1, -1).map((row) => {
      row = row.replace(/, /g, "_");
      row = row.replace(/"/g, "");
      const columns = row.split(",");
      return {
        reporterCountry: columns[1],
        partnerCountry: columns[2],
        importQuantity: parseFloat(columns[6]),
      };
    });
    res.json(data);
  });
});

app.post("/api/draw-pie", (req, res) => {
  const { years, crop } = req.body;
  let fileURL = "";
  if (crop == "rice") {
    if (years == "2022") {
      fileURL = "sources/csv/US_Rice_IQ_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Rice_IQ_2021.csv";
    } else {
      fileURL = "sources/csv/US_Rice_IQ_2020.csv";
    }
  } else if (crop == "wheat") {
    if (years == "2022") {
      fileURL = "sources/csv/US_Wheat_IQ_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Wheat_IQ_2021.csv";
    } else {
      fileURL = "sources/csv/US_Wheat_IQ_2020.csv";
    }
  } else {
    if (years == "2022") {
      fileURL = "sources/csv/US_Corn_IQ_2022.csv";
    } else if (years == "2021") {
      fileURL = "sources/csv/US_Corn_IQ_2021.csv";
    } else {
      fileURL = "sources/csv/US_Corn_IQ_2020.csv";
    }
  }

  fs.readFile(fileURL, "utf8", (err, csvData) => {
    if (err) {
      console.error("Error reading CSV file:", err);
      return res.status(500).send("Error reading CSV file");
    }

    const rows = csvData.split("\n");

    const data = rows.slice(1, -1).map((row) => {
      row = row.replace(/, /g, "_");
      row = row.replace(/"/g, "");
      const columns = row.split(",");
      return {
        partnerCountry: columns[2],
        importQuantity: parseFloat(columns[6]),
      };
    });
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
