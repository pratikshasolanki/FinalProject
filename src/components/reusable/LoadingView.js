import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const LoadingView = props => {
  const styleContainer = props.text ? {} : {backgroundColor: 'white'};
  const styleMidContainer = props.text ? {} : {backgroundColor: 'white'};
  return (
    <View style={[styles.activityIndicatorContainer, styleContainer]}>
      <View style={[styles.activityIndicatorContainer2, styleMidContainer]}>
        {props.text ? (
          <Text
            style={styles.activityLoadingTextStyle}
            allowFontScaling={false}>
            {props.text}
          </Text>
        ) : null}
        <ActivityIndicator
          style={styles.activityIndicatorStyle}
          animating={true}
          size="large"
          color="black"
        />
      </View>
    </View>
  );
};

const styles = {
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  activityIndicatorContainer2: {
    height: 220,
    width: 220,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  activityIndicatorStyle: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  activityLoadingTextStyle: {
    marginTop: 30,
    flex: 1,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 25,
    fontStyle: 'normal',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
  },
};

export default LoadingView;
