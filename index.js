const express = require("express");
const app = express()
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const mockServerController = require("./controller").mockServerController;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    next();
  });
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("Hello World ");
});

app.post("/mockApi/fetchrotueresponse", mockServerController.getRouteResponse);
app.post("/mockApi/create", mockServerController.createRoute);
app.get("/mockApi/fetchallrotues", mockServerController.fetchAllRoutes)
app.listen(process.env.PORT || 3306, () => {
    console.log(`Server is running on 3306.`);
});