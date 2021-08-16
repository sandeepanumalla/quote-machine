const colorArray = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];
class GetDom {
  constructor() {
    this.body = document.body;
    this.quoteContainer = document.querySelector(".quote_container");
    this.paraspan = document.querySelector(".para_span");
    this.nextQuote = document.querySelector(".next_quote");
    // this.fontAwesomeIcon = document.querySelector("i");
    this.quotes;
    this.randomQuote;
    console.log(this.paraspan.classList.contains(""));
    this.randomColor = colorArray[Math.round(Math.random() * 11)];
    console.log(this.randomQuote);
    //
  }
  setStyles() {
    this.randomColor = colorArray[Math.round(Math.random() * 11)];
    this.body.style.backgroundColor = this.randomColor;
    this.quoteParagraph.style.color = this.randomColor;
    //this.fontAwesomeIcon.style.color = this.randomColor;
  }

  manipulateDom() {
    this.quoteParagraph = document.createElement("span");
    this.quoteParagraph.classList.add("quote_text");
    this.setStyles();
    console.log(this.randomQuote);
    this.quoteParagraph.innerHTML = `
    ${this.randomQuote.quote}`;
    this.paraspan.appendChild(this.quoteParagraph);
  }
}

//

class API extends GetDom {
  constructor() {
    super();
  }

  getNewQuote() {
    let random = Math.round(Math.random() * 102);
    this.randomQuote = this.response[random];
  }

  async getRequest() {
    let endpoint = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    let response = await fetch(endpoint);
    let data = await response.json();
    return data.quotes;
  }

  async getQuotes() {
    this.response = await this.getRequest();
    this.nextQuote.addEventListener("click", () => {
      this.getNewQuote();
      this.manipulateDom();
      console.log("this this random", this.randomQuote);
    });

    this.getNewQuote();
    console.log(this.randomQuote);
  }
}

let dom = new GetDom();

let api = new API();
api.getQuotes();
