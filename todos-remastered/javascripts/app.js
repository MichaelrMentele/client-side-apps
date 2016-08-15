///////////////
// APP LOGIC //
///////////////

// function init() {
	// Create todoList
	var storedList = ObjectFactory.fetchStoredList();
	var superCategories = ObjectFactory.newPanels();
	var todoList = ObjectFactory.newTodoList(storedList);
	todoList.superCategories = superCategories;

	var pageRenderer = ObjectFactory.newRenderer();

	var controller = Object.create(Controller)
	controller.init({pageRenderer: pageRenderer, todoList: todoList});

	pageRenderer.sidebarPanels(todoList.superCategories);
	$("#all_todos a[href='#selectable']").closest("tr").addClass("selected"); // sets all todos to 'selected'
	controller.updatePage(todoList.superCategories);
	pageRenderer.updateDisplay();

	
// }

// init();
controller.page();


