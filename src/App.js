import React, {Component} from 'react';
import {View} from 'react-native';
import store from './store';
import {Provider} from 'react-redux';
import Navigator from './components/Navigator';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </Provider>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
};
