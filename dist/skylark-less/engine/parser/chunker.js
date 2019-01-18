/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
define([],function(){"use strict";var n={},e={exports:{}};function i(n){return"object"!=typeof n||Array.isArray(n)||!function(n){var e;for(e in n)return!1;return!0}(n)}return e.exports=function(n,e){var i,r,t,c,o,s,u,a,f,d=n.length,g=0,h=0,p=[],m=0;function A(e){var i=o-m;i<512&&!e||!i||(p.push(n.slice(m,o+1)),m=o+1)}for(o=0;o<d;o++)if(!((u=n.charCodeAt(o))>=97&&u<=122||u<34))switch(u){case 40:h++,r=o;continue;case 41:if(--h<0)return e("missing opening `(`",o);continue;case 59:h||A();continue;case 123:g++,i=o;continue;case 125:if(--g<0)return e("missing opening `{`",o);g||h||A();continue;case 92:if(o<d-1){o++;continue}return e("unescaped `\\`",o);case 34:case 39:case 96:for(f=0,s=o,o+=1;o<d;o++)if(!((a=n.charCodeAt(o))>96)){if(a==u){f=1;break}if(92==a){if(o==d-1)return e("unescaped `\\`",o);o++}}if(f)continue;return e("unmatched `"+String.fromCharCode(u)+"`",s);case 47:if(h||o==d-1)continue;if(47==(a=n.charCodeAt(o+1)))for(o+=2;o<d&&(!((a=n.charCodeAt(o))<=13)||10!=a&&13!=a);o++);else if(42==a){for(t=s=o,o+=2;o<d-1&&(125==(a=n.charCodeAt(o))&&(c=o),42!=a||47!=n.charCodeAt(o+1));o++);if(o==d-1)return e("missing closing `*/`",s);o++}continue;case 42:if(o<d-1&&47==n.charCodeAt(o+1))return e("unmatched `/*`",o);continue}return 0!==g?e(t>i&&c>t?"missing closing `}` or `*/`":"missing closing `}`",i):0!==h?e("missing closing `)`",r):(A(!0),p)},i(e.exports)?e.exports:i(n)?n:void 0});
//# sourceMappingURL=../../sourcemaps/engine/parser/chunker.js.map
