var cards = {
  values: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  suits:  ['D', 'H', 'C', 'S'],
  cards:  [],
  currentCard: 0,

  newDeck: function() {
    this.cards = [];

    for (var i = 0; i < this.values.length; i++) {
      for (var j = 0; j < this.suits.length; j++) {
        this.cards.push(this.values[i] + this.suits[j]);
      }
    }

    this.cards = ['back'].concat(this.shuffle(this.cards));
  },

  refresh: function() {
    this.setCard(this.currentCard, this.cards);
  },

  nextCard: function() {
    this.currentCard++;
    if (this.currentCard > 52) {
      this.currentCard = 0;
    }
  },

  setCard: function(index, cards) {
    $('#card')[0].src = 'cards/' + cards[index] + '.png';
  },

  shuffle: function(array) {
    var counter = array.length, temp, index;

    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;

      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }
}

cards.newDeck();

$('#card').on('click', function(e) {
  cards.nextCard();
  cards.refresh();
});
