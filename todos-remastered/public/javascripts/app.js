var App = {
  // Control logic and page view management.
  templates: JST,
  init: function() {
    this.todos = new TodoList(); // !!! Add loading feature
    this.todos.comparator = "dueDate"; // !!! What about completed items bubbling to bottom

    this.renderSidebar();    
    $("#all_todos table thead tr").addClass("selected"); // Start app with all todos category selected
    this.renderTodoList(this.todos);
 
    this.bindNewTodo();
    this.bindListenForEdit();
    this.bindUpdateOnChange();
  },
  editTodo: function(todo) {
    console.log("editing");
    this.renderEditor(true, todo.toJSON());
  },
  bindNewTodo: function() {
    var self = this;
    $("#new_todo").on("click", function(e) {
      e.preventDefault();
      console.log("Adding Todo...")
      self.renderEditor();
    });
  },
  bindListenForEdit: function() {
    this.on("editTodo", this.editTodo);
  },
  bindUpdateOnChange: function() {
    this.listenTo(this.todos, "change add remove", this.render);
  },
  render: function() {
    console.log("Updating Page...");
    this.renderSidebar();

    // Bind Select Event
    var self = this;
    $("a.selectable").on("click", function(e) {
      e.preventDefault();
      console.log("selected")
      $(".selected").removeClass("selected");
      $(e.target.closest("tr")).addClass("selected");
      localStorage.setItem("selected", $(".selected").attr("id"))
      self.render();
    }); 

    // Get Sublist
    var id = localStorage.getItem("selected");
    var sublist = this.todos.getSublist(id);

    this.renderTodoList(sublist);
  },
  renderSidebar: function() {
    // Save Selected
    localStorage.setItem("selected", $(".selected").attr("id"))

    // Get/Create Categories
    // [{id: superID + index, title: string, todo_count: int}..]
    var allSubCats = this.todos.generateCategories("all", this.todos); 
    var completedSubCats = this.todos.generateCategories("completed", this.todos.getCompleted());
  
    // Render Sidebar
    this.renderTodosCategories(allSubCats);
    this.renderCompletedTodosCategories(completedSubCats);

    // Reselect
    var id = localStorage.getItem("selected");
    $("#" + id).addClass("selected");
  },
  renderTodosCategories: function(subCategories) {
    new CategoryView({
      id: "all",
      container: "#all_todos", 
      iconPath: "todos_icon.png", 
      title: "All Todos", 
      todosCount: this.todos.length}, subCategories)
  },
  renderCompletedTodosCategories: function(subCategories) {
    new CategoryView({
      id: "completed",
      container: "#completed_todos", 
      iconPath: "completed_icon.png", 
      title: "Completed", 
      todosCount: this.todos.getCompleted().length}, subCategories)
  },
  renderTodoList: function(sublist) {
    // Get Selected Category
    var selectedCategoryTitle = $("tr.selected a").text();

    // Render Main Display
    this.renderHeaderView({title: selectedCategoryTitle, todo_count: sublist.length}) // !!! should have contect of selected
    $("#todos").empty();
    sublist.forEach(this.renderTodoView);
  },
  renderTodoView: function(todo) {
    new TodoView ({
      model: todo,
    });
  },
  renderHeaderView: function(pageInfo) {
    $("#page_info").html(new MainHeaderView(pageInfo).el);
  },
  renderEditor: function(editMode, todo) {
    console.log("Rendering");
    $("#modal").addClass("modal");
    $("#modal").html((new ModalView(editMode, todo)).el)
  },
}

_.extend(App, Backbone.Events);
