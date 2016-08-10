// We only want events to modify our model/objects
// Do we want to go so far as to have a page object? It might be nice. We could have the page object have a:
// -> main panel object (dynamic collection based on selection)
// -> 2 side panel objects (complete list, and incomplete list)
// -> Our view should only be able to modify data, right?

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

function writeTodo() {
	
}