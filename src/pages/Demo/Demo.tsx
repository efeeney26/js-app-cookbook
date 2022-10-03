import React, { FC, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { getGreetingsThunk } from './slice/thunks';
import { greetingsSlice } from './slice/slice';
import pic from '../../assets/images/pic.png';
import { ActionsContainerStyled } from '../Main/Main.style';
import { Button } from '../../components';

export const Demo: FC = () => {
  const dispatch = useAppDispatch();
  const { data, syncActionData } = useAppSelector((state) => state.greetings);

  const handleAsyncActionClick = useCallback(() => {
    dispatch(getGreetingsThunk());
  }, [dispatch]);

  const handleSyncActionClick = useCallback(() => {
    dispatch(greetingsSlice.actions.syncReducer('syncData'));
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Демо-страница</h1>
        <img
          src={pic}
          alt="demo"
        />
      </div>
      <ActionsContainerStyled>
        <Button
          title="Нажми на кнопку на emotion для асинхронного экшна"
          onClick={handleAsyncActionClick}
        />
        <Button
          title="Нажми на кнопку на emotion для синхронного экшна"
          onClick={handleSyncActionClick}
        />
      </ActionsContainerStyled>
      {data?.title
        && <p>{data.title}</p>}
      <p>{syncActionData}</p>
    </>
  );
};

export default Demo;
