/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingView from '../reusable/LoadingView';
import TextFieldView from '../reusable/TextFieldView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as PostsActions from '../../actions/PostsActions';

export class PostListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      postName: '',
      postDetail: '',
    };
    this.userId = this.props.navigation.getParam('userId');
  }
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Post List',
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
      headerRight: () => (
        <FontAwesome
          style={{paddingRight: 18}}
          name={'plus'}
          size={25}
          color={'#FFFFFF'}
          onPress={navigation.getParam('onAddIcon')}
        />
      ),
    };
  };
  async componentDidMount() {
    this.fetchPosts();
    this.props.navigation.setParams({
      onBackPress: this.onBackPress,
      onAddIcon: this.onAddIcon,
    });
  }
  onBackPress = () => {
    this.backPress();
  };
  backPress() {
    this.props.navigation.pop();
  }
  onAddIcon = () => {
    this.addIcon();
  };
  addIcon() {
    this.setModalVisible(true);
  }

  fetchPosts = async () => {
    await this.props.fetchPostsList(this.props.navigation.getParam('userId'));
    if (this.props.postListError) {
      console.log('Post', this.props.postListErrorData);
      Alert.alert(this.props.postListErrorData);
    }
  };
  renderItem(item) {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
        <TouchableOpacity
          style={{flexDirection: 'row', flex: 1}}
          onPress={() => {
            this.props.navigation.navigate('PostDetailsComponent', {
              postObject: item,
            });
          }}>
          <Text style={{fontSize: 16, color: 'black'}} numberOfLines={1}>
            {item.title}
          </Text>
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

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

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

  async onAddPost() {
    await this.props.addPost(
      this.userId,
      this.state.postDetail,
      this.state.postName,
    );
    if (this.props.addPostError) {
      console.log('Add post error ', this.props.addPostErrorData);
      Alert.alert(this.props.addPostErrorData);
    } else {
      this.fetchPosts();
    }
    this.setModalVisible(!this.state.modalVisible);
  }

  renderAddPost() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            this.state.showModal ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '',
          ]}>
          <View style={styles.modalView}>
            <View style={{flex: 0.1}}>
              <Text style={styles.modalText}>Add Post Details</Text>
            </View>
            <View style={{flex: 0.5}}>
              <TextFieldView
                textInputContainerStyle={{marginLeft: 8, marginRight: 8}}
                onChangeText={text => this.onChangePostName(text)}
                value={this.state.postName}
                autoCapitalize="none"
                onBlur={() => this.onBlurPostName}
                onFocus={() => this.onFocusPostName}
                label="Post Name"
              />
              <TextFieldView
                textInputContainerStyle={{marginLeft: 8, marginRight: 8}}
                onChangeText={text => this.onChangePostDetail(text)}
                value={this.state.postDetail}
                autoCapitalize="none"
                onBlur={() => this.onBlurPostDetail}
                onFocus={() => this.onFocusPostDetail}
                label="Post Detail"
              />
            </View>
            <View style={{flex: 0.2}} />
            <View style={{flex: 0.2}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.onAddPost()}>
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginLeft: 10}}>
          <FlatList
            data={this.props.postListData}
            ItemSeparatorComponent={this.itemSeparatorView}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {this.props.showLoading ? <LoadingView /> : null}
        {this.renderAddPost()}
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
  centeredView: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  modalView: {
    margin: 5,
    flex: 0.5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  button: {
    margin: 8,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
};

export function mapStateToProps(state, _props) {
  return {
    postListData: state.PostsReducers.postListData,
    postListError: state.PostsReducers.postListError,
    postListErrorData: state.PostsReducers.postListErrorData,
    showLoading: state.PostsReducers.showLoading,
    addPostError: state.PostsReducers.addPostError,
    addPostErrorData: state.PostsReducers.addPostErrorData,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PostsActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListComponent);
