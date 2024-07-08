const AddOverbooking: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Horas</h2>
            <div className="flex flex-col space-y-2">
            <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                //onClick={ }
            >
                Agregar Sobrecupo
            </button>
            </div>
        </div>
        </div>
    );
}

export default AddOverbooking;