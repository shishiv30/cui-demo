(()=>{var e,t={184:(e,t,n)=>{"use strict";(0,n(383).Z)(),window.googleMapKey="key=AIzaSyAdkDAoPsxWOX6M3gSATYh-XOvtfsw0CHk",window.submit=function(){var e="error!",t=$("#formPanel").data("form");t.isValid()&&(e=JSON.stringify(t.getValue()),alert(e))},document.addEventListener("cui",(function(e){$(document).on("dom.load",(function(){var e=function(e,t){var n,i;return e.touches.length&&(n=Array.prototype.slice.call(e.touches).reduce((function(e,t){return e+"Y:"+t.pageY+"X:"+t.pageX+" "}),"(Start) ")),t.touches.length&&(i=Array.prototype.slice.call(t.touches).reduce((function(e,t){return e+"Y:"+t.pageY+"X:"+t.pageX+" "}),"(End) - ")),n+"<br>"+i};$("#eventDiv").on("moving",(function(t,n,i){$(this).html("moving... <br>"+e(n,i))})),$("#eventDiv").on("pinchin",(function(t,n,i){$(this).html("pinchin <br>"+e(n,i))})),$("#eventDiv").on("pinchout",(function(t,n,i){$(this).html("pinchout <br>"+e(n,i))})),$("#eventDiv").on("swipeleft",(function(t,n,i){$(this).html("swipeleft <br>"+e(n,i))})),$("#eventDiv").on("swiperight",(function(t,n,i){$(this).html("swiperight <br>"+e(n,i))})),$("#eventDiv").on("swipedown",(function(t,n,i){$(this).html("swipedown <br>"+e(n,i))})),$("#eventDiv").on("swipeup",(function(t,n,i){$(this).html("swipeup <br>"+e(n,i))})),$("#loadingSection").on("click",(function(){$(".skeleton").html("After Content Loaded, It will show the real content with real height")}))})),$(document).on("click",".btn",(function(){$(this).toggleClass("active")})),$(document).one("initialMap",(function(e,t,n,i){(function(e){for(var t=[],n=0;n<10;n++){var i={lat:1*("37.8"+Math.floor(99999*Math.random())),lng:-1*("122.4"+Math.floor(99999*Math.random()))};t.push(i)}return t})().forEach((function(e){i.addMarker({lat:e.lat,lng:e.lng,html:!0,popTmp:"<div><h1>{{words}}</h1></div>",popData:{words:"hello"}})})),i.fitBounds()})),$(document).one("datatable.inital",(function(e,t,n,i){i.setOptions({columns:[{key:"name",type:"string",display:"Name"},{key:"age",type:"number",display:"Age",sortable:!0},{key:"birthday",type:"date",format:"Y-M-D",display:"Birthday",sortable:!0},{key:"id",type:"number",display:"Description",sortable:!0,template:"Salary salary per day.name is position"}],data:[{id:"1",name:"Conjee",age:"30",birthday:"09/05/1986",salary:"80",position:"Designer"},{id:"2",name:"Steven",age:"18",birthday:"09/05/2001",salary:"50",position:"Engieener"},{id:"3",name:"Shadow",age:"33",birthday:"09/05/1983",salary:"100",position:"S Engieener"}]})}))}))},868:()=>{},574:()=>{},777:()=>{},830:()=>{},209:()=>{},414:()=>{}},n={};function i(e){var o=n[e];if(void 0!==o)return o.exports;var r=n[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,n,o,r)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,o,r]=e[c],l=!0,s=0;s<n.length;s++)(!1&r||a>=r)&&Object.keys(i.O).every((e=>i.O[e](n[s])))?n.splice(s--,1):(l=!1,r<a&&(a=r));if(l){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,o,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={510:0};i.O.j=t=>0===e[t];var t=(t,n)=>{var o,r,[a,l,s]=n,u=0;if(a.some((t=>0!==e[t]))){for(o in l)i.o(l,o)&&(i.m[o]=l[o]);if(s)var c=s(i)}for(t&&t(n);u<a.length;u++)r=a[u],i.o(e,r)&&e[r]&&e[r][0](),e[a[u]]=0;return i.O(c)},n=self.webpackChunkcui_demo=self.webpackChunkcui_demo||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=i.O(void 0,[383],(()=>i(184)));o=i.O(o)})();