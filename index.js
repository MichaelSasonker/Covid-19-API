



const proxy = 'https://api.codetabs.com/v1/proxy/?quest=';   
const covidURL = "https://corona-api.com/countries";
const countriesUrl = "https://restcountries.herokuapp.com/api/v1/";

const CONTINENTS = {
    Asia: [],
    Europe: [],
    Africa: [],
    Oceania: [],
    Americas: [],
    Rest: [],
}



let COVID_DATA = []



async function GetCovidData(url) {
    const respone = await fetch(url);
    const data = await respone.json();
    
    data.data.forEach(async country => {
        COVID_DATA.push({[country.name] : country.name,
        [country.code] : country.code,
        ['latest_data'] : country.latest_data,})
    })
    console.log('COVID DATA:');
    console.log(COVID_DATA[0]);
    return COVID_DATA;
}

async function GetCountriesData(url) {
    const respone = await fetch(url);
    const data = await respone.json();
    data.forEach(async country => {
        if (country.region === 'Europe') {
            CONTINENTS.Europe.push(country);
        }
        else if (country.region === 'Asia') {
            CONTINENTS.Asia.push(country);
        }
        else if (country.region === 'Africa') {
            CONTINENTS.Africa.push(country);
        }
        else if (country.region === 'Oceania') {
            CONTINENTS.Oceania.push(country);
        }
        else if (country.region === 'Americas') {
            CONTINENTS.Americas.push(country);
        }
        else {
            CONTINENTS.Rest.push(country);
        }
    });
    console.log('The continents object:')
    console.log(CONTINENTS);

    console.log(CONTINENTS.Asia[0].name.common)

    return CONTINENTS;
}

GetCovidData(covidURL);
GetCountriesData(proxy + countriesUrl);



const ctx = document.getElementById('myChart');
 const myChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: [CONTINENTS.Asia],
         datasets: [
             {
                 label: '# of Votes',
                 data: [COVID_DATA.name],
                 backgroundColor: [
                     'rgba(255, 99, 132, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba(75, 192, 192, 0.2)',
                     'rgba(153, 102, 255, 0.2)',
                     'rgba(255, 159, 64, 0.2)',
                 ],
                 borderColor: [
                     'rgba(255, 99, 132, 1)',
                     'rgba(54, 162, 235, 1)',
                     'rgba(255, 206, 86, 1)',
                     'rgba(75, 192, 192, 1)',
                     'rgba(153, 102, 255, 1)',
                     'rgba(255, 159, 64, 1)',
                 ],
                 borderWidth: 1,
             },
         ],
     },
     options: {
         scales: {
             yAxes: [
                 {
                     ticks: {
                         beginAtZero: true,
                     },
                 },
             ],
            },
        },
    });
