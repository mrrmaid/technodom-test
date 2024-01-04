const cardLimit = 20;
const cardIncrease = 4;
let m = 0;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

const handleButtonStatus = (cond) => {
  if (pageCount === currentPage || cond) {
    loadMoreButton.style.display = "none";
  }
};

const responseArray =  fetch("https://fakestoreapi.com/products")
.then((response) => response.json())
.then((array) => {
    return array;
});

const createCards = async (index) => {
    const a = await responseArray; 
    const element = a[index];
    
    let product = document.createElement("div");
    product.className = "product";
    product.innerHTML = `<div class="card">
            <div class="image-container">
                <span>`+element.category+`</span>
                <img src="`+element.image+`" alt="">
            </div>
            <div class="desc-container">
                <h3>`+element.title+`</h3>
                <p>`+element.description+`</p>
                <span class="price">`+Math.floor(element.price)+`</span>
            </div>
            <button class="deleteMe" onclick="deleteElem(this)">Delete</button>
        </div>`;
    cardContainer.appendChild(product);  
}

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  handleButtonStatus();

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;

  for (let i = startRange + m + 1; i <= endRange + m; i++) {
    createCards(i);
  }
};

const addNextCard = (pageIndex) => {
  const endRange =
    pageIndex * cardIncrease > cardLimit ? cardLimit : (pageIndex-1) * cardIncrease + m;

  m = m < cardLimit ? m + 1 : 0;
  handleButtonStatus((pageIndex-1) * cardIncrease + m == 20);
  
  createCards(endRange+1);
};

function deleteElem(e)
{
  e.parentElement.parentElement.remove();
  addNextCard(currentPage+1);
}