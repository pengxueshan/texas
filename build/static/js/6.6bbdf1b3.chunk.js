(this.webpackJsonptexas=this.webpackJsonptexas||[]).push([[6],{396:function(e,t,a){},617:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a(20),o=a(46),i=a(29),s=a(0),l=a.n(s),c=a(35),u=a(612),d=a(614),p=a(616);a(396);function m(e){var t=e.list,a=e.winTimes,n=[{title:"\u6392\u540d",key:"rank",render:function(e,t,a){return a+1}},{title:"\u9009\u624b",key:"username",render:function(e,t){var a=t.player,n=a.avatar,r=a.name;return l.a.createElement("div",{className:"player-wrap"},l.a.createElement("div",{className:"avatar-wrap"},n?l.a.createElement(u.a,{size:24,src:n}):l.a.createElement(u.a,{size:24,icon:l.a.createElement(p.a,null)})),r)}},{title:"\u53c2\u8d5b\u6b21\u6570",key:"playNum",dataIndex:"playNum"},{title:"\u5355\u6b21\u6700\u5927\u76c8\u5229",key:"max",dataIndex:"max",sorter:function(e,t){return e.max-t.max}},{title:"\u5355\u6b21\u6700\u5927\u4e8f\u635f",key:"min",dataIndex:"min",sorter:function(e,t){return e.min-t.min}},{title:"\u7d2f\u8ba1\u7b79\u7801\u76c8\u4e8f",key:"total",dataIndex:"total",sorter:function(e,t){return e.total-t.total}},{title:"\u7d2f\u8ba1\u76c8\u4e8f\u91d1\u989d",key:"totalBalance",dataIndex:"totalBalance",sorter:function(e,t){return e.totalBalance-t.totalBalance}},{title:"\u80dc\u7387",key:"winRate",render:function(e,t){var n=t.player,r=t.playNum;return function(e,t){return a[e]&&t?(a[e]/t).toFixed(2):0}(n.id,r)}},{title:"\u5f53\u524d\u8d54\u7387",key:"currentLeverage",dataIndex:"currentLeverage"},{title:"\u64cd\u4f5c",key:"opt",dataIndex:"opt"}];return l.a.createElement("div",{className:"rank-wrap"},l.a.createElement(d.a,{dataSource:t,columns:n,pagination:!1}))}var h=a(17),f=a(277),y=a(615),v=a(618),k=a(275),g=a(353),O=a.n(g),b=a(73),w=a(33),C=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={list:[{roundNO:e.props.roundIndex||e.props.rounds.length+1}],dateTime:"",leverage:.1,userAmount:{}},e.handleOk=function(){if(e.props.isModify&&void 0!==e.props.roundIndex){var t={id:e.props.roundDetails[e.props.roundIndex].id,date:e.state.dateTime,leverage:e.state.leverage,players:Object.keys(e.state.userAmount).map((function(t){return{amount:e.state.userAmount[t],playerId:t}}))};Object(b.e)(t).then((function(){e.props.onOk&&e.props.onOk()})).catch((function(e){f.a.error(e.message)}))}else{var a=Object.keys(e.state.userAmount).map((function(t){return{id:t,amount:e.state.userAmount[t]}})),n={date:e.state.dateTime,leverage:e.state.leverage,playerInfo:a};Object(b.a)(n).then((function(){e.props.onOk&&e.props.onOk()})).catch((function(e){f.a.error(e.message)}))}},e.handleCancel=function(){e.setState({list:[{roundNO:e.props.rounds.length+1}],dateTime:"",leverage:.1,userAmount:{}}),e.props.onCancel()},e}return Object(r.a)(a,[{key:"componentDidUpdate",value:function(e){if((e.isModify!==this.props.isModify||e.roundIndex!==this.props.roundIndex)&&this.props.isModify&&void 0!==this.props.roundIndex){var t=this.props.roundDetails[this.props.roundIndex],a={};t.players.forEach((function(e){a[e.playerId]=e.amount})),this.setState({userAmount:a,list:[{roundNO:this.props.roundIndex+1}],leverage:t.leverage,dateTime:t.date})}}},{key:"handleDateTimeChange",value:function(e){e?this.setState({dateTime:e.format("YYYY/MM/DD")}):this.setState({dateTime:""})}},{key:"handleLeverageChange",value:function(e){this.setState({leverage:e||.1})}},{key:"handleAmountChange",value:function(e,t){e=e?+e:0;var a=Object(h.a)({},this.state.userAmount);a[t.id]=e,this.setState({userAmount:a})}},{key:"getTableColumns",value:function(){var e=this;return[{title:"\u573a\u6b21",key:"roundNO",dataIndex:"roundNO",ellipsis:!0},{title:"\u65e5\u671f",key:"dateTime",ellipsis:!0,render:function(){return l.a.createElement("div",{style:{width:"150px"}},l.a.createElement(y.a,{onChange:e.handleDateTimeChange,format:"YYYY/MM/DD",value:e.state.dateTime&&O()(e.state.dateTime,"YYYY/MM/DD")||void 0}))}},{title:"\u6760\u6746\u6bd4\u4f8b",key:"leverage",ellipsis:!0,render:function(){return l.a.createElement(v.a,{onChange:e.handleLeverageChange,value:e.state.leverage})}}].concat(this.props.players.map((function(t){return{title:t.name,key:"".concat(t.id),ellipsis:!0,render:function(){return l.a.createElement(v.a,{onChange:function(a){return e.handleAmountChange(a,t)},value:e.state.userAmount[t.id]})}}})))}},{key:"render",value:function(){return l.a.createElement(k.a,{visible:this.props.visible,onCancel:this.handleCancel,onOk:this.handleOk,width:1200},l.a.createElement("div",{className:"add-round-wrap"},l.a.createElement(d.a,{dataSource:this.state.list,columns:this.getTableColumns(),pagination:!1,scroll:{x:!0}})))}}]),a}(s.Component),M=Object(w.b)((function(e){return{rounds:e.rounds,roundDetails:e.roundDetails,players:e.players}}))(C),x=a(4),E=a.n(x),j=a(9),A=a(8),D=a(140),I=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).getRoundDetails=Object(j.a)(E.a.mark((function t(){var a;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(b.c)();case 2:a=t.sent,e.props.setRoundDetails(a),e.props.setWinTimes(Object(D.a)(a));case 5:case"end":return t.stop()}}),t)}))),e}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.getRoundDetails()}},{key:"getTableColumns",value:function(){var e=this,t=[{title:"\u573a\u6b21",key:"roundNO",ellipsis:!0,render:function(e,t,a){return a+1}},{title:"\u65e5\u671f",key:"dateTime",ellipsis:!0,render:function(e,t){return t.date}},{title:"\u6760\u6746\u6bd4\u4f8b",key:"leverage",ellipsis:!0,render:function(e,t){return t.leverage}}],a=this.props.players;return t=(t=t.concat(a.map((function(t){return{title:t.name,key:t.id,ellipsis:!0,render:function(a,n,r){return e.getRoundInfo(t.id,r)}}})))).concat({title:"\u64cd\u4f5c",key:"opt",render:function(t,a,n){return l.a.createElement("div",{className:"details-opt"},l.a.createElement("span",{onClick:function(){return e.handleModifyClick(n)}},"\u4fee\u6539"))}})}},{key:"handleModifyClick",value:function(e){this.props.onModify(e)}},{key:"getRoundInfo",value:function(e,t){var a=this.props.roundDetails[t].players.find((function(t){return t.playerId===e}));return a&&a.amount||""}},{key:"render",value:function(){return l.a.createElement(k.a,{visible:this.props.visible,onCancel:this.props.onCancel,onOk:this.props.onOk,width:1200},l.a.createElement("div",{className:"details-round-wrap"},l.a.createElement(d.a,{dataSource:this.props.roundDetails,columns:this.getTableColumns(),pagination:!1,scroll:{x:!0}})))}}]),a}(s.Component),N={setRoundDetails:A.d,setWinTimes:A.g},T=Object(w.b)((function(e){return{roundDetails:e.roundDetails,players:e.players}}),N)(I),S=a(276),Y=a(131),L=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={confirmLoading:!1,playerName:""},e.getPlayers=Object(j.a)(E.a.mark((function t(){var a;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(Y.b)();case 2:a=t.sent,e.props.setPlayers(a);case 4:case"end":return t.stop()}}),t)}))),e.handleOk=function(){if(!e.state.playerName)return f.a.error("\u8bf7\u8f93\u5165\u59d3\u540d");e.setState({confirmLoading:!0}),Object(Y.a)({name:e.state.playerName}).then((function(){e.setState({confirmLoading:!1}),e.getPlayers(),e.props.onOk&&e.props.onOk()})).catch((function(t){e.setState({confirmLoading:!1}),t&&f.a.error(t.message)}))},e.handleCancel=function(){e.props.onCancel&&e.props.onCancel()},e.handleNameChange=function(t){e.setState({playerName:t.target.value})},e}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement(k.a,{title:"\u6dfb\u52a0\u9009\u624b",visible:this.props.visible,onOk:this.handleOk,onCancel:this.handleCancel,confirmLoading:this.state.confirmLoading},l.a.createElement("div",{className:"session"},l.a.createElement("div",{className:"form-row"},l.a.createElement(S.a,{placeholder:"\u59d3\u540d",value:this.state.playerName,onChange:this.handleNameChange}))))}}]),a}(s.Component),P={setPlayers:A.c},R=Object(w.b)((function(){return{}}),P)(L),B=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={showAddModal:!1,isModify:!1,showDetailsModal:!1,showAddPlayerModal:!1,modifyIndex:-1},e}return Object(r.a)(a,[{key:"renderButtons",value:function(){var e=this;return this.props.isAuthenticated?l.a.createElement("div",{className:"btn-wrap"},l.a.createElement(c.a,{type:"primary",onClick:function(){e.setState({showAddPlayerModal:!0})}},"\u6dfb\u52a0\u9009\u624b"),l.a.createElement(c.a,{type:"primary",onClick:function(){e.setState({isModify:!1,showDetailsModal:!0})}},"\u660e\u7ec6"),l.a.createElement(c.a,{type:"primary",onClick:function(){e.setState({showAddModal:!0})}},"\u589e\u52a0\u8bb0\u5f55")):void 0}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"page home"},l.a.createElement(m,{list:this.props.list,winTimes:this.props.winTimes}),this.renderButtons(),l.a.createElement(M,{visible:this.state.showAddModal,onOk:function(){e.setState({showAddModal:!1}),e.props.onAddDone()},onCancel:function(){e.setState({showAddModal:!1})},isModify:this.state.isModify,roundIndex:this.state.modifyIndex}),l.a.createElement(T,{visible:this.state.showDetailsModal,onOk:function(){e.setState({showDetailsModal:!1})},onCancel:function(){e.setState({showDetailsModal:!1})},onModify:function(t){e.setState({modifyIndex:t,isModify:!0,showDetailsModal:!1,showAddModal:!0})}}),l.a.createElement(R,{visible:this.state.showAddPlayerModal,onOk:function(){e.setState({showAddPlayerModal:!1})},onCancel:function(){e.setState({showAddPlayerModal:!1})}}))}}]),a}(s.Component);t.default=Object(w.b)((function(e){return{winTimes:e.winTimes,isAuthenticated:e.isAuthenticated}}))(B)}}]);
//# sourceMappingURL=6.6bbdf1b3.chunk.js.map