# Shitty-men

Stupid in every level: uses Mongo, Express and Node to create a rest api. Even a 11 year old can do this. But we do it and... we make some money.

## About the configurations

### Database

If you need to change the IP or collection of the database, go to app/helper/constants.js. You will find:

```javascript
//Changes go here for the IP
module.exports = Object.freeze({
    MONGO_IP_DEV: '{your database ip}/{your database collection}'
});
```

### Server 

If you need to make changes to the binded IP of the server (although it binds currently to 0.0.0.0, which will work on every network interface you have) or to the port, see <code>server.js</code> in the main directory. 

You will find the following (at line ~17):

```javascript
const port = process.env.PORT || 8080; // set our port
```
That is where you may change the default port. You can also pass the argument <code>--port</code> in case you need to bind to any other port instead of the default one.

## The code

The structure goes like this: 

* <code>app/repository</code> has every connection to the database. It uses the mongojs lib and each file will contain queries related to a specific entity (for instance, companies has queries related to it, etc).
* <code>app/router</code> has every route and control of the route. As I said before... there is project pattern with pretty controllers around and etcera. You just define the route importing route from express and voilá. Do not forget to add it to <code>app/router/index</code> later!
* the others parts are just helpers and modules (like login and jwt). Don't worry about it :)
