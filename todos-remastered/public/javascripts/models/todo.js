var Todo = Backbone.Todo.extend({
  initialize: function(params) {
    this.title = params.title || "Task";
    this.dueDate = params.dueDate || "No Due Date";
    this.description = params.description || "";
    this.complete = params.complete || false;
    this.id = Todo.assignID();
  },
  toggle: function() {
    this.complete = !this.complete;
  },
  isComplete: function() {
    return this.complete;
  },
  hasDueDate: function() {
    return this.dueDate instanceof Date;
  },
  getYear: function() {
    if (this.hasDueDate) {
      var fullYear = this.dueDate.getFullYear();
      return String(fullYear).slice(-2);
    }
  },
  getMonth: function() {
    if (this.hasDueDate) {
      return this.dueDate.getMonth() + 1;
    }
  },
  getDay: function() {
    if (this.hasDueDate) {
      return this.dueDate.getDate();
    }
  },
  getCategory: function() {
    if (this.hasDueDate()) {
      return this.getMonth() + "/" + this.getYear();
    } else {
      return "No Due Date";
    }
  },
  getID: function() {
    return this.id
  },
  setID: function(newID) {
    this.id = newID;
  },
});
