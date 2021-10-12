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
const repository = Repository.repository(notary, storage, debug);
const compiler = require('bali-type-compiler').api(debug);
const types = [
    '/nebula/abstractions/Component',  // must be first

    '/nebula/libraries/Chainable',
    '/nebula/libraries/Logical',
    '/nebula/libraries/Scalable',      // must be before Numerical and Radial
    '/nebula/libraries/Numerical',
    '/nebula/libraries/Radial',

    '/nebula/interfaces/Composite',
    '/nebula/interfaces/Continuous',
    '/nebula/interfaces/Discrete',
    '/nebula/interfaces/Polarized',
    '/nebula/interfaces/Sequential',
    '/nebula/interfaces/Sortable',

    '/nebula/abstractions/Aspect',
    '/nebula/abstractions/Collection',
    '/nebula/abstractions/Element',
    '/nebula/abstractions/String',
    '/nebula/abstractions/Type',

    '/nebula/agents/Comparator',
    '/nebula/agents/Formatter',
    '/nebula/agents/Iterator',
    '/nebula/agents/Parser',
    '/nebula/agents/Sorter',
    '/nebula/agents/Visitor',

    '/nebula/aspects/Attribute',
    '/nebula/aspects/Event',
    '/nebula/aspects/Function',
    '/nebula/aspects/Handler',
    '/nebula/aspects/Message',
    '/nebula/aspects/Method',
    '/nebula/aspects/Parameter',

    '/nebula/collections/Association',
    '/nebula/collections/Catalog',
    '/nebula/collections/List',
    '/nebula/collections/Queue',
    '/nebula/collections/Range',
    '/nebula/collections/Set',
    '/nebula/collections/Stack',

    '/nebula/elements/Angle',
    '/nebula/elements/Boolean',
    '/nebula/elements/Duration',
    '/nebula/elements/Moment',
    '/nebula/elements/Number',
    '/nebula/elements/Pattern',
    '/nebula/elements/Percentage',
    '/nebula/elements/Probability',
    '/nebula/elements/Resource',
    '/nebula/elements/Tag',

    '/nebula/enumerations/Access',
    '/nebula/enumerations/Encoding',
    '/nebula/enumerations/Existence',
    '/nebula/enumerations/Ranking',
    '/nebula/enumerations/Visibility',

    '/nebula/strings/Binary',
    '/nebula/strings/Name',
    '/nebula/strings/Symbol',
    '/nebula/strings/Text',
    '/nebula/strings/Version',

    '/nebula/trees/Node',
    '/nebula/trees/Procedure',

    '/nebula/types/Class',
    '/nebula/types/Enumeration',
    '/nebula/types/Interface',
    '/nebula/types/Library',
    '/nebula/types/Primitive',
    '/nebula/types/Structure'
];


describe('Bali Nebula™ Type Compilation', function() {

    describe('Initialize the environment', function() {

        it('should generate the notary key and publish its certificate', async function() {
            const publicKey = await notary.generateKey();
            const certificate = await notary.notarizeDocument(publicKey);
            const citation = await notary.activateKey(certificate);
            expect(bali.areEqual(citation, await storage.writeContract(certificate))).is.true;
        });

    });

    describe('Compile and commit the types', function() {

        types.forEach(function(name) {

            it(name, async function() {
                // parse the type
                const filename = 'src' + name + '.bali';
                var source = await pfs.readFile(filename, 'utf8');
                const type = bali.component(source);
                expect(type).to.exist;

                // compile the source code
                await compiler.compileType(repository, type);

                // check for differences
                source = bali.document(type);
                await pfs.writeFile(filename, source, 'utf8');
                const expected = await pfs.readFile(filename, 'utf8');
                expect(expected).to.exist;
                expect(source).to.equal(expected);

                // write the compiled type to the repository
                const citation = await repository.signContract(name + '/v1', type);
                expect(citation).to.exist;
            });

        });

    });

});
