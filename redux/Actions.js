import {
  ADD_DEVICE,
  CONNECTED_DEVICE,
  CHANGE_STATUS,
  CHANGE_DATA,
} from './Types';
import {PermissionsAndroid, Platform} from 'react-native';
import base64 from 'react-native-base64';

export const addDevice = (device) => ({
  type: ADD_DEVICE,
  device,
});

export const changeMessage = (data) => ({
  type: CHANGE_DATA,
  data,
});

export const connectedDevice = (device) => ({
  type: CONNECTED_DEVICE,
  connectedDevice: device,
});

export const changeStatus = (status) => ({
  type: CHANGE_STATUS,
  status: status,
});

export const startScan = () => {
  return (dispatch, getState, DeviceManager) => {
    // Checking if bluetooth is enabled and then starting the scan
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        dispatch(scan());
        subscription.remove();
      }
    }, true);
  };
};

const requestLocationPermission = async () => {
  // Asking for location premissions for Android
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location permission for bluetooth scanning',
        message: 'Location permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission for bluetooth scanning granted');
      return true;
    } else {
      console.log('Location permission for bluetooth scanning revoked');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const scan = () => {
  return async (dispatch, getState, DeviceManager) => {
    const permission =
      Platform.OS === 'ios' ? true : await requestLocationPermission();
    if (permission) {
      DeviceManager.startDeviceScan(null, null, (error, device) => {
        dispatch(changeStatus('Scanning'));
        if (error) {
          console.log(error);
        }
        if (device !== null) {
          dispatch(addDevice(device));
        }
      });
    } else {
      console.log('Error permission');
    }
  };
};

export const connectDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(changeStatus('Connecting'));
    DeviceManager.stopDeviceScan();
    device
      .connect()
      .then((device) => {
        dispatch(changeStatus('Discovering'));
        let allCharacteristics = device.discoverAllServicesAndCharacteristics();
        dispatch(connectedDevice(device));
        return allCharacteristics;
      })
      .then(async (device) => {
        dispatch(changeStatus('Connected'));
        let UART = (await device.services(device.id))[0].uuid;
        const RX = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
        await device
          .monitorCharacteristicForService(UART, RX, (error, char) => {
            if (error) {
              dispatch(connectedDevice(null));
              dispatch(changeStatus('Disconnected'));
              return;
            }

            if (
              base64.decode(char.value) != null &&
              base64.decode(char.value).length > 0
            ) {
              let ndata = base64.decode(char.value);
              let zdata = base64.decode(char.value).split(',')[0];
              dispatch(changeMessage(zdata));
            }
          })
          .catch((error) => {
            dispatch(connectedDevice(null));
            dispatch(changeStatus('Disconnected'));
          });
      })
      .catch((err) => console.log(err));
  };
};
