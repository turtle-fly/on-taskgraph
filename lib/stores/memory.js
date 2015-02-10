// Copyright 2014, Renasar Technologies Inc.
/* jshint: node:true */
'use strict';

var di = require('di');

module.exports = memoryStoreFactory;
di.annotate(memoryStoreFactory, new di.Provide('TaskGraph.Stores.Memory'));
di.annotate(memoryStoreFactory,
    new di.Inject(
        'Q',
        '_'
    )
);

function memoryStoreFactory(Q, _) {
    function MemoryStore() {
        this.store = {};
    }

    MemoryStore.prototype.put = function(name, value) {
        this.store[name] = value;
    };

    MemoryStore.prototype.get = function(name) {
        return this.store[name];
    };

    MemoryStore.prototype.getAll = function(filter) {
        //TODO: implement filter once design is agreed, for now return all
        filter;
        return _.values(this.store);
    };

    MemoryStore.prototype.remove = function(name) {
        delete this.store[name];
        return this;
    };

    return MemoryStore;
}