/**
 * @file animais-zoo.js
 * @author Gabriel Finger Conte
 * @description Arquivo contendo a lógica para descrição dos diferentes animais que o zoológico
 * abriga, bem como as regras para verificar se o mesmo pode ser colocado em um recinto.
 */

/**
 * Representa um lote de animais segundo os padrões do zoológico
 * @class
 */
export class LoteAnimal {
    /**
     * Cria uma instância de um lote de animais segundo os padrões do zoológico.
     * @constructor
     * @param {string} especie - A espécie dos animais do lote.
     * @param {number} tamanho - O tamanho que um animal da espécie ocupa em um recinto do zoológico.
     * @param {Array<string>} biomas - Os biomas que a espécie dos animais se adapta.
     * @param {number} qtdeLote - A quantidade de animais no lote.
     */
    constructor(especie, tamanho, biomas, qtdeLote) {
        this.especie = especie;
        this.tamanho = tamanho;
        this.biomas = biomas;
        this.qtdeLote = qtdeLote;
    }

    /**
     * Indica se o animal é ou não carnívoro (por padrão não)
     * @returns {boolean}
     */
    isCarnivoro() {
        return false;
    }

    /**
     * Verifica se o lote de animais se sente confortável para fazer parte do recinto. Para isso,
     * o método verifica se o bioma do recinto é adequado e se há espaço suficiente para o lote.
     * @param {Recinto} recinto - o recinto que se deseja verificar
     * @returns {boolean}
     */
    estaConfortavel(recinto) {
        let espacoDisponivel = recinto.getEspacoDisponivel(this.especie);
        if (this.verificaBiomaAdequado(recinto.biomas) &&
            this.verificaEspacoSuficente(espacoDisponivel)) {
            return true;
        }
        return false;
    }

    /**
     * Verifica se o bioma do recinto analisado é adequado para a espécie dos animais no lote
     * @param {Array<string>} biomasRecinto - Uma lista com os biomas do recinto 
     * @returns {boolean}
     */
    verificaBiomaAdequado(biomasRecinto) {
        for (let i = 0; i < this.biomas.length; i++) {
            if (biomasRecinto.includes(this.biomas[i])) {
                return true;
            }
        };
        return false;
    }

    /**
     * Verifica se o espaço disponível no recinto analisado é adequado para a espécie dos animais no lote
     * @param {number} espacoDisponivel - Valor representativo do espaço disponível no recinto analisado 
     * @returns {boolean}
     */
    verificaEspacoSuficente(espacoDisponivel) {
        return (espacoDisponivel >= (this.qtdeLote * this.tamanho))
    }

    /** 
     * Obtém o espaço que o lote necessita em um recinto
     * @returns {number}
    */
    get tamanhoLote() {
        return this.tamanho * this.qtdeLote;
    }

}

/**
 * Representa um lote de animais carnívoros segundo os padrões do zoológico
 * @class
 * @extends LoteAnimal
 */
export class LoteAnimalCarnivoro extends LoteAnimal {
    /**
     * Indica que o animal é carnívoro
     * @override
     * @returns {boolean}
     */
    isCarnivoro() {
        return true;
    }
}

/**
 * Classe derivada representando um Leão
 * @class
 * @extends LoteAnimalCarnivoro
 */
export class Leao extends LoteAnimalCarnivoro {

    /**
     * Cria uma instância de um lote de Leões
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("LEAO", 3, ["savana"], qtdeLote);
    }
}

/**
 * Classe derivada representando um Leopardo
 * @class
 * @extends LoteAnimalCarnivoro
 */
export class Leopardo extends LoteAnimalCarnivoro {

    /**
     * Cria uma instância de um lote de Leopardos
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("LEOPARDO", 2, ["savana"], qtdeLote);
    }
}

/**
 * Classe derivada representando um Crocodilo
 * @class
 * @extends LoteAnimalCarnivoro
 */
export class Crocodilo extends LoteAnimalCarnivoro {
    /**
     * Cria uma instância de um lote de Crocodilos
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("CROCODILO", 3, ["rio"], qtdeLote);
    }
}

/**
 * Classe derivada representando um Macaco
 * @class
 * @extends LoteAnimal
 */
export class Macaco extends LoteAnimal {
    /**
     * Cria uma instância de um lote de Macacos
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("MACACO", 1, ["savana", "floresta"], qtdeLote);
    }

    /**
     * Verifica se o lote de animais se sente confortável para fazer parte do recinto,
     * considerando que um macaco não se sente confortável sem outro animal no recinto, 
     * seja da mesma ou outra espécie
     * @override
     * @param {Recinto} recinto - o recinto que se deseja verificar
     * @returns {boolean}
     */
    estaConfortavel(recinto) {
        let espacoDisponivel = recinto.getEspacoDisponivel(this.especie);
        if (this.verificaBiomaAdequado(recinto.biomas) &&
            this.verificaEspacoSuficente(espacoDisponivel)) {
            // Se o macaco estiver sozinho, tem que haver pelo menos um animal no recinto
            if (this.qtdeLote == 1 && espacoDisponivel == recinto.tamanhoTotal) {
                return false;
            }

            return true;
        }
        return false;
    }
}

/**
 * Classe derivada representando uma Gazela
 * @class
 * @extends LoteAnimal
 */
export class Gazela extends LoteAnimal {
    /**
     * Cria uma instância de um lote de Gazelas
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("GAZELA", 2, ["savana"], qtdeLote);
    }
}

/**
 * Classe derivada representando um Hipopótamo
 * @class
 * @extends LoteAnimal
 */
export class Hipopotamo extends LoteAnimal {
    /**
     * Cria uma instância de um lote de Hipopótamos
     * @override
     * @param {number} qtdeLote - O número de animais dentro o lote 
     */
    constructor(qtdeLote) {
        super("HIPOPOTAMO", 4, ["savana", "rio"], qtdeLote);
    }

    /**
     * Verifica se o lote de animais se sente confortável para fazer parte do recinto,
     * considerando que Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
     * @override
     * @param {Recinto} recinto - o recinto que se deseja verificar
     * @returns {boolean}
     */
    estaConfortavel(recinto) {
        let espacoDisponivel = recinto.getEspacoDisponivel(this.especie);
        if (this.verificaBiomaAdequado(recinto.biomas) &&
            this.verificaEspacoSuficente(espacoDisponivel)) {

            // Se no recinto há outras espécies, verifica se o hipopótamo tolera as mesmas
            if (recinto.temOutrasEspecies(this.especie)) {
                return (this.toleraOutrasEspecies(recinto.biomas));
            }

            return true;
        }
        return false;
    }

    /**
     * Verifica se o recinto analisado atende às condições para que o hipopótamo se sinta confortável
     * em dividir o recinto com outras espécies.
     * @param {Array<string>} biomasRecinto - A lista de biomas que compõem o recinto analisado 
     * @returns {boolean}
     */
    toleraOutrasEspecies(biomasRecinto) {
        return (biomasRecinto.includes("savana") && biomasRecinto.includes("rio"));
    }
}

/**
 * Classe para gerar os Lotes de animais segundo os padrões do zoológico
 * @class
 */
export class FabricaLoteAnimais {

    /**
     * Gera um lote de animais segundo os padrões do zoológico, verificando se as características do lote 
     * atendem aos padrões do zoológico.
     * @param {string} especie - A espécie dos animais que fazem parte do lote.
     * @param {number} qtdeLote - A quantidade de animais que fazem parte do lote.
     * @returns {(LoteAnimal|string)} - O lote de animais com suas características próprias ou uma mensagem 
        de erro indicando o tipo de erro ocorrido.
     */
    static geraLote(especie, qtdeLote) {

        if (typeof (especie) != "string") {
            return "Animal inválido";
        }

        if (typeof (qtdeLote) != "number" || qtdeLote <= 0) {
            return "Quantidade inválida";
        }

        switch (especie.toUpperCase()) {
            case "LEAO":
                return new Leao(qtdeLote);
            case "LEOPARDO":
                return new Leopardo(qtdeLote);
            case "CROCODILO":
                return new Crocodilo(qtdeLote);
            case "MACACO":
                return new Macaco(qtdeLote);
            case "GAZELA":
                return new Gazela(qtdeLote);
            case "HIPOPOTAMO":
                return new Hipopotamo(qtdeLote);
            default:
                return "Animal inválido";
        }
    }
}