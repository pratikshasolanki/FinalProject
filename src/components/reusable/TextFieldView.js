import React, {Component} from 'react';
import {View, Animated, StyleSheet, TextInput, Text} from 'react-native';
import {string, object, number} from 'prop-types';

export default class TextFieldView extends Component {
  static propTypes = {
    value: string.isRequired,
    keyboardType: string,
    titleActiveSize: number,
    titleInActiveSize: number,
    titleActiveColor: string,
    titleInactiveColor: string,
    textInputStyles: object,
    otherTextInputProps: object,
    titleActiveMarginTop: number,
    titleInActiveMarginTop: number,
  };

  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 9,
    titleInActiveSize: 14,
    titleColor: '#5c6870',
    textInputStyles: {},
    otherTextInputAttributes: {},
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: this.props.isFieldActive
        ? this.props.isFieldActive
        : false,
    };
  }
  renderInputError() {
    return (
      <View>
        {this.props.inputError ? (
          <Text style={[Styles.inputErrorStyle, this.props.inputErrorStyle]}>
            {this.props.inputError}
          </Text>
        ) : null}
      </View>
    );
  }
  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({isFieldActive: true});
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else {
      this.props.onFocus();
    }
  };

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({isFieldActive: false});
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else {
      this.props.onBlur();
    }
  };

  _clearText() {
    this.setState({isFieldActive: false});
    Animated.timing(this.position, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  _returnAnimatedTitleStyles = () => {
    const {isFieldActive} = this.state;
    const {titleActiveColor, titleActiveSize, titleInActiveSize} = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      marginTop: isFieldActive ? 2 : 0,
      color: titleActiveColor,
    };
  };

  render() {
    return (
      <View style={Styles.container}>
        <View style={[Styles.container2, this.props.textInputContainerStyle]}>
          <Animated.Text
            numberOfLines={1}
            style={[
              Styles.titleStyles,
              this._returnAnimatedTitleStyles(),
              this.props.textLabelStyle,
            ]}>
            {this.props.label}
          </Animated.Text>
          <TextInput
            editable={this.props.editable}
            value={this.props.value}
            style={[Styles.textInput, this.props.textInputStyle]}
            secureTextEntry={
              this.props.isSecure
                ? this.props.isSecureTextVisible
                  ? false
                  : true
                : false
            }
            underlineColorAndroid="transparent"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChangeText={this.props.onChangeText}
            keyboardType={this.props.keyboardType}
            textContentType={this.props.textContentType}
            dataDetectorTypes={this.props.dataDetectorTypes}
            autoCapitalize={this.props.autoCapitalize}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
            autoCorrect={false}
            returnKeyType={this.props.returnKeyType}
            onSubmitEditing={this.props.onSubmitEditing}
            ref={this.props.inputRef}
            {...this.props.otherTextInputProps}
          />
        </View>
        <View style={Styles.errorMessageStyle}>{this.renderInputError()}</View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  showHideButtonStyle: {
    flex: 1.2,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
  errorMessageStyle: {
    flex: 0.4,
  },
  inputErrorStyle: {
    color: '#ca0000',
  },
  container: {
    flex: 1,
  },
  container2: {
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 50,
    marginVertical: 4,
    borderColor: '#8f9ba3',
    flexDirection: 'row',
  },
  textInput: {
    flex: 9,
    width: '90%',
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  titleStyles: {
    position: 'absolute',
    left: 5,
    right: 1,
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#454e54',
  },
});
