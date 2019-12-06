import React, {Component} from 'react';
import {SafeAreaView, View, Alert, TouchableOpacity} from 'react-native';
import {Text, Avatar, Divider, Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';

import * as actions from '../redux/actions';
import style from '../components/styles';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };
  clickHandler = () => {
    //function to handle click on floating Action Button
    Alert.alert('Floating Button Clicked');
  };
  render() {
    return (
      <SafeAreaView>
        <View style={style.image}>
          <Avatar
            size="xlarge"
            source={{uri: this.props.user.picture.large}}
            rounded
          />
        </View>
        <View style={style.textArea}>
          <Icon name="person" color="#517fa4" />
          <Text style={style.title1}>{this.props.user.name.title}</Text>
          <Text style={style.title2}>
            {this.props.user.name.first} {this.props.user.name.last}
          </Text>
        </View>
        <View style={style.textArea}>
          <Icon name="home" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.location.street} </Text>
        </View>
        <View style={style.textArea}>
          <Icon type="material" name="location-city" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.location.city} </Text>
        </View>
        <View style={style.textArea}>
          <Icon name="location-on" color="#517fa4" />
          <Text style={style.title2}>
            {this.props.user.location.state} {','} {this.props.user.nat}
          </Text>
        </View>
        <View style={style.textArea}>
          <Icon type="material-community" name="mailbox" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.location.postcode} </Text>
        </View>
        <View style={style.textArea}>
          <Icon name="email" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.email} </Text>
        </View>
        <View style={style.textArea}>
          <Icon type="font-awesome" name="calendar-o" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.dob} </Text>
        </View>
        <View style={style.textArea}>
          <Icon type="font-awesome" name="calendar-o" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.registered} </Text>
        </View>
        <View style={style.textArea}>
          <Icon name="call" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.phone} </Text>
        </View>
        <View style={style.textArea}>
          <Icon name="call" color="#517fa4" />
          <Text style={style.title2}>{this.props.user.cell} </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={(style.TouchableOpacityStyle, {bottom: 5, left: 340})}>
          <Icon reverse name="edit" color="#517fa4" />
        </TouchableOpacity>
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
)(ProfileScreen);
