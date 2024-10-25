import { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  
  const generateId = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const addData = () => {
    if (name.trim()) {
      setData([...data, { id: generateId(), name }]);
      setName('');
    }
  };

  const deleteData = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const updateData = (id) => {
    setData(
      data.map(item =>
        item.id === id ? { ...item, name: editName } : item
      )
    );
    setEditId(null);
    setEditName('');
  };

  return (
    <div className="App">
      <h1>CRUD Table</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addData}>Add</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editId === item.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <button onClick={() => updateData(item.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => {
                      setEditId(item.id);
                      setEditName(item.name);
                    }}>Edit</button>
                    <button onClick={() => deleteData(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
