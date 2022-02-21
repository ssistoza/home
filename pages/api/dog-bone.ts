import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus, PostRequest } from '../../lib/apiUtils';
import prisma from '../../lib/prisma';
import { Tally } from '../../lib/tally';

interface IDogBonePostRequest extends PostRequest {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const tallyDogBone = await prisma.tally.findFirst({
    where: {
      tallyName: { is: { name: Tally.DogBone } },
    },
  });

  switch (method) {
    case HttpMethod.GET:
      try {
        const showers = await prisma.tally.findMany({
          where: { tallyNameId: { equals: tallyDogBone.id } },
        });
        res.status(200).json(showers);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching showers' });
      }
      break;
    case HttpMethod.POST:
      try {
        const body: IDogBonePostRequest = req.body;
        if (!body.shanesistoza) throw 'Not Shane!';

        const newDogBoneTally = await prisma.tally.create({
          data: { tallyNameId: tallyDogBone.id },
        });

        res.status(HttpStatus.CREATED).json(newDogBoneTally);
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
