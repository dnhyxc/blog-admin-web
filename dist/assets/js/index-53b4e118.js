var Y=Object.defineProperty,Q=Object.defineProperties;var X=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var L=(s,l,t)=>l in s?Y(s,l,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[l]=t,F=(s,l)=>{for(var t in l||(l={}))Z.call(l,t)&&L(s,t,l[t]);if(P)for(var t of P(l))ee.call(l,t)&&L(s,t,l[t]);return s},O=(s,l)=>Q(s,X(l));var V=(s,l,t)=>new Promise((f,g)=>{var p=u=>{try{e(t.next(u))}catch(m){g(m)}},v=u=>{try{e(t.throw(u))}catch(m){g(m)}},e=u=>u.done?f(u.value):Promise.resolve(u.value).then(p,v);e((t=t.apply(s,l)).next())});import{d as G,aJ as y,bb as ae,aL as W,N as le,o as _,f as k,i as r,W as $,_ as z,a as te,u as oe,aK as re,aW as se,bd as ue,be as de,bD as ie,bE as ne,bF as ce,bf as me,b3 as pe,bG as ve,w as d,g as U,F as A,r as D,j as R,h,bH as fe,bI as _e,aU as M,aO as ge,C as be,D as Ie}from"./index-c3904695.js";/* empty css                   *//* empty css                  *//* empty css                     */import{U as he}from"./index-61c789b9.js";/* empty css                 *//* empty css                     *//* empty css                  *//* empty css                  */import{g as ye,j as i,s as E,c as N,b as j}from"./index-fe386976.js";/* empty css                    *//* empty css                */import"./index-11a757ea.js";const we={class:"container"},Ve=G({__name:"index",props:{articleId:{default:""},height:{default:"calc(100vh - 70px)"},mackdown:{default:""},onSaveMackdown:{type:Function,default:()=>{}},onEditChange:{type:Function,default:()=>{}},onPublish:{type:Function,default:()=>{}}},setup(s){const l=s,t=y(""),f=ae({create:{text:l.articleId?"更新文章":"发布文章",title:l.articleId?"更新文章":"发布文章",action(v){l.onPublish&&l.onPublish(t.value)}}});W(()=>{l.mackdown?t.value=l.mackdown:t.value=""});const g=(v,e,u)=>V(this,null,function*(){var x;const m=yield ye.uploadFile(u[0]);e({url:m==null?void 0:m.filePath,desc:(x=u[0])==null?void 0:x.name})}),p=v=>{$.success("复制成功")};return(v,e)=>{const u=le("v-md-editor");return _(),k("div",we,[r(u,{modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=m=>t.value=m),height:s.height,autofocus:"","disabled-menus":[],"left-toolbar":"undo redo | h bold italic | quote code | strikethrough hr | link image | ul ol table | create",toolbar:f,placeholder:"编辑内容",onUploadImage:g,onCopyCodeSuccess:p},null,8,["modelValue","height","toolbar"])])}}});const ke=z(Ve,[["__scopeId","data-v-b330c4d0"]]),Ue=s=>(be("data-v-11d22398"),s=s(),Ie(),s),xe={class:"edit-wrap"},Ce=Ue(()=>U("div",{class:"title"},"创建文章",-1)),Ee={class:"cover-wrap"},Te=["src"],Se={style:{flex:"auto"}},qe=G({__name:"index",setup(s){const l=te(),t=oe(),{id:f}=l.query,g=y(""),p=y(!1),v=y(),e=y({title:"",classify:"",tag:"",createTime:f?i.detail.createTime:new Date().valueOf(),abstract:"",authorId:"",articleId:"",authorName:"",coverImage:""}),u=y("");W(()=>{if(!p.value&&f){const{title:c,classify:o,tag:b,createTime:n,abstract:I,authorId:w,articleId:T,authorName:S,coverImage:q}=e.value,C={title:c||i.detail.title,classify:o||i.detail.classify,tag:b||i.detail.tag,createTime:n||i.detail.createTime,abstract:I||i.detail.abstract,authorId:w||i.detail.authorId,articleId:T||i.detail.id,authorName:S||i.detail.authorName,coverImage:q||i.detail.coverImage};e.value=F({},C)}}),re(()=>V(this,null,function*(){var c;E.getBindUserInfo(),f?(yield i.getArticleDetail(f),u.value=((c=i.detail)==null?void 0:c.coverImage)||""):i.clearDetail()})),se(()=>{i.clearDetail(),E.onReset(),N.clearId()});const m=c=>V(this,null,function*(){u.value!==c&&(e.value.coverImage=c)}),x=c=>{if(!c.trim()){$.warning("一个字都还没写呢，休想发布");return}g.value=c,p.value=!0},B=(c,o)=>{p.value=!1,e.value.coverImage&&e.value.coverImage!==u.value&&j.findArticleByCoverImage(o||e.value.coverImage,e.value.authorId)},H=()=>{e.value.coverImage&&e.value.coverImage!==u.value&&j.findArticleByCoverImage(e.value.coverImage,e.value.authorId)},J=c=>{v.value&&v.value.validate(o=>V(this,null,function*(){var b;if(o){const n=O(F({},e.value),{createTime:ge(e.value.createTime).valueOf(),content:g.value,oldCoverImage:u.value});l.query.id?(n.articleId=l.query.id,n.authorName=((b=E.bindUserInfo.find(I=>I.userId===e.value.authorId))==null?void 0:b.username)||"",yield N.updateArticle(n)):yield N.createArticle(n),p.value=!1,t.push("/article")}else return!1}))};return(c,o)=>{const b=ue,n=de,I=ie,w=ne,T=ce,S=he,q=me,C=pe,K=ve;return _(),k("div",xe,[r(K,{modelValue:p.value,"onUpdate:modelValue":o[7]||(o[7]=a=>p.value=a),direction:"rtl",class:"el-drawer","before-close":B},{header:d(()=>[Ce]),default:d(()=>[U("div",null,[r(q,{ref_key:"formRef",ref:v,"label-width":82,model:e.value,class:"form-wrap"},{default:d(()=>[r(n,{prop:"title",label:"文章标题",rules:[{required:!0,message:"请输入文章标题",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(b,{modelValue:e.value.title,"onUpdate:modelValue":o[0]||(o[0]=a=>e.value.title=a),placeholder:"请输入文章标题"},null,8,["modelValue"])]),_:1}),r(n,{prop:"classify",label:"文章分类",rules:[{required:!0,message:"请输入文章分类",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(w,{modelValue:e.value.classify,"onUpdate:modelValue":o[1]||(o[1]=a=>e.value.classify=a),placeholder:"请选择文章分类"},{default:d(()=>[(_(!0),k(A,null,D(h(fe),a=>(_(),R(I,{key:a,label:a,value:a},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(n,{prop:"tag",label:"文章标签",rules:[{required:!0,message:"请输入文章标签",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(w,{modelValue:e.value.tag,"onUpdate:modelValue":o[2]||(o[2]=a=>e.value.tag=a),placeholder:"请输入文章标签"},{default:d(()=>[(_(!0),k(A,null,D(h(_e),a=>(_(),R(I,{key:a.key,label:a.label,value:a.label},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(n,{prop:"createTime",label:"发文时间",rules:[{required:!0,message:"请选择发文时间",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(T,{modelValue:e.value.createTime,"onUpdate:modelValue":o[3]||(o[3]=a=>e.value.createTime=a),type:"datetime",placeholder:"请选择发文时间",class:"el-date-picker"},null,8,["modelValue"])]),_:1}),r(n,{prop:"coverImage",label:"文章封面",class:"form-item-cover"},{default:d(()=>[U("div",Ee,[r(S,{"file-path":e.value.coverImage,"onUpdate:file-path":o[4]||(o[4]=a=>e.value.coverImage=a),delete:!h(i).detail.id,"get-upload-url":m,"on-remove-old-image":H},{preview:d(()=>{var a;return[U("img",{src:e.value.coverImage||((a=h(i).detail)==null?void 0:a.coverImage),class:"cover-img",alt:"文章封面"},null,8,Te)]}),_:1},8,["file-path","delete"])])]),_:1}),r(n,{prop:"authorId",label:"文章作者",rules:[{required:!0,message:"请选择文章作者",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(w,{modelValue:e.value.authorId,"onUpdate:modelValue":o[5]||(o[5]=a=>e.value.authorId=a),clearable:"",placeholder:"请选择文章作者"},{default:d(()=>[(_(!0),k(A,null,D(h(E).bindUserInfo,a=>(_(),R(I,{key:a.userId,label:a.username,value:a.userId},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),r(n,{prop:"abstract",label:"文章摘要",rules:[{required:!0,message:"请输入文章摘要",trigger:"blur"}],class:"form-item"},{default:d(()=>[r(b,{modelValue:e.value.abstract,"onUpdate:modelValue":o[6]||(o[6]=a=>e.value.abstract=a),autosize:{minRows:5,maxRows:8},type:"textarea",maxlength:"300",placeholder:"请输入文章摘要"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])])]),footer:d(()=>[U("div",Se,[r(C,{onClick:B},{default:d(()=>[M("取消")]),_:1}),r(C,{type:"primary",onClick:J},{default:d(()=>[M("发布")]),_:1})])]),_:1},8,["modelValue"]),r(ke,{mackdown:h(i).detail.content,"article-id":h(l).query.id,"on-publish":x},null,8,["mackdown","article-id"])])}}});const ze=z(qe,[["__scopeId","data-v-11d22398"]]);export{ze as default};
