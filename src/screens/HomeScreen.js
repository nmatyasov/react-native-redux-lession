/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  SectionList,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ListItem, SearchBar, Text, Icon, Divider} from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';

import {
  makeRemoteRequest,
  handleSearch,
  handleSortDirection,
  handleSelectUser,
} from '../redux/actions';
import style from '../components/styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.makeRemoteRequest();
  }

  renderFooter = () => {
    if (!this.props.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem({item, index}) {
    return (
      <ListItem
        roundAvatar
        title={`${item.name.first} ${item.name.last}`}
        subtitle={item.email}
        leftAvatar={{source: {uri: item.picture.thumbnail}}}
        containerStyle={{borderBottomWidth: 1}}
        chevron={{size: 40}}
        Component={TouchableScale}
        onPress={() => this.onUserPress(item)}
      />
    );
  }

  onUserPress = item => {
    this.props.handleSelectUser(item);
    this.props.navigation.navigate('Profile');
  };

  renderSection({section}) {
    return (
      <View>
        <Text
          style={{
            backgroundColor: '#bdc6cf',
            fontSize: 20,
            padding: 5,
            color: '#fff',
          }}>
          {section.title}
        </Text>
      </View>
    );
  }
  clickHandler = () => {
    //function to handle click on floating Action Button
    Alert.alert('Floating Button Clicked');
  };
  render() {
    const {data, text, fullData, sortdirection, padding} = this.props;
    return (
      <SafeAreaView>
        <KeyboardAvoidingView>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexGrow: 1, flexBasis: '90%'}}>
              <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={event => this.props.handleSearch(event, fullData)}
                value={text}
              />
            </View>
            <View
              style={{
                flexGrow: 1,
                flexBasis: '10%',
                backgroundColor: '#e6ebef',
              }}>
              <Menu>
                <MenuTrigger>
                  <Icon
                    containerStyle={style.icon}
                    name="more-vert"
                    color="#bdc6cf"
                    size={30}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() =>
                      this.props.handleSortDirection(sortdirection)
                    }
                    text={sortdirection === 1 ? 'Sort by DESC' : 'Sort by ASC'}
                  />
                  <Divider />
                  <MenuOption
                    onSelect={() =>
                      this.props.makeRemoteRequest(padding + 20, text)
                    }
                    text="Load another 20 entries"
                  />
                  <MenuOption
                    onSelect={() => this.props.makeRemoteRequest(0, text)}
                    text="Load all entries"
                  />
                </MenuOptions>
              </Menu>
            </View>
          </View>
          <SectionList
            sections={data.sort(
              (a, b) => sortdirection * a.title.localeCompare(b.title),
            )}
            renderSectionHeader={this.renderSection.bind(this)}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item, index) => index}
            ListFooterComponent={this.renderFooter}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.clickHandler}
          style={style.TouchableOpacityStyle}>
          <Icon reverse name="person-add" color="#517fa4" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.users.data,
    loading: state.users.loading,
    fullData: state.users.fullData,
    text: state.users.query,
    sortdirection: state.users.sortdirection,
    padding: state.users.padding,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {makeRemoteRequest, handleSearch, handleSortDirection, handleSelectUser},
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
