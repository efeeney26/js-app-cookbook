import GigaChat from 'gigachat';
import { config } from 'dotenv';

config();

export const main = async () => {
  const client = new GigaChat({
    timeout: 600,
    model: 'GigaChat',
    credentials: process.env.GIGA_AUTHORIZTION_KEY,
    dangerouslyAllowBrowser: true,
  });
  const resp = await client.chat({
    messages: [{ role: 'user', content: 'Привет, как дела?' }],
  });
  console.log(resp.choices[0]?.message.content);
};
