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
import {DOMParser} from 'xmldom';

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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData=>
         <View style={styles.item}>
          <Text>{rowData.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.author}>{rowData.author}</Text>
            <Text style={styles.author}>"wefijwoie"</Text>
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
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed'
  },

  title: {color: 'black'},
  author: {fontSize: 12, width: 30, flex: 12}
});

AppRegistry.registerComponent('AndroidWeekly', () => AndroidWeekly);
