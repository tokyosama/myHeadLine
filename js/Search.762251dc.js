"use strict";(self["webpackChunkhead_line"]=self["webpackChunkhead_line"]||[]).push([[288],{5823:function(t,s,e){e.r(s),e.d(s,{default:function(){return u}});var i=function(){var t=this,s=t._self._c;return s("div",[s("div",{staticClass:"search-header"},[s("van-icon",{staticClass:"goback",attrs:{name:"arrow-left",color:"white",size:"0.48rem"},on:{click:function(s){return t.$router.back()}}}),s("van-search",{directives:[{name:"fofo",rawName:"v-fofo"}],attrs:{placeholder:"请输入搜索关键单字",background:"#007BFF",shape:"round"},on:{input:t.inputFn,search:t.searchFn},model:{value:t.kw,callback:function(s){t.kw="string"===typeof s?s.trim():s},expression:"kw"}})],1),0!==this.kw.length?s("div",{staticClass:"sugg-list"},t._l(t.suggestList,(function(e,i){return s("div",{key:i,staticClass:"sugg-item",domProps:{innerHTML:t._s(t.light(e,t.kw))},on:{click:function(s){return t.suggestClickFn(e)}}})})),0):s("div",{staticClass:"search-history"},[s("van-cell",{attrs:{title:"搜索历史"},scopedSlots:t._u([{key:"right-icon",fn:function(){return[s("van-icon",{staticClass:"search-icon",attrs:{name:"delete"},on:{click:t.clearFn}})]},proxy:!0}])}),s("div",{staticClass:"history-list"},t._l(t.history,(function(e,i){return s("span",{key:i,staticClass:"history-item",on:{click:function(s){return t.historyClickFn(e)}}},[t._v(t._s(e))])})),0)],1)])},n=[],r=e(430),a=e(7247),o={name:"mySearch",data(){return{kw:"",timer:null,suggestList:[],history:JSON.parse((0,a.cF)("his"))||[]}},methods:{inputFn(){clearTimeout(this.timer),0===this.kw.length?this.suggestList=[]:this.timer=setTimeout((async()=>{if(0===this.kw.length)return;const{data:t}=await(0,r.B)({keywords:this.kw});this.suggestList=t.data.options}),400)},light(t,s){const e=new RegExp(s,"ig");if(null!==t){const s=t.replaceAll(e,(t=>`<span style="color: red;">${t}</span>`));return s}},moveFn(t){setTimeout((()=>{this.$router.push(`/search_result/${t}`)}),0)},searchFn(){this.kw.length>0&&(this.history.push(this.kw),this.moveFn(this.kw))},suggestClickFn(t){this.history.push(t),this.moveFn(t)},historyClickFn(t){this.moveFn(t)},clearFn(){this.history=[]}},watch:{history:{deep:!0,handler(){const t=new Set(this.history),s=Array.from(t);(0,a.po)("his",JSON.stringify(s))}}}},c=o,h=e(1001),l=(0,h.Z)(c,i,n,!1,null,"75a1cb08",null),u=l.exports},430:function(t,s,e){e.d(s,{B:function(){return n},G:function(){return r}});var i=e(4946);const n=({keywords:t})=>(0,i.Z)({url:"/v1_0/suggestion",method:"GET",params:{q:t}}),r=({page:t=1,perPage:s=10,q:e})=>(0,i.Z)({url:"/v1_0/search",method:"GET",params:{page:t,per_page:s,q:e}})}}]);
//# sourceMappingURL=Search.762251dc.js.map