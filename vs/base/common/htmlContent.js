/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports"],function(e,r){"use strict";function t(e,r){return!e&&!r||!(!e||!r)&&(Array.isArray(e)?!!Array.isArray(r)&&n(e,r):a(e,r))}function n(e,r){var t=e.length,n=r.length;if(t!==n)return!1;for(var u=0;u<t;u++)if(!a(e[u],r[u]))return!1;return!0}function a(e,r){return!e&&!r||!(!e||!r)&&("string"==typeof e?"string"==typeof r&&e===r:e.language===r.language&&e.value===r.value)}function u(e){return{language:"string",value:e}}function i(e,r){return!e&&!r||!(!e||!r)&&(e.language===r.language&&e.value===r.value)}function l(e,r){return e.formattedText===r.formattedText&&e.text===r.text&&e.className===r.className&&e.style===r.style&&e.customStyle===r.customStyle&&e.tagName===r.tagName&&e.isText===r.isText&&e.role===r.role&&e.markdown===r.markdown&&i(e.code,r.code)&&o(e.children,r.children)}function o(e,r){if(!e&&!r)return!0;if(!e||!r)return!1;var t=e.length,n=r.length;if(t!==n)return!1;for(var a=0;a<t;a++)if(!l(e[a],r[a]))return!1;return!0}r.markedStringsEquals=t,r.textToMarkedString=u,r.htmlContentElementArrEquals=o});