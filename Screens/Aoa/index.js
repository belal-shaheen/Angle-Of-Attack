import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {Text, Button} from 'react-native-elements';

import Angle from '../../components/Angle';

// import {
//   accelerometer,
//   SensorTypes,
//   setUpdateIntervalForType,
// } from 'react-native-sensors';

// setUpdateIntervalForType(SensorTypes.accelerometer, 400); // defaults to 100ms

// const subscription = accelerometer.subscribe(({x, y, z, timestamp}) =>
//   console.log({x, y, z, timestamp}),
// );

class Aoa extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.state, offset: 0};
    this.value = 0;
  }

  componentDidMount() {
    // Updating the data every 80ms to avoid the UI bottleneck
    setInterval(() => {
      this.value = this.props.data;
    }, 80);
  }

  render() {
    return (
      <View>
        <View style={{paddingTop: 100, alignItems: 'center'}}>
          <Angle value={this.value} status={this.props.status} />
        </View>
        <View
          style={{
            padding: 50,
            alignContent: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Button
            style={{width: 50}}
            title="-"
            onPress={() => this.setState({offset: this.state.offset - 1})}
          />
          <Text style={{paddingTop: 7, fontSize: 24}}>
            {74 + this.state.offset} Knots
          </Text>
          <Button
            style={{width: 50}}
            title="+"
            onPress={() => this.setState({offset: this.state.offset + 1})}
          />
        </View>
        {this.props.status === 'Disconnected' ? (
          <View>
            <Button
              title="Reconnect"
              style={{margin: 30, marginBottom: 20, marginTop: 0}}
              onPress={() => {
                this.props.navigation.navigate('List');
              }}></Button>
          </View>
        ) : null}
        <Text style={{textAlign: 'center'}}>Status: {this.props.status}</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.Reducer.data,
    status: state.Reducer.status,
  };
}

export default connect(mapStateToProps, {})(Aoa);
