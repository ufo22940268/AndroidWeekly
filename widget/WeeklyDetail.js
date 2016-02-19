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
  ScrollView,
} from 'react-native';

const WeeklyDetail = React.createClass({
  render() {
    return (
      <ScrollView style={{padding: 8}}>
        <Text>
          {LONG_TEXT}
        </Text>
      </ScrollView>
    )
  },

  componentDidMount() {

  },

  getInitialState() {
    return {}
  }
});

const styles = StyleSheet.create({
  scroll: {
    padding: 8,
    backfaceVisibility: 'visible',
  },
});

const LONG_TEXT = `
onContentSizeChange function

Called when scrollable content view of the ScrollView changes. It's implemented using onLayout handler attached to the content container which this ScrollView renders.

onScroll function

Fires at most once per frame during scrolling. The frequency of the events can be controlled using the scrollEventThrottle prop.

refreshControl element

A RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.

See RefreshControl.

removeClippedSubviews bool

Experimental: When true, offscreen child views (whose overflow value is hidden) are removed from their native backing superview when offscreen. This can improve scrolling performance on long lists. The default value is true.

scrollEnabled bool

When false, the content does not scroll. The default value is true.

showsHorizontalScrollIndicator bool

When true, shows a horizontal scroll indicator.

showsVerticalScrollIndicator bool

When true, shows a vertical scroll indicator.

style style

Flexbox...

alwaysBounceHorizontal bool

When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself. The default value is true when horizontal={true} and false otherwise.

iosalwaysBounceVertical bool

When true, the scroll view bounces vertically when it reaches the end even if the content is smaller than the scroll view itself. The default value is false when horizontal={true} and true otherwise.

iosautomaticallyAdjustContentInsets bool

Controls whether iOS should automatically adjust the content inset for scroll views that are placed behind a navigation bar or tab bar/ toolbar. The default value is true.

iosbounces bool

When true, the scroll view bounces when it reaches the end of the content if the content is larger then the scroll view along the axis of the scroll direction. When false, it disables all bouncing even if the alwaysBounce* props are true. The default value is true.

iosbouncesZoom bool

When true, gestures can drive zoom past min/max and the zoom will animate to the min/max value at gesture end, otherwise the zoom will not exceed the limits.

ios
`;

module.exports = WeeklyDetail;
