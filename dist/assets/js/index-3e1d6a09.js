import{d as v,u as A,a as L,c as V,E as N,b,e as B,o as t,f,g as a,h as e,i as o,w as c,F as G,r as U,j as _,k as D,l,m as F,n as H,p as O,q,s as T,t as j,v as z,x as P,y as J,z as K,A as x,B as E,M as C,S as W,C as S,D as $,_ as y,G as Q,H as I,I as X,J as M,K as Y,L as Z,N as ee,O as te,P as se}from"./index-c3904695.js";import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                */import{u as m}from"./index-fe386976.js";import{S as oe}from"./sea-fba9205e.js";import{I as ne}from"./index-1ea276e6.js";import"./index-11a757ea.js";const ae=s=>(S("data-v-00425220"),s=s(),$(),s),ce={class:"menu-wrap"},_e={class:"title"},le=["src"],ie=ae(()=>a("span",null,"墨客管理",-1)),de=["to"],re=v({__name:"index",setup(s){const u=A(),i=L(),p=V(()=>m.auth===E.SUPER?C:C.filter(r=>m.auth===E.ADMIN?r.key!=="users"&&r.key!=="account":!W.includes(r.key))),k=d=>{i.name!==d.key&&u.push(d.path)};return(d,r)=>{const w=N,h=b,g=B;return t(),f("div",ce,[a("div",_e,[a("img",{src:e(oe),alt:"",class:"icon"},null,8,le),ie]),o(g,{"default-active":e(i).name,class:"el-menu"},{default:c(()=>[(t(!0),f(G,null,U(e(p),n=>(t(),_(h,{key:n.key,index:n.key,class:"menuList",onClick:Ne=>k(n)},{default:c(()=>[o(w,{class:"icon"},{default:c(()=>[n.key==="home"?(t(),_(e(D),{key:0})):l("",!0),n.key==="article"?(t(),_(e(F),{key:1})):l("",!0),n.key==="classify"?(t(),_(e(H),{key:2})):l("",!0),n.key==="tag"?(t(),_(e(O),{key:3})):l("",!0),n.key==="account"?(t(),_(e(q),{key:4})):l("",!0),n.key==="users"?(t(),_(e(T),{key:5})):l("",!0),n.key==="comment"?(t(),_(e(j),{key:6})):l("",!0),n.key==="interact"?(t(),_(e(z),{key:7})):l("",!0),n.key==="pageSet"?(t(),_(e(P),{key:8})):l("",!0),n.key==="create"?(t(),_(e(J),{key:9})):l("",!0),n.key==="tools"?(t(),_(e(K),{key:10})):l("",!0)]),_:2},1024),a("div",{class:"item",to:n.path},x(n.name),9,de)]),_:2},1032,["index","onClick"]))),128))]),_:1},8,["default-active"])])}}});const ue=y(re,[["__scopeId","data-v-00425220"]]);const pe=s=>(S("data-v-f57e0997"),s=s(),$(),s),me={class:"container"},fe={class:"content"},ke=pe(()=>a("div",null,"content",-1)),he=v({__name:"index",props:{title:{default:""},width:{default:200}},setup(s){return(u,i)=>{const p=Q;return t(),f("div",me,[o(p,{placement:"bottom",title:s.title,width:s.width,trigger:"click","popper-class":"popover"},{reference:c(()=>[I(u.$slots,"click",{},void 0,!0)]),default:c(()=>[a("div",fe,[I(u.$slots,"content",{},()=>[ke],!0)])]),_:3},8,["title","width"])])}}});const ve=y(he,[["__scopeId","data-v-f57e0997"]]),R=s=>(S("data-v-4dd07426"),s=s(),$(),s),ye={class:"page-header"},ge={class:"left"},xe={class:"title"},Ie={class:"right"},Se={key:0,class:"username"},$e=R(()=>a("span",{class:"text"},"账号设置",-1)),we=R(()=>a("span",{class:"text"},"退出登录",-1)),Ee=v({__name:"index",setup(s){const u=L(),i=A(),p=()=>{i.back()},k=()=>{i.push("/setting")},d=()=>{i.replace("/login"),m.onLogout()};return(r,w)=>{const h=N,g=ne;return t(),f("div",ye,[a("div",ge,[a("span",{class:"back",onClick:p},[o(h,null,{default:c(()=>[o(e(X))]),_:1})]),a("span",xe,x(e(u).meta.title),1)]),a("div",Ie,[e(m).username?(t(),f("div",Se,x(e(m).username),1)):l("",!0),I(r.$slots,"default",{},void 0,!0),o(ve,{width:120},{click:c(()=>[o(g,{url:e(m).headUrl||e(M).sea,"transition-img":e(M).sea,class:"avatar"},null,8,["url","transition-img"])]),content:c(()=>[a("div",{class:"set-item",onClick:k},[o(h,null,{default:c(()=>[o(e(P))]),_:1}),$e]),a("div",{class:"set-item",onClick:d},[o(h,null,{default:c(()=>[o(e(Y))]),_:1}),we])]),_:1})])])}}});const Ce=y(Ee,[["__scopeId","data-v-4dd07426"]]),Me={class:"wrap"},Ae={class:"content"},Le=v({__name:"index",setup(s){return(u,i)=>{const p=Z,k=ee("RouterView"),d=te,r=se;return t(),f("div",Me,[o(r,null,{default:c(()=>[o(p,{width:"200px"},{default:c(()=>[o(ue)]),_:1}),o(d,{class:"el-main"},{default:c(()=>[o(Ce),a("div",Ae,[o(k)])]),_:1})]),_:1})])}}});const Fe=y(Le,[["__scopeId","data-v-ccf8a06d"]]);export{Fe as default};
