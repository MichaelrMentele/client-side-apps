var SubCategoryView = Backbone.View.extend({
  template: App.templates.subCategory,
  initialize: function(subCategory) {
    this.render(subCategory);
  },
  render: function(subCategory) {
    this.el = this.template(subCategory);
    return this;
  }
});