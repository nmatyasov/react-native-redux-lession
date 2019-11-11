/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import _ from 'lodash';
import {getUsers, contains} from './src/Api/index';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      query: '',
      fullData: [],
    };
  }

  componentDidMount() {
    this.mounted = true;

    this.makeRemoteRequest();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  makeRemoteRequest = _.debounce(() => {
    this.setState({loading: true});

    getUsers(20, this.state.query)
      .then(users => {
        if (this.mounted) {
          // This is bad.  https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
          this.setState({
            loading: false,
            data: users,
            fullData: users,
          });
        }
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  }, 250);

  handleSearch = text => {
    //Test
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, user => {
      return contains(user, formatQuery);
    });
    this.setState({text, query: formatQuery, data}, () =>
      this.makeRemoteRequest(),
    );
  };

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
    if (!this.state.loading) {
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

  render() {
    const {text} = this.state;
    return (
      <SafeAreaView>
        <KeyboardAvoidingView>
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={this.handleSearch}
            value={text}
          />
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
                leftAvatar={{source: {uri: item.picture.thumbnail}}}
                containerStyle={{borderBottomWidth: 0}}
              />
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
