import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {startScan} from '../../redux/Actions';
import {Text, Button} from 'react-native-elements';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: 17, textAlign: 'center', marginTop: 30}}>
          {this.props.connectedDevice && (
            <Text>
              There is a Connected Device: {this.props.connectedDevice.name}
            </Text>
          )}
        </Text>
        <Button
          title="Connect"
          style={{margin: 30, marginBottom: 20}}
          onPress={() => this.props.navigation.navigate('List')}
        />
        {this.props.status === 'Connected' ? (
          <Button
            style={{margin: 30, marginTop: 0}}
            title="Go to AoA"
            onPress={() => this.props.navigation.navigate('AoA')}
          />
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    connectedDevice: state.Reducer.connectedDevice,
    status: state.Reducer.status,
  };
}

export default connect(mapStateToProps, {})(Home);
