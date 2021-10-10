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
const directory = 'test/config/';
const pfs = require('fs').promises;
const mocha = require('mocha');
const expect = require('chai').expect;
const bali = require('bali-component-framework').api();
const account = bali.component('#GTDHQ9B8ZGS7WCBJJJBFF6KDCCF55R2P');
const notary = require('bali-digital-notary').test(account, directory, debug);
const Repository = require('bali-document-repository');
const storage = Repository.test(notary, directory);
const repository = Repository.repository(notary, storage);
const compiler = require('bali-type-compiler').api(debug);


describe('Bali Nebula™ Type Compilation', function() {

    describe('Initialize the environment', function() {

        it('should generate the notary key and publish its certificate', async function() {
            const publicKey = await notary.generateKey();
            const certificate = await notary.notarizeDocument(publicKey);
            const citation = await notary.activateKey(certificate);
            expect(bali.areEqual(citation, await storage.writeContract(certificate))).is.true;
        });

    });

    describe('Compile and commit the abstract types', function() {

        var name = '/nebula/abstractions/Component';
        it(name, async function() {
            // parse the type
            var filename = 'src' + name + '.bali';
            var source = await pfs.readFile(filename, 'utf8');
            var type = bali.component(source);
            expect(type).to.exist;

            // compile the source code
            await compiler.compileType(repository, type);

            // check for differences
            source = bali.document(type);
            //await pfs.writeFile(filename, source, 'utf8');
            var expected = await pfs.readFile(filename, 'utf8');
            expect(expected).to.exist;
            expect(source).to.equal(expected);
        });

    });

});
