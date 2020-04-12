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
const pfs = require('fs').promises;
const crypto = require('crypto');
const mocha = require('mocha');
const expect = require('chai').expect;
const bali = require('bali-component-framework').api(1);
const compiler = require('bali-type-compiler').api(debug);


describe('Bali Nebula™ Type Compilation', function() {

    describe('Compile the types.', function() {

        it('should compile the metatypes', async function() {
            const folder = './src/bali/types/';
            const files = await pfs.readdir(folder);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // read in the source code
                console.log('      ' + file);
                var prefix = file.split('.').slice(0, 1);
                var filename = folder + prefix + '.bali';
                var source = await pfs.readFile(filename, 'utf8');
                var type = bali.component(source);
                expect(type).to.exist;

                // compile the source code
                await compiler.compileType(type);

                // check for differences
                source = type.toString() + '\n';  // POSIX compliant <EOL>
                await pfs.writeFile(filename, source, 'utf8');
                var expected = await pfs.readFile(filename, 'utf8');
                expect(expected).to.exist;
                expect(source).to.equal(expected);
            }
        });

        it('should compile the abstract types', async function() {
            const folder = './src/bali/types/';
            const files = await pfs.readdir(folder);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // read in the source code
                console.log('      ' + file);
                var prefix = file.split('.').slice(0, 1);
                var filename = folder + prefix + '.bali';
                var source = await pfs.readFile(filename, 'utf8');
                var type = bali.component(source);
                expect(type).to.exist;

                // compile the source code
                await compiler.compileType(type);

                // check for differences
                source = type.toString() + '\n';  // POSIX compliant <EOL>
                await pfs.writeFile(filename, source, 'utf8');
                var expected = await pfs.readFile(filename, 'utf8');
                expect(expected).to.exist;
                expect(source).to.equal(expected);
            }
        });

        it('should compile the interface types', async function() {
            const folder = './src/bali/interfaces/';
            const files = await pfs.readdir(folder);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // read in the source code
                console.log('      ' + file);
                var prefix = file.split('.').slice(0, 1);
                var filename = folder + prefix + '.bali';
                var source = await pfs.readFile(filename, 'utf8');
                var type = bali.component(source);
                expect(type).to.exist;

                // compile the source code
                await compiler.compileType(type);

                // check for differences
                source = type.toString() + '\n';  // POSIX compliant <EOL>
                await pfs.writeFile(filename, source, 'utf8');
                var expected = await pfs.readFile(filename, 'utf8');
                expect(expected).to.exist;
                expect(source).to.equal(expected);
            }
        });

        it('should compile the collection types', async function() {
            const folder = './src/bali/collections/';
            const files = await pfs.readdir(folder);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                // read in the source code
                console.log('      ' + file);
                var prefix = file.split('.').slice(0, 1);
                var filename = folder + prefix + '.bali';
                var source = await pfs.readFile(filename, 'utf8');
                var type = bali.component(source);
                expect(type).to.exist;

                // compile the source code
                await compiler.compileType(type);

                // check for differences
                source = type.toString() + '\n';  // POSIX compliant <EOL>
                await pfs.writeFile(filename, source, 'utf8');
                var expected = await pfs.readFile(filename, 'utf8');
                expect(expected).to.exist;
                expect(source).to.equal(expected);
            }
        });

    });

});
