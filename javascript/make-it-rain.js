//assume that the app provider and its merchants hard-code server names and Ethereum adresses through some onboarding workflow process, storing the information in ethAddressesByServerName

// console.log(Web3.givenProvider); THIS WORKS!!

// in node.js use: const Web3 = require('web3');

// use the given Provider, e.g in the browser with Metamask, or instantiate a new websocket provider


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
        this.serverEthereumAddress = this.addressFinder(ethAddressesByServerName);
        console.log(this.serverEthereumAddress);
    }

    addressFinder(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === this.serverName) {
                return arr[i].ethAddress;
            }
        }
    };


    makeInvisible() {
        this.serverLifeElement.style.display = "none";
    }

    makeVisible() {
        serverLivesArray.forEach(serverLife => serverLife.makeInvisible());
        this.serverLifeElement.style.display = "flex";
    }


}

let serverLives = document.querySelectorAll(".server-life-info");

let serverLivesArray = [];

serverLives.forEach(serverLife => {
    serverLivesArray.push(new ServerLifeElement(serverLife));
});


document.querySelector("#intro-section-container button").addEventListener("click", () => {

    const web3 = new Web3(Web3.givenProvider);

    //some tests:
    // console.log('Web3 Detected! ' + web3.givenProvider.constructor.name); /*THIS WORKS!!!, showing that web3 is being properly assigned as Metamask node*/

    // web3.eth.net.getNetworkType()
    //     .then(console.log);   /*THIS WORKS!!! and logs ropsten, showing that we are talking to Metamask's node on ropsten, not mainnet*/

    // console.log(web3.eth.getAccounts());

    if (typeof web3 === 'undefined') {
        window.alert('Something went wrong. Please install MetaMask from https://metamask.io/ and set it to the Ropsten test network');
    }

    let serverNameSelected = prompt("Please enter your server's name. You can pick Spiderman, Batman or Iron Man. Please use exact text.");

    let ethAmountSelected = web3.utils.toWei(prompt("How much ETH would you like to send to your server? Please enter a number indicating the amount of ETH (can less than one ETH--use decimals").toString(), 'ether');

    //test
    // console.log(ethAmountSelected); /*THIS WORKS!!!, showing that the conversion function from web3 is being invoked and is converting the ETH units into WEI units as prep for ethSend()*/

    let serverObjectSelected = {};
    let ethAddressSelected = "";

    for (i = 0; i < serverLivesArray.length; i++) {
        if (serverLivesArray[i].serverName === serverNameSelected) {
            console.log(serverLivesArray[i].serverEthereumAddress);
            console.log(serverLivesArray[i]);
            serverObjectSelected = serverLivesArray[i];
            ethAddressSelected = serverLivesArray[i].serverEthereumAddress;
        }
    }

    //some tests:
    // console.log(ethAddressSelected); /*THIS WORKS!!!, showing that ethAddressSelected has been assigned the correct address*/
    // console.log(serverObjectSelected); /*THIS WORKS!!!, showing that serverObjectSelected has been assigned the correct server object*/

    const sendTxWithMetamask = async () => {
        const ethereum = window.ethereum;
        let accounts = await ethereum.enable()
        web3.setProvider(ethereum);
        let selectedAddress = ethereum.selectedAddress
        let balance = await web3.eth.getBalance(selectedAddress)
        console.log('Balance', balance)
        await web3.eth.sendTransaction({
            to: ethAddressSelected, value: ethAmountSelected, from: selectedAddress
        })
        serverObjectSelected.makeVisible();
    }

    sendTxWithMetamask();

});

