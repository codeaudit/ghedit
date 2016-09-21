define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/base/common/severity","vs/platform/instantiation/common/instantiation","vs/base/common/actions"],function(e,n,s,o,t,a,c){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";n.CloseAction=new c.Action("close.message",s.localize("close","Close"),null,(!0),function(){return o.TPromise.as(!0)}),n.LaterAction=new c.Action("later.message",s.localize("later","Later"),null,(!0),function(){return o.TPromise.as(!0)}),n.CancelAction=new c.Action("cancel.message",s.localize("cancel","Cancel"),null,(!0),function(){return o.TPromise.as(!0)}),n.IMessageService=a.createDecorator("messageService"),n.Severity=t["default"]});