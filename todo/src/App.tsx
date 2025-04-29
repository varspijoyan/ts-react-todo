import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Your todos</h1>
      <div className="input-container">
        <input type="text" name="addTodo" placeholder="Add todo" />
        <button className="add-btn">Add</button>
      </div>
      <div className="todos">
        <div className="todo">
          <p>Something to add here</p>
          <div className="buttons">
            <button className="edit-btn"><span className="icon-pencil"></span></button>
            <button className="delete-btn"><span className="icon-bin"></span></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
