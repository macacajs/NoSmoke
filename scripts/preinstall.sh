#!/bin/bash

# Preinstall macaca dependencies
echo '--------------------------'
echo 'update node dependencies:'
echo '--------------------------'

echo 'updating ios-deploy...'
npm update ios-deploy -g

echo 'updating macaca-ios...'
npm update macaca-ios -g

echo 'updating macaca-android...'
npm update macaca-android -g

echo 'updating macaca...'
npm update macaca -g

# Check os versions and install essential dependencies
echo '--------------------------'
echo 'update native libraries'
echo '--------------------------'

unameOut="$(uname -s)"
case "${unameOut}" in
Linux*)     machine=Linux;;
Darwin*)    machine=Mac;;
CYGWIN*)    machine=Cygwin;;
MINGW*)     machine=MinGw;;
*)          machine="UNKNOWN:${unameOut}"
esac

if [ $machine == "Mac" ]; then
    # Do something under Mac OS X platform
    echo 'install libs for Mac OS'
    brew install tesseract --with-all-languages
elif [ $machine == "Linux" ]; then
    # Do something under GNU/Linux platform
    echo 'install libs for Linux'
elif [ $machine == "MINGW" ]; then
    # Do something under Windows NT platform
    echo 'install libs for windows'
fi
