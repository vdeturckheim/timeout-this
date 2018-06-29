/**
 * Copyright (c) 2016 - 2018 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const { expect } = require('code');
const Lab = require('lab');
const { suite, test } = exports.lab = Lab.script();

const Mod = require('../index.js');

suite('makeTimeoutable', () => {

    test('this method should run as expected', () => {

        const holder = {
            action: function (str) {

                return `Hello, ${str}`;
            }
        };

        Mod.makeTimeoutable(holder, 'action');

        expect(holder.action('you')).to.equal('Hello, you');
        expect(holder.action('you', 1000)).to.equal('Hello, you');
    });

    test('this method should be interrupted', { plan: 1 }, () => {

        const validateEmailFormat = function ( string ) {

            const emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return emailExpression.exec( string, 1000 );
        };

        Mod.makeTimeoutable(RegExp.prototype, 'exec');

        try {
            validateEmailFormat('jjjjjjjjjjjjjjjjjjjjjjjjjjjj@ccccccccccccccccccccccccccccc.555555555555555555555555555555555555555555555555555555{');
            return Promise.reject();
        }
        catch (e) {
            expect(e).to.exist();
        }
    });
});

