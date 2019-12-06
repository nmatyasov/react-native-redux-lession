import React, {Component} from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Icon, Divider} from 'react-native-elements';

import style from '../components/styles';

class ProfileScreenMenu extends Component {
  render() {
    return (
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
            // onSelect={() =>
            //   this.props.handleSortDirection(sortdirection)
            //}
            text={'Труляля'}
          />
          <Divider />
          <MenuOption
            // onSelect={() =>
            //   this.props.makeRemoteRequest(padding + 20, text)
            //}
            text={'Труляля'}
          />
          <MenuOption
            // onSelect={() => this.props.makeRemoteRequest(0, text)}
            text={'Труляля'}
          />
        </MenuOptions>
      </Menu>
    );
  }
}

export default ProfileScreenMenu;
