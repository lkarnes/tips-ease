
class SupplementalContent {
    constructor(supplementalContentElement) {
        this.supplementalContent = supplementalContentElement;
    }

    makeVisible() {
        this.supplementalContent.style.display = "flex";
    }

    makeInvisible() {
        this.supplementalContent.style.display = "none";
    }
}

class SupplementalBlock {
    constructor(supplementalBlockElement) {
        this.supplementalBlock = supplementalBlockElement;
        this.supplementalBackgroundImage = this.supplementalBlock.querySelector(".image-container img");
        this.supplementalContent = this.supplementalBlock.querySelector(".inner-text-content");
        this.supplementalButton = this.supplementalBlock.querySelector("button");
        this.supplementalContent.style.display = "none";
    }



}



let supplementalBlocks = document.querySelectorAll("#Supplemental-Container .supplemental-block");
supplementalBlocks.forEach(supplementalBlock => new SupplementalBlock(supplementalBlock));

let supplementalContents = document.querySelectorAll("#Supplemental-Container .supplemental-block .inner-text-content");
supplementalBlocks.forEach(supplementalContent => new SupplementalContent(supplementalContent));
console.log(supplementalBlocks);
console.log(supplementalContents);

