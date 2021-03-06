import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus, PostRequest } from '../../lib/utils';
import prisma from '../../lib/prisma';
import { TallyCategory } from '@prisma/client';

interface IDogBonePostRequest extends PostRequest {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case HttpMethod.GET:
      try {
        const showers = await prisma.tally.findMany({
          where: { category: { equals: TallyCategory.DogBone } },
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
        if (!body.isShane) {
          res.status(HttpStatus.UNAUTHORIZED).end('You are not Shane!');
          return;
        }

        const newDogBoneTally = await prisma.tally.create({
          data: { category: TallyCategory.DogBone },
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
