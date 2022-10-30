import React, { FC, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../store';
import { syncSlice } from './slice/slice';
import { getSyncData } from './slice/selectors';
import pic from '../../assets/images/pic.png';
import { ActionsContainerStyled } from './Demo.style';
import { Button } from '../../components';
import { useLazyGetGreetingsQuery } from '../../services';

export const Demo: FC = () => {
  const dispatch = useAppDispatch();
  const [getGreetingsQuery, { data }] = useLazyGetGreetingsQuery();
  const syncActionData = useAppSelector(getSyncData);

  const handleAsyncActionClick = useCallback(async () => {
    await getGreetingsQuery();
  }, [getGreetingsQuery]);

  const handleSyncActionClick = useCallback(() => {
    dispatch(syncSlice.actions.syncReducer('syncData'));
  }, [dispatch]);

  return (
    <Box pt={3} minHeight="100vh">
      <>
        <Typography variant="h3">Демо-страница</Typography>
        <img
          src={pic}
          alt="demo"
        />
      </>
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
    </Box>
  );
};

export default Demo;
