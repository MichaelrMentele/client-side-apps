// CardView -> An atomic subview of a list view

// Subviews
// None

// Events
// Click on CardView -> Render cardedit modal view

var MrelloApp = MrelloApp || {};

MrelloApp.view.Card = Backbone.View.extend({
  template: MrelloApp.templates.card,
  tagName: "div",
  className: "list-card",
  events: {
    "click .card" : "renderEditor",
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  renderEditor: function() {
    new MrelloApp.view.CardEditor({model: this.model});
  },
});

