import Link from 'next/link';

const Secretary: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2">Pacientes</h2>
        <div className="grid gap-4">
          <Link href="/secretary/addPatient">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Agregar Paciente
            </button>
          </Link>
          <Link href="/secretary/bookPatient">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Agendar Paciente
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2">Médicos</h2>
        <div className="grid gap-4">
          <Link href="/secretary/addMedic">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Agregar Médico
            </button>
          </Link>
          <Link href="/secretary/watchAndModifyShifts">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Ver y Modificar Turnos
            </button>
          </Link>
          <Link href="/secretary/addBox">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Agregar o Eliminar Box
            </button>
          </Link>
          <Link href="/secretary/addSpeciality">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Agregar o Eliminar Especialidad
            </button>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 pb-2">Horas</h2>
        <div className="grid gap-4">
          <Link href="/secretary/confirmBooking">
            <button className="bg-secondaryColor hover:bg-[#63d4ab] text-gray-800 py-3 px-6 rounded shadow-md transition duration-300 ease-in-out">
              Confirmar Horas
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Secretary;
