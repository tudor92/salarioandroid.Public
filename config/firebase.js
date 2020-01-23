import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import config from './config';

// export const firebaseApp = initializeApp(config)
export default firebaseApp  = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const itemsRef = firebaseApp.database().ref('salaries');