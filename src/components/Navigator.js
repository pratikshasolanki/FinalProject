import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import UserListComponent from './screens/UserListComponent';
import UserDetailsComponent from './screens/UserDetailsComponent';
import PostDetailsComponent from './screens/PostDetailsComponent';
import PostListComponent from './screens/PostListComponent';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

const MAIN_STACK = createStackNavigator(
  {
    UserListComponent: {
      screen: UserListComponent,
      key: 'UserListComponent',
    },
    UserDetailsComponent: {
      screen: UserDetailsComponent,
      key: 'UserDetailsComponent',
    },
    PostListComponent: {
      screen: PostListComponent,
      key: 'PostListComponent',
    },
    PostDetailsComponent: {
      screen: PostDetailsComponent,
      key: 'PostDetailsComponent',
    },
  },
  {
    initialRouteName: 'UserListComponent',
  },
);

const Nav = createSwitchNavigator({
  MainStack: MAIN_STACK,
});

const RootNavigator = createAppContainer(Nav);

export default RootNavigator;
