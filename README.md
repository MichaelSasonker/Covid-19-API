# Covid-19-API

## To Do List:
* [] About-corona API
* [] Restcountries API
* [] Chart.js library
* [] CORS
* [] Normalize file
* [] Local storage
---
## Links:
* [about-corona](https://about-corona.net/)
* [restcountries](https://github.com/hengkiardo/restcountries)
* [chart.js](https://www.chartjs.org/)
---
### How to use localStorage:
* Get the data object from the API
* Format it
    * let myObj_serialized = JSON.stringify(dataObj);
* Save it
    * localStorage.setItem("myObj", myObj_serialized);
* Get the data 
    * let myObj_deserialized = JSON.parse(localStorage.getItem("myObj"));
    ---
## Planning:
* Get the APIs
* Get the relevant countries (when continent btn is pressed).
* Display the relevant countries.
* Get relevant data from covid API.
* Set the data in Chart.js class.
* Display the relevant graph for specific information btn.
* Display the data of specific country.
