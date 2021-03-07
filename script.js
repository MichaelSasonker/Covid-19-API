/*---------------------------------------------------------------------------*/
const PROXY = 'https://api.codetabs.com/v1/proxy/?quest=';
const COVID_URL = "https://corona-api.com/countries";
const COUNTRIES_URL = "https://restcountries.herokuapp.com/api/v1/";

/*---------------------------------------------------------------------------*/
const body = document.body;
const mainCont = document.querySelector('.main-cont');
const headerCont = mainCont.querySelector('.head')
const mainSec = document.querySelector('.main-sec');
const ctx = mainSec.querySelector('#myChart');
const footerSec = document.querySelector('.footer-sec');
const continentBtnCont = footerSec.querySelector('.continent-btn-cont');
const continentBtns = continentBtnCont.querySelectorAll('.btn');
const dataBtnCont = footerSec.querySelector('.data-btn-cont');
const dataBtns = dataBtnCont.querySelectorAll('.data-btn');
const countriesCont = document.querySelector('.countries-cont');
const listCont = countriesCont.querySelector('.list-cont');
let newDiv = document.createElement('div');
let box1 = document.createElement('div');
let box2 = document.createElement('div');
let box3 = document.createElement('div');
let box4 = document.createElement('div');
box1.classList.add('box');
box2.classList.add('box');
box3.classList.add('box');
box4.classList.add('box');

/*---------------------------------------------------------------------------*/
async function GetCountriesData(url, continent) {
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
        if (country.region === continent) {
            CONTINENTS[continent].push({
                ['name']: country.name.common,
                ['cca2']: country.cca2,
            });
        }
    });

    return (CONTINENTS);
}

/*---------------------------------------------------------------------------*/
async function GetCovidData(url) {
    let COVID_DATA = []
    const respone = await fetch(url);
    const data = await respone.json();

    data.data.forEach(country => {
        COVID_DATA.push({
            ['name']: country.name,
            ['code']: country.code,
            ['latest_data']: country.latest_data,
            ['today']: country.today,
        })
    });

    return (COVID_DATA);
}

/*---------------------------------------------------------------------------*/
function AddEventListenerToContinentBts(list) {
    list.forEach(node => {
        node.addEventListener('click', ButtonClicked);
    });
}

/*---------------------------------------------------------------------------*/
async function ButtonClicked(e) {

    let countriesArr = [];
    headerCont.classList.add('display-none');
    dataBtns.forEach(btn => {btn.classList.remove('display-none')});

    let continentName = e.currentTarget.getAttribute('data-attr');
    const countriesResult = await GetCountriesData(PROXY + COUNTRIES_URL, continentName)
    const covidResult = await GetCovidData(COVID_URL);
    
    countriesArr = countriesResult[continentName].map((countryObj) => (countryObj.name));
    // console.log(countriesArr);

    let continentCovidRes = covidResult.filter((countryDataObj) => (countriesArr.includes(countryDataObj.name)));
    // console.log(continentCovidRes);

    listCont.innerHTML = '';
    countriesArr.forEach(country => {
        listCont.innerHTML += `
            <li class='li-style' data-attr='${country}'>${country}</li>
        `;
    });

    let latestDataArr = continentCovidRes
        .map((countryDataObj) => countryDataObj.latest_data)        
    // console.log(latestDataArr);

    let defualtsDataArr = latestDataArr
        .map(obj => obj.deaths);
    // console.log(defualtsDataArr)

    AddChartGraph(countriesArr, 'deaths', defualtsDataArr);

    dataBtns.forEach(node => {
        node.addEventListener('click', function(event) {
            let infoType = event.currentTarget.getAttribute('data-attr');
            let relevantDataArr = latestDataArr.map(obj => obj[infoType])
            AddChartGraph(countriesArr, infoType, relevantDataArr);
        });
    });

    let listNodeList = listCont.querySelectorAll('.li-style');
    // console.log(listNodeList);

    function CountryClicked(event) {

        newDiv.classList.add('country-info');
        mainSec.replaceChild(newDiv, ctx);

        let oneCountryData = continentCovidRes
            .filter(countryObj => 
                (countryObj.name === event.currentTarget.getAttribute('data-attr')));

        let boxData = oneCountryData[0].latest_data;
        box1.innerHTML = `Confirmed Cases:</br>${boxData.confirmed}</br>`;
        box2.innerHTML = `Critical Cases:</br>${boxData.critical}</br>`;
        box3.innerHTML = `Deaths Cases:</br>${boxData.deaths}</br>`;
        box4.innerHTML = `Recovered Cases:</br>${boxData.recovered}</br>`;

        newDiv.appendChild(box1);
        newDiv.appendChild(box2);
        newDiv.appendChild(box3);
        newDiv.appendChild(box4);
        // event.parent.removeEventListener('click', CountryClicked);

    }

    listNodeList.forEach(li => {
        li.addEventListener('click', CountryClicked);
    });

}

/*---------------------------------------------------------------------------*/
function AddChartGraph(cntryArr, dataType, dataValArr) {
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: cntryArr,
            datasets: [
                {
                    label: `${dataType}`,
                    backgroundColor: "#091973",
                    borderColor: "#000",
                    pointBackgroundColor: "#000",
                    borderWidth: "1",
                    data: dataValArr,
                },
            ],
        },
        options: {
            legend: {
                labels: {
                    fontColor: "#000",
                },
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            fontSize: '16',
                            fontColor: '#000',
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            fontSize: '18',
                            fontColor: '#000',
                        },
                    },
                ],
            },
            
        },
    });
    
}


/*---------------------------------------------------------------------------*/
async function MainFunction() {
    'use strict';
    
    dataBtns.forEach(btn => {btn.classList.add('display-none')});

    AddEventListenerToContinentBts(continentBtns);

}; MainFunction();

