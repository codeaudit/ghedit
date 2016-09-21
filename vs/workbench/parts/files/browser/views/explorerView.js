var __extends=this&&this.__extends||function(e,r){function t(){this.constructor=e}for(var i in r)r.hasOwnProperty(i)&&(e[i]=r[i]);e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t)},__decorate=this&&this.__decorate||function(e,r,t,i){var o,n=arguments.length,s=n<3?r:null===i?i=Object.getOwnPropertyDescriptor(r,t):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,r,t,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(r,t,s):o(r,t))||s);return n>3&&s&&Object.defineProperty(r,t,s),s},__param=this&&this.__param||function(e,r){return function(t,i){r(t,i,e)}};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/base/browser/builder","vs/base/common/uri","vs/base/common/async","vs/base/common/errors","vs/base/common/labels","vs/base/common/paths","vs/workbench/browser/actionBarRegistry","vs/base/parts/tree/browser/treeImpl","vs/platform/files/common/files","vs/workbench/parts/files/browser/fileActions","vs/workbench/parts/files/common/editors/fileEditorInput","vs/workbench/parts/files/browser/views/explorerViewer","vs/base/common/lifecycle","vs/workbench/common/editor/untitledEditorInput","vs/workbench/services/group/common/groupService","vs/base/browser/dom","vs/workbench/browser/viewlet","vs/workbench/parts/files/common/explorerViewModel","vs/workbench/services/editor/common/editorService","vs/workbench/services/part/common/partService","vs/platform/storage/common/storage","vs/platform/configuration/common/configuration","vs/platform/event/common/event","vs/platform/keybinding/common/keybinding","vs/platform/instantiation/common/instantiation","vs/platform/progress/common/progress","vs/platform/workspace/common/workspace","vs/platform/contextview/browser/contextView","vs/platform/message/common/message","vs/platform/actions/common/resourceContextKey"],function(e,r,t,i,o,n,s,a,c,l,p,u,h,f,d,v,E,g,S,m,_,w,R,x,I,F,y,V,A,T,C,D,b,L){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var O=function(e){function r(i,o,n,a,c,l,p,u,h,f,d,v,E,g,S,m,_){e.call(this,o,!1,t.localize("explorerSection","Files Explorer Section"),c,m,l,a),this.instantiationService=p,this.editorGroupService=u,this.eventService=h,this.storageService=f,this.contextService=d,this.progressService=v,this.editorService=E,this.fileService=g,this.partService=S,this.configurationService=_,this.workspace=d.getWorkspace(),this.settings=n,this.viewletState=i,this.actionRunner=o,this.autoReveal=!0,this.explorerRefreshDelayer=new s.ThrottledDelayer(r.EXPLORER_FILE_CHANGES_REFRESH_DELAY),this.explorerImportDelayer=new s.ThrottledDelayer(r.EXPLORER_IMPORT_REFRESH_DELAY),this.resourceContext=p.createInstance(L.ResourceContextKey)}return __extends(r,e),r.prototype.renderHeader=function(r){var t=o.$("div.title").appendTo(r);o.$("span").text(this.workspace.name).title(c.getPathLabel(this.workspace.resource.fsPath)).appendTo(t),e.prototype.renderHeader.call(this,r)},r.prototype.renderBody=function(r){this.treeContainer=e.prototype.renderViewTree.call(this,r),m.addClass(this.treeContainer,"explorer-folders-view"),this.tree=this.createViewer(o.$(this.treeContainer)),this.toolBar&&this.toolBar.setActions(p.prepareActions(this.getActions()),[])()},r.prototype.getActions=function(){var e=[];e.push(this.instantiationService.createInstance(f.NewFileAction,this.getViewer(),null)),e.push(this.instantiationService.createInstance(f.NewFolderAction,this.getViewer(),null)),e.push(this.instantiationService.createInstance(f.RefreshViewExplorerAction,this,"explorer-action refresh-explorer")),e.push(this.instantiationService.createInstance(_.CollapseAction,this.getViewer(),!0,"explorer-action collapse-explorer"));for(var r=0;r<e.length;r++){var t=e[r];t.order=10*(r+1)}return e},r.prototype.create=function(){var e=this,r=this.configurationService.getConfiguration();return this.onConfigurationUpdated(r),this.doRefresh().then(function(){e.toDispose.push(e.editorGroupService.onEditorsChanged(function(){return e.onEditorsChanged()})),e.toDispose.push(e.configurationService.onDidUpdateConfiguration(function(r){return e.onConfigurationUpdated(r.config,!0)}))})},r.prototype.onEditorsChanged=function(){var e=this.editorService.getActiveEditorInput(),t=!0,i=!1;if(e instanceof d.FileEditorInput){var o=e.getResource();if(this.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE]=o.toString(),this.isVisible&&this.contextService.isInsideWorkspace(o)){var n=this.hasSelection(o);n||this.select(o).done(null,a.onUnexpectedError),t=!1}}(e instanceof g.UntitledEditorInput||!e)&&(this.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE]=void 0,i=!0),t&&this.explorerViewer.clearSelection(),i&&this.explorerViewer.clearFocus()},r.prototype.onConfigurationUpdated=function(e,r){this.autoReveal=e&&e.explorer&&e.explorer.autoReveal;var t=!1;this.filter&&(t=this.filter.updateConfiguration(e)),r&&t&&this.doRefresh().done(null,a.onUnexpectedError)},r.prototype.focusBody=function(){var e=!1;if(this.explorerViewer){if(this.autoReveal){var r=this.explorerViewer.getSelection();r.length>0&&this.reveal(r[0],.5).done(null,a.onUnexpectedError)}this.explorerViewer.DOMFocus(),e=!0}var t=this.editorService.getActiveEditorInput();t&&t instanceof d.FileEditorInput||this.openFocusedElement(e)},r.prototype.setVisible=function(t){var o=this;return e.prototype.setVisible.call(this,t).then(function(){if(t){var e=i.TPromise.as(null);o.shouldRefresh&&(e=o.doRefresh(),o.shouldRefresh=!1);var s=o.getActiveEditorInputResource();if(s)return e.then(function(){return o.select(s)});if(!o.partService.isCreated())return i.TPromise.as(null);var c=o.getInput(),l=void 0;if(o.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE]&&(l=n["default"].parse(o.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE])),l&&c&&c.find(l)){var p=o.instantiationService.createInstance(d.FileEditorInput,l,void 0,void 0);return o.editorService.openEditor(p,{revealIfVisible:!0}).done(null,a.onUnexpectedError),e}return e.then(function(){o.openFocusedElement()})}})},r.prototype.openFocusedElement=function(e){var r=this.explorerViewer.getFocus();if(r&&!r.isDirectory){var t=this.instantiationService.createInstance(d.FileEditorInput,r.resource,r.mime,void 0);this.editorService.openEditor(t,{preserveFocus:e,revealIfVisible:!0}).done(null,a.onUnexpectedError)}},r.prototype.getActiveEditorInputResource=function(){var e=this.editorService.getActiveEditorInput();return e&&e instanceof d.FileEditorInput?e.getResource():null},r.prototype.getInput=function(){return this.explorerViewer?this.explorerViewer.getInput():null},r.prototype.createViewer=function(e){var r=this,i=this.instantiationService.createInstance(v.FileDataSource),o=this.instantiationService.createInstance(v.FileRenderer,this.viewletState,this.actionRunner),n=this.instantiationService.createInstance(v.FileController,this.viewletState),s=new v.FileSorter;this.filter=this.instantiationService.createInstance(v.FileFilter);var a=this.instantiationService.createInstance(v.FileDragAndDrop),c=this.instantiationService.createInstance(v.FileAccessibilityProvider);return this.explorerViewer=new u.Tree(e.getHTMLElement(),{dataSource:i,renderer:o,controller:n,sorter:s,filter:this.filter,dnd:a,accessibilityProvider:c},{autoExpandSingleChildren:!0,ariaLabel:t.localize("treeAriaLabel","Files Explorer")}),this.toDispose.push(E.toDisposable(function(){return o.dispose()})),this.toDispose.push(this.eventService.addListener2("files.internal:fileChanged",function(e){return r.onLocalFileChange(e)})),this.toDispose.push(this.eventService.addListener2(h.EventType.FILE_CHANGES,function(e){return r.onFileChanges(e)})),this.toDispose.push(this.explorerViewer.addListener2("focus",function(e){return r.resourceContext.set(e.focus&&e.focus.resource)})),this.explorerViewer},r.prototype.getOptimalWidth=function(){var e=this.explorerViewer.getHTMLElement(),r=[].slice.call(e.querySelectorAll(".explorer-item-label > a"));return m.getLargestChildWidth(e,r)},r.prototype.onLocalFileChange=function(e){var r,t,i,o,s=this;if(e.gotAdded()){var c=e.getAfter();if(i=n["default"].file(l.dirname(c.resource.fsPath)),o=this.getInput().find(i)){var p=w.FileStat.create(c);o.addChild(p);var u=function(){return s.explorerViewer.refresh(o).then(function(){return s.reveal(p,.5).then(function(){if(s.explorerViewer.setFocus(p),!p.isDirectory)return s.editorService.openEditor({resource:p.resource,options:{pinned:!0}})})})};e instanceof f.FileImportedEvent?this.explorerImportDelayer.trigger(u).done(null,a.onUnexpectedError):u().done(null,a.onUnexpectedError)}}else if(e.gotMoved()){var h=e.getBefore(),d=e.getAfter(),v=n["default"].file(l.dirname(h.resource.fsPath)),E=n["default"].file(l.dirname(d.resource.fsPath)),g=!1,S=this.explorerViewer.getFocus();if(S&&S.resource&&S.resource.toString()===h.resource.toString()&&(g=!0),v&&E&&v.toString()===E.toString()){if(r=this.getInput().find(h.resource)){if(!r.isDirectory&&!r.mime)return;r.rename(d),t=r.parent,t&&this.explorerViewer.refresh(t).done(function(){g&&s.explorerViewer.setFocus(r)},a.onUnexpectedError)}}else if(v&&E){var m=this.getInput().find(v),_=this.getInput().find(E);r=this.getInput().find(h.resource),m&&_&&r&&r.move(_,function(e){s.explorerViewer.refresh(m,!0).done(e,a.onUnexpectedError)},function(){s.explorerViewer.refresh(_,!0).done(function(){return s.explorerViewer.expand(_)},a.onUnexpectedError)})}}else if(e.gotDeleted()){var R=e.getBefore();r=this.getInput().find(R.resource),r&&r.parent&&(t=r.parent,t.removeChild(r),this.explorerViewer.refresh(t).done(function(){s.explorerViewer.DOMFocus()},a.onUnexpectedError))}else if(e instanceof f.FileImportedEvent){var x=e.getAfter();i=n["default"].file(l.dirname(x.resource.fsPath)),o=this.getInput().find(i),o&&this.explorerViewer.refresh(o).then(function(){return s.editorService.openEditor({resource:x.resource,options:{pinned:!0}})}).done(null,a.onUnexpectedError)}else this.workspace&&e.gotUpdated()&&e.getAfter().resource.toString()===this.workspace.resource.toString()&&!this.explorerViewer.getHighlight()&&this.refreshFromEvent()},r.prototype.onFileChanges=function(e){var t=this;setTimeout(function(){var i=t.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE];i&&e.contains(n["default"].parse(i),h.FileChangeType.DELETED)&&(t.settings[r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE]=null)}),setTimeout(function(){!t.shouldRefresh&&t.shouldRefreshFromEvent(e)&&t.refreshFromEvent()},r.EXPLORER_FILE_CHANGES_REACT_DELAY)},r.prototype.shouldRefreshFromEvent=function(e){if(e=this.filterToAddRemovedOnWorkspacePath(e,function(e,r){return".git"!==r[0]||1===r.length}),e.gotAdded()||e.gotDeleted()){var r=e.getAdded(),t=e.getDeleted(),i=this.getInput();if(!i)return!1;for(var o={},s=0;s<r.length;s++){var a=r[s];if(this.contextService.isInsideWorkspace(a.resource)){var c=l.dirname(a.resource.fsPath);if(!o[c]){var p=i.find(n["default"].file(c));if(p&&p.isDirectoryResolved&&!i.find(a.resource))return!0;p&&p.isDirectoryResolved||(o[c]=!0)}}}for(var u=0;u<t.length;u++){var h=t[u];if(this.contextService.isInsideWorkspace(h.resource)&&i.find(h.resource))return!0}}return!1},r.prototype.filterToAddRemovedOnWorkspacePath=function(e,r){var t=this;return new h.FileChangesEvent(e.changes.filter(function(e){if(e.type===h.FileChangeType.UPDATED)return!1;var i=t.contextService.toWorkspaceRelativePath(e.resource);if(!i)return!1;var o=i.split(/\//);return r(e,o)}))},r.prototype.refreshFromEvent=function(){var e=this;this.isVisible?this.explorerRefreshDelayer.trigger(function(){return e.explorerViewer.getHighlight()?i.TPromise.as(null):e.doRefresh()}).done(null,a.onUnexpectedError):this.shouldRefresh=!0},r.prototype.refresh=function(){var e=this;if(!this.explorerViewer||this.explorerViewer.getHighlight())return i.TPromise.as(null);this.explorerViewer.DOMFocus();var r;if(this.autoReveal&&(r=this.getActiveEditorInputResource(),!r)){var t=this.explorerViewer.getSelection();t&&1===t.length&&(r=t[0].resource)}return this.doRefresh().then(function(){return r?e.select(r,!0):i.TPromise.as(null)})},r.prototype.doRefresh=function(){var e=this,t=this.getInput(),o=[],s=[];if(this.settings[r.MEMENTO_EXPANDED_FOLDER_RESOURCES]&&(s=this.settings[r.MEMENTO_EXPANDED_FOLDER_RESOURCES].map(function(e){return n["default"].parse(e)})),t)this.getResolvedDirectories(t,o);else{var a=this.getActiveEditorInputResource();a&&o.push(a),s.length&&o.push.apply(o,s)}var c={resolveTo:o},l=this.fileService.resolveFile(this.workspace.resource,c).then(function(r){var o,n=w.FileStat.create(r,c.resolveTo);return t?(w.FileStat.mergeLocalWithDisk(n,t),o=e.explorerViewer.refresh(t)):o=e.explorerViewer.setInput(n).then(function(){return s?e.explorerViewer.expandAll(s.map(function(r){return e.getInput().find(r)})):i.TPromise.as(null)}),o},function(e){return i.TPromise.wrapError(e)});return this.progressService.showWhile(l,this.partService.isCreated()?800:3200),l},r.prototype.getResolvedDirectories=function(e,r){if(e.isDirectoryResolved){if(e.resource.toString()!==this.workspace.resource.toString()){for(var t=r.length-1;t>=0;t--){var i=r[t];0===e.resource.toString().indexOf(i.toString())&&r.splice(t)}r.push(e.resource)}for(var t=0;t<e.children.length;t++){var o=e.children[t];this.getResolvedDirectories(o,r)}}},r.prototype.select=function(e,r){var t=this;if(void 0===r&&(r=this.autoReveal),!e||e.toString()===this.workspace.resource.toString())return i.TPromise.as(null);var o=this.hasSelection(e);if(o)return r?this.reveal(o,.5):i.TPromise.as(null);var n=this.getInput();if(!n)return i.TPromise.as(null);var s=n.find(e);if(s)return this.doSelect(s,r);var a={resolveTo:[e]};return this.fileService.resolveFile(this.workspace.resource,a).then(function(i){var o=w.FileStat.create(i,a.resolveTo);return w.FileStat.mergeLocalWithDisk(o,n),t.explorerViewer.refresh(n).then(function(){return t.doSelect(n.find(e),r)})},function(e){return t.messageService.show(b.Severity.Error,e)})},r.prototype.hasSelection=function(e){for(var r=this.explorerViewer.getSelection(),t=0;t<r.length;t++)if(r[t].resource.toString()===e.toString())return r[t];return null},r.prototype.doSelect=function(e,r){var t=this;if(!e)return i.TPromise.as(null);if(!this.filter.isVisible(this.tree,e)&&(e=e.parent,!e))return i.TPromise.as(null);var o;return o=r?this.reveal(e,.5):i.TPromise.as(null),o.then(function(){e.isDirectory||t.explorerViewer.setSelection([e]),t.explorerViewer.setFocus(e)})},r.prototype.shutdown=function(){var t=this,i=this.getInput();if(i){var o=this.explorerViewer.getExpandedElements().filter(function(e){return e.resource.toString()!==t.workspace.resource.toString()}).map(function(e){return e.resource.toString()});this.settings[r.MEMENTO_EXPANDED_FOLDER_RESOURCES]=o}e.prototype.shutdown.call(this)},r.prototype.dispose=function(){this.toolBar&&this.toolBar.dispose(),e.prototype.dispose.call(this)},r.EXPLORER_FILE_CHANGES_REACT_DELAY=500,r.EXPLORER_FILE_CHANGES_REFRESH_DELAY=100,r.EXPLORER_IMPORT_REFRESH_DELAY=300,r.MEMENTO_LAST_ACTIVE_FILE_RESOURCE="explorer.memento.lastActiveFileResource",r.MEMENTO_EXPANDED_FOLDER_RESOURCES="explorer.memento.expandedFolderResources",r=__decorate([__param(4,b.IMessageService),__param(5,D.IContextMenuService),__param(6,A.IInstantiationService),__param(7,S.IEditorGroupService),__param(8,y.IEventService),__param(9,I.IStorageService),__param(10,C.IWorkspaceContextService),__param(11,T.IProgressService),__param(12,R.IWorkbenchEditorService),__param(13,h.IFileService),__param(14,x.IPartService),__param(15,V.IKeybindingService),__param(16,F.IConfigurationService)],r)}(_.CollapsibleViewletView);r.ExplorerView=O});