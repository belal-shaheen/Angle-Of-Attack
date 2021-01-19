import Reducer from './Reducer';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BleManager} from 'react-native-ble-plx';

const composeEnhancers = composeWithDevTools({});
const DeviceManager = new BleManager();

const Store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(DeviceManager))),
);

export default Store;
