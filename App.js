import * as React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './screens/home';
import Forgotpword from './screens/forgotpword';
import Splash from './screens/splash';
import Pin from './screens/pin';
import Resetpassword from './screens/resetpassword';
import Passwordreset from './screens/passwordreset';
import Tripended from './screens/tripended';
import Waybillprinted from './screens/waybillprinted';
import Passwordupdated from './screens/passwordupdated';
import Profileupdated from './screens/profileupdated';
import Myprofile from './screens/myprofile';
import Incidence from './screens/incidence';
import Deliveries from './screens/deliveries';
import Maintenance from './screens/maintenance';
import Schedule from './screens/schedule';
import Diesel from './screens/diesel';
import Acknowlegdement from './screens/acknowlegdement';
import Break from './screens/break';
import Trucks from './screens/trucks';
import Truckcheck from './screens/truckcheck';
import Incidencedetails from './screens/incidencedetails';
import Selectasistant from './screens/selectasistant';
import Workroster from './screens/workroster';
import Journeyprog from './screens/journeyprog';
import Incidentlog from './screens/incidentlog';
import Updatepword from './screens/updatepword';
import Interiorchecks from './screens/interiorchecks';
import Editprofile from './screens/editprofile';
import Dashboard from './screens/dashboard';
import Tripmetric from './screens/tripmetric';
import Progressive from './screens/progressive';
Icon.loadFont();
const AppNavigator = createStackNavigator(
  {
    Home,
    Forgotpword,
    Pin,
    Resetpassword,
    Passwordreset,
    Tripended,
    Waybillprinted,
    Passwordupdated,
    Profileupdated,
    Myprofile,
    Incidence,
    Deliveries,
    Maintenance,
    Schedule,
    Diesel,
    Acknowlegdement,
    Break,
    Trucks,
    Truckcheck,
    Incidencedetails,
    Selectasistant,
    Workroster,
    Journeyprog,
    Incidentlog,
    Updatepword,
    Interiorchecks,
    Editprofile,
    Dashboard,
    Tripmetric,
    Progressive,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      activeIntColor: 'red',
    },
  },
);

const MainNavigator = createSwitchNavigator({
  Splash,
  AppNavigator,
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
