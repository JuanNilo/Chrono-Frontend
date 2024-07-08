import { NextRequest, NextResponse } from 'next/server';

// Ejemplo de datos de turnos
const shifts = [
  { medicId: 1, date: '2024-06-06', time: '08:00', available: true },
  { medicId: 1, date: '2024-06-06', time: '09:00', available: false },
  // ... otros turnos
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const medicId = Number(searchParams.get('medicId'));
  const date = searchParams.get('date');

  const filteredShifts = shifts.filter(shift => shift.medicId === medicId && shift.date === date);
  return NextResponse.json({ shifts: filteredShifts });
}
