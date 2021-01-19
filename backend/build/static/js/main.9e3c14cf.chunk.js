(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{147:function(e,t,a){},175:function(e,t,a){"use strict";a.r(t);var r=a(7),n=a(0),c=a.n(n),i=a(50),s=a.n(i),o=(a(147),a(24)),u=a.n(o),l=a(55),g=a(125),d=a(126),f=a(131),b=a(130),p=a(188),h=a(176),j=a(192),v=a(196),x=a(35),m=a(191),y=a(195),O=a(189),C=a(193),k=a(198),w=a(199),P=a(190),S=a(110),M=a.n(S),I=250,A=0,D=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,r,n,c,i=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=i.length>1&&void 0!==i[1]?i[1]:6,r=++A,n=0;case 3:if(!(n<a)){e.next=27;break}if(r===A){e.next=6;break}return e.abrupt("break",27);case 6:return console.log("API request for products (retries left: ".concat(a-1-n,"): "),t),e.prev=7,e.next=10,M.a.get(T(["products",t]));case 10:if(!((c=e.sent).status=200)){e.next=15;break}return e.abrupt("return",c.data);case 15:return console.log("Error fetchin product data: ",c),e.abrupt("return",[]);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(7),console.log("Error getting products: ",{category:t,message:e.t0.message,e:e.t0});case 22:return e.next=24,L(I);case 24:n++,e.next=3;break;case 27:return e.abrupt("return",[]);case 28:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,r,n,c,i=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=i.length>1&&void 0!==i[1]?i[1]:6,r=++A,n=0;case 3:if(!(n<a)){e.next=27;break}if(r===A){e.next=6;break}return e.abrupt("break",27);case 6:return console.log("API request for availability (retries left: ".concat(a-1-n,"): "),t),e.prev=7,e.next=10,M.a.get(T(["availability",t]));case 10:if(200!=(c=e.sent).status){e.next=15;break}return e.abrupt("return",c.data);case 15:return console.log("Error fetching availability data: ",c),e.abrupt("return",[]);case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(7),console.log("Error getting availability: ",{manufacturer:t,message:e.t0.message,e:e.t0});case 22:return e.next=24,L(I);case 24:n++,e.next=3;break;case 27:return e.abrupt("return",[]);case 28:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t){return e.apply(this,arguments)}}(),L=function(e){return new Promise((function(t){return setTimeout(t,e)}))},T=function(e){return"/api/"+e.join("/")},R={getCategoryProducts:D,getManufacturerAvailability:E},F=function(e){Object(f.a)(a,e);var t=Object(b.a)(a);function a(e){var n;Object(g.a)(this,a),(n=t.call(this,e)).pageItemCount=20,n.categories=["gloves","facemasks","beanies"],n.timer=null,n.filterUpdate="",n.leftRail=function(){var e=n.getCurrentPageCount();return Object(r.jsxs)("div",{children:[n.getCategoryDropdown(n.categories),n.getManufacturerDropdown(),"\xa0",Object(r.jsxs)(p.a,{icon:"search",style:{width:"272px"},onChange:function(e,t){return n.filterUpdate=t.value},children:[Object(r.jsx)("input",{}),Object(r.jsx)(h.a,{type:"submit",onClick:n.filterSearch,children:"Search"})]}),"\xa0",e>0?Object(r.jsx)(j.a,{style:{width:"272px"},boundaryRange:0,ellipsisItem:null,firstItem:null,lastItem:null,siblingRange:1,totalPages:e,activePage:n.state.page+1,onPageChange:function(e,t){n.setState({page:Number(t.activePage)-1})}}):"","\xa0",0==n.state.loadingMessage.length?"":Object(r.jsxs)(v.a,{icon:!0,children:[Object(r.jsx)(x.a,{name:"circle notched",loading:!0}),Object(r.jsx)(v.a.Content,{children:n.state.loadingMessage})]})]})},n.getCategoryDropdown=function(e){return Object(r.jsx)(m.a,{placeholder:"Select category",fluid:!0,selection:!0,value:n.state.category,onChange:function(e,t){return n.selectCategory(t.value)},options:e.map((function(e){return{key:e,text:n.categoryToString(e),value:e}}))})},n.getManufacturerDropdown=function(){var e=n.getAvailableManufacturers(n.state.products[n.state.category]);return Object(r.jsx)(m.a,{placeholder:"Select Manufacturer",fluid:!0,selection:!0,value:n.state.manufacturer,onChange:function(e,t){return n.selectManufacturer(t.value)},options:e.map((function(e){return{key:e,text:n.categoryToString(e),value:e}}))})},n.getProductListing=function(e){var t=n.state.page*n.pageItemCount;return e?Object(r.jsx)(y.a,{divided:!0,children:e.filter((function(e){return n.state.manufacturer==e.manufacturer&&e.name.toLocaleLowerCase().includes(n.state.filter.toLowerCase())})).slice(t,t+n.pageItemCount).map((function(e){var t=n.getProductAvailability(e);return Object(r.jsx)(y.a.Item,{onClick:function(){return n.selectProduct(e)},children:Object(r.jsxs)(y.a.Content,{children:[Object(r.jsx)(y.a.Header,{as:"a",children:e.name}),""==t?"":Object(r.jsxs)(y.a.Description,{children:["Availability: ",t]}),Object(r.jsxs)(y.a.Description,{children:["Price: ",e.price]})]})},e.id)}))}):void 0},n.getProductAvailability=function(e){if(!n.state.availability[e.manufacturer])return"";var t=n.state.availability[e.manufacturer][e.id];return t||"Error"},n.productInfo=function(e){return e?Object(r.jsx)(O.a,{children:Object(r.jsx)(C.a,{children:Object(r.jsxs)(C.a.Content,{children:[Object(r.jsx)(C.a.Header,{children:e.name}),Object(r.jsxs)(C.a.Description,{children:["Availability: ",n.getProductAvailability(e)]}),Object(r.jsxs)(C.a.Description,{children:["Price: ",e.price]}),Object(r.jsxs)(C.a.Description,{children:["Manufacturer: ",e.manufacturer]}),Object(r.jsxs)(C.a.Description,{children:["Color: ",e.color.join(", ")]}),Object(r.jsxs)(C.a.Description,{children:["Type: ",e.type]}),Object(r.jsxs)(C.a.Description,{children:["ID: ",e.id]})]})})}):Object(r.jsx)(v.a,{children:"Select a product to view more info"})},n.filterSearch=function(){n.setState({filter:n.filterUpdate,page:0})},n.getCurrentPageCount=function(){var e=n.state.products[n.state.category];return e?Math.ceil(e.length/n.pageItemCount):0},n.selectProduct=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Selected product: ",t),n.setState({selectedProduct:t});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.selectCategory=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,r,c,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.state.category,!(n.state.products[t].length>0)){e.next=4;break}return n.setState({category:t,page:0}),e.abrupt("return");case 4:return n.setState({category:t,loadingMessage:"Loading products...",page:0}),console.log("Enabled category: ",t),e.next=8,R.getCategoryProducts(t);case 8:if(0!=(r=e.sent.sort((function(e,t){return e.name.localeCompare(t.name)}))).length){e.next=13;break}return window.alert("There seems to be a problem accessing the database. Please try again later."),n.setState({category:a,loadingMessage:""}),e.abrupt("return");case 13:c=r.length>0?n.getAvailableManufacturers(r)[0]:"",(i=n.state.products)[t]=r,n.setState({products:i,loadingMessage:""}),n.selectManufacturer(c);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.selectManufacturer=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,r,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("Selected manufacturer: ",t),""!=t){e.next=3;break}return e.abrupt("return");case 3:if(!n.state.availability[t]){e.next=7;break}return console.log("Already got information from manufacturer: ",t),n.setState({manufacturer:t,page:0}),e.abrupt("return");case 7:return n.setState({manufacturer:t,loadingMessage:"Loading stock data...",page:0}),e.next=10,R.getManufacturerAvailability(t);case 10:if(0!=(a=e.sent).length){e.next=14;break}return t===n.state.manufacturer&&window.alert("The availability data could not be accessed. There might be a problem with the database. Please try again later."),e.abrupt("return");case 14:console.log("Received availability array: ",a),r={},a.forEach((function(e){r[e.id.toLowerCase()]=e.availability})),(c=n.state.availability)[t]=r,n.setState({availability:c,loadingMessage:""});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.getAvailableManufacturers=function(e){if(!e)return[];var t=new Set;e.forEach((function(e){t.add(e.manufacturer)}));var a=[];return t.forEach((function(e){a.push(e)})),a.sort()},n.categoryToString=function(e){return e.substring(0,1).toUpperCase()+e.substring(1)};var c={};return n.categories.forEach((function(e){c[e]=[]})),n.state={message:"",loadingMessage:"",category:"",manufacturer:"",selectedProduct:null,products:c,availability:{},page:0,filter:""},n}return Object(d.a)(a,[{key:"render",value:function(){var e=this;return Object(r.jsx)("div",{children:Object(r.jsx)(O.a,{children:Object(r.jsx)(k.a,{centered:!0,columns:3,children:Object(r.jsx)(k.a.Column,{children:Object(r.jsxs)(w.a,{children:[""==this.state.message?"":Object(r.jsx)(v.a,{onClick:function(){return e.setState({message:""})},children:Object(r.jsx)(v.a.Content,{children:this.state.filter})}),this.getProductListing(this.state.products[this.state.category]),Object(r.jsx)(P.a,{position:"left",children:this.leftRail()}),Object(r.jsx)(P.a,{position:"right",children:this.productInfo(this.state.selectedProduct)})]})})})})})}}]),a}(c.a.Component);var U=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(F,{})})},q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,200)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),c(e),i(e)}))};a(173),a(174);s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(U,{})}),document.getElementById("root")),q()}},[[175,1,2]]]);
//# sourceMappingURL=main.9e3c14cf.chunk.js.map