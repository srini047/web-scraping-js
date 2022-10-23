const PORT = 8000;
const baseURL = "http://codedamn.com";
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require('cors')
const app = express();
app.use(cors())

const url = "https://codedamn.com/courses";

app.get("/", function (req, res) {
  res.json({ message : "Web Scrapping Codedamn Courses" });
});

app.get("/courses", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const courses = [];

      $(".relative", html).each(function () {
        const title = $(this).find("h2").text();
        const url = baseURL + $(this).find("a").attr("href");

        courses.push({
          title,
          url,
        });
      });
      res.json(courses);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
