import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { addData, deleteData, updateData } from './store';

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  
  const generateId = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const handleAdd = () => {
    if (name.trim()) {
      dispatch(addData({ id: generateId(), name }));
      setName('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
  };

  const handleUpdate = (id) => {
    dispatch(updateData({ id, name: editName }));
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
        <button onClick={handleAdd}>Add</button>
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
                  <button onClick={() => handleUpdate(item.id)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => {
                      setEditId(item.id);
                      setEditName(item.name);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
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
