/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TextFieldView from '../reusable/TextFieldView';
import * as PostsActions from '../../actions/PostsActions';
import {EventEmitter} from './../../common/EventEmitter';

export class PostDetailsComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.navigation.getParam('postObject'));
    this.state = {
      isEditBool: false,
      buttonText: 'Edit',
      postObject: this.props.navigation.getParam('postObject'),
      postName:
        this.props.navigation.getParam('postObject') != null
          ? this.props.navigation.getParam('postObject').title
          : '',
      postDetail:
        this.props.navigation.getParam('postObject') != null
          ? this.props.navigation.getParam('postObject').body
          : '',
    };
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Post Details',
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      headerLeft: () => (
        <FontAwesome
          style={{paddingLeft: 18}}
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

  async updatePost() {
    await this.props.onUpdatePost(
      this.state.postObject.userId,
      this.state.postObject.id,
      this.state.postDetail,
      this.state.postName,
    );
    if (this.props.postUpdateError) {
      Alert.alert('Error in post update.');
    } else {
      this.props.navigation.navigate('PostListComponent');
    }
  }

  onEdit() {
    if (this.state.buttonText === 'Edit') {
      this.setState(
        {
          isEditBool: true,
          buttonText: 'Save',
        },
        () => {},
      );
    } else {
      this.updatePost();
    }
  }
  async onDelete() {
    await this.props.onDeletePost(
      this.state.postObject.userId,
      this.state.postObject.id,
    );
    if (this.props.postDeleteError) {
      Alert.alert('Error in post delete.');
    } else {
      EventEmitter.emit('onUpdateList');
      this.props.navigation.navigate('PostListComponent');
    }
  }

  onFocusPostDetail() {
    this.setState({
      postDetail: {
        ...this.state.postDetail,
      },
    });
  }

  onBlurPostDetail() {
    this.setState({
      postDetail: {
        ...this.state.postDetail,
      },
    });
  }
  onChangePostDetail(text) {
    this.setState({
      postDetail: text,
    });
  }

  onFocusPostName() {
    this.setState({
      postName: {
        ...this.state.postName,
      },
    });
  }

  onBlurPostName() {
    this.setState({
      postName: {
        ...this.state.postName,
      },
    });
  }
  onChangePostName(text) {
    this.setState({
      postName: text,
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 0.4}}>
          <View style={styles.postTitleContainer}>
            <Text style={{flex: 0.15, alignSelf: 'center'}}>Title</Text>
            <View style={{flex: 0.85}}>
              <TextFieldView
                editable={this.state.isEditBool}
                isFieldActive={true}
                textInputContainerStyle={{
                  marginLeft: 8,
                  marginRight: 8,
                }}
                onChangeText={text => this.onChangePostName(text)}
                value={this.state.postName}
                autoCapitalize="none"
                onBlur={() => this.onBlurPostName}
                onFocus={() => this.onFocusPostName}
                label="Post Name"
              />
            </View>
          </View>
          <View style={styles.postDetailContainer}>
            <Text style={{flex: 0.15, alignSelf: 'center'}}>Detail</Text>
            <View style={{flex: 0.85}}>
              <TextFieldView
                editable={this.state.isEditBool}
                textInputContainerStyle={{
                  marginLeft: 8,
                  marginRight: 8,
                }}
                isFieldActive={true}
                onChangeText={text => this.onChangePostDetail(text)}
                value={this.state.postDetail}
                autoCapitalize="none"
                onBlur={() => this.onBlurPostDetail}
                onFocus={() => this.onFocusPostDetail}
                label="Post Detail"
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '40%',
              height: 40,
              backgroundColor: '#356B8C',
              marginLeft: 10,
            }}>
            <TouchableOpacity onPress={() => this.onEdit()}>
              <Text style={{textAlign: 'center', marginTop: 8, color: 'white'}}>
                {this.state.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '40%',
              height: 40,
              backgroundColor: '#356B8C',
              marginRight: 10,
            }}>
            <TouchableOpacity onPress={() => this.onDelete()}>
              <Text style={{textAlign: 'center', marginTop: 8, color: 'white'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = {
  postDetailContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    flex: 0.2,
  },
  postTitleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    flex: 0.2,
  },
  headerTitleStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 17,
    color: '#FFFFFF',
  },
  headerLeftStyle: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRightButton: {
    color: '#FFFFFF',
    fontSize: 17,
    marginLeft: 10,
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
  },
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    backgroundColor: '#356B8C',
  },
};

export function mapStateToProps(state, _props) {
  return {
    postDeleteError: state.PostsReducers.postDeleteError,
    postDeleteErrorData: state.PostsReducers.postDeleteErrorData,
    postUpdateError: state.PostsReducers.postUpdateError,
    postUpdateErrorData: state.PostsReducers.postUpdateErrorData,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PostsActions), dispatch);
}

export default connect(null, mapDispatchToProps)(PostDetailsComponent);
