import React, { FC, useCallback } from 'react';

import pic from '../../assets/images/pic.png';
import { Button } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';
import { getGreetingsThunk } from './slice/thunks';
import { greetingsSlice } from './slice/slice';
import { ActionsContainerStyled } from './Main.style';

const Main: FC = () => {
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

export default Main;
