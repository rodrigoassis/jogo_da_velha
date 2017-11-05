import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.turn = 1;
    this.winner = '';
    this.plays = 0;
    this.draw = false;
  },
  actions: {
    fillSpace(id) {
      var bg = this.$('#' + id);
      if (bg.css("background-image") == 'none' && this.get('winner') == '') {
        var fig = "url('/assets/images/" + this.get('turn') + ".jpeg')";
        bg.css("background-image", fig);
        bg.css("background-repeat", 'no-repeat');
        this.set('turn', (this.get('turn') == 1 ? 2 : 1));
        this.set('plays', (this.get('plays') + 1));
      }
      if (checkEndGame()) {
        this.set('winner', (this.get('turn') == 1 ? 2 : 1));
        Ember.$.post("/api/result.json", { name: 'Player ' + this.get('winner'), result: 'victory' });
        Ember.$.post("/api/result.json", { name: 'Player ' + (this.get('winner') == 1 ? 2 : 1), result: 'defeat' });
      }
      if (this.get('plays') == 9 && !checkEndGame()) {
        this.set('draw', true);
        Ember.$.post("/api/result.json", { name: 'Player 1', result: 'draw' });
        Ember.$.post("/api/result.json", { name: 'Player 2', result: 'draw' });
      }
    },
    doRefresh: function () {
      window.location.reload(true);
    }
  }
});

function checkEndGame() {
  if (equalSpaces(1, 2, 3) || equalSpaces(4, 5, 6) || equalSpaces(7, 8, 9) ||
      equalSpaces(1, 4, 7) || equalSpaces(2, 5, 8) || equalSpaces(3, 6, 9) ||
      equalSpaces(1, 5, 9) || equalSpaces(3, 5, 7)
      ) {
      return true;
  }
}

function equalSpaces(a, b, c) {
  var bgA = Ember.$("#space" + a).css("background-image");
  var bgB = Ember.$("#space" + b).css("background-image");
  var bgC = Ember.$("#space" + c).css("background-image");
  if ((bgA == bgB) && (bgB == bgC) && (bgA != "none")) {
    return true;
  }
  else {
    return false;
  }
}
