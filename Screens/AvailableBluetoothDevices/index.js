import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {startScan, connectDevice} from '../../redux/Actions';
import {ListItem, Text} from 'react-native-elements';

class AvailableBluetoothDevices extends Component {
  constructor(props) {
    super(props);
    this.props.startScan();
  }

  handleClick = (device) => {
    this.props.connectDevice(device);
    this.props.navigation.navigate('AoA');
  };

  render() {
    return (
      <View>
        <ScrollView>
          {this.props.devicesList.map((element, key) => (
            <ListItem
              onPress={() => this.handleClick(element)}
              key={key}
              bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{element.name}</ListItem.Title>
                <ListItem.Subtitle>
                  <Text>
                    Signal:{' '}
                    {parseInt(element.rssi, 10) > -50
                      ? 'Excellent'
                      : parseInt(element.rssi, 10) > -60
                      ? 'Very Good'
                      : parseInt(element.rssi, 10) > -70
                      ? 'Good'
                      : parseInt(element.rssi, 10) > -80
                      ? 'Low'
                      : parseInt(element.rssi, 10) > -90
                      ? 'Very Low'
                      : 'No Signal'}
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    devicesList: state.Reducer.devicesList,
  };
}

const mapDispatchToProps = (dispatch) => ({
  startScan: () => dispatch(startScan()),
  connectDevice: (device) => dispatch(connectDevice(device)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvailableBluetoothDevices);
