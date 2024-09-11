/**
 * @file recintos-zoo.js
 * @author Gabriel Finger Conte
 * @description Adaptado de https://dev.azure.com/db-tecnologia/_git/StartDB2024
 * Arquivo contendo a lógica para descrição dos diferentes recintos presentes no zoológico, 
 * bem como as regras para verificar os recintos disponíveis para acomodar um novo lote de animais.
 * Sendo a resolução para o desafio do processo seletivo de estágio da <DB>.
 */

// Importando as classes para gerenciamento e criação dos Lotes de Animais de outro módulo
import { LoteAnimal, FabricaLoteAnimais } from "./animais-zoo.js";

/**
 * Representa um recinto dentro do zoológico
 * @class
 */
class Recinto {
    /**
     * Cria uma instância de um recinto do zoológico
     * @constructor
     * @param {number} id - O número identificador do recinto
     * @param {Array<string>} biomas - A listas de biomas que descrevem o recinto
     * @param {number} tamanhoTotal - Tamanho máximo de espaços de acomodação de animais no recinto
     * @param {Array<LoteAnimal>} animaisPreExistentes - Lista de animais que já habitam o recinto 
     */
    constructor(id, biomas, tamanhoTotal, animaisPreExistentes) {
        this.id = id;
        this.biomas = biomas;
        this.tamanhoTotal = tamanhoTotal;
        this.tamanhoOcupado = 0; // Tamanho já ocupado dentro do recinto
        this.animaisExistentes = []; // Lista de lotes de animais abrigados no recinto
        this.listaEspecies = new Set(); // Lista de espécies de animais no recinto
        this.flagContemCarnivoros = false; // Indicador da permanência de animais carnívoros no recinto

        // Coloca os animais no recinto
        if (animaisPreExistentes !== undefined) {
            animaisPreExistentes.forEach(lote => {
                this.adicionaLoteAnimais(lote);
            });
        }
    }

    /**
     * Adiciona um lote de animais no recinto, caso seja possível, e atualizando as informações sobre o recinto.
     * @param {LoteAnimal} loteAnimais - O lote de animais que se deseja abrigar no recinto 
     */
    adicionaLoteAnimais(loteAnimais) {
        if (this.consegueAcomodarLote(loteAnimais)) {
            if (loteAnimais.isCarnivoro()) {
                this.flagContemCarnivoros = true;
            }
            this.listaEspecies.add(loteAnimais.especie);
            this.animaisExistentes.push(loteAnimais);
            this.tamanhoOcupado += loteAnimais.tamanhoLote;
        }
    }

    /**
     * Verifica no recinto se existem animais de espécies diferentes da analisada
     * @param {string} especie - Espécie do lote de animais que se deseja incluir 
     * @returns {boolean}
     */
    temOutrasEspecies(especie) {
        return (this.listaEspecies.size > 1 || (this.listaEspecies.size === 1 && !this.listaEspecies.has(especie)));
    }

    /**
     * Verifica o espaço disponível no recinto para acomodar novos animais, considerando que se houverem animais
     * de espécies diferentes um espaço extra é consumido.
     * @param {string} especie - Espécie dos animais no lote que se deseja incluir
     * @returns {number} - O número de espaços restantes no recinto
     */
    getEspacoDisponivel(especie) {
        let espacoRestante = this.tamanhoTotal - this.tamanhoOcupado;
        // Se o recinto ficará com animais de diferentes espécies, consome-se um espaço extra
        if (this.temOutrasEspecies(especie)) {
            return espacoRestante - 1;
        }
        return espacoRestante;
    }

    /**
     * Verifica se o recinto consegue acomodar o novo lote de animais, segundo as regras do zoológico.
     * @param {LoteAnimal} loteAnimais - O lote de animais a ser adicionado no recinto
     * @returns {boolean}
     */
    consegueAcomodarLote(loteAnimais) {
        if (!loteAnimais.estaConfortavel(this)) {
            return false;
        }

        // Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
        if (this.listaEspecies.has("HIPOPOTAMO") && loteAnimais.especie != "HIPOPOTAMO") {
            if (!this.biomas.includes("rio") || !this.biomas.includes("savana")) {
                return false;
            }
        }

        // Animais carnívoros devem habitar somente com a própria espécie
        if ((this.flagContemCarnivoros && !this.listaEspecies.has(loteAnimais.especie)) ||
            (loteAnimais.isCarnivoro() && !this.flagContemCarnivoros && this.listaEspecies.size > 0)) {
            return false;
        }

        return true;
    }

}

/**
 * Representa o zoológico e os recintos dentro dele
 * @class
 */
class RecintosZoo {

    /**
     * Cria uma instância de um zoológico, inicializando suas propriedades.
     * @constructor
     */
    constructor() {
        this.listaRecintos = [];
        this.inicializaRecintos();
    }

    /**
     * Inicializa a lista de recintos, considerando as informações do README do desafio
     */
    inicializaRecintos() {
        this.listaRecintos.push(new Recinto(1, ["savana"], 10,
            [FabricaLoteAnimais.geraLote("MACACO", 3)]
        ));
        this.listaRecintos.push(new Recinto(2, ["floresta"], 5));
        this.listaRecintos.push(new Recinto(3, ["savana", "rio"], 7,
            [FabricaLoteAnimais.geraLote("GAZELA", 1)]
        ));
        this.listaRecintos.push(new Recinto(4, ["rio"], 8));
        this.listaRecintos.push(new Recinto(5, ["savana"], 9,
            [FabricaLoteAnimais.geraLote("LEAO", 1)]
        ));
    }


    /**
     * Monta uma mensagem de erro, contendo a causa do erro, para retornar ao usuário.
     * @param {string} causa - Mensagem explicando o motivo do erro 
     * @returns {Object} - Objeto contendo a mensagem de erro
     */
    geraSaidaErro(causa) {
        let mensagemErro = {
            erro: causa
        };
        return mensagemErro;
    }

    /**
     * Monta a mensagem de resposta para o usuário, informando os recintos viáveis encontrados para acomodar
     * o novo lote de animais.
     * @param {Array<{ recinto: Recinto, espacoLivre: number }>} listaRecintosViaveis - Lista dos recintos 
     * viáveis e a quantidade de espaço livre em cada um
     * @returns {Object} - Objeto com uma lista de mensagens de recintos viáveis
     */
    geraSaidaEsperada(listaRecintosViaveis) {
        let mensagem = {
            recintosViaveis: []
        };

        listaRecintosViaveis.forEach(opcao => {
            let novoRecinto = "";
            novoRecinto += "Recinto " + opcao.recinto.id;
            novoRecinto += " (espaço livre: " + opcao.espacoLivre;
            novoRecinto += " total: " + opcao.recinto.tamanhoTotal;
            novoRecinto += ")";
            mensagem.recintosViaveis.push(novoRecinto);
        });

        return mensagem;
    }

    /**
     * Verifica se existem recintos no zoológico que conseguem abrigar o novo lote de animais
     * @param {string} animal - O nome da espécie dos animais do novo lote 
     * @param {number} quantidade - A quantidade de animais dentro do novo lote
     * @returns {Object} - Lista dos recintos viáveis para o novo lote de animais ou uma
     * mensagem de erro explicando se não é viável ou foram inseridos dados inválidos.
     */
    analisaRecintos(animal, quantidade) {

        let novoLote = FabricaLoteAnimais.geraLote(animal, quantidade);
        let recintosViaveis = [];

        if (typeof (novoLote) == "string") {
            return (this.geraSaidaErro(novoLote));
        }

        this.listaRecintos.forEach(recinto => {
            if (recinto.consegueAcomodarLote(novoLote)) {
                let espacoDisponivel = recinto.getEspacoDisponivel(animal);
                recintosViaveis.push({
                    recinto: recinto,
                    espacoLivre: (espacoDisponivel - novoLote.tamanhoLote)
                });
            }
        });

        if (recintosViaveis.length > 0) {
            return (this.geraSaidaEsperada(recintosViaveis));
        } else {
            return (this.geraSaidaErro("Não há recinto viável"));
        }

    }

}

export { RecintosZoo as RecintosZoo };