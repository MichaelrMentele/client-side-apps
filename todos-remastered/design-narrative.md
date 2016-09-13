* features/functionality and UI
    - Largely taken care of in this project
    - Porting features, functionality, and UI to Backbone implementation
* Focusing Question: How am I going to reimplement with Backbone?
* Model.object relationship diagram
* Decided to make AllTodos and CompletedTodos fixed categories not rendered as a tempalte but modified by an event fired script on page update (render).

# Data Architecture
Their is a single list that contains todos. Based on categories selected in the sidebar we display a subset of the todos. 

# Caching vs. Runtime Categorization
If this app were to scale up such that you had hundreds or thousands of todos then perhaps it would become an issue in load time that we are generating our category counts and displayed todoes at runtime. When a category is selected an event handler is fired that uses RegEx to grab a copy of todos in that category. These categories are not saved.

This is essentially a tradeoff between initial load time, complexity, and space vs. extra computation. 

As our use case is unlikely to run into any performance issues I opted for runtime categorization for simplicity, robustness, and small initial load time.

# Object Relationships
[diagram]

# Views
There is a display view and a category view (sidebar). Based on category with the selected tag in our category view we pass a subset of the Todos collection to the display for rendering. A Todo view is rendered with a reference to the Todo on the collection.

# Challenges
- Delegating Events
- Generating Categories and Counts

# Delegating Events
This is just having a view trigger events on the app object which manages alterations to the data. This involved some lookup in the Backbone docs and a bit of googling.

# Generating Categories
This was a bit tricky because we needed to generate the categories repeatedly and save the selected state. I opted to use local storage instead of cluttering the DOM with a tag. 
