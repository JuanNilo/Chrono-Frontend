'use client'
import { useState, useEffect } from 'react';
import { Calendar } from '@nextui-org/calendar';
import { today, getLocalTimeZone } from "@internationalized/date";

const WatchAndModifyShifts: React.FC = () => {
  const [specialties, setSpecialties] = useState<{ id: number, name: string }[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [medics, setMedics] = useState<{ id: number, name: string, lastname: string }[]>([]);
  const [selectedMedic, setSelectedMedic] = useState<number | null>(null);
  const [boxes, setBoxes] = useState<{ id: number, number: string }[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [shifts, setShifts] = useState<{ time: string, available: boolean }[]>([]);
  const [modifiedShifts, setModifiedShifts] = useState<{ time: string, available: boolean }[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const morningTimes = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const afternoonTimes = ['13:00', '14:00', '15:00', '16:00', '17:00'];

  // Fetch specialties when the component mounts
  useEffect(() => {
    fetch('https://backend-plataforma.onrender.com/api/specialities/medics')
      .then(response => response.json())
      .then(data => setSpecialties(data))
      .catch(error => console.error('Error fetching specialties:', error));
  }, []);

  // Fetch medics when selectedSpecialty changes
  useEffect(() => {
    if (selectedSpecialty !== null) {
      fetch(`https://backend-plataforma.onrender.com/api/employees/speciality/${selectedSpecialty}`)
        .then(response => response.json())
        .then(data => setMedics(data))
        .catch(error => console.error('Error fetching medics:', error));
      // Reset selectedMedic, shifts, and selectedBox when the specialty changes
      setSelectedMedic(null);
      setShifts([]);
      setModifiedShifts([]);
      setSelectedBox(null);
    }
  }, [selectedSpecialty]);

  // Fetch shifts when selectedMedic or selectedDate changes
  useEffect(() => {
    if (selectedMedic !== null && selectedDate) {
      const formattedDate = selectedDate.toString(); // assuming selectedDate is a valid date string
      fetch(`https://backend-plataforma.onrender.com/api/schedules?medicId=${selectedMedic}&date=${formattedDate}`)
        .then(response => response.json())
        .then(data => {
          const fetchedShifts = data.shifts || [];
          const allShifts = [...morningTimes, ...afternoonTimes].map(time => {
            const shift = fetchedShifts.find((s: { initial_hour: string; }) => s.initial_hour === time);
            return shift ? { time: shift.initial_hour, available: shift.state } : { time, available: false };
          });
          setShifts(allShifts);
        })
        .catch(error => console.error('Error fetching shifts:', error));
      // Reset modifiedShifts when the medic or date changes
      setModifiedShifts([]);
    }
  }, [selectedMedic, selectedDate]);

  // Fetch boxes when the component mounts
  useEffect(() => {
    fetch('https://backend-plataforma.onrender.com/api/box')
      .then(response => response.json())
      .then(data => setBoxes(data))
      .catch(error => console.error('Error fetching boxes:', error));
  }, []);

  const handleShiftToggle = (time: string) => {
    setShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.time === time ? { ...shift, available: !shift.available } : shift
      )
    );
    const modifiedShift = modifiedShifts.find(shift => shift.time === time);
    if (modifiedShift) {
      setModifiedShifts(prevModifiedShifts =>
        prevModifiedShifts.map(shift =>
          shift.time === time ? { ...shift, available: !shift.available } : shift
        )
      );
    } else {
      setModifiedShifts([
        ...modifiedShifts,
        { time, available: !shifts.find(shift => shift.time === time)?.available },
      ]);
    }
  };

  const handleSaveChanges = () => {
    const shiftsToSend = modifiedShifts.map(shift => ({
      initial_hour: shift.time,
      final_hour: shift.time, // Assuming final_hour is the same as initial_hour, adjust as needed
      id_employee: selectedMedic,
      date: selectedDate.toString(),
      state: shift.available,
      id_box: selectedBox // Added selectedBox
    }));

    fetch('https://backend-plataforma.onrender.com/api/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shiftsToSend),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setMessage('Cambios guardados con éxito');
        } else {
          setMessage('Hubo un error al guardar los cambios');
        }
      })
      .catch(error => {
        console.error('Error saving shifts:', error);
        setMessage('Hubo un error al guardar los cambios');
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ver y Modificar Turnos</h2>
      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('error') ? 'bg-red-500' : 'bg-green-500'} text-white`}>
          {message}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
          Especialidad
        </label>
        <select
          id="specialty"
          value={selectedSpecialty || ''}
          onChange={e => setSelectedSpecialty(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            Seleccione una especialidad
          </option>
          {specialties.map(specialty => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>

      {selectedSpecialty !== null && (
        <div className="mb-4">
          <label htmlFor="medic" className="block text-sm font-medium text-gray-700">
            Médico
          </label>
          <select
            id="medic"
            value={selectedMedic || ''}
            onChange={e => setSelectedMedic(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Seleccione un médico
            </option>
            {medics.map(medic => (
              <option key={medic.id} value={medic.id}>
                {medic.name} {medic.lastname}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedMedic !== null && (
        <div className="mb-4">
          <label htmlFor="box" className="block text-sm font-medium text-gray-700">
            Box de Atención
          </label>
          <select
            id="box"
            value={selectedBox || ''}
            onChange={e => setSelectedBox(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Seleccione un box
            </option>
            {boxes.map(box => (
              <option key={box.id} value={box.id}>
                {box.number}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedMedic !== null && selectedBox !== null && (
        <div className="flex">
          <div className="mr-4">
            <h3 className="text-xl font-bold mb-4">Seleccione una fecha</h3>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4">Horarios de Trabajo</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Mañana</h4>
              <div className="flex flex-wrap gap-3">
                {morningTimes.map(time => {
                  const shift = shifts.find(s => s.time === time);
                  const isAvailable = shift ? shift.available : false;
                  return (
                    <div key={time} className="w-1/10 mb-2">
                      <button
                        onClick={() => handleShiftToggle(time)}
                        className={`py-2 px-4 rounded ${isAvailable ? 'bg-green-500' : 'bg-red-500'} text-white w-full`}
                      >
                        {time}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Tarde</h4>
              <div className="flex flex-wrap gap-3">
                {afternoonTimes.map(time => {
                  const shift = shifts.find(s => s.time === time);
                  const isAvailable = shift ? shift.available : false;
                  return (
                    <div key={time} className="w-1/10 mb-2">
                      <button
                        onClick={() => handleShiftToggle(time)}
                        className={`py-2 px-4 rounded ${isAvailable ? 'bg-green-500' : 'bg-red-500'} text-white w-full`}
                      >
                        {time}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchAndModifyShifts;

/* 'use client';
import Container from "@/components/ui/Container";
import { useState } from "react";
import {Calendar} from "@nextui-org/calendar";
import { TiDelete } from "react-icons/ti";
import {today, getLocalTimeZone} from "@internationalized/date";
import {parseDate} from '@internationalized/date';


interface Hour {
    id: number;
    hour: string;
}
export default function Page() {
    const [dateSelected, setDateSelected] = useState(today(getLocalTimeZone()));
    
    const morningDay = [
        {
            id: 1,
            hour: "8:00"
        },
        {
            id: 2,
            hour: "9:00"
        },
        {
            id: 3,
            hour: "10:00"
        },
        {
            id: 4,
            hour: "11:00"
        },
        {
            id: 5,
            hour: "12:00"
        }
    ]

    const lateDay = [
        {
            id: 1,
            hour: "14:00"
        },
        {
            id: 2,
            hour: "15:00"
        },
        {
            id: 3,
            hour: "16:00"
        },
        {
            id: 4,
            hour: "17:00"
        },
        {
            id: 5,
            hour: "18:00"
        }
    ]

    const [hoursSelected, setHoursSelected] = useState<Hour[]>([]);
    
    const handleDateChange = (date: Date) => {
        setDateSelected(today(getLocalTimeZone()));
    }

    const handleDeleteHour = (id: number) => () => {
        setHoursSelected(hoursSelected.filter(hour => hour.id !== id));
    }

    const defaultHour = () => {
        setDateSelected(today(getLocalTimeZone()));
    }

    return (
       <Container>
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-wrap justify-around h-full w-full">
                    <div className=" h-[60%] text-center  justify-center w-[40%] p-5">
                <h1 className="text-2xl font-bold">Selector de horario</h1>
                <p className="text-lg">Seleccione el dia que quiera registrar:</p>   
                <p className="text-lg">
                     {dateSelected.toString()}</p>
                     
                        <Calendar style={{marginTop:20}} aria-label="Date (Uncontrolled)" defaultValue={today(getLocalTimeZone())}
                            value={dateSelected} 
                            color="success"
                            onChange={setDateSelected} 
                        />
                        
                    </div>            
                    { Contenedor de Horas }
                    <div className="mt-10 text-center h-full  w-[40%] p-5">
                        <h1 className="text-2xl font-bold">Jornadas</h1>
                        <p className="text-lg">Seleccione el horario:</p>   
                        <section className="flex flex-wrap justify-around h-[80%]">
                        { Seccion de jornadas }
                        <div className=" flex flex-col flex-col-2 gap-7 my-auto w-[30%]">
                            <button onClick={()=> setHoursSelected(morningDay)} className=" rounded-md font-bold hover:bg-emerald-500 hover:text-white cursor-pointer border-gray-300 border-[1px] shadow-lg w-32 h-16 flex items-center justify-center">
                                <p>8:00 - 12:00</p>
                            </button>
                            <button onClick={()=> setHoursSelected(lateDay)} className=" rounded-md font-bold hover:bg-emerald-500 hover:text-white cursor-pointer border-gray-300 border-[1px] shadow-lg w-32 h-16 flex items-center justify-center">
                                <p>14:00 - 18:00</p>
                            </button>
                        </div>
                        
                            { Horas seleccionadas }
                            <div className="w-[50%] justify-center">
                                {hoursSelected.map((hour, index) => (
                                    <div key={index} className="rounded-md font-bold w-20 h-16 flex items-center justify-between">
                                        <p>{hour.hour}</p>
                                        <button onClick={handleDeleteHour(hour.id)}>
                                            <TiDelete className="hover:cursor-pointer" size={20} />
                                        </button>
                                    </div>
                                ))    
                                }
                            </div>
                        </section>
                        <div className=" flex mx-auto justify-center">
                            <button className="bg-emerald-500 text-white rounded-md font-bold hover:bg-emerald-600 cursor-pointer border-gray-300 border-[1px] shadow-lg w-24 h-12 flex items-center justify-center">
                                <p>Confirmar</p>
                            </button>
                        </div>
                    </div>
                </div>
              </div>
        </Container>
    )
} */