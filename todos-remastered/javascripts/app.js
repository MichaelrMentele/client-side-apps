///////////////
// APP LOGIC //
///////////////

var storedList = fetchStoredList();
var app = ObjectFactory.newController();
app.updatePage();

// Sidebar: Bubble 'No Todo Date' category to the top
// Sidebar: Under Complete the sub category 'No Todo Date' should only display completed todos when selected
// Display: put completed todos on the bottom of the display on selection
