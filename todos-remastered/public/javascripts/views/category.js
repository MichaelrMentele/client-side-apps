var CategoryView = Backbone.View.extend({
  template: App.templates.category,
  el: "table",
  initialize: function(category, subCategories) {
    this.$el = $(category.container);
    this.category = category;
    this.subCategories = subCategories;
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.category));
    this.renderSubCategories();
  },
  renderSubCategories: function() {
    var self = this;
    this.subCategories.forEach(function(subCategory) {
      var view = new SubCategoryView(subCategory);
      self.$el.find(".subcategories").append(view.el);
    });
  },
});
