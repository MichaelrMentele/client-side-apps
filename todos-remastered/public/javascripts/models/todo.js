var Todo = Backbone.Model.extend({
  defaults: {
    title: "Task",
    description: "",
    complete: false,
  },
  announce: function() {
    console.log("I changed"); 
  },
  initialize: function(params) {
    this.set("id", Todo.assignID());
    this.setCategory();
    this.setDateProperties();

    this.on('change:dueDate', this.setDateProperties);
    this.on('change:dueDate', this.setCategory);
  },
  setDateProperties: function() {
    if(this.hasDueDate()) {
      this.set("date", this.getDay());
      this.set("month", this.getMonth());
      this.set("year", this.getYear());
    }
  },
  setCategory: function() {
    this.set("category", this.getCategory());
  },
  toggle: function() {
    this.set("complete", !this.attributes.complete);
  },
  isComplete: function() {
    return this.get("complete");
  },
  hasDueDate: function() {
    return this.get("dueDate") instanceof moment;
  },
  getYear: function() {
    if (this.hasDueDate()) {
      var fullYear = this.get("dueDate").year();
      return String(fullYear).slice(-2);
    }
  },
  getMonth: function() {
    return (this.hasDueDate() ? this.get("dueDate").month() + 1 : undefined); // using moment.js date wrapper
  },
  getDay: function() {
    return (this.hasDueDate() ? this.get("dueDate").date() : undefined);
  },
  getCategory: function() {
    return (this.hasDueDate() ? this.getMonth() + "/" + this.getYear() : "No Due Date");
  },
});

Todo.assignID = function() {
  this.last_id = this.last_id + 1 || 1;
  return this.last_id;
}