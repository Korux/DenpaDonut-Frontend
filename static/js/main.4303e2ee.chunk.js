(this.webpackJsonpdenpa_donut=this.webpackJsonpdenpa_donut||[]).push([[0],{61:function(n,t,e){"use strict";e.r(t);var r,o=e(0),c=e.n(o),i=e(16),a=e.n(i),s=e(17),l=e(15),u=Object(l.b)(r||(r=Object(s.a)(["\n  html, body {\n    margin: 0;\n    margin-top : 35px;\n    padding: 0;\n  }\n  *, *::after, *::before {\n    box-sizing: border-box;\n  }\n  body {\n    background: ",";\n    color: ",';\n    text-rendering: optimizeLegibility;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  }\n  h1 {\n    font-size: 2rem;\n    text-align: center;\n    text-transform: uppercase;\n  }\n\n  div {\n    text-align: center;\n  }\n  small {\n    display: block;\n  }\n  a {\n    color: ',";\n    text-decoration: none;\n  }\n"])),(function(n){return n.theme.primaryDark}),(function(n){return n.theme.primaryLight}),(function(n){return n.theme.primaryHover})),b={server:"http://localhost:3000"},f={primaryDark:"rgb(40,40,40)",primaryLight:"rgb(239, 255, 250)",primaryHover:"rgb(65, 60, 140)",secondaryDark:"rgb(20,20,20)",secondaryLight:"rgb(220,220,220)",navbar:"rgb(20,20,20)",disabled:"rgb(100,100,100)",mobile:"576px"},d=e(7),j=e(21),g=e(6),h="SET_SONG",p="SET_PLAYLIST",y="CLEAR_SONG",O="CLEAR_PLAYLIST",m="SET_TOAST",x="CLEAR_TOAST",v="SET_SHUFFLE",S="SET_PLAYLIST_IDX";function k(n){return{type:S,idx:n}}function w(n){return{type:m,toast:n}}function C(){return{type:x}}function E(n){return{type:v,shuffle:n}}var L=e(3);var T=function(n){var t=c.a.useState(""),e=Object(j.a)(t,2),r=e[0],o=e[1],i=Object(g.b)();return Object(L.jsxs)("form",{onSubmit:function(t){if(t.preventDefault(),w({msg:"Adding song in background...",type:"regular"}),"spotify"===n.type||"youtube"===n.type){var e={url:r},o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};fetch("http://localhost:3000/songs?source="+n.type,o).then((function(n){return n.json()})).then((function(n){console.log(n),n.Error?i(w({msg:n.Error,type:"error"})):i(w({msg:"Successfully added song.",type:"success"}))})).catch((function(n){console.log(n),i(w({msg:"Unknown error adding song. Please try again.",type:"error"}))}))}else console.log("Song URL type not specified")},children:[Object(L.jsx)("input",{value:r,onChange:function(n){return o(n.target.value)}}),Object(L.jsx)("button",{children:n.type})]})};var A=function(){return new Promise((function(n,t){fetch(b.server+"/songs").then((function(n){return n.json()})).then((function(t){!function(n){for(var t,e=n.length;0!==e;){t=Math.floor(Math.random()*e),e--;var r=[n[t],n[e]];n[e]=r[0],n[t]=r[1]}}(t),n(t)})).catch((function(n){t(n)}))}))};function _(n){return n.song}function P(n){return n.playlist}function R(n){return n.toast}function z(n){return n.shuffle}var I=function(){var n=Object(g.b)();return Object(L.jsx)("button",{onClick:function(){n(E("loading")),n({type:O}),n({type:y}),A().then((function(t){var e={type:p,playlist:t};n(e),n(k(0))})).catch((function(t){console.log(t),n(w({type:"error",msg:"Error shuffling playlist. Please try again."}))}))},disabled:"loading"===Object(g.c)(z).shuffle,children:"aa"})};var U=function(){return Object(L.jsxs)("div",{className:"App",children:[Object(L.jsx)(T,{type:"youtube"}),Object(L.jsx)(T,{type:"spotify"}),Object(L.jsx)(I,{})]})};var B=function(){return Object(L.jsx)("div",{children:"Err"})},D=e(46);e(58);var N,F=function(){var n=Object(g.b)(),t=Object(g.c)(_).mp3,e=Object(g.c)(P).playlist,r=Object(g.c)(P).idx,i=c.a.useState(null),a=Object(j.a)(i,2),s=a[0],l=a[1];return Object(o.useEffect)((function(){null!==t&&fetch(b.server+"/mp3/"+t).then((function(n){return n.body})).then((function(n){var t=n.getReader();return new ReadableStream({start:function(n){return function e(){return t.read().then((function(t){var r=t.done,o=t.value;if(!r)return n.enqueue(o),e();n.close()}))}()}})})).then((function(n){return new Response(n)})).then((function(n){return n.blob()})).then((function(n){return URL.createObjectURL(n)})).then((function(n){return l(n)})).catch((function(t){console.log(t),n(w({type:"error",msg:"Error loading audio. Please try again."}))}))}),[t,n]),Object(o.useEffect)((function(){var t;e&&-1!==r&&n((t=e[r],{type:h,song:t}))}),[r,e,n]),Object(L.jsx)(D.a,{src:s,showFilledVolume:!0,showSkipControls:!0,onCanPlayThrough:function(){return n(E("ready"))},onClickNext:function(){-1!==r&&(r+1===e.length||n(k(r+1)))},onClickPrevious:function(){-1!==r&&(0===r||n(k(r-1)))}})},H=l.c.div(N||(N=Object(s.a)(["\n    width : 100%;\n    height : 10%;\n    position : fixed;\n    bottom : 0;\n    right : 0;\n    background-color:black;\n"])));var J,M,Y,G=function(){var n=Object(g.c)(_);return Object(L.jsxs)(H,{children:[n.artist,Object(L.jsx)(F,{})]})},q=e(64),V=Object(l.c)(q.a)(J||(J=Object(s.a)(["\n    background-color:rgb(30,30,30);\n    opacity:0.9 !important;\n    color:rgb(220,220,220) !important;\n    position: fixed;\n    top:1rem;\n    right:0;\n    left:0;\n    margin: auto;\n    z-index: 7000;\n    color:black;\n    font-size:18px;\n"]))),X=Object(l.c)(q.a)(M||(M=Object(s.a)(["\n    background-color:rgb(30,30,220);\n    opacity:0.9 !important;\n    color:rgb(220,220,220) !important;\n    position: fixed;\n    top:1rem;\n    right:0;\n    left:0;\n    margin: auto;\n    z-index: 7000;\n    color:black;\n    font-size:18px;\n"]))),K=Object(l.c)(q.a)(Y||(Y=Object(s.a)(["\n    background-color:rgb(220,30,30);\n    opacity:0.9 !important;\n    color:rgb(220,220,220) !important;\n    position: fixed;\n    top:1rem;\n    right:0;\n    left:0;\n    margin: auto;\n    z-index: 7000;\n    color:black;\n    font-size:18px;\n"])));function Q(n){return Object(L.jsx)(X,{onClose:n.onClose,show:n.show,delay:2e3,autohide:!0,children:Object(L.jsx)(q.a.Body,{children:n.message})})}function W(n){return Object(L.jsx)(K,{onClose:n.onClose,show:n.show,delay:2e3,autohide:!0,children:Object(L.jsx)(q.a.Body,{children:n.message})})}function Z(n){return Object(L.jsx)(V,{onClose:n.onClose,show:n.show,delay:2e3,autohide:!0,children:Object(L.jsx)(q.a.Body,{children:n.message})})}var $=function(){var n=Object(g.b)();return Object(L.jsxs)(l.a,{theme:f,children:[Object(L.jsx)(u,{}),Object(L.jsx)(W,{onClose:function(){return n(C())},show:"error"===Object(g.c)(R).type,message:Object(g.c)(R).msg}),Object(L.jsx)(Q,{onClose:function(){return n(C())},show:"success"===Object(g.c)(R).type,message:Object(g.c)(R).msg}),Object(L.jsx)(Z,{onClose:function(){return n(C())},show:"regular"===Object(g.c)(R).type,message:Object(g.c)(R).msg}),Object(L.jsxs)(d.d,{children:[Object(L.jsx)(d.b,{exact:!0,path:"/home",children:Object(L.jsx)(U,{})}),Object(L.jsx)(d.b,{exact:!0,path:"/",children:Object(L.jsx)(d.a,{to:"/home"})}),Object(L.jsx)(d.b,{exact:!0,path:"/error",children:Object(L.jsx)(B,{})}),Object(L.jsx)(d.b,{children:Object(L.jsx)(d.a,{to:"/error"})})]}),Object(L.jsx)(G,{})]})},nn=e(22),tn=e(20),en={album:null,artist:null,artists:null,title:null,year:null,pic:null,mp3:null,nosong:!0},rn={playlist:null,noplaylist:!0,idx:-1},on={type:"none",msg:""};var cn=Object(nn.a)({song:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:en,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return{album:t.song.album,artist:t.song.artist,artists:t.song.artists,title:t.song.title,year:t.song.year,pic:t.song.picid,mp3:t.song.songid,nosong:!1};case y:return en;default:return n}},playlist:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:rn,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return Object(tn.a)(Object(tn.a)({},n),{},{playlist:t.playlist,noplaylist:!1});case O:return rn;case S:return Object(tn.a)(Object(tn.a)({},n),{},{idx:t.idx});default:return n}},toast:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:on,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case m:return{msg:t.toast.msg,type:t.toast.type};case x:return on;default:return n}},shuffle:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{shuffle:"ready"},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return{shuffle:t.shuffle};default:return n}}}),an=Object(nn.b)(cn),sn=e(25);a.a.render(Object(L.jsx)(g.a,{store:an,children:Object(L.jsx)(sn.a,{children:Object(L.jsx)($,{})})}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.4303e2ee.chunk.js.map