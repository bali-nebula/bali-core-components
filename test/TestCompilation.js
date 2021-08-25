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
    const folder = './src/bali/';
    const directories = fs.readdirSync(folder);
    for (var i = 0; i < directories.length; i++) {
        const name = directories[i];
        const directory = folder + name + '/';
        describe('Compile the ' + name + ' definitions.', function() {
            const files = fs.readdirSync(directory);
            for (var j = 0; j < files.length; j++) {
                const file = files[j];
                const prefix = file.split('.').slice(0, 1);
                it('should compile the ' + prefix + ' name', function() {

                    // read in the source code
                    var filename = directory + prefix + '.bali';
                    var source = fs.readFileSync(filename, 'utf8');
                    var type = bali.component(source);
                    expect(type).to.exist;

                    // compile the source code
                    compiler.compileType(type);

                    // check for differences
                    source = type.toDocument();
                    fs.writeFileSync(filename, source, 'utf8');
                    var expected = fs.readFileSync(filename, 'utf8');
                    expect(expected).to.exist;
                    expect(source).to.equal(expected);
                });
            }
        });
    }
});
