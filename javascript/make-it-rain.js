class ServerLifeElement {
    constructor(serverLife) {
        this.serverLifeElement = serverLife;
        this.serverLifeStory = this.serverLifeElement.querySelector("p");
        this.serverName = this.serverLifeElement.dataset.name;
        console.log(this.serverName);
        this.serverLifeElement.style.display = "none";
    }

    makeVisible() {
        serverLivesArray.forEach(serverLife => serverLife.makeInvisible());
        this.serverLifeElement.style.display = "flex";
    }

    makeInvisible() {
        this.serverLifeElement.style.display = "none";
    }
}


let serverLives = document.querySelectorAll(".server-life-info");

let serverLivesArray = [];

serverLives.forEach(serverLife => {
    serverLivesArray.push(new ServerLifeElement(serverLife));
});


document.querySelector("#intro-section-container button").addEventListener("click", () => console.log('yo')/*OPEN UP A POP UP WINDOW TO SELECT SERVER TO TIP*/);

document.querySelector("#intro-section-container button").addEventListener("click", () => {
    let serverNameSelected = prompt("Please enter your server's name. You can pick Spiderman, Batman or Iron Man. Please use exact text.");
    // document.querySelector(`.server-life-info[data-name="${serverName}`).makeVisible();
    serverLivesArray.forEach(serverObject => {
        if (serverObject.serverName === serverNameSelected) {
            serverObject.makeVisible();
        }
    })
});