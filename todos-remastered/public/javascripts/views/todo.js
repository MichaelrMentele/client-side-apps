var TodoView = Backbone.View.extend({
  template: App.templates.todo,
  events: {
    "click .todo_toggle" : "toggle",
    "click .editable" : "edit",
    "click .deletable img" : "destroy",
  },
  initialize: function() {
    this.render();
    // !!! Add Change event to save todos to local storage when one is modified.
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($("#todos"));
    return this;
  },
  toggle: function() {
    console.log("Checkbox toggled");
    this.model.toggle();
  },
  edit: function(e) {
    e.preventDefault();
    console.log("Editing Todo");
    App.trigger("editTodo", this.model);
  },
  destroy: function(e) {
    e.preventDefault();
    console.log("Destroying...");
    this.model.collection.remove(this.model);
  }
});