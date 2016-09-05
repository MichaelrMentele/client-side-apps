var TodoList = Backbone.Collection.extend({
  sort: function() {
    // mutates todos array
    var completed = this.getCompleted();
    completed = this.sortByDate(completed);

    var incomplete = this.getIncomplete();
    incomplete = this.sortByDate(incomplete);

    this.todos = incomplete.concat(completed);
  },
  sortByDate: function(sublist) {
    var noDueDate = [];
    var dueDates = [];
    sublist.forEach(function(todo, id) {
      if (todo.hasDueDate()) {
        dueDates.push(todo);
      } else {
        noDueDate.push(todo);
      }
    });

    dueDates = dueDates.sort(function(a, b) {
      a.dueDate.getTime() - b.dueDate.getTime();
    });

    return noDueDate.concat(dueDates);
  },
  getAllCount: function() {
    return this.length;
  },
  getCompleted: function() {
    var completed = this.todos.filter(function(todo) {
      return todo.complete;
    });

    return completed;
  },
  getCompletedCount: function() {
    return this.getCompleted().length;
  },
  getIncomplete: function() {
    var incomplete = this.todos.filter(function(todo) {
      return !todo.complete;
    });

    return incomplete;
  },
  getSublist: function(targetCategory) {
    var sublist = [];
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
  getSubCategoryCounts: function(sublist) {
    var allNames = this.getSubCategoryNames(sublist);
    var uniqueNames = this.getUniqueCategoryNames(sublist);
    var catCounts = []; 

    uniqueNames.forEach(function(unique_name) {
      var matchedNames = allNames.filter(function(name) {
        return name === unique_name;
      });

      catCounts.push({title: unique_name, todo_count: matchedNames.length});
    });

    return catCounts; // [{title: name, todo_count: count}, {}, ... ]
  },
});
