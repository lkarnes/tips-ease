



//creates an array of various background images
let guacImagesArr = ["url('../tips-ease/images/synthwave money 2.jpg')", "url('../tips-ease/images/synthwave money.jpg')", "url('../tips-ease/images/delorean.jpg')", "url('../tips-ease/images/skeletor.jpg')", "url('../tips-ease/images/coolcar.jpg')", "url('../tips-ease/images/jedicyber.jpg')", "url('../tips-ease/images/cybereye.jpg')"];

//declares an iterator that stores the index of the current background image; starts with 0 since the 0th element of the array happens to be our starting background image
let guacImagesIterator = 0;


//listens for clicks on the "GET THAT GUAC" button and increments to the next image when it is clicked by increasing the iterator by 1 or going back to 0 if end of guacImagesArr has been reached
document.querySelector("#get-that-guac-button").addEventListener("click", () => {
    if(guacImagesIterator < guacImagesArr.length - 1) {
        guacImagesIterator++;
    } else {
        guacImagesIterator = 0;
    }
    document.querySelector(".intro-section-container").style.backgroundImage = guacImagesArr[guacImagesIterator];

});

