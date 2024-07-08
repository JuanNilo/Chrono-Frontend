const BlockShifts: React.FC = () => {

    //Enviar al backends la información del turno bloqueado, preguntar espcialidad, luego medico, luego fecha
    //y enviar al back
    return (
        <div className="container mx-auto p-4">
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Médicos</h2>
            <div className="flex flex-col space-y-2">
            <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                //onClick={ }
            >
                Bloquear Turno
            </button>
            </div>
        </div>
        </div>
    );
}

export default BlockShifts;