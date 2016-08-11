///////////////
// APP LOGIC //
///////////////

// GLOBALS
var storedList;
var todoList;
var pageRenderer;
var pageIndex;

// INIT
storedList = Initializer.fetchStoredList();
todoList = Initializer.initializeModel(storedList);
pageRenderer = Initializer.intializeView();
pageIndex = Initializer.initializeIndex()

// RENDER AND BIND
pageRenderer.sidebarPanels(pageIndex);
$("#all_todos a[href='#selectable']").closest("tr").addClass("selected");
updatePage();
updateDisplay();
EventBinder.page();




