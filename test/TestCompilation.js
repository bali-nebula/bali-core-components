/************************************************************************
 * Copyright (c) Crater Dog Technologies(TM).  All Rights Reserved.     *
 ************************************************************************
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.        *
 *                                                                      *
 * This code is free software; you can redistribute it and/or modify it *
 * under the terms of The MIT License (MIT), as published by the Open   *
 * Source Initiative. (See http://opensource.org/licenses/MIT)          *
 ************************************************************************/

const debug = 1;
const fs = require('fs');
const mocha = require('mocha');
const expect = require('chai').expect;
const bali = require('bali-component-framework').api(1);
const compiler = require('bali-type-compiler').api(debug);


describe('Bali Nebula™ Type Compilation', function() {

    describe('Compile the core Bali type definitions.', function() {

        const folder = './src/bali/';
        const directories = fs.readdirSync(folder);
        for (var i = 0; i < directories.length; i++) {
            var type = directories[i];
            var directory = folder + type + '/';

            it('should compile the ' + type + ' type', function() {
                const files = fs.readdirSync(directory);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];

                    // read in the source code
                    console.log('      ' + file);
                    var prefix = file.split('.').slice(0, 1);
                    var filename = directory + prefix + '.bali';
                    var source = fs.readFileSync(filename, 'utf8');
                    var type = bali.component(source);
                    expect(type).to.exist;

                    // compile the source code
                    compiler.compileType(type);

                    // check for differences
                    source = type.toString() + '\n';  // POSIX compliant <EOL>
                    fs.writeFileSync(filename, source, 'utf8');
                    var expected = fs.readFileSync(filename, 'utf8');
                    expect(expected).to.exist;
                    expect(source).to.equal(expected);
                }
            });

        }

    });

});
