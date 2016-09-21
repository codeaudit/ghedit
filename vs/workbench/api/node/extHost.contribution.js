/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate=this&&this.__decorate||function(e,n,t,a){var i,r=arguments.length,o=r<3?n:null===a?a=Object.getOwnPropertyDescriptor(n,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,n,t,a);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(o=(r<3?i(o):r>3?i(n,t,o):i(n,t))||o);return r>3&&o&&Object.defineProperty(n,t,o),o},__param=this&&this.__param||function(e,n){return function(t,a){n(t,a,e)}};define(["require","exports","vs/platform/platform","vs/workbench/common/contributions","vs/platform/instantiation/common/instantiation","vs/workbench/services/thread/common/threadService","./extHost.protocol","vs/platform/extensions/common/extensions","./mainThreadCommands","./mainThreadConfiguration","./mainThreadDiagnostics","./mainThreadDocuments","./mainThreadEditors","./mainThreadErrors","./mainThreadLanguageFeatures","./mainThreadLanguages","./mainThreadMessageService","./mainThreadOutputService","./mainThreadQuickOpen","./mainThreadStatusBar","./mainThreadStorage","./mainThreadTelemetry","./mainThreadWorkspace","./mainThreadExtensionService","./mainThreadFileSystemEventService","vs/editor/node/textMate/TMSyntax","vs/editor/node/textMate/TMSnippets","vs/platform/jsonschemas/common/jsonValidationExtensionPoint","vs/editor/node/languageConfiguration"],function(e,n,t,a,i,r,o,s,d,c,h,M,T,m,u,f,v,x,S,g,p,l,C,E,y,_,b,k,O){"use strict";var P=function(){function e(e,n,t){this.threadService=e,this.instantiationService=n,this.extensionService=t,this.initExtensionSystem()}return e.prototype.getId=function(){return"vs.api.extHost"},e.prototype.initExtensionSystem=function(){var e=this,n=function(n){return e.instantiationService.createInstance(n)},t=new o.InstanceCollection;t.define(o.MainContext.MainThreadCommands).set(n(d.MainThreadCommands)),t.define(o.MainContext.MainThreadDiagnostics).set(n(h.MainThreadDiagnostics)),t.define(o.MainContext.MainThreadDocuments).set(n(M.MainThreadDocuments)),t.define(o.MainContext.MainThreadEditors).set(n(T.MainThreadEditors)),t.define(o.MainContext.MainThreadErrors).set(n(m.MainThreadErrors)),t.define(o.MainContext.MainThreadLanguageFeatures).set(n(u.MainThreadLanguageFeatures)),t.define(o.MainContext.MainThreadLanguages).set(n(f.MainThreadLanguages)),t.define(o.MainContext.MainThreadMessageService).set(n(v.MainThreadMessageService)),t.define(o.MainContext.MainThreadOutputService).set(n(x.MainThreadOutputService)),t.define(o.MainContext.MainThreadQuickOpen).set(n(S.MainThreadQuickOpen)),t.define(o.MainContext.MainThreadStatusBar).set(n(g.MainThreadStatusBar)),t.define(o.MainContext.MainThreadStorage).set(n(p.MainThreadStorage)),t.define(o.MainContext.MainThreadTelemetry).set(n(l.MainThreadTelemetry)),t.define(o.MainContext.MainThreadWorkspace).set(n(C.MainThreadWorkspace)),this.extensionService instanceof E.MainProcessExtensionService&&t.define(o.MainContext.MainProcessExtensionService).set(this.extensionService),t.finish(!0,this.threadService),n(_.MainProcessTextMateSyntax),n(c.MainThreadConfiguration),n(b.MainProcessTextMateSnippet),n(k.JSONValidationExtensionPoint),n(O.LanguageConfigurationFileHandler),n(y.MainThreadFileSystemEventService)},e=__decorate([__param(0,r.IThreadService),__param(1,i.IInstantiationService),__param(2,s.IExtensionService)],e)}();n.ExtHostContribution=P,t.Registry.as(a.Extensions.Workbench).registerWorkbenchContribution(P)});