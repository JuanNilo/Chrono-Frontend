'use client';

import { useState, useEffect } from 'react';

const AddSpeciality: React.FC = () => {
  const [specialities, setSpecialities] = useState<{ id: number, name: string, salary: string }[]>([]);
  const [newSpecialityName, setNewSpecialityName] = useState('');
  const [newSpecialitySalary, setNewSpecialitySalary] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch specialities when the component mounts
  useEffect(() => {
    fetch('https://backend-plataforma.onrender.com/api/specialities')
      .then(response => response.json())
      .then(data => setSpecialities(data))
      .catch(error => setError('Error fetching specialities'));
  }, []);

  const handleAddSpeciality = () => {
    if (!newSpecialityName || !newSpecialitySalary) {
      setError('Ambos campos son requeridos');
      return;
    }

    fetch('https://backend-plataforma.onrender.com/api/specialities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newSpecialityName, salary: newSpecialitySalary }),
    })
      .then(response => response.json())
      .then(data => {
        setSpecialities([...specialities, data]);
        setNewSpecialityName('');
        setNewSpecialitySalary('');
        setMessage('Especialidad agregada correctamente');
        setError('');
      })
      .catch(error => setError('Error agregando especialidad'));
  };

  const handleDeleteSpeciality = (id: number) => {
    fetch(`https://backend-plataforma.onrender.com/api/specialities/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setSpecialities(specialities.filter(speciality => speciality.id !== id));
          setMessage('Especialidad eliminada correctamente');
          setError('');
        } else {
          throw new Error('Error eliminando especialidad');
        }
      })
      .catch(error => setError('Error eliminando especialidad'));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestionar Especialidades Médicas</h2>
      
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label htmlFor="newSpecialityName" className="block text-sm font-medium text-gray-700">
          Nombre de la nueva especialidad
        </label>
        <input
          id="newSpecialityName"
          type="text"
          value={newSpecialityName}
          onChange={e => setNewSpecialityName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newSpecialitySalary" className="block text-sm font-medium text-gray-700">
          Salario de la nueva especialidad
        </label>
        <input
          id="newSpecialitySalary"
          type="text"
          value={newSpecialitySalary}
          onChange={e => setNewSpecialitySalary(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleAddSpeciality}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
      >
        Agregar Especialidad
      </button>

      <h3 className="text-xl font-bold mb-4">Especialidades Existentes</h3>
      <ul>
        {specialities.map(speciality => (
          <li key={speciality.id} className="mb-4">
            <div className="flex justify-between items-center">
              <span>{speciality.name} - ${speciality.salary}</span>
              <button
                onClick={() => handleDeleteSpeciality(speciality.id)}
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

export default AddSpeciality;
