/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
module.exports=function(e,n){var i,c,r,o,s,t,a,u,f,g=e.length,d=0,h=0,m=[],C=0;function l(n){var i=s-C;i<512&&!n||!i||(m.push(e.slice(C,s+1)),C=s+1)}for(s=0;s<g;s++)if(!((a=e.charCodeAt(s))>=97&&a<=122||a<34))switch(a){case 40:h++,c=s;continue;case 41:if(--h<0)return n("missing opening `(`",s);continue;case 59:h||l();continue;case 123:d++,i=s;continue;case 125:if(--d<0)return n("missing opening `{`",s);d||h||l();continue;case 92:if(s<g-1){s++;continue}return n("unescaped `\\`",s);case 34:case 39:case 96:for(f=0,t=s,s+=1;s<g;s++)if(!((u=e.charCodeAt(s))>96)){if(u==a){f=1;break}if(92==u){if(s==g-1)return n("unescaped `\\`",s);s++}}if(f)continue;return n("unmatched `"+String.fromCharCode(a)+"`",t);case 47:if(h||s==g-1)continue;if(47==(u=e.charCodeAt(s+1)))for(s+=2;s<g&&(!((u=e.charCodeAt(s))<=13)||10!=u&&13!=u);s++);else if(42==u){for(r=t=s,s+=2;s<g-1&&(125==(u=e.charCodeAt(s))&&(o=s),42!=u||47!=e.charCodeAt(s+1));s++);if(s==g-1)return n("missing closing `*/`",t);s++}continue;case 42:if(s<g-1&&47==e.charCodeAt(s+1))return n("unmatched `/*`",s);continue}return 0!==d?n(r>i&&o>r?"missing closing `}` or `*/`":"missing closing `}`",i):0!==h?n("missing closing `)`",c):(l(!0),m)};
//# sourceMappingURL=../../sourcemaps/engine/parser/chunker.js.map
