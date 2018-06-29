/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const VM = require('vm');
const Shimmer = require('shimmer');

module.exports.makeTimeoutable = function (holder, method) {

    Shimmer.wrap(holder, method, (orig) => {

        return function () {

            const lastArg = arguments[arguments.length - 1];

            const timeout = (typeof lastArg === 'number' && lastArg > 0) ? lastArg : undefined;

            const box = {
                orig,
                self: this,
                args: arguments,
                result: null
            };
            VM.runInNewContext('result = orig.apply(self, args);', box, { timeout });
            return box.result;
        };
    });
};

