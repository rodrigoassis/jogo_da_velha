import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return Ember.$.getJSON("/api/scoreboard.json");
  }
});
