let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js","");

export default class mySelection extends HTMLElement{
    static async components(){
        return await(await fetch(pathName.replace(".js",".html"))).text();
    };

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    };

    handleEvent(e){
        (e.type==="click")? this.enviarWorker(e): undefined
    };

    enviarWorker(e){
        console.log(e);
        e.preventDefault()
    }
    connectedCallback(){
        Promise.resolve(mySelection.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.Myselection = this.shadowRoot.querySelector("button");
            this.Myselection.addEventListener("click", this.handleEvent.bind(this))
        })
        console.log("Funciona x4");
    };
}
customElements.define(name, mySelection)