/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  WebView,
  ListView
} from 'react-native';

import moment from 'moment';
import {DOMParser} from 'xmldom';
require('moment/locale/zh-cn');

class AndroidWeekly extends Component {

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{}]),
    };
  }

  updateList(data) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const state = {
      dataSource: ds.cloneWithRows(data),
    };
    this.setState(state);
  }

  componentWillMount() {

    function convertItem(item) {
      return {
        title: item.getElementsByTagName('title')[0].textContent,
        description: item.getElementsByTagName('description')[0].textContent,
        author: item.getElementsByTagName('dc:creator')[0].textContent,
        category: function () {
          const category = item.getElementsByTagName('category')[0];
          if (category)
            return category.textContent;
          else
            return '';
        }(),
        create: moment(new Date(item.getElementsByTagName('pubDate')[0].textContent)).format('LL')
      };
    }

    return fetch('http://www.androidweekly.cn/rss/')
      .then(res => res.text())
      .then(text => {
        let dom = new DOMParser().parseFromString(text);
        return Array.from(dom.getElementsByTagName('item')).map(convertItem);
      }).then(items => this.updateList(items))
  }

  _truncate(des) {
    if (des) {
      des = des.replace(/<.+?>/g, '').substring(0, 140).replace(/\s/g, '');
      if (des) des = des + '...';
      return des;
    }
    else
      return '';
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData=>
         <View style={styles.item}>
          <Text style={styles.title}>{rowData.title}</Text>
          <Text style={{marginTop: 8}}>{this._truncate(rowData.description)}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.createContainer}>
              <Text style={styles.create}>{rowData.create}</Text>
            </View>
          </View>
        </View>
        }
      >
      </ListView>
    );
  }
}

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

AppRegistry.registerComponent('AndroidWeekly', () => AndroidWeekly);
