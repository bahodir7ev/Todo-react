import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Create Figma design',
      isDone: false,
    },
    {
      id: 2,
      title: 'Write HTML code',
      isDone: false,
    },
    {
      id: 3,
      title: 'Create Figma design',
      isDone: false,
    },
  ]);
  const [editedElement, setEditedElement] = useState(null);
  const [editedElementIndex, setEditedElementIndex] = useState(null);

  function generateId() {
    return todos.length ? todos[todos.length - 1].id + 1 : 1;
  }

  function handleAdd(e) {
    e.preventDefault();

    if (title.trim() === '') {
      alert("Maydon bo'sh");
    } else {
      if (editedElement !== null) {
        const updatedTodos = todos.map((item, index) =>
          index === editedElementIndex ? { ...item, title: title } : item
        );
        setTodos(updatedTodos);

        setEditedElement(null);
        setEditedElementIndex(null);
      } else {
        const newTodo = {
          id: generateId(),
          title: title,
          isDone: false,
        };

        setTodos([...todos, newTodo]);
      }
      setTitle('');
    }
  }

  function handleDelete(id) {
    setTodos(todos.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    const index = todos.findIndex((item) => item.id === id);
    const element = todos[index];
    setEditedElement(element);
    setEditedElementIndex(index);
    setTitle(element.title);
  }

  return (
    <div className='panel-todo'>
      <form className='panel-both'>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write smth..."
          value={title}
          className='panel-todo-input'
        />
        <button onClick={handleAdd} className='panel-todo-btn'>
          {editedElement !== null ? 'Edit todo' : 'Add todo'}
        </button>
      </form>

      <ol className='panel-todo-lists'>
        {todos.map((item) => (
          <li key={item.id} className='panel-todo-list'>
            <span>{item.title}</span>
            <button onClick={() => handleDelete(item.id)} className='panel-todo-delete'>Delete</button>
            <button onClick={() => handleEdit(item.id)} className='panel-todo-edit'>Edit</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;