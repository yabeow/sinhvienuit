import React from 'react';
import PropTypes from 'prop-types';
import { View, Icon, Text, Badge } from 'native-base';
import { StyleSheet } from 'react-native';

class MenuItem extends React.Component {
  render() {
    let badgeColor = {};
    if (this.props.badgeColor) {
      badgeColor = { [this.props.badgeColor]: true };
    }

    return (
      <View style={[styles.Container, { backgroundColor: this.props.backgroundColor }]}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {!!this.props.badgeNumber && (
            <Badge style={{ marginRight: 5 }} {...badgeColor}>
              <Text>{this.props.badgeNumber}</Text>
            </Badge>
          )}
          <Icon style={styles.Icon} name={this.props.icon} />
        </View>
        <Text style={styles.Text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    padding: 8,
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 8,
  },
  Icon: {
    color: 'white',
    fontSize: 30,
  },
  Text: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
  },
});

MenuItem.defaultProps = {
  badgeNumber: '',
  badgeColor: '',
};

MenuItem.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  badgeNumber: PropTypes.string,
  badgeColor: PropTypes.string,
};
export default MenuItem;
