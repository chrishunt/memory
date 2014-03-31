function Deck () {
  this.index = 0;

  this.newDeck = function(suits, values) {
    var deck = [];

    for (var i = 0; i < values.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        deck.push(values[i] + suits[j]);
      }
    }

    return ['back'].concat(this.shuffle(deck));
  };

  this.shuffle = function(deck) {
    var counter = deck.length, temp, index;

    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;

      temp = deck[counter];
      deck[counter] = deck[index];
      deck[index] = temp;
    }

    return deck;
  };

  this.currentCard = function() {
    return this.deck[this.index];
  };

  this.nextCard = function() {
    this.index++;
    if (this.index > 52) {
      this.index = 0;
    }

    return this.currentCard();
  };

  this.previousCard = function() {
    this.index--;
    if (this.index < 0) {
      this.index = 52;
    }

    return this.currentCard();
  };

  this.progress = function() {
    return Math.floor((100.0 / this.deck.length) * this.index);
  };

  this.deck = this.newDeck(
    ['D','H','C','S'],
    ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
  );
}
