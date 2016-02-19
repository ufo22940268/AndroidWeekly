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
  ListView,
  PullToRefreshViewAndroid,
  Linking,
  StatusBar,
  Navigator,
  ToolbarAndroid,
} from 'react-native';

import moment from 'moment';
import {DOMParser} from 'xmldom';
require('moment/locale/zh-cn');
import WeeklyList from './widget/WeeklyList';
import WeeklyDetail from './widget/WeeklyDetail';

class AndroidWeekly extends Component {

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{}]),
      isRefreshing: false
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

  _onRefresh() {
  }

  _onPress(des, title) {
    Linking.openURL(`example://gizmos?title=${encodeURIComponent(title)}&&des=${encodeURIComponent(des)}`);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#009688"
        />
        <ToolbarAndroid
          style={styles.toolbar}
          title="AndroidWeekly"
          navIcon={require('image!android_back_white')}
        >
        </ToolbarAndroid>
        <WeeklyList dataSource={this.state.dataSource} onPress={this._onPress}>
        </WeeklyList>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#009688',
    height: 56,
  },
});


class WeeklyDetailComponent extends Component {

  componentDidMount() {
    var url = Linking.getInitialURL().then(url => {
      if (url) {
        console.log("url = " + url);
        const des = decodeURIComponent(url.match(/.+des=(.+)/)[1]);
        const title = decodeURIComponent(url.match(/.+title=([^&]+)/)[1]);
        console.log("des = " + des);
        this.setState({description: des, title: title});
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#009688"
        />
        <ToolbarAndroid
          style={styles.toolbar}
          title={this.state && this.state.title}
          navIcon={require('image!android_back_white')}
        >
        </ToolbarAndroid>
        <WebView source={{html: this.state && this.state.description}}>
        </WebView>
      </View>
    )
  }
}


AppRegistry.registerComponent('AndroidWeekly', () => AndroidWeekly);
AppRegistry.registerComponent('WeeklyDetail', () => WeeklyDetailComponent);
