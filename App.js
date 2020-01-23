//import "@babel/polyfill";
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import SearchPage from './screens/SearchPage/SearchPage';
import ListJobsView from './screens/ListJobsView/ListJobsView';
import DetailsView from './screens/DetailsView/DetailsView';
import AddView from './screens/AddView/AddView';
import ListSimilar from './components/ListSimilar/ListSimilar';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
const store = configureStore();


export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();  
  }
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <AppContainer />
      </Provider>
    )
  }
}

const AppNavigator = createStackNavigator({
  SearchPage: { screen: SearchPage, navigationOptions: { header: null } },
  ListJobsView: {
      screen: ListJobsView,
      headerMode: 'screen', 
      cardStyle: {backgroundColor: '#fff'},
      navigationOptions: ({navigation}) => ({
        headerRight:  (
          <TouchableOpacity 
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('AddView')}
           >
            <Icon name="plus" size={20} color="#cccccc" />
          </TouchableOpacity>
        ),
        title: '',
        headerTintColor: '#000000',
        headerStyle: {
          backgroundColor: '#fcfbfc',
          borderBottomColor: '#fcfbfc',
          elevation: null
        },
        headerTitleStyle: {
          color: '#cccccc',
        }
      })
  },
  DetailsView: { screen: DetailsView, navigationOptions: { title: 'Detalii salariu' } },
  ListSimilar: { screen: ListSimilar, navigationOptions: { header: null}},  
  AddView: { screen: AddView, navigationOptions: { title: 'Adauga salariu' } }
});

const AppContainer = createAppContainer(AppNavigator);


