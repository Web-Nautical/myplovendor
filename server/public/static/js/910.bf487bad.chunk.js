"use strict";(self.webpackChunkberry_material_react_free=self.webpackChunkberry_material_react_free||[]).push([[910],{6681:function(e,s,t){t.r(s),t.d(s,{default:function(){return M}});var n=t(9836),i=t(2791),a=t(6151),l=t(3382),d=t(3994),r=t(6890),c=t(5855),o=t(3735),m=t(5193),h=t(1889),u=t(9281),x=t(9202),j=t(7407),p=t(9276),f=t(6934),y=t(5289),g=t(5661),Z=t(9157),b=t(3400),N=t(9823),C=t(3967),v=t(8096),P=t(8029),I=t(9321),A=t(3786),S=t(5766),E=t(5985),k=(t(5462),t.p+"static/media/bankloader.81e4bae9e6debe2ca0ee.gif"),W=t(184);let _=new S.s;const T=(0,f.ZP)(y.Z)((e=>{let{theme:s}=e;return{"& .MuiDialogContent-root":{padding:s.spacing(2)},"& .MuiDialogActions-root":{padding:s.spacing(1)}}})),O=["Oliver Hansen","Van Henry","April Tucker"];function w(e){const{children:s,onClose:t,...n}=e;return(0,W.jsxs)(g.Z,{sx:{m:0,p:2},...n,className:"heading-modal",children:[s,t?(0,W.jsx)(b.Z,{"aria-label":"close",onClick:t,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]},children:(0,W.jsx)(N.Z,{})}):null]})}function B(e,s,t,n,i){return{name:e,calories:s,fat:t,carbs:n,protein:i}}const D=[B("Gigs Name","March 3, 2023","Anshul","$1000",123456),B("Gigs Name","March 3, 2023","Anshul","$1000",123456),B("Gigs Name","March 3, 2023","Anshul","$1000",123456)];var M=()=>{const[e,s]=i.useState([]),[t,f]=(0,i.useState)([]),[y,g]=(0,i.useState)(!1),b=(0,i.useRef)(!0);(0,i.useEffect)((()=>{b.current&&q(),b.current=!1}),[]);const N=e=>{const{target:{value:t}}=e;s("string"===typeof t?t.split(","):t)},[S,B]=(0,i.useState)({country:"",email:"",firstname:"",lastname:"",dateofbirth:"",companyname:"",address:"",address1:"",city:"",state:"",country:"",postalcode:"",accountholdername:"",accountnumber:"",routingnumber:""}),[M,R]=i.useState(!1),[z,F]=i.useState(!1),[G,H]=(0,i.useState)("company"),[L,U]=(0,i.useState)(0),V=(0,C.Z)(),$=(0,m.Z)(V.breakpoints.down("sm")),q=()=>{_.getvendorbankdataRequest({}).then((e=>{"success"==e.data.status&&f(e.data.data)}))},X=()=>{R(!1)},Y=()=>{_.checkvendoraccountstripe().then((e=>{"success"==e.data.status&&"ACCOUNT EXISTS"==e.data.message?(F(!0),U(1),R(!1)):"success"==e.data.status&&"ACCOUNT NOT EXISTS"==e.data.message&&(F(!0),U(0),R(!1))}))},J=()=>{F(!1)},K=e=>{const s=e.target.name,t=e.target.value;B({...S,[s]:t}),console.log(t)};return(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(E.Ix,{}),(0,W.jsxs)(h.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:[(0,W.jsx)("div",{className:"section-tittle",children:(0,W.jsxs)("typography",{variant:"h1",className:"tittle",sx:{pt:0},children:[(0,W.jsx)("span",{class:"shape"}),"Payments"]})}),(0,W.jsx)("button",{className:"paymentMethord",onClick:()=>{R(!0)},children:"Payment method"})]}),(0,W.jsx)(p.Z,{className:"boxtbale mt-0",children:(0,W.jsx)(u.Z,{children:(0,W.jsxs)(n.Z,{"aria-label":"simple table",children:[(0,W.jsx)(r.Z,{children:(0,W.jsxs)(c.Z,{children:[(0,W.jsx)(d.Z,{children:"Gigs title"}),(0,W.jsx)(d.Z,{align:"center",children:"Date"}),(0,W.jsx)(d.Z,{align:"center",children:"Buyer Name"}),(0,W.jsx)(d.Z,{align:"center",children:"Payment Received"}),(0,W.jsx)(d.Z,{align:"center",children:"Transaction ID"})]})}),(0,W.jsx)(l.Z,{children:D.map((e=>(0,W.jsxs)(c.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,W.jsx)(d.Z,{component:"th",scope:"row",children:e.name}),(0,W.jsx)(d.Z,{align:"center",children:e.calories}),(0,W.jsx)(d.Z,{align:"center",children:e.fat}),(0,W.jsx)(d.Z,{align:"center",children:e.carbs}),(0,W.jsx)(d.Z,{align:"center",children:e.protein})]},e.name)))})]})})}),(0,W.jsx)(o.Z,{children:(0,W.jsx)(h.ZP,{container:!0,children:(0,W.jsx)("div",{className:"nn_edit_sellpromain",children:(0,W.jsxs)("div",{className:"cls_product-list",children:[(0,W.jsx)("div",{class:"nn_edit_proname",children:"Add Payment Method"}),(0,W.jsx)("div",{className:"product-list nn_edit_sellpro",children:(0,W.jsxs)("div",{className:"cls_card-body",children:[(0,W.jsx)("p",{children:"When you receive a payment for a reservation, we call that payment to you a \u201cpayout\u201d. Our secure payment system supports several payout methods, which can be setup and edited here. Your available payout options and currencies differ by country."}),(0,W.jsxs)("div",{className:"table-responsive",children:[(0,W.jsxs)("table",{className:"table table-striped",children:[(0,W.jsx)("thead",{children:(0,W.jsxs)("tr",{className:"text-truncate",children:[(0,W.jsx)("th",{children:"Account Holder Name"}),(0,W.jsx)("th",{children:"Account Number"}),(0,W.jsx)("th",{children:"Routing Number"}),(0,W.jsx)("th",{children:"\xa0"})]})}),(0,W.jsx)("tbody",{children:t.map((e=>(0,W.jsxs)("tr",{children:[(0,W.jsx)("td",{children:e.accountholdername}),(0,W.jsx)("td",{children:e.accountnumber}),(0,W.jsx)("td",{children:e.accountroutingnumber}),(0,W.jsxs)("td",{className:"cls_payout_options",children:[(0,W.jsx)("button",{onClick:s=>(e=>{const s={bankAccountId:e};_.deletevendorstripebankdata(s).then((e=>{"success"==e.data.status?(q(),(0,E.Am)("Payment Details Deleted Successfully",{position:E.Am.POSITION.TOP_CENTER})):"error"==e.data.status&&(0,E.Am)(e.data.message,{position:E.Am.POSITION.TOP_CENTER})}))})(e.stripebankaccountid),children:(0,W.jsx)(j.Z,{style:{color:"#000"}})}),(0,W.jsx)("button",{children:(0,W.jsx)(x.Z,{style:{color:"#f53956"}})})]})]})))})]}),(0,W.jsx)("div",{style:{width:"100%"},children:(0,W.jsx)("button",{onClick:Y,className:"cls_addpayout",children:"Add Payment Method"})})]})]})})]})})})}),(0,W.jsxs)(T,{className:"modaouter",fullScreen:$,onClose:X,"aria-labelledby":"customized-dialog-title",open:M,children:[(0,W.jsx)(w,{id:"customized-dialog-title",onClose:X,children:"Add Payout Method"}),(0,W.jsx)(Z.Z,{dividers:!0,children:(0,W.jsx)("form",{children:(0,W.jsx)(h.ZP,{container:!0,spacing:1,justifyContent:"center",alignItems:"center",children:(0,W.jsxs)(h.ZP,{item:!0,md:12,justifyContent:"center",alignItems:"center",children:[(0,W.jsxs)(h.ZP,{container:!0,spacing:1.5,className:"form-inpitcustom",children:[(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsxs)(I.Z,{displayEmpty:!0,value:e,onChange:N,input:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled"}),renderValue:e=>0===e.length?(0,W.jsx)("em",{className:"palceholdercss",children:" Choose Country"}):e.join(", "),children:[(0,W.jsx)(A.Z,{disabled:!0,value:"",className:"palceholdercss",children:"Choose Country"}),O.map((e=>(0,W.jsx)(A.Z,{value:e,children:e},e)))]})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Address",className:"form-inpitcustomfiled"})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Address",className:"form-inpitcustomfiled"})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsxs)(I.Z,{displayEmpty:!0,value:e,onChange:N,input:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled"}),renderValue:e=>0===e.length?(0,W.jsx)("em",{className:"palceholdercss",children:" Choose Category"}):e.join(", "),children:[(0,W.jsx)(A.Z,{disabled:!0,value:"",className:"palceholdercss",children:"Choose Category"}),O.map((e=>(0,W.jsx)(A.Z,{value:e,children:e},e)))]})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled",placeholder:"State / Province"})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled",placeholder:"Location"})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled",placeholder:"Phone Number"})})}),(0,W.jsx)(h.ZP,{item:!0,xs:12,sm:6,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled",placeholder:"--/--/--"})})})]}),(0,W.jsx)(h.ZP,{container:!0,xs:12,sm:6,alignItems:"center",justifyContent:"center",textAlign:"center",margin:"20px auto 0px",children:(0,W.jsx)(a.Z,{className:"addgigs",children:"Add"})})]})})})})]}),(0,W.jsxs)(T,{className:"modaouter-2",fullScreen:$,onClose:X,"aria-labelledby":"customized-dialog-title",open:M,children:[(0,W.jsx)(w,{id:"customized-dialog-title",onClose:X,children:"Add Payout Method"}),(0,W.jsxs)(Z.Z,{dividers:!0,children:[(0,W.jsxs)("div",{children:[(0,W.jsx)("p",{className:"mt-0",children:"Payouts for sells are released once the product(s) is delivered. The buyer has 2 days (48 hours) to inspect it before the sale is final. If there are no issues and the product(s) is as expected, payment will be deposited into your account within 5 business days. Your bank may require additional processing time. We can send money to you via one of the following methods, which do you prefer?"}),(0,W.jsx)("p",{children:"We can send money to people with these payout methods. Which do you prefer"})]}),(0,W.jsx)("div",{className:"table-responsive",children:(0,W.jsxs)("table",{id:"payout_method_descriptions",className:"table table-striped",children:[(0,W.jsx)("thead",{children:(0,W.jsxs)("tr",{children:[(0,W.jsx)("th",{}),(0,W.jsx)("th",{children:"Payout Method"}),(0,W.jsx)("th",{children:"Processing time"}),(0,W.jsx)("th",{children:"Additional fees"}),(0,W.jsx)("th",{children:"Currency"}),(0,W.jsx)("th",{children:"Details"})]})}),(0,W.jsx)("tbody",{children:(0,W.jsxs)("tr",{children:[(0,W.jsx)("td",{children:(0,W.jsx)("input",{type:"radio",value:"Stripe",name:"payout_method"})}),(0,W.jsx)("td",{className:"type",children:"Stripe"}),(0,W.jsx)("td",{children:"5-7 business days"}),(0,W.jsx)("td",{children:"None"}),(0,W.jsx)("td",{children:"USD"}),(0,W.jsx)("td",{children:"Business day processing only; weekends and banking holidays may cause delays"})]})})]})}),(0,W.jsx)(h.ZP,{container:!0,xs:12,sm:6,alignItems:"center",justifyContent:"center",textAlign:"center",margin:"20px auto 0px",children:(0,W.jsx)(a.Z,{className:"addgigs",onClick:Y,children:"Next"})})]})]}),(0,W.jsxs)(T,{fullScreen:$,onClose:J,"aria-labelledby":"customized-dialog-title",open:z,children:[0==L?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(w,{id:"customized-dialog-title",onClose:J,children:"Payment Details"}),(0,W.jsx)(Z.Z,{dividers:!0,children:(0,W.jsx)(o.Z,{className:"outer-divv",children:(0,W.jsx)("form",{id:"form-file-upload",onSubmit:e=>e.preventDefault(),children:(0,W.jsx)(h.ZP,{container:!0,spacing:1,justifyContent:"center",alignItems:"center",children:0==y?(0,W.jsxs)(h.ZP,{item:!0,md:8,justifyContent:"center",alignItems:"center",children:[(0,W.jsxs)(h.ZP,{container:!0,spacing:1,children:[(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsxs)(I.Z,{displayEmpty:!0,value:G,onChange:K,input:(0,W.jsx)(P.Z,{className:"form-inpitcustomfiled"}),children:[(0,W.jsx)(A.Z,{disabled:!0,value:"",className:"palceholdercss",children:"Business Type"}),(0,W.jsx)(A.Z,{value:"company",onClick:e=>H("company"),children:"Company"}),(0,W.jsx)(A.Z,{value:"individual",onClick:e=>H("individual"),children:"Individual"})]})})}),"individual"==G?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(h.ZP,{item:!0,sm:6,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"First Name",className:"form-inpitcustomfiled",name:"firstname",id:"firstname",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:6,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Last Name",className:"form-inpitcustomfiled",name:"lastname",id:"lastname",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Date of Birth",type:"date",className:"form-inpitcustomfiled",name:"dateofbirth",id:"dateofbirth",onChange:K})})})]}):"","company"==G?(0,W.jsx)(W.Fragment,{children:(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Company Name",className:"form-inpitcustomfiled",name:"companyname",id:"companyname",onChange:K})})})}):"",(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Address Line1",className:"form-inpitcustomfiled",name:"address",id:"address",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Address Line2",className:"form-inpitcustomfiled",name:"address1",id:"address1",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:6,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"City",className:"form-inpitcustomfiled",name:"city",id:"city",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:6,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"State",className:"form-inpitcustomfiled",name:"state",id:"state",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:6,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Postal Code",className:"form-inpitcustomfiled",name:"postalcode",id:"postalcode",onChange:K})})})]}),(0,W.jsx)(h.ZP,{container:!0,xs:12,sm:6,alignItems:"center",justifyContent:"center",textAlign:"center",margin:"20px auto 0px",children:(0,W.jsx)(a.Z,{className:"addgigs",onClick:()=>{if("individual"==G){if(""==S.firstname)return document.getElementById("firstname").style.border="3px solid red",!1;if(""==S.lastname)return document.getElementById("lastname").style.border="3px solid red",!1;if(""==S.dateofbirth)return document.getElementById("dateofbirth").style.border="3px solid red",!1}else if(""==S.companyname)return document.getElementById("companyname").style.border="3px solid red",!1;if(""==S.address)return document.getElementById("address").style.border="3px solid red",!1;if(""==S.city)return document.getElementById("city").style.border="3px solid red",!1;if(""==S.state)return document.getElementById("state").style.border="3px solid red",!1;if(""==S.postalcode)return document.getElementById("postalcode").style.border="3px solid red",!1;g(!0);const e={email:S.email,vendorbusinesstype:G,vendorcompanyname:S.companyname,vendorfirstname:S.firstname,vendorlastname:S.lastname,vendordob:S.dateofbirth,addressline1:S.address,addressline2:S.address1,addresscity:S.city,addressstate:S.state,addresspostalcode:S.postalcode};_.addvendorstripedata(e).then((e=>{"success"==e.data.status?(U(L+1),g(!1)):"error"==e.data.status&&(g(!1),(0,E.Am)(e.data.message,{position:E.Am.POSITION.TOP_CENTER}))}))},children:"Save"})})]}):(0,W.jsx)("img",{src:k,alt:"img",width:"90%"})})})})})]}):"",1==L?(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(w,{id:"customized-dialog-title",onClose:J,children:"Enter Bank Details"}),(0,W.jsx)(Z.Z,{dividers:!0,children:(0,W.jsx)(o.Z,{className:"outer-divv",children:(0,W.jsx)("form",{id:"form-file-upload",onSubmit:e=>e.preventDefault(),children:(0,W.jsx)(h.ZP,{container:!0,spacing:1,justifyContent:"center",alignItems:"center",children:0==y?(0,W.jsxs)(h.ZP,{item:!0,md:8,justifyContent:"center",alignItems:"center",children:[(0,W.jsxs)(h.ZP,{container:!0,spacing:1,children:[(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Acount Holder Name",className:"form-inpitcustomfiled",name:"accountholdername",id:"accountholdername",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Account Number",className:"form-inpitcustomfiled",name:"accountnumber",id:"accountnumber",onChange:K})})}),(0,W.jsx)(h.ZP,{item:!0,sm:12,xs:12,children:(0,W.jsx)(v.Z,{fullWidth:!0,children:(0,W.jsx)(P.Z,{placeholder:"Routing Number",className:"form-inpitcustomfiled",name:"routingnumber",id:"routingnumber",onChange:K})})})]}),(0,W.jsx)(h.ZP,{container:!0,xs:12,sm:6,alignItems:"center",justifyContent:"center",textAlign:"center",margin:"20px auto 0px",children:(0,W.jsx)(a.Z,{className:"addgigs",onClick:()=>{if(""==S.accountholdername)return document.getElementById("accountholdername").style.border="3px solid red",!1;if(""==S.accountnumber)return document.getElementById("accountnumber").style.border="3px solid red",!1;""==S.routingnumber&&(document.getElementById("routingnumber").style.border="3px solid red");const e={accountholdername:S.accountholdername,accountnumber:S.accountnumber,accountroutingnumber:S.routingnumber};g(!0),_.addvendorstripebankdata(e).then((e=>{"success"==e.data.status?(q(),g(!1),F(!1),(0,E.Am)("Payment Details Added Successfully",{position:E.Am.POSITION.TOP_CENTER})):"error"==e.data.status&&(g(!1),(0,E.Am)(e.data.message,{position:E.Am.POSITION.TOP_CENTER}))}))},children:"Save"})})]}):(0,W.jsx)("img",{src:k,alt:"img",width:"90%"})})})})})]}):""]})]})}}}]);
//# sourceMappingURL=910.bf487bad.chunk.js.map