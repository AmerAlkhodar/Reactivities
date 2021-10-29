import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestErrors';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import UnAuthorized from '../../features/errors/UnAuthorized';


function App() {

  const Location = useLocation();
  const {commonStore , userStore} = useStore();

  useEffect(() => {
      if(commonStore.token){
        userStore.getUser().finally(() => commonStore.setAppLoaded())
      }else {
        commonStore.setAppLoaded();
      }
  } , [userStore , commonStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading user information...'/>

  

  return (

    
    
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer/>

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            {userStore.user ?
            <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={Location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
              <Route path='/errors' component={TestErrors} />
              <Route path='/login' component={LoginForm} />
              <Route path='/server-error' component={ServerError} />
              <Route path='/not-found' component={NotFound} />
            </Switch>
          </Container>
          </>
            : <UnAuthorized/>}
           

          </>
        )} />
    </>
  );
}



export default observer(App);
