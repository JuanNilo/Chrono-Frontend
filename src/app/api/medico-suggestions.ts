import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  // Aquí puedes implementar la lógica para buscar médicos que coincidan con el nombre
  const allMedics = ['Dr. Juan Pérez', 'Dra. Maria López', 'Dr. Pedro González'];
  const suggestions = allMedics.filter(medic => medic.toLowerCase().includes((name as string).toLowerCase()));

  res.status(200).json({ suggestions });
}
