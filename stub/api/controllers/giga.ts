import GigaChat from 'gigachat';
import { config } from 'dotenv';
import { Agent } from 'node:https';
import { Request, Response } from 'express';

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

config();

export const getGigaResponse = async (request: Request, response: Response) => {
  const photo = request.file;
  const client = new GigaChat({
    model: 'GigaChat-Pro',
    httpsAgent,
  });
  const file = new File([photo?.buffer as BlobPart], 'photo', { type: photo?.mimetype });
  const uploadedFile = await client.uploadFile(file);
  await client.updateToken();
  const resp = await client.chat({
    messages: [
      {
        role: 'user',
        content: 'Напиши ответ в виде объекта { quality: качество фото в процентах, content: кратко опиши что на фото }',
        attachments: [uploadedFile.id],
      },
    ],
  });
  response.send({
    gigaResponse: resp.choices[0]?.message.content,
  });
};
