/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)};define(["require","exports","vs/nls","vs/base/common/async","vs/base/common/keyCodes","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/editor/common/editorAction","vs/editor/common/editorActionEnablement","vs/editor/common/editorCommon","vs/editor/common/core/range","vs/editor/common/editorCommonExtensions","vs/editor/browser/editorBrowserExtensions","vs/editor/contrib/folding/common/indentFoldStrategy","vs/css!./folding"],function(e,t,o,n,i,r,s,d,a,l,c,u,p,h){"use strict";var f=function(){function e(e,t,o){this.decorationIds=[],this.update(e,t,o)}return Object.defineProperty(e.prototype,"isCollapsed",{get:function(){return this._isCollapsed},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isExpanded",{get:function(){return!this._isCollapsed},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"indent",{get:function(){return this._indent},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"startLineNumber",{get:function(){return this._lastRange?this._lastRange.startLineNumber:void 0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"endLineNumber",{get:function(){return this._lastRange?this._lastRange.endLineNumber:void 0},enumerable:!0,configurable:!0}),e.prototype.setCollapsed=function(e,t){this._isCollapsed=e,this.decorationIds.length>0&&t.changeDecorationOptions(this.decorationIds[0],this.getVisualDecorationOptions())},e.prototype.getDecorationRange=function(e){return this.decorationIds.length>0?e.getDecorationRange(this.decorationIds[1]):null},e.prototype.getVisualDecorationOptions=function(){return this._isCollapsed?{stickiness:l.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,inlineClassName:"inline-folded",linesDecorationsClassName:"folding collapsed"}:{stickiness:l.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,linesDecorationsClassName:"folding"}},e.prototype.getRangeDecorationOptions=function(){return{stickiness:l.TrackedRangeStickiness.GrowsOnlyWhenTypingBefore}},e.prototype.update=function(e,t,o){this._lastRange=e,this._isCollapsed=!!e.isCollapsed,this._indent=e.indent;var n=[],i=t.getLineMaxColumn(e.startLineNumber),r={startLineNumber:e.startLineNumber,startColumn:i-1,endLineNumber:e.startLineNumber,endColumn:i};n.push({range:r,options:this.getVisualDecorationOptions()});var s={startLineNumber:e.startLineNumber,startColumn:1,endLineNumber:e.endLineNumber,endColumn:t.getLineMaxColumn(e.endLineNumber)};n.push({range:s,options:this.getRangeDecorationOptions()}),this.decorationIds=o.deltaDecorations(this.decorationIds,n)},e.prototype.dispose=function(e){this._lastRange=null,this.decorationIds=e.deltaDecorations(this.decorationIds,[])},e.prototype.toString=function(){var e=this.isCollapsed?"collapsed ":"expanded ";return e+=this._lastRange?this._lastRange.startLineNumber+"/"+this._lastRange.endLineNumber:"no range"},e}(),g=function(){function e(e){var t=this;this.editor=e,this._isEnabled=this.editor.getConfiguration().contribInfo.folding,this.globalToDispose=[],this.localToDispose=[],this.decorations=[],this.computeToken=0,this.globalToDispose.push(this.editor.onDidChangeModel(function(){return t.onModelChanged()})),this.globalToDispose.push(this.editor.onDidChangeConfiguration(function(e){var o=t._isEnabled;t._isEnabled=t.editor.getConfiguration().contribInfo.folding,o!==t._isEnabled&&t.onModelChanged()})),this.onModelChanged()}return e.getFoldingController=function(t){return t.getContribution(e.ID)},e.prototype.getId=function(){return e.ID},e.prototype.dispose=function(){this.cleanState(),this.globalToDispose=r.dispose(this.globalToDispose)},e.prototype.saveViewState=function(){var e=this.editor.getModel();if(!e)return{};var t=[];return this.decorations.forEach(function(o){if(o.isCollapsed){var n=o.getDecorationRange(e);n&&t.push({startLineNumber:n.startLineNumber,endLineNumber:n.endLineNumber,indent:o.indent,isCollapsed:!0})}}),{collapsedRegions:t,lineCount:e.getLineCount()}},e.prototype.restoreViewState=function(e){var t=this.editor.getModel();t&&this._isEnabled&&e&&Array.isArray(e.collapsedRegions)&&0!==e.collapsedRegions.length&&e.lineCount===t.getLineCount()&&this.applyRegions(e.collapsedRegions)},e.prototype.cleanState=function(){this.localToDispose=r.dispose(this.localToDispose)},e.prototype.applyRegions=function(t){var o=this,n=this.editor.getModel();if(n){var i=!1;t=h.limitByIndent(t,e.MAX_FOLDING_REGIONS).sort(function(e,t){return e.startLineNumber-t.startLineNumber}),this.editor.changeDecorations(function(e){for(var r=[],s=0,d=0;d<o.decorations.length&&s<t.length;){var a=o.decorations[d],l=a.getDecorationRange(n);if(l){for(;s<t.length&&l.startLineNumber>t[s].startLineNumber;){var c=t[s];i=i||c.isCollapsed,r.push(new f(c,n,e)),s++}if(s<t.length){var u=t[s];l.startLineNumber<u.startLineNumber?(i=i||a.isCollapsed,a.dispose(e),d++):l.startLineNumber===u.startLineNumber&&(!a.isCollapsed||a.startLineNumber===u.startLineNumber&&a.endLineNumber===u.endLineNumber||(i=!0),u.isCollapsed=a.isCollapsed,a.update(u,n,e),r.push(a),d++,s++)}}else i=i||a.isCollapsed,a.dispose(e),d++}for(;d<o.decorations.length;){var a=o.decorations[d];i=i||a.isCollapsed,a.dispose(e),d++}for(;s<t.length;){var c=t[s];i=i||c.isCollapsed,r.push(new f(c,n,e)),s++}o.decorations=r}),i&&this.updateHiddenAreas(void 0)}},e.prototype.onModelChanged=function(){var e=this;this.cleanState();var t=this.editor.getModel();this._isEnabled&&t&&(this.contentChangedScheduler=new n.RunOnceScheduler(function(){var t=++e.computeToken;e.computeCollapsibleRegions().then(function(o){t===e.computeToken&&e.applyRegions(o)})},200),this.cursorChangedScheduler=new n.RunOnceScheduler(function(){e.revealCursor()},200),this.localToDispose.push(this.contentChangedScheduler),this.localToDispose.push(this.cursorChangedScheduler),this.localToDispose.push(this.editor.onDidChangeModelContent(function(){e.contentChangedScheduler.schedule()})),this.localToDispose.push({dispose:function(){++e.computeToken,e.editor.changeDecorations(function(t){e.decorations.forEach(function(e){return e.dispose(t)})}),e.decorations=[],e.editor.setHiddenAreas([])}}),this.localToDispose.push(this.editor.onMouseDown(function(t){return e.onEditorMouseDown(t)})),this.localToDispose.push(this.editor.onMouseUp(function(t){return e.onEditorMouseUp(t)})),this.localToDispose.push(this.editor.onDidChangeCursorPosition(function(t){e.cursorChangedScheduler.schedule()})),this.contentChangedScheduler.schedule())},e.prototype.computeCollapsibleRegions=function(){var e=this.editor.getModel();if(!e)return s.TPromise.as([]);var t=h.computeRanges(e);return s.TPromise.as(t)},e.prototype.revealCursor=function(){var e=this,t=this.editor.getModel();if(t){var o=!1,n=this.editor.getPosition(),i=n.lineNumber;this.editor.changeDecorations(function(n){return e.decorations.forEach(function(e){if(e.isCollapsed){var r=e.getDecorationRange(t);r&&r.startLineNumber<i&&i<=r.endLineNumber&&(e.setCollapsed(!1,n),o=!0)}})}),o&&this.updateHiddenAreas(i)}},e.prototype.onEditorMouseDown=function(e){if(this.mouseDownInfo=null,0!==this.decorations.length){var t=e.target.range;if(t&&t.isEmpty&&e.event.leftButton){var o=this.editor.getModel(),n=!1;switch(e.target.type){case l.MouseTargetType.GUTTER_LINE_DECORATIONS:n=!0;break;case l.MouseTargetType.CONTENT_TEXT:if(t.isEmpty&&t.startColumn===o.getLineMaxColumn(t.startLineNumber))break;return;default:return}this.mouseDownInfo={lineNumber:t.startLineNumber,iconClicked:n}}}},e.prototype.onEditorMouseUp=function(e){var t=this;if(this.mouseDownInfo){var o=this.mouseDownInfo.lineNumber,n=this.mouseDownInfo.iconClicked,i=e.target.range;if(i&&i.isEmpty&&i.startLineNumber===o){var r=this.editor.getModel();if(n){if(e.target.type!==l.MouseTargetType.GUTTER_LINE_DECORATIONS)return}else if(i.startColumn!==r.getLineMaxColumn(o))return;this.editor.changeDecorations(function(e){for(var i=0;i<t.decorations.length;i++){var s=t.decorations[i],d=s.getDecorationRange(r);if(d.startLineNumber===o)return void((n||s.isCollapsed)&&(s.setCollapsed(!s.isCollapsed,e),t.updateHiddenAreas(o)))}})}}},e.prototype.updateHiddenAreas=function(e){var t=this.editor.getModel(),o=this.editor.getSelections(),n=!1,i=[];this.decorations.filter(function(e){return e.isCollapsed}).forEach(function(e){var r=e.getDecorationRange(t);i.push({startLineNumber:r.startLineNumber+1,startColumn:1,endLineNumber:r.endLineNumber,endColumn:1}),o.forEach(function(e,i){c.Range.containsPosition(r,e.getStartPosition())&&(o[i]=e=e.setStartPosition(r.startLineNumber,t.getLineMaxColumn(r.startLineNumber)),n=!0),c.Range.containsPosition(r,e.getEndPosition())&&(o[i]=e.setEndPosition(r.startLineNumber,t.getLineMaxColumn(r.startLineNumber)),n=!0)})});var r;r=e?{lineNumber:e,column:1}:o[0].getStartPosition(),n&&this.editor.setSelections(o),this.editor.setHiddenAreas(i),this.editor.revealPositionInCenterIfOutsideViewport(r)},e.prototype.unfold=function(){var e=this,t=this.editor.getModel(),o=!1,n=this.editor.getSelections(),i=!1;n.forEach(function(r,s){for(var d,a=r.startLineNumber,l=function(l,u){var p=e.decorations[l],h=p.getDecorationRange(t);if(!h)return"continue";if(h.startLineNumber<=a){if(a<=h.endLineNumber){if(p.isCollapsed)return e.editor.changeDecorations(function(e){p.setCollapsed(!1,e),o=!0}),{value:void 0};d=h}}else{if(!d||!c.Range.containsRange(d,h))return{value:void 0};if(p.isCollapsed)return e.editor.changeDecorations(function(e){p.setCollapsed(!1,e),o=!0;var d=h.startLineNumber,a=t.getLineMaxColumn(h.startLineNumber);n[s]=r.setEndPosition(d,a).setStartPosition(d,a),i=!0}),{value:void 0}}},u=0,p=e.decorations.length;u<p;u++){var h=l(u,p);if("object"==typeof h)return h.value}}),i&&this.editor.setSelections(n),o&&this.updateHiddenAreas(n[0].startLineNumber)},e.prototype.fold=function(){var e=this,t=!1,o=this.editor.getModel(),n=this.editor.getSelections();n.forEach(function(n){for(var i=n.startLineNumber,r=null,s=0,d=e.decorations.length;s<d;s++){var a=e.decorations[s],l=a.getDecorationRange(o);if(l){if(!(l.startLineNumber<=i))break;i<=l.endLineNumber&&!a.isCollapsed&&(r=a)}}r&&e.editor.changeDecorations(function(e){r.setCollapsed(!0,e),t=!0})}),t&&this.updateHiddenAreas(n[0].startLineNumber)},e.prototype.foldUnfoldRecursively=function(e){var t=this,o=!1,n=this.editor.getModel(),i=this.editor.getSelections();i.forEach(function(i){for(var r,s=i.startLineNumber,d=[],a=0,l=t.decorations.length;a<l;a++){var c=t.decorations[a],u=c.getDecorationRange(n);if(u&&u.startLineNumber>=s&&(u.endLineNumber<=r||"undefined"==typeof r)){if(u.startLineNumber!==s&&"undefined"==typeof r)return;r=r||u.endLineNumber,d.push(c)}}d.length>0&&d.forEach(function(n){t.editor.changeDecorations(function(t){n.setCollapsed(e,t),o=!0})})}),o&&this.updateHiddenAreas(i[0].startLineNumber)},e.prototype.changeAll=function(e){var t=this;if(this.decorations.length>0){var o=!0;this.editor.changeDecorations(function(n){t.decorations.forEach(function(t){e!==t.isCollapsed&&(t.setCollapsed(e,n),o=!0)})}),o&&this.updateHiddenAreas(void 0)}},e.prototype.foldLevel=function(e,t){var o=this,n=this.editor.getModel(),i=[n.getFullModelRange()],r=!1;this.editor.changeDecorations(function(s){o.decorations.forEach(function(o){var d=o.getDecorationRange(n);if(d){for(;!c.Range.containsRange(i[i.length-1],d);)i.pop();i.push(d),i.length!==e+1||o.isCollapsed||t.some(function(e){return d.startLineNumber<e&&e<=d.endLineNumber})||(o.setCollapsed(!0,s),r=!0)}})}),r&&this.updateHiddenAreas(t[0])},e.ID="editor.contrib.folding",e.MAX_FOLDING_REGIONS=5e3,e}();t.FoldingController=g;var m=function(e){function t(t,o){e.call(this,t,o,a.Behaviour.TextFocus)}return __extends(t,e),t.prototype.run=function(){var e=g.getFoldingController(this.editor);return this.invoke(e),s.TPromise.as(!0)},t}(d.EditorAction),C=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.unfold()},t.ID="editor.unfold",t}(m),y=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.foldUnfoldRecursively(!1)},t.ID="editor.unFoldRecursively",t}(m),b=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.fold()},t.ID="editor.fold",t}(m),v=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.foldUnfoldRecursively(!0)},t.ID="editor.foldRecursively",t}(m),E=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.changeAll(!0)},t.ID="editor.foldAll",t}(m),L=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.invoke=function(e){e.changeAll(!1)},t.ID="editor.unfoldAll",t}(m),D=function(e){function t(){e.apply(this,arguments)}return __extends(t,e),t.prototype.getFoldingLevel=function(){return parseInt(this.id.substr(t.ID_PREFIX.length))},t.prototype.getSelectedLines=function(){return this.editor.getSelections().map(function(e){return e.startLineNumber})},t.prototype.invoke=function(e){e.foldLevel(this.getFoldingLevel(),this.getSelectedLines())},t.ID_PREFIX="editor.foldLevel",t.ID=function(e){return t.ID_PREFIX+e},t}(m);p.EditorBrowserRegistry.registerEditorContribution(g),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(C,C.ID,o.localize("unfoldAction.label","Unfold"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.CtrlCmd|i.KeyMod.Shift|i.KeyCode.US_CLOSE_SQUARE_BRACKET},"Unfold")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(y,y.ID,o.localize("unFoldRecursivelyAction.label","Unfold Recursively"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.US_CLOSE_SQUARE_BRACKET)},"Unfold Recursively")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(b,b.ID,o.localize("foldAction.label","Fold"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.CtrlCmd|i.KeyMod.Shift|i.KeyCode.US_OPEN_SQUARE_BRACKET},"Fold")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(v,v.ID,o.localize("foldRecursivelyAction.label","Fold Recursively"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.US_OPEN_SQUARE_BRACKET)},"Fold Recursively")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(E,E.ID,o.localize("foldAllAction.label","Fold All"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_0)},"Fold All")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(L,L.ID,o.localize("unfoldAllAction.label","Unfold All"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_J)},"Unfold All")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(D,D.ID(1),o.localize("foldLevel1Action.label","Fold Level 1"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_1)},"Fold Level 1")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(D,D.ID(2),o.localize("foldLevel2Action.label","Fold Level 2"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_2)},"Fold Level 2")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(D,D.ID(3),o.localize("foldLevel3Action.label","Fold Level 3"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_3)},"Fold Level 3")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(D,D.ID(4),o.localize("foldLevel4Action.label","Fold Level 4"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_4)},"Fold Level 4")),u.CommonEditorRegistry.registerEditorAction(new u.EditorActionDescriptor(D,D.ID(5),o.localize("foldLevel5Action.label","Fold Level 5"),{context:u.ContextKey.EditorFocus,primary:i.KeyMod.chord(i.KeyMod.CtrlCmd|i.KeyCode.KEY_K,i.KeyMod.CtrlCmd|i.KeyCode.KEY_5)},"Fold Level 5"))});