import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import AppContext from '../../store/context';

interface Props extends RouteProps {
  children: any;
}

export default function PrivateRoute({ children, ...rest }: Props) {
  const context = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        context.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
