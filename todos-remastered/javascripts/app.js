///////////////
// APP LOGIC //
///////////////

var storedList = fetchStoredList();
var app = ObjectFactory.newController();
app.updatePage();

// Improvements: 
// Convert modal data entry to drop downs