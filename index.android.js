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
import WeeklyList from './widget/WeeklyList';

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


  render() {
    return (
      <WeeklyList dataSource={this.state.dataSource}>
      </WeeklyList>
    );
  }
}


AppRegistry.registerComponent('AndroidWeekly', () => AndroidWeekly);
