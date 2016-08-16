///////////////
// APP LOGIC //
///////////////

var storedList = fetchStoredList();
var app = ObjectFactory.newController();
app.updatePage();

// Sidebar: Bubble 'No Todo Date' category to the top
// Display: put completed todos on the bottom of the display on selection
// Todos should have an ID that is written at a data attribute and that should be what is used to delete them