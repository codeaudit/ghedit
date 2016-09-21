define(["require","exports","vs/base/common/errors","vs/base/common/event","vs/base/common/lifecycle","vs/base/common/strings","vs/base/common/winjs.base","vs/editor/common/editorCommon","vs/editor/common/modes","vs/editor/contrib/snippet/common/snippet","./suggest","./completionModel","vs/editor/common/core/position"],function(t,e,i,o,n,s,r,u,g,h,l,c,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var d,f=function(){function t(t,e,i){this.auto=i;var o=t.getLineContent(e.lineNumber),n=t.getWordAtPosition(e);if(n?(this.wordBefore=o.substring(n.startColumn-1,e.column-1),this.wordAfter=o.substring(e.column-1,n.endColumn-1)):(this.wordBefore="",this.wordAfter=""),this.lineNumber=e.lineNumber,this.column=e.column,this.lineContentBefore=o.substr(0,e.column-1),this.lineContentAfter=o.substr(e.column-1),this.isInEditableRange=!0,t.hasEditableRange()){var s=t.getEditableRange();s.containsPosition(e)||(this.isInEditableRange=!1)}}return t.prototype.shouldAutoTrigger=function(){return 0!==this.wordBefore.length&&(!!isNaN(Number(this.wordBefore))&&!(this.wordAfter.length>0))},t.prototype.isDifferentContext=function(t){return this.lineNumber!==t.lineNumber||(t.column<this.column-this.wordBefore.length||(!s.startsWith(t.lineContentBefore,this.lineContentBefore)||this.lineContentAfter!==t.lineContentAfter||""===t.wordBefore&&t.lineContentBefore!==this.lineContentBefore))},t.prototype.shouldRetrigger=function(t){return!(!s.startsWith(this.lineContentBefore,t.lineContentBefore)||this.lineContentAfter!==t.lineContentAfter)&&(!(this.lineContentBefore.length>t.lineContentBefore.length&&0===this.wordBefore.length)&&(!this.auto||0!==t.wordBefore.length))},t}();!function(t){t[t.Idle=0]="Idle",t[t.Manual=1]="Manual",t[t.Auto=2]="Auto"}(d||(d={}));var p=function(){function t(t){var e=this;this.editor=t,this._onDidCancel=new o.Emitter,this._onDidTrigger=new o.Emitter,this._onDidSuggest=new o.Emitter,this._onDidAccept=new o.Emitter,this.state=d.Idle,this.triggerAutoSuggestPromise=null,this.requestPromise=null,this.raw=null,this.completionModel=null,this.incomplete=!1,this.context=null,this.toDispose=[],this.toDispose.push(this.editor.onDidChangeConfiguration(function(){return e.onEditorConfigurationChange()})),this.toDispose.push(this.editor.onDidChangeCursorSelection(function(t){return e.onCursorChange(t)})),this.toDispose.push(this.editor.onDidChangeModel(function(){return e.cancel()})),this.toDispose.push(g.SuggestRegistry.onDidChange(this.onSuggestRegistryChange,this)),this.onEditorConfigurationChange()}return Object.defineProperty(t.prototype,"onDidCancel",{get:function(){return this._onDidCancel.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onDidTrigger",{get:function(){return this._onDidTrigger.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onDidSuggest",{get:function(){return this._onDidSuggest.event},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"onDidAccept",{get:function(){return this._onDidAccept.event},enumerable:!0,configurable:!0}),t.prototype.cancel=function(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1);var i=this.state!==d.Idle;return this.triggerAutoSuggestPromise&&(this.triggerAutoSuggestPromise.cancel(),this.triggerAutoSuggestPromise=null),this.requestPromise&&(this.requestPromise.cancel(),this.requestPromise=null),this.state=d.Idle,this.raw=null,this.completionModel=null,this.incomplete=!1,this.context=null,t||this._onDidCancel.fire({retrigger:e}),i},t.prototype.getRequestPosition=function(){return this.context?new a.Position(this.context.lineNumber,this.context.column):null},t.prototype.isAutoSuggest=function(){return this.state===d.Auto},t.prototype.onCursorChange=function(t){var e=this;if(!t.selection.isEmpty())return void this.cancel();if("keyboard"!==t.source||t.reason!==u.CursorChangeReason.NotSet)return void this.cancel();if(g.SuggestRegistry.has(this.editor.getModel())){var i=this.state===d.Idle;if(!i||this.editor.getConfiguration().contribInfo.quickSuggestions){var o=this.editor.getModel();if(o){var n=new f(o,this.editor.getPosition(),(!1));i?(this.cancel(),n.shouldAutoTrigger()&&(this.triggerAutoSuggestPromise=r.TPromise.timeout(this.autoSuggestDelay),this.triggerAutoSuggestPromise.then(function(){e.triggerAutoSuggestPromise=null,e.trigger(!0)}))):this.raw&&this.incomplete?this.trigger(this.state===d.Auto,void 0,!0):this.onNewContext(n)}}}},t.prototype.onSuggestRegistryChange=function(){if(this.state!==d.Idle)return g.SuggestRegistry.has(this.editor.getModel())?void this.trigger(this.state===d.Auto,void 0,!0):void this.cancel()},t.prototype.trigger=function(t,e,o,n){var s=this;void 0===o&&(o=!1);var r=this.editor.getModel();if(r){var u=!!e;if(n=n||g.SuggestRegistry.orderedGroups(r),0!==n.length){var h=new f(r,this.editor.getPosition(),t);if(h.isInEditableRange){this.cancel(!1,o),this.state=t||u?d.Auto:d.Manual,this._onDidTrigger.fire({auto:this.isAutoSuggest(),characterTriggered:u,retrigger:o}),this.context=h;var c=this.editor.getPosition();this.requestPromise=l.provideSuggestionItems(r,c,{groups:n,snippetConfig:this.editor.getConfiguration().contribInfo.snippetSuggestions}).then(function(e){if(s.requestPromise=null,s.state!==d.Idle){s.raw=e,s.incomplete=e.some(function(t){return t.container.incomplete});var i=s.editor.getModel();i&&s.onNewContext(new f(i,s.editor.getPosition(),t))}}).then(null,i.onUnexpectedError)}}}},t.prototype.onNewContext=function(t){if(this.context&&this.context.isDifferentContext(t))return void(this.context.shouldRetrigger(t)?this.trigger(this.state===d.Auto,void 0,!0):this.cancel());if(this.raw){var e=this.isAutoSuggest(),i=!1;if(this.completionModel&&this.completionModel.raw===this.raw){var o=this.completionModel.lineContext;this.completionModel.lineContext={leadingLineContent:t.lineContentBefore,characterCountDelta:this.context?t.column-this.context.column:0},e||0!==this.completionModel.items.length||(this.completionModel.lineContext=o,i=!0)}else this.completionModel=new c.CompletionModel(this.raw,t.lineContentBefore);this._onDidSuggest.fire({completionModel:this.completionModel,currentWord:t.wordBefore,isFrozen:i,auto:this.isAutoSuggest()})}},t.prototype.accept=function(t,e,i){return null!==this.raw&&(this._onDidAccept.fire({snippet:new h.CodeSnippet(t.codeSnippet),overwriteBefore:e+(this.editor.getPosition().column-this.context.column),overwriteAfter:i}),this.cancel(),!0)},t.prototype.onEditorConfigurationChange=function(){this.autoSuggestDelay=this.editor.getConfiguration().contribInfo.quickSuggestionsDelay,(isNaN(this.autoSuggestDelay)||!this.autoSuggestDelay&&0!==this.autoSuggestDelay||this.autoSuggestDelay<0)&&(this.autoSuggestDelay=10)},t.prototype.dispose=function(){this.cancel(!0),this.toDispose=n.dispose(this.toDispose)},t}();e.SuggestModel=p});