import GigaChat from 'gigachat';
import { config } from 'dotenv';
import { Agent } from 'node:https';
import { Request, Response } from 'express';

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

config();

async function main() {
  const client = new GigaChat({
    timeout: 600,
    model: 'GigaChat',
    httpsAgent,
  });
  await client.updateToken();
  const resp = await client.chat({
    messages: [{ role: 'user', content: 'Привет, как дела?' }],
  });
  return resp.choices[0]?.message.content;
}

export const getGigaResponse = async (request: Request, response: Response) => {
  const gigaResponse = await main();
  response.send({
    gigaResponse,
  });
};
