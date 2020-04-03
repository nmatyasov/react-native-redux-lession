import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  divider: {
    marginVertical: 10,
    marginHorizontal: 2,
  },
  icon: {
    marginHorizontal: 5,
    width: 24,
    marginVertical: 16,
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
  image: {
    flex: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    left: 325,
    color: 'red',
  },
  textArea: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title1: {
    fontSize: 16,
    left: 10,
  },
  title2: {
    fontSize: 20,
    left: 10,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 80,
  },
  datePickerBox: {
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent: 'center',
  },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
  },
});
