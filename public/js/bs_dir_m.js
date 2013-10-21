/**
 * User: e.kamenev
 * Date: 25.09.12
 * Time create: 10:31
 */

//jcookies
(function(c){c.jCookies=function(a){a=c.extend({},c.jCookies.defaults,a);if(a.get||a.erase){for(var f={},d="",e=[],b=document.cookie.split(";"),h=0;h<b.length;h++){for(var i=b[h];" "==i.charAt(0);)i=i.substring(1,i.length);d=i.split("=")[0];if(0==d.length)break;f[d]=i.substring(d.length+1,i.length);e[e.length]=d}if(a.erase){b=new Date;b.setTime(b.getTime()+-864E5);if("*"==a.erase){for(d in f)document.cookie=d+"=erase; expires="+b.toGMTString()+"; path=/";return!0}for(d in e)if(e[d]==a.erase)return document.cookie=
    a.erase+"=erase; expires="+b.toGMTString()+"; path=/",!0;return!1}if(a.get){if("*"==a.get&&f){for(d in f)try{f[d]=JSON.parse(atob(f[d]))}catch(k){try{f[d]=JSON.parse(atob(decodeURIComponent(f[d])))}catch(o){if(a.error)return o}if(a.error)return k}return f}for(x in e)if(e[x]==a.get)try{return JSON.parse(atob(f[a.get]))}catch(p){if(a.error)return p}return!1}}else return a.name&&(a.value||a.days)?(b=new Date,isNaN(a.seconds)?isNaN(a.minutes)?isNaN(a.hours)?b.setTime(b.getTime()+864E5*a.days):b.setTime(b.getTime()+
    36E5*a.hours):b.setTime(b.getTime()+6E4*a.minutes):b.setTime(b.getTime()+1E3*a.seconds),document.cookie=a.name+"="+btoa(JSON.stringify(a.value))+"; expires="+b.toGMTString()+"; path=/",!0):!1};c.jCookies.defaults={name:"",value:"",days:27}})(jQuery);
if("undefined"==typeof btoa)var btoa=function(c){for(var a=[],f=0;f<c.length;){var d=c.charCodeAt(f++),e=c.charCodeAt(f++),b=c.charCodeAt(f++),h=(d<<16)+((e||0)<<8)+(b||0),d=(h&16515072)>>18,i=(h&258048)>>12,e=isNaN(e)?64:(h&4032)>>6,b=isNaN(b)?64:h&63;a[a.length]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d);a[a.length]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(i);a[a.length]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e);
    a[a.length]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b)}return a.join("")};
if("undefined"==typeof atob)var atob=function(c){var a=0!=c.length%4,f=/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=]/.test(c),d=/=/.test(c)&&(/=[^=]/.test(c)||/={3}/.test(c));if(a||f||d)throw Error("Invalid base64 data");a=[];for(f=0;f<c.length;){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(f++)),b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(f++)),h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(f++)),
    d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c.charAt(f++)),e=(e<<18)+(b<<12)+((h&63)<<6)+(d&63),h=64==h?-1:(e&65280)>>8,d=64==d?-1:e&255;a[a.length]=String.fromCharCode((e&16711680)>>16);0<=h&&(a[a.length]=String.fromCharCode(h));0<=d&&(a[a.length]=String.fromCharCode(d))}return a.join("")};this.JSON||(this.JSON={});
(function(){function c(a){return a<10?"0"+a:a}function a(a){e.lastIndex=0;return e.test(a)?'"'+a.replace(e,function(a){var b=i[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(d,c){var e,l,m,i,n=b,j,g=c[d];g&&(typeof g==="object"&&typeof g.toJSON==="function")&&(g=g.toJSON(d));typeof k==="function"&&(g=k.call(c,d,g));switch(typeof g){case "string":return a(g);case "number":return isFinite(g)?""+g:"null";case "boolean":case "null":return""+
    g;case "object":if(!g)return"null";b=b+h;j=[];if(Object.prototype.toString.apply(g)==="[object Array]"){i=g.length;for(e=0;e<i;e=e+1)j[e]=f(e,g)||"null";m=j.length===0?"[]":b?"[\n"+b+j.join(",\n"+b)+"\n"+n+"]":"["+j.join(",")+"]";b=n;return m}if(k&&typeof k==="object"){i=k.length;for(e=0;e<i;e=e+1){l=k[e];if(typeof l==="string")(m=f(l,g))&&j.push(a(l)+(b?": ":":")+m)}}else for(l in g)if(Object.hasOwnProperty.call(g,l))(m=f(l,g))&&j.push(a(l)+(b?": ":":")+m);m=j.length===0?"{}":b?"{\n"+b+j.join(",\n"+
    b)+"\n"+n+"}":"{"+j.join(",")+"}";b=n;return m}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+c(this.getUTCMonth()+1)+"-"+c(this.getUTCDate())+"T"+c(this.getUTCHours())+":"+c(this.getUTCMinutes())+":"+c(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var d=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    e=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,b,h,i={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},k;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,d,e){var c;h=b="";if(typeof e==="number")for(c=0;c<e;c=c+1)h=h+" ";else typeof e==="string"&&(h=e);if((k=d)&&typeof d!=="function"&&(typeof d!=="object"||typeof d.length!=="number"))throw Error("JSON.stringify");return f("",
    {"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,b){function e(a,d){var c,f,g=a[d];if(g&&typeof g==="object")for(c in g)if(Object.hasOwnProperty.call(g,c)){f=e(g,c);f!==void 0?g[c]=f:delete g[c]}return b.call(a,d,g)}var c,a=""+a;d.lastIndex=0;d.test(a)&&(a=a.replace(d,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
    "]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){c=eval("("+a+")");return typeof b==="function"?e({"":c},""):c}throw new SyntaxError("JSON.parse");}})();


// Underscore.js 1.3.1
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function q(a,c,d){if(a===c)return a!==0||1/a==1/c;if(a==null||c==null)return a===c;if(a._chain)a=a._wrapped;if(c._chain)c=c._wrapped;if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return false;switch(e){case "[object String]":return a==String(c);case "[object Number]":return a!=+a?c!=+c:a==0?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
    c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if(typeof a!="object"||typeof c!="object")return false;for(var f=d.length;f--;)if(d[f]==a)return true;d.push(a);var f=0,g=true;if(e=="[object Array]"){if(f=a.length,g=f==c.length)for(;f--;)if(!(g=f in a==f in c&&q(a[f],c[f],d)))break}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return false;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&q(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,
    h)&&!f--)break;g=!f}}d.pop();return g}var r=this,G=r._,n={},k=Array.prototype,o=Object.prototype,i=k.slice,H=k.unshift,l=o.toString,I=o.hasOwnProperty,w=k.forEach,x=k.map,y=k.reduce,z=k.reduceRight,A=k.filter,B=k.every,C=k.some,p=k.indexOf,D=k.lastIndexOf,o=Array.isArray,J=Object.keys,s=Function.prototype.bind,b=function(a){return new m(a)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports)exports=module.exports=b;exports._=b}else r._=b;b.VERSION="1.3.1";var j=b.each=
    b.forEach=function(a,c,d){if(a!=null)if(w&&a.forEach===w)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===n)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===n)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(x&&a.map===x)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==
    null&&(a=[]);if(y&&a.reduce===y)return e&&(c=b.bind(c,e)),f?a.reduce(c,d):a.reduce(c);j(a,function(a,b,i){f?d=c.call(e,d,a,b,i):(d=a,f=true)});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(z&&a.reduceRight===z)return e&&(c=b.bind(c,e)),f?a.reduceRight(c,d):a.reduceRight(c);var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=
    function(a,c,b){var e;E(a,function(a,g,h){if(c.call(b,a,g,h))return e=a,true});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(A&&a.filter===A)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(B&&a.every===B)return a.every(c,b);j(a,function(a,g,h){if(!(e=
    e&&c.call(b,a,g,h)))return n});return e};var E=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(C&&a.some===C)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return n});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;return p&&a.indexOf===p?a.indexOf(c)!=-1:b=E(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
    function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a))return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a))return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&(e={value:a,computed:b})});
    return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){f==0?b[0]=a:(d=Math.floor(Math.random()*(f+1)),b[f]=b[d],b[d]=a)});return b};b.sortBy=function(a,c,d){return b.pluck(b.map(a,function(a,b,g){return{value:a,criteria:c.call(d,a,b,g)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:a.toArray?a.toArray():b.isArray(a)?i.call(a):b.isArguments(a)?i.call(a):b.values(a)};b.size=function(a){return b.toArray(a).length};b.first=b.head=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=
    b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,e=[];b.reduce(d,function(d,g,h){if(0==h||(c===true?b.last(d)!=g:!b.include(d,g)))d[d.length]=g,e[e.length]=a[h];return d},[]);
    return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1));return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     d){if(a==null)return-1;var e;if(d)return d=b.sortedIndex(a,c),a[d]===c?d:-1;if(p&&a.indexOf===p)return a.indexOf(c);for(d=0,e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(D&&a.lastIndexOf===D)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){arguments.length<=1&&(b=a||0,a=0);for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;)g[f++]=a,a+=d;return g};
    var F=function(){};b.bind=function(a,c){var d,e;if(a.bind===s&&s)return s.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));F.prototype=a.prototype;var b=new F,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(a,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i=b.debounce(function(){h=g=false},c);return function(){d=this;e=arguments;var b;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);i()},c));g?h=true:
        a.apply(d,e);i();g=true}};b.debounce=function(a,b){var d;return function(){var e=this,f=arguments;clearTimeout(d);d=setTimeout(function(){d=null;a.apply(e,f)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};
    b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=J||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.defaults=function(a){j(i.call(arguments,
        1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return q(a,b,[])};b.isEmpty=function(a){if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=o||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};
    b.isArguments=function(a){return l.call(a)=="[object Arguments]"};if(!b.isArguments(arguments))b.isArguments=function(a){return!(!a||!b.has(a,"callee"))};b.isFunction=function(a){return l.call(a)=="[object Function]"};b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};
    b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,b){return I.call(a,b)};b.noConflict=function(){r._=G;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.mixin=function(a){j(b.functions(a),
        function(c){K(c,b[c]=a[c])})};var L=0;b.uniqueId=function(a){var b=L++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var t=/.^/,u=function(a){return a.replace(/\\\\/g,"\\").replace(/\\'/g,"'")};b.template=function(a,c){var d=b.templateSettings,d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+a.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(d.escape||t,function(a,b){return"',_.escape("+
        u(b)+"),'"}).replace(d.interpolate||t,function(a,b){return"',"+u(b)+",'"}).replace(d.evaluate||t,function(a,b){return"');"+u(b).replace(/[\r\n\t]/g," ")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');",e=new Function("obj","_",d);return c?e(c,b):function(a){return e.call(this,a,b)}};b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var v=function(a,c){return c?b(a).chain():a},K=function(a,c){m.prototype[a]=
        function(){var a=i.call(arguments);H.call(a,this._wrapped);return v(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return v(d,this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return v(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=
        true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);


//     Backbone.js 0.9.1

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

    // Initial Setup
    // -------------

    // Save a reference to the global object (`window` in the browser, `global`
    // on the server).
    var root = this;

    // Save the previous value of the `Backbone` variable, so that it can be
    // restored later on, if `noConflict` is used.
    var previousBackbone = root.Backbone;

    // Create a local reference to slice/splice.
    var slice = Array.prototype.slice;
    var splice = Array.prototype.splice;

    // The top-level namespace. All public Backbone classes and modules will
    // be attached to this. Exported for both CommonJS and the browser.
    var Backbone;
    if (typeof exports !== 'undefined') {
        Backbone = exports;
    } else {
        Backbone = root.Backbone = {};
    }

    // Current version of the library. Keep in sync with `package.json`.
    Backbone.VERSION = '0.9.1';

    // Require Underscore, if we're on the server, and it's not already present.
    var _ = root._;
    if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

    // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
    var $ = root.jQuery || root.Zepto || root.ender;

    // Set the JavaScript library that will be used for DOM manipulation and
    // Ajax calls (a.k.a. the `$` variable). By default Backbone will use: jQuery,
    // Zepto, or Ender; but the `setDomLibrary()` method lets you inject an
    // alternate JavaScript library (or a mock library for testing your views
    // outside of a browser).
    Backbone.setDomLibrary = function(lib) {
        $ = lib;
    };

    // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
    // to its previous owner. Returns a reference to this Backbone object.
    Backbone.noConflict = function() {
        root.Backbone = previousBackbone;
        return this;
    };

    // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
    // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
    // set a `X-Http-Method-Override` header.
    Backbone.emulateHTTP = false;

    // Turn on `emulateJSON` to support legacy servers that can't deal with direct
    // `application/json` requests ... will encode the body as
    // `application/x-www-form-urlencoded` instead and will send the model in a
    // form param named `model`.
    Backbone.emulateJSON = false;

    // Backbone.Events
    // -----------------

    // A module that can be mixed in to *any object* in order to provide it with
    // custom events. You may bind with `on` or remove with `off` callback functions
    // to an event; trigger`-ing an event fires all callbacks in succession.
    //
    //     var object = {};
    //     _.extend(object, Backbone.Events);
    //     object.on('expand', function(){ alert('expanded'); });
    //     object.trigger('expand');
    //
    Backbone.Events = {

        // Bind an event, specified by a string name, `ev`, to a `callback`
        // function. Passing `"all"` will bind the callback to all events fired.
        on: function(events, callback, context) {
            var ev;
            events = events.split(/\s+/);
            var calls = this._callbacks || (this._callbacks = {});
            while (ev = events.shift()) {
                // Create an immutable callback list, allowing traversal during
                // modification.  The tail is an empty object that will always be used
                // as the next node.
                var list  = calls[ev] || (calls[ev] = {});
                var tail = list.tail || (list.tail = list.next = {});
                tail.callback = callback;
                tail.context = context;
                list.tail = tail.next = {};
            }
            return this;
        },

        // Remove one or many callbacks. If `context` is null, removes all callbacks
        // with that function. If `callback` is null, removes all callbacks for the
        // event. If `ev` is null, removes all bound callbacks for all events.
        off: function(events, callback, context) {
            var ev, calls, node;
            if (!events) {
                delete this._callbacks;
            } else if (calls = this._callbacks) {
                events = events.split(/\s+/);
                while (ev = events.shift()) {
                    node = calls[ev];
                    delete calls[ev];
                    if (!callback || !node) continue;
                    // Create a new list, omitting the indicated event/context pairs.
                    while ((node = node.next) && node.next) {
                        if (node.callback === callback &&
                            (!context || node.context === context)) continue;
                        this.on(ev, node.callback, node.context);
                    }
                }
            }
            return this;
        },

        // Trigger an event, firing all bound callbacks. Callbacks are passed the
        // same arguments as `trigger` is, apart from the event name.
        // Listening for `"all"` passes the true event name as the first argument.
        trigger: function(events) {
            var event, node, calls, tail, args, all, rest;
            if (!(calls = this._callbacks)) return this;
            all = calls['all'];
            (events = events.split(/\s+/)).push(null);
            // Save references to the current heads & tails.
            while (event = events.shift()) {
                if (all) events.push({next: all.next, tail: all.tail, event: event});
                if (!(node = calls[event])) continue;
                events.push({next: node.next, tail: node.tail});
            }
            // Traverse each list, stopping when the saved tail is reached.
            rest = slice.call(arguments, 1);
            while (node = events.pop()) {
                tail = node.tail;
                args = node.event ? [node.event].concat(rest) : rest;
                while ((node = node.next) !== tail) {
                    node.callback.apply(node.context || this, args);
                }
            }
            return this;
        }

    };

    // Aliases for backwards compatibility.
    Backbone.Events.bind   = Backbone.Events.on;
    Backbone.Events.unbind = Backbone.Events.off;

    // Backbone.Model
    // --------------

    // Create a new model, with defined attributes. A client id (`cid`)
    // is automatically generated and assigned for you.
    Backbone.Model = function(attributes, options) {
        var defaults;
        attributes || (attributes = {});
        if (options && options.parse) attributes = this.parse(attributes);
        if (defaults = getValue(this, 'defaults')) {
            attributes = _.extend({}, defaults, attributes);
        }
        if (options && options.collection) this.collection = options.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = _.uniqueId('c');
        if (!this.set(attributes, {silent: true})) {
            throw new Error("Can't create an invalid model");
        }
        delete this._changed;
        this._previousAttributes = _.clone(this.attributes);
        this.initialize.apply(this, arguments);
    };

    // Attach all inheritable methods to the Model prototype.
    _.extend(Backbone.Model.prototype, Backbone.Events, {

        // The default name for the JSON `id` attribute is `"id"`. MongoDB and
        // CouchDB users may want to set this to `"_id"`.
        idAttribute: 'id',

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // Return a copy of the model's `attributes` object.
        toJSON: function() {
            return _.clone(this.attributes);
        },

        // Get the value of an attribute.
        get: function(attr) {
            return this.attributes[attr];
        },

        // Get the HTML-escaped value of an attribute.
        escape: function(attr) {
            var html;
            if (html = this._escapedAttributes[attr]) return html;
            var val = this.attributes[attr];
            return this._escapedAttributes[attr] = _.escape(val == null ? '' : '' + val);
        },

        // Returns `true` if the attribute contains a value that is not null
        // or undefined.
        has: function(attr) {
            return this.attributes[attr] != null;
        },

        // Set a hash of model attributes on the object, firing `"change"` unless
        // you choose to silence it.
        set: function(key, value, options) {
            var attrs, attr, val;
            if (_.isObject(key) || key == null) {
                attrs = key;
                options = value;
            } else {
                attrs = {};
                attrs[key] = value;
            }

            // Extract attributes and options.
            options || (options = {});
            if (!attrs) return this;
            if (attrs instanceof Backbone.Model) attrs = attrs.attributes;
            if (options.unset) for (attr in attrs) attrs[attr] = void 0;

            // Run validation.
            if (!this._validate(attrs, options)) return false;

            // Check for changes of `id`.
            if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

            var now = this.attributes;
            var escaped = this._escapedAttributes;
            var prev = this._previousAttributes || {};
            var alreadySetting = this._setting;
            this._changed || (this._changed = {});
            this._setting = true;

            // Update attributes.
            for (attr in attrs) {
                val = attrs[attr];
                if (!_.isEqual(now[attr], val)) delete escaped[attr];
                options.unset ? delete now[attr] : now[attr] = val;
                if (this._changing && !_.isEqual(this._changed[attr], val)) {
                    this.trigger('change:' + attr, this, val, options);
                    this._moreChanges = true;
                }
                delete this._changed[attr];
                if (!_.isEqual(prev[attr], val) || (_.has(now, attr) != _.has(prev, attr))) {
                    this._changed[attr] = val;
                }
            }

            // Fire the `"change"` events, if the model has been changed.
            if (!alreadySetting) {
                if (!options.silent && this.hasChanged()) this.change(options);
                this._setting = false;
            }
            return this;
        },

        // Remove an attribute from the model, firing `"change"` unless you choose
        // to silence it. `unset` is a noop if the attribute doesn't exist.
        unset: function(attr, options) {
            (options || (options = {})).unset = true;
            return this.set(attr, null, options);
        },

        // Clear all attributes on the model, firing `"change"` unless you choose
        // to silence it.
        clear: function(options) {
            (options || (options = {})).unset = true;
            return this.set(_.clone(this.attributes), options);
        },

        // Fetch the model from the server. If the server's representation of the
        // model differs from its current attributes, they will be overriden,
        // triggering a `"change"` event.
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;
            options.success = function(resp, status, xhr) {
                if (!model.set(model.parse(resp, xhr), options)) return false;
                if (success) success(model, resp);
            };
            options.error = Backbone.wrapError(options.error, model, options);
            return (this.sync || Backbone.sync).call(this, 'read', this, options);
        },

        // Set a hash of model attributes, and sync the model to the server.
        // If the server returns an attributes hash that differs, the model's
        // state will be `set` again.
        save: function(key, value, options) {
            var attrs, current;
            if (_.isObject(key) || key == null) {
                attrs = key;
                options = value;
            } else {
                attrs = {};
                attrs[key] = value;
            }

            options = options ? _.clone(options) : {};
            if (options.wait) current = _.clone(this.attributes);
            var silentOptions = _.extend({}, options, {silent: true});
            if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
                return false;
            }
            var model = this;
            var success = options.success;
            options.success = function(resp, status, xhr) {
                var serverAttrs = model.parse(resp, xhr);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (!model.set(serverAttrs, options)) return false;
                if (success) {
                    success(model, resp);
                } else {
                    model.trigger('sync', model, resp, options);
                }
            };
            options.error = Backbone.wrapError(options.error, model, options);
            var method = this.isNew() ? 'create' : 'update';
            var xhr = (this.sync || Backbone.sync).call(this, method, this, options);
            if (options.wait) this.set(current, silentOptions);
            return xhr;
        },

        // Destroy this model on the server if it was already persisted.
        // Optimistically removes the model from its collection, if it has one.
        // If `wait: true` is passed, waits for the server to respond before removal.
        destroy: function(options) {
            options = options ? _.clone(options) : {};
            var model = this;
            var success = options.success;

            var triggerDestroy = function() {
                model.trigger('destroy', model, model.collection, options);
            };

            if (this.isNew()) return triggerDestroy();
            options.success = function(resp) {
                if (options.wait) triggerDestroy();
                if (success) {
                    success(model, resp);
                } else {
                    model.trigger('sync', model, resp, options);
                }
            };
            options.error = Backbone.wrapError(options.error, model, options);
            var xhr = (this.sync || Backbone.sync).call(this, 'delete', this, options);
            if (!options.wait) triggerDestroy();
            return xhr;
        },

        // Default URL for the model's representation on the server -- if you're
        // using Backbone's restful methods, override this to change the endpoint
        // that will be called.
        url: function() {
            var base = getValue(this.collection, 'url') || getValue(this, 'urlRoot') || urlError();
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + encodeURIComponent(this.id);
        },

        // **parse** converts a response into the hash of attributes to be `set` on
        // the model. The default implementation is just to pass the response along.
        parse: function(resp, xhr) {
            return resp;
        },

        // Create a new model with identical attributes to this one.
        clone: function() {
            return new this.constructor(this.attributes);
        },

        // A model is new if it has never been saved to the server, and lacks an id.
        isNew: function() {
            return this.id == null;
        },

        // Call this method to manually fire a `"change"` event for this model and
        // a `"change:attribute"` event for each changed attribute.
        // Calling this will cause all objects observing the model to update.
        change: function(options) {
            if (this._changing || !this.hasChanged()) return this;
            this._changing = true;
            this._moreChanges = true;
            for (var attr in this._changed) {
                this.trigger('change:' + attr, this, this._changed[attr], options);
            }
            while (this._moreChanges) {
                this._moreChanges = false;
                this.trigger('change', this, options);
            }
            this._previousAttributes = _.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this;
        },

        // Determine if the model has changed since the last `"change"` event.
        // If you specify an attribute name, determine if that attribute has changed.
        hasChanged: function(attr) {
            if (!arguments.length) return !_.isEmpty(this._changed);
            return this._changed && _.has(this._changed, attr);
        },

        // Return an object containing all the attributes that have changed, or
        // false if there are no changed attributes. Useful for determining what
        // parts of a view need to be updated and/or what attributes need to be
        // persisted to the server. Unset attributes will be set to undefined.
        // You can also pass an attributes object to diff against the model,
        // determining if there *would be* a change.
        changedAttributes: function(diff) {
            if (!diff) return this.hasChanged() ? _.clone(this._changed) : false;
            var val, changed = false, old = this._previousAttributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], (val = diff[attr]))) continue;
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },

        // Get the previous value of an attribute, recorded at the time the last
        // `"change"` event was fired.
        previous: function(attr) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[attr];
        },

        // Get all of the attributes of the model at the time of the previous
        // `"change"` event.
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },

        // Check if the model is currently in a valid state. It's only possible to
        // get into an *invalid* state if you're using silent changes.
        isValid: function() {
            return !this.validate(this.attributes);
        },

        // Run validation against a set of incoming attributes, returning `true`
        // if all is well. If a specific `error` callback has been passed,
        // call that instead of firing the general `"error"` event.
        _validate: function(attrs, options) {
            if (options.silent || !this.validate) return true;
            attrs = _.extend({}, this.attributes, attrs);
            var error = this.validate(attrs, options);
            if (!error) return true;
            if (options && options.error) {
                options.error(this, error, options);
            } else {
                this.trigger('error', this, error, options);
            }
            return false;
        }

    });

    // Backbone.Collection
    // -------------------

    // Provides a standard collection class for our sets of models, ordered
    // or unordered. If a `comparator` is specified, the Collection will maintain
    // its models in sort order, as they're added and removed.
    Backbone.Collection = function(models, options) {
        options || (options = {});
        if (options.comparator) this.comparator = options.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        if (models) this.reset(models, {silent: true, parse: options.parse});
    };

    // Define the Collection's inheritable methods.
    _.extend(Backbone.Collection.prototype, Backbone.Events, {

        // The default model for a collection is just a **Backbone.Model**.
        // This should be overridden in most cases.
        model: Backbone.Model,

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // The JSON representation of a Collection is an array of the
        // models' attributes.
        toJSON: function() {
            return this.map(function(model){ return model.toJSON(); });
        },

        // Add a model, or list of models to the set. Pass **silent** to avoid
        // firing the `add` event for every new model.
        add: function(models, options) {
            var i, index, length, model, cid, id, cids = {}, ids = {};
            options || (options = {});
            models = _.isArray(models) ? models.slice() : [models];

            // Begin by turning bare objects into model references, and preventing
            // invalid models or duplicate models from being added.
            for (i = 0, length = models.length; i < length; i++) {
                if (!(model = models[i] = this._prepareModel(models[i], options))) {
                    throw new Error("Can't add an invalid model to a collection");
                }
                if (cids[cid = model.cid] || this._byCid[cid] ||
                    (((id = model.id) != null) && (ids[id] || this._byId[id]))) {
                    throw new Error("Can't add the same model to a collection twice");
                }
                cids[cid] = ids[id] = model;
            }

            // Listen to added models' events, and index models for lookup by
            // `id` and by `cid`.
            for (i = 0; i < length; i++) {
                (model = models[i]).on('all', this._onModelEvent, this);
                this._byCid[model.cid] = model;
                if (model.id != null) this._byId[model.id] = model;
            }

            // Insert models into the collection, re-sorting if needed, and triggering
            // `add` events unless silenced.
            this.length += length;
            index = options.at != null ? options.at : this.models.length;
            splice.apply(this.models, [index, 0].concat(models));
            if (this.comparator) this.sort({silent: true});
            if (options.silent) return this;
            for (i = 0, length = this.models.length; i < length; i++) {
                if (!cids[(model = this.models[i]).cid]) continue;
                options.index = i;
                model.trigger('add', model, this, options);
            }
            return this;
        },

        // Remove a model, or a list of models from the set. Pass silent to avoid
        // firing the `remove` event for every model removed.
        remove: function(models, options) {
            var i, l, index, model;
            options || (options = {});
            models = _.isArray(models) ? models.slice() : [models];
            for (i = 0, l = models.length; i < l; i++) {
                model = this.getByCid(models[i]) || this.get(models[i]);
                if (!model) continue;
                delete this._byId[model.id];
                delete this._byCid[model.cid];
                index = this.indexOf(model);
                this.models.splice(index, 1);
                this.length--;
                if (!options.silent) {
                    options.index = index;
                    model.trigger('remove', model, this, options);
                }
                this._removeReference(model);
            }
            return this;
        },

        // Get a model from the set by id.
        get: function(id) {
            if (id == null) return null;
            return this._byId[id.id != null ? id.id : id];
        },

        // Get a model from the set by client id.
        getByCid: function(cid) {
            return cid && this._byCid[cid.cid || cid];
        },

        // Get the model at the given index.
        at: function(index) {
            return this.models[index];
        },

        // Force the collection to re-sort itself. You don't need to call this under
        // normal circumstances, as the set will maintain sort order as each item
        // is added.
        sort: function(options) {
            options || (options = {});
            if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
            var boundComparator = _.bind(this.comparator, this);
            if (this.comparator.length == 1) {
                this.models = this.sortBy(boundComparator);
            } else {
                this.models.sort(boundComparator);
            }
            if (!options.silent) this.trigger('reset', this, options);
            return this;
        },

        // Pluck an attribute from each model in the collection.
        pluck: function(attr) {
            return _.map(this.models, function(model){ return model.get(attr); });
        },

        // When you have more items than you want to add or remove individually,
        // you can reset the entire set with a new list of models, without firing
        // any `add` or `remove` events. Fires `reset` when finished.
        reset: function(models, options) {
            models  || (models = []);
            options || (options = {});
            for (var i = 0, l = this.models.length; i < l; i++) {
                this._removeReference(this.models[i]);
            }
            this._reset();
            this.add(models, {silent: true, parse: options.parse});
            if (!options.silent) this.trigger('reset', this, options);
            return this;
        },

        // Fetch the default set of models for this collection, resetting the
        // collection when they arrive. If `add: true` is passed, appends the
        // models to the collection instead of resetting.
        fetch: function(options) {
            options = options ? _.clone(options) : {};
            if (options.parse === undefined) options.parse = true;
            var collection = this;
            var success = options.success;
            options.success = function(resp, status, xhr) {
                collection[options.add ? 'add' : 'reset'](collection.parse(resp, xhr), options);
                if (success) success(collection, resp);
            };
            options.error = Backbone.wrapError(options.error, collection, options);
            return (this.sync || Backbone.sync).call(this, 'read', this, options);
        },

        // Create a new instance of a model in this collection. Add the model to the
        // collection immediately, unless `wait: true` is passed, in which case we
        // wait for the server to agree.
        create: function(model, options) {
            var coll = this;
            options = options ? _.clone(options) : {};
            model = this._prepareModel(model, options);
            if (!model) return false;
            if (!options.wait) coll.add(model, options);
            var success = options.success;
            options.success = function(nextModel, resp, xhr) {
                if (options.wait) coll.add(nextModel, options);
                if (success) {
                    success(nextModel, resp);
                } else {
                    nextModel.trigger('sync', model, resp, options);
                }
            };
            model.save(null, options);
            return model;
        },

        // **parse** converts a response into a list of models to be added to the
        // collection. The default implementation is just to pass it through.
        parse: function(resp, xhr) {
            return resp;
        },

        // Proxy to _'s chain. Can't be proxied the same way the rest of the
        // underscore methods are proxied because it relies on the underscore
        // constructor.
        chain: function () {
            return _(this.models).chain();
        },

        // Reset all internal state. Called when the collection is reset.
        _reset: function(options) {
            this.length = 0;
            this.models = [];
            this._byId  = {};
            this._byCid = {};
        },

        // Prepare a model or hash of attributes to be added to this collection.
        _prepareModel: function(model, options) {
            if (!(model instanceof Backbone.Model)) {
                var attrs = model;
                options.collection = this;
                model = new this.model(attrs, options);
                if (!model._validate(model.attributes, options)) model = false;
            } else if (!model.collection) {
                model.collection = this;
            }
            return model;
        },

        // Internal method to remove a model's ties to a collection.
        _removeReference: function(model) {
            if (this == model.collection) {
                delete model.collection;
            }
            model.off('all', this._onModelEvent, this);
        },

        // Internal method called every time a model in the set fires an event.
        // Sets need to update their indexes when models change ids. All other
        // events simply proxy through. "add" and "remove" events that originate
        // in other collections are ignored.
        _onModelEvent: function(ev, model, collection, options) {
            if ((ev == 'add' || ev == 'remove') && collection != this) return;
            if (ev == 'destroy') {
                this.remove(model, options);
            }
            if (model && ev === 'change:' + model.idAttribute) {
                delete this._byId[model.previous(model.idAttribute)];
                this._byId[model.id] = model;
            }
            this.trigger.apply(this, arguments);
        }

    });

    // Underscore methods that we want to implement on the Collection.
    var methods = ['forEach', 'each', 'map', 'reduce', 'reduceRight', 'find',
        'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any',
        'include', 'contains', 'invoke', 'max', 'min', 'sortBy', 'sortedIndex',
        'toArray', 'size', 'first', 'initial', 'rest', 'last', 'without', 'indexOf',
        'shuffle', 'lastIndexOf', 'isEmpty', 'groupBy'];

    // Mix in each Underscore method as a proxy to `Collection#models`.
    _.each(methods, function(method) {
        Backbone.Collection.prototype[method] = function() {
            return _[method].apply(_, [this.models].concat(_.toArray(arguments)));
        };
    });

    // Backbone.Router
    // -------------------

    // Routers map faux-URLs to actions, and fire events when routes are
    // matched. Creating a new one sets its `routes` hash, if not set statically.
    Backbone.Router = function(options) {
        options || (options = {});
        if (options.routes) this.routes = options.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments);
    };

    // Cached regular expressions for matching named param parts and splatted
    // parts of route strings.
    var namedParam    = /:\w+/g;
    var splatParam    = /\*\w+/g;
    var escapeRegExp  = /[-[\]{}()+?.,\\^$|#\s]/g;

    // Set up all inheritable **Backbone.Router** properties and methods.
    _.extend(Backbone.Router.prototype, Backbone.Events, {

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // Manually bind a single named route to a callback. For example:
        //
        //     this.route('search/:query/p:num', 'search', function(query, num) {
        //       ...
        //     });
        //
        route: function(route, name, callback) {
            Backbone.history || (Backbone.history = new Backbone.History);
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (!callback) callback = this[name];
            Backbone.history.route(route, _.bind(function(fragment) {
                var args = this._extractParameters(route, fragment);
                callback && callback.apply(this, args);
                this.trigger.apply(this, ['route:' + name].concat(args));
                Backbone.history.trigger('route', this, name, args);
            }, this));
            return this;
        },

        // Simple proxy to `Backbone.history` to save a fragment into the history.
        navigate: function(fragment, options) {
            Backbone.history.navigate(fragment, options);
        },

        // Bind all defined routes to `Backbone.history`. We have to reverse the
        // order of the routes here to support behavior where the most general
        // routes can be defined at the bottom of the route map.
        _bindRoutes: function() {
            if (!this.routes) return;
            var routes = [];
            for (var route in this.routes) {
                routes.unshift([route, this.routes[route]]);
            }
            for (var i = 0, l = routes.length; i < l; i++) {
                this.route(routes[i][0], routes[i][1], this[routes[i][1]]);
            }
        },

        // Convert a route string into a regular expression, suitable for matching
        // against the current location hash.
        _routeToRegExp: function(route) {
            route = route.replace(escapeRegExp, '\\$&')
                .replace(namedParam, '([^\/]+)')
                .replace(splatParam, '(.*?)');
            return new RegExp('^' + route + '$');
        },

        // Given a route, and a URL fragment that it matches, return the array of
        // extracted parameters.
        _extractParameters: function(route, fragment) {
            return route.exec(fragment).slice(1);
        }

    });

    // Backbone.History
    // ----------------

    // Handles cross-browser history management, based on URL fragments. If the
    // browser does not support `onhashchange`, falls back to polling.
    Backbone.History = function() {
        this.handlers = [];
        _.bindAll(this, 'checkUrl');
    };

    // Cached regex for cleaning leading hashes and slashes .
    var routeStripper = /^[#\/]/;

    // Cached regex for detecting MSIE.
    var isExplorer = /msie [\w.]+/;

    // Has the history handling already been started?
    var historyStarted = false;

    // Set up all inheritable **Backbone.History** properties and methods.
    _.extend(Backbone.History.prototype, Backbone.Events, {

        // The default interval to poll for hash changes, if necessary, is
        // twenty times a second.
        interval: 50,

        // Get the cross-browser normalized URL fragment, either from the URL,
        // the hash, or the override.
        getFragment: function(fragment, forcePushState) {
            if (fragment == null) {
                if (this._hasPushState || forcePushState) {
                    fragment = window.location.pathname;
                    var search = window.location.search;
                    if (search) fragment += search;
                } else {
                    fragment = window.location.hash;
                }
            }
            fragment = decodeURIComponent(fragment);
            if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
            return fragment.replace(routeStripper, '');
        },

        // Start the hash change handling, returning `true` if the current URL matches
        // an existing route, and `false` otherwise.
        start: function(options) {

            // Figure out the initial configuration. Do we need an iframe?
            // Is pushState desired ... is it available?
            if (historyStarted) throw new Error("Backbone.history has already been started");
            this.options          = _.extend({}, {root: '/'}, this.options, options);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState  = !!this.options.pushState;
            this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
            var fragment          = this.getFragment();
            var docMode           = document.documentMode;
            var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
            if (oldIE) {
                this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
                this.navigate(fragment);
            }

            // Depending on whether we're using pushState or hashes, and whether
            // 'onhashchange' is supported, determine how we check the URL state.
            if (this._hasPushState) {
                $(window).bind('popstate', this.checkUrl);
            } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
                $(window).bind('hashchange', this.checkUrl);
            } else if (this._wantsHashChange) {
                this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            }

            // Determine if we need to change the base url, for a pushState link
            // opened by a non-pushState browser.
            this.fragment = fragment;
            historyStarted = true;
            var loc = window.location;
            var atRoot  = loc.pathname == this.options.root;

            // If we've started off with a route from a `pushState`-enabled browser,
            // but we're currently in a browser that doesn't support it...
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + '#' + this.fragment);
                // Return immediately as browser will do redirect to new url
                return true;

                // Or if we've started out with a hash-based route, but we're currently
                // in a browser where it could be `pushState`-based instead...
            } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
                this.fragment = loc.hash.replace(routeStripper, '');
                window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
            }

            if (!this.options.silent) {
                return this.loadUrl();
            }
        },

        // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
        // but possibly useful for unit testing Routers.
        stop: function() {
            $(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
            clearInterval(this._checkUrlInterval);
            historyStarted = false;
        },

        // Add a route to be tested when the fragment changes. Routes added later
        // may override previous routes.
        route: function(route, callback) {
            this.handlers.unshift({route: route, callback: callback});
        },

        // Checks the current URL to see if it has changed, and if it has,
        // calls `loadUrl`, normalizing across the hidden iframe.
        checkUrl: function(e) {
            var current = this.getFragment();
            if (current == this.fragment && this.iframe) current = this.getFragment(this.iframe.location.hash);
            if (current == this.fragment || current == decodeURIComponent(this.fragment)) return false;
            if (this.iframe) this.navigate(current);
            this.loadUrl() || this.loadUrl(window.location.hash);
        },

        // Attempt to load the current URL fragment. If a route succeeds with a
        // match, returns `true`. If no defined routes matches the fragment,
        // returns `false`.
        loadUrl: function(fragmentOverride) {
            var fragment = this.fragment = this.getFragment(fragmentOverride);
            var matched = _.any(this.handlers, function(handler) {
                if (handler.route.test(fragment)) {
                    handler.callback(fragment);
                    return true;
                }
            });
            return matched;
        },

        // Save a fragment into the hash history, or replace the URL state if the
        // 'replace' option is passed. You are responsible for properly URL-encoding
        // the fragment in advance.
        //
        // The options object can contain `trigger: true` if you wish to have the
        // route callback be fired (not usually desirable), or `replace: true`, if
        // you which to modify the current URL without adding an entry to the history.
        navigate: function(fragment, options) {
            if (!historyStarted) return false;
            if (!options || options === true) options = {trigger: options};
            var frag = (fragment || '').replace(routeStripper, '');
            if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;

            // If pushState is available, we use it to set the fragment as a real URL.
            if (this._hasPushState) {
                if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
                this.fragment = frag;
                window.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, frag);

                // If hash changes haven't been explicitly disabled, update the hash
                // fragment to store history.
            } else if (this._wantsHashChange) {
                this.fragment = frag;
                this._updateHash(window.location, frag, options.replace);
                if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
                    // Opening and closing the iframe tricks IE7 and earlier to push a history entry on hash-tag change.
                    // When replace is true, we don't want this.
                    if(!options.replace) this.iframe.document.open().close();
                    this._updateHash(this.iframe.location, frag, options.replace);
                }

                // If you've told us that you explicitly don't want fallback hashchange-
                // based history, then `navigate` becomes a page refresh.
            } else {
                window.location.assign(this.options.root + fragment);
            }
            if (options.trigger) this.loadUrl(fragment);
        },

        // Update the hash location, either replacing the current entry, or adding
        // a new one to the browser history.
        _updateHash: function(location, fragment, replace) {
            if (replace) {
                location.replace(location.toString().replace(/(javascript:|#).*$/, '') + '#' + fragment);
            } else {
                location.hash = fragment;
            }
        }
    });

    // Backbone.View
    // -------------

    // Creating a Backbone.View creates its initial element outside of the DOM,
    // if an existing element is not provided...
    Backbone.View = function(options) {
        this.cid = _.uniqueId('view');
        this._configure(options || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents();
    };

    // Cached regex to split keys for `delegate`.
    var eventSplitter = /^(\S+)\s*(.*)$/;

    // List of view options to be merged as properties.
    var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName'];

    // Set up all inheritable **Backbone.View** properties and methods.
    _.extend(Backbone.View.prototype, Backbone.Events, {

        // The default `tagName` of a View's element is `"div"`.
        tagName: 'div',

        // jQuery delegate for element lookup, scoped to DOM elements within the
        // current view. This should be prefered to global lookups where possible.
        $: function(selector) {
            return this.$el.find(selector);
        },

        // Initialize is an empty function by default. Override it with your own
        // initialization logic.
        initialize: function(){},

        // **render** is the core function that your view should override, in order
        // to populate its element (`this.el`), with the appropriate HTML. The
        // convention is for **render** to always return `this`.
        render: function() {
            return this;
        },

        // Remove this view from the DOM. Note that the view isn't present in the
        // DOM by default, so calling this method may be a no-op.
        remove: function() {
            this.$el.remove();
            return this;
        },

        // For small amounts of DOM Elements, where a full-blown template isn't
        // needed, use **make** to manufacture elements, one at a time.
        //
        //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
        //
        make: function(tagName, attributes, content) {
            var el = document.createElement(tagName);
            if (attributes) $(el).attr(attributes);
            if (content) $(el).html(content);
            return el;
        },

        // Change the view's element (`this.el` property), including event
        // re-delegation.
        setElement: function(element, delegate) {
            this.$el = $(element);
            this.el = this.$el[0];
            if (delegate !== false) this.delegateEvents();
            return this;
        },

        // Set callbacks, where `this.events` is a hash of
        //
        // *{"event selector": "callback"}*
        //
        //     {
        //       'mousedown .title':  'edit',
        //       'click .button':     'save'
        //       'click .open':       function(e) { ... }
        //     }
        //
        // pairs. Callbacks will be bound to the view, with `this` set properly.
        // Uses event delegation for efficiency.
        // Omitting the selector binds the event to `this.el`.
        // This only works for delegate-able events: not `focus`, `blur`, and
        // not `change`, `submit`, and `reset` in Internet Explorer.
        delegateEvents: function(events) {
            if (!(events || (events = getValue(this, 'events')))) return;
            this.undelegateEvents();
            for (var key in events) {
                var method = events[key];
                if (!_.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Event "' + events[key] + '" does not exist');
                var match = key.match(eventSplitter);
                var eventName = match[1], selector = match[2];
                method = _.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.bind(eventName, method);
                } else {
                    this.$el.delegate(selector, eventName, method);
                }
            }
        },

        // Clears all callbacks previously bound to the view with `delegateEvents`.
        // You usually don't need to use this, but may wish to if you have multiple
        // Backbone views attached to the same DOM element.
        undelegateEvents: function() {
            this.$el.unbind('.delegateEvents' + this.cid);
        },

        // Performs the initial configuration of a View with a set of options.
        // Keys with special meaning *(model, collection, id, className)*, are
        // attached directly to the view.
        _configure: function(options) {
            if (this.options) options = _.extend({}, this.options, options);
            for (var i = 0, l = viewOptions.length; i < l; i++) {
                var attr = viewOptions[i];
                if (options[attr]) this[attr] = options[attr];
            }
            this.options = options;
        },

        // Ensure that the View has a DOM element to render into.
        // If `this.el` is a string, pass it through `$()`, take the first
        // matching element, and re-assign it to `el`. Otherwise, create
        // an element from the `id`, `className` and `tagName` properties.
        _ensureElement: function() {
            if (!this.el) {
                var attrs = getValue(this, 'attributes') || {};
                if (this.id) attrs.id = this.id;
                if (this.className) attrs['class'] = this.className;
                this.setElement(this.make(this.tagName, attrs), false);
            } else {
                this.setElement(this.el, false);
            }
        }

    });

    // The self-propagating extend function that Backbone classes use.
    var extend = function (protoProps, classProps) {
        var child = inherits(this, protoProps, classProps);
        child.extend = this.extend;
        return child;
    };

    // Set up inheritance for the model, collection, and view.
    Backbone.Model.extend = Backbone.Collection.extend =
        Backbone.Router.extend = Backbone.View.extend = extend;

    // Backbone.sync
    // -------------

    // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read':   'GET'
    };

    // Override this function to change the manner in which Backbone persists
    // models to the server. You will be passed the type of request, and the
    // model in question. By default, makes a RESTful Ajax request
    // to the model's `url()`. Some possible customizations could be:
    //
    // * Use `setTimeout` to batch rapid-fire updates into a single request.
    // * Send up the models as XML instead of JSON.
    // * Persist models via WebSockets instead of Ajax.
    //
    // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
    // as `POST`, with a `_method` parameter containing the true HTTP method,
    // as well as all requests with the body as `application/x-www-form-urlencoded`
    // instead of `application/json` with the model in a param named `model`.
    // Useful when interfacing with server-side languages like **PHP** that make
    // it difficult to read the body of `PUT` requests.
    Backbone.sync = function(method, model, options) {
        var type = methodMap[method];

        // Default JSON-request options.
        var params = {type: type, dataType: 'json'};

        // Ensure that we have a URL.
        if (!options.url) {
            params.url = getValue(model, 'url') || urlError();
        }

        // Ensure that we have the appropriate request data.
        if (!options.data && model && (method == 'create' || method == 'update')) {
            params.contentType = 'application/json';
            params.data = JSON.stringify(model.toJSON());
        }

        // For older servers, emulate JSON by encoding the request into an HTML-form.
        if (Backbone.emulateJSON) {
            params.contentType = 'application/x-www-form-urlencoded';
            params.data = params.data ? {model: params.data} : {};
        }

        // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
        // And an `X-HTTP-Method-Override` header.
        if (Backbone.emulateHTTP) {
            if (type === 'PUT' || type === 'DELETE') {
                if (Backbone.emulateJSON) params.data._method = type;
                params.type = 'POST';
                params.beforeSend = function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', type);
                };
            }
        }

        // Don't process data on a non-GET request.
        if (params.type !== 'GET' && !Backbone.emulateJSON) {
            params.processData = false;
        }

        // Make the request, allowing the user to override any Ajax options.
        return $.ajax(_.extend(params, options));
    };

    // Wrap an optional error callback with a fallback error event.
    Backbone.wrapError = function(onError, originalModel, options) {
        return function(model, resp) {
            resp = model === originalModel ? resp : model;
            if (onError) {
                onError(originalModel, resp, options);
            } else {
                originalModel.trigger('error', originalModel, resp, options);
            }
        };
    };

    // Helpers
    // -------

    // Shared empty constructor function to aid in prototype-chain creation.
    var ctor = function(){};

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var inherits = function(parent, protoProps, staticProps) {
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ parent.apply(this, arguments); };
        }

        // Inherit class (static) properties from parent.
        _.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
    };

    // Helper function to get a value from a Backbone object as a property
    // or as a function.
    var getValue = function(object, prop) {
        if (!(object && object[prop])) return null;
        return _.isFunction(object[prop]) ? object[prop]() : object[prop];
    };

    // Throw an error when a URL is needed, and none is supplied.
    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };

}).call(this);

//google maps

window.google = window.google || {};
google.maps = google.maps || {};
(function() {

    function getScript(src) {
        document.write('<' + 'script src="' + src + '"' +
            ' type="text/javascript"><' + '/script>');
    }

    var modules = google.maps.modules = {};
    google.maps.__gjsload__ = function(name, text) {
        modules[name] = text;
    };

    google.maps.Load = function(apiLoad) {
        delete google.maps.Load;
        apiLoad([null,[[["http://mt0.googleapis.com/vt?lyrs=m@186000000\u0026src=api\u0026hl=ru\u0026","http://mt1.googleapis.com/vt?lyrs=m@186000000\u0026src=api\u0026hl=ru\u0026"],null,null,null,null,"m@186000000"],[["http://khm0.googleapis.com/kh?v=117\u0026hl=ru\u0026","http://khm1.googleapis.com/kh?v=117\u0026hl=ru\u0026"],null,null,null,1,"117"],[["http://mt0.googleapis.com/vt?lyrs=h@186000000\u0026src=api\u0026hl=ru\u0026","http://mt1.googleapis.com/vt?lyrs=h@186000000\u0026src=api\u0026hl=ru\u0026"],null,null,"imgtp=png32\u0026",null,"h@186000000"],[["http://mt0.googleapis.com/vt?lyrs=t@129,r@186000000\u0026src=api\u0026hl=ru\u0026","http://mt1.googleapis.com/vt?lyrs=t@129,r@186000000\u0026src=api\u0026hl=ru\u0026"],null,null,null,null,"t@129,r@186000000"],null,[[null,0,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026"]],[null,0,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026"]],[null,0,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026"]],[null,0,10,19,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1.17\u0026hl=ru\u0026"]],[null,3,7,7,[[[330000000,1246050000],[386200000,1293600000]],[[366500000,1297000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026"]],[null,3,8,8,[[[330000000,1246050000],[386200000,1279600000]],[[345000000,1279600000],[386200000,1286700000]],[[354690000,1286700000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026"]],[null,3,9,9,[[[330000000,1246050000],[386200000,1279600000]],[[340000000,1279600000],[386200000,1286700000]],[[348900000,1286700000],[386200000,1302000000]],[[368300000,1302000000],[386200000,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026"]],[null,3,10,null,[[[329890840,1246055600],[386930130,1284960940]],[[344646740,1284960940],[386930130,1288476560]],[[350277470,1288476560],[386930130,1310531620]],[[370277730,1310531620],[386930130,1314843700]]],["http://mt0.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026","http://mt1.gmaptiles.co.kr/mt?v=kr1p.17\u0026hl=ru\u0026"]]],[["http://cbk0.googleapis.com/cbk?","http://cbk1.googleapis.com/cbk?"]],[["http://khm0.googleapis.com/kh?v=62\u0026hl=ru\u0026","http://khm1.googleapis.com/kh?v=62\u0026hl=ru\u0026"],null,null,null,null,"62"],[["http://mt0.googleapis.com/mapslt?hl=ru\u0026","http://mt1.googleapis.com/mapslt?hl=ru\u0026"]],[["http://mt0.googleapis.com/mapslt/ft?hl=ru\u0026","http://mt1.googleapis.com/mapslt/ft?hl=ru\u0026"]],[["http://mt0.googleapis.com/vt?hl=ru\u0026","http://mt1.googleapis.com/vt?hl=ru\u0026"]]],["ru","US",null,0,null,null,"http://maps.gstatic.com/mapfiles/","http://csi.gstatic.com","https://maps.googleapis.com","http://maps.googleapis.com"],["http://maps.gstatic.com/intl/ru_ALL/mapfiles/api-3/9/14","3.9.14"],[351462400],1.0,null,null,null,null,0,"",["geometry"],null,0,"http://khm.googleapis.com/mz?v=117\u0026",null,"https://earthbuilder.google.com","https://earthbuilder.googleapis.com"], loadScriptTime);
    };
    var loadScriptTime = (new Date).getTime();
    getScript("http://maps.gstatic.com/cat_js/intl/ru_ALL/mapfiles/api-3/9/14/%7Bmain,geometry%7D.js");
})();

// Backbone map view
if((typeof App) === "undefined") App = {};

App.Views = {};//инициализируем пространство имен видов
App.Models = {};//инициализируем пространство имен моделий

$(function(){
    App.Views.Map = Backbone.View.extend({

        initialize:function () {

            /*this.$el.css({
                "height":screen.height,
                "width":screen.width
            });*/

            _.bindAll(this,
                'LoadMapPosition',
                'SaveMapPosition',
                'LoadMapZoom',
                'SaveMapZoom',
                'LoadMapType',
                'SaveMapType',
                'getMap'
            );
        },

        render:function(){

            var myOptions = {
                zoom:16,
                mapTypeId:google.maps.MapTypeId.ROADMAP,
                disableDoubleClickZoom:true,
                draggableCursor:'default',
                center:new google.maps.LatLng(42.8753903660182, 74.63396263701634)
            };

            this.map = new google.maps.Map(this.$el[0], myOptions);

            // активаруем состояние карты при загрузке(тип карты, положение, масштаб)
            this.LoadMapPosition();
            this.LoadMapZoom();
            this.LoadMapType();

            //запоминаем состояние карты при загрузке(тип карты, положение, масштаб)
            google.maps.event.addListener(this.map, 'dragend', this.SaveMapPosition);
            google.maps.event.addListener(this.map, 'zoom_changed', this.SaveMapZoom);
            google.maps.event.addListener(this.map,'maptypeid_changed', this.SaveMapType);

            google.maps.event.addListenerOnce(this.map,'idle', $.proxy(function(){
                this.trigger("rendered");
            },this));

            return this;
        },

        LoadMapPosition:function () {

            var map_position = $.jCookies({
                get:"map_position"
            });

            if (map_position) {
                this.map.setCenter(new google.maps.LatLng(map_position.lat, map_position.lng));
            }
        },

        SaveMapPosition:function () {
            $.jCookies({
                name:"map_position",
                value:{
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                }
            });
        },

        SaveMapZoom:function(){
            $.jCookies({
                name : "map_zoom",
                value : this.map.getZoom()
            });
        },

        LoadMapZoom:function(){
            var map_zoom = $.jCookies({
                get:"map_zoom"
            });

            if (map_zoom) {
                this.map.setZoom(map_zoom);
            }
        },

        SaveMapType: function(){
            $.jCookies({
                name : "map_type",
                value : this.map.getMapTypeId()
            });
        },

        LoadMapType: function(){
            var map_type = $.jCookies({
                get:"map_type"
            });

            if (map_type) {
                this.map.setMapTypeId(map_type);
            }

        },

        getMap:function(){
            return this.map;
        }
    });


});




//Bs direction view

/**
 * User: e.kamenev
 * Date: 19.09.12
 * Time: 8:43
 */

App.Views.BsDirection = Backbone.View.extend({
    // TODO разобраться, почему в этом месте, не может быть получен див карты!
    //this.el = this.options.map.getDiv();
    /*events:{
     'click': 'render'
     },*/

    arrows:[], // массив стрелок

    initialize: function(){

        _.bindAll(this, 'render', 'deleteArrow', 'disable');

        this.el = this.options.map.getDiv(); //див карты

        $(this.el).click(this.render); // Отрисовываем стрелку

    },

    render: function(event){

        this.model = new App.Models.NearestBaseStations;

        // при получении данных с сервера с базами данных
        this.model.on('success',function(model){
            // удаляем предыдущие стрелки
            this.deleteArrow();

            // рисуем новые стрелки
            _.each(model.get('locations'),function(location){

                this.arrows.push(this.getArrow(this.getLatLngFromEvent(event),location));

            },this);

        },this);

        // запрашиваем данные на сервере, скармливаем серверу координаты пользователя
        this.model.fetch({
            data: {
                lat: this.getLatLngFromEvent(event).lat(),
                lng: this.getLatLngFromEvent(event).lng()
            },

            // Возбуждаем событие успешности получения данных с сервера.
            success:function(model){
                model.trigger('success',model);
            }
        });

    },


    getLatLngFromEvent:function(event){ // конвертируем координаты окна в координаты карты
        var point;

        point = new google.maps.Point(parseInt(event.pageX), parseInt(event.pageY)-21);// 21px отступ для главного меню
        return App.Views.overlay.get().getProjection().fromContainerPixelToLatLng(point);
    },


    getArrow: function(from,to){

        // длинна вектора
        var vector_long = Math.sqrt(Math.pow( to.lat-from.lat(),2 )+ Math.pow( to.lng-from.lng(),2 ));

        //координаты вектора
        var vector_coord = {
            lat: (to.lat - from.lat()),
            lng: (to.lng - from.lng())
        };

        //конце стрелки удаленный от начала на 0.008 градуса
        var vector_point_coord = {
            lat: ((vector_coord.lat / vector_long)*0.006)+ from.lat(),
            lng: ((vector_coord.lng / vector_long)*0.006)+ from.lng()
        };

        //конец стрелки
        var arrow_to = new google.maps.LatLng(vector_point_coord.lat,vector_point_coord.lng);

        var arrow =  new google.maps.Polyline({
            path:[from, arrow_to],
            strokeColor: "black",
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map:this.options.map
        });

        return arrow;
    },

    deleteArrow: function(){

        _.each(this.arrows,function(arrow){
            arrow.setMap(null);
        });

        this.arrows = [];

    },

    disable:function(){

        $(this.el).unbind('click',this.render);
        this.deleteArrow();
    }


});

// model

$(function(){

    App.Models.NearestBaseStations = Backbone.Model.extend({

        sync: function(method,model,options){
            switch(method){
                case 'get': return Backbone.sync(method,model,{
                    dataType :"json",
                    data: options.data,
                    success:$.proxy(function(data){
                        model.set(data);
                    },this)
                });
                    break;
                default: return Backbone.sync(method, model, options); break;

            }
        },

        silent:true,
        url:"/bs_direction"

    });

});



$(document).ready(function() {
    App.Views.map = new App.Views.Map({el:"#map_canvas"}).render();

    // Создаем новый слой на карте для возможнсти получить проекцию карты.
    App.Views.overlay = new (Backbone.View.extend({

        initialize:function(){

            _.bindAll(this, 'get');
            this.overlay = new google.maps.OverlayView();
            this.overlay.draw = function(){};
            this.overlay.setMap(App.Views.map.getMap());
        },

        get:function(){
            return this.overlay;
        }

    }));

    // view init
    new App.Views.BsDirection({
        map: App.Views.map.getMap()
    });
});