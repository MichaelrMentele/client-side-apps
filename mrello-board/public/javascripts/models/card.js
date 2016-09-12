var MrelloApp = MrelloApp || {};

MrelloApp.model.Card = Backbone.Model.extend({
  defaults: {
    title: "Card",
    description: "",
  },
  initialize: function() {
    console.log("New Card Created");
    this.set("comments", new MrelloApp.collection.Comments());
    this.get("comments").parent = this;

    this.set("checklists", new MrelloApp.collection.Checklists());
    this.get("checklists").parent = this;

    // Look for the parent Lists' title and cache it for easy rendering
    this.set("listTitle", this.collection.parent.attributes.title);
  }
});