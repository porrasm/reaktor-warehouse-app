(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{172:function(e,t,r){"use strict";r.r(t);var n=r(6),a=r(0),c=r.n(a),s=r(52),u=r.n(s),i=r(14),o=r.n(i),l=r(18),p=r(28),j=r(57),d=r(185),f=r(194),g=r(195),b=r(186),h=r(192),O=r(127),x=r.n(O),v=0,m=function(){var e=Object(p.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(k(["products","categories"]));case 2:return t=e.sent,e.abrupt("return",t||[]);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(p.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(k(["products","manufacturers"]),6,{category:t});case 2:return r=e.sent,e.abrupt("return",r||[]);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(p.a)(o.a.mark((function e(t,r,n,a){var c,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={category:t,page:n,filter:a,manufacturer:r,pageItemCount:100},e.next=3,w(k(["products"]),6,c);case 3:return s=e.sent,e.abrupt("return",s||[]);case 5:case"end":return e.stop()}}),e)})));return function(t,r,n,a){return e.apply(this,arguments)}}(),w=function(){var e=Object(p.a)(o.a.mark((function e(t){var r,n,a,c,s,u=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=u.length>1&&void 0!==u[1]?u[1]:6,n=u.length>2&&void 0!==u[2]?u[2]:{},a=++v,c=0;case 4:if(!(c<r)){e.next=22;break}if(a===v){e.next=7;break}return e.abrupt("break",22);case 7:return e.prev=7,e.next=10,x.a.get(t,{params:n});case 10:if(200==(s=e.sent).status){e.next=13;break}throw"Invalid response status received: "+s.status;case 13:return e.abrupt("return",s.data);case 16:e.prev=16,e.t0=e.catch(7),console.log("Error fetching JSON from API: ",e.t0.message,e.t0);case 19:c++,e.next=4;break;case 22:return e.abrupt("return",null);case 23:case"end":return e.stop()}}),e,null,[[7,16]])})));return function(t){return e.apply(this,arguments)}}(),k=function(e){return"/api/"+e.join("/")},M={getCategories:m,getManufacturers:y,getProducts:C,pageItemCount:100},P=r(189),S=r(191),I=function(e){var t=e.product;return Object(n.jsx)(P.a,{children:Object(n.jsxs)(P.a.Content,{children:[Object(n.jsx)(P.a.Header,{children:t.name}),Object(n.jsxs)(P.a.Description,{children:["Availability: ",t.availability]}),Object(n.jsxs)(P.a.Description,{children:["Price: ",t.price]}),Object(n.jsxs)(P.a.Description,{children:["Manufacturer: ",t.manufacturer]}),Object(n.jsxs)(P.a.Description,{children:["Color: ",t.color.join(", ")]}),Object(n.jsxs)(P.a.Description,{children:["Type: ",t.type]}),Object(n.jsxs)(P.a.Description,{children:["ID: ",t.id]})]})})},D=function(e){var t=e.products,r=e.clickHandler;return Object(n.jsx)(S.a,{divided:!0,children:t.map((function(e){return Object(n.jsx)(S.a.Item,{onClick:function(){return r(e)},children:Object(n.jsxs)(S.a.Content,{children:[Object(n.jsx)(S.a.Header,{as:"a",children:e.name}),Object(n.jsxs)(S.a.Description,{children:["Availability: ",e.availability]}),Object(n.jsxs)(S.a.Description,{children:["Price: ",e.price]})]})},e.id)}))})},A=r(184),E=r(173),H=r(188),J=r(37),N=r(187),F=function(e){return Object(n.jsx)(N.a,{placeholder:e.placeholder,fluid:!0,selection:!0,value:e.value,onChange:function(t,r){return e.onChange(r.value)},options:e.options.map((function(e){return{key:e,text:(t=e,t.substring(0,1).toUpperCase()+t.substring(1)),value:e};var t}))})},L=function(e){var t=Object(a.useState)(""),r=Object(j.a)(t,2),c=r[0],s=r[1];return Object(n.jsxs)("div",{children:[Object(n.jsx)(F,{placeholder:"Select category",value:e.currentCategory,onChange:e.selectCategory,options:e.categories}),Object(n.jsx)(F,{placeholder:"Select manufacturer",value:e.currentManufacturer,onChange:e.selectManufacturer,options:e.manufacturers}),"\xa0",Object(n.jsxs)(A.a,{icon:"search",style:{width:"272px"},onChange:function(e,t){return s(t.value)},children:[Object(n.jsx)("input",{}),Object(n.jsx)(E.a,{type:"submit",onClick:function(){return e.updateFilter(c)},children:"Search"})]}),"\xa0",e.pageCount>0?Object(n.jsx)(H.a,{style:{width:"272px"},boundaryRange:0,ellipsisItem:null,firstItem:null,lastItem:null,siblingRange:1,totalPages:e.pageCount,activePage:e.page,onPageChange:function(t,r){return e.selectPage(Number(r.activePage))}}):"","\xa0",0==e.loadingMessage.length?"":Object(n.jsxs)(h.a,{icon:!0,children:[Object(n.jsx)(J.a,{name:"circle notched",loading:!0}),Object(n.jsx)(h.a.Content,{children:e.loadingMessage})]})]})},R=function(){var e=c.a.useState({loadingMessage:"",selectedProduct:null}),t=Object(j.a)(e,2),r=t[0],s=t[1],u=c.a.useState({categories:null,manufacturers:[]}),i=Object(j.a)(u,2),O=i[0],x=i[1],v=c.a.useState({category:"",manufacturer:"",page:1,filter:""}),m=Object(j.a)(v,2),y=m[0],C=m[1],w=c.a.useState([]),k=Object(j.a)(w,2),P=k[0],S=k[1];Object(a.useEffect)((function(){O.categories||A()}));var A=function(){var e=Object(p.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.getCategories();case 2:t=e.sent,x(Object(l.a)(Object(l.a)({},O),{},{categories:t}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Enabled manufacturer: ",t),J({manufacturer:t});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(p.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C(Object(l.a)(Object(l.a)({},y),{},{category:t})),s(Object(l.a)(Object(l.a)({},r),{},{loadingMessage:"Loading manufacturers..."})),console.log("Enabled category: ",t),e.next=5,M.getManufacturers(t);case 5:if(n=e.sent,x(Object(l.a)(Object(l.a)({},O),{},{manufacturers:n})),console.log("Set manufacturers: ",n),0!=n.length){e.next=11;break}return window.alert("There seems to be an error accessing the API. Please try again."),e.abrupt("return");case 11:J({category:t,manufacturer:n[0]});case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),J=function(){var e=Object(p.a)(o.a.mark((function e(t){var n,a,c,u,i,p,j,d,f;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.category,a=void 0===n?y.category:n,c=t.manufacturer,u=void 0===c?y.manufacturer:c,i=t.page,p=void 0===i?1:i,j=t.filter,d=void 0===j?"":j,console.log("Update products with page: ",p),s(Object(l.a)(Object(l.a)({},r),{},{loadingMessage:"Loading products..."})),S([]),e.next=6,M.getProducts(a,u,p,d);case 6:f=e.sent,S(f),C(Object(l.a)(Object(l.a)({},y),{},{category:a,manufacturer:u,page:p,filter:d})),s(Object(l.a)(Object(l.a)({},r),{},{loadingMessage:""}));case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(p.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Selected product: ",t),s(Object(l.a)(Object(l.a)({},r),{},{selectedProduct:t}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(n.jsx)("div",{children:Object(n.jsx)(d.a,{children:Object(n.jsx)(f.a,{centered:!0,columns:3,children:Object(n.jsx)(f.a.Column,{children:Object(n.jsxs)(g.a,{children:[Object(n.jsx)(D,{products:P,clickHandler:N}),Object(n.jsx)(b.a,{position:"left",children:Object(n.jsx)(L,{currentCategory:y.category,categories:O.categories?O.categories:[],selectCategory:H,currentManufacturer:y.manufacturer,manufacturers:O.manufacturers,selectManufacturer:E,updateFilter:function(e){J({page:1,filter:e})},page:y.page,pageCount:Math.ceil(P.length/M.pageItemCount),selectPage:function(e){console.log("Select page: ",e),J({page:e,filter:y.filter})},loadingMessage:r.loadingMessage})}),Object(n.jsx)(b.a,{position:"right",children:r.selectedProduct?Object(n.jsx)(I,{product:r.selectedProduct}):Object(n.jsx)(h.a,{children:Object(n.jsx)(h.a.Content,{children:"Select a product for more information"})})})]})})})})})};var T=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(R,{})})};r(171);u.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(T,{})}),document.getElementById("root"))}},[[172,1,2]]]);
//# sourceMappingURL=main.097aa72a.chunk.js.map