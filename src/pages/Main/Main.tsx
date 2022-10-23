import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { navigation } from '../../routes/navigation';

const Main: FC = () => (
  <>
    <h1>Привет, это главная</h1>
    <nav>
      {navigation.map(({ to, title }) => (
        <Link key={to} to={to}>
          <p>{title}</p>
        </Link>
      ))}
    </nav>

  </>
);

export default Main;
