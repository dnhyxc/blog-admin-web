var M=(o,l,v)=>new Promise((g,I)=>{var x=d=>{try{L(v.next(d))}catch(p){I(p)}},T=d=>{try{L(v.throw(d))}catch(p){I(p)}},L=d=>d.done?g(d.value):Promise.resolve(d.value).then(x,T);L((v=v.apply(o,l)).next())});import{d as K,aJ as H,bj as O,b3 as Q,E as X,h as r,o as s,f as m,aU as _,g as c,A as h,l as C,F as G,r as J,i as k,J as W,j as b,w as f,b6 as U,bs as Y,_ as Z}from"./index-c3904695.js";/* empty css                *//* empty css                  *//* empty css                  */import{b as q,r as $}from"./index-11a757ea.js";import{f as y}from"./index-fe386976.js";import{M as j}from"./index-cf4ffd93.js";const ee={key:0,class:"Comments"},te={key:0,class:"title"},ne={class:"replyCount"},se={class:"avatar"},oe={class:"commentContent"},ce={class:"commentMain"},le={class:"userInfo"},ae={class:"name"},ie={class:"date"},me=["onClick","innerHTML"],re={class:"comment-count"},de={key:0,class:"like-count"},ue={key:1,class:"replay-count"},_e={key:0,class:"commentChild"},Ce={class:"avatar"},he={class:"commentChildItemContent"},ve={class:"userInfo"},ke={class:"name"},fe={key:0,class:"isAuthor"},ye={key:1,class:"replyInfo"},Ie={class:"fromUsername"},Le={class:"date"},ge=["onClick","innerHTML"],pe=["onClick","innerHTML"],Te=["onClick"],we={class:"viewText"},Me=K({__name:"index",props:{authorId:{default:""},articleId:{default:""},commentList:{default:()=>({comments:[],count:0,articleId:""})},resetCommentList:{type:Function,default:()=>{}},onPreviewImage:{type:Function,default:o=>{}}},setup(o){const l=o,v=H([]),g=H(!1),I=H({comment:{},isThreeTier:!1,articleId:""}),x=a=>{let n=0;return a.forEach(u=>{var w;const i=((w=u.replyList)==null?void 0:w.length)||0;n+=i+1}),n},T=a=>M(this,null,function*(){const{comment:n,isThreeTier:u,articleId:i}=a;l.articleId&&(yield y.removeComment({comment:n,isThreeTier:u,articleId:i||l.articleId}),l.resetCommentList({comment:n}))}),L=a=>M(this,null,function*(){const{comment:n,isThreeTier:u,articleId:i}=a;!l.articleId&&!i||(yield y.restoreComment({comment:n,isThreeTier:u,articleId:i||l.articleId}),l.resetCommentList({comment:n,isRestore:!0}))}),d=a=>{const{comment:n,isThreeTier:u,articleId:i}=a;l.articleId&&(I.value={comment:n,isThreeTier:u,articleId:i||l.articleId},g.value=!0)},p=()=>M(this,null,function*(){yield y.deleteComment(I.value),l.resetCommentList({comment:I.value.comment,isDelete:!0})}),D=(a,n)=>v.value.includes(n)?a:a.slice(0,2),z=a=>{v.value=[...v.value,a]},E=a=>{var n;(n=l==null?void 0:l.onPreviewImage)==null||n.call(l,a)},V=()=>!0;return(a,n)=>{var B,R;const u=O,i=Q,w=X;return o.commentList.comments.length>0||((B=r(y).comments)==null?void 0:B.length)>0?(s(),m("div",ee,[o.commentList.comments.length>0||((R=r(y).comments)==null?void 0:R.length)>0?(s(),m("div",te,[_(" 全部评论 "),c("span",ne,h(x(o.commentList.comments.length?o.commentList.comments:r(y).comments)),1)])):C("",!0),(s(!0),m(G,null,J(o.commentList.comments.length>0?o.commentList.comments:r(y).comments,e=>{var A,F,N,P;return s(),m("div",{key:e.commentId,class:"commentWrap"},[c("div",se,[k(u,{class:"image",fit:"cover",src:e.headUrl||r(W).sea,onError:V},null,8,["src"])]),c("div",oe,[c("div",ce,[c("div",le,[c("span",ae,h(e.username),1),c("div",ie,[_(h(r(q)(e.date))+" ",1),e!=null&&e.isDelete?(s(),b(i,{key:0,type:"primary",link:"",class:"deleteComment",onClick:t=>L({comment:e,articleId:o.commentList.articleId})},{default:f(()=>[_(" 恢复评论 ")]),_:2},1032,["onClick"])):(s(),b(i,{key:1,type:"warning",link:"",class:"deleteComment",onClick:t=>T({comment:e,articleId:o.commentList.articleId})},{default:f(()=>[_(" 作废评论 ")]),_:2},1032,["onClick"])),k(i,{type:"danger",link:"",class:"deleteComment",onClick:t=>d({comment:e,articleId:o.commentList.articleId})},{default:f(()=>[_("删除评论")]),_:2},1032,["onClick"])])]),c("div",{class:"desc",onClick:U(E,["stop"]),innerHTML:r($)(e.content)},null,8,me),c("div",re,[e.likeCount?(s(),m("span",de,"点赞 "+h(e.likeCount),1)):C("",!0),(A=e.replyList)!=null&&A.length?(s(),m("span",ue,"评论 "+h((F=e.replyList)==null?void 0:F.length),1)):C("",!0)])]),e.replyList&&((N=e.replyList)==null?void 0:N.length)>0?(s(),m("div",_e,[(s(!0),m(G,null,J(D(e.replyList,e.commentId),t=>(s(),m("div",{key:t.commentId,class:"commentChildItem"},[c("div",Ce,[k(u,{class:"image",fit:"cover",src:t.headUrl||r(W).sea,onError:V,onClick:n[0]||(n[0]=()=>{})},null,8,["src"])]),c("div",he,[c("div",ve,[c("span",ke,[c("span",null,h(t.username),1),t.userId===o.authorId?(s(),m("span",fe,"(作者)")):C("",!0),t.fromUsername?(s(),m("span",ye,[_(" 回复 "),c("span",Ie,h(t.fromUsername),1)])):C("",!0)]),c("div",Le,[_(h(r(q)(t.date))+" ",1),t!=null&&t.isDelete?(s(),b(i,{key:0,type:"primary",link:"",class:"deleteComment",onClick:S=>L({comment:t,isThreeTier:!0,articleId:o.commentList.articleId})},{default:f(()=>[_(" 恢复评论 ")]),_:2},1032,["onClick"])):(s(),b(i,{key:1,type:"warning",link:"",class:"deleteComment",onClick:S=>T({comment:t,isThreeTier:!0,articleId:o.commentList.articleId})},{default:f(()=>[_(" 作废评论 ")]),_:2},1032,["onClick"])),k(i,{type:"danger",link:"",class:"deleteComment",onClick:S=>d({comment:t,isThreeTier:!0,articleId:o.commentList.articleId})},{default:f(()=>[_(" 删除评论 ")]),_:2},1032,["onClick"])])]),t.content?(s(),m("div",{key:0,class:"desc",onClick:U(E,["stop"]),innerHTML:r($)(t.content)},null,8,ge)):C("",!0),t.formContent?(s(),m("div",{key:1,class:"formContent",onClick:U(E,["stop"]),innerHTML:r($)(t.formContent)},null,8,pe)):C("",!0)])]))),128)),D(e.replyList,e.commentId).length!==((P=e.replyList)==null?void 0:P.length)?(s(),m("div",{key:0,class:"viewMore",onClick:t=>z(e.commentId)},[c("span",we,"查看更多（"+h(e.replyList&&e.replyList.length-2)+" 条）回复",1),k(w,null,{default:f(()=>[k(r(Y))]),_:1})],8,Te)):C("",!0)])):C("",!0)])])}),128)),k(j,{visible:g.value,"onUpdate:visible":n[1]||(n[1]=e=>g.value=e),title:"删除评论",content:"确定删除该账号吗？","on-submit":p},null,8,["visible"])])):C("",!0)}}});const Be=Z(Me,[["__scopeId","data-v-328f9d46"]]);export{Be as C};
