/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},__decorate=this&&this.__decorate||function(e,t,i,n){var o,r=arguments.length,a=r<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var d=e.length-1;d>=0;d--)(o=e[d])&&(a=(r<3?o(a):r>3?o(t,i,a):o(t,i))||a);return r>3&&a&&Object.defineProperty(t,i,a),a},__param=this&&this.__param||function(e,t){return function(i,n){t(i,n,e)}};define(["require","exports","vs/base/common/lifecycle","vs/platform/contextview/browser/contextView","vs/platform/instantiation/common/instantiation","vs/platform/keybinding/browser/keybindingServiceImpl","vs/platform/commands/common/commands","vs/platform/keybinding/common/keybinding","vs/platform/telemetry/common/telemetry","vs/editor/common/editorCommon","vs/editor/common/services/codeEditorService","vs/editor/common/services/editorWorkerService","vs/editor/browser/standalone/simpleServices","vs/editor/browser/standalone/standaloneServices","vs/editor/browser/widget/codeEditorWidget","vs/editor/browser/widget/diffEditorWidget"],function(e,t,i,n,o,r,a,d,s,c,l,p,y,u,v,f){"use strict";var _=function(e){function t(t,i,n,o,a,d,s,l,p){s instanceof r.AbstractKeybindingService&&s.setInstantiationService(o),i=i||{},e.call(this,t,i,o,a,d,s.createScoped(t),l),s instanceof y.StandaloneKeybindingService&&(this._standaloneKeybindingService=s),this._contextViewService=p,this._toDispose2=n;var u=null;if("undefined"==typeof i.model?(u=self.monaco.editor.createModel(i.value||"",i.language||"text/plain"),this._ownsModel=!0):(u=i.model,delete i.model,this._ownsModel=!1),this._attachModel(u),u){var v={oldModelUrl:null,newModelUrl:u.uri};this.emit(c.EventType.ModelChanged,v)}}return __extends(t,e),t.prototype.dispose=function(){e.prototype.dispose.call(this),this._toDispose2=i.dispose(this._toDispose2)},t.prototype.destroy=function(){this.dispose()},t.prototype.addCommand=function(e,t,i){return this._standaloneKeybindingService?this._standaloneKeybindingService.addDynamicKeybinding(e,t,i):(console.warn("Cannot add command because the editor is configured with an unrecognized KeybindingService"),null)},t.prototype.createContextKey=function(e,t){return this._standaloneKeybindingService?this._standaloneKeybindingService.createKey(e,t):(console.warn("Cannot create context key because the editor is configured with an unrecognized KeybindingService"),null)},t.prototype.addAction=function(t){var i=this;if(e.prototype.addAction.call(this,t),!this._standaloneKeybindingService)return console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService"),null;if(Array.isArray(t.keybindings)){var n=function(e){return i.trigger("keyboard",t.id,null)};t.keybindings.forEach(function(e){i._standaloneKeybindingService.addDynamicKeybinding(e,n,t.keybindingContext,t.id)})}},t.prototype._attachModel=function(t){e.prototype._attachModel.call(this,t),this._view&&this._contextViewService.setContainer(this._view.domNode)},t.prototype._postDetachModelCleanup=function(t){e.prototype._postDetachModelCleanup.call(this,t),t&&this._ownsModel&&(t.destroy(),this._ownsModel=!1)},t=__decorate([__param(3,o.IInstantiationService),__param(4,l.ICodeEditorService),__param(5,a.ICommandService),__param(6,d.IKeybindingService),__param(7,s.ITelemetryService),__param(8,n.IContextViewService)],t)}(v.CodeEditorWidget);t.StandaloneEditor=_;var h=function(e){function t(t,i,n,o,a,d,s){a instanceof r.AbstractKeybindingService&&a.setInstantiationService(o),e.call(this,t,i,s,a,o),a instanceof y.StandaloneKeybindingService&&(this._standaloneKeybindingService=a),this._contextViewService=d,this._toDispose2=n,this._contextViewService.setContainer(this._containerDomElement)}return __extends(t,e),t.prototype.dispose=function(){e.prototype.dispose.call(this),this._toDispose2=i.dispose(this._toDispose2)},t.prototype.destroy=function(){this.dispose()},t.prototype.addCommand=function(e,t,i){return this._standaloneKeybindingService?this._standaloneKeybindingService.addDynamicKeybinding(e,t,i):(console.warn("Cannot add command because the editor is configured with an unrecognized KeybindingService"),null)},t.prototype.createContextKey=function(e,t){return this._standaloneKeybindingService?this._standaloneKeybindingService.createKey(e,t):(console.warn("Cannot create context key because the editor is configured with an unrecognized KeybindingService"),null)},t.prototype.addAction=function(t){var i=this;if(e.prototype.addAction.call(this,t),!this._standaloneKeybindingService)return console.warn("Cannot add keybinding because the editor is configured with an unrecognized KeybindingService"),null;if(Array.isArray(t.keybindings)){var n=function(e){return i.trigger("keyboard",t.id,null)};t.keybindings.forEach(function(e){i._standaloneKeybindingService.addDynamicKeybinding(e,n,t.keybindingContext,t.id)})}},t=__decorate([__param(3,o.IInstantiationService),__param(4,d.IKeybindingService),__param(5,n.IContextViewService),__param(6,p.IEditorWorkerService)],t)}(f.DiffEditorWidget);t.StandaloneDiffEditor=h,t.startup=function(){var e=!1,t=!1;return{initStaticServicesIfNecessary:function(){e||(e=!0,u.getOrCreateStaticServices())},setupServices:function(i){return t?void console.error("Call to monaco.editor.setupServices is ignored because it was called before"):(t=!0,e?void console.error("Call to monaco.editor.setupServices is ignored because other API was called before"):u.ensureStaticPlatformServices(i))}}}()});