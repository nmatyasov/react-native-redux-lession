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
} from 'react-native';
import {ListItem, SearchBar, Text, Icon} from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
  makeRemoteRequest,
  handleSearch,
  handleSortDirection,
} from './redux/actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.makeRemoteRequest(this.props.padding);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

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
        containerStyle={{borderBottomWidth: 0}}
      />
    );
  }

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

  render() {
    const {data, text, fullData, sortdirection} = this.props;
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
                    containerStyle={styles.icon}
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
                    text={sortdirection === 1 ? 'Sort by ASC' : 'Sort by DESC'}
                  />
                  <MenuOption onSelect={() => Alert.alert('Delete')}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => Alert.alert('Not called')}
                    disabled={true}
                    text="Disabled"
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
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 23,
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF9800',
    marginBottom: 10,
  },
  titleButton: {
    backgroundColor: '#FF9800',
  },
  icon: {
    marginHorizontal: 5,
    width: 24,
    marginVertical: 16,
  },
});

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
      {makeRemoteRequest, handleSearch, handleSortDirection},
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
