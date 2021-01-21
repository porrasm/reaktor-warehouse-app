(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{175:function(e,t,r){"use strict";r.r(t);var a=r(6),n=r(0),c=r.n(n),s=r(51),u=r.n(s),i=r(17),o=r.n(i),l=r(31),d=r(125),p=r(126),f=r(133),g=r(131),j=r(188),h=r(197),b=r(198),x=r(189),O=r(195),v=r(127),m=r.n(v),y=0,C=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(S(["products","categories"]));case 2:return t=e.sent,e.abrupt("return",t||[]);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(l.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(S(["products","manufacturers"]),6,{category:t});case 2:return r=e.sent,e.abrupt("return",r||[]);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(l.a)(o.a.mark((function e(t,r,a,n){var c,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a<1)){e.next=2;break}throw"Page must be greater than or equal to 1: ";case 2:return c={category:t,page:a,filter:n,manufacturer:r,pageItemCount:100},e.next=5,k(S(["products"]),6,c);case 5:return s=e.sent,e.abrupt("return",s||[]);case 7:case"end":return e.stop()}}),e)})));return function(t,r,a,n){return e.apply(this,arguments)}}(),k=function(){var e=Object(l.a)(o.a.mark((function e(t){var r,a,n,c,s,u=arguments;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=u.length>1&&void 0!==u[1]?u[1]:6,a=u.length>2&&void 0!==u[2]?u[2]:{},n=++y,c=0;case 4:if(!(c<r)){e.next=24;break}if(n===y){e.next=7;break}return e.abrupt("break",24);case 7:return e.prev=7,e.next=10,m.a.get(t,{params:a});case 10:if(200==(s=e.sent).status){e.next=13;break}throw"Invalid response status received: "+s.status;case 13:return e.abrupt("return",s.data);case 16:e.prev=16,e.t0=e.catch(7),console.log("Error fetching JSON from API: ",e.t0.message,e.t0);case 19:return e.next=21,M(250);case 21:c++,e.next=4;break;case 24:return e.abrupt("return",null);case 25:case"end":return e.stop()}}),e,null,[[7,16]])})));return function(t){return e.apply(this,arguments)}}(),M=function(e){return new Promise((function(t){return setTimeout(t,e)}))},S=function(e){return"/api/"+e.join("/")},I={getCategories:C,getManufacturers:P,getProducts:w},D=r(192),A=r(194),E=function(e){var t=e.product;return Object(a.jsx)(D.a,{children:Object(a.jsxs)(D.a.Content,{children:[Object(a.jsx)(D.a.Header,{children:t.name}),Object(a.jsxs)(D.a.Description,{children:["Availability: ",t.availability]}),Object(a.jsxs)(D.a.Description,{children:["Price: ",t.price]}),Object(a.jsxs)(D.a.Description,{children:["Manufacturer: ",t.manufacturer]}),Object(a.jsxs)(D.a.Description,{children:["Color: ",t.color.join(", ")]}),Object(a.jsxs)(D.a.Description,{children:["Type: ",t.type]}),Object(a.jsxs)(D.a.Description,{children:["ID: ",t.id]})]})})},F=function(e){var t=e.products,r=e.clickHandler;return Object(a.jsx)(A.a,{divided:!0,children:t.map((function(e){return Object(a.jsx)(A.a.Item,{onClick:function(){return r(e)},children:Object(a.jsxs)(A.a.Content,{children:[Object(a.jsx)(A.a.Header,{as:"a",children:e.name}),Object(a.jsxs)(A.a.Description,{children:["Availability: ",e.availability]}),Object(a.jsxs)(A.a.Description,{children:["Price: ",e.price]})]})},e.id)}))})},H=r(132),J=r(187),N=r(176),T=r(191),q=r(36),L=r(190),R=function(e){return Object(a.jsx)(L.a,{placeholder:e.placeholder,fluid:!0,selection:!0,value:e.value,onChange:function(t,r){return e.onChange(r.value)},options:e.options.map((function(e){return{key:e,text:(t=e,t.substring(0,1).toUpperCase()+t.substring(1)),value:e};var t}))})},B=function(e){var t=Object(n.useState)(""),r=Object(H.a)(t,2),c=r[0],s=r[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)(R,{placeholder:"Select category",value:e.currentCategory,onChange:e.selectCategory,options:e.categories}),Object(a.jsx)(R,{placeholder:"Select manufacturer",value:e.currentManufacturer,onChange:e.selectManufacturer,options:e.manufacturers}),"\xa0",Object(a.jsxs)(J.a,{icon:"search",style:{width:"272px"},onChange:function(e,t){return s(t.value)},children:[Object(a.jsx)("input",{}),Object(a.jsx)(N.a,{type:"submit",onClick:function(){return e.updateFilter(c)},children:"Search"})]}),"\xa0",e.pageCount>0?Object(a.jsx)(T.a,{style:{width:"272px"},boundaryRange:0,ellipsisItem:null,firstItem:null,lastItem:null,siblingRange:1,totalPages:e.pageCount,activePage:e.page,onPageChange:function(t,r){return e.selectPage(Number(r.activePage))}}):"","\xa0",0==e.loadingMessage.length?"":Object(a.jsxs)(O.a,{icon:!0,children:[Object(a.jsx)(q.a,{name:"circle notched",loading:!0}),Object(a.jsx)(O.a.Content,{children:e.loadingMessage})]})]})},U=function(e){Object(f.a)(r,e);var t=Object(g.a)(r);function r(e){var a;Object(d.a)(this,r),(a=t.call(this,e)).pageItemCount=20,a.categories=["gloves","facemasks","beanies"],a.selectPage=function(e){if(e<1)throw"Page must be greater than or equal to 1";a.setState({page:e}),a.updateProducts()},a.updateFilter=function(e){a.setState({filter:e,page:0}),a.updateProducts()},a.updateProducts=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.setState({loadingMessage:"Loading products...",products:[]}),e.next=3,I.getProducts(a.state.category,a.state.manufacturer,a.state.page,a.state.filter);case 3:t=e.sent,a.setState({products:t,loadingMessage:""});case 5:case"end":return e.stop()}}),e)}))),a.getCurrentPageCount=function(){return 1e5},a.selectProduct=function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Selected product: ",t),a.setState({selectedProduct:t});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.selectCategory=function(){var e=Object(l.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.state.category,a.setState({category:t,loadingMessage:"Loading manufacturers..."}),console.log("Enabled category: ",t),e.next=5,I.getManufacturers(t);case 5:if(r=e.sent,a.setState({manufacturers:r,loadingMessage:""}),0!=r.length){e.next=10;break}return window.alert("There seems to be an error accessing the API. Please try again."),e.abrupt("return");case 10:a.selectManufacturer(r[0]);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.selectManufacturer=function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({manufacturer:t,page:0}),console.log("Enabled manufacturer: ",t),a.updateProducts();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var n={};return a.categories.forEach((function(e){n[e]=[]})),a.state={loadingMessage:"",category:"",manufacturer:"",manufacturers:[],products:[],selectedProduct:null,page:1,filter:""},a}return Object(p.a)(r,[{key:"render",value:function(){return Object(a.jsx)("div",{children:Object(a.jsx)(j.a,{children:Object(a.jsx)(h.a,{centered:!0,columns:3,children:Object(a.jsx)(h.a.Column,{children:Object(a.jsxs)(b.a,{children:[Object(a.jsx)(F,{products:this.state.products,clickHandler:this.selectProduct}),Object(a.jsx)(x.a,{position:"left",children:Object(a.jsx)(B,{currentCategory:this.state.category,categories:this.categories,selectCategory:this.selectCategory,currentManufacturer:this.state.manufacturer,manufacturers:this.state.manufacturers,selectManufacturer:this.selectManufacturer,updateFilter:this.updateFilter,page:this.state.page,pageCount:this.getCurrentPageCount(),selectPage:this.selectPage,loadingMessage:this.state.loadingMessage})}),Object(a.jsx)(x.a,{position:"right",children:this.state.selectedProduct?Object(a.jsx)(E,{product:this.state.selectedProduct}):Object(a.jsx)(O.a,{children:Object(a.jsx)(O.a.Content,{children:"Select a product for more information"})})})]})})})})})}}]),r}(c.a.Component);var z=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(U,{})})};r(174);u.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(z,{})}),document.getElementById("root"))}},[[175,1,2]]]);
//# sourceMappingURL=main.9649f788.chunk.js.map