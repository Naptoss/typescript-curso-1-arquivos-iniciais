import { Negociacao } from "../controllers/negociacao.js"
import { DiasdaSemana } from "../enums/dia-da-semanas.js"
import { Negociacoes } from "../models/negociacoes.js"
import { MensagemView } from "../views/mensage-views.js"
import { NegociacoesView } from "../views/negociacoes-vies.js"

export class NegociacaoController {
    private inputData: HTMLInputElement 
    private inputQuantidade: HTMLInputElement
    private inputValor: HTMLInputElement
    private negociacoes= new Negociacoes()
    private negociacoesView = new NegociacoesView('#negociacoesView', true)
    private mensagemView = new MensagemView('#mensagemView')
    private readonly SABADO = 6
    private readonly DOMINGO = 0

    constructor() {
        this.inputData = document.querySelector('#data')
        this.inputQuantidade = document.querySelector('#quantidade')
        this.inputValor = document.querySelector('#valor')
        this.negociacoesView.update(this.negociacoes)
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value,
        )
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView
                .update("Apenas negociações em dias uteis sao aceitas")
                return
        }   
        this.negociacoes.adiciona(negociacao); 
        this.limparform()
        this.atualizaview()

        
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasdaSemana.DOMINGO 
            && data.getDay() < DiasdaSemana.SABADO
    }



    private limparform(): void { // Essa classe limpa o formulario 
        this.inputData.value = ''
        this.inputQuantidade.value = ''
        this.inputValor.value = ''
        this.inputData.focus()
    }

    private atualizaview(): void {
        this.negociacoesView.update(this.negociacoes)
        this.mensagemView.update('Negociação adicionado com sucesso')

    }

}