var deck, time, timer, card, progress, cardHammer, timerHammer;

card     = document.getElementById('card');
time     = document.getElementById('timer');
progress = document.getElementById('progress');

timer = new Timer();

cardHammer = Hammer(card, {
  prevent_default: true
});

timerHammer = Hammer(time, {
  prevent_default: true
});

function reset() {
  timer.reset();
  time.className = '';
  time.innerHTML = '00.00';

  deck = new Deck();
  draw(deck.currentCard());
  updateProgress();
}

function init() {
  reset();

  setInterval(function() {
    if (timer.running()) {
      time.innerHTML = timer.duration();
    }
  }, 55);
}

function toggleTimer() {
  if (timer.running()) {
    time.className = 'stopped';
    timer.reset();
  } else {
    time.className = '';
    timer.start();
  }
}

function draw(newCard) {
  card.src = 'cards/' + newCard + '.png';
}

function updateProgress() {
  progress.style.width = deck.progress() + '%';

  console.log(deck.progress());

  if (deck.progress() >= 98) {
    progress.className = 'complete';
  } else {
    progress.className = '';
  }
}

cardHammer.on('tap swipeleft', function(e) {
  draw(deck.nextCard());
  updateProgress();
});

cardHammer.on('swiperight', function(e) {
  draw(deck.previousCard());
  updateProgress();
});

cardHammer.on('hold', function(e) {
  if (confirm('Are you sure you want a new deck?')) { reset(); }
});

timerHammer.on('tap', function(e) {
  toggleTimer();
});

document.onkeypress = function (e) {
  if (e.keyCode == 106) {        // j
    draw(deck.nextCard());
    updateProgress();
  } else if (e.keyCode == 107) { // k
    draw(deck.previousCard());
    updateProgress();
  } else if (e.keyCode == 110) { // n
    if (confirm('Are you sure you want a new deck?')) { reset(); }
  } else if (e.keyCode == 32) {  // space
    toggleTimer();
  }
};

init();
