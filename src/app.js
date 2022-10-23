const courseDisplay = document.querySelector("#course");
const baseURL = "http://codedamn.com";

fetch("http://localhost:8000/courses")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((course) => {
      const title = `
      <div>
            <h5><a href="` + course.url + `" target="_blank">` + course.title + `</a></h5>
        </div>
        
        <br>`;
      courseDisplay.insertAdjacentHTML("beforeend", title);
    });
  });
