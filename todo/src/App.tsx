import { useEffect, useState } from "react";
import "./App.css";

const set = new Set<number>();

function generateRandomId() {
  let id:number;

  do {
    id = Math.floor(Math.random() * 1000000);
  } while (set.has(id));

  set.add(id);
  return id;
}

type Todo = {
  id: number;
  title: string;
};

function App() {
  // States
  const [todo, setTodo] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [inputValue, setInputValue] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editById, setEditById] = useState<number | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>("");

  // Functions
  const handleAddTodo = () => {
    if (inputValue !== "") {
      setTodo((prev: Todo[]) => [
        ...prev,
        {
          id: generateRandomId(),
          title: inputValue,
        },
      ]);
    }
    setInputValue("");
  };

  const handleEditTodo = (id: number, newTitle: string) => {
    setTodo((prev: Todo[]) =>
      prev.map((item: Todo) =>
        id === item.id ? { ...item, title: newTitle } : item
      )
    );
    setIsEditMode(false);
    setEditById(null);
  };

  const handleDeleteTodo = (id: number) => {
    setTodo((prev: Todo[]) => prev.filter((item: Todo) => id !== item.id));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="container">
      <h1 className="title">Your todos</h1>
      <div className="input-container">
        <input
          type="text"
          name="addTodo"
          placeholder="Add todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <div className="todos">
        {todo.length > 0 ? (
          todo.map((item: Todo) => (
            <div className="todo" key={item.id}>
              {isEditMode && editById === item.id ? (
                <>
                  <input
                    type="text"
                    name="edit"
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                  />
                  <button
                    className="save-btn"
                    onClick={() => handleEditTodo(item.id, editInputValue)}
                  >
                    <span className="icon-checkmark"></span>
                  </button>
                </>
              ) : (
                <>
                  <p>{item.title}</p>
                  <div className="buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setIsEditMode(true);
                        setInputValue("");
                        setEditById(item.id);
                        setEditInputValue(item.title);
                      }}
                    >
                      <span className="icon-pencil"></span>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTodo(item.id)}
                    >
                      <span className="icon-bin"></span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No todos added yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
