(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(14),u=t.n(c),o=t(4),l=t(2),i=function(e){var n=e.searchTerm,t=e.searchHandler;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.submitHandler,t=e.name,a=e.nameHandler,c=e.number,u=e.numberHandler;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:c,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.person,t=e.deleteHandler;return r.a.createElement("tr",null,r.a.createElement("td",null,n.name),r.a.createElement("td",null,n.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:t},"delete")))},f=function(e){var n=e.persons,t=e.deleteHandler;return r.a.createElement("table",null,r.a.createElement("tbody",null,n.map((function(e){return r.a.createElement(d,{key:e.name,person:e,deleteHandler:function(){return t(e.id)}})}))))},s=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.typeOfNotification},n.message)},b=t(3),h=t.n(b),E="/api/persons",p=function(){return h.a.get(E).then((function(e){return e.data}))},v=function(e){return h.a.post(E,e).then((function(e){return e.data}))},w=function(e,n){return h.a.put("".concat(E,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return h.a.delete("".concat(E,"/").concat(e),e).then((function(e){return e.data}))},j=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),d=Object(l.a)(u,2),b=d[0],h=d[1],E=Object(a.useState)(""),j=Object(l.a)(E,2),g=j[0],H=j[1],k=Object(a.useState)(""),y=Object(l.a)(k,2),C=y[0],S=y[1],N=Object(a.useState)(null),T=Object(l.a)(N,2),A=T[0],I=T[1];Object(a.useEffect)((function(){p().then((function(e){return c(e)}))}),[]);var J=function(e,n){I({message:e,typeOfNotification:n}),setTimeout((function(){return I(null)}),2e3)},L=0===C.trim().toLowerCase().length?t:t.filter((function(e){return e.name.trim().toLowerCase().includes(C)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{notification:A}),r.a.createElement(i,{searchTerm:C,searchHandler:function(e){S(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{submitHandler:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));if(n){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var a=Object(o.a)(Object(o.a)({},n),{},{number:g});w(n.id,a).then((function(e){J("Changed the number for ".concat(e.name),"success"),c(t.map((function(t){return t.id!==n.id?t:e})))}))}}else{var r={name:b.trim(),number:g.trim()};v(r).then((function(e){J("Added ".concat(e.name),"success"),c(t.concat(e)),h(""),H("")})).catch((function(e){J(e.response.data.error,"error")}))}},name:b,nameHandler:function(e){h(e.target.value)},number:g,numberHandler:function(e){H(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(f,{persons:L,deleteHandler:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("delete ".concat(n.name," ?"))&&O(e).then((function(a){var r=t.filter((function(n){return n.id!==e}));c(r),J("Person with name ".concat(n.name," was deleted"),"success")})).catch((function(a){c(t.filter((function(n){return n.id!==e}))),J("Information of ".concat(n.name," has already been removed from server"),"error")}))}}))};t(37);u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fe5704bf.chunk.js.map