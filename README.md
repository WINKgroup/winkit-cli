# Winkit CLI

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

If you find any errors, typos, issues... basically anything that you think we should fix or improve in WDK Angular, send us an email to info@wink.by