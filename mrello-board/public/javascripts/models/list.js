var MrelloApp = MrelloApp || {};

MrelloApp.model.List = Backbone.Model.extend({
  defaults: {
    title: "List",
  },
  initialize: function() {
    console.log("New List Created")
    this.set("cards", new MrelloApp.collection.Cards());
    this.get("cards").parent = this;
  }, 
});