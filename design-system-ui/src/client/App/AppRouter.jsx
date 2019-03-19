import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from '../routes/Overview';
import Colors from '../routes/Colors';
import Typography from '../routes/Typography';
import Icons from '../routes/Icons';
import Alignments from '../routes/Alignments';
import Containers from '../routes/Containers';
import Components from '../routes/Components';
import Buttons from '../routes/Buttons';
import Forms from '../routes/Forms';
import Dialogs from '../routes/Dialogs';
import Uncategorized from '../routes/Uncategorized';
import JustInCase from '../routes/JustInCase';
import Navigation from '../routes/Navigation';
import FormPatterns from '../routes/FormPatterns';
import ReactComponents from '../routes/ReactComponents';

import NotFound from '../routes/NotFound';

/* eslint-disable jsx-a11y/alt-text */
const routes = [
  {
    path: '/',
    component: Overview,
  },
  {
    path: '/colors',
    component: Colors,
  },
  {
    path: '/typography',
    component: Typography,
  },
  {
    path: '/icons',
    component: Icons,
  },
  {
    path: '/alignments',
    component: Alignments,
  },
  {
    path: '/containers',
    component: Containers,
  },
  {
    path: '/components',
    component: Components,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/dialogs',
    component: Dialogs,
  },
  {
    path: '/uncategorized',
    component: Uncategorized,
  },
  {
    path: '/just-in-case',
    component: JustInCase,
  },
  {
    path: '/navigation',
    component: Navigation,
  },
  {
    path: '/form-patterns',
    component: FormPatterns,
  },
  {
    path: '/react-components',
    component: ReactComponents,
  },
];

export default () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.path} exact {...route} />
    ))}
    <Route component={NotFound} />
  </Switch>
);
