(this.webpackJsonptexas=this.webpackJsonptexas||[]).push([[0],{131:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return l}));var a=n(4),r=n.n(a),s=n(17),c=n(9),o=n(26);function u(){return i.apply(this,arguments)}function i(){return(i=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/players",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return d.apply(this,arguments)}function d(){return(d=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/addPlayer",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},140:function(e,t,n){"use strict";function a(e){var t={};return e.forEach((function(e){e.players.forEach((function(e){e.amount>0&&(void 0===t[e.playerId]&&(t[e.playerId]=0),t[e.playerId]+=1)}))})),t}n.d(t,"a",(function(){return a}))},164:function(e,t,n){e.exports=n(273)},169:function(e,t,n){},171:function(e,t,n){},248:function(e,t,n){},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(4),r=n.n(a),s=n(17),c=n(9),o=n(154),u=n.n(o);function i(e){return l.apply(this,arguments)}function l(){return(l=Object(c.a)(r.a.mark((function e(t){var n,a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u()(Object(s.a)({baseURL:"/api"},t));case 2:if(n=e.sent,a=n.status,c=n.data,200!==a){e.next=6;break}return e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},266:function(e,t,n){},273:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(3),c=n.n(s),o=(n(169),n(4)),u=n.n(o),i=n(9),l=n(14),d=n(20),p=n(46),h=n(29),f=n(277),v=n(275),E=n(276),S=(n(171),n(33)),b=n(8),m=["hexiuling"],y=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={name:"",password:""},e.handleOk=function(){var t=e.state,n=t.name,a=t.password;return n?a?m.includes(n)&&"black sheep on the wall"===a?(e.props.setIsAuthenticated(!0),void e.props.setShowSession(!1)):f.a.error("\u5b50\u975e\u9c7c\u7109\u77e5\u9c7c\u4e4b\u4e50"):f.a.error("\u8bf7\u8f93\u5165\u6697\u53f7"):f.a.error("\u8bf7\u8f93\u5165\u58ee\u58eb\u59d3\u540d")},e.handleCancel=function(){e.props.setShowSession(!1)},e.handleNameChange=function(t){e.setState({name:t.target.value})},e.handlePasswordChange=function(t){e.setState({password:t.target.value})},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props.visible,t=this.state,n=t.name,a=t.password;return r.a.createElement(v.a,{title:"\u767b\u5f55",visible:e,onOk:this.handleOk,onCancel:this.handleCancel},r.a.createElement("div",{className:"session"},r.a.createElement("div",{className:"form-row"},r.a.createElement(E.a,{placeholder:"\u6562\u95ee\u58ee\u58eb\u59d3\u540d",value:n,onChange:this.handleNameChange})),r.a.createElement("div",{className:"form-row"},r.a.createElement(E.a,{placeholder:"\u8bf7\u5bf9\u6697\u53f7",value:a,onChange:this.handlePasswordChange}))))}}]),n}(a.Component),O={setShowSession:b.f,setIsAuthenticated:b.a},w=Object(S.b)((function(e){return{visible:e.showSession}}),O)(y),T=n(76),g=(n(248),function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).handleSigninClick=function(){e.props.setShowSession(!0)},e}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props.isAuthenticated;return r.a.createElement("div",{className:"top-bar"},r.a.createElement("nav",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(T.b,{to:"/"},"\u6392\u884c\u699c")))),r.a.createElement("div",{className:"user-section"},e?r.a.createElement("span",null,"\u829d\u9ebb\u5f00\u95e8\u4e86"):r.a.createElement("span",{className:"link-style",onClick:this.handleSigninClick},"\u767b\u5f55"),r.a.createElement(w,null)))}}]),n}(a.Component)),_={setShowSession:b.f},j=Object(S.b)((function(e){return{isAuthenticated:e.isAuthenticated}}),_)(g),I=n(6),k=n(274),N=n(131),R=n(73),A=n(140),x=(n(266),n(267),Object(a.lazy)((function(){return Promise.all([n.e(4),n.e(6)]).then(n.bind(null,617))}))),D=Object(a.lazy)((function(){return Promise.all([n.e(3),n.e(5)]).then(n.bind(null,614))})),C=function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={list:[]},e.getPlayers=Object(i.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(N.b)();case 2:n=t.sent,e.props.setPlayers(n);case 4:case"end":return t.stop()}}),t)}))),e.getRounds=Object(i.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(R.d)();case 2:n=t.sent,e.props.setRounds(n);case 4:case"end":return t.stop()}}),t)}))),e.getRoundDetails=Object(i.a)(u.a.mark((function t(){var n,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(R.c)();case 2:n=t.sent,e.props.setRoundDetails(n),a=Object(A.a)(n),e.props.setWinTimes(a);case 6:case"end":return t.stop()}}),t)}))),e.getRankList=function(){Object(R.b)().then((function(t){e.setState({list:t})}))},e.handleAddDone=function(){e.getRankList(),e.getRounds(),e.getRoundDetails()},e.handleResize=function(){document.documentElement.clientWidth<500?e.props.setIsMobile(!0):e.props.setIsMobile(!1)},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.getPlayers(),this.getRounds(),this.getRankList(),this.handleResize()}},{key:"render",value:function(){var e=this.state.list;return r.a.createElement("div",{className:"app"},r.a.createElement(T.a,null,r.a.createElement(j,null),r.a.createElement(a.Suspense,{fallback:r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},r.a.createElement(k.a,null))},r.a.createElement(I.c,null,r.a.createElement(I.a,{path:"/encrypt"},r.a.createElement(D,null)),r.a.createElement(I.a,{path:"/"},r.a.createElement(x,{list:e,onAddDone:this.handleAddDone}))))))}}]),n}(a.Component),L={setPlayers:b.c,setRounds:b.e,setRoundDetails:b.d,setWinTimes:b.g,setIsMobile:b.b},U=Object(S.b)((function(){return{}}),L)(C);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var M=n(157),P=n(10),W=n(54);var H=Object(W.b)({userInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_USER_INFO:return e=t.payload.userInfo;default:return e}},players:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_PLAYERS:return e=t.payload.players;default:return e}},rounds:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_ROUNDS:return e=t.payload.rounds;default:return e}},roundDetails:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_ROUND_DETAILS:return e=t.payload.roundDetails;default:return e}},showSession:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_SHOW_SESSION:return e=t.payload.showSession;default:return e}},isAuthenticated:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_IS_AUTHENTICATED:return e=t.payload.isAuthenticated;default:return e}},winTimes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_WIN_TIMES:return e=t.payload.winTimes;default:return e}},isMobile:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case b.h.SET_IS_MOBILE:return e=t.payload.isMobile;default:return e}}}),B=Object(W.c)(H);c.a.render(r.a.createElement(P.a,{locale:M.a},r.a.createElement(S.a,{store:B},r.a.createElement(U,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},73:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return f})),n.d(t,"e",(function(){return E}));var a=n(4),r=n.n(a),s=n(17),c=n(9),o=n(26);function u(){return i.apply(this,arguments)}function i(){return(i=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/addRound",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return d.apply(this,arguments)}function d(){return(d=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/rounds",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(){return h.apply(this,arguments)}function h(){return(h=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/ranklist",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function f(){return v.apply(this,arguments)}function v(){return(v=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/roundDetails",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){return S.apply(this,arguments)}function S(){return(S=Object(c.a)(r.a.mark((function e(){var t,n=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},e.next=3,Object(o.a)({url:"/updateRound",method:"post",data:Object(s.a)({},t)});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},8:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"e",(function(){return r})),n.d(t,"d",(function(){return s})),n.d(t,"g",(function(){return c})),n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return i})),n.d(t,"h",(function(){return l}));function a(e){return{type:"SET_PLAYERS",payload:{players:e}}}function r(e){return{type:"SET_ROUNDS",payload:{rounds:e}}}function s(e){return{type:"SET_ROUND_DETAILS",payload:{roundDetails:e}}}function c(e){return{type:"SET_WIN_TIMES",payload:{winTimes:e}}}function o(e){return{type:"SET_SHOW_SESSION",payload:{showSession:e}}}function u(e){return{type:"SET_IS_AUTHENTICATED",payload:{isAuthenticated:e}}}function i(e){return{type:"SET_IS_MOBILE",payload:{isMobile:e}}}var l={SET_USER_INFO:"SET_USER_INFO",SET_PLAYERS:"SET_PLAYERS",SET_ROUNDS:"SET_ROUNDS",SET_SHOW_SESSION:"SET_SHOW_SESSION",SET_IS_AUTHENTICATED:"SET_IS_AUTHENTICATED",SET_ROUND_DETAILS:"SET_ROUND_DETAILS",SET_WIN_TIMES:"SET_WIN_TIMES",SET_IS_MOBILE:"SET_IS_MOBILE"}}},[[164,1,2]]]);
//# sourceMappingURL=main.d0f47460.chunk.js.map