#!/usr/bin/env bash

case  $1 in
  run) react-native run-android;;
  start) lsof -n -i4TCP:8081  | awk 'NR > 1 {print $2}'  | xargs kill -9 | react-native start;;
esac