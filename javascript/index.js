

class SupplementalBlock {
    constructor(supplementalBlockElement) {
        this.supplementalBlock = supplementalBlockElement;
        this.supplementalBackgroundImage = this.supplementalBlock.querySelector(".image-container img");
        this.supplementalContent = this.supplementalBlock.querySelector(".inner-text-content");
        this.supplementalButton = this.supplementalBlock.querySelector("button");
    }

}

let supplementalBlocks = document.querySelectorAll("#Supplemental-Container .supplemental-block");
supplementalBlocks.forEach(supplementalBlock => new SupplementalBlock(supplementalBlock));
console.log(supplementalBlocks);

