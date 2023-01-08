export class View {
    private elemento: HTMLElement

    constructor(selector: string) {
        this.elemento = document.querySelector(selector)
    }
}