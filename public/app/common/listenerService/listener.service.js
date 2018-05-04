var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TaListenerService = (function () {
        function TaListenerService() {
            this.listeners = [];
            this.callbacks = [];
        }
        TaListenerService.prototype.find = function (event, listener) {
            if (this.listeners[event] == undefined || this.listeners[event] == null)
                return null;
            var index = this.listeners[event].indexOf(listener);
            if (index < 0)
                return null;
            return this.listeners[event][index];
        };
        TaListenerService.prototype.contains = function (event, listener) {
            if (this.listeners[event] == undefined || this.listeners[event] == null)
                return false;
            var index = this.listeners[event].indexOf(listener);
            return index >= 0;
        };
        TaListenerService.prototype.Subscribe = function (events, listener) {
            var _this = this;
            var self = this;
            events.forEach(function (event) {
                if (_this.listeners[event] == undefined) {
                    _this.listeners[event] = [];
                }
                if (!_this.contains(event, listener)) {
                    _this.listeners[event].push(listener);
                }
            });
        };
        TaListenerService.prototype.Unsubscribe = function (events, listener) {
            var _this = this;
            events.forEach(function (event) {
                _(_this.listeners[event]).remove(function (l) { return l == listener; }).commit();
            });
        };
        TaListenerService.prototype.Notify = function (event) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (this.listeners[event] == undefined)
                return;
            var self = this;
            this.listeners[event].forEach(function (listener) {
                listener[self.callbacks[event]].apply(listener, params);
            });
        };
        TaListenerService.prototype.Emit = function (event) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            params.unshift(event);
            this.Notify.apply(this, params);
        };
        return TaListenerService;
    }());
    exports.EventTypes = {
        CART_CLEARED: 'CART_CLEARED'
    };
    var ListenerService = (function (_super) {
        __extends(ListenerService, _super);
        function ListenerService() {
            var _this = _super.call(this) || this;
            _this.callbacks[exports.EventTypes.CART_CLEARED] = 'onCartCleared';
            return _this;
        }
        ListenerService.prototype.emitCartCleared = function () {
            this.Emit(exports.EventTypes.CART_CLEARED);
        };
        return ListenerService;
    }(TaListenerService));
    ListenerService.$inject = [];
    exports.NAME = 'vcListenerService';
    exports.default = ListenerService;
});
//# sourceMappingURL=listener.service.js.map