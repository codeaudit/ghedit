/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/nls","vs/base/common/async","vs/base/common/errors","vs/editor/common/editorCommonExtensions","vs/editor/common/modes"],function(e,n,r,o,t,i,s){"use strict";function u(e,n,t){var i=s.RenameProviderRegistry.ordered(e),u=[],m=!1,a=i.map(function(r){return function(){if(!m)return o.asWinJsPromise(function(o){return r.provideRenameEdits(e,n,t,o)}).then(function(e){if(e){if(!e.rejectReason)return m=!0,e;u.push(e.rejectReason)}else;})}});return o.sequence(a).then(function(e){var n=e[0];return u.length>0?{edits:void 0,rejectReason:u.join("\n")}:n?n:{edits:void 0,rejectReason:r.localize("no result","No result.")}})}n.rename=u,i.CommonEditorRegistry.registerDefaultLanguageCommand("_executeDocumentRenameProvider",function(e,n,r){var o=r.newName;if("string"!=typeof o)throw t.illegalArgument("newName");return u(e,n,o)})});