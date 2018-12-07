# Winkit CLI
[<img src="readme-res/badge.svg" height=40>](https://developer.wink.by)
[![Platforms](https://img.shields.io/badge/style-popout-red.svg?logo=angular&style=popout&colorA=black&colorB=DD0031)](https://angular.io/)
[![Platforms](https://img.shields.io/badge/platform-macOS-lightgray.svg?logo=apple&longCache=true&style=popout)](https://www.apple.com/macos/)
[![Platforms](https://img.shields.io/badge/platform-windows-blue.svg?logo=windows&longCache=true&style=popout&logoColor=blue)](https://windows.com)
[![Platforms](https://img.shields.io/badge/platform-linux-yellow.svg?logo=linux&longCache=true&style=popout&colorB=FCC624)](https://www.linuxfoundation.org/)

[![License](https://img.shields.io/cocoapods/l/WinkKit.svg?style=flat)](./LICENSE)

Winkit CLI is a command line that allows you to manage and use all the related plugins developed by Wink.

## Supported plugins
- [WDK Angular CLI](https://github.com/WINKgroup/winkit-cli-angular.git)


## Minimum requirements
- [Yarn 1.10.1](https://yarnpkg.com/en/docs/install)
- [Node 10.11.0 + npm](https://nodejs.org/)

## Get started
- Go in winkit-cli folder and run `yarn install` (NOTE: in case of problems in Unix filesystems run `cd /usr/local/bin && chmod +x winkit`)
- Run `yarn link && yarn link "winkit"` in the folder where you will generate the project
- Open the terminal and type `winkit --help`

## Commands
```
$ add:plugin <name>
```
Add new plugin to your Winkit CLI.

#####
```
$ update:plugins <name>
```
Update an existing plugin of your Winkit CLI.

#####
```
delete:plugin <name>
```
Delete an existing plugin of your Winkit CLI.

## Contact

If you find any errors, typos, issues... basically anything that you think we should fix or improve in Winkit CLI, send us an email to info@wink.by