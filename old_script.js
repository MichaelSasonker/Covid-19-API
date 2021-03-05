

// async function MainFunction() {
    

const  proxy = 'https://api.codetabs.com/v1/proxy/?quest=';   
const covidURL = "https://corona-api.com/countries";
const countriesUrl = "https://restcountries.herokuapp.com/api/v1/";

// const CONTINENTS = {
//     Asia: [],
//     Europe: [],
//     Africa: [],
//     Oceania: [],
//     Americas: [],
//     Rest: [],
// }

let COVID_DATA = []


async function GetCovidData(url) {
    const respone = await fetch(url);
    const data = await respone.json();

    data.data.forEach(country => {
        COVID_DATA.push({
            [country.name]: country.name,
            [country.code]: country.code,
            ['latest_data']: country.latest_data,
            ['today']: country.today,
        })
    })
    // console.log('COVID DATA:');
    // console.log(COVID_DATA);
    return (COVID_DATA);
}

async function GetCountriesData(url) {
    const CONTINENTS = {
        Asia: [],
        Europe: [],
        Africa: [],
        Oceania: [],
        Americas: [],
        Rest: [],
    }
    const respone = await fetch(url);
    const data = await respone.json();

    data.forEach(country => {
        if (country.region === 'Europe') {
            CONTINENTS.Europe.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
        else if (country.region === 'Asia') {
            CONTINENTS.Asia.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
        else if (country.region === 'Africa') {
            CONTINENTS.Africa.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
        else if (country.region === 'Oceania') {
            CONTINENTS.Oceania.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
        else if (country.region === 'Americas') {
            CONTINENTS.Americas.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
        else {
            CONTINENTS.Rest.push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
                ['region']: country.region,
            });
        }
    });
    // console.log('The continents object:')
    // console.log(CONTINENTS)
    // const b = CONTINENTS;
    return CONTINENTS;
}
// console.log(CONTINENTS);

async function GetContinentCountries(CONTINENTS, continentName) {

    return await Promise.all(
        CONTINENTS[continentName].map(async country => {
            console.log(await country.name);
            return (await country.name);
        })
    )
} 

// async function GetContinentCountries(obj,continentName) {
//     console.log(await obj[continentName])
//     await obj[continentName].forEach(async country => {
//         console.log(await country.name)
//     });
// }


GetCovidData(covidURL);
const h = GetCountriesData(proxy + countriesUrl).then(res => {return res});
console.log(h)
// GetContinentCountries(h, 'Asia').then(res => {
//     console.log(res)});
// console.log(h);



// const ctx = document.getElementById('myChart');
//  const myChart = new Chart(ctx, {
//      type: 'bar',
//      data: {
//         //  labels: [h],
//          datasets: [
//              {
//                  label: '# of Votes',
//                  data: [COVID_DATA.name],
//                  backgroundColor: [
//                      'rgba(255, 99, 132, 0.2)',
//                      'rgba(54, 162, 235, 0.2)',
//                      'rgba(255, 206, 86, 0.2)',
//                      'rgba(75, 192, 192, 0.2)',
//                      'rgba(153, 102, 255, 0.2)',
//                      'rgba(255, 159, 64, 0.2)',
//                  ],
//                  borderColor: [
//                      'rgba(255, 99, 132, 1)',
//                      'rgba(54, 162, 235, 1)',
//                      'rgba(255, 206, 86, 1)',
//                      'rgba(75, 192, 192, 1)',
//                      'rgba(153, 102, 255, 1)',
//                      'rgba(255, 159, 64, 1)',
//                  ],
//                  borderWidth: 1,
//              },
//          ],
//      },
//      options: {
//          scales: {
//              yAxes: [
//                  {
//                      ticks: {
//                          beginAtZero: true,
//                      },
//                  },
//              ],
//             },
//         },
//     });

// }; MainFunction();