(function(t){function e(e){for(var a,i,o=e[0],s=e[1],u=e[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&d.push(n[i][0]),n[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);l&&l(e);while(d.length)d.shift()();return c.push.apply(c,u||[]),r()}function r(){for(var t,e=0;e<c.length;e++){for(var r=c[e],a=!0,o=1;o<r.length;o++){var s=r[o];0!==n[s]&&(a=!1)}a&&(c.splice(e--,1),t=i(i.s=r[0]))}return t}var a={},n={app:0},c=[];function i(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=a,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(r,a,function(e){return t[e]}.bind(null,a));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/initiative-tracker/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=s;c.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("cd49")},"0b17":function(t,e,r){"use strict";var a=r("5106"),n=r.n(a);n.a},"0ba5":function(t,e,r){},1:function(t,e){},2:function(t,e){},"2f6e":function(t,e,r){},3:function(t,e){},4:function(t,e){},5:function(t,e){},5106:function(t,e,r){},"5ac8":function(t,e,r){"use strict";var a=r("e075"),n=r.n(a);n.a},"5c0b":function(t,e,r){"use strict";var a=r("9c0c"),n=r.n(a);n.a},"5dbf":function(t,e,r){"use strict";var a=r("70bf"),n=r.n(a);n.a},6:function(t,e){},6861:function(t,e,r){},7:function(t,e){},"70bf":function(t,e,r){},8:function(t,e){},9:function(t,e){},"9c0c":function(t,e,r){},c1ab:function(t,e,r){"use strict";var a=r("2f6e"),n=r.n(a);n.a},cd49:function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},c=[],i=(r("5c0b"),r("2877")),o={},s=Object(i["a"])(o,n,c,!1,null,null,null),u=s.exports,l=r("8c4f"),h=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"grid grid-cols-1 lg:grid-cols-2"},[r("section",{staticClass:"w-screen md:w-auto"},[r("Tracker"),r("CharacterForm")],1),r("section",{staticClass:"w-screen md:w-auto"},[r("DiceRoller"),r("Notes")],1)])},d=[],p=r("2f62"),v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("form",{staticClass:"mt-2 align-center"},[r("h2",[t._v("Add Character")]),r("div",{staticClass:"row"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.name,expression:"character.name"}],attrs:{id:"name",type:"text",placeholder:"Name"},domProps:{value:t.character.name},on:{input:function(e){e.target.composing||t.$set(t.character,"name",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.armorClass,expression:"character.armorClass"}],attrs:{id:"ac",type:"text",placeholder:"AC"},domProps:{value:t.character.armorClass},on:{input:function(e){e.target.composing||t.$set(t.character,"armorClass",e.target.value)}}})]),r("div",{staticClass:"row"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.hp,expression:"character.hp"}],attrs:{id:"hp",type:"text",placeholder:"HP"},domProps:{value:t.character.hp},on:{input:function(e){e.target.composing||t.$set(t.character,"hp",e.target.value)}}}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.initiative,expression:"character.initiative"}],attrs:{id:"initiative",type:"text",placeholder:"Initiative"},domProps:{value:t.character.initiative},on:{input:function(e){e.target.composing||t.$set(t.character,"initiative",e.target.value)}}})]),r("div",{staticClass:"row"},[r("button",{staticClass:"button mt-2",attrs:{disabled:!t.canSubmit},on:{click:function(e){return e.preventDefault(),t.addCharacter(e)}}},[t._v(" Add ")])])])])},f=[],m=(r("b0c0"),r("a9e3"),r("5530")),b={name:"",armorClass:void 0,hp:void 0,initiative:void 0},g=a["a"].extend({name:"CharacterForm",data:function(){return{character:Object.assign({},b)}},computed:Object(m["a"])({canSubmit:function(){return""!==this.character.name&&""!==this.character.initiative}},Object(p["c"])(["characters"])),methods:{addCharacter:function(){this.$store.dispatch("addCharacter",Object(m["a"])(Object(m["a"])({},this.character),{},{armorClass:Number(this.character.armorClass),hp:Number(this.character.hp),initiative:Number(this.character.initiative),id:this.characters.length+1})),this.clearCharacter()},clearCharacter:function(){this.character=Object.assign({},b)}}}),C=g,x=(r("c1ab"),Object(i["a"])(C,v,f,!1,null,"f1ebe766",null)),y=x.exports,_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("h1",{staticClass:"my-2"},[t._v("Roll Dice")]),t.diceResult?r("pre",[t._v(t._s(t.diceResult))]):t._e(),r("input",{directives:[{name:"model",rawName:"v-model",value:t.diceString,expression:"diceString"}],staticClass:"rounded",attrs:{placeholder:"e.g. 4d6"},domProps:{value:t.diceString},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.roll(e)},blur:t.clearIfEmpty,input:function(e){e.target.composing||(t.diceString=e.target.value)}}}),r("button",{staticClass:"button ml-1",attrs:{disabled:""===t.diceString},on:{click:function(e){return e.preventDefault(),t.roll(e)}}},[t._v(" Roll ")])])},O=[],w=(r("d3b7"),r("25f0"),r("53a5")),j=new w["DiceRoller"],k=a["a"].extend({name:"DiceRoller",data:function(){return{diceString:"",diceResult:""}},methods:{roll:function(){this.clearIfEmpty();var t=j.roll(this.diceString);this.diceResult=t.toString()},clearIfEmpty:function(){this.diceString||(this.diceResult="")}}}),T=k,N=(r("5ac8"),Object(i["a"])(T,_,O,!1,null,"28cdc4a4",null)),S=N.exports,$=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("h1",{staticClass:"mt-2"},[t._v("Notes")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.noteText,expression:"noteText"}],staticClass:"p-1 rounded-lg",domProps:{value:t.noteText},on:{input:function(e){e.target.composing||(t.noteText=e.target.value)}}})])},P=[],I=a["a"].extend({name:"Notes",computed:Object(m["a"])(Object(m["a"])({},Object(p["c"])(["notes"])),{},{noteText:{get:function(){return this.notes},set:function(t){this.$store.dispatch("setNotes",t)}}})}),E=I,D=(r("5dbf"),Object(i["a"])(E,$,P,!1,null,"4610abdf",null)),R=D.exports,A=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("h1",{staticClass:"my-2"},[t._v("Initiative Tracker")]),r("div",{staticClass:"flex flex-col items-center"},t._l(t.characters,(function(e,a){return r("Character",{key:"character-"+a,attrs:{character:e,isActive:a===t.currentTurn}})})),1),0!==t.characters.length?r("button",{staticClass:"button secondary w-6",on:{click:function(e){return e.preventDefault(),t.nextTurn(e)}}},[t._v(" Next Turn ")]):t._e()])},H=[],M=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:[t.isActive?"active":"","character"]},[r("p",{staticClass:"heading-2"},[t._v(" "+t._s(t.character.name)+" - "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.initiative,expression:"character.initiative"}],domProps:{value:t.character.initiative},on:{blur:function(e){return e.preventDefault(),t.updateCharacter(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateCharacter(e)},input:function(e){e.target.composing||t.$set(t.character,"initiative",e.target.value)}}})]),r("p",[t._v(" AC: "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.armorClass,expression:"character.armorClass"}],domProps:{value:t.character.armorClass},on:{blur:function(e){return e.preventDefault(),t.updateCharacter(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateCharacter(e)},input:function(e){e.target.composing||t.$set(t.character,"armorClass",e.target.value)}}})]),r("p",[t._v(" HP: "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.character.hp,expression:"character.hp"}],domProps:{value:t.character.hp},on:{blur:function(e){return e.preventDefault(),t.updateCharacter(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.updateCharacter(e)},input:function(e){e.target.composing||t.$set(t.character,"hp",e.target.value)}}})]),r("button",{on:{click:function(e){return e.preventDefault(),t.removeCharacter(e)}}},[t._v("Remove")])])},B=[],F=a["a"].extend({name:"Character",methods:{removeCharacter:function(){this.$store.dispatch("removeCharacter",this.character)},updateCharacter:function(){this.$store.dispatch("updateCharacter",this.character)}},props:{character:{type:Object},isActive:Boolean}}),J=F,W=(r("da90"),Object(i["a"])(J,M,B,!1,null,"099e3566",null)),q=W.exports,z=a["a"].extend({name:"HelloWorld",components:{Character:q},computed:Object(m["a"])(Object(m["a"])({},Object(p["b"])({characters:"charactersInitiativeSorted"})),Object(p["c"])(["currentTurn"])),methods:{nextTurn:function(){var t=this.currentTurn===this.characters.length-1||this.currentTurn>=this.characters.length?0:this.currentTurn+1;this.$store.dispatch("setCurrentTurn",t)}}}),G=z,K=Object(i["a"])(G,A,H,!1,null,null,null),L=K.exports,Q=a["a"].extend({name:"Home",components:{CharacterForm:y,DiceRoller:S,Notes:R,Tracker:L},computed:Object(p["b"])({characters:"charactersInitiativeSorted"}),data:function(){return{activeIndex:0}},methods:{nextTurn:function(){var t=this.activeIndex===this.characters.length-1?0:this.activeIndex+1;this.activeIndex=t}}}),U=Q,V=(r("0b17"),Object(i["a"])(U,h,d,!1,null,"b323bb06",null)),X=V.exports;a["a"].use(l["a"]);var Y=[{path:"/",name:"Home",component:X}],Z=new l["a"]({mode:"hash",base:"/initiative-tracker/",routes:Y}),tt=Z,et=r("0e44"),rt={addCharacter:function(t,e){var r=t.commit;r("addCharacter",e)},updateCharacter:function(t,e){var r=t.commit;r("updateCharacter",e)},removeCharacter:function(t,e){var r=t.commit;r("removeCharacterById",e.id)},setNotes:function(t,e){var r=t.commit;r("setNotes",e)},setCurrentTurn:function(t,e){var r=t.commit;r("setCurrentTurn",e)}},at=(r("99af"),r("4de4"),r("c740"),r("2909")),nt={addCharacter:function(t,e){if(t.characters=[].concat(Object(at["a"])(t.characters),[e]),t.currentTurn>t.characters.length){var r=0===t.characters.length?0:t.characters.length-1;t.currentTurn=r}},updateCharacter:function(t,e){var r=t.characters.findIndex((function(t){return t.id===e.id}));r&&(t.characters[r]=e)},removeCharacterById:function(t,e){if(t.characters=t.characters.filter((function(t){return t.id!==e})),t.currentTurn>t.characters.length){var r=0===t.characters.length?0:t.characters.length-1;t.currentTurn=r}},setNotes:function(t,e){t.notes=e},setCurrentTurn:function(t,e){t.currentTurn=e}},ct={charactersInitiativeSorted:function(t){return t.characters.sort((function(t,e){var r=Number(t.initiative),a=Number(e.initiative);return r===a?0:r>a?-1:1}))}};a["a"].use(p["a"]);var it=new p["a"].Store({state:{characters:Array(),notes:"",currentTurn:0},mutations:nt,actions:rt,getters:ct,plugins:[Object(et["a"])({storage:window.sessionStorage})]});r("6861");a["a"].config.productionTip=!1,new a["a"]({router:tt,store:it,render:function(t){return t(u)}}).$mount("#app")},da90:function(t,e,r){"use strict";var a=r("0ba5"),n=r.n(a);n.a},e075:function(t,e,r){}});
//# sourceMappingURL=app.bd90ba1f.js.map