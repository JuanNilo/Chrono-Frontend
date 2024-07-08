import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  // Aquí puedes implementar la lógica para obtener la disponibilidad del médico
  const availability = [
    { day: 'Lunes', times: ['10:00', '11:00', '12:00'] },
    { day: 'Martes', times: ['09:00', '10:00', '11:00'] },
    { day: 'Miércoles', times: ['14:00', '15:00', '16:00'] },
  ];

  res.status(200).json({ availability });
}
