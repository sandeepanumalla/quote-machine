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
    this.paraContainer = document.querySelector(".para_container");
    this.twitter = document.querySelector(".twitter_link");
    this.nextQuote = document.querySelector(".next_quote");
    this.authorContainer = document.querySelector(".author_container");
    this.quotes;
    this.randomQuote;
    this.randomColor = colorArray[Math.round(Math.random() * 11)];
  }
  setStyles() {
    this.randomColor = colorArray[Math.round(Math.random() * 11)];
    this.body.style.backgroundColor = this.randomColor;
    this.quoteParagraph.style.color = this.randomColor;
    this.fontAwesomeIcon.style.color = this.randomColor;
    this.nextQuote.style.backgroundColor = this.randomColor;
    this.authorName.style.color = this.randomColor;
    this.twitter.style.color = this.randomColor;
  }

  manipulateDom() {
    this.paraContainer.innerHTML = ` 
    <div class="para_span">
      <i class="fas fa-quote-left"></i>
      <span class="quote_text">${this.randomQuote.quote}</span>
    </div>
    <div class="author_container">
      <span>- ${this.randomQuote.author}</span>
    </div>
    `;
    let text = this.randomQuote.quote.split(" ").join("%20");
    let author = this.randomQuote.author.split(" ").join("%20");
    this.twitter.href = `https://twitter.com/intent/tweet?hashtags=quotes&amp;related=sandeep&text="${text}"%20${author}`;

    this.fontAwesomeIcon = this.paraContainer.children[0].children[0];
    this.quoteParagraph = this.paraContainer.children[0].children[1];
    this.authorName = this.paraContainer.children[1].children[0];
    this.nextQuote =
      this.paraContainer.nextElementSibling.children[1].children[0];

    this.setStyles();
    if (window.innerWidth <= 450) {
      this.paraContainer.children[0].style.width = window.innerWidth - 15;
      this.paraContainer.children[1].style.width = window.innerWidth - 15;
      this.paraContainer.nextElementSibling.style.width =
        window.innerWidth - 15;
      console.log("running");
    }
    if (this.randomQuote.quote.split(" ").length >= 24) {
      this.paraContainer.children[0].style.width = `35rem`;
      this.paraContainer.children[1].style.width = `33rem`;
      this.paraContainer.parentElement.children[1].style.width = `31rem`;
    } else if (this.randomQuote.quote.split(" ").length >= 29) {
      this.paraContainer.children[0].style.width = `40rem`;
      this.paraContainer.children[1].style.width = `37rem`;
      this.paraContainer.parentElement.children[1].style.width = `35rem`;
    }
  }
}
//

class API extends GetDom {
  constructor() {
    super();
    console.log(this.randomQuote);
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
      // console.log("this this random", this.randomQuote);
    });

    this.getNewQuote();
    this.manipulateDom();
    // console.log(this.randomQuote);
  }
}

let dom = new GetDom();

let api = new API();
api.getQuotes();
