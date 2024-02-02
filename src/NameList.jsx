import React, { useState, useEffect } from 'react';
import './style.css';

const NameList = () => {
  const [nameInput, setNameInput] = useState('');
  const [names, setNames] = useState([]);

  useEffect(() => {
    const storedNames = localStorage.getItem('reactNames');
    if (storedNames) {
      setNames(JSON.parse(storedNames));
    }
  }, []);

  const addName = () => {
    if (nameInput.trim() !== '') {
      const updatedNames = [...names, { id: Date.now(), name: nameInput.trim() }];
      setNames(updatedNames);
      localStorage.setItem('reactNames', JSON.stringify(updatedNames));
      setNameInput('');
    }
  };

  const removeName = (id) => {
    const updatedNames = names.filter((item) => item.id !== id);
    setNames(updatedNames);
    localStorage.setItem('reactNames', JSON.stringify(updatedNames));
  };

  return (
    <div className="container">
      <h2>Список имён</h2>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        placeholder="Введите имя"
      />
      <button onClick={addName} className="addButton">
        Добавить
      </button>
      <ul className="nameList">
        {names.map((item) => (
          <li key={item.id} className="listItem">
            {item.name}
            <button onClick={() => removeName(item.id)} className="deleteButton">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;
