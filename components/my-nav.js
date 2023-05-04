let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js","");

export default class myNav extends HTMLElement{
    static async components(){
        return await(await fetch(pathName.replace(".js",".html"))).text();
    };
    constructor(){
        super();
        this.attachShadow({mode:"open"});
    };

    handleEvent(e){
        (e.type==="submit")? this.enviarWorker(e) : undefined
    };

    enviarWorker(e){
        console.log(e);
        e.preventDefault();
    };

    connectedCallback(){
        Promise.resolve(myNav.components()).then(html=>{
            this.shadowRoot.innerHTML= html;
            this.Mynav= this.shadowRoot.querySelector("form");
            this.Mynav.addEventListener("submit", this.handleEvent.bind(this));
        })
        console.log("Funciona x3");
    }
};
customElements.define(name,myNav);