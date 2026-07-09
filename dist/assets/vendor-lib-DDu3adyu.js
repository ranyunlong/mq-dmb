import{r as Fe,a as N}from"./vendor-core--1RAViDk.js";var se={exports:{}},ae={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fe;function Ve(){if(fe)return ae;fe=1;var i=Fe();function e(d,f){return d===f&&(d!==0||1/d===1/f)||d!==d&&f!==f}var t=typeof Object.is=="function"?Object.is:e,s=i.useState,a=i.useEffect,n=i.useLayoutEffect,r=i.useDebugValue;function o(d,f){var g=f(),p=s({inst:{value:g,getSnapshot:f}}),k=p[0].inst,b=p[1];return n(function(){k.value=g,k.getSnapshot=f,l(k)&&b({inst:k})},[d,g,f]),a(function(){return l(k)&&b({inst:k}),d(function(){l(k)&&b({inst:k})})},[d]),r(g),g}function l(d){var f=d.getSnapshot;d=d.value;try{var g=f();return!t(d,g)}catch{return!0}}function c(d,f){return f()}var u=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?c:o;return ae.useSyncExternalStore=i.useSyncExternalStore!==void 0?i.useSyncExternalStore:u,ae}var ge;function Te(){return ge||(ge=1,se.exports=Ve()),se.exports}var He=Te();/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=i=>i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),qe=i=>i.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,s)=>s?s.toUpperCase():t.toLowerCase()),ye=i=>{const e=qe(i);return e.charAt(0).toUpperCase()+e.slice(1)},Re=(...i)=>i.filter((e,t,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===t).join(" ").trim(),De=i=>{for(const e in i)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ue={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=N.forwardRef(({color:i="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:s,className:a="",children:n,iconNode:r,...o},l)=>N.createElement("svg",{ref:l,...Ue,width:e,height:e,stroke:i,strokeWidth:s?Number(t)*24/Number(e):t,className:Re("lucide",a),...!n&&!De(o)&&{"aria-hidden":"true"},...o},[...r.map(([c,u])=>N.createElement(c,u)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(i,e)=>{const t=N.forwardRef(({className:s,...a},n)=>N.createElement(Ke,{ref:n,iconNode:e,className:Re(`lucide-${Ie(ye(i))}`,`lucide-${i}`,s),...a}));return t.displayName=ye(i),t};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Aa=h("activity",Be);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"m7 7 10 10",key:"1fmybs"}],["path",{d:"M17 7v10H7",key:"6fjiku"}]],Fa=h("arrow-down-right",Ze);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],Va=h("arrow-left",We);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ta=h("arrow-right",Je);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]],Ha=h("arrow-up-right",Ge);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ia=h("badge-alert",Ye);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],qa=h("bell",Qe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",key:"lc1i9w"}],["path",{d:"m7 16.5-4.74-2.85",key:"1o9zyk"}],["path",{d:"m7 16.5 5-3",key:"va8pkn"}],["path",{d:"M7 16.5v5.17",key:"jnp8gn"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",key:"8zsnat"}],["path",{d:"m17 16.5-5-3",key:"8arw3v"}],["path",{d:"m17 16.5 4.74-2.85",key:"8rfmw"}],["path",{d:"M17 16.5v5.17",key:"k6z78m"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",key:"1xygjf"}],["path",{d:"M12 8 7.26 5.15",key:"1vbdud"}],["path",{d:"m12 8 4.74-2.85",key:"3rx089"}],["path",{d:"M12 13.5V8",key:"1io7kd"}]],Da=h("boxes",Xe);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M10 12h4",key:"a56b0p"}],["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",key:"secmi2"}],["path",{d:"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",key:"16ra0t"}]],Ua=h("building-2",et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",key:"cabbwy"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]],Ka=h("building",tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],Ba=h("calendar-days",st);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Za=h("calendar",at);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Wa=h("camera",nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ja=h("check",it);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Ga=h("chevron-down",rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Ya=h("chevron-left",ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Qa=h("chevron-right",ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Xa=h("chevron-up",lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],en=h("chevrons-up-down",ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],tn=h("circle-alert",dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],sn=h("circle-check",ut);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],an=h("circle-x",pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],nn=h("circle",ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"M11 14h10",key:"1w8e9d"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344",key:"1e62lh"}],["path",{d:"m17 18 4-4-4-4",key:"z2g111"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113",key:"bjbb7m"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1",key:"ublpy"}]],rn=h("clipboard-paste",gt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],on=h("clock",yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]],cn=h("cloud",kt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",key:"1uwlt4"}],["path",{d:"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z",key:"10291m"}],["path",{d:"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z",key:"1tqoq1"}],["path",{d:"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z",key:"1x6lto"}]],ln=h("component",mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],hn=h("copy",xt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],dn=h("cpu",vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],un=h("credit-card",bt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],pn=h("download",Mt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]],fn=h("ellipsis-vertical",wt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],gn=h("ellipsis",_t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],yn=h("external-link",St);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],kn=h("eye-off",Nt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],mn=h("eye",$t);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M17.5 22h.5a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",key:"rslqgf"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M2 19a2 2 0 1 1 4 0v1a2 2 0 1 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 1 1-4 0v-1a2 2 0 1 1 4 0",key:"9f7x3i"}]],xn=h("file-audio",Lt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["circle",{cx:"10",cy:"12",r:"2",key:"737tya"}],["path",{d:"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22",key:"wt3hpn"}]],vn=h("file-image",Ct);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z",key:"1mlx9k"}],["path",{d:"M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",key:"1tzo1f"}]],bn=h("file-play",Ot);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],Mn=h("file-spreadsheet",Rt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],wn=h("file-text",Pt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]],_n=h("file",jt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}],["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],Sn=h("folder-plus",Et);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]],Nn=h("folder-tree",zt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],$n=h("folder",At);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],Ln=h("funnel",Ft);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],Cn=h("globe",Vt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 12h18",key:"1i2n21"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}]],On=h("grid-2x2",Tt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ht=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],Rn=h("grid-3x3",Ht);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]],Pn=h("hard-drive",It);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],jn=h("history",qt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],En=h("image",Dt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],zn=h("info",Ut);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=[["path",{d:"m5 8 6 6",key:"1wu5hv"}],["path",{d:"m4 14 6-6 2-3",key:"1k1g8d"}],["path",{d:"M2 5h12",key:"or177f"}],["path",{d:"M7 2h1",key:"1t2jsx"}],["path",{d:"m22 22-5-10-5 10",key:"don7ne"}],["path",{d:"M14 18h6",key:"1m8k6r"}]],An=h("languages",Kt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Fn=h("layers",Bt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Vn=h("layout-dashboard",Zt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["rect",{width:"18",height:"7",x:"3",y:"3",rx:"1",key:"f1a2em"}],["rect",{width:"9",height:"7",x:"3",y:"14",rx:"1",key:"jqznyg"}],["rect",{width:"5",height:"7",x:"16",y:"14",rx:"1",key:"q5h2i8"}]],Tn=h("layout-template",Wt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],Hn=h("link",Jt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M3 5h.01",key:"18ugdj"}],["path",{d:"M3 12h.01",key:"nlz23k"}],["path",{d:"M3 19h.01",key:"noohij"}],["path",{d:"M8 5h13",key:"1pao27"}],["path",{d:"M8 12h13",key:"1za7za"}],["path",{d:"M8 19h13",key:"m83p4d"}]],In=h("list",Gt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],qn=h("lock",Yt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],Dn=h("mail",Qt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Un=h("map-pin",Xt);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const es=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],Kn=h("maximize-2",es);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],Bn=h("maximize",ts);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ss=[["path",{d:"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z",key:"vbtd3f"}],["path",{d:"M12 17v4",key:"1riwvh"}],["path",{d:"M8 21h8",key:"1ev6f3"}],["rect",{x:"2",y:"3",width:"20",height:"14",rx:"2",key:"x3v2xh"}]],Zn=h("monitor-play",ss);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],Wn=h("monitor",as);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ns=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],Jn=h("moon",ns);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const is=[["path",{d:"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",key:"edeuup"}]],Gn=h("mouse-pointer-2",is);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rs=[["path",{d:"M9 18V5l12-2v13",key:"1jmyc2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["circle",{cx:"18",cy:"16",r:"3",key:"1hluhg"}]],Yn=h("music",rs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const os=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],Qn=h("network",os);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cs=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],Xn=h("package",cs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ls=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],ei=h("palette",ls);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hs=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}]],ti=h("panel-left",hs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ds=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],si=h("panels-top-left",ds);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],ai=h("pen",us);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ps=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],ni=h("play",ps);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],ii=h("plus",fs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gs=[["path",{d:"M18.36 6.64A9 9 0 0 1 20.77 15",key:"dxknvb"}],["path",{d:"M6.16 6.16a9 9 0 1 0 12.68 12.68",key:"1x7qb5"}],["path",{d:"M12 2v4",key:"3427ic"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],ri=h("power-off",gs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=[["path",{d:"M12 2v10",key:"mnfbl"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04",key:"obofu9"}]],oi=h("power",ys);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=[["path",{d:"M21 7v6h-6",key:"3ptur4"}],["path",{d:"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",key:"1kgawr"}]],ci=h("redo",ks);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ms=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],li=h("refresh-cw",ms);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],hi=h("rotate-ccw",xs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],di=h("save",vs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=[["circle",{cx:"6",cy:"6",r:"3",key:"1lh9wr"}],["path",{d:"M8.12 8.12 12 12",key:"1alkpv"}],["path",{d:"M20 4 8.12 15.88",key:"xgtan2"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M14.8 14.8 20 20",key:"ptml3r"}]],ui=h("scissors",bs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],pi=h("search",Ms);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=[["path",{d:"M14 17H5",key:"gfn3mx"}],["path",{d:"M19 7h-9",key:"6i9tg"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]],fi=h("settings-2",ws);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],gi=h("settings",_s);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]],yi=h("shapes",Ss);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ns=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],ki=h("share-2",Ns);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],mi=h("shield-check",$s);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],xi=h("shield",Ls);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cs=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],vi=h("shopping-cart",Cs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],bi=h("sparkles",Os);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=[["path",{d:"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",key:"2acyp4"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Mi=h("square-check-big",Rs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],wi=h("square-pen",Ps);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],_i=h("sun",js);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Si=h("tag",Es);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Ni=h("target",zs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]],$i=h("terminal",As);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Li=h("trash-2",Fs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],Ci=h("tv",Vs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts=[["path",{d:"M12 4v16",key:"1654pz"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",key:"e0r10z"}],["path",{d:"M9 20h6",key:"s66wpe"}]],Oi=h("type",Ts);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=[["path",{d:"M3 7v6h6",key:"1v2h90"}],["path",{d:"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",key:"1r6uu6"}]],Ri=h("undo",Hs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71",key:"yqzxt4"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71",key:"4qinb0"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5",key:"1041cp"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8",key:"14m1p5"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22",key:"rzdirn"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16",key:"ox905f"}]],Pi=h("unlink",Is);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],ji=h("upload",qs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["circle",{cx:"10",cy:"7",r:"1",key:"dypaad"}],["circle",{cx:"4",cy:"20",r:"1",key:"22iqad"}],["path",{d:"M4.7 19.3 19 5",key:"1enqfc"}],["path",{d:"m21 3-3 1 2 2Z",key:"d3ov82"}],["path",{d:"M9.26 7.68 5 12l2 5",key:"1esawj"}],["path",{d:"m10 14 5 2 3.5-3.5",key:"v8oal5"}],["path",{d:"m18 12 1-1 1 1-1 1Z",key:"1bh22v"}]],Ei=h("usb",Ds);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],zi=h("user-check",Us);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]],Ai=h("user-plus",Ks);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Fi=h("user",Bs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zs=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Vi=h("users",Zs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],Ti=h("video",Ws);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],Hi=h("volume-2",Js);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ii=h("x",Gs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ys=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],qi=h("zap",Ys);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Di=h("zoom-in",Qs);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Ui=h("zoom-out",Xs),y=i=>typeof i=="string",K=()=>{let i,e;const t=new Promise((s,a)=>{i=s,e=a});return t.resolve=i,t.reject=e,t},ke=i=>i==null?"":String(i),ea=(i,e,t)=>{i.forEach(s=>{e[s]&&(t[s]=e[s])})},ta=/###/g,me=i=>i&&i.includes("###")?i.replace(ta,"."):i,xe=i=>!i||y(i),B=(i,e,t)=>{const s=y(e)?e.split("."):e;let a=0;for(;a<s.length-1;){if(xe(i))return{};const n=me(s[a]);!i[n]&&t&&(i[n]=new t),Object.prototype.hasOwnProperty.call(i,n)?i=i[n]:i={},++a}return xe(i)?{}:{obj:i,k:me(s[a])}},ve=(i,e,t)=>{const{obj:s,k:a}=B(i,e,Object);if(s!==void 0||e.length===1){s[a]=t;return}let n=e[e.length-1],r=e.slice(0,e.length-1),o=B(i,r,Object);for(;o.obj===void 0&&r.length;)n=`${r[r.length-1]}.${n}`,r=r.slice(0,r.length-1),o=B(i,r,Object),o!=null&&o.obj&&typeof o.obj[`${o.k}.${n}`]<"u"&&(o.obj=void 0);o.obj[`${o.k}.${n}`]=t},sa=(i,e,t,s)=>{const{obj:a,k:n}=B(i,e,Object);a[n]=a[n]||[],a[n].push(t)},Q=(i,e)=>{const{obj:t,k:s}=B(i,e);if(t&&Object.prototype.hasOwnProperty.call(t,s))return t[s]},aa=(i,e,t)=>{const s=Q(i,t);return s!==void 0?s:Q(e,t)},Pe=(i,e,t)=>{for(const s in e)s!=="__proto__"&&s!=="constructor"&&(s in i?y(i[s])||i[s]instanceof String||y(e[s])||e[s]instanceof String?t&&(i[s]=e[s]):Pe(i[s],e[s],t):i[s]=e[s]);return i},F=i=>i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),na={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},ia=i=>y(i)?i.replace(/[&<>"'\/]/g,e=>na[e]):i;class ra{constructor(e){this.capacity=e,this.regExpMap=new Map,this.regExpQueue=[]}getRegExp(e){const t=this.regExpMap.get(e);if(t!==void 0)return t;const s=new RegExp(e);return this.regExpQueue.length===this.capacity&&this.regExpMap.delete(this.regExpQueue.shift()),this.regExpMap.set(e,s),this.regExpQueue.push(e),s}}const oa=[" ",",","?","!",";"],ca=new ra(20),la=(i,e,t)=>{e=e||"",t=t||"";const s=oa.filter(r=>!e.includes(r)&&!t.includes(r));if(s.length===0)return!0;const a=ca.getRegExp(`(${s.map(r=>r==="?"?"\\?":r).join("|")})`);let n=!a.test(i);if(!n){const r=i.indexOf(t);r>0&&!a.test(i.substring(0,r))&&(n=!0)}return n},oe=(i,e,t=".")=>{if(!i)return;if(i[e])return Object.prototype.hasOwnProperty.call(i,e)?i[e]:void 0;const s=e.split(t);let a=i;for(let n=0;n<s.length;){if(!a||typeof a!="object")return;let r,o="";for(let l=n;l<s.length;++l)if(l!==n&&(o+=t),o+=s[l],r=a[o],r!==void 0){if(["string","number","boolean"].includes(typeof r)&&l<s.length-1)continue;n+=l-n+1;break}a=r}return a},W=i=>i==null?void 0:i.replace(/_/g,"-"),ha={type:"logger",log(i){this.output("log",i)},warn(i){this.output("warn",i)},error(i){this.output("error",i)},output(i,e){var t,s;(s=(t=console==null?void 0:console[i])==null?void 0:t.apply)==null||s.call(t,console,e)}};class X{constructor(e,t={}){this.init(e,t)}init(e,t={}){this.prefix=t.prefix||"i18next:",this.logger=e||ha,this.options=t,this.debug=t.debug}log(...e){return this.forward(e,"log","",!0)}warn(...e){return this.forward(e,"warn","",!0)}error(...e){return this.forward(e,"error","")}deprecate(...e){return this.forward(e,"warn","WARNING DEPRECATED: ",!0)}forward(e,t,s,a){return a&&!this.debug?null:(e=e.map(n=>y(n)?n.replace(/[\r\n\x00-\x1F\x7F]/g," "):n),y(e[0])&&(e[0]=`${s}${this.prefix} ${e[0]}`),this.logger[t](e))}create(e){return new X(this.logger,{prefix:`${this.prefix}:${e}:`,...this.options})}clone(e){return e=e||this.options,e.prefix=e.prefix||this.prefix,new X(this.logger,e)}}var A=new X;class te{constructor(){this.observers={}}on(e,t){return e.split(" ").forEach(s=>{this.observers[s]||(this.observers[s]=new Map);const a=this.observers[s].get(t)||0;this.observers[s].set(t,a+1)}),this}off(e,t){if(this.observers[e]){if(!t){delete this.observers[e];return}this.observers[e].delete(t)}}once(e,t){const s=(...a)=>{t(...a),this.off(e,s)};return this.on(e,s),this}emit(e,...t){this.observers[e]&&Array.from(this.observers[e].entries()).forEach(([a,n])=>{for(let r=0;r<n;r++)a(...t)}),this.observers["*"]&&Array.from(this.observers["*"].entries()).forEach(([a,n])=>{for(let r=0;r<n;r++)a(e,...t)})}}class be extends te{constructor(e,t={ns:["translation"],defaultNS:"translation"}){super(),this.data=e||{},this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.options.ignoreJSONStructure===void 0&&(this.options.ignoreJSONStructure=!0)}addNamespaces(e){this.options.ns.includes(e)||this.options.ns.push(e)}removeNamespaces(e){const t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)}getResource(e,t,s,a={}){var c,u;const n=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator,r=a.ignoreJSONStructure!==void 0?a.ignoreJSONStructure:this.options.ignoreJSONStructure;let o;e.includes(".")?o=e.split("."):(o=[e,t],s&&(Array.isArray(s)?o.push(...s):y(s)&&n?o.push(...s.split(n)):o.push(s)));const l=Q(this.data,o);return!l&&!t&&!s&&e.includes(".")&&(e=o[0],t=o[1],s=o.slice(2).join(".")),l||!r||!y(s)?l:oe((u=(c=this.data)==null?void 0:c[e])==null?void 0:u[t],s,n)}addResource(e,t,s,a,n={silent:!1}){const r=n.keySeparator!==void 0?n.keySeparator:this.options.keySeparator;let o=[e,t];s&&(o=o.concat(r?s.split(r):s)),e.includes(".")&&(o=e.split("."),a=t,t=o[1]),this.addNamespaces(t),ve(this.data,o,a),n.silent||this.emit("added",e,t,s,a)}addResources(e,t,s,a={silent:!1}){for(const n in s)(y(s[n])||Array.isArray(s[n]))&&this.addResource(e,t,n,s[n],{silent:!0});a.silent||this.emit("added",e,t,s)}addResourceBundle(e,t,s,a,n,r={silent:!1,skipCopy:!1}){let o=[e,t];e.includes(".")&&(o=e.split("."),a=s,s=t,t=o[1]),this.addNamespaces(t);let l=Q(this.data,o)||{};r.skipCopy||(s=JSON.parse(JSON.stringify(s))),a?Pe(l,s,n):l={...l,...s},ve(this.data,o,l),r.silent||this.emit("added",e,t,s)}removeResourceBundle(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)}hasResourceBundle(e,t){return this.getResource(e,t)!==void 0}getResourceBundle(e,t){return t||(t=this.options.defaultNS),this.getResource(e,t)}getDataByLanguage(e){return this.data[e]}hasLanguageSomeTranslations(e){const t=this.getDataByLanguage(e);return!!(t&&Object.keys(t)||[]).find(a=>t[a]&&Object.keys(t[a]).length>0)}toJSON(){return this.data}}var je={processors:{},addPostProcessor(i){this.processors[i.name]=i},handle(i,e,t,s,a){return i.forEach(n=>{var r;e=((r=this.processors[n])==null?void 0:r.process(e,t,s,a))??e}),e}};const Ee=Symbol("i18next/PATH_KEY");function da(){const i=[],e=Object.create(null);let t;return e.get=(s,a)=>{var n;return(n=t==null?void 0:t.revoke)==null||n.call(t),a===Ee?i:(i.push(a),t=Proxy.revocable(s,e),t.proxy)},Proxy.revocable(Object.create(null),e).proxy}function D(i,e){const{[Ee]:t}=i(da()),s=(e==null?void 0:e.keySeparator)??".",a=(e==null?void 0:e.nsSeparator)??":",n=(e==null?void 0:e.enableSelector)==="strict";if(t.length>1&&a){const r=e==null?void 0:e.ns,o=n?Array.isArray(r)?r:r?[r]:null:Array.isArray(r)?r:null;if(o&&(n?o:o.length>1?o.slice(1):[]).includes(t[0]))return`${t[0]}${a}${t.slice(1).join(s)}`}return t.join(s)}const ne=i=>!y(i)&&typeof i!="boolean"&&typeof i!="number";class ee extends te{constructor(e,t={}){super(),ea(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector","i18nFormat","utils"],e,this),this.options=t,this.options.keySeparator===void 0&&(this.options.keySeparator="."),this.logger=A.create("translator"),this.checkedLoadedFor={}}changeLanguage(e){e&&(this.language=e)}exists(e,t={interpolation:{}}){const s={...t};if(e==null)return!1;const a=this.resolve(e,s);if((a==null?void 0:a.res)===void 0)return!1;const n=ne(a.res);return!(s.returnObjects===!1&&n)}extractFromKey(e,t){let s=t.nsSeparator!==void 0?t.nsSeparator:this.options.nsSeparator;s===void 0&&(s=":");const a=t.keySeparator!==void 0?t.keySeparator:this.options.keySeparator;let n=t.ns||this.options.defaultNS||[];const r=s&&e.includes(s),o=!this.options.userDefinedKeySeparator&&!t.keySeparator&&!this.options.userDefinedNsSeparator&&!t.nsSeparator&&!la(e,s,a);if(r&&!o){const l=e.match(this.interpolator.nestingRegexp);if(l&&l.length>0)return{key:e,namespaces:y(n)?[n]:n};const c=e.split(s);(s!==a||s===a&&this.options.ns.includes(c[0]))&&(n=c.shift()),e=c.join(a)}return{key:e,namespaces:y(n)?[n]:n}}translate(e,t,s){let a=typeof t=="object"?{...t}:t;if(typeof a!="object"&&this.options.overloadTranslationOptionHandler&&(a=this.options.overloadTranslationOptionHandler(arguments)),typeof a=="object"&&(a={...a}),a||(a={}),e==null)return"";typeof e=="function"&&(e=D(e,{...this.options,...a})),Array.isArray(e)||(e=[String(e)]),e=e.map(m=>typeof m=="function"?D(m,{...this.options,...a}):String(m));const n=a.returnDetails!==void 0?a.returnDetails:this.options.returnDetails,r=a.keySeparator!==void 0?a.keySeparator:this.options.keySeparator,{key:o,namespaces:l}=this.extractFromKey(e[e.length-1],a),c=l[l.length-1];let u=a.nsSeparator!==void 0?a.nsSeparator:this.options.nsSeparator;u===void 0&&(u=":");const d=a.lng||this.language,f=a.appendNamespaceToCIMode||this.options.appendNamespaceToCIMode;if((d==null?void 0:d.toLowerCase())==="cimode")return f?n?{res:`${c}${u}${o}`,usedKey:o,exactUsedKey:o,usedLng:d,usedNS:c,usedParams:this.getUsedParamsDetails(a)}:`${c}${u}${o}`:n?{res:o,usedKey:o,exactUsedKey:o,usedLng:d,usedNS:c,usedParams:this.getUsedParamsDetails(a)}:o;const g=this.resolve(e,a);let p=g==null?void 0:g.res;const k=(g==null?void 0:g.usedKey)||o,b=(g==null?void 0:g.exactUsedKey)||o,j=["[object Number]","[object Function]","[object RegExp]"],$=a.joinArrays!==void 0?a.joinArrays:this.options.joinArrays,L=!this.i18nFormat||this.i18nFormat.handleAsObject,M=a.count!==void 0&&!y(a.count),O=ee.hasDefaultValue(a),V=M?this.pluralResolver.getSuffix(d,a.count,a):"",z=a.ordinal&&M?this.pluralResolver.getSuffix(d,a.count,{ordinal:!1}):"",T=M&&!a.ordinal&&a.count===0,C=T&&a[`defaultValue${this.options.pluralSeparator}zero`]||a[`defaultValue${V}`]||a[`defaultValue${z}`]||a.defaultValue;let w=p;L&&!p&&O&&(w=C);const J=ne(w),v=Object.prototype.toString.apply(w);if(L&&w&&J&&!j.includes(v)&&!(y($)&&Array.isArray(w))){if(!a.returnObjects&&!this.options.returnObjects){this.options.returnedObjectHandler||this.logger.warn("accessing an object - but returnObjects options is not enabled!");const m=this.options.returnedObjectHandler?this.options.returnedObjectHandler(k,w,{...a,ns:l}):`key '${o} (${this.language})' returned an object instead of string.`;return n?(g.res=m,g.usedParams=this.getUsedParamsDetails(a),g):m}if(r){const m=Array.isArray(w),x=m?[]:{},S=m?b:k;for(const _ in w)if(Object.prototype.hasOwnProperty.call(w,_)){const R=`${S}${r}${_}`;O&&!p?x[_]=this.translate(R,{...a,defaultValue:ne(C)?C[_]:void 0,joinArrays:!1,ns:l}):x[_]=this.translate(R,{...a,joinArrays:!1,ns:l}),x[_]===R&&(x[_]=w[_])}p=x}}else if(L&&y($)&&Array.isArray(p))p=p.join($),p&&(p=this.extendTranslation(p,e,a,s));else{let m=!1,x=!1;!this.isValidLookup(p)&&O&&(m=!0,p=C),this.isValidLookup(p)||(x=!0,p=o);const _=(a.missingKeyNoValueFallbackToKey||this.options.missingKeyNoValueFallbackToKey)&&x?void 0:p,R=O&&C!==p&&this.options.updateMissing;if(x||m||R){if(this.logger.log(R?"updateKey":"missingKey",d,c,M&&!R?`${o}${this.pluralResolver.getSuffix(d,a.count,a)}`:o,R?C:p),r){const E=this.resolve(o,{...a,keySeparator:!1});E&&E.res&&this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")}let H=[];const G=this.languageUtils.getFallbackCodes(this.options.fallbackLng,a.lng||this.language);if(this.options.saveMissingTo==="fallback"&&G&&G[0])for(let E=0;E<G.length;E++)H.push(G[E]);else this.options.saveMissingTo==="all"?H=this.languageUtils.toResolveHierarchy(a.lng||this.language):H.push(a.lng||this.language);const de=(E,I,U)=>{var pe;const ue=O&&U!==p?U:_;this.options.missingKeyHandler?this.options.missingKeyHandler(E,c,I,ue,R,a):(pe=this.backendConnector)!=null&&pe.saveMissing&&this.backendConnector.saveMissing(E,c,I,ue,R,a),this.emit("missingKey",E,c,I,p)};this.options.saveMissing&&(this.options.saveMissingPlurals&&M?H.forEach(E=>{const I=this.pluralResolver.getSuffixes(E,a);T&&a[`defaultValue${this.options.pluralSeparator}zero`]&&!I.includes(`${this.options.pluralSeparator}zero`)&&I.push(`${this.options.pluralSeparator}zero`),I.forEach(U=>{de([E],o+U,a[`defaultValue${U}`]||C)})}):de(H,o,C))}p=this.extendTranslation(p,e,a,g,s),x&&p===o&&this.options.appendNamespaceToMissingKey&&(p=`${c}${u}${o}`),(x||m)&&this.options.parseMissingKeyHandler&&(p=this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey?`${c}${u}${o}`:o,m?p:void 0,a))}return n?(g.res=p,g.usedParams=this.getUsedParamsDetails(a),g):p}extendTranslation(e,t,s,a,n){var l,c;if((l=this.i18nFormat)!=null&&l.parse)e=this.i18nFormat.parse(e,{...this.options.interpolation.defaultVariables,...s},s.lng||this.language||a.usedLng,a.usedNS,a.usedKey,{resolved:a});else if(!s.skipInterpolation){s.interpolation&&this.interpolator.init({...s,interpolation:{...this.options.interpolation,...s.interpolation}});const u=y(e)&&(((c=s==null?void 0:s.interpolation)==null?void 0:c.skipOnVariables)!==void 0?s.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables);let d;if(u){const g=e.match(this.interpolator.nestingRegexp);d=g&&g.length}let f=s.replace&&!y(s.replace)?s.replace:s;if(this.options.interpolation.defaultVariables&&(f={...this.options.interpolation.defaultVariables,...f}),e=this.interpolator.interpolate(e,f,s.lng||this.language||a.usedLng,s),u){const g=e.match(this.interpolator.nestingRegexp),p=g&&g.length;d<p&&(s.nest=!1)}!s.lng&&a&&a.res&&(s.lng=this.language||a.usedLng),s.nest!==!1&&(e=this.interpolator.nest(e,(...g)=>(n==null?void 0:n[0])===g[0]&&!s.context?(this.logger.warn(`It seems you are nesting recursively key: ${g[0]} in key: ${t[0]}`),null):this.translate(...g,t),s)),s.interpolation&&this.interpolator.reset()}const r=s.postProcess||this.options.postProcess,o=y(r)?[r]:r;return e!=null&&(o!=null&&o.length)&&s.applyPostProcessor!==!1&&(e=je.handle(o,e,t,this.options&&this.options.postProcessPassResolved?{i18nResolved:{...a,usedParams:this.getUsedParamsDetails(s)},...s}:s,this)),e}resolve(e,t={}){let s,a,n,r,o;return y(e)&&(e=[e]),Array.isArray(e)&&(e=e.map(l=>typeof l=="function"?D(l,{...this.options,...t}):l)),e.forEach(l=>{if(this.isValidLookup(s))return;const c=this.extractFromKey(l,t),u=c.key;a=u;let d=c.namespaces;this.options.fallbackNS&&(d=d.concat(this.options.fallbackNS));const f=t.count!==void 0&&!y(t.count),g=f&&!t.ordinal&&t.count===0,p=t.context!==void 0&&(y(t.context)||typeof t.context=="number")&&t.context!=="",k=t.lngs?t.lngs:this.languageUtils.toResolveHierarchy(t.lng||this.language,t.fallbackLng);d.forEach(b=>{var j,$;this.isValidLookup(s)||(o=b,!this.checkedLoadedFor[`${k[0]}-${b}`]&&((j=this.utils)!=null&&j.hasLoadedNamespace)&&!(($=this.utils)!=null&&$.hasLoadedNamespace(o))&&(this.checkedLoadedFor[`${k[0]}-${b}`]=!0,this.logger.warn(`key "${a}" for languages "${k.join(", ")}" won't get resolved as namespace "${o}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),k.forEach(L=>{var V;if(this.isValidLookup(s))return;r=L;const M=[u];if((V=this.i18nFormat)!=null&&V.addLookupKeys)this.i18nFormat.addLookupKeys(M,u,L,b,t);else{let z;f&&(z=this.pluralResolver.getSuffix(L,t.count,t));const T=`${this.options.pluralSeparator}zero`,C=`${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;if(f&&(t.ordinal&&z.startsWith(C)&&M.push(u+z.replace(C,this.options.pluralSeparator)),M.push(u+z),g&&M.push(u+T)),p){const w=`${u}${this.options.contextSeparator||"_"}${t.context}`;M.push(w),f&&(t.ordinal&&z.startsWith(C)&&M.push(w+z.replace(C,this.options.pluralSeparator)),M.push(w+z),g&&M.push(w+T))}}let O;for(;O=M.pop();)this.isValidLookup(s)||(n=O,s=this.getResource(L,b,O,t))}))})}),{res:s,usedKey:a,exactUsedKey:n,usedLng:r,usedNS:o}}isValidLookup(e){return e!==void 0&&!(!this.options.returnNull&&e===null)&&!(!this.options.returnEmptyString&&e==="")}getResource(e,t,s,a={}){var n;return(n=this.i18nFormat)!=null&&n.getResource?this.i18nFormat.getResource(e,t,s,a):this.resourceStore.getResource(e,t,s,a)}getUsedParamsDetails(e={}){const t=["defaultValue","ordinal","context","replace","lng","lngs","fallbackLng","ns","keySeparator","nsSeparator","returnObjects","returnDetails","joinArrays","postProcess","interpolation"],s=e.replace&&!y(e.replace);let a=s?e.replace:e;if(s&&typeof e.count<"u"&&(a.count=e.count),this.options.interpolation.defaultVariables&&(a={...this.options.interpolation.defaultVariables,...a}),!s){a={...a};for(const n of t)delete a[n]}return a}static hasDefaultValue(e){const t="defaultValue";for(const s in e)if(Object.prototype.hasOwnProperty.call(e,s)&&s.startsWith(t)&&e[s]!==void 0)return!0;return!1}}class Me{constructor(e){this.options=e,this.supportedLngs=this.options.supportedLngs||!1,this.logger=A.create("languageUtils")}getScriptPartFromCode(e){if(e=W(e),!e||!e.includes("-"))return null;const t=e.split("-");return t.length===2||(t.pop(),t[t.length-1].toLowerCase()==="x")?null:this.formatLanguageCode(t.join("-"))}getLanguagePartFromCode(e){if(e=W(e),!e||!e.includes("-"))return e;const t=e.split("-");return this.formatLanguageCode(t[0])}formatLanguageCode(e){if(y(e)&&e.includes("-")){let t;try{t=Intl.getCanonicalLocales(e)[0]}catch{}return t&&this.options.lowerCaseLng&&(t=t.toLowerCase()),t||(this.options.lowerCaseLng?e.toLowerCase():e)}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e}isSupportedCode(e){return(this.options.load==="languageOnly"||this.options.nonExplicitSupportedLngs)&&(e=this.getLanguagePartFromCode(e)),!this.supportedLngs||!this.supportedLngs.length||this.supportedLngs.includes(e)}getBestMatchFromCodes(e){if(!e)return null;let t;return e.forEach(s=>{if(t)return;const a=this.formatLanguageCode(s);(!this.options.supportedLngs||this.isSupportedCode(a))&&(t=a)}),!t&&this.options.supportedLngs&&e.forEach(s=>{if(t)return;const a=this.getScriptPartFromCode(s);if(this.isSupportedCode(a))return t=a;const n=this.getLanguagePartFromCode(s);if(this.isSupportedCode(n))return t=n;t=this.options.supportedLngs.find(r=>r===n?!0:!r.includes("-")&&!n.includes("-")?!1:!!(r.includes("-")&&!n.includes("-")&&r.slice(0,r.indexOf("-"))===n||r.startsWith(n)&&n.length>1))}),t||(t=this.getFallbackCodes(this.options.fallbackLng)[0]),t}getFallbackCodes(e,t){if(!e)return[];if(typeof e=="function"&&(e=e(t)),y(e)&&(e=[e]),Array.isArray(e))return e;if(!t)return e.default||[];let s=e[t];return s||(s=e[this.getScriptPartFromCode(t)]),s||(s=e[this.formatLanguageCode(t)]),s||(s=e[this.getLanguagePartFromCode(t)]),s||(s=e.default),s||[]}toResolveHierarchy(e,t){const s=this.getFallbackCodes((t===!1?[]:t)||this.options.fallbackLng||[],e),a=[],n=r=>{r&&(this.isSupportedCode(r)?a.push(r):this.logger.warn(`rejecting language code not found in supportedLngs: ${r}`))};return y(e)&&(e.includes("-")||e.includes("_"))?(this.options.load!=="languageOnly"&&n(this.formatLanguageCode(e)),this.options.load!=="languageOnly"&&this.options.load!=="currentOnly"&&n(this.getScriptPartFromCode(e)),this.options.load!=="currentOnly"&&n(this.getLanguagePartFromCode(e))):y(e)&&n(this.formatLanguageCode(e)),s.forEach(r=>{a.includes(r)||n(this.formatLanguageCode(r))}),a}}const we={zero:0,one:1,two:2,few:3,many:4,other:5},_e={select:i=>i===1?"one":"other",resolvedOptions:()=>({pluralCategories:["one","other"]})};class ua{constructor(e,t={}){this.languageUtils=e,this.options=t,this.logger=A.create("pluralResolver"),this.pluralRulesCache={}}clearCache(){this.pluralRulesCache={}}getRule(e,t={}){const s=W(e==="dev"?"en":e),a=t.ordinal?"ordinal":"cardinal",n=JSON.stringify({cleanedCode:s,type:a});if(n in this.pluralRulesCache)return this.pluralRulesCache[n];let r;try{r=new Intl.PluralRules(s,{type:a})}catch{if(typeof Intl>"u")return this.logger.error("No Intl support, please use an Intl polyfill!"),_e;if(!e.match(/-|_/))return _e;const l=this.languageUtils.getLanguagePartFromCode(e);r=this.getRule(l,t)}return this.pluralRulesCache[n]=r,r}needsPlural(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),(s==null?void 0:s.resolvedOptions().pluralCategories.length)>1}getPluralFormsOfKey(e,t,s={}){return this.getSuffixes(e,s).map(a=>`${t}${a}`)}getSuffixes(e,t={}){let s=this.getRule(e,t);return s||(s=this.getRule("dev",t)),s?s.resolvedOptions().pluralCategories.sort((a,n)=>we[a]-we[n]).map(a=>`${this.options.prepend}${t.ordinal?`ordinal${this.options.prepend}`:""}${a}`):[]}getSuffix(e,t,s={}){const a=this.getRule(e,s);return a?`${this.options.prepend}${s.ordinal?`ordinal${this.options.prepend}`:""}${a.select(t)}`:(this.logger.warn(`no plural rule found for: ${e}`),this.getSuffix("dev",t,s))}}const Se=(i,e,t,s=".",a=!0)=>{let n=aa(i,e,t);return!n&&a&&y(t)&&(n=oe(i,t,s),n===void 0&&(n=oe(e,t,s))),n},ie=i=>i.replace(/\$/g,"$$$$");class Ne{constructor(e={}){var t;this.logger=A.create("interpolator"),this.options=e,this.format=((t=e==null?void 0:e.interpolation)==null?void 0:t.format)||(s=>s),this.init(e)}init(e={}){e.interpolation||(e.interpolation={escapeValue:!0});const{escape:t,escapeValue:s,useRawValueToEscape:a,prefix:n,prefixEscaped:r,suffix:o,suffixEscaped:l,formatSeparator:c,unescapeSuffix:u,unescapePrefix:d,nestingPrefix:f,nestingPrefixEscaped:g,nestingSuffix:p,nestingSuffixEscaped:k,nestingOptionsSeparator:b,maxReplaces:j,alwaysFormat:$}=e.interpolation;this.escape=t!==void 0?t:ia,this.escapeValue=s!==void 0?s:!0,this.useRawValueToEscape=a!==void 0?a:!1,this.prefix=n?F(n):r||"{{",this.suffix=o?F(o):l||"}}",this.formatSeparator=c||",",this.unescapePrefix=u?"":d?F(d):"-",this.unescapeSuffix=this.unescapePrefix?"":u?F(u):"",this.nestingPrefix=f?F(f):g||F("$t("),this.nestingSuffix=p?F(p):k||F(")"),this.nestingOptionsSeparator=b||",",this.maxReplaces=j||1e3,this.alwaysFormat=$!==void 0?$:!1,this.resetRegExp()}reset(){this.options&&this.init(this.options)}resetRegExp(){const e=(t,s)=>(t==null?void 0:t.source)===s?(t.lastIndex=0,t):new RegExp(s,"g");this.regexp=e(this.regexp,`${this.prefix}(.+?)${this.suffix}`),this.regexpUnescape=e(this.regexpUnescape,`${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),this.nestingRegexp=e(this.nestingRegexp,`${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)}interpolate(e,t,s,a){var g;let n,r,o;const l=this.options&&this.options.interpolation&&this.options.interpolation.defaultVariables||{},c=p=>{if(!p.includes(this.formatSeparator)){const $=Se(t,l,p,this.options.keySeparator,this.options.ignoreJSONStructure);return this.alwaysFormat?this.format($,void 0,s,{...a,...t,interpolationkey:p}):$}const k=p.split(this.formatSeparator),b=k.shift().trim(),j=k.join(this.formatSeparator).trim();return this.format(Se(t,l,b,this.options.keySeparator,this.options.ignoreJSONStructure),j,s,{...a,...t,interpolationkey:b})};this.resetRegExp(),!this.escapeValue&&typeof e=="string"&&/\$t\([^)]*\{[^}]*\{\{/.test(e)&&this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");const u=(a==null?void 0:a.missingInterpolationHandler)||this.options.missingInterpolationHandler,d=((g=a==null?void 0:a.interpolation)==null?void 0:g.skipOnVariables)!==void 0?a.interpolation.skipOnVariables:this.options.interpolation.skipOnVariables;return[{regex:this.regexpUnescape,safeValue:p=>ie(p)},{regex:this.regexp,safeValue:p=>this.escapeValue?ie(this.escape(p)):ie(p)}].forEach(p=>{for(o=0;n=p.regex.exec(e);){const k=n[1].trim();if(r=c(k),r===void 0)if(typeof u=="function"){const j=u(e,n,a);r=y(j)?j:""}else if(a&&Object.prototype.hasOwnProperty.call(a,k))r="";else if(d){r=n[0];continue}else this.logger.warn(`missed to pass in variable ${k} for interpolating ${e}`),r="";else!y(r)&&!this.useRawValueToEscape&&(r=ke(r));const b=p.safeValue(r);if(e=e.replace(n[0],b),d?(p.regex.lastIndex+=r.length,p.regex.lastIndex-=n[0].length):p.regex.lastIndex=0,o++,o>=this.maxReplaces)break}}),e}nest(e,t,s={}){let a,n,r;const o=(l,c)=>{const u=this.nestingOptionsSeparator;if(!l.includes(u))return l;const d=l.split(new RegExp(`${F(u)}[ ]*{`));let f=`{${d[1]}`;l=d[0],f=this.interpolate(f,r);const g=f.match(/'/g),p=f.match(/"/g);(((g==null?void 0:g.length)??0)%2===0&&!p||((p==null?void 0:p.length)??0)%2!==0)&&(f=f.replace(/'/g,'"'));try{r=JSON.parse(f),c&&(r={...c,...r})}catch(k){return this.logger.warn(`failed parsing options string in nesting for key ${l}`,k),`${l}${u}${f}`}return r.defaultValue&&r.defaultValue.includes(this.prefix)&&delete r.defaultValue,l};for(;a=this.nestingRegexp.exec(e);){let l=[];r={...s},r=r.replace&&!y(r.replace)?r.replace:r,r.applyPostProcessor=!1,delete r.defaultValue;const c=/{.*}/.test(a[1])?a[1].lastIndexOf("}")+1:a[1].indexOf(this.formatSeparator);if(c!==-1&&(l=a[1].slice(c).split(this.formatSeparator).map(u=>u.trim()).filter(Boolean),a[1]=a[1].slice(0,c)),n=t(o.call(this,a[1].trim(),r),r),n&&a[0]===e&&!y(n))return n;y(n)||(n=ke(n)),n||(this.logger.warn(`missed to resolve ${a[1]} for nesting ${e}`),n=""),l.length&&(n=l.reduce((u,d)=>this.format(u,d,s.lng,{...s,interpolationkey:a[1].trim()}),n.trim())),e=e.replace(a[0],n),this.regexp.lastIndex=0}return e}}const pa=i=>{let e=i.toLowerCase().trim();const t={};if(i.includes("(")){const s=i.split("(");e=s[0].toLowerCase().trim();const a=s[1].slice(0,-1);e==="currency"&&!a.includes(":")?t.currency||(t.currency=a.trim()):e==="relativetime"&&!a.includes(":")?t.range||(t.range=a.trim()):a.split(";").forEach(r=>{if(r){const[o,...l]=r.split(":"),c=l.join(":").trim().replace(/^'+|'+$/g,""),u=o.trim();t[u]||(t[u]=c),c==="false"&&(t[u]=!1),c==="true"&&(t[u]=!0),isNaN(c)||(t[u]=parseInt(c,10))}})}return{formatName:e,formatOptions:t}},$e=i=>{const e={};return(t,s,a)=>{let n=a;a&&a.interpolationkey&&a.formatParams&&a.formatParams[a.interpolationkey]&&a[a.interpolationkey]&&(n={...n,[a.interpolationkey]:void 0});const r=s+JSON.stringify(n);let o=e[r];return o||(o=i(W(s),a),e[r]=o),o(t)}},fa=i=>(e,t,s)=>i(W(t),s)(e);class ga{constructor(e={}){this.logger=A.create("formatter"),this.options=e,this.init(e)}init(e,t={interpolation:{}}){this.formatSeparator=t.interpolation.formatSeparator||",";const s=t.cacheInBuiltFormats?$e:fa;this.formats={number:s((a,n)=>{const r=new Intl.NumberFormat(a,{...n});return o=>r.format(o)}),currency:s((a,n)=>{const r=new Intl.NumberFormat(a,{...n,style:"currency"});return o=>r.format(o)}),datetime:s((a,n)=>{const r=new Intl.DateTimeFormat(a,{...n});return o=>r.format(o)}),relativetime:s((a,n)=>{const r=new Intl.RelativeTimeFormat(a,{...n});return o=>r.format(o,n.range||"day")}),list:s((a,n)=>{const r=new Intl.ListFormat(a,{...n});return o=>r.format(o)})}}add(e,t){this.formats[e.toLowerCase().trim()]=t}addCached(e,t){this.formats[e.toLowerCase().trim()]=$e(t)}format(e,t,s,a={}){if(!t||e==null)return e;const n=t.split(this.formatSeparator);if(n.length>1&&n[0].indexOf("(")>1&&!n[0].includes(")")&&n.find(o=>o.includes(")"))){const o=n.findIndex(l=>l.includes(")"));n[0]=[n[0],...n.splice(1,o)].join(this.formatSeparator)}return n.reduce((o,l)=>{var d;const{formatName:c,formatOptions:u}=pa(l);if(this.formats[c]){let f=o;try{const g=((d=a==null?void 0:a.formatParams)==null?void 0:d[a.interpolationkey])||{},p=g.locale||g.lng||a.locale||a.lng||s;f=this.formats[c](o,p,{...u,...a,...g})}catch(g){this.logger.warn(g)}return f}else this.logger.warn(`there was no format function for ${c}`);return o},e)}}const ya=(i,e)=>{i.pending[e]!==void 0&&(delete i.pending[e],i.pendingCount--)};class ka extends te{constructor(e,t,s,a={}){var n,r;super(),this.backend=e,this.store=t,this.services=s,this.languageUtils=s.languageUtils,this.options=a,this.logger=A.create("backendConnector"),this.waitingReads=[],this.maxParallelReads=a.maxParallelReads||10,this.readingCalls=0,this.maxRetries=a.maxRetries>=0?a.maxRetries:5,this.retryTimeout=a.retryTimeout>=1?a.retryTimeout:350,this.state={},this.queue=[],(r=(n=this.backend)==null?void 0:n.init)==null||r.call(n,s,a.backend,a)}queueLoad(e,t,s,a){const n={},r={},o={},l={};return e.forEach(c=>{let u=!0;t.forEach(d=>{const f=`${c}|${d}`;!s.reload&&this.store.hasResourceBundle(c,d)?this.state[f]=2:this.state[f]<0||(this.state[f]===1?r[f]===void 0&&(r[f]=!0):(this.state[f]=1,u=!1,r[f]===void 0&&(r[f]=!0),n[f]===void 0&&(n[f]=!0),l[d]===void 0&&(l[d]=!0)))}),u||(o[c]=!0)}),(Object.keys(n).length||Object.keys(r).length)&&this.queue.push({pending:r,pendingCount:Object.keys(r).length,loaded:{},errors:[],callback:a}),{toLoad:Object.keys(n),pending:Object.keys(r),toLoadLanguages:Object.keys(o),toLoadNamespaces:Object.keys(l)}}loaded(e,t,s){const a=e.split("|"),n=a[0],r=a[1];t&&this.emit("failedLoading",n,r,t),!t&&s&&this.store.addResourceBundle(n,r,s,void 0,void 0,{skipCopy:!0}),this.state[e]=t?-1:2,t&&s&&(this.state[e]=0);const o={};this.queue.forEach(l=>{sa(l.loaded,[n],r),ya(l,e),t&&l.errors.push(t),l.pendingCount===0&&!l.done&&(Object.keys(l.loaded).forEach(c=>{o[c]||(o[c]={});const u=l.loaded[c];u.length&&u.forEach(d=>{o[c][d]===void 0&&(o[c][d]=!0)})}),l.done=!0,l.errors.length?l.callback(l.errors):l.callback())}),this.emit("loaded",o),this.queue=this.queue.filter(l=>!l.done)}read(e,t,s,a=0,n=this.retryTimeout,r){if(!e.length)return r(null,{});if(this.readingCalls>=this.maxParallelReads){this.waitingReads.push({lng:e,ns:t,fcName:s,tried:a,wait:n,callback:r});return}this.readingCalls++;const o=(c,u)=>{if(this.readingCalls--,this.waitingReads.length>0){const d=this.waitingReads.shift();this.read(d.lng,d.ns,d.fcName,d.tried,d.wait,d.callback)}if(c&&u&&a<this.maxRetries){setTimeout(()=>{this.read(e,t,s,a+1,n*2,r)},n);return}r(c,u)},l=this.backend[s].bind(this.backend);if(l.length===2){try{const c=l(e,t);c&&typeof c.then=="function"?c.then(u=>o(null,u)).catch(o):o(null,c)}catch(c){o(c)}return}return l(e,t,o)}prepareLoading(e,t,s={},a){if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),a&&a();y(e)&&(e=this.languageUtils.toResolveHierarchy(e)),y(t)&&(t=[t]);const n=this.queueLoad(e,t,s,a);if(!n.toLoad.length)return n.pending.length||a(),null;n.toLoad.forEach(r=>{this.loadOne(r)})}load(e,t,s){this.prepareLoading(e,t,{},s)}reload(e,t,s){this.prepareLoading(e,t,{reload:!0},s)}loadOne(e,t=""){const s=e.split("|"),a=s[0],n=s[1];this.read(a,n,"read",void 0,void 0,(r,o)=>{r&&this.logger.warn(`${t}loading namespace ${n} for language ${a} failed`,r),!r&&o&&this.logger.log(`${t}loaded namespace ${n} for language ${a}`,o),this.loaded(e,r,o)})}saveMissing(e,t,s,a,n,r={},o=()=>{}){var l,c,u,d,f;if((c=(l=this.services)==null?void 0:l.utils)!=null&&c.hasLoadedNamespace&&!((d=(u=this.services)==null?void 0:u.utils)!=null&&d.hasLoadedNamespace(t))){this.logger.warn(`did not save key "${s}" as the namespace "${t}" was not yet loaded`,"This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");return}if(!(s==null||s==="")){if((f=this.backend)!=null&&f.create){const g={...r,isUpdate:n},p=this.backend.create.bind(this.backend);if(p.length<6)try{let k;p.length===5?k=p(e,t,s,a,g):k=p(e,t,s,a),k&&typeof k.then=="function"?k.then(b=>o(null,b)).catch(o):o(null,k)}catch(k){o(k)}else p(e,t,s,a,o,g)}!e||!e[0]||this.store.addResource(e[0],t,s,a)}}}const re=()=>({debug:!1,initAsync:!0,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,supportedLngs:!1,nonExplicitSupportedLngs:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",enableSelector:!1,partialBundledLanguages:!1,saveMissing:!1,updateMissing:!1,saveMissingTo:"fallback",saveMissingPlurals:!0,missingKeyHandler:!1,missingInterpolationHandler:!1,postProcess:!1,postProcessPassResolved:!1,returnNull:!1,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:!1,parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,appendNamespaceToCIMode:!1,overloadTranslationOptionHandler:i=>{let e={};if(typeof i[1]=="object"&&(e=i[1]),y(i[1])&&(e.defaultValue=i[1]),y(i[2])&&(e.tDescription=i[2]),typeof i[2]=="object"||typeof i[3]=="object"){const t=i[3]||i[2];Object.keys(t).forEach(s=>{e[s]=t[s]})}return e},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",formatSeparator:",",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",nestingOptionsSeparator:",",maxReplaces:1e3,skipOnVariables:!0},cacheInBuiltFormats:!0}),Le=i=>(y(i.ns)&&(i.ns=[i.ns]),y(i.fallbackLng)&&(i.fallbackLng=[i.fallbackLng]),y(i.fallbackNS)&&(i.fallbackNS=[i.fallbackNS]),i.supportedLngs&&!i.supportedLngs.includes("cimode")&&(i.supportedLngs=i.supportedLngs.concat(["cimode"])),i),Y=()=>{},ma=i=>{Object.getOwnPropertyNames(Object.getPrototypeOf(i)).forEach(t=>{typeof i[t]=="function"&&(i[t]=i[t].bind(i))})};class Z extends te{constructor(e={},t){if(super(),this.options=Le(e),this.services={},this.logger=A,this.modules={external:[]},ma(this),t&&!this.isInitialized&&!e.isClone){if(!this.options.initAsync)return this.init(e,t),this;setTimeout(()=>{this.init(e,t)},0)}}init(e={},t){this.isInitializing=!0,typeof e=="function"&&(t=e,e={}),e.defaultNS==null&&e.ns&&(y(e.ns)?e.defaultNS=e.ns:e.ns.includes("translation")||(e.defaultNS=e.ns[0]));const s=re();this.options={...s,...this.options,...Le(e)},this.options.interpolation={...s.interpolation,...this.options.interpolation},e.keySeparator!==void 0&&(this.options.userDefinedKeySeparator=e.keySeparator),e.nsSeparator!==void 0&&(this.options.userDefinedNsSeparator=e.nsSeparator),typeof this.options.overloadTranslationOptionHandler!="function"&&(this.options.overloadTranslationOptionHandler=s.overloadTranslationOptionHandler);const a=c=>c?typeof c=="function"?new c:c:null;if(!this.options.isClone){this.modules.logger?A.init(a(this.modules.logger),this.options):A.init(null,this.options);let c;this.modules.formatter?c=this.modules.formatter:c=ga;const u=new Me(this.options);this.store=new be(this.options.resources,this.options);const d=this.services;d.logger=A,d.resourceStore=this.store,d.languageUtils=u,d.pluralResolver=new ua(u,{prepend:this.options.pluralSeparator}),c&&(d.formatter=a(c),d.formatter.init&&d.formatter.init(d,this.options),this.options.interpolation.format=d.formatter.format.bind(d.formatter)),d.interpolator=new Ne(this.options),d.utils={hasLoadedNamespace:this.hasLoadedNamespace.bind(this)},d.backendConnector=new ka(a(this.modules.backend),d.resourceStore,d,this.options),d.backendConnector.on("*",(f,...g)=>{this.emit(f,...g)}),this.modules.languageDetector&&(d.languageDetector=a(this.modules.languageDetector),d.languageDetector.init&&d.languageDetector.init(d,this.options.detection,this.options)),this.modules.i18nFormat&&(d.i18nFormat=a(this.modules.i18nFormat),d.i18nFormat.init&&d.i18nFormat.init(this)),this.translator=new ee(this.services,this.options),this.translator.on("*",(f,...g)=>{this.emit(f,...g)}),this.modules.external.forEach(f=>{f.init&&f.init(this)})}if(this.format=this.options.interpolation.format,t||(t=Y),this.options.fallbackLng&&!this.services.languageDetector&&!this.options.lng){const c=this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);c.length>0&&c[0]!=="dev"&&(this.options.lng=c[0])}!this.services.languageDetector&&!this.options.lng&&this.logger.warn("init: no languageDetector is used and no lng is defined"),["getResource","hasResourceBundle","getResourceBundle","getDataByLanguage"].forEach(c=>{this[c]=(...u)=>this.store[c](...u)}),["addResource","addResources","addResourceBundle","removeResourceBundle"].forEach(c=>{this[c]=(...u)=>(this.store[c](...u),this)});const o=K(),l=()=>{const c=(u,d)=>{this.isInitializing=!1,this.isInitialized&&!this.initializedStoreOnce&&this.logger.warn("init: i18next is already initialized. You should call init just once!"),this.isInitialized=!0,this.options.isClone||this.logger.log("initialized",this.options),this.emit("initialized",this.options),o.resolve(d),t(u,d)};if((this.languages||this.isLanguageChangingTo)&&!this.isInitialized)return c(null,this.t.bind(this));this.changeLanguage(this.options.lng,c)};return this.options.resources||!this.options.initAsync?l():setTimeout(l,0),o}loadResources(e,t=Y){var n,r;let s=t;const a=y(e)?e:this.language;if(typeof e=="function"&&(s=e),!this.options.resources||this.options.partialBundledLanguages){if((a==null?void 0:a.toLowerCase())==="cimode"&&(!this.options.preload||this.options.preload.length===0))return s();const o=[],l=c=>{if(!c||c==="cimode")return;this.services.languageUtils.toResolveHierarchy(c).forEach(d=>{d!=="cimode"&&(o.includes(d)||o.push(d))})};a?l(a):this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(u=>l(u)),(r=(n=this.options.preload)==null?void 0:n.forEach)==null||r.call(n,c=>l(c)),this.services.backendConnector.load(o,this.options.ns,c=>{!c&&!this.resolvedLanguage&&this.language&&this.setResolvedLanguage(this.language),s(c)})}else s(null)}reloadResources(e,t,s){const a=K();return typeof e=="function"&&(s=e,e=void 0),typeof t=="function"&&(s=t,t=void 0),e||(e=this.languages),t||(t=this.options.ns),s||(s=Y),this.services.backendConnector.reload(e,t,n=>{a.resolve(),s(n)}),a}use(e){if(!e)throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");if(!e.type)throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");return e.type==="backend"&&(this.modules.backend=e),(e.type==="logger"||e.log&&e.warn&&e.error)&&(this.modules.logger=e),e.type==="languageDetector"&&(this.modules.languageDetector=e),e.type==="i18nFormat"&&(this.modules.i18nFormat=e),e.type==="postProcessor"&&je.addPostProcessor(e),e.type==="formatter"&&(this.modules.formatter=e),e.type==="3rdParty"&&this.modules.external.push(e),this}setResolvedLanguage(e){if(!(!e||!this.languages)&&!["cimode","dev"].includes(e)){for(let t=0;t<this.languages.length;t++){const s=this.languages[t];if(!["cimode","dev"].includes(s)&&this.store.hasLanguageSomeTranslations(s)){this.resolvedLanguage=s;break}}!this.resolvedLanguage&&!this.languages.includes(e)&&this.store.hasLanguageSomeTranslations(e)&&(this.resolvedLanguage=e,this.languages.unshift(e))}}changeLanguage(e,t){this.isLanguageChangingTo=e;const s=K();this.emit("languageChanging",e);const a=o=>{this.language=o,this.languages=this.services.languageUtils.toResolveHierarchy(o),this.resolvedLanguage=void 0,this.setResolvedLanguage(o)},n=(o,l)=>{l?this.isLanguageChangingTo===e&&(a(l),this.translator.changeLanguage(l),this.isLanguageChangingTo=void 0,this.emit("languageChanged",l),this.logger.log("languageChanged",l)):this.isLanguageChangingTo=void 0,s.resolve((...c)=>this.t(...c)),t&&t(o,(...c)=>this.t(...c))},r=o=>{var u,d;!e&&!o&&this.services.languageDetector&&(o=[]);const l=y(o)?o:o&&o[0],c=this.store.hasLanguageSomeTranslations(l)?l:this.services.languageUtils.getBestMatchFromCodes(y(o)?[o]:o);c&&(this.language||a(c),this.translator.language||this.translator.changeLanguage(c),(d=(u=this.services.languageDetector)==null?void 0:u.cacheUserLanguage)==null||d.call(u,c)),this.loadResources(c,f=>{n(f,c)})};return!e&&this.services.languageDetector&&!this.services.languageDetector.async?r(this.services.languageDetector.detect()):!e&&this.services.languageDetector&&this.services.languageDetector.async?this.services.languageDetector.detect.length===0?this.services.languageDetector.detect().then(r):this.services.languageDetector.detect(r):r(e),s}getFixedT(e,t,s,a){const n=a==null?void 0:a.scopeNs,r=(o,l,...c)=>{let u;typeof l!="object"?u=this.options.overloadTranslationOptionHandler([o,l].concat(c)):u={...l},u.lng=u.lng||r.lng,u.lngs=u.lngs||r.lngs;const d=u.ns!==void 0&&u.ns!==null;u.ns=u.ns||r.ns,u.keyPrefix!==""&&(u.keyPrefix=u.keyPrefix||s||r.keyPrefix);const f={...this.options,...u};Array.isArray(n)&&!d&&(f.ns=n),typeof u.keyPrefix=="function"&&(u.keyPrefix=D(u.keyPrefix,f));const g=this.options.keySeparator||".";let p;return u.keyPrefix&&Array.isArray(o)?p=o.map(k=>(typeof k=="function"&&(k=D(k,f)),`${u.keyPrefix}${g}${k}`)):(typeof o=="function"&&(o=D(o,f)),p=u.keyPrefix?`${u.keyPrefix}${g}${o}`:o),this.t(p,u)};return y(e)?r.lng=e:r.lngs=e,r.ns=t,r.keyPrefix=s,r}t(...e){var t;return(t=this.translator)==null?void 0:t.translate(...e)}exists(...e){var t;return(t=this.translator)==null?void 0:t.exists(...e)}setDefaultNamespace(e){this.options.defaultNS=e}hasLoadedNamespace(e,t={}){if(!this.isInitialized)return this.logger.warn("hasLoadedNamespace: i18next was not initialized",this.languages),!1;if(!this.languages||!this.languages.length)return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty",this.languages),!1;const s=t.lng||this.resolvedLanguage||this.languages[0],a=this.options?this.options.fallbackLng:!1,n=this.languages[this.languages.length-1];if(s.toLowerCase()==="cimode")return!0;const r=(o,l)=>{const c=this.services.backendConnector.state[`${o}|${l}`];return c===-1||c===0||c===2};if(t.precheck){const o=t.precheck(this,r);if(o!==void 0)return o}return!!(this.hasResourceBundle(s,e)||!this.services.backendConnector.backend||this.options.resources&&!this.options.partialBundledLanguages||r(s,e)&&(!a||r(n,e)))}loadNamespaces(e,t){const s=K();return this.options.ns?(y(e)&&(e=[e]),e.forEach(a=>{this.options.ns.includes(a)||this.options.ns.push(a)}),this.loadResources(a=>{s.resolve(),t&&t(a)}),s):(t&&t(),Promise.resolve())}loadLanguages(e,t){const s=K();y(e)&&(e=[e]);const a=this.options.preload||[],n=e.filter(r=>!a.includes(r)&&this.services.languageUtils.isSupportedCode(r));return n.length?(this.options.preload=a.concat(n),this.loadResources(r=>{s.resolve(),t&&t(r)}),s):(t&&t(),Promise.resolve())}dir(e){var a,n;if(e||(e=this.resolvedLanguage||(((a=this.languages)==null?void 0:a.length)>0?this.languages[0]:this.language)),!e)return"rtl";try{const r=new Intl.Locale(e);if(r&&r.getTextInfo){const o=r.getTextInfo();if(o&&o.direction)return o.direction}}catch{}const t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ug","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam","ckb"],s=((n=this.services)==null?void 0:n.languageUtils)||new Me(re());return e.toLowerCase().indexOf("-latn")>1?"ltr":t.includes(s.getLanguagePartFromCode(e))||e.toLowerCase().indexOf("-arab")>1?"rtl":"ltr"}static createInstance(e={},t){const s=new Z(e,t);return s.createInstance=Z.createInstance,s}cloneInstance(e={},t=Y){const s=e.forkResourceStore;s&&delete e.forkResourceStore;const a={...this.options,...e,isClone:!0},n=new Z(a);if((e.debug!==void 0||e.prefix!==void 0)&&(n.logger=n.logger.clone(e)),["store","services","language"].forEach(o=>{n[o]=this[o]}),n.services={...this.services},n.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},s){const o=Object.keys(this.store.data).reduce((l,c)=>(l[c]={...this.store.data[c]},l[c]=Object.keys(l[c]).reduce((u,d)=>(u[d]={...l[c][d]},u),l[c]),l),{});n.store=new be(o,a),n.services.resourceStore=n.store}if(e.interpolation){const l={...re().interpolation,...this.options.interpolation,...e.interpolation},c={...a,interpolation:l};n.services.interpolator=new Ne(c)}return n.translator=new ee(n.services,a),n.translator.on("*",(o,...l)=>{n.emit(o,...l)}),n.init(a,t),n.translator.options=a,n.translator.backendConnector.services.utils={hasLoadedNamespace:n.hasLoadedNamespace.bind(n)},n}toJSON(){return{options:this.options,store:this.store,language:this.language,languages:this.languages,resolvedLanguage:this.resolvedLanguage}}}const P=Z.createInstance();P.createInstance;P.dir;P.init;P.loadResources;P.reloadResources;P.use;P.changeLanguage;P.getFixedT;P.t;P.exists;P.setDefaultNamespace;P.hasLoadedNamespace;P.loadNamespaces;P.loadLanguages;const xa=(i,e,t,s)=>{var n,r,o,l;const a=[t,{code:e,...s||{}}];if((r=(n=i==null?void 0:i.services)==null?void 0:n.logger)!=null&&r.forward)return i.services.logger.forward(a,"warn","react-i18next::",!0);q(a[0])&&(a[0]=`react-i18next:: ${a[0]}`),(l=(o=i==null?void 0:i.services)==null?void 0:o.logger)!=null&&l.warn?i.services.logger.warn(...a):console!=null&&console.warn&&console.warn(...a)},Ce={},ce=(i,e,t,s)=>{q(t)&&Ce[t]||(q(t)&&(Ce[t]=new Date),xa(i,e,t,s))},ze=(i,e)=>()=>{if(i.isInitialized)e();else{const t=()=>{setTimeout(()=>{i.off("initialized",t)},0),e()};i.on("initialized",t)}},le=(i,e,t)=>{i.loadNamespaces(e,ze(i,t))},Oe=(i,e,t,s)=>{if(q(t)&&(t=[t]),i.options.preload&&i.options.preload.indexOf(e)>-1)return le(i,t,s);t.forEach(a=>{i.options.ns.indexOf(a)<0&&i.options.ns.push(a)}),i.loadLanguages(e,ze(i,s))},va=(i,e,t={})=>!e.languages||!e.languages.length?(ce(e,"NO_LANGUAGES","i18n.languages were undefined or empty",{languages:e.languages}),!0):e.hasLoadedNamespace(i,{lng:t.lng,precheck:(s,a)=>{if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&s.services.backendConnector.backend&&s.isLanguageChangingTo&&!a(s.isLanguageChangingTo,i))return!1}}),q=i=>typeof i=="string",ba=i=>typeof i=="object"&&i!==null,Ma=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,wa={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},_a=i=>wa[i],Sa=i=>i.replace(Ma,_a);let he={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:Sa,transDefaultProps:void 0};const Na=(i={})=>{he={...he,...i}},$a=()=>he;let Ae;const La=i=>{Ae=i},Ca=()=>Ae,Ki={type:"3rdParty",init(i){Na(i.options.react),La(i)}},Oa=N.createContext();class Ra{constructor(){this.usedNamespaces={}}addUsedNamespaces(e){e.forEach(t=>{this.usedNamespaces[t]||(this.usedNamespaces[t]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}const Pa=(i,e)=>{if(q(e))return e;if(ba(e)&&q(e.defaultValue))return e.defaultValue;if(typeof i=="function")return"";if(Array.isArray(i)){const t=i[i.length-1];return typeof t=="function"?"":t}return i},ja={t:Pa,ready:!1},Ea=()=>()=>{},Bi=(i,e={})=>{var C,w,J;const{i18n:t}=e,{i18n:s,defaultNS:a}=N.useContext(Oa)||{},n=t||s||Ca();n&&!n.reportNamespaces&&(n.reportNamespaces=new Ra),n||ce(n,"NO_I18NEXT_INSTANCE","useTranslation: You will need to pass in an i18next instance by using initReactI18next");const r=N.useMemo(()=>{var v;return{...$a(),...(v=n==null?void 0:n.options)==null?void 0:v.react,...e}},[n,e]),{useSuspense:o,keyPrefix:l}=r,c=a||((C=n==null?void 0:n.options)==null?void 0:C.defaultNS),u=q(c)?[c]:c||["translation"],d=N.useMemo(()=>u,u);(J=(w=n==null?void 0:n.reportNamespaces)==null?void 0:w.addUsedNamespaces)==null||J.call(w,d);const f=N.useRef(0),g=N.useCallback(v=>{if(!n)return Ea;const{bindI18n:m,bindI18nStore:x}=r,S=()=>{f.current+=1,v()};return m&&n.on(m,S),x&&n.store.on(x,S),()=>{m&&m.split(" ").forEach(_=>n.off(_,S)),x&&x.split(" ").forEach(_=>n.store.off(_,S))}},[n,r]),p=N.useRef(),k=N.useCallback(()=>{if(!n)return ja;const v=!!(n.isInitialized||n.initializedStoreOnce)&&d.every(H=>va(H,n,r)),m=e.lng||n.language,x=f.current,S=p.current;if(S&&S.ready===v&&S.lng===m&&S.keyPrefix===l&&S.revision===x)return S;const R={t:n.getFixedT(m,r.nsMode==="fallback"?d:d[0],l,{scopeNs:d}),ready:v,lng:m,keyPrefix:l,revision:x};return p.current=R,R},[n,d,l,r,e.lng]),[b,j]=N.useState(0),{t:$,ready:L}=He.useSyncExternalStore(g,k,k);N.useEffect(()=>{if(n&&!L&&!o){const v=()=>j(m=>m+1);e.lng?Oe(n,e.lng,d,v):le(n,d,v)}},[n,e.lng,d,L,o,b]);const M=n||{},O=N.useRef(null),V=N.useRef(),z=v=>{const m=Object.getOwnPropertyDescriptors(v);m.__original&&delete m.__original;const x=Object.create(Object.getPrototypeOf(v),m);if(!Object.prototype.hasOwnProperty.call(x,"__original"))try{Object.defineProperty(x,"__original",{value:v,writable:!1,enumerable:!1,configurable:!1})}catch{}return x},T=N.useMemo(()=>{const v=M,m=v==null?void 0:v.language;let x=v;v&&(O.current&&O.current.__original===v?V.current!==m?(x=z(v),O.current=x,V.current=m):x=O.current:(x=z(v),O.current=x,V.current=m));const S=!L&&!o?(...R)=>(ce(n,"USE_T_BEFORE_READY","useTranslation: t was called before ready. When using useSuspense: false, make sure to check the ready flag before using t."),$(...R)):$,_=[S,x,L];return _.t=S,_.i18n=x,_.ready=L,_},[$,M,L,M.resolvedLanguage,M.language,M.languages]);if(n&&o&&!L)throw new Promise(v=>{const m=()=>v();e.lng?Oe(n,e.lng,d,m):le(n,d,m)});return T};export{li as $,Aa as A,Ua as B,Qa as C,pn as D,gn as E,Nn as F,Cn as G,qn as H,Dn as I,ri as J,oi as K,Vn as L,Wn as M,Qn as N,Ja as O,ti as P,jn as Q,Za as R,xi as S,hi as T,Vi as U,Ga as V,Xa as W,Ii as X,ai as Y,Li as Z,Si as _,Ka as a,Jn as a$,Ti as a0,Yn as a1,Fn as a2,Bn as a3,Zn as a4,dn as a5,Pi as a6,$i as a7,Pn as a8,Hn as a9,ci as aA,Ui as aB,Di as aC,Gn as aD,yi as aE,En as aF,Oi as aG,Mi as aH,Mn as aI,nn as aJ,mn as aK,Kn as aL,fi as aM,qi as aN,yn as aO,ni as aP,On as aQ,Ta as aR,Ni as aS,Un as aT,Ia as aU,Ci as aV,kn as aW,Va as aX,Tn as aY,wn as aZ,ln as a_,tn as aa,Wa as ab,_i as ac,Hi as ad,Ei as ae,zi as af,fn as ag,wi as ah,Ya as ai,hn as aj,ui as ak,In as al,Rn as am,Sn as an,ji as ao,zn as ap,rn as aq,ki as ar,_n as as,xn as at,bn as au,vn as av,$n as aw,di as ax,cn as ay,Ri as az,un as b,An as b0,P as b1,Ki as b2,vi as c,Xn as d,si as e,Ba as f,gi as g,qa as h,en as i,ii as j,mi as k,ei as l,bi as m,Da as n,Ha as o,Fa as p,sn as q,Te as r,He as s,on as t,Bi as u,an as v,Ai as w,pi as x,Ln as y,Fi as z};
