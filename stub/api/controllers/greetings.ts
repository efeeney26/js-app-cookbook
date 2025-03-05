import { Request, Response } from 'express';

export const getGreetings = (request: Request, response: Response) => {
  setTimeout(() => {
    response.send({
      title: 'Привет, я с сервера!',
    });
  }, 1000);
};
