import{d as h,c as x,E as w,b3 as g,b8 as y,o as C,f as V,i as s,w as n,g as t,aU as _,A as o,h as f,b9 as B,ba as E,_ as T}from"./index-c3904695.js";/* empty css                   *//* empty css                  *//* empty css                */const k={class:"container"},N={class:"content"},S={class:"wrap"},D={class:"desc"},I={class:"desc-text"},M={class:"info"},U={class:"footer"},A=h({__name:"index",props:{visible:{type:Boolean,default:!1},title:{default:"title"},onSubmit:null,onCancel:{type:Function,default:()=>{}},content:{default:""},info:{default:""},cancelText:{default:"取消"},onText:{default:"确定"},width:{default:"350"}},emits:["update:visible"],setup(e,{emit:a}){const i=e,l=x({get(){return i.visible},set(c){a("update:visible",c)}}),r=()=>{a("update:visible",!1)},p=()=>{i.onSubmit(),a("update:visible",!1)};return(c,d)=>{const m=w,u=g,b=y;return C(),V("div",k,[s(b,{modelValue:f(l),"onUpdate:modelValue":d[0]||(d[0]=v=>E(l)?l.value=v:null),title:e.title,width:e.width},{footer:n(()=>[t("span",U,[s(u,{class:"btn",onClick:r},{default:n(()=>[_(o(e.cancelText),1)]),_:1}),s(u,{class:"btn",type:"primary",onClick:p},{default:n(()=>[_(o(e.onText),1)]),_:1})])]),default:n(()=>[t("div",N,[t("div",S,[s(m,{class:"warn-icon"},{default:n(()=>[s(f(B))]),_:1}),t("div",D,[t("div",I,o(e.content),1),t("div",M,o(e.info),1)])])])]),_:1},8,["modelValue","title","width"])])}}});const z=T(A,[["__scopeId","data-v-1618bc6e"]]);export{z as M};
