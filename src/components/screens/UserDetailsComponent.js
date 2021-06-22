/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class UserDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObject: this.props.navigation.getParam('userObject'),
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Users Details',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: () => (
        <FontAwesome
          style={styles.headerLeftStyle}
          name={'angle-left'}
          size={25}
          color={'#FFFFFF'}
          onPress={navigation.getParam('onBackPress')}
        />
      ),
      headerRight: () => <Text />,
    };
  };
  async componentDidMount() {
    this.props.navigation.setParams({
      onBackPress: this.onBackPress,
    });
  }
  onBackPress = () => {
    this.backPress();
  };
  backPress() {
    this.props.navigation.pop();
  }
  itemSeparatorView() {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Name:</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.name}</Text>
        </View>
        {this.itemSeparatorView()}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Username</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.username}</Text>
        </View>
        {this.itemSeparatorView()}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Email</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.email}</Text>
        </View>
        {this.itemSeparatorView()}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Phone</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.phone}</Text>
        </View>
        {this.itemSeparatorView()}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Web-site</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.website}</Text>
        </View>
        {this.itemSeparatorView()}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 5,
          }}>
          <Text style={{flex: 0.3}}>Company name</Text>
          <Text style={{flex: 0.7}}>{this.state.userObject.company.name}</Text>
        </View>
      </View>
    );
  }
}
const styles = {
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 17,
    color: '#FFFFFF',
  },
  headerLeftStyle: {
    paddingLeft: 18,
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    backgroundColor: '#356B8C',
  },
};

export function mapStateToProps() {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsComponent);
