'use client';

import { useState, useEffect } from 'react';

const AddBox: React.FC = () => {
  const [boxes, setBoxes] = useState<{ id: number, number: string }[]>([]);
  const [newBoxNumber, setNewBoxNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch boxes when the component mounts
  useEffect(() => {
    fetch('https://backend-plataforma.onrender.com/api/box')
      .then(response => response.json())
      .then(data => setBoxes(data))
      .catch(error => setError('Error fetching box'));
  }, []);

  const handleAddBox = () => {
    if (!newBoxNumber) {
      setError('Debe ingresar un número de box');
      return;
    }

    fetch('https://backend-plataforma.onrender.com/api/box', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: newBoxNumber }),
    })
      .then(response => response.json())
      .then(data => {
        setBoxes([...boxes, data]);
        setNewBoxNumber('');
        setMessage('Box añadido exitosamente');
        setError('');
      })
      .catch(error => setError('Error al agregar box'));
  };

  const handleDeleteBox = (id: number) => {
    fetch(`https://backend-plataforma.onrender.com/api/box/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setBoxes(boxes.filter(box => box.id !== id));
          setMessage('Box eliminado exitosamente');
          setError('');
        } else {
          throw new Error('Error borrando box');
        }
      })
      .catch(error => setError('Error borrando box'));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestionar Boxes de Consulta Médica</h2>
      
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label htmlFor="newBoxNumber" className="block text-sm font-medium text-gray-700">
          Número del nuevo Box
        </label>
        <input
          id="newBoxNumber"
          type="text"
          value={newBoxNumber}
          onChange={e => setNewBoxNumber(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddBox}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
        >
          Agregar Box
        </button>
      </div>

      <h3 className="text-xl font-bold mb-4">Box Existentes</h3>
      <ul>
        {boxes.map(box => (
          <li key={box.id} className="mb-4">
            <div className="flex justify-between items-center">
              <span>Box {box.number}</span>
              <button
                onClick={() => handleDeleteBox(box.id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddBox;
