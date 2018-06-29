# timeout-this
Timeout synchronous code in Node.js

This module can be used to add a timeout to a method.
For instance, if you want to prevent `Regex.prototype.exec` to run longer than 1 second
(maybe to prevent Regexp DoS), you can do:

```
const TimeoutThis = require('timeout-this');
TimeoutThis.makeTimeoutable(RegExp.prototype, 'exec');
```

Then, if you pass an additional numeric argument to `Regex.prototype.exec`,
it will be used as timeout in milliseconds:

```
const validateEmailFormat = function ( string ) {

            const emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return emailExpression.exec( string, 1000 );
};
```

