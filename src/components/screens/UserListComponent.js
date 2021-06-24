/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserActions from '../../actions/UsersActions';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingView from '../reusable/LoadingView';
import * as PostsActions from '../../actions/PostsActions';

export class UserListComponent extends Component {
  constructor() {
    super();
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Users List',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: () => <Text />,
      headerRight: () => <Text />,
    };
  };
  async componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    await this.props.fetchUsersList();
    if (this.props.userListError) {
      console.log('Users', this.props.userListErrorData);
      Alert.alert(this.props.userListErrorData);
    } else {
      console.log('12003333', this.props.userListData);
      this.setState({refreshing: false});
    }
  };

  renderItem(item) {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1}}
          onPress={() => {
            this.props.navigation.navigate('UserDetailsComponent', {
              userObject: item,
            });
          }}>
          <View style={{flex: 0.7}}>
            <Text style={{fontSize: 16, color: 'black'}} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            if (this.props.postListData.length === 0) {
              await this.props.fetchPostsList();
              if (this.props.postListError) {
                console.log('Post', this.props.postListErrorData);
                Alert.alert(this.props.postListErrorData);
              } else {
                const obj = [];
                this.props.postListData.map(post => {
                  if (post.userId === item.id) {
                    obj.push(post);
                  }
                });
                console.log('Data1      ', obj);
                this.props.navigation.navigate('PostListComponent', {
                  postList: obj,
                  userId: item.id,
                });
              }
            } else {
              const obj = [];
              this.props.postListData.map(post => {
                if (post.userId === item.id) {
                  obj.push(post);
                }
              });
              console.log('Data 1     ', obj);
              this.props.navigation.navigate('PostListComponent', {
                postList: obj,
                userId: item.id,
              });
            }
          }}>
          <View
            style={{
              flex: 0.1,
              marginRight: 10,
            }}>
            <FontAwesome
              style={{
                alignSelf: 'flex-end',
              }}
              name={'th-list'}
              size={20}
              color={'#E67E22'}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  itemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginLeft: 10}}>
          <FlatList
            data={this.props.userListData}
            ItemSeparatorComponent={this.itemSeparatorView}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.props.showLoading ? <LoadingView /> : null}
      </SafeAreaView>
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
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    backgroundColor: '#356B8C',
  },
};

export function mapStateToProps(state, _props) {
  return {
    userListData: state.UserReducers.userListData,
    userListError: state.UserReducers.userListError,
    userListErrorData: state.UserReducers.userListErrorData,
    showLoading: state.UserReducers.showLoading,
    postListData: state.PostsReducers.postListData,
    postListError: state.PostsReducers.postListError,
    postListErrorData: state.PostsReducers.postListErrorData,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, UserActions, PostsActions),
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
