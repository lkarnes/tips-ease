let guacImagesArr = ["url('../tips-ease/images/synthwave money 2.jpg')", "url('../tips-ease/images/synthwave money.jpg')", "url('../tips-ease/images/delorean.jpg')", "url('../tips-ease/images/skeletor.jpg')", "url('../tips-ease/images/coolcar.jpg')", "url('../tips-ease/images/jedicyber.jpg')", "url('../tips-ease/images/cybereye.jpg')"];

let guacImagesIterator = 0;


document.querySelector("#get-that-guac-button").addEventListener("click", () => {
    console.log("click activated");
    if(guacImagesIterator < guacImagesArr.length - 1) {
        guacImagesIterator++;
    } else {
        guacImagesIterator = 0;
    }
    document.querySelector(".intro-section-container").style.backgroundImage = guacImagesArr[guacImagesIterator];

});


