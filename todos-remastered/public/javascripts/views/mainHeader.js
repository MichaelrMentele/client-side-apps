var MainHeaderView = Backbone.View.extend({
  template: App.templates.mainHeader,
  initialize: function(pageInfo) {
    this.render(pageInfo);
  },
  render: function(pageInfo) {
    this.$el.html(this.template(pageInfo));
    return this;
  }
});