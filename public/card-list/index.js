async function getCardsFromNeonDB() {
  let statusElement = document.getElementById('status');
  let cardListElement = document.getElementById('cardsList');
  try {
    statusElement.innerHTML = `
        <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                </svg>
            </div>
        `;
    let response = await fetch('http://localhost:3000/update-cards/cards', {
      method: 'GET',
    });
    let cards = await response.json();
    statusElement.innerHTML = `
            <div class="successIntent">
                <h2>Success</h2>
                <p>Neon DB Updated with latest mtg cards</p>
            </div>
        `;
    var cardList = cards
      .map((card) => {
        return `
      <li class="cardListItem">
        <div>${card.name}</div>
      </li>
  `;
      })
      .join(' ');
    console.log(cardList);
    cardListElement.innerHTML = cardList;

    return cards;
  } catch (error) {
    statusElement.innerHTML = `
                <div class="errorIntent">
                    <h2>${{ ...error }}</h2>
                </div>
            `;
  }
}
