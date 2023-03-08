import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/login';
import Student from '../pages/Student';
import Students from '../pages/Students';
import Register from '../pages/Register';
import Photos from '../pages/Photos';
import Page404 from '../pages/page404';

export default function routes() {
  return (
    <Switch>
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/Register" component={Register} isClosed={false} />

      <MyRoute exact path="/" component={Students} isClosed={false} />
      <MyRoute exact path="/students" component={Student} isClosed />
      <MyRoute exact path="/students/:id" component={Student} isClosed />

      <MyRoute exact path="/Photos/:id" component={Photos} isClosed />

      <MyRoute path="*" component={Page404} isClosed={false} />
    </Switch>
  );
}
