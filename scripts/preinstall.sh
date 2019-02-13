#!/bin/bash

unameOut="$(uname -s)"
case "${unameOut}" in
Linux*)     machine=Linux;;
Darwin*)    machine=Mac;;
CYGWIN*)    machine=Cygwin;;
MINGW*)     machine=MinGw;;
*)          machine="UNKNOWN:${unameOut}"
esac

# Check os versions and install essential dependencies
echo '--------------------------'
echo 'update native libraries'
echo '--------------------------'

if [ $machine == "Mac" ]; then
# Do something under Mac OS X platform
echo 'install libs for Mac OS'
brew ls --versions tesseract || brew install tesseract --with-all-languages
brew ls --versions libimobiledevice || brew install libimobiledevice
elif [ $machine == "Linux" ]; then
# Do something under GNU/Linux platform
echo 'install libs for Linux'
exit 0
elif [ $machine == "MINGW" ]; then
# Do something under Windows NT platform
echo 'install libs for windows'
exit 0
else
exit 0
fi

# Preinstall macaca dependencies
echo '--------------------------'
echo 'update node dependencies:'
echo '--------------------------'

echo 'updating ios-deploy...'
npm list -g ios-deploy || npm install ios-deploy -g

echo 'updating macaca-ios...'
npm list -g macaca-ios || npm install macaca-ios -g

echo 'updating macaca-android...'
npm list -g macaca-android || npm install macaca-android -g

echo 'updating macaca...'
npm list -g macaca-cli || npm install macaca-cli -g

