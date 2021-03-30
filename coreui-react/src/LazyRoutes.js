import React from 'react';




const Projects = React.lazy(() => import('./views/Projects/Projects'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const LazyRoutes = [
  { path: '/base/projects', name: 'Projects', component: Projects },
];



export default LazyRoutes;
