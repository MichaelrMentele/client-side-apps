var ModalView = Backbone.View.extend({
  template: App.templates.modal,
  initialize: function(editMode, todo) {
    this.render(editMode, todo);
    this.bindEvents(editMode);
  },
  render: function(editMode, todo) {
    var mode = {editMode: editMode || false};
    var editorInfo = $.extend(mode, todo);

    this.el = this.template(editorInfo);
  },
  bindEvents: function(editMode) {
    var self = this;
    $("#modal").on("click", function(e) {
      var target = e.target
      var $test = $(target.closest(e.target.localName));
      var result = $test.parents("div.form")[0];      
      if(result === undefined || result.localName + "." + result.className !== "div.form") {
        self.cleanUp();
      } else if (target.id === "save_todo") {
        editMode ? self.update() : self.save();
      } else if (target.id === "save_and_complete_todo") {
        editMode ? self.update(true) : self.saveAndComplete();
      }
    });
  },
  cleanUp: function() {
    $("#modal").unbind()
    $("#modal").removeClass("modal");
    $("#modal").empty();
  },
  update: function(markComplete) {
    var id = +$("div.form").data().id;
    App.todos.findWhere({id: id}).set(this.getModalInput(markComplete));
    this.cleanUp();
  },
  save: function(markComplete) {
    App.todos.add(this.getModalInput(markComplete || false));
    this.cleanUp();
  },
  saveAndComplete: function() {
    this.save(true);
  },
  getModalInput: function(markComplete) {
    var title = $("#title_input").val();
    
    var date = $("#date_inputs > input").val();
    var month = $("#date_inputs > input").next().next().val();
    var year = $("#date_inputs input:last-child").val();

    if (this.valid(date) || this.valid(month) || this.valid(year)) {
      var dueDate = moment().year(this.valid(year))
                            .month(+this.valid(month) - 1)
                            .date(this.valid(date)); 
    }
    
    var description = $("textarea").val();

    return {
      title: this.valid(title), 
      dueDate: dueDate, 
      description: description, 
      complete: markComplete};
  },
  valid(string) {
    string === "" ?  string = undefined : string = string; 
    return string;
  },
  importTodoInfo: function(todo) {
    var title = todo.title;
    var description = todo.description;

    $("#title_input").val(title);
    $("textarea").val(description);

    if (todo.hasDueDate) {
      var day = todo.getDay();
      var month = todo.getMonth();
      var year = todo.getYear();

      $("#date_inputs > input").val(day);
      $("#date_inputs > input").next().next().val(month);
      $("#date_inputs input:last-child").val(year);
    }
  },
});
