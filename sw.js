(()=>{"use strict";var e={895:()=>{try{self["workbox:cacheable-response:6.2.4"]&&_()}catch(e){}},913:()=>{try{self["workbox:core:6.2.4"]&&_()}catch(e){}},550:()=>{try{self["workbox:expiration:6.2.4"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.2.4"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.2.4"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.2.4"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}s(80);const t=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,s,n="GET"){this.handler=t(s),this.match=e,this.method=n}setCatchHandler(e){this.catchHandler=t(e)}}class a extends n{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class r{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:a})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async n=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:a})}catch(e){e instanceof Error&&(n=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(a)&&0===a.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,s="GET"){this._defaultHandlerMap.set(s,t(e))}setCatchHandler(e){this._catchHandler=t(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let i;const c=()=>(i||(i=new r,i.addFetchListener(),i.addCacheListener()),i);function o(t,s,r){let i;if("string"==typeof t){const e=new URL(t,location.href);i=new n((({url:t})=>t.href===e.href),s,r)}else if(t instanceof RegExp)i=new a(t,s,r);else if("function"==typeof t)i=new n(t,s,r);else{if(!(t instanceof n))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});i=t}return c().registerRoute(i),i}const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=e=>[h.prefix,e,h.suffix].filter((e=>e&&e.length>0)).join("-"),u=e=>e||l(h.precache),d=e=>e||l(h.runtime);function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class f{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;function w(e){return"string"==typeof e?new Request(e):e}s(873);class m{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new f,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let n=w(t);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=w(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const n=w(t);await(0,new Promise((e=>setTimeout(e,0))));const a=await this.getCacheKey(n,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=a.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),l=this.hasCallback("cacheDidUpdate"),u=l?await async function(e,t,s,n){const a=p(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(a===p(t.url,s))return e.match(t,n)}(h,a.clone(),["__WB_REVISION__"],o):null;try{await h.put(a,l?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:u,newResponse:i.clone(),request:a,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=w(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class y{constructor(e={}){this.cacheName=d(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new m(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(t,s,n){let a;await t.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,t),!a||"error"===a.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(a=await r({error:e,event:n,request:s}),a)break;if(!a)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))a=await e({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class _ extends y{async _handle(t,s){let n,a=await s.cacheMatch(t);if(a);else try{a=await s.fetchAndCachePut(t)}catch(e){e instanceof Error&&(n=e)}if(!a)throw new e("no-response",{url:t.url,error:n});return a}}const b={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};s(895);class v{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class R{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new v(e)}}function x(e){e.then((()=>{}))}let C,q;const E=new WeakMap,L=new WeakMap,U=new WeakMap,k=new WeakMap,T=new WeakMap;let D={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return L.get(e);if("objectStoreNames"===t)return e.objectStoreNames||U.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return P(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function N(e){return"function"==typeof e?(t=e)!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(q||(q=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(M(this),e),P(E.get(this))}:function(...e){return P(t.apply(M(this),e))}:function(e,...s){const n=t.call(M(this),e,...s);return U.set(n,e.sort?e.sort():[e]),P(n)}:(e instanceof IDBTransaction&&function(e){if(L.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",r),e.removeEventListener("abort",r)},a=()=>{t(),n()},r=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",r),e.addEventListener("abort",r)}));L.set(e,t)}(e),s=e,(C||(C=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>s instanceof e))?new Proxy(e,D):e);var t,s}function P(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",r)},a=()=>{t(P(e.result)),n()},r=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&E.set(t,e)})).catch((()=>{})),T.set(t,e),t}(e);if(k.has(e))return k.get(e);const t=N(e);return t!==e&&(k.set(e,t),T.set(t,e)),t}const M=e=>T.get(e),I=["get","getKey","getAll","getAllKeys","count"],S=["put","add","delete","clear"],K=new Map;function A(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(K.get(t))return K.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=S.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!I.includes(s))return;const r=async function(e,...t){const r=this.transaction(e,a?"readwrite":"readonly");let i=r.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[s](...t),a&&r.done]))[0]};return K.set(t,r),r}var O;O=D,D={...O,get:(e,t,s)=>A(e,t)||O.get(e,t,s),has:(e,t)=>!!A(e,t)||O.has(e,t)},s(550);const W="cache-entries",B=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class j{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(W,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(()=>t())),P(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=B(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=await this.getDb();await n.put(W,s)}async getTimestamp(e){const t=await this.getDb(),s=await t.get(W,this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(W).store.index("timestamp").openCursor(null,"prev");const a=[];let r=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&r>=t?a.push(n.value):r++),n=await n.continue()}const i=[];for(const e of a)await s.delete(W,e.id),i.push(e.url);return i}_getId(e){return this._cacheName+"|"+B(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:r}={}){const i=indexedDB.open(e,t),c=P(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(P(i.result),e.oldVersion,e.newVersion,P(i.transaction))})),s&&i.addEventListener("blocked",(()=>s())),c.then((e=>{r&&e.addEventListener("close",(()=>r())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class H{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new j(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,x(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class F{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);x(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),g.add(t))}_getCacheExpiration(t){if(t===d())throw new e("expire-custom-caches-only");let s=this._cacheExpirations.get(t);return s||(s=new H(t,this._config),this._cacheExpirations.set(t,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}function $(e,t){const s=t();return e.waitUntil(s),s}function V(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:n}=t;if(!n)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}s(977);class G{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class Q{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}let J,z;class X extends y{constructor(e={}){e.cacheName=u(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(X.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let n;if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});return n=await s.fetch(t),n}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(t);if(!await s.cachePut(t,n.clone()))throw new e("bad-precaching-response",{url:t.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==X.copyRedirectedCacheableResponsesPlugin&&(n===X.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(X.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}X.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},X.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let n=null;if(t.url&&(n=new URL(t.url).origin),n!==self.location.origin)throw new e("cross-origin-copy-response",{origin:n});const a=t.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,c=function(){if(void 0===J){const e=new Response("");if("body"in e)try{new Response(e.body),J=!0}catch(e){J=!1}J=!1}return J}()?a.body:await a.blob();return new Response(c,i)}(t):t};class Y{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new X({cacheName:u(e),plugins:[...t,new Q({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const n of t){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:t,url:a}=V(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==n.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(t,n.integrity)}if(this._urlsToCacheKeys.set(a,t),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return $(e,(async()=>{const t=new G;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return $(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}const Z=()=>(z||(z=new Y),z);class ee extends n{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}var te,se;o((({request:e})=>["navigate"].includes(e.destination)>=0),new class extends y{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(b),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(t,s){const n=[],a=[];let r;if(this._networkTimeoutSeconds){const{id:e,promise:i}=this._getTimeoutPromise({request:t,logs:n,handler:s});r=e,a.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:t,logs:n,handler:s});a.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(a))||await i)());if(!c)throw new e("no-response",{url:t.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let n;return{promise:new Promise((t=>{n=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:n}){let a,r;try{r=await n.fetchAndCachePut(t)}catch(e){e instanceof Error&&(a=e)}return e&&clearTimeout(e),!a&&r||(r=await n.cacheMatch(t)),r}}({cacheName:"pages",plugins:[new R({statuses:[200]})]})),o((({request:e})=>["style","script"].includes(e.destination)>=0),new class extends y{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(b)}async _handle(t,s){const n=s.fetchAndCachePut(t).catch((()=>{}));let a,r=await s.cacheMatch(t);if(r);else try{r=await n}catch(e){e instanceof Error&&(a=e)}if(!r)throw new e("no-response",{url:t.url,error:a});return r}}({cacheName:"resources",plugins:[new R({statuses:[200]})]})),o((({request:e})=>["image"].includes(e.destination)>=0),new _({cacheName:"images",plugins:[new R({statuses:[200]}),new F({maxEntries:50,maxAgeSeconds:2592e3})]})),o((({request:e})=>["font"].includes(e.destination)>=0),new _({cacheName:"fonts",plugins:[new R({statuses:[0,200]}),new F({maxAgeSeconds:31536e3,maxEntries:30})]})),se=[{'revision':'689813f41eb5c8af065f92758e0c0609','url':'https://shishiv30.github.io/cui-demo/about.html'},{'revision':'552964b84266d218e9e613630dfaf0b3','url':'https://shishiv30.github.io/cui-demo/dnd.html'},{'revision':'ece6673e477b4d7aca12f04dace5ed60','url':'https://shishiv30.github.io/cui-demo/font.Roboto-Regular.woff2'},{'revision':'9a8a1f8c8f9860224f449c21a3bd76d4','url':'https://shishiv30.github.io/cui-demo/font.Roboto-Thin.woff2'},{'revision':'c0cc9c92fb877993ea6d421c31d33e09','url':'https://shishiv30.github.io/cui-demo/font.Roboto-light.woff2'},{'revision':'a01e22e7da17e7d3c8421ed3d2848515','url':'https://shishiv30.github.io/cui-demo/font.fonticon.ttf'},{'revision':'5f094e019313c37ee6c98dce1c12aa33','url':'https://shishiv30.github.io/cui-demo/font.fonticon.woff'},{'revision':'bf50cfc312bb89b7af108a2eaf8265b8','url':'https://shishiv30.github.io/cui-demo/img.angel_c.jpg'},{'revision':'5183e790ed68bbe4140bb43fcf5a3625','url':'https://shishiv30.github.io/cui-demo/img.angel_l.jpg'},{'revision':'80ae681398e6439d39dc642f8618c661','url':'https://shishiv30.github.io/cui-demo/img.angel_n.jpg'},{'revision':'39c0f51bf46288a3ef8a96a05cf05771','url':'https://shishiv30.github.io/cui-demo/img.bg1.png'},{'revision':'d15501cc9f1fb7b66c5b406bb87ef6ab','url':'https://shishiv30.github.io/cui-demo/img.bg2.png'},{'revision':'be0961898326a809c03f0069e89b8141','url':'https://shishiv30.github.io/cui-demo/img.demon_c.jpg'},{'revision':'430ce28d7a95b818d21efc5909c3ec13','url':'https://shishiv30.github.io/cui-demo/img.demon_l.jpg'},{'revision':'ab0364364e58820676c96d78a632b789','url':'https://shishiv30.github.io/cui-demo/img.demon_n.jpg'},{'revision':'578925d95450e6034e75aaf8e61ab337','url':'https://shishiv30.github.io/cui-demo/img.dragonborn_c.jpg'},{'revision':'95b43148b5684781b456abd32d1ac4f0','url':'https://shishiv30.github.io/cui-demo/img.dragonborn_l.jpg'},{'revision':'a5e7334a00527da3efffb1a39085b20b','url':'https://shishiv30.github.io/cui-demo/img.dragonborn_n.jpg'},{'revision':'ce3e55c905dc05d1aec0f3cb16df7f0e','url':'https://shishiv30.github.io/cui-demo/img.dwarf_c.jpg'},{'revision':'11b4c99aa33b6161722da369b482346c','url':'https://shishiv30.github.io/cui-demo/img.dwarf_l.jpg'},{'revision':'a339f458543bcdcf180a1b92ad939710','url':'https://shishiv30.github.io/cui-demo/img.dwarf_n.jpg'},{'revision':'3fd8eb69d7c088bf5780dc02fb59a599','url':'https://shishiv30.github.io/cui-demo/img.elf_c.jpg'},{'revision':'b8ce2d2e292f8194dc3e1c417357e880','url':'https://shishiv30.github.io/cui-demo/img.elf_l.jpg'},{'revision':'5e8c5f79501c3013e6bc6a8e132a04c8','url':'https://shishiv30.github.io/cui-demo/img.elf_n.jpg'},{'revision':'739ec0c2b4513a63af56400e51cf9d04','url':'https://shishiv30.github.io/cui-demo/img.ex_1.jpg'},{'revision':'671c159d4685ef64c7c606ef1ee82b91','url':'https://shishiv30.github.io/cui-demo/img.ex_2.jpg'},{'revision':'475dba1a9dcffda83d59b76fc61fc872','url':'https://shishiv30.github.io/cui-demo/img.ex_3.jpg'},{'revision':'66a9edbdfd1f1e397e53cb2d033c5f80','url':'https://shishiv30.github.io/cui-demo/img.ex_4.jpg'},{'revision':'f35921547af09e205100f4f627eafe3c','url':'https://shishiv30.github.io/cui-demo/img.ex_5.jpg'},{'revision':'9d5a8c56d3d3b71847e5b7ba20d0ddc8','url':'https://shishiv30.github.io/cui-demo/img.ex_6.jpg'},{'revision':'a4f61db54903efd6e917616a3c3a31d5','url':'https://shishiv30.github.io/cui-demo/img.ex_7.jpg'},{'revision':'98230c653b85b242ade6da6afe4caf86','url':'https://shishiv30.github.io/cui-demo/img.ex_8.jpg'},{'revision':'0c9df51643a89216d659236e9fb6cf85','url':'https://shishiv30.github.io/cui-demo/img.ex_9.jpg'},{'revision':'bbfedd0f78cd77c67d47240195d249f6','url':'https://shishiv30.github.io/cui-demo/img.fonticon.svg'},{'revision':'3cc4b94b75eaa75cfe3dd79f5b7cd22e','url':'https://shishiv30.github.io/cui-demo/img.human_c.jpg'},{'revision':'9105be471fdf984e9d49ca9562c50af6','url':'https://shishiv30.github.io/cui-demo/img.human_l.jpg'},{'revision':'2462437011ebc59c46c27276a91a8c65','url':'https://shishiv30.github.io/cui-demo/img.human_n.jpg'},{'revision':'03667e1c0db15b3473a899fa725f4bae','url':'https://shishiv30.github.io/cui-demo/img.logo.png'},{'revision':'5b9874a3128779da0844dc50e3fb06ea','url':'https://shishiv30.github.io/cui-demo/img.noimg.jpg'},{'revision':'166223a8409128c7f3612c5e64cb9286','url':'https://shishiv30.github.io/cui-demo/img.orc_c.jpg'},{'revision':'5e395e439758662f71a09736d7afc2ad','url':'https://shishiv30.github.io/cui-demo/img.orc_l.jpg'},{'revision':'c4c726cb86fa65c367065bf550291447','url':'https://shishiv30.github.io/cui-demo/img.orc_n.jpg'},{'revision':'9d27e9478fc542393380c78d13385270','url':'https://shishiv30.github.io/cui-demo/img.profile.jpg'},{'revision':'307b94c8fb0807e8d90e4e0611c18235','url':'https://shishiv30.github.io/cui-demo/img.tiefling_c.jpg'},{'revision':'895e32ffbd8349fd07620546d2e5f771','url':'https://shishiv30.github.io/cui-demo/img.tiefling_l.jpg'},{'revision':'42fff703168c084887fdd271b720b92d','url':'https://shishiv30.github.io/cui-demo/img.tiefling_n.jpg'},{'revision':'04abc188508827424fdfb2f12a3ab65e','url':'https://shishiv30.github.io/cui-demo/img.typograph.png'},{'revision':'f831c0fbaccbe6e7f51140ebd2dc8791','url':'https://shishiv30.github.io/cui-demo/img.undead_c.jpg'},{'revision':'f60daaa24fdf12d3afa2000a2293a5ab','url':'https://shishiv30.github.io/cui-demo/img.undead_l.jpg'},{'revision':'c0c5e81f4f5af7eb3af5ece92673b2dd','url':'https://shishiv30.github.io/cui-demo/img.undead_n.jpg'},{'revision':'a33ea2f08a53e37f87e294fac6e6dbd4','url':'https://shishiv30.github.io/cui-demo/index.html'},{'revision':'03667e1c0db15b3473a899fa725f4bae','url':'https://shishiv30.github.io/cui-demo/logo.png'},{'revision':'f080b952763112bdad1a67c6e0ee97a2','url':'https://shishiv30.github.io/cui-demo/pageabout.bundle.js'},{'revision':'ed89ee06b517c0e35cd0d5efd8d7a903','url':'https://shishiv30.github.io/cui-demo/pageabout.bundle.js.LICENSE.txt'},{'revision':'2e541d28baf8a4599305e84d81086df9','url':'https://shishiv30.github.io/cui-demo/pageabout.min.css'},{'revision':'afbad98617ed88f7b394d0a84d0fdecd','url':'https://shishiv30.github.io/cui-demo/pagednd.bundle.js'},{'revision':'ed89ee06b517c0e35cd0d5efd8d7a903','url':'https://shishiv30.github.io/cui-demo/pagednd.bundle.js.LICENSE.txt'},{'revision':'6dc729dbce0d7acf8edb6f202eaaaa9f','url':'https://shishiv30.github.io/cui-demo/pagednd.min.css'},{'revision':'207bac9145c86c353de2e26f88928ae2','url':'https://shishiv30.github.io/cui-demo/pagedoc.bundle.js'},{'revision':'ed89ee06b517c0e35cd0d5efd8d7a903','url':'https://shishiv30.github.io/cui-demo/pagedoc.bundle.js.LICENSE.txt'},{'revision':'d65ca071037c088e741680974f1fc6d3','url':'https://shishiv30.github.io/cui-demo/pagedoc.min.css'}],Z().precache(se),function(e){const t=Z();o(new ee(t,undefined))}(),te=async({event:e})=>"document"===e.request.destination?("/index.html",Z().matchPrecache("/index.html")):Response.error(),c().setCatchHandler(te)})()})();