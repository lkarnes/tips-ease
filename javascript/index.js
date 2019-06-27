class Content {
    constructor(attr){
        this.attr = attr;
    }
    selectButton(){
        this.attr.classList.toggle('hidden');
    }
}
class Button {
    constructor(btnAttr){
        this.btnAttr = btnAttr;
        this.btnData = this.btnAttr.dataset.button;
        this.content = document.querySelector(`.inner-text[data-button="${this.btnData}"`);
        this.contentClass =new Content(this.content);
        
        this.btnAttr.addEventListener('click', ()=>{
            this.contentClass.selectButton();
            this.selectButton();
        })
    }
    selectButton(){
        if(this.btnAttr.textContent === 'Show More'){
            this.btnAttr.textContent = 'Show Less';
        }else{
            this.btnAttr.textContent = 'Show More';
            this.btnAttr.display.height = '200px';
        }
    }
}
let button = document.querySelectorAll('.block button').forEach(button=> new Button(button));
