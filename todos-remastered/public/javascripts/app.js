var App = {
  templates: JST,
  init: function() {
    // Get Todos Collection
    // !!! Add loading feature
    this.todos = new TodoList();
    this.todos.comparator = "dueDate";

    // Start app with all todos category selected
    $("#all_todos tr").addClass("selected");

    // Bind Add New Todo button
    $("#new_todo").on("click", function(e) {
      e.preventDefault();

      // !!! Open up modal
      console.log("New todos button is bound");
    });

    // Render Todos list
    this.render();
  },
  render: function() {
    // Clear Display View
    // Render Categories
    // Get Selected Category
    var selectedCategoryTitle = $("tr.selected h2").text();
    var category = this.getCategory(selectedCategoryTitle);

    // Get sublist based on that category
    var sublist = this.todos;

    // Render Main Display
    this.renderHeaderView({title: "All Todos", todo_count: this.todos.length}) // !!! should have contect of selected
    this.todos.each(this.renderTodoView);

    // Bind Events
  },
  renderTodoView: function(todo) {
    new TodoView ({
      model: todo,
    });
  },
  renderHeaderView: function(pageInfo) {
    $("#page_info").html(new MainHeaderView(pageInfo).el);
  },
  renderTodosCategories: function() {
    
  },
  renderCompletedTodosCategories: function() {

  },
  getCategory: function(selectedTitle) {
    if (selectedTitle === "All Todos") {
      return {};
    } else if (selectedTitle === "Completed") {
      return {complete: true};
    } else {
      // Categories should be their own view 
    }
  }
}

var ModalHelpers = {
  getModalInput: function() {
    var title = $("#title_input").val();
    var day = $("#date_inputs > input").val();
    var month = $("#date_inputs > input").next().next().val();
    var year = $("#date_inputs input:last-child").val();
    var description = $("textarea").val();

    if (year != "" && month != "" && day != "") {
      var dueDate = new Date(year, month - 1, day); // Date takes a month as a 0 based index 0 - 11
    }
    

    return {title: title, dueDate: dueDate, description: description};
  },
  cleanUpModal: function() {
    $("#modal").removeClass("modal");
    $("#modal").empty();
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
}
