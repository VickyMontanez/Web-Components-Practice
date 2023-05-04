let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js","");

export default class mySection extends HTMLElement{
    static async components(){
        return await(await fetch(pathName.replace(".js",".html"))).text();
    };

    constructor(){
        super();
        this.attachShadow({mode:"open"});
    };

    handleEvent(e){
        (e.type === "reset")? this.enviarWorker(e): undefined;
    };

    enviarWorker(e){
        console.log(e);
        e.preventDefault();
    };

    connectedCallback(){
        Promise.resolve(mySection.components()).then(html=>{
            this.shadowRoot.innerHTML=html;
            this.Mysection= this.shadowRoot.querySelector("form");
            this.Mysection.addEventListener("reset", this.handleEvent.bind(this));
        })
        console.log("Funciona x2");
    };
};
customElements.define(name, mySection)