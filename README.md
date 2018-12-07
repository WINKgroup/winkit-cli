# Winkit CLI

Using this CLI you can start a new WDK Angular Project from scratch and manage its content.

A WDK Angular project is a base platform generated with [Angular CLI](https://github.com/angular/angular-cli) that has the goal of generating a platform to menage CRUD of dynamic content.

## Minimum requirements
- [Yarn 1.10.1](https://yarnpkg.com/en/docs/install)
- [Node 8.12.0 + npm](https://nodejs.org/)

## Get started
- Go in winkit-cli folder and run `yarn install` (NOTE: in case of problems in Unix filesystems run `cd /usr/local/bin && chmod +x winkit`)
- Run `yarn link && yarn link "winkit"` in the folder where you will generate the project
- Open the terminal and type `winkit --help`

## Init new WDK Angular Based project
- [Configure your server](#conf-server)
- Create a new folder and go inside
- Run `winkit angular init <projectName>`
- Choose the server you want to work with (**Firestore** or **Strapi / Http**)
- Enjoy!

<a name="conf-server"></a>
## Server configuration

### a. Firestore

If you want to use WDK Angular with Firestore you must first configure your project in [Firebase](https://console.firebase.google.com/u/0/).
<br>Once the project is created, open `/src/environments/environment.ts` and update `firebaseConfig` with the project info.
<br>Do the same for `/src/environments/environment.prod.ts` with info for production environment.

### b. Strapi
1. install strapi globally
```
npm install strapi@alpha -g
```

2. Run the following command line in your terminal:
```
strapi new strapi-winkit
```

3. Go to your project and launch the server:
```
cd strapi-winkit
strapi start
```

4. Create your first admin user

5. Open `strapi-winkit/plugins/users-permissions/models/User.settings.json`

6. Replace the content with the following:

```
{
  "connection": "default",
  "info": {
    "name": "user",
    "description": ""
  },
  "attributes": {
    "username": {
      "type": "string",
      "minLength": 3,
      "unique": true,
      "configurable": false,
      "required": true
    },
    "email": {
      "type": "email",
      "minLength": 6,
      "configurable": false,
      "required": true
    },
    "provider": {
      "type": "string",
      "configurable": false
    },
    "password": {
      "type": "password",
      "minLength": 6,
      "configurable": false,
      "private": true
    },
    "resetPasswordToken": {
      "type": "string",
      "configurable": false,
      "private": true
    },
    "confirmed": {
      "type": "boolean",
      "default": false,
      "configurable": false
    },
    "blocked": {
      "type": "boolean",
      "default": false,
      "configurable": false
    },
    "role": {
      "model": "role",
      "via": "users",
      "plugin": "users-permissions",
      "configurable": false
    },
    "userRole": {
      "default": "",
      "type": "string"
    },
    "firstName": {
      "default": "",
      "type": "string"
    },
    "lastName": {
      "default": "",
      "type": "string"
    },
    "description": {
      "default": "",
      "type": "string"
    },
    "telephone": {
      "default": "",
      "type": "string"
    },
    "profileImg": {
      "default": "",
      "type": "string"
    },
    "dateOfBirth": {
      "default": "",
      "type": "integer"
    },
    "registeredAt": {
      "default": "",
      "type": "integer"
    },
    "isMale": {
      "default": false,
      "type": "boolean"
    },
    "media": {
      "model": "file",
      "via": "related",
      "plugin": "upload",
      "required": false
    }
  },
  "collectionName": "users-permissions_user"
}

```

7. Go to `http://localhost:1337/admin/plugins/content-manager/user?source=users-permissions`

8. Open the admin detail and populate the userRole field with the value `ADMIN` then save.

9. Now you can log into WDK Angular using these user credentials!

# Commands

### add:plugin \<name\>

Add new plugin to your Winkit CLI.

### update:plugins \<name\>

Update an existing plugin of your Winkit CLI.

### delete:plugin \<name\>

Delete an existing plugin of your Winkit CLI.

## Winkit Angular commands

For documentation on Winkit Angular commands go [here](./angular/README.md)

# Known issues
- Strapi has been reported to not support Node.js >9 versions on certain versions of Windows. [Link to issue](https://github.com/strapi/strapi/issues/1602)
- In Firestore the filter feature is case sensitive and must match the whole value

# Contact

If you find any errors, typos, issues... basically anything that you think we should fix or improve in WDK Angular, send us an email to info@wink.by