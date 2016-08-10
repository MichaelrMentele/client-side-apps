/////////////
// Helpers //
/////////////

// Refector: push this to an init method on the renderer object
function intializeView() {
	var templateSelector = "script[type='text/x-handlebars']";
	var partialSelector = "[data-type=partial]";

	var viewRenderer = Object.create(Renderer);
	viewRenderer.getTemplates(templateSelector);
	viewRenderer.registerPartials(partialSelector);

	return viewRenderer;
}

// Refactor: push this to an init method??!?
function initializeModel() {
	// If you want more panels, add them here. Todos and other Categories
	// created dynamically at runtime.

	// Default Panels
	var AllTodos = Object.create(Panel);
	var CompleteTodos = Object.create(Panel);
	var panels = [];

	AllTodos.init({icon_path: "assets/todos_icon.png", title: "All Todos"});
	CompleteTodos.init({icon_path: "assets/completed_icon.png", title: "Completed"});

	panels.push(AllTodos);
	panels.push(CompleteTodos);

	// Sidebar Object
	var PageSidebar = Object.create(Sidebar);
	PageSidebar.init({panels});

	return PageSidebar;
}

///////////////
// APP LOGIC //
///////////////

var pageData = initializeModel();
var pageRenderer = intializeView();
var templates = pageRenderer.templates;

pageRenderer.sidebarPanels(pageData.panels);


// TESTING...
pageData.panels[0].createCategory({title: "1/1"});





////////////
// EVENTS //
////////////

// We only want events to modify our model/objects
// Do we want to go so far as to have a page object? It might be nice. We could have the page object have a:
// -> main panel object (dynamic collection based on selection)
// -> 2 side panel objects (complete list, and incomplete list)
// -> Our view should only be able to modify data, right?

// When we click on an object it should identify itself. So when I click on a category, it should say hey, I"m this category.
// That means when we are rendering it we need to save some data, or an id about itself. That way we can click
// know which item we have selected and thus where to get info to display to the main display. 
// We need to know:
// 		category ids 	-> display
// 		todo ids  		-> display
// This info already exists on the model in the form of an index. All we need to do is write it to html at render time. 
// That means adding it to our templates.

// PANEL
// On click of category, set class to selected and display it on main
// If a category is empty we shouldn't display it
// dynamically add categories based on new todos
// update todos counts

// MAIN
// On click of todo item, add modal class to bottom section as well as render form template
// On click of new todo item, add modal class to bottom section and render form (will be blank)
// click on trash can to delete object

// MODAL
// Bind events for making a todo item from a modal submission 
// -> save: will need to parse the modal form into an object
// -> markascomplete: same as save, also set complete to true
