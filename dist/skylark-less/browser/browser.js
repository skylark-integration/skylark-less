/**
 * skylark-less - A version of less.js that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylarkui/skylark-less/
 * @license MIT
 */
var utils=require("./utils");module.exports={createCSS:function(e,t,r){var l=r.href||"",i="less:"+(r.title||utils.extractId(l)),n=e.getElementById(i),s=!1,d=e.createElement("style");d.setAttribute("type","text/css"),r.media&&d.setAttribute("media",r.media),d.id=i,d.styleSheet||(d.appendChild(e.createTextNode(t)),s=null!==n&&n.childNodes.length>0&&d.childNodes.length>0&&n.firstChild.nodeValue===d.firstChild.nodeValue);var a=e.getElementsByTagName("head")[0];if(null===n||!1===s){var c=r&&r.nextSibling||null;c?c.parentNode.insertBefore(d,c):a.appendChild(d)}if(n&&!1===s&&n.parentNode.removeChild(n),d.styleSheet)try{d.styleSheet.cssText=t}catch(e){throw new Error("Couldn't reassign styleSheet.cssText.")}},currentScript:function(e){var t,r=e.document;return r.currentScript||(t=r.getElementsByTagName("script"))[t.length-1]}};
//# sourceMappingURL=../sourcemaps/browser/browser.js.map
