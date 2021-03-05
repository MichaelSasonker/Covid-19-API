const PROXY = 'https://api.codetabs.com/v1/proxy/?quest=';
const COVID_URL = "https://corona-api.com/countries";
const COUNTRIES_URL = "https://restcountries.herokuapp.com/api/v1/";

const body = document.body;
const mainCont = document.querySelector('.main-cont');
const mainSec = document.querySelector('.main-sec');
const ctx = mainSec.querySelector('#myChart');
const footerSec = document.querySelector('.footer-sec');
const continentBtnCont = footerSec.querySelector('.continent-btn-cont');
const continentBtns = continentBtnCont.querySelectorAll('.btn');
console.log(continentBtns)
const dataBtnCont = footerSec.querySelector('.data-btn-cont');
const dataBtns = dataBtnCont.querySelectorAll('.data-btn');
console.log(dataBtns)
const countriesCont = document.querySelector('.countries-cont')


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
                // ['region']: country.region,
            });
        }
    });

    console.log('Countries DATA:');
    console.log(CONTINENTS);
    return CONTINENTS;
}

async function GetCovidData(url) {
    let COVID_DATA = []
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
    console.log('COVID DATA:');
    console.log(COVID_DATA);
    return (COVID_DATA);
}

async function MainFunction() {
    'use strict';



    const a = await GetCountriesData(PROXY + COUNTRIES_URL, 'Europe');
    console.log(a);
    const b = await GetCovidData(COVID_URL);
    console.log(b);




}; MainFunction();

