'use client'
import { useEffect, useState } from 'react';

const AddMedic: React.FC = () => {
  const [specialities, setSpecialities] = useState<{ id: number, name: string }[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState<number | null>(null);
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const date = '2024-06-12';

  // Fetch specialties when the component mounts
  useEffect(() => {
    fetch('https://backend-plataforma.onrender.com/api/specialities/medics')
    //fetch('/api/specialties') // testing API
      .then(response => response.json())
      .then(data => setSpecialities(data))
      .catch(error => console.error('Error fetching specialities:', error));
  }, []);

  const handleSubmit = () => {
    event?.preventDefault();
    fetch('https://backend-plataforma.onrender.com/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_speciality: selectedSpeciality, rut: rut, email: email, password: password, name: name, lastname: lastname, date: date}),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cambios guardados con éxito');
        } else {
          alert('Hubo un error al guardar los cambios');
        }
      })
      .catch(error => console.error('Error al crear médico:', error));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Agregar Médico</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <div>
            <label htmlFor="speciality" className="block text-sm font-medium text-gray-700">
              Especialidad
            </label>
            <select
              id="speciality"
              value={selectedSpeciality || ''}
              onChange={e => setSelectedSpeciality(Number(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Seleccione una especialidad
              </option>
              {specialities.map(speciality => (
                <option key={speciality.id} value={speciality.id}>
                  {speciality.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rut" className="block text-sm font-medium text-gray-700">
              RUT
            </label>
            <input
              type="text"
              id="rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          >
            Agregar Médico
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedic;
