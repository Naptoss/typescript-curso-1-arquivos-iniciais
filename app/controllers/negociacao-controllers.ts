import { Negociacao } from "../controllers/negociacao.js"
import { Negociacoes } from "../models/negociacoes.js"
import { MensagemView } from "../views/mensage-views.js"
import { NegociacoesView } from "../views/negociacoes-vies.js"

export class NegociacaoController {
    private inputData: HTMLInputElement 
    private inputQuantidade: HTMLInputElement
    private inputValor: HTMLInputElement
    private negociacoes= new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView')
    private mensagemView = new MensagemView('#mensagemView')

    constructor() {
        this.inputData = document.querySelector('#data')
        this.inputQuantidade = document.querySelector('#quantidade')
        this.inputValor = document.querySelector('#valor')
        this.negociacoesView.update(this.negociacoes)
    }

    adiciona(): void {
        const negociacao = this.criaNegociacao()
        this.negociacoes.adiciona(negociacao)
        console.log(this.negociacoes.lista())
        this.negociacoesView.update(this.negociacoes)
        this.limparform()
        this.mensagemView.update("Negociação registrada com sucesso")
    }

    criaNegociacao(): Negociacao {
        const exp = /-/g
        const date = new Date(this.inputData.value.replace(exp, ','))
        const quantidade = parseInt(this.inputQuantidade.value)
        const valor = parseFloat(this.inputValor.value)
        return new Negociacao(date, quantidade, valor)
    }

    limparform(): void { // Essa classe limpa o formulario 
        this.inputData.value = ''
        this.inputQuantidade.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }


}