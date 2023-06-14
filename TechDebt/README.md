# TechDebt

## Instruções detalhadas

De modo resumido, para instalar corretamente o projeto é necessário ter o Node.js.

O usuário deve abrir o terminal dentro da pasta TechDebt do projeto e digitar o comando npm install.

Após o comando ser digitado, o usuário deve esperar a conclusão do mesmo para então digitar o comando: ng serve -o. 

Uma aba no navegador irá se abrir e em outro terminal dentro da mesma pasta o comando json-server --watch db.json deve ser digitado.

## Passo a passo

1. Para instalar as dependências:
  .É preciso ter o Node.js instalado (https://nodejs.org/en/download)
  .Abra o terminal na pasta TechDebt (/TechDebt)
  .Execute: npm-install (deve instalar automaticamente o Angular Material e a última versão do Angular)

2. Para executar o projeto:
  .Abra o terminal na pasta TechDebt (/TechDebt)
  .Digite: ng serve -o
  .Abra outro terminal na mesma pasta (/TechDebt)
  .Digite: json-server --watch db.json
