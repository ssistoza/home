import { Tally, TallyCategory } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpMethod, HttpStatus, PostRequest } from '../../lib/utils';
import prisma from '../../lib/prisma';

interface IShowerPostRequest extends PostRequest {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case HttpMethod.GET:
      try {
        const { removeTest } = req.query;
        const shouldRemoveTestData = Boolean(removeTest);

        let showers: Tally[] = [];
        if (shouldRemoveTestData) {
          showers = await prisma.tally.findMany({
            where: {
              category: { equals: TallyCategory.Shower },
              isTestData: { equals: false },
            },
          });
        } else {
          showers = await prisma.tally.findMany({
            where: {
              category: { equals: TallyCategory.Shower },
            },
          });
        }

        res.status(HttpStatus.OK).json(showers);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching showers' });
      }
      break;
    case HttpMethod.POST:
      console.log('TEST: ', req);
      try {
        const body: IShowerPostRequest = req.body;
        console.log('TEST: ', body);
        if (!body.isShane) {
          return res.status(HttpStatus.UNAUTHORIZED).end('You are not Shane!');
        }

        const newShowerTally = await prisma.tally.create({
          data: { category: TallyCategory.Shower, isTestData: body.isTest },
        });

        res.status(HttpStatus.CREATED).json(newShowerTally);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error posting showers' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
