var T=(g,v,d)=>new Promise((p,C)=>{var h=i=>{try{w(d.next(i))}catch(f){C(f)}},A=i=>{try{w(d.throw(i))}catch(f){C(f)}},w=i=>i.done?p(i.value):Promise.resolve(i.value).then(h,A);w((d=d.apply(g,v)).next())});import{_ as W}from"./index-9942da33.js";import{d as X,aJ as u,u as Y,aK as j,b2 as ee,b3 as te,b4 as le,b5 as ae,o as D,j as oe,w as s,g as m,i as o,aU as c,A as b,h as _,f as E,b6 as k,b7 as se,T as R,C as ie,D as ne,_ as ce}from"./index-c3904695.js";/* empty css                 *//* empty css                 *//* empty css                  *//* empty css                     *//* empty css                  *//* empty css                    *//* empty css                  */import"./el-tooltip-4ed993c7.js";import{f as re,c as $}from"./index-11a757ea.js";import{b as r,c as L}from"./index-fe386976.js";import{M as de}from"./index-cf4ffd93.js";/* empty css                   *//* empty css                   *//* empty css                */const B=g=>(ie("data-v-7226a9fd"),g=g(),ne(),g),ue={class:"action-list"},pe={class:"content"},ve=["title"],_e={key:0},fe=B(()=>m("span",{class:"status-del"},null,-1)),me={key:1},ge=B(()=>m("span",{class:"status-use"},null,-1)),he={class:"actions"},we={class:"footer"},ye=X({__name:"index",setup(g){const v=u(),d=u([]),p=u(1),C=u(!1),h=u(!1),A=u(""),w=u(""),i=u([]),f=u([]),y=u([]),S=Y();j(()=>{r.getArticleList(p.value)}),ee(p,(e,t)=>{r.getArticleList(e)});const M=e=>{d.value=e},x=e=>{S.push(`/detail/${e}`)},N=e=>{const{isTop:t,id:a}=e;t?U(a):V(a)},V=e=>T(this,null,function*(){yield L.updateArticle({articleId:e,isTop:new Date().valueOf()}),r.getArticleList(p.value)}),U=e=>T(this,null,function*(){yield L.updateArticle({articleId:e,isTop:0}),r.getArticleList(p.value)}),P=e=>{const{id:t}=e;S.push(`/create?id=${t}`)},z=e=>{const{isDelete:t,id:a}=e;t?O(a):G(a)},O=e=>{r.shelvesArticle([e]),v.value.clearSelection()},G=e=>{r.removeArticle([e]),v.value.clearSelection()},J=e=>{const{classify:t,id:a,coverImage:n}=e;n&&!y.value.includes(n)&&$(n)&&y.value.push(n),A.value=a,w.value=t,h.value=!0},K=()=>{const e=d.value.filter(t=>!t.isDelete).map(t=>t.id)||[];r.removeArticle(e),v.value.clearSelection()},Z=()=>{const e=d.value.filter(t=>t.isDelete).map(t=>t.id)||[];r.shelvesArticle(e),v.value.clearSelection()},q=()=>{const e=[],t=[];d.value.forEach(a=>{e.push(a.id),t.push(a.classify),a.coverImage&&!y.value.includes(a.coverImage)&&$(a.coverImage)&&y.value.push(a.coverImage)}),i.value=e,f.value=t,h.value=!0},F=()=>T(this,null,function*(){yield r.batchDelArticle({articleIds:i.value.length?i.value:[A.value],pageNo:p.value,classifys:i.value.length?f.value:[w.value],coverImages:y.value}),i.value=[],f.value=[],y.value=[],v.value.clearSelection()});return(e,t)=>{const a=te,n=le,H=ae,Q=W;return D(),oe(Q,{loading:_(r).loading,class:"article-list-wrap"},{default:s(()=>[m("div",ue,[o(a,{type:"primary",disabled:!d.value.length,onClick:Z},{default:s(()=>[c("批量上架")]),_:1},8,["disabled"]),o(a,{type:"warning",disabled:!d.value.length,onClick:K},{default:s(()=>[c("批量下架")]),_:1},8,["disabled"]),o(a,{type:"danger",disabled:!d.value.length,onClick:q},{default:s(()=>[c("批量删除")]),_:1},8,["disabled"])]),m("div",pe,[o(_(se),{ref_key:"multipleTableRef",ref:v,data:_(r).list,style:{width:"100%"},onRowClick:t[0]||(t[0]=l=>x(l.id)),onSelectionChange:M},{default:s(()=>[o(n,{type:"selection",width:"39"}),o(n,{label:"标题",width:"350","show-overflow-tooltip":""},{default:s(l=>[c(b(l.row.title),1)]),_:1}),o(n,{label:"作者",width:"145","show-overflow-tooltip":""},{default:s(l=>[c(b(l.row.authorName),1)]),_:1}),o(n,{property:"classify",label:"分类",width:"120","show-overflow-tooltip":""}),o(n,{property:"tag",label:"标签",width:"120","show-overflow-tooltip":""}),o(n,{property:"createTime",label:"发表时间",width:"180"},{default:s(l=>[c(b(_(re)(l.row.createTime)),1)]),_:1}),o(n,{fixed:"right",property:"status",label:"状态",width:"82"},{default:s(l=>[m("div",{class:"status",title:l.row.isDelete?"已下架":"已上架"},[l.row.isDelete?(D(),E("span",_e,[fe,c("已下架")])):(D(),E("span",me,[ge,c("已上架")]))],8,ve)]),_:1}),o(n,{fixed:"right",label:"操作",width:"265"},{default:s(l=>[m("div",he,[o(a,{link:"",type:"primary",onClick:k(I=>x(l.row.id),["stop"])},{default:s(()=>[c("详情")]),_:2},1032,["onClick"]),o(a,{link:"",type:l.row.isTop?"warning":"primary",onClick:k(I=>N(l.row),["stop"])},{default:s(()=>[c(b(l.row.isTop?"取消置顶":"文章置顶"),1)]),_:2},1032,["type","onClick"]),o(a,{link:"",type:"primary",onClick:k(I=>P(l.row),["stop"])},{default:s(()=>[c("编辑")]),_:2},1032,["onClick"]),o(a,{link:"",type:l.row.isDelete?"primary":"warning",onClick:k(I=>z(l.row),["stop"])},{default:s(()=>[c(b(l.row.isDelete?"上架":"下架"),1)]),_:2},1032,["type","onClick"]),o(a,{link:"",type:"danger",onClick:k(I=>J(l.row),["stop"])},{default:s(()=>[c("删除")]),_:2},1032,["onClick"])])]),_:1})]),_:1},8,["data"]),m("div",we,[o(H,{"current-page":p.value,"onUpdate:current-page":t[1]||(t[1]=l=>p.value=l),"page-size":_(R),background:"",disabled:C.value,layout:"total, prev, pager, next",total:_(r).total,"hide-on-single-page":_(r).list.length<=_(R)},null,8,["current-page","page-size","disabled","total","hide-on-single-page"])])]),o(de,{visible:h.value,"onUpdate:visible":t[2]||(t[2]=l=>h.value=l),title:"删除文章",content:"确定删除该文章吗？",info:"删除文章后，该文章将无法恢复！","on-submit":F},null,8,["visible"])]),_:1},8,["loading"])}}});const Ue=ce(ye,[["__scopeId","data-v-7226a9fd"]]);export{Ue as default};