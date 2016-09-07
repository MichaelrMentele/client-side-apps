var TodoList = Backbone.Collection.extend({
  model: Todo,
  getCompleted: function() {
    return this.where({complete: true});
  },
  getIncomplete: function() {
    return this.where({complete: false});
  },
  getSublist: function(id) {
    var category = $("#" + id + " a").text();
    var sublist = [];

    // If super category they won't have a searchable category
    if (category === "All Todos") {
      sublist = this.models;
    } else if (category === "Completed") {
      sublist = this.getCompleted();
    } else if (id.match("all")) {
      this.filter(function(todo) {
        if (category === todo.getCategory()) {
          sublist.push(todo);
        }
      });
    } else if (id.match("completed")) { 
      this.getCompleted().filter(function(todo) {
        if (category === todo.getCategory()) {
          sublist.push(todo);
        }
      });
    }

    return sublist // [todo, todo ... ]
  },
  getSubCategoryNames: function(sublist) {
    var categories = [];

    sublist.forEach(function(todo) {
      categories.push(todo.getCategory());
    });

    return categories; 
  },
  getUniqueCategoryNames: function(sublist) {
    return new Set(this.getSubCategoryNames(sublist));
  },
  generateCategories: function(prefix, sublist) {
    var allNames = this.getSubCategoryNames(sublist);
    var uniqueNames = this.getUniqueCategoryNames(sublist);
    var categories = []; 

    var index = 0
    uniqueNames.forEach(function(unique_name) {
      var matchedNames = allNames.filter(function(name) {
        return name === unique_name;
      });

      categories.push({
                id: prefix + "-" + index, 
                title: unique_name, 
                todo_count: matchedNames.length
              });
      index++
    });

    return categories; // [{id: tag, title: name, todo_count: count}, {}, ... ]
  },
});
