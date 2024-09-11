# Desafio Recintos do Zoológico

## Descrição
Este projeto foi desenvolvido como parte de um desafio para a organização de um zoológico. O objetivo é construir a lógica para indicar os recintos onde novos animais se sentirão confortáveis, levando em consideração regras específicas para cada tipo de animal e recinto.

Além disso, esse projeto faz parte do processo seletivo do programa de estágio da [DB](https://db.tec.br/), onde a descrição original do desafio se encontra no arquivo [README-ORIGINAL.md](README-ORIGINAL.md)

## Estrutura do Projeto

- **`src/recintos-zoo.js`**: Arquivo principal onde a lógica do desafio foi implementada.
- **`src/recintos-zoo.js`**: Arquivo secundário onde estruturou-se a lógica para representar os lotes de animais.
- **`src/recintos-zoo.test.js`**: Arquivo de testes para validar a solução. Utilize o Jest para executar os testes.
- **`package.json`**: Gerencia as dependências do projeto e scripts de execução.

## Instruções para Rodar o Projeto

1. Instale o [Node.js](https://nodejs.org/en/).
2. Clone o repositório:
   ```bash
   git clone https://github.com/Gabriel-FC-Comp/desafio-Gabriel-FC-Comp-2024
   ```
3. Navegue para o diretório do projeto:
   ```bash
   cd desafio-Gabriel-FC-Comp-2024
   ```
4. Instale as dependências:
   ```bash
   npm install
   ```
5. Para rodar os testes e validar sua solução, execute:
   ```bash
   npm test
   ```

## Como Usar

Para utilizar a função analisaRecintos, crie uma instância da classe RecintosZoo e chame o método analisaRecintos com o tipo e quantidade de animal. Exemplo:

   ```bash
   import { RecintosZoo } from './src/recintos-zoo';
   
   const zoo = new RecintosZoo();
   const resultado = zoo.analisaRecintos('MACACO', 2);
   console.log(resultado);
   ```
## Contribuição e Contato

Para qualquer dúvida ou contribuição, entre em contato através do [LinkedIn](https://www.linkedin.com/in/gabriel-finger-conte/) ou [GitHub](https://github.com/Gabriel-FC-Comp/).
