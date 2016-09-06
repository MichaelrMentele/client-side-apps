var TodoList = Backbone.Collection.extend({
  model: Todo,
  getCompleted: function() {
    var completed = this.todos.filter(function(todo) {
      return todo.complete;
    });

    return completed;
  },
  getIncomplete: function() {
    var incomplete = this.todos.filter(function(todo) {
      return !todo.complete;
    });

    return incomplete;
  },
  getSublist: function(targetCategory) {
    var sublist = new Backbone.Collection();
    this.todos.filter(function(todo) {
      if (targetCategory === todo.getCategory()) {
        sublist.push(todo);
      }
    });
    return sublist // [todo, todo ... ]
  },
  getSubCategoryNames: function(sublist) {
    var todos = sublist || this.todos; 
    var names = [];

    todos.forEach( function(todo) {
      names.push(todo.getCategory());
    });

    return names; 
  },
  getUniqueCategoryNames: function(sublist) {
    return new Set(this.getSubCategoryNames(sublist));
  },
  // getSubCategoryCounts: function(sublist) {
  //   var allNames = this.getSubCategoryNames(sublist);
  //   var uniqueNames = this.getUniqueCategoryNames(sublist);
  //   var catCounts = []; 

  //   uniqueNames.forEach(function(unique_name) {
  //     var matchedNames = allNames.filter(function(name) {
  //       return name === unique_name;
  //     });

  //     catCounts.push({title: unique_name, todo_count: matchedNames.length});
  //   });

  //   return catCounts; // [{title: name, todo_count: count}, {}, ... ]
  // },
});
