webpackJsonp([6],{32:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(3),a=n(36),r=n(51),i=n(53),u=n.n(i),l=n(54),s=n(56),c=(n.n(s),n(57));o.a.use(u.a),o.a.use(l.a),o.a.config.productionTip=!1,new o.a({el:"#app",router:r.a,store:c.a,components:{App:a.a},template:"<App/>"})},36:function(t,e,n){"use strict";function o(t){n(37)}var a=n(9),r=n(50),i=n(13),u=o,l=i(a.a,r.a,!1,u,null,null);e.a=l.exports},37:function(t,e){},50:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[t.authState?n("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:"","enable-resize-watcher":"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,function(e,o){return n("v-list-tile",{key:o,attrs:{value:"true",to:e.route}},[n("v-list-tile-action",[n("v-icon",{domProps:{innerHTML:t._s(e.icon)}})],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],1):t._e(),t._v(" "),n("v-toolbar",{attrs:{app:"","clipped-left":""}},[t.authState?n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}):t._e(),t._v(" "),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}}),t._v(" "),n("v-spacer"),t._v(" "),t.authState?t._e():n("v-btn",{attrs:{flat:"",to:"/login"}},[n("v-icon",[t._v("person")]),t._v("\n      Login\n    ")],1),t._v(" "),t.authState?n("v-menu",{attrs:{"open-on-hover":"",bottom:"","offset-y":""}},[n("v-btn",{attrs:{slot:"activator",flat:""},slot:"activator"},[n("v-icon",[t._v("person")]),t._v("\n        "+t._s(t.user)+"\n    ")],1),t._v(" "),n("v-list",[n("v-list-tile",{on:{click:t.logout}},[n("v-list-tile-title",[t._v("Logout")])],1)],1)],1):t._e()],1),t._v(" "),n("v-content",[n("v-slide-y-transition",{attrs:{mode:"out-in"}},[n("router-view")],1)],1),t._v(" "),n("v-footer",{attrs:{fixed:t.fixed,app:""}},[n("span",[t._v("© 2017")])])],1)},a=[],r={render:o,staticRenderFns:a};e.a=r},51:function(t,e,n){"use strict";var o=n(3),a=n(52),r=function(t){return n.e(2).then(n.bind(null,62))},i=function(t){return n.e(4).then(n.bind(null,63))},u=function(t){return n.e(3).then(n.bind(null,64))},l=function(t){return n.e(0).then(n.bind(null,65))},s=function(t){return n.e(1).then(n.bind(null,66))};o.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"HelloWorld",component:r},{path:"/login",name:"Login",component:i},{path:"/register",name:"Register",component:u},{path:"/dashboard",name:"Dashboard",component:l,beforeEnter:function(t,e,n){localStorage.getItem("budget")?n():n("/")}},{path:"/set-budget",name:"SetBudget",component:s,beforeEnter:function(t,e,n){localStorage.getItem("budget")?n():n("/")}}]})},55:function(t,e){},56:function(t,e){},57:function(t,e,n){"use strict";var o=n(58),a=n.n(o),r=n(3),i=n(12);r.a.use(i.a);var u=new i.a.Store({state:{loggedIn:!!localStorage.getItem("budget"),authToken:localStorage.getItem("budget")?JSON.parse(localStorage.getItem("budget")).token:null,userName:localStorage.getItem("budget")?JSON.parse(localStorage.getItem("budget")).user.name:""},getters:{authState:function(t){return t.loggedIn},user:function(t){return t.userName}},mutations:{login:function(t,e){t.loggedIn=!0,t.authToken=e.token,t.userName=e.user.name},logout:function(t){t.loggedIn=!1,t.authToken=null,t.userName=""}},actions:{login:function(t,e){var n=t.commit;localStorage.setItem("budget",a()(e)),n("login",e)},logout:function(t){var e=t.commit;localStorage.removeItem("budget"),e("logout")}}});e.a=u},9:function(t,e,n){"use strict";var o=n(22),a=n.n(o),r=n(12);e.a={data:function(){return{clipped:!0,drawer:!0,fixed:!1,items:[{icon:"bubble_chart",title:"Inspire",route:"/"},{icon:"bubble_chart",title:"Dashboard",route:"/dashboard"},{icon:"bubble_chart",title:"Set Monthly Budget",route:"/set-budget"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Expense Tracker",name:"App"}},computed:a()({},Object(r.b)(["authState","user"])),methods:{logout:function(){var t=this;this.$http.post("/api/auth/logout",{},{headers:{Authorization:this.$store.state.authToken}}).then(function(e){201===e.status&&t.$store.dispatch("logout").then(function(e){t.$router.push({path:"/"})})})}}}}},[32]);
//# sourceMappingURL=app.891170faf676b7d55d8a.js.map