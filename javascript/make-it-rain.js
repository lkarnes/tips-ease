//assume that the app provider and its merchants hard-code server names and Ethereum adresses through some onboarding workflow process, storing the information in ethAddressesByServerName
let ethAddressesByServerName = [
    {name: "Batman", ethAddress: "0x584eb7AD314F96B98F51e613543cd212Ce9d49aC"},
    {name: "Spiderman", ethAddress: "0x61a6d1a584B173DE29b9cEF17dfC1Dd87648E2F5"},
    {name: "Iron Man", ethAddress: "0x7c65B0d0Ca9D362E5AeD47eB6248ebD33b509C80"}
];

class ServerLifeElement {
    constructor(serverLife) {
        this.serverLifeElement = serverLife;
        this.serverLifeStory = this.serverLifeElement.querySelector("p");
        this.serverName = this.serverLifeElement.dataset.name;
        this.serverEthereumAddress = this.addressFinder(ethAddressesByServerName, this);
        this.serverLifeElement.style.display = "none";
    }

    addressFinder(arr, obj) {
        arr.forEach(element => {
            if (element.name === obj.serverName) {
                console.log(element.ethAddress);
                return element.ethAddress;
            }
        })
    };

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


document.querySelector("#intro-section-container button").addEventListener("click", () => {
    let serverNameSelected = prompt("Please enter your server's name. You can pick Spiderman, Batman or Iron Man. Please use exact text.");
    let ethAmountSelected = 1000000000000000000/*web3.eth.toWei(prompt("How much ETH would you like to send to your server? Please enter only an integer indicating the amount of ETH"), 'ether')*/;

    console.log(ethAmountSelected);

    let serverObjectSelected = {};

    serverLivesArray.forEach(serverObject => {
        if (serverObject.serverName === serverNameSelected) {
            serverObjectSelected = serverObject;
        }
    });

    console.log(serverObjectSelected.serverName);

    const sendEth = (sendFromAddress, sendToAddress, ethAmount) => {
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction(
            {
                from: sendFromAddress,
                to: sendToAddress,
                value: ethAmount
            },
        )
    };


    if ((typeof web3 !== 'undefined') && (serverLivesArray.includes(serverObjectSelected))) {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)

        window.web3 = new Web3(web3.currentProvider);

        sendEth(web3.eth.accounts[0], serverObjectSelected.serverEthereumAddress, ethAmountSelected);

        serverObjectSelected.makeVisible();

    } else {
        return window.alert('Something went wrong. You might have entered your server\'s name wrong. Or you might not have installed MetaMask from https://metamask.io/');
    }
});



//sanity test to make sure MetaMask is loaded and being detected by web page. Uncomment and load page if in doubt.
window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
    } else {
        console.og('No Web3 Detected');
    }
})