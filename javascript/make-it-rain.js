
// class SupplementalContent {
//     constructor(supplementalContentElement) {
//         this.supplementalContent = supplementalContentElement;
//     }
//
//     makeVisible() {
//         this.supplementalContent.style.display = "flex";
//     }
//
//     makeInvisible() {
//         this.supplementalContent.style.display = "none";
//     }
// }

class ServerLifeElement {
    constructor(serverLife) {
        this.serverLifeElement = serverLife;
        this.serverLifeStory = this.serverLifeElement.querySelector("p");
        this.serverLifeElement.style.display = "none";
    }



}



let serverLives = document.querySelectorAll(".server-life-info");
serverLives.forEach(serverLife => new ServerLifeElement(serverLife));

