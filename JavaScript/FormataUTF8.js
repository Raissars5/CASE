const fs = require('fs');
const path = require('path');

// Troca de strings

var doc1 =  JSON.stringify(require('./broken_database_1.json'));// O documento da variável é retornado e armazenado na variável "doc1". Converte em uma string JSON válida

const broken01 = substituiçãoVariaveis (doc1, "ø","o");
const brokenFormatando1 = substituiçãoVariaveis (broken01, "æ", "a");

var doc2 = JSON.stringify(require('./broken_database_2.json'));
const brokenFormatando2 = substituiçãoVariaveis (doc2 , "ø", "o");
const formatado2 = substituiçãoVariaveis (brokenFormatando2, "æ", "a");

// Substituição dos Números

const formatado1 = JSON.parse(brokenFormatando1);//Convertendo string JSON para um ojeto JavaScript

let qtdTotal = 0;
let qtdNumber = 0;

formatado1.forEach(function(infoProduto){
    qtdTotal = qtdTotal + 1;
    if(typeof infoProduto.vendas === 'string'){
        infoProduto.vendas = Number(infoProduto.vendas);
    }
}); //Percorre os elementos do array, contando o número total dos elementos e convertendo a propriedade vendas de string para número quando necessário

console.log(`O banco de dados contém informações sobre ${qtdTotal} tipos diferentes de vendas.`);

formatado1.forEach(function(infoProduto){
    if(typeof infoProduto.vendas === 'string'){
        console.log('Identificamos vendas representadas como texto, é necessário corrigi-las para o formato numérico.');
        throw new Error('A conversão de todas as vendas representadas como texto para o formato numérico não foi realizada corretamente.');
    }else if(typeof infoProduto.vendas === 'number'){
        qtdNumber++;
    }
});

console.log(`Número de vendas após conversão: ${qtdNumber}`);

escreveArquivo("formatado1.json", formatado1);
escreveArquivo("formatado2.json", JSON.parse(formatado2));



function substituiçãoVariaveis (mystring, find, novo){
    var regex = new RegExp
    (find,"g");
    return mystring.replace(regex, novo);
}

function escreveArquivo(nomeArquivo, conteudoJSON)
{
    //Caminho que deseja criar o arquivo
    const diretorio = process.cwd();

    //Caminho completo do arquivo
    const caminhoCompleto =
    path.join (diretorio,nomeArquivo)


    // Convertendo o objeto para formato JSON
    const jsonParaSalvar = JSON.stringify(conteudoJSON, null, 4); // O terceiro parâmetro, indica a quantidade de espaços de indentação.

    // Escrevendo no arquivo
    fs.writeFile(caminhoCompleto, jsonParaSalvar, 'utf8', (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            
        } else {
            console.log(`Arquivo "${nomeArquivo}" salvo com sucesso em "${diretorio}"`);
        }
        });

}


