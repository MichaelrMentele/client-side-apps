// ListView: A subview of a board view containing x-number of card views.

// View Relationships
// List      -> Card
//           -> OverflowMenu
//           -> TitleEdit
//           -> DroppableCards

// Events
// Click on OverflowMenu -> Popup Options
// DblClick on Title -> Edit Title (replace title view with title edit view)
// Enter on EditTitle -> Title (replace title edit view with title view)
// Click on AddCard -> Swap for CardTitleEdit
// Click add on CardTitleEdit -> Create new Card and Swap for AddCardView
// Click cancel on CardTitleEdit -> Swap for AddCardView

var MrelloApp = MrelloApp || {};

MrelloApp.view.List = Backbone.View.extend({
  template: MrelloApp.templates.list,
  addCardMenu: MrelloApp.templates["add-card-menu"],
  addCardButton: MrelloApp.templates["add-card-button"],
  titleTemplate: MrelloApp.templates["list-title"],
  titleEditorTemplate: MrelloApp.templates["title-editor"],
  tagName: "div",
  className: "list-wrapper",
  events: {
    "click .add-card-button" : "renderAddCardMenu",
    "click .button" : "addCard",
    "click .cancel" : "renderAddCardButton",
    "click .list-title-heading" : "renderTitleEditor",
    "focusout .list-title .title-input" : "updateTitle",
    "click .list-overflow-menu" : "renderOptions",
  },
  initialize: function() {
    console.log("Rendering new list view")
    this.render();
    this.bindEvents(); // Is this necessary?
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.model.get("cards"), 'add remove change', this.renderCards);
  },
  render: function() {
    console.log("Rendering " + this.model.get("title") + " list");
    this.$el.html(this.template()); // Generate list view
    this.renderTitle();
    this.renderCards(); // Populate subviews
    this.renderAddCardButton();
    return this;
  },
  renderCards: function() {
    var cardsContainer = $(this.el).find(".card-list");
    new MrelloApp.view.Cards({
      el: cardsContainer,
      collection: this.model.get("cards"),
    });
  },
  renderAddCardMenu: function(e) {
    e.preventDefault();
    console.log("Enter Card Title");
    this.$el.find(".add-card").html(this.addCardMenu());
    this.$el.find("input").focus();
  },
  renderAddCardButton: function(e) {
    if (e) { e.preventDefault(); }
    this.$el.find(".add-card").html(this.addCardButton());
  },
  renderTitle: function() {
    this.$el.find(".list-title").html(
      this.titleTemplate(this.model.toJSON())
    );
  },
  renderTitleEditor: function(e) {
    e.preventDefault();
    console.log("render title editor");
    var $container = this.$el.find(".list-title");
    $container.html(this.titleEditorTemplate(this.model.toJSON()));
    $container.find("input").focus();
  },
  updateTitle: function(e) {
    e.preventDefault();
    console.log("updating title info on list");
    var $input = this.$el.find(".title-input");
    var title = $input.val();
    this.model.set("title", title);
    this.render();
  },
renderOptions: function(e) {
  e.preventDefault();
  console.log("render options");
},
  addCard: function(e) {
    e.preventDefault();
    var $input = this.$el.find(".title-input")
    var title = $input.val();
    $input.val("");
    if (title != "") {
      this.model.get("cards").add({title: title});
    }
  }
});

