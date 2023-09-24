const fs = require("fs");
const puppeteer = require('puppeteer');


(async function scraperJog() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://fbref.com/pt/comps/24/cronograma/Serie-A-Resultados-e-Calendarios');

    //MUDE A RODADA AQUI
    var rodada = '20';

    const data = await page.evaluate(function () {
        //PODE USAR JAVASCRIPT PARA PEGAR ELEMENTOS DA PÁGINA
        //const tabela = document.querySelectorAll('.Jzru1c tr');
        //const times = [];



        /*percorre a tabela
        for (let i = 1; i < 21; i++) {

            var ultimosResultados = [];
            var divResultados = [];

            divResultados = tabela[i].querySelectorAll('.XqaACe');

            for (let j = 0; j < divResultados.length; j++) {
                resultado = divResultados[j].getAttribute('aria-labelledby');
                resultado = resultado.charAt(resultado.length - 1);
                ultimosResultados.push(resultado)
            }

            times.push({
                nome: tabela[i].getAttribute("aria-label"),
                posicao: tabela[i].querySelector('div .iU5t0d').innerHTML,
                ultimosResultados: ultimosResultados

            });
        }
        return times;
        */



    });

    /*
    const json = JSON.stringify(data);
    fs.writeFile('/front-palpiteiro/web-scraping/jsonData/times.json', json, err => {
        if (err) {
            console.error(err);
        }
        console.log("salvo");

    });
    */

})();

