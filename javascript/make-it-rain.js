/*creates "Server life Story" components that can be dynamically manipulated. Allows these server life stories to be revealed to a user who tips a server with ETH through MetaMask.*/


//set up MetMask API by checking for presence of MetaMask and requiring user to activate MetaMask acct that will be used for tipping
const web3 = new Web3(Web3.givenProvider);

if (typeof web3 === 'undefined') {
    window.alert('Something went wrong. Please install MetaMask from https://metamask.io/ and set it to the Ropsten test network. Otherwise you cannot tip!');
}

window.ethereum.enable();


/*assumes that the app provider and its merchants hard-code server names and Ethereum adresses through some onboarding workflow process,
storing the information in ethAddressesByServerName; in a more advanced version this would be dynamic*/


let ethAddressesByServerName = [
    {name: "Batman", ethAddress: "0x584eb7AD314F96B98F51e613543cd212Ce9d49aC"},
    {name: "Spiderman", ethAddress: "0x61a6d1a584B173DE29b9cEF17dfC1Dd87648E2F5"},
    {name: "Iron Man", ethAddress: "0x7c65B0d0Ca9D362E5AeD47eB6248ebD33b509C80"}
];

/*creates a class ServerLifeElement to hold hold the HTML elements that contain the servers' life stories*/

class ServerLifeElement {
    constructor(serverLife) {
        this.serverLifeElement = serverLife;
        this.serverLifeStory = this.serverLifeElement.querySelector("p");
        this.serverName = this.serverLifeElement.dataset.name;
        this.serverEthereumAddress = this.addressFinder(ethAddressesByServerName);
        console.log(this.serverEthereumAddress);
    }

    /*searches the hard-coded ethAddressesByServerName array for the Ethereum address belonging to the particular server*/
    addressFinder(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === this.serverName) {
                return arr[i].ethAddress;
            }
        }
    };

    /*makes a server's life story invisible. This is used in makeVisible so that two different life stories are never displayed simultaneously, even if the user tips two different servers successively*/
    makeInvisible() {
        this.serverLifeElement.style.display = "none";
    }

    /*makes server's life story visible*/
    makeVisible() {
        serverLivesArray.forEach(serverLife => serverLife.makeInvisible());
        this.serverLifeElement.style.display = "flex";
    }

}


/*iterates through all server-life-info HTML elements and passes them to the ServerLifeElement constructor to get ServerLifeElement objects; also adds all of these objects to an array, serverLivesArray*/
let serverLives = document.querySelectorAll(".server-life-info");

let serverLivesArray = [];

serverLives.forEach(serverLife => {
    serverLivesArray.push(new ServerLifeElement(serverLife));
});


/*this click listener waits for the "Make it Rain" button to get clicked, then prompts the user for the name of the server they would like to tip and how much ETH they would like to tip them;
* if and only if the ETH transaction has successfully been transmitted, the server's life story is revealed.
* NOTE: Ethereum transactions have probabilistic settlement finality. This function piggybacks on Metamask's configuation to decide finality, which requires that the transaction be included in n blocks to be confirmed.
* Thus, it takes some time after sending the tip for the server's life story to appear and the user must be patient. In a future version, we could use a more custom configuration and use 0-block-confirmation,
* though that would risk showing the server's life story in a tranasction that could be reverted.*/

document.querySelector("#intro-section-container .inner-text-content button").addEventListener("click", () => {

    //some tests:
    // console.log('Web3 Detected! ' + web3.givenProvider.constructor.name); /*THIS WORKS!!!, showing that web3 is being properly assigned as Metamask node*/

    // web3.eth.net.getNetworkType()
    //     .then(console.log);   /*THIS WORKS!!! and logs ropsten, showing that we are talking to Metamask's node on ropsten, not mainnet*/

    // console.log(web3.eth.getAccounts());

    let serverNameSelected = prompt("Please enter your server's name. You can pick Spiderman, Batman or Iron Man. Please use exact text.");

    let ethAmountSelected = web3.utils.toWei(prompt("How much ETH would you like to send to your server? Please enter a number indicating the amount of ETH (can less than one ETH--use decimals").toString(), 'ether');

    //test
    // console.log(ethAmountSelected); /*THIS WORKS!!!, showing that the conversion function from web3 is being invoked and is converting the ETH units into WEI units as prep for ethSend()*/

    let serverObjectSelected = {};
    let ethAddressSelected = "";

    for (i = 0; i < serverLivesArray.length; i++) {
        if (serverLivesArray[i].serverName === serverNameSelected) {
            //tests that we are reading value/key pairs here correctly:
            // console.log(serverLivesArray[i].serverEthereumAddress);
            // console.log(serverLivesArray[i]);
            serverObjectSelected = serverLivesArray[i];
            ethAddressSelected = serverLivesArray[i].serverEthereumAddress;
        }
    }

    //some tests:
    // console.log(ethAddressSelected); /*THIS WORKS!!!, showing that ethAddressSelected has been assigned the correct address*/
    // console.log(serverObjectSelected); /*THIS WORKS!!!, showing that serverObjectSelected has been assigned the correct server object*/


    /*this function asynchronously calls a send transaction on the Ethereum network through MetaMask's API.
    * Some NOTES:
    *   (1) Ethereum nodes use JSON-RPC, so to communicate with Metamask's node, we need a special web3.js
    *       library that converts javascript into JSON-RPC. This library has been imported as a script in make-it-rain.html.
    *   (2) the function is asynchronous so we can wait until the ethereum transaction has been confirmed as complete before
    *       revealing the server's life story as a reward*/
    const sendTxWithMetamask = async () => {
        web3.setProvider(ethereum);
        let selectedAddress = window.ethereum.selectedAddress
        await web3.eth.sendTransaction({
            to: ethAddressSelected, value: ethAmountSelected, from: selectedAddress
        })
        serverObjectSelected.makeVisible();
    }

    sendTxWithMetamask();

});

