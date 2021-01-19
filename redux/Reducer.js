import {combineReducers} from 'redux';
import {
  ADD_DEVICE,
  CONNECTED_DEVICE,
  CHANGE_STATUS,
  CHANGE_DATA,
} from './Types';
import update from 'immutability-helper';

const INITIAL_STATE = {
  devicesList: [],
  data: '',
  connectedDevice: null,
  status: 'Disconnected',
};

const bluetoothReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DEVICE:
      if (
        state.devicesList.some(
          (device) =>
            device.id === action.device.id ||
            !action.device.isConnectable ||
            action.device.name === null,
        )
      ) {
        return state;
      } else {
        return update(state, {
          devicesList: {$set: [...state.devicesList, action.device]},
        });
      }
    case CONNECTED_DEVICE:
      return update(state, {connectedDevice: {$set: action.connectedDevice}});
    case CHANGE_DATA:
      return update(state, {data: {$set: action.data}});
    case CHANGE_STATUS:
      return update(state, {status: {$set: action.status}});
    default:
      return state;
  }
};

export default combineReducers({
  Reducer: bluetoothReducer,
});
