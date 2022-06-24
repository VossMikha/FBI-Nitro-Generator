// Created by user 001#0001
// License - MIT | MIT License
//
// https://github.com/user001js/FBI-Nitro-Generator/blob/index/LICENSE
//
// MIT License
//
// Copyright (c) 2022 user 001
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import chalk from "chalk";
import clear from "clear";
import axios from "axios";
import figlet from "figlet";
import inquirer from "inquirer";
import fs from "fs";
import { resolveTxt } from "dns";

function printLogo() {
  console.log(
    chalk.red(
      figlet.textSync('FBI Nitro Generator') // 00 14 18 28 36 36 26 16 12 00
    )
  );
}

clear();
printLogo()

const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'mode',
    message: 'Opção:',
    choices: [ 'Gerar códigos com verificador - lento', 'Gerar códigos sem verificador - rápido' ],
    default: 'Gerar códigos com verificador - lento'
  },
  {
    type: 'input',
    name: 'amount',
    default: 1,
    message: 'Insira a quantidade de códigos que você deseja gerar: '
  },
  {
    type: 'input',
    name: 'filename',
    default: 'códigos_válidos.txt',
    message: 'Salvar códigos válidos para:'
  }
]);

// user 001#0001

async function GenerateRandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// FBI FIVE-0

async function CheckCode(code, proxy = null) {
  try {
    if (proxy != null) {
      const response = await axios.get(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {
        proxy: {
          protocol: 'http',
          host: proxy.split(':')[0],
          port: proxy.split(':')[1]
        }
      })
      if (response.status == 200) return true
      else return false
    } else {
      const response = await axios.get(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`)
      if (response.status == 200) return true
      else return false
    }
  } catch (err) {
      return false
  }
}

// user 001#0001

async function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
// gera códigos on-line - mais lento devido ao verificador, que verifica se o código é válido
if (answers.mode == "Gerar códigos com verificador - lento") {
  const proxy = await inquirer.prompt([
    {
      type: 'list',
      name: 'proxy',
      message: 'Você deseja usar proxies? Escolha uma opção:',
      choices: [ 'Sim', 'Não' ],
      default: 'Não' // não estou acostumado a usar proxies, então recomendo que não as use
    }
  ]) // se escolher sim
  if (proxy.proxy == "Sim") {
    const arquivo_proxy = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Nome do arquivo das proxies:',
        default: 'proxy.txt'
      }
    ])
    clear();
    printLogo()
    console.log(`Raspando as proxies...`) // raspa as proxies que você colocou em "proxy.txt"
    let variavel_proxy = fs.readFileSync(arquivo_proxy.name).toString().split("\n");

// FBI FIVE-0

    let status = {"valid": 0, "invalid": 0} // mostra quantos códigos válidos e inválidos foram gerados 
    let codigosValidos = []
    for (let i = 0; i <= answers.amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      clear();
      printLogo()
      console.log(`Quantidade de códigos gerados: ${status.valid + status.invalid} | Código(s) válido(s): ${status.valid} - Código(s) inválido(s): ${status.invalid}`)
      const code = await GenerateRandomString(16)
      console.log(`Checando: https://discord.gift/${code}`) // checa se os códigos são válidos
      if (await CheckCode(code, variavel_proxy[await getRandomInt(0, variavel_proxy.length)])) {
        status.valid++
        codigosValidos.push(code)
      } else status.invalid++
    }
    clear();
    printLogo()
    if (status.valid > 0) {
      console.log(`${status.valid} código(s) válido(s) foi/foram gerado(s)`)
      console.log(`Salvando os códigos no arquivo \"códigos_válidos.txt\"...`)
      let file = fs.createWriteStream(answers.filename);
      codigosValidos.forEach(function(v) { file.write(v + '\n'); });
      file.end();
    } else {
      console.log(`0 código(s) válido(s) foi/foram gerado(s)`)
    }
  } else {
    let status = {"valid": 0, "invalid": 0}
    let codigosValidos = []
    for (let i = 0; i <= answers.amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      clear();
      printLogo()
      console.log(`Quantidade de código(s) gerado(s): ${status.valid + status.invalid} | Código(s) válido(s): ${status.valid} - Código(s) inválido(s): ${status.invalid}`)
      const code = await GenerateRandomString(16)
      console.log(`Verificando: https://discord.gift/${code}`) // verificando se o código é válido ou não
      if (await CheckCode(code)) {
        status.valid++
        codigosValidos.push(`https://discord.gift/${code}`)
      } else status.invalid++
    }
    clear();
    printLogo()
    if (status.valid > 0) {
      console.log(`${status.valid} códigos válidos gerados`)
      console.log(`Salvando o(s) código(s) no arquivo \"códigos_válidos.txt\"...`)
      let file = fs.createWriteStream(answers.filename);
      codigosValidos.forEach(function(v) { file.write(v + '\n'); });
      file.end();
    } else {
      console.log(`0 código(s) válido(s) foi/foram gerado(s)`) // 0 códigos gerados
    }
  }
} else if (answers.mode == "Gerar códigos sem verificador - rápido") {
  let Codigos = []
  for (let i = 0; i <= answers.amount; i++) {
    clear();
    printLogo()
    console.log(`Códigos gerados: ${Codigos.length}`) // após gerar os códigos ele mostrará a quantidade de códigos que foram gerados
    Codigos.push(`https://discord.gift/${await GenerateRandomString(16)}`)
  }
  clear();
  printLogo()
  console.log(`Salvando no arquivo...`); // salvando os códigos gerados (off-line) no "códigos_válidos.txt"
  let file = fs.createWriteStream(answers.filename);
  Codigos.forEach(function(v) { file.write(v + '\n'); });
  file.end();
}

// Criado por user 001#0001
// Não recomendo nenhuma alteração do código, caso você altere algo, você não terá mais direito ao suporte no FBI.
//
// MIT License
//
// Copyright (c) 2022 user 001
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// https://github.com/user001js/FBI-Nitro-Generator/blob/index/LICENSE
