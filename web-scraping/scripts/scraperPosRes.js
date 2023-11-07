const fs = require("fs");
const puppeteer = require('puppeteer');

(async function scraperTabelaGoogle() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/search?q=classificacao+brasileirao&sca_esv=556563504&rlz=1C1ONGR_pt-PTBR1066BR1066&sxsrf=AB5stBhwYOJiu23rdYj9b3sPgim-aPuqOw%3A1691951548361&ei=vCHZZNDaFamd5OUPtryu2AE&ved=0ahUKEwjQqJHYotqAAxWpDrkGHTaeCxsQ4dUDCBA&uact=5&oq=classificacao+brasileirao&gs_lp=Egxnd3Mtd2l6LXNlcnAiGWNsYXNzaWZpY2FjYW8gYnJhc2lsZWlyYW8yBBAAGAMyBBAAGAMyBBAAGAMyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESOxBUOAaWNY_cAN4AZABAJgBqgGgAfsZqgEEMC4yNbgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgcQIxiKBRgnwgIEECMYJ8ICCxAuGIAEGLEDGIMBwgILEAAYgAQYsQMYgwHCAgsQABiKBRixAxiDAcICDRAAGIoFGLEDGIMBGEPCAhEQLhiABBixAxiDARjHARjRA8ICEBAuGIoFGLEDGMcBGNEDGEPCAgcQABiKBRhDwgIKEAAYigUYsQMYQ8ICCBAAGIAEGLED4gMEGAAgQYgGAZAGCA&sclient=gws-wiz-serp#sie=lg;/g/11jspy1hvm;2;/m/0fnk7q;st;fp;1;;;');

    const data = await page.evaluate(function () {
        //PODE USAR JAVASCRIPT PARA PEGAR ELEMENTOS DA PÁGINA
        const tabela = document.querySelectorAll('.Jzru1c tr');
        const times = [];

        //percorre a tabela
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
    });

    console.log(data);


    const json = JSON.stringify(data);
    fs.writeFile('/front-palpiteiro/web-scraping/data/times.json', json, err => {
        if (err) {
            console.error(err);
        }
        console.log("salvo");

    });


})();

