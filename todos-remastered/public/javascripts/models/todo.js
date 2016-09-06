var Todo = Backbone.Model.extend({
  defaults: {
    title: "Task",
    dueDate: "No Due Date",
    description: "",
    complete: false,
    category: "No Due Date"
  },
  initialize: function(params) {
    this.attributes.id = Todo.assignID();
    if (this.hasDueDate()) {
      this.attributes.category = this.getCategory();
    }
  },
  toggle: function() {
    this.attributes.complete = !this.complete;
  },
  isComplete: function() {
    return this.attributes.complete;
  },
  hasDueDate: function() {
    return this.attributes.dueDate instanceof Date;
  },
  getYear: function() {
    if (this.hasDueDate) {
      var fullYear = this.attributes.dueDate.getFullYear();
      return String(fullYear).slice(-2);
    }
  },
  getMonth: function() {
    if (this.hasDueDate) {
      return this.attributes.dueDate.getMonth() + 1;
    }
  },
  getDay: function() {
    if (this.hasDueDate) {
      return this.attributes.dueDate.getDate();
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

Todo.assignID = function() {
  this.last_id = this.last_id + 1 || 1;
  return this.last_id;
}