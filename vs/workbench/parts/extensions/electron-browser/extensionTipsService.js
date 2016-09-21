/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,t,n,o){var i,s=arguments.length,a=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(a=(s<3?i(a):s>3?i(t,n,a):i(t,n))||a);return s>3&&a&&Object.defineProperty(t,n,a),a},__param=this&&this.__param||function(e,t){return function(n,o){t(n,o,e)}};define(["require","exports","vs/nls","vs/base/common/collections","vs/base/common/lifecycle","vs/base/common/winjs.base","vs/base/common/actions","vs/base/common/glob","vs/platform/extensionManagement/common/extensionManagement","vs/editor/common/services/modelService","vs/platform/storage/common/storage","vs/platform/product","vs/platform/message/common/message","vs/platform/instantiation/common/instantiation","./extensionsActions","vs/base/common/severity"],function(e,t,n,o,i,s,a,r,c,m,l,d,v,f,u,p){"use strict";var h=function(){function e(e,t,n,i,s,a){var r=this;if(this._galleryService=e,this._modelService=t,this.storageService=n,this.messageService=i,this.extensionsService=s,this.instantiationService=a,this._recommendations=Object.create(null),this._availableRecommendations=Object.create(null),this._disposables=[],this._galleryService.isEnabled()){var c=d["default"].extensionTips;if(c){this.importantRecommendations=d["default"].extensionImportantTips||Object.create(null),this.importantRecommendationsIgnoreList=JSON.parse(n.get("extensionsAssistant/importantRecommendationsIgnore",l.StorageScope.GLOBAL,"[]"));for(var m=JSON.parse(n.get("extensionsAssistant/recommendations",l.StorageScope.GLOBAL,"[]")),v=0,f=m;v<f.length;v++){var u=f[v];this._recommendations[u]=!0}this._availableRecommendations=Object.create(null),o.forEach(c,function(e){var t=e.key,n=e.value,o=r._availableRecommendations[n];o?o.push(t):r._availableRecommendations[n]=[t]}),this._disposables.push(this._modelService.onModelAdded(function(e){return r._suggest(e.uri)})),this._modelService.getModels().forEach(function(e){return r._suggest(e.uri)})}}}return e.prototype.getRecommendations=function(){var e=Object.keys(this._recommendations);return 0===e.length?s.TPromise.as([]):this._galleryService.query({names:e,pageSize:e.length}).then(function(e){return e.firstPage},function(){return[]})},e.prototype._suggest=function(e){var t=this;e&&setImmediate(function(){o.forEach(t._availableRecommendations,function(n){var o=n.key,i=n.value;if(r.match(o,e.fsPath))for(var s=0,a=i;s<a.length;s++){var c=a[s];t._recommendations[c]=!0}}),t.storageService.store("extensionsAssistant/recommendations",JSON.stringify(Object.keys(t._recommendations)),l.StorageScope.GLOBAL),t.extensionsService.getInstalled().done(function(o){Object.keys(t.importantRecommendations).filter(function(e){return t.importantRecommendationsIgnoreList.indexOf(e)===-1}).filter(function(e){return o.every(function(t){return t.manifest.publisher+"."+t.manifest.name!==e})}).forEach(function(o){var i=t.importantRecommendations[o];if(r.match(i,e.fsPath)){var c=n.localize("reallyRecommended","It is recommended to install the '{0}' extension.",o),m=new a.Action("neverShowAgain",n.localize("neverShowAgain","Don't show again"),null,(!0),function(){return t.importantRecommendationsIgnoreList.push(o),t.storageService.store("extensionsAssistant/importantRecommendationsIgnore",JSON.stringify(t.importantRecommendationsIgnoreList),l.StorageScope.GLOBAL),s.TPromise.as(!0)}),d=t.instantiationService.createInstance(u.ShowRecommendedExtensionsAction,u.ShowRecommendedExtensionsAction.ID,n.localize("showRecommendations","Show Recommendations"));t.messageService.show(p["default"].Info,{message:c,actions:[v.CloseAction,m,d]})}})})})},e.prototype.dispose=function(){this._disposables=i.dispose(this._disposables)},e=__decorate([__param(0,c.IExtensionGalleryService),__param(1,m.IModelService),__param(2,l.IStorageService),__param(3,v.IMessageService),__param(4,c.IExtensionManagementService),__param(5,f.IInstantiationService)],e)}();t.ExtensionTipsService=h});