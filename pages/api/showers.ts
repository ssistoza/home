import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus, PostRequest } from '../../lib/apiUtils';
import prisma from '../../lib/prisma';
import { Tally } from '../../lib/tally';

interface IShowerPostRequest extends PostRequest {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const tallyShower = await prisma.tally.findFirst({
    where: {
      tallyName: { is: { name: Tally.Shower } },
    },
  });

  switch (method) {
    case HttpMethod.GET:
      try {
        const showers = await prisma.tally.findMany({
          where: { tallyNameId: { equals: tallyShower.id } },
        });
        res.status(200).json(showers);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching showers' });
      }
      break;
    case HttpMethod.POST:
      try {
        const body: IShowerPostRequest = req.body;
        if (!body.shanesistoza) throw 'Not Shane!';

        const newShowerTally = await prisma.tally.create({
          data: { tallyNameId: tallyShower.id },
        });

        res.status(HttpStatus.CREATED).json(newShowerTally);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error posting showers' });
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
