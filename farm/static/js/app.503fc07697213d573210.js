webpackJsonp([0],{"+skl":function(t,e){},"17r6":function(t,e,n){"use strict";e.a={props:{value:{type:Number,default:0}}}},"2T0j":function(t,e,n){"use strict";var a=n("NYxO");e.a={computed:n.i(a.a)(["user"])}},"3Frp":function(t,e,n){"use strict";var a=n("NYxO");e.a={methods:{onPlantChange:function(t){this.$store.commit("changePlant",t)}},computed:n.i(a.a)(["plants","currPlant"]),filters:{seasonCName:function(t){return{spring:"春天",summer:"夏天",autumn:"秋天",winter:"冬天"}[t]}}}},"5x93":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],r={render:a,staticRenderFns:s};e.a=r},"7f+C":function(t,e){},"DHG/":function(t,e,n){"use strict";e.a={name:"Icon",props:{type:String,size:Number}}},DNTO:function(t,e,n){"use strict";var a=n("VOfj"),s=n("Z25c"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},EPhx:function(t,e,n){"use strict";var a=n("YjZ3"),s=n("ekDK"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},FcRw:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"bg",class:t.season})},s=[],r={render:a,staticRenderFns:s};e.a=r},G5KD:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#"+t.type}})])},s=[],r={render:a,staticRenderFns:s};e.a=r},IcnI:function(t,e,n){"use strict";var a=n("7+uW"),s=n("NYxO");a.default.use(s.b),e.a=new s.b.Store({state:{season:"spring",user:{name:"view",money:1e4},pots:[{type:"normal"},{type:"normal"},{type:"normal"},{type:"normal"},{type:"normal"}],plants:[{name:"小麦",speed:1e3,cost:1,profit:2,grows:"summer",image:"xiaomai.png"},{name:"萝卜",speed:1e3,cost:3,profit:5,grows:"autumn",image:"luobo.png"},{name:"西红柿",speed:1e3,cost:10,profit:20,grows:"spring",image:"xihongshi.png"},{name:"白菜",speed:1e3,cost:5,profit:10,grows:"winter",image:"baicai.png"},{name:"土豆",speed:1e3,cost:5,profit:10,grows:"autumn",image:"tudou.png"}],currPlant:{}},mutations:{setUserName:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"view";t.user.name=e},changePlant:function(t,e){t.plants.forEach(function(n){n.name===e&&(t.currPlant=n)})},setPlant:function(t,e){e.plant=t.currPlant,t.user.money-=e.plant.cost},clearPlant:function(t,e){t.user.money+=e.plant.profit,delete e.plant},nextSeason:function(t){var e=["spring","summer","autumn","winter"],n=e.indexOf(t.season);n++,4===n&&(n=0),t.season=e[n]}},getters:{seasonCName:function(t,e){return{spring:"春天",summer:"夏天",autumn:"秋天",winter:"冬天"}[t.season]}}})},JW3B:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"plant-picker"},[n("div",{staticClass:"nav"},t._l(t.plants,function(e){return n("Poptip",{key:e.name,attrs:{trigger:"hover"}},[n("div",{staticClass:"item",class:{active:t.currPlant.name===e.name},on:{click:function(n){t.onPlantChange(e.name)}}},[n("PlantImage",{attrs:{src:e.image}}),t._v(" "),n("p",[t._v(t._s(e.name))])],1),t._v(" "),n("div",{staticClass:"info",slot:"content"},[n("p",[t._v("植物："+t._s(e.name))]),t._v(" "),n("p",[t._v("成本："+t._s(e.cost))]),t._v(" "),n("p",[t._v("收益："+t._s(e.profit))]),t._v(" "),n("p",[t._v("季节："+t._s(t._f("seasonCName")(e.grows)))])])])}))])},s=[],r={render:a,staticRenderFns:s};e.a=r},M93x:function(t,e,n){"use strict";function a(t){n("7f+C")}var s=n("h8+N"),r=n("5x93"),i=n("J0+h"),o=a,u=i(s.a,r.a,o,null,null);e.a=u.exports},MK9U:function(t,e,n){"use strict";var a=n("bRpW"),s=n("FcRw"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},NGXG:function(t,e,n){"use strict";e.a={name:"PlantImage",props:{src:String}}},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),s=n("M93x"),r=n("YaEn"),i=n("IcnI"),o=n("BTaQ"),u=n.n(o),c=n("ripP"),l=n("kiDY"),p=n("+skl");n.n(p);a.default.use(u.a),a.default.config.productionTip=!1,a.default.component(c.a.name,c.a),a.default.component(l.a.name,l.a),new a.default({el:"#app",store:i.a,router:r.a,template:"<App/>",components:{App:s.a}})},UGvz:function(t,e,n){"use strict";var a=n("2T0j"),s=n("WW8W"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},VOfj:function(t,e,n){"use strict";var a=n("NYxO"),s=n("EPhx");e.a={data:function(){return{}},components:{Plantpot:s.a},methods:{},computed:n.i(a.a)(["user","pots"])}},WW8W:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"user"},[t._v("\n    "+t._s(t.user.name)+": "+t._s(t.user.money)+"\n")])},s=[],r={render:a,staticRenderFns:s};e.a=r},"WeX+":function(t,e,n){"use strict";var a=n("jub/"),s=n("oP13"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},YaEn:function(t,e,n){"use strict";var a=n("7+uW"),s=n("/ocq"),r=n("a4Qx");a.default.use(s.a),e.a=new s.a({routes:[{path:"/",name:"Scene",component:r.a}]})},YjZ3:function(t,e,n){"use strict";var a=n("wd1N");e.a={components:{ProgressBar:a.a},props:{pot:Object},data:function(){return{inGrowUp:!1,value:0}},methods:{onPlantpotMouseDown:function(){var t=this;if(console.log(1),!(this.pot.plant||(this.$store.commit("setPlant",this.pot),this.inGrowUp&&this.timer||this.value>=100))){var e=this.pot.plant;this.inGrowUp=!0,this.value,this.timer=setInterval(function(){++t.value>=100&&(clearInterval(t.timer),t.inGrowUp=!1,t.popMoney(e.profit),t.$store.commit("clearPlant",t.pot),t.value=0,t.$emit("done"))},e.speed/99)}},popMoney:function(t){var e=document.createElement("div");e.classList.add("pop-money"),e.innerHTML="￥"+t,this.$refs.paper.appendChild(e),setTimeout(function(){e.remove()},500)}}}},Z25c:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"garden"},t._l(t.pots,function(t,e){return n("Plantpot",{key:e,attrs:{pot:t}})}))},s=[],r={render:a,staticRenderFns:s};e.a=r},a4Qx:function(t,e,n){"use strict";var a=n("qwMe"),s=n("eJ5l"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},bRpW:function(t,e,n){"use strict";var a=n("NYxO");e.a={computed:n.i(a.a)(["season"])}},"cr/F":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"progress"},[n("div",{staticClass:"content",style:"width:"+t.value+"%"})])},s=[],r={render:a,staticRenderFns:s};e.a=r},eJ5l:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Bg"),t._v(" "),n("Season"),t._v(" "),n("PlantPicker"),t._v(" "),n("Garden"),t._v(" "),n("User")],1)},s=[],r={render:a,staticRenderFns:s};e.a=r},eJ8j:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("img",{staticClass:"plant",attrs:{src:"/static/images/"+t.src,alt:""}})},s=[],r={render:a,staticRenderFns:s};e.a=r},ekDK:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"paper",staticClass:"plantpot",on:{mousemove:t.onPlantpotMouseDown}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.value>0,expression:"value > 0"}]},[n("ProgressBar",{attrs:{value:t.value}}),t._v(" "),t.pot.plant?n("PlantImage",{attrs:{src:t.pot.plant.image}}):t._e()],1)])},s=[],r={render:a,staticRenderFns:s};e.a=r},"h8+N":function(t,e,n){"use strict";e.a={name:"app"}},"jub/":function(t,e,n){"use strict";var a=n("NYxO");e.a={methods:{addSnow:function(){var t=document.body.clientWidth,e=document.createElement("img"),n=this.getRandom(10,40)+"px";e.classList.add("snow"),e.style.width=n,e.style.height=n,e.style.left=this.getRandom(0,t)+"px",e.setAttribute("src","/static/images/xuehua"+this.getRandom(1,3)+".png"),this.$refs.season.appendChild(e),setTimeout(function(){return e.remove()},5e3)},addRain:function(){var t=document.body.clientWidth,e=document.createElement("div");e.classList.add("rain"),e.style.width=this.getRandom(1,2)+"px",e.style.height=this.getRandom(30,50)+"px",e.style.left=this.getRandom(0,t)+"px",this.$refs.season.appendChild(e),setTimeout(function(){return e.remove()},1e3)},getRandom:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;return Math.floor(Math.random()*(e-t+1))+t}},computed:n.i(a.a)(["season"]),watch:{season:function(t){this.seasonTimer&&clearInterval(this.seasonTimer),"summer"===t?this.seasonTimer=setInterval(this.addRain,20):"winter"===t&&(this.seasonTimer=setInterval(this.addSnow,200))}}}},kiDY:function(t,e,n){"use strict";var a=n("NGXG"),s=n("eJ8j"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},oP13:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"season",staticClass:"season"})},s=[],r={render:a,staticRenderFns:s};e.a=r},otKM:function(t,e,n){"use strict";var a=n("3Frp"),s=n("JW3B"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},qwMe:function(t,e,n){"use strict";var a=n("WeX+"),s=n("MK9U"),r=n("DNTO"),i=n("otKM"),o=n("UGvz");e.a={components:{Season:a.a,Garden:r.a,Bg:s.a,PlantPicker:i.a,User:o.a},mounted:function(){this.init()},methods:{init:function(){this.$store.commit("changePlant","小麦"),this.loopSeason()},loopSeason:function(){var t=this;this.seasonTimer=setInterval(function(){t.$store.commit("nextSeason"),t.$Notice.info({title:t.$store.getters.seasonCName+"开始了！",desc:""})},12e4)}}}},ripP:function(t,e,n){"use strict";var a=n("DHG/"),s=n("G5KD"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports},wd1N:function(t,e,n){"use strict";var a=n("17r6"),s=n("cr/F"),r=n("J0+h"),i=r(a.a,s.a,null,null,null);e.a=i.exports}},["NHnr"]);
//# sourceMappingURL=app.503fc07697213d573210.js.map