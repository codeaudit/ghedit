/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'child_process', 'vs/base/common/winjs.base', 'vs/base/common/async', 'vs/base/common/objects', 'vs/base/parts/ipc/common/ipc'], function (require, exports, child_process_1, winjs_base_1, async_1, objects_1, ipc_1) {
    "use strict";
    var Server = (function (_super) {
        __extends(Server, _super);
        function Server() {
            var _this = this;
            _super.call(this, {
                send: function (r) { try {
                    process.send(r);
                }
                catch (e) { } },
                onMessage: function (cb) { return process.on('message', cb); }
            });
            process.once('disconnect', function () { return _this.dispose(); });
        }
        return Server;
    }(ipc_1.Server));
    exports.Server = Server;
    var Client = (function () {
        function Client(modulePath, options) {
            this.modulePath = modulePath;
            this.options = options;
            var timeout = options && options.timeout ? options.timeout : 60000;
            this.disposeDelayer = new async_1.Delayer(timeout);
            this.activeRequests = [];
            this.child = null;
            this._client = null;
            this.channels = Object.create(null);
        }
        Client.prototype.getChannel = function (channelName) {
            var _this = this;
            var call = function (command, arg) { return _this.request(channelName, command, arg); };
            return { call: call };
        };
        Client.prototype.request = function (channelName, name, arg) {
            var _this = this;
            this.disposeDelayer.cancel();
            var channel = this.channels[channelName] || (this.channels[channelName] = this.client.getChannel(channelName));
            var request = channel.call(name, arg);
            // Progress doesn't propagate across 'then', we need to create a promise wrapper
            var result = new winjs_base_1.Promise(function (c, e, p) {
                request.then(c, e, p).done(function () {
                    if (!_this.activeRequests) {
                        return;
                    }
                    _this.activeRequests.splice(_this.activeRequests.indexOf(result), 1);
                    _this.disposeDelayer.trigger(function () { return _this.disposeClient(); });
                });
            }, function () { return request.cancel(); });
            this.activeRequests.push(result);
            return result;
        };
        Object.defineProperty(Client.prototype, "client", {
            get: function () {
                var _this = this;
                if (!this._client) {
                    var args = this.options && this.options.args ? this.options.args : [];
                    var forkOpts = undefined;
                    if (this.options) {
                        forkOpts = Object.create(null);
                        if (this.options.env) {
                            forkOpts.env = objects_1.assign(objects_1.clone(process.env), this.options.env);
                        }
                        if (typeof this.options.debug === 'number') {
                            forkOpts.execArgv = ['--nolazy', '--debug=' + this.options.debug];
                        }
                        if (typeof this.options.debugBrk === 'number') {
                            forkOpts.execArgv = ['--nolazy', '--debug-brk=' + this.options.debugBrk];
                        }
                    }
                    this.child = child_process_1.fork(this.modulePath, args, forkOpts);
                    this._client = new ipc_1.Client({
                        send: function (r) { return _this.child && _this.child.connected && _this.child.send(r); },
                        onMessage: function (cb) {
                            _this.child.on('message', function (msg) {
                                // Handle console logs specially
                                if (msg && msg.type === '__$console') {
                                    var args_1 = ['%c[IPC Library: ' + _this.options.serverName + ']', 'color: darkgreen'];
                                    try {
                                        var parsed_1 = JSON.parse(msg.arguments);
                                        args_1 = args_1.concat(Object.getOwnPropertyNames(parsed_1).map(function (o) { return parsed_1[o]; }));
                                    }
                                    catch (error) {
                                        args_1.push(msg.arguments);
                                    }
                                    console[msg.severity].apply(console, args_1);
                                }
                                else {
                                    cb(msg);
                                }
                            });
                        }
                    });
                    var onExit_1 = function () { return _this.disposeClient(); };
                    process.once('exit', onExit_1);
                    this.child.on('error', function (err) { return console.warn('IPC "' + _this.options.serverName + '" errored with ' + err); });
                    this.child.on('exit', function (code, signal) {
                        process.removeListener('exit', onExit_1);
                        if (_this.activeRequests) {
                            _this.activeRequests.forEach(function (req) { return req.cancel(); });
                            _this.activeRequests = [];
                        }
                        if (code && signal !== 'SIGTERM') {
                            console.warn('IPC "' + _this.options.serverName + '" crashed with exit code ' + code);
                            _this.disposeDelayer.cancel();
                            _this.disposeClient();
                        }
                    });
                }
                return this._client;
            },
            enumerable: true,
            configurable: true
        });
        Client.prototype.disposeClient = function () {
            if (this._client) {
                this.child.kill();
                this.child = null;
                this._client = null;
                this.channels = Object.create(null);
            }
        };
        Client.prototype.dispose = function () {
            this.disposeDelayer.cancel();
            this.disposeDelayer = null;
            this.disposeClient();
            this.activeRequests = null;
        };
        return Client;
    }());
    exports.Client = Client;
});
//# sourceMappingURL=ipc.cp.js.map