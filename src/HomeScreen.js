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

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {makeRemoteRequest, handleSearch} from './redux/actions';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.makeRemoteRequest();
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

  render() {
    const {data, text, fullData} = this.props;
    return (
      <SafeAreaView>
        <KeyboardAvoidingView>
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={event => this.props.handleSearch(event, fullData)}
            value={text}
          />
          <FlatList
            data={data}
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

function mapStateToProps(state) {
  return {
    data: state.users.data,
    loading: state.users.loading,
    fullData: state.users.fullData,
    text: state.users.query,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({makeRemoteRequest, handleSearch}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
