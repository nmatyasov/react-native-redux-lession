/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  ToastAndroid,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Input, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {NavigationActions, StackActions} from 'react-navigation';

import {DatePickerDialog} from 'react-native-datepicker-dialog';

import moment from 'moment';

import * as actions from '../redux/actions';
import style from '../components/styles';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'Home'})],
});

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this._dobref = React.createRef();
    this.state = {
      DateText: '',
      DateHolder: null,
    };
  }
  static navigationOptions = {
    title: 'Modify user profile',
  };

  DatePickerMainFunctionCall = () => {
    let DateHolder = this.state.DateHolder;

    if (!DateHolder || DateHolder == null) {
      DateHolder = new Date();
      this.setState({
        DateHolder: DateHolder,
      });
    }

    //To open the dialog
    this._dobref.open({
      date: DateHolder,
    });
  };

  onDatePickedFunction = date => {
    this.setState({
      dobDate: date,
      DateText: moment(date).format('DD-MMM-YYYY'),
    });
  };

  updateValue(field, text) {
    console.log(field + ' ' + text);
  }
  inputValidation() {
    return true;
  }
  resetInput() {
    console.log('Reset input');
  }

  submitCreate() {
    if (this.inputValidation()) {
      Alert.alert(
        'Update pofile',
        'Confirm update the pofile?',
        [
          {
            text: 'Confirm',

            onPress: () => {
              this.setState({creating: true});

              this.props
                .createRecipe(
                  this.state.RecipeName,
                  this.state.RecipeIngredient,
                  this.state.RecipeStep,
                  this.state.RecipeType,
                )
                .then(res => {
                  if (this.props.APIResponse === 1) {
                    ToastAndroid.showWithGravity(
                      'Profile have updated.',
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM,
                    );
                    this.props.navigation.dispatch(resetAction);
                  } else {
                    Alert.alert(
                      'Profile update Failed, Please Check the system.',
                    );
                  }
                });
            },
          },
          {text: 'Cancel'},
        ],
        {cancellable: true},
      );
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={style.image}>
            <Avatar
              size="xlarge"
              source={{uri: this.props.user.picture.large}}
              rounded
              showEditButton
            />
          </View>
          <View>
            <View style={style.textArea}>
              <Input
                placeholder="Title"
                errorStyle={{color: 'red'}}
                errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={event => this.props.updateValue('title', event)}
                value={this.props.user.name.title}
              />
              <Input
                placeholder="First name"
                errorStyle={{color: 'red'}}
                errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={event => this.props.updateValue('first', event)}
                value={this.props.user.name.first}
              />
              <Input
                placeholder="Last name"
                errorStyle={{color: 'red'}}
                errorMessage="ENTER A VALID ERROR HERE"
                onChangeText={event => this.props.updateValue('last', event)}
                value={this.props.user.name.last}
              />
            </View>
            <Input
              placeholder="Street"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('street', event)}
              value={this.props.user.location.street}
            />
            <Input
              placeholder="City"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('city', event)}
              value={this.props.user.location.city}
            />
            <Input
              placeholder="State"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('state', event)}
              value={this.props.user.location.state}
            />
            <Input
              placeholder="Nat"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('nat', event)}
              value={this.props.user.location.nat}
            />
            <Input
              placeholder="Postcode"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('postcode', event)}
              value={this.props.user.location.postcode}
            />
            <TouchableOpacity
              onPress={this.DatePickerMainFunctionCall.bind(this)}>
              <View style={style.datePickerBox}>
                <Text style={style.datePickerText}>{this.props.user.dob}</Text>
              </View>
            </TouchableOpacity>

            {/* Place the dialog component at end of your views and assign the references, event handlers to it.*/}
            <DatePickerDialog
              ref={this._dobref}
              onDatePicked={this.onDatePickedFunction.bind(this)}
            />
            <Input
              placeholder="Phone"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('phone', event)}
              value={this.props.user.phone}
            />
            <Input
              placeholder="Cell"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('cell', event)}
              value={this.props.user.cell}
            />
            <Input
              placeholder="Email"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('email', event)}
            />
            <Input
              placeholder="Login"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('login', event)}
              value={this.props.user.login}
            />
            <Input
              placeholder="Password"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event => this.props.updateValue('password', event)}
              value={this.props.user.password}
            />
            <Input
              placeholder="Repeat password"
              errorStyle={{color: 'red'}}
              errorMessage="ENTER A VALID ERROR HERE"
              onChangeText={event =>
                this.props.updateValue('repeat_password', event)
              }
              value={this.props.user.password}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(EditProfile);
