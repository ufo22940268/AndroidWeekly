/**
 * Created by cc on 2/19/16.
 */
"use strict";

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
  ListView,
  TouchableHighlight
} from 'react-native';

import moment from 'moment';
import {DOMParser} from 'xmldom';
require('moment/locale/zh-cn');

const WeeklyList = React.createClass({

  render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={rowData=>
        <TouchableHighlight onPress={this.props.onPress.bind(null, rowData.description, rowData.title)}>
         <View style={styles.item}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={{marginTop: 8}}>{this._truncate(rowData.description)}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.createContainer}>
              <Text style={styles.create}>{rowData.create}</Text>
            </View>
          </View>
        </View>
        </TouchableHighlight>
        }
      >
      </ListView>
    )
  },

  _truncate(des) {
    if (des) {
      des = des.replace(/<.+?>/g, '').substring(0, 140).replace(/\s/g, '');
      if (des) des = des + '...';
      return des;
    }
    else
      return '';
  }
});

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
  },

  title: {color: 'black', fontWeight: 'bold', fontSize: 14},
  author: {fontSize: 12},
  tag: {fontSize: 12, marginLeft: 5},
  createContainer: {
    marginTop: 4,
    backgroundColor: '#FF5722',
    overflow: 'hidden',
    borderColor: '#FF5722',
    borderRadius: 2,
    borderWidth: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  create: {
    fontSize: 10,
    color: '#fff',
  }
});

module.exports = WeeklyList;
