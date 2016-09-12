// CardEditView -> A modal view that displays card info. A subview of the board view

// Subviews
// CardEditView -> Labels
//              -> Checklist
//              -> Move
//              -> Copy
//              -> AddComment
//              -> AddChecklist
//              -> Comments
//              -> Checklists
//              -> DescriptionEdit

var MrelloApp = MrelloApp || {};

MrelloApp.view.CardEditor = Backbone.View.extend({
  template: MrelloApp.templates["card-edit"],
  id: "card-editor",
  class: "window",
  events: {
    "click .cancel" : "clearModal",
    "click .submit-checklist-item" : "addChecklistItem",
    "click .submit-comment" : "addComment",
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    var container = $("#modal-container").append(this.el);
    container.removeClass("off");
    return this;
  },
  clearModal: function() {
    $("#modal-container").addClass("off").empty();
  },
  addChecklistItem: function(e) {
    console.log("Adding checklist item");
  },
  addComment: function(e) {
    console.log("Adding comment")
  }
});