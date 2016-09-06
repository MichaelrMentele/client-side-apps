var TodoView = Backbone.View.extend({
  template: App.templates.todo,
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($("#todos"));
    return this;
  },
});