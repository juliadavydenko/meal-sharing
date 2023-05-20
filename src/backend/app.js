const express = require("express");
const app = express();
const router = express.Router();

const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

const knex = require("./database");
// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);
router.use("/reviews", reviewsRouter);
//Future meals route 
app.get("/future-meals", (req, res) => {
  knex
  .raw("SELECT * FROM meal WHERE `when` > 'GETDATE()'")
  .then((rows) => {
    res.end(JSON.stringify(rows[0]));
  })
  .catch((error) => {
  console.error(error);
    res.status(500).end("Internal Server Error");
  });
});

//Past meals route 
app.get("/past-meals", (req, res) => {
  knex
  .raw("SELECT * FROM meal WHERE `when` < 'GETDATE()'")
  .then((rows) => {
    res.end(JSON.stringify(rows[0]));
  })
  .catch((error) => {
  console.error(error);
    res.status(500).end("Internal Server Error");
  });
});

//All meals route 
app.get("/all-meals", (req, res) => {
  knex
  .raw("SELECT * FROM meal ORDER BY id")
  .then((rows) => {
    res.end(JSON.stringify(rows[0]));
  })
  .catch((error) => {
  console.error(error);
    res.status(500).end("Internal Server Error");
  });
});

//First meal route 
app.get("/first-meal", (req, res) => {
  knex
  .raw("SELECT * FROM meal LIMIT 1")
  .then((rows) => {
    res.end(JSON.stringify(rows[0]));
  })
  .catch((error) => {
  console.error(error);
    res.status(500).end("Internal Server Error");
  });
});

//Last meal route 
app.get("/last-meal", (req, res) => {
  knex
  .raw("SELECT * FROM meal ORDER BY ID DESC LIMIT 1")
  .then((rows) => {
    res.end(JSON.stringify(rows[0]));
  })
  .catch((error) => {
  console.error(error);
    res.status(500).end("Internal Server Error");
  });
});



if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;

/*
app.get("/", function(request, response){
  console.log(request);
  });
  app.listen(3000, function(){
    console.log("Server is on 3000");
    });

   const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

const currentDate = new Date().toISOString().slice(0, 10);
router.use("/meals", mealsRouter);
app.get("/future-meals", (req, res) => {
  connection.query('SELECT * FROM meal WHERE `when` > currentDate', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/past-meals", (req, res) => {
  connection.query('SELECT * FROM meal WHERE `when` < currentDate', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/all-meals", (req, res) => {
  connection.query('SELECT * FROM meal', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/first-meal", (req, res) => {
  connection.query('SELECT * FROM meal LIMIT 1', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/last-meal", (req, res) => {
  connection.query('SELECT * FROM meal ORDER BY ID DESC LIMIT 1', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

 
module.exports = app; */