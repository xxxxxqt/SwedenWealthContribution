(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const l=window.d3;function Tt(t){const e=t.map(Math.floor);let n=100-l.sum(e);const o=t.map((a,s)=>({i:s,frac:a-Math.floor(a)})).sort((a,s)=>s.frac-a.frac);for(let a=0;a<o.length&&n>0;a+=1)e[o[a].i]+=1,n-=1;return e}const ft=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];l.scaleSqrt().domain([.001,50]).range([.6,6]);let j=[];async function qt(){const e=(await l.text("./data/wealth_avg.csv")).split(`
`),n=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};j=[];for(let a=1;a<e.length;a++){const s=e[a].split(",");if(s.length<n.length)continue;const d=Number(s[0]);if(!Number.isFinite(d))continue;const c={year:d};let u=!0;for(let i=1;i<n.length;i++){const r=o[n[i].trim()];if(!r)continue;const p=Number(s[i]);if(!Number.isFinite(p)){u=!1;break}c[r]=p}u&&c.bottom50!==void 0&&j.push(c)}j.sort((a,s)=>a.year-s.year),new Map(j.map(a=>[a.year,a]))}let H=[];async function Lt(){const e=(await l.text("./data/income_avg.csv")).split(`
`),n=e[0].split(","),o={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};H=[];for(let a=1;a<e.length;a++){const s=e[a].split(",");if(s.length<2)continue;const d=Number(s[0]);if(!Number.isFinite(d))continue;const c={year:d};for(let u=1;u<n.length;u++){const i=o[n[u].trim()];i&&(c[i]=Number(s[u])||0)}c.bottom50!==void 0&&H.push(c)}H.sort((a,s)=>a.year-s.year),new Map(H.map(a=>[a.year,a]))}function Ct(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function ut(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function K(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}ft.filter(t=>["top0001","top001"].includes(t.key));ft.filter(t=>!["top0001","top001"].includes(t.key));l.scaleSqrt().domain([.001,50]).range([.6,6]);async function It(){await Promise.all([qt(),Lt()]),Dt()}It();const Bt=[1980,1990,2e3,2010,2020,2024],T=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 9%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 0.9%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.09%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.009%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Z=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function D(t,e,n){const o=Math.log10(.001),a=Math.log10(50),s=(Math.log10(Math.max(t,1e-4))-o)/(a-o);return e+s*(n-e)}let R=[],O=[],bt=new Map,tt=new Map,_=null;function ht(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function Nt(){R.length&&O.length||(R=H.map(ht).filter(Boolean),O=j.map(ht).filter(Boolean),bt=new Map(R.map(t=>[t.year,t])),tt=new Map(O.map(t=>[t.year,t])))}function z(){return R.map(t=>t.year).filter(t=>tt.has(t))}function _t(t){var o;const e=new Set(z()),n=Array.from(new Set(((o=String(t).match(/\d{4}/g))==null?void 0:o.map(Number))||[])).filter(a=>e.has(a)).sort((a,s)=>a-s);return n.length?n:Bt.filter(a=>e.has(a))}function B(t,e){return(t==="income"?bt:tt).get(e)}function A(t){return t==="income"?R:O}function I(t,e,n){return t.values[e.key]}function V(t){return`${Ct(t)} SEK`}function N(t,e){const n=document.createElement("div");if(n.className="cwi-card",e){const o=document.createElement("h3");o.textContent=e,n.appendChild(o)}return t.appendChild(n),n}function et(t,e,n,o){const a=document.createElement("div");a.className="cwi-anim-bar",a.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(a);const s=N(t,o),d=document.createElement("div");s.appendChild(d);const c=a.querySelector("#cwi-matrix-year"),u=a.querySelector("#cwi-matrix-play"),i=a.querySelector("#cwi-matrix-year-label"),r=p=>{const h=e[p];i.textContent=String(h),n(h,d)};c.addEventListener("input",()=>r(Number(c.value))),u.addEventListener("click",()=>{if(_){clearInterval(_),_=null,u.textContent="Play";return}u.textContent="Pause",_=setInterval(()=>{const p=(Number(c.value)+1)%e.length;c.value=String(p),r(p)},900)}),r(0)}function At(t,e,n,o,a){const s=a.includes("income"),d=a.includes("wealth"),c=`${s?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`,u=(i,r,p)=>{const h=o?`<td>${ut(i.pop)}</td>`:"",m=s?`<td>${V(r.values[i.key])}</td>`:"",y=d?`<td>${V(p.values[i.key])}</td>`:"";return`<tr><td>${i.label}</td>${h}${m}${y}</tr>`};if(n==="juxtaposition"){const i=document.createElement("div");i.className="cwi-years-grid",t.appendChild(i),e.forEach(r=>{const p=N(i,String(r)),h=document.createElement("table");h.className="cwi-table",h.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${T.map(m=>u(m,B("income",r),B("wealth",r))).join("")}</tbody>`,p.appendChild(h)});return}if(n==="superposition"){const i=N(t,"Combined table across selected years"),r=document.createElement("table");r.className="cwi-table";const p=a.length,h=`<tr><th rowspan="2">Group</th>${o?'<th rowspan="2">Pop.</th>':""}${e.map(w=>`<th colspan="${p}">${w}</th>`).join("")}</tr>`,m=`<tr>${e.map(()=>`${s?"<th>Income</th>":""}${d?"<th>Wealth</th>":""}`).join("")}</tr>`,y=T.map(w=>{const f=e.map(g=>{const b=B("income",g),S=B("wealth",g);return`${s?`<td>${V(b.values[w.key])}</td>`:""}${d?`<td>${V(S.values[w.key])}</td>`:""}`}).join("");return`<tr><td>${w.label}</td>${o?`<td>${ut(w.pop)}</td>`:""}${f}</tr>`}).join("");r.innerHTML=`<thead>${h}${m}</thead><tbody>${y}</tbody>`,i.appendChild(r);return}et(t,z(),(i,r)=>{r.innerHTML="";const p=document.createElement("table");p.className="cwi-table",p.innerHTML=`<thead><tr><th>Group</th>${o?"<th>Pop.</th>":""}${c}</tr></thead><tbody>${T.map(h=>u(h,B("income",i),B("wealth",i))).join("")}</tbody>`,r.appendChild(p)},"Animated table")}function mt(t,e,n,o){const a=l.select(t),s=520,d=310,c={top:18,right:16,bottom:20,left:120},u=s-c.left-c.right,i=d-c.top-c.bottom,r=T.map(f=>I(e,f)),p=l.min(r),h=l.max(r),m=n==="wealth"?l.scaleSymlog().constant(1e6).domain([Math.min(0,p*1.1),h*1.05]).range([0,u]):l.scaleLinear().domain([0,h*1.05]).range([0,u]),y=i/T.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${s} ${d}`),a.selectAll("*").remove();const w=a.append("g").attr("transform",`translate(${c.left},${c.top})`);n==="wealth"&&w.append("line").attr("x1",m(0)).attr("x2",m(0)).attr("y1",0).attr("y2",i).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),T.forEach((f,g)=>{const b=I(e,f),S=o?D(f.pop,y*.18,y*.82):y*.7,q=g*y+y/2,C=q-S/2,v=m(n==="wealth"?Math.min(0,b):0),k=m(b);w.append("text").attr("x",-10).attr("y",q).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(f.label),w.append("rect").attr("x",Math.min(v,k)).attr("y",C).attr("width",Math.max(2,Math.abs(k-v))).attr("height",S).attr("rx",4).attr("fill",f.color),w.append("text").attr("x",b>=0?Math.max(v,k)+6:Math.min(v,k)-6).attr("y",q).attr("dy","0.35em").attr("text-anchor",b>=0?"start":"end").attr("font-size",10).text(V(b))})}function Wt(t,e,n,o,a){const s=d=>{if(a.length===1)return d;const c=document.createElement("div");return c.className="cwi-grid-2",d.appendChild(c),c};if(n==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(c=>{const u=N(d,String(c)),i=s(u);a.forEach(r=>{const p=document.createElement("div");p.innerHTML=`<p class="cwi-chart-title">${r==="income"?"Income":"Wealth"}</p>`;const h=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(h),i.appendChild(p),mt(h,B(r,c),r,o)})});return}if(n==="superposition"){const d=s(t);a.forEach(c=>{const r=N(d,c==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),p=(L,E)=>L?I(L,E):0,h=B(c,e[0]);l.sum(T,L=>L.pop);const m=e.flatMap(L=>T.map(E=>p(B(c,L),E))),y=l.max(m.map(Math.abs))*1.1,w=Math.min(0,l.min(m))*1.1,f=at(w,y),g=700,b=360,S={top:24,right:16,bottom:44,left:72},q=g-S.left-S.right,C=b-S.top-S.bottom,k=l.select(r).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${g} ${b}`).append("g").attr("transform",`translate(${S.left},${S.top})`),$=l.scaleBand().domain(e).range([0,q]).paddingInner(.2),x=l.scaleSymlog().constant(1e5).domain([w,y]).range([C,0]);k.append("g").attr("transform",`translate(0,${C})`).call(l.axisBottom($).tickFormat(l.format("d"))),k.append("g").call(l.axisLeft(x).tickValues(f).tickFormat(K)),w<0&&k.append("line").attr("x1",0).attr("x2",q).attr("y1",x(0)).attr("y2",x(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),e.forEach(L=>{const E=B(c,L);if(!E)return;const F=$.bandwidth(),it=2,lt=T.length,ct=F-it*lt,dt=T.map(P=>D(P.pop,.1,1)),Et=l.sum(dt);let Y=$(L);T.forEach((P,St)=>{const G=Math.max(o?dt[St]/Et*ct:ct/lt,3),J=p(E,P),$t=J>=0?x(J):x(0),Mt=Math.max(1,Math.abs(x(J)-x(0)));if(k.append("rect").attr("x",Y).attr("y",$t).attr("width",G).attr("height",Mt).attr("fill",P.color).attr("rx",2).attr("opacity",.85),h&&L!==e[0]){const pt=p(h,P);k.append("line").attr("x1",Y).attr("x2",Y+G).attr("y1",x(pt)).attr("y2",x(pt)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}Y+=G+it})})});return}et(t,z(),(d,c)=>{c.innerHTML="";const u=s(c);a.forEach(i=>{const r=document.createElement("div");r.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const p=document.createElementNS("http://www.w3.org/2000/svg","svg");r.appendChild(p),u.appendChild(r),mt(p,B(i,d),i,o)})},"Animated bars")}function at(t,e){const n=[];if(t<0&&n.push(t),n.push(0),e<=0)return n;const o=Math.max(3,Math.log10(e)-3),a=Math.log10(e);for(let s=1;s<=3;s++){const d=Math.pow(10,Math.round(o+(a-o)*s/4));!n.includes(d)&&d<e*.95&&n.push(d)}return n}function zt(t,e,n,o,a,s){const d=l.select(t),c=400,u=250,i={top:14,right:58,bottom:30,left:66},r=c-i.left-i.right,p=u-i.top-i.bottom,h=z(),m=l.scaleLinear().domain(l.extent(h)).range([0,r]),[y,w]=s,f=y<0,g=l.scaleSymlog().constant(1e6).domain([f?y*1.12:0,w*1.1]).range([p,0]),b=at(y,w);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${c} ${u}`),d.selectAll("*").remove();const S=d.append("g").attr("transform",`translate(${i.left},${i.top})`);S.selectAll("line.hg").data(b).join("line").attr("class","hg").attr("x1",0).attr("x2",r).attr("y1",v=>g(v)).attr("y2",v=>g(v)).attr("stroke","#e8eaed").attr("stroke-width",.8),S.append("g").attr("transform",`translate(0,${p})`).call(l.axisBottom(m).ticks(5).tickFormat(l.format("d"))).call(v=>v.selectAll("text").attr("font-size",10)),S.append("g").call(l.axisLeft(g).tickValues(b).tickFormat(K)).call(v=>v.selectAll("text").attr("font-size",10)),f&&S.append("line").attr("x1",0).attr("x2",r).attr("y1",g(0)).attr("y2",g(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),S.selectAll(".yr-mark").data(a).join("line").attr("class","yr-mark").attr("x1",v=>m(v)).attr("x2",v=>m(v)).attr("y1",0).attr("y2",p).attr("stroke","#dee2e6").attr("stroke-width",1.5);const q=o?D(e.pop,1,10):1.8;n.forEach((v,k)=>{const $=A(v),x=l.line().defined(L=>Number.isFinite(I(L,e))).x(L=>m(L.year)).y(L=>g(I(L,e)));S.append("path").datum($).attr("fill","none").attr("stroke",e.color).attr("stroke-width",q).attr("stroke-dasharray",k===1?"5 3":null).attr("d",x)});const C=A(n[0]).at(-1);if(C){const v=I(C,e);Number.isFinite(v)&&S.append("text").attr("x",r+4).attr("y",g(v)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(K(v))}}function Ft(t,e,n,o){const a=A(e),s=l.select(t),d=620,c=340,u={top:20,right:110,bottom:28,left:70},i=d-u.left-u.right,r=c-u.top-u.bottom,p=a.flatMap(g=>T.map(b=>I(g,b))),h=l.min(p),m=l.max(p),y=l.scaleLinear().domain(l.extent(a,g=>g.year)).range([0,i]),w=e==="wealth"?l.scaleSymlog().constant(1e6).domain([h*1.1,m*1.06]).range([r,0]):l.scaleSymlog().constant(1e4).domain([0,m*1.06]).range([r,0]);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${d} ${c}`),s.selectAll("*").remove();const f=s.append("g").attr("transform",`translate(${u.left},${u.top})`);f.append("g").attr("transform",`translate(0,${r})`).call(l.axisBottom(y).tickFormat(l.format("d"))),f.append("g").call(l.axisLeft(w).tickValues(at(h,m)).tickFormat(K)),e==="wealth"&&h<0&&f.append("line").attr("x1",0).attr("x2",i).attr("y1",w(0)).attr("y2",w(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),f.selectAll(".year-mark").data(o).join("line").attr("x1",g=>y(g)).attr("x2",g=>y(g)).attr("y1",0).attr("y2",r).attr("stroke","#f1f3f5"),T.forEach(g=>{const b=l.line().x(q=>y(q.year)).y(q=>w(I(q,g)));f.append("path").datum(a).attr("fill","none").attr("stroke",g.color).attr("stroke-width",n?D(g.pop,1,10):2).attr("d",b);const S=a[a.length-1];f.append("text").attr("x",i+6).attr("y",w(I(S,g))).attr("dy","0.35em").attr("font-size",10).attr("fill",g.color).text(g.label)})}function Pt(t,e,n,o,a){if(n==="juxtaposition"){const b=a.includes("income")?A("income"):[],S=a.includes("wealth")?A("wealth"):[],q=[...b.flatMap(k=>T.map($=>I(k,$))),...S.flatMap(k=>T.map($=>I(k,$)))].filter(Number.isFinite),C=[l.min(q),l.max(q)];if(a.length>1){const k=document.createElement("p");k.className="cwi-note",k.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(k)}const v=document.createElement("div");v.className="cwi-sm-grid",t.appendChild(v),T.forEach(k=>{const $=N(v,k.label),x=document.createElementNS("http://www.w3.org/2000/svg","svg");$.appendChild(x),zt(x,k,a,o,e,C)});return}if(a.length===1){const b=N(t,a[0]==="income"?"Income over time":"Wealth over time"),S=document.createElementNS("http://www.w3.org/2000/svg","svg");b.appendChild(S),Ft(S,a[0],o,e);return}const s=N(t,"Superposed indexed lines (income solid, wealth dashed)"),d=document.createElement("div");d.className="cwi-inline-legend",d.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',s.appendChild(d);const c=l.select(s).append("svg").attr("class","cwi-svg tall"),u=840,i=380,r={top:20,right:120,bottom:28,left:70},p=u-r.left-r.right,h=i-r.top-r.bottom,m=z(),y=m.map(b=>({year:b,income:B("income",b),wealth:B("wealth",b)})),w=l.scaleLinear().domain(l.extent(m)).range([0,p]),f=l.scaleLinear().domain([0,260]).range([h,0]);c.attr("viewBox",`0 0 ${u} ${i}`);const g=c.append("g").attr("transform",`translate(${r.left},${r.top})`);g.append("g").attr("transform",`translate(0,${h})`).call(l.axisBottom(w).tickFormat(l.format("d"))),g.append("g").call(l.axisLeft(f).ticks(6).tickFormat(b=>`${Math.round(b)}%`)),T.forEach(b=>{const S=Math.abs(I(y[0].income,b))||1,q=Math.abs(I(y[0].wealth,b))||1,C=l.line().x($=>w($.year)).y($=>f(Math.abs(I($.income,b))/S*100)),v=l.line().x($=>w($.year)).y($=>f(Math.abs(I($.wealth,b))/q*100)),k=o?D(b.pop,1,7):2;g.append("path").datum(y).attr("fill","none").attr("stroke",b.color).attr("stroke-width",k).attr("d",C),g.append("path").datum(y).attr("fill","none").attr("stroke",b.color).attr("stroke-width",k).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",v)})}function jt(t,e,n,o,a){const s=i=>{const r=Ht("income"),p=[...T.map(x=>x.key),"_other"],h=new Map([...T.map(x=>[x.key,x.color]),["_other","#dee2e6"]]),m=l.select(i),y=700,w=340,f={top:20,right:20,bottom:28,left:55},g=y-f.left-f.right,b=w-f.top-f.bottom,q=l.stack().keys(p).offset(l.stackOffsetNone)(r),C=l.scaleLinear().domain(l.extent(r,x=>x.year)).range([0,g]),v=l.scaleLinear().domain([0,100]).range([b,0]),k=l.area().x(x=>C(x.data.year)).y0(x=>v(x[0])).y1(x=>v(x[1]));m.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${w}`),m.selectAll("*").remove();const $=m.append("g").attr("transform",`translate(${f.left},${f.top})`);$.append("g").attr("transform",`translate(0,${b})`).call(l.axisBottom(C).tickFormat(l.format("d"))),$.append("g").call(l.axisLeft(v).ticks(6).tickFormat(x=>`${x}%`)),$.selectAll(".year-mark").data(e).join("line").attr("x1",x=>C(x)).attr("x2",x=>C(x)).attr("y1",0).attr("y2",b).attr("stroke","#e9ecef"),$.selectAll(".layer").data(q).join("path").attr("class","layer").attr("d",k).attr("fill",x=>h.get(x.key)||"#dee2e6").attr("opacity",.88)},d=i=>{const r=Vt(),p=[...T.map(E=>E.key),"_other"],h=new Map([...T.map(E=>[E.key,E.color]),["_other","#dee2e6"]]),m=l.select(i),y=700,w=340,f={top:20,right:20,bottom:28,left:55},g=y-f.left-f.right,b=w-f.top-f.bottom,q=l.stack().keys(p).offset(l.stackOffsetDiverging)(r),C=l.min(q,E=>l.min(E,F=>F[0])),v=l.max(q,E=>l.max(E,F=>F[1])),k=l.scaleLinear().domain(l.extent(r,E=>E.year)).range([0,g]),$=l.scaleLinear().domain([C*1.05,v*1.02]).range([b,0]),x=l.area().x(E=>k(E.data.year)).y0(E=>$(E[0])).y1(E=>$(E[1]));m.attr("class","cwi-svg").attr("viewBox",`0 0 ${y} ${w}`),m.selectAll("*").remove();const L=m.append("g").attr("transform",`translate(${f.left},${f.top})`);L.append("g").attr("transform",`translate(0,${b})`).call(l.axisBottom(k).tickFormat(l.format("d"))),L.append("g").call(l.axisLeft($).ticks(6).tickFormat(E=>`${E.toFixed(0)}%`)),L.append("line").attr("x1",0).attr("x2",g).attr("y1",$(0)).attr("y2",$(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),L.selectAll(".year-mark").data(e).join("line").attr("x1",E=>k(E)).attr("x2",E=>k(E)).attr("y1",0).attr("y2",b).attr("stroke","#e9ecef"),L.selectAll(".layer").data(q).join("path").attr("class","layer").attr("d",x).attr("fill",E=>h.get(E.key)||"#dee2e6").attr("opacity",.88)},u=(i=>{if(a.length===1)return i;const r=document.createElement("div");return r.className="cwi-grid-2",i.appendChild(r),r})(t);a.forEach(i=>{const p=N(u,i==="income"?"Income share (% of total net income, gray = Middle 40%)":"Wealth share (% of total net wealth, gray = Middle 40%, below 0 = net debt)"),h=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(h),i==="income"?s(h):d(h)})}function gt(t){const e=B("income",t),n=l.sum(Z,o=>Math.max(0,e.totals[o]||0));return T.map(o=>{const a=Math.max(0,e.totals[o.key]||0);return n>0?a/n*100:0})}function wt(t,e,n,o,a,s,d){e.forEach(i=>{t.append("rect").attr("x",i.x).attr("y",i.y).attr("width",n).attr("height",o).attr("rx",3).attr("fill",d)});let c=0;a.map((i,r)=>{const p={start:c,end:c+i,color:s[r]};return c+=i,p}).forEach(i=>{e.forEach(r=>{const p=Math.max(r.i,i.start),h=Math.min(r.i+1,i.end);if(h<=p+.001)return;const m=p-r.i,y=h-r.i,w=y-m>=.999,f=r.y+o*(1-y),g=Math.max(1,o*(y-m));t.append("rect").attr("x",r.x).attr("y",f).attr("width",n).attr("height",g).attr("rx",w?3:1).attr("fill",i.color)})})}function Ht(t){return A(t).map(e=>{const n=l.sum(Z,a=>Math.max(0,e.totals[a]||0)),o={year:e.year};return T.forEach(a=>{o[a.key]=n>0?Math.max(0,e.totals[a.key]||0)/n*100:0}),o._other=Math.max(0,100-l.sum(T,a=>o[a.key])),o})}function Vt(){return A("wealth").map(t=>{const e=l.sum(Z,o=>t.totals[o]||0),n={year:t.year};return T.forEach(o=>{n[o.key]=e!==0?(t.totals[o.key]||0)/e*100:0}),n._other=e!==0?Math.max(0,(t.totals.middle40||0)/e*100):0,n})}function yt(t,e,n){const o=l.select(t),a=250,s=n?290:240,d=20,c=gt(e);o.attr("class","cwi-svg").attr("viewBox",`0 0 ${a} ${s}`),o.selectAll("*").remove();const u=l.range(100).map(r=>({i:r,x:15+r%10*22,y:15+(9-Math.floor(r/10))*22})),i=o.append("g");if(wt(i,u,d,d,c,T.map(r=>r.color),"#eef1ea"),n){const r=[...T.map(y=>y.pop),40],p=[...T.map(y=>y.color),"#dee2e6"],h=Tt(r);let m=0;o.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),h.forEach((y,w)=>{for(let f=0;f<y;f+=1)o.append("rect").attr("x",15+m*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",p[w]).attr("opacity",.75),m+=1})}}function Rt(t,e,n,o){const a=document.createElement("div");if(a.className="cwi-note",a.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(a),n==="juxtaposition"){T.forEach((s,d)=>{const c=document.createElement("div");c.style.cssText="margin-bottom:1.2rem;";const u=document.createElement("h4");u.textContent=s.label,u.style.cssText=`font-size:0.95rem;font-weight:700;color:${s.color};margin:0 0 0.4rem;`,c.appendChild(u);const i=document.createElement("div");i.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(r=>{const p=N(i,String(r));p.style.minWidth="170px";const m=gt(r)[d],y=l.select(p).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),w=l.range(100).map(b=>({i:b,x:10+b%10*22,y:10+(9-Math.floor(b/10))*22})),f=y.append("g");wt(f,w,20,20,[m],[s.color],"#e9ecef");const g=document.createElement("p");g.textContent=`${m.toFixed(2)}%`,g.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",p.appendChild(g)}),c.appendChild(i),t.appendChild(c)});return}if(n==="superposition"){const s=document.createElement("div");s.className="cwi-years-grid";const d=document.createElement("div");d.className="cwi-inline-legend",d.style.marginBottom="0.6rem",T.forEach(c=>{const u=document.createElement("span");u.innerHTML=`<i style="background:${c.color}"></i><span>${c.label}</span>`,d.appendChild(u)}),t.appendChild(d),t.appendChild(s),e.forEach(c=>{const u=N(s,String(c)),i=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(i),yt(i,c,o)});return}et(t,z(),(s,d)=>{d.innerHTML="";const c=document.createElementNS("http://www.w3.org/2000/svg","svg");d.appendChild(c),yt(c,s,o)},"Animated income waffle")}function Dt(){Nt();const t=document.getElementById("cwi-spec-summary"),e=document.getElementById("cwi-years-input"),n=document.getElementById("cwi-representation"),o=document.getElementById("cwi-comparison"),a=document.getElementById("cwi-metric"),s=document.getElementById("cwi-pop-encoding"),d=document.getElementById("cwi-meta"),c=document.getElementById("cwi-note"),u=document.getElementById("cwi-render-root");if(!t||!e||!n||!o||!a||!s||!d||!c||!u)return;t.innerHTML="<strong>30 combinations</strong> from 5 representations × 3 comparison conditions × 2 population encodings, minus <strong>2 invalid animation cases</strong> for line and stacked area charts. That leaves <strong>28 valid configurations</strong>.";const i=()=>{_&&(clearInterval(_),_=null);const r=_t(e.value),p=n.value,h=s.value==="with";a.disabled=p==="waffle",p==="waffle"&&(a.value="income");const m=a.value==="both"?["income","wealth"]:[a.value];Array.from(o.options).forEach(f=>{f.disabled=(p==="line"||p==="stacked")&&f.value==="animation"}),(p==="line"||p==="stacked")&&o.value==="animation"&&(o.value="juxtaposition");const y=o.value,w=m.length===2?"income + wealth":m[0];d.textContent=`Configuration: ${p} / ${y} / ${w} / ${h?"with":"without"} pop. encoding. Years: ${r.join(", ")}.`,c.textContent=p==="waffle"?"Waffle charts show income only — wealth has negative values that cannot map to waffle proportions.":p==="line"||p==="stacked"?"Line and stacked-area charts use the full time series; selected years are marked as reference points.":"Discrete views use the selected comparison years directly. Edit the year list above to change time points.",u.innerHTML="",p==="table"&&At(u,r,y,h,m),p==="bar"&&Wt(u,r,y,h,m),p==="line"&&Pt(u,r,y,h,m),p==="stacked"&&jt(u,r,y,h,m),p==="waffle"&&Rt(u,r,y,h)};n.addEventListener("change",i),o.addEventListener("change",i),a.addEventListener("change",i),s.addEventListener("change",i),e.addEventListener("change",i),e.addEventListener("blur",i),i()}const nt="1.0",xt="wealth-study-data",W=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University. The study investigates how different visualization types help people understand wealth and income inequality in Sweden.</p>
      <p><strong>What you will do:</strong> Answer a few background questions, interact with an interactive chart tool, and answer questions about what you see. The study takes approximately <strong>10–15 minutes</strong>.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data (name, email, IP address) is collected. At the end you can download a copy of your answers as a JSON file for the researcher.</p>
      <p><strong>Participation is voluntary.</strong> You may stop at any time by closing the browser tab.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start Study",requireConsent:!0},{id:"pre_q1",type:"question",phase:"Pre-study",questionNum:"1 / 3",text:"In 2024, approximately what share of Sweden's total wealth was held by the richest 1% of adults?",options:[{label:"Less than 15 %",value:"a"},{label:"15 – 25 %",value:"b"},{label:"25 – 35 %",value:"c"},{label:"35 – 50 %",value:"d"},{label:"More than 50 %",value:"e"}],correctValue:"d",note:"(Answer this from memory — no need to look anything up yet.)"},{id:"pre_q2",type:"question",phase:"Pre-study",questionNum:"2 / 3",text:"How do you think Swedish wealth inequality has changed between 1980 and 2024?",options:[{label:"It decreased significantly",value:"a"},{label:"It decreased slightly",value:"b"},{label:"It stayed about the same",value:"c"},{label:"It increased slightly",value:"d"},{label:"It increased significantly",value:"e"}],correctValue:"e",note:"(Answer from your current understanding.)"},{id:"pre_q3",type:"question",phase:"Pre-study",questionNum:"3 / 3",text:"Compared to income inequality, how unequal is wealth distribution in Sweden?",options:[{label:"Wealth is much less unequal than income",value:"a"},{label:"Wealth is slightly less unequal than income",value:"b"},{label:"They are about equally unequal",value:"c"},{label:"Wealth is slightly more unequal than income",value:"d"},{label:"Wealth is much more unequal than income",value:"e"}],correctValue:"e",note:"(Answer from your current understanding.)"},{id:"task_intro",type:"info",title:"Visualization Tasks",content:`
      <p>You will now complete <strong>5 short tasks</strong> using the visualization tool.</p>
      <p>For each task, the chart will be set to a specific configuration automatically.
         Read the task description carefully, explore the chart, then answer the question.</p>
      <p>The chart controls (Representation, Comparison, etc.) are available above the chart —
         feel free to adjust them if a task asks you to explore, but some tasks will lock them
         to a required setting.</p>
      <ul>
        <li>You can zoom in, hover for tooltips, and read axis labels.</li>
        <li>There is no time limit — take as long as you need.</li>
        <li>Some questions have a correct answer; others ask for your opinion.</li>
      </ul>`,nextLabel:"Begin Tasks"},{id:"task1",type:"task",phase:"Task 1 of 5",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"The chart shows average net personal wealth (SEK) for six population groups in selected years. Examine the bar chart, paying particular attention to the 2024 column.",questionText:"In 2024, what was approximately the net wealth position of the Bottom 50% of Swedish adults?",options:[{label:"About +500,000 SEK (positive wealth)",value:"a"},{label:"About +100,000 SEK (slightly positive)",value:"b"},{label:"Near zero or negative (effectively no net wealth)",value:"c"},{label:"About −1,000,000 SEK (heavily in debt)",value:"d"},{label:"Cannot tell from the chart",value:"e"}],correctValue:"c"},{id:"task2",type:"task",phase:"Task 2 of 5",vizConfig:{representation:"table",comparison:"juxtaposition",metric:"both",popEncoding:"without",years:"1980,2024"},taskText:"The table now shows numerical values for both income and wealth in 1980 and 2024. Examine the numbers for the Top 1% and Top 0.1% rows.",questionText:"Based on the numbers in the table: between 1980 and 2024, which increased more — income inequality or wealth inequality?",options:[{label:"Income inequality increased more",value:"a"},{label:"Wealth inequality increased more",value:"b"},{label:"They increased about equally",value:"c"},{label:"Both decreased",value:"d"},{label:"Cannot tell from the table",value:"e"}],correctValue:"b"},{id:"task3",type:"task",phase:"Task 3 of 5",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"both",popEncoding:"without",years:"1980,2024"},taskText:"The same data (income and wealth for 1980 and 2024) is now shown as a bar chart instead of a table.",questionText:"Based on the bar chart: between 1980 and 2024, which increased more — income inequality or wealth inequality?",options:[{label:"Income inequality increased more",value:"a"},{label:"Wealth inequality increased more",value:"b"},{label:"They increased about equally",value:"c"},{label:"Both decreased",value:"d"},{label:"Cannot tell from the chart",value:"e"}],correctValue:"b",note:"This is the same question as Task 2 — we are comparing how easy it is to answer with a table vs. a chart."},{id:"task4",type:"task",phase:"Task 4 of 5",vizConfig:{representation:"line",comparison:"superposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"All six groups are shown as overlapping lines (WITHOUT population-size encoding — all lines have the same thickness). Each line shows how average wealth changed from 1980 to 2024.",questionText:"Without looking at the legend, can you tell from the chart alone which group has the SMALLEST population (fewest number of people)?",options:[{label:"Yes — it is clearly the Bottom 50%",value:"a"},{label:"Yes — it is clearly the Top 0.001%",value:"b"},{label:"Yes — it is one of the middle groups",value:"c"},{label:"No — the chart gives no information about group size",value:"d"}],correctValue:"d"},{id:"task5",type:"task",phase:"Task 5 of 5",vizConfig:{representation:"line",comparison:"superposition",metric:"wealth",popEncoding:"with",years:"1980,1990,2000,2010,2020,2024"},taskText:"The same chart is now shown WITH population-size encoding: each line's thickness is proportional to the group's share of the population. A thicker line means a larger group.",questionText:"Based on the line thicknesses, which group has the SMALLEST population (fewest number of people)?",options:[{label:"Bottom 50%",value:"a"},{label:"Top 9%",value:"b"},{label:"Top 0.9%",value:"c"},{label:"Top 0.09%",value:"d"},{label:"Top 0.001%",value:"e"}],correctValue:"e",note:"The Top 0.001% of Sweden's adult population is approximately 80 people out of 8 million."},{id:"post_q1",type:"question",phase:"Post-study",questionNum:"1 / 5",text:"After using the visualization tool, what do you now think is the approximate share of total Swedish wealth held by the richest 1% in 2024?",options:[{label:"Less than 15 %",value:"a"},{label:"15 – 25 %",value:"b"},{label:"25 – 35 %",value:"c"},{label:"35 – 50 %",value:"d"},{label:"More than 50 %",value:"e"}],correctValue:"d"},{id:"post_q2",type:"question",phase:"Post-study",questionNum:"2 / 5",text:"After using the tool, how do you think Swedish wealth inequality changed between 1980 and 2024?",options:[{label:"It decreased significantly",value:"a"},{label:"It decreased slightly",value:"b"},{label:"It stayed about the same",value:"c"},{label:"It increased slightly",value:"d"},{label:"It increased significantly",value:"e"}],correctValue:"e"},{id:"post_q3",type:"question",phase:"Post-study",questionNum:"3 / 5",text:"After using the tool, how unequal is wealth distribution in Sweden compared to income distribution?",options:[{label:"Wealth is much less unequal than income",value:"a"},{label:"Wealth is slightly less unequal than income",value:"b"},{label:"They are about equally unequal",value:"c"},{label:"Wealth is slightly more unequal than income",value:"d"},{label:"Wealth is much more unequal than income",value:"e"}],correctValue:"e"},{id:"post_q4",type:"question",phase:"Post-study",questionNum:"4 / 5",text:"In Task 5, line thickness was proportional to group population share. Did the thickness encoding help you understand how few people are in the top groups?",options:[{label:"Yes, it was very helpful",value:"5"},{label:"Yes, it was somewhat helpful",value:"4"},{label:"Neither helpful nor unhelpful",value:"3"},{label:"No, it was somewhat confusing",value:"2"},{label:"No, it was very confusing",value:"1"}]},{id:"post_q5",type:"question",phase:"Post-study",questionNum:"5 / 5",text:"Which chart type did you find most useful for understanding the wealth and income distribution?",options:[{label:"Data table",value:"table"},{label:"Line chart",value:"line"},{label:"Stacked area chart",value:"stacked"},{label:"Bar chart",value:"bar"},{label:"Waffle chart",value:"waffle"}]},{id:"complete",type:"complete",title:"Thank you for participating!",content:`
      <p>Your responses have been recorded. Please download your data file and send it to the researcher.</p>
      <p><strong>Contact:</strong> Submit your downloaded JSON file to the researcher as instructed.</p>`}],M={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function Yt(t){const e=document.getElementById("cwi-representation"),n=document.getElementById("cwi-comparison"),o=document.getElementById("cwi-metric"),a=document.getElementById("cwi-pop-encoding"),s=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(s.value=t.years,s.dispatchEvent(new Event("change"))),t.metric&&(o.value=t.metric),t.comparison&&(n.value=t.comparison),t.popEncoding&&(a.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function vt(t,e,n={}){M.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(M.stepTimes[t]||M.startTime),...n},localStorage.setItem(xt,JSON.stringify({state:M,version:nt}))}function Ot(){W.find(a=>a.id==="pre_q1");const t={participantId:M.participantId,studyVersion:nt,startTime:new Date(M.startTime).toISOString(),completedTime:new Date().toISOString(),answers:M.answers,summary:kt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=`study-${M.participantId}.json`,o.click(),URL.revokeObjectURL(n)}function kt(){var o,a,s,d,c,u,i;const t=["pre_q1","pre_q2","pre_q3"],e=["post_q1","post_q2","post_q3"],n=r=>r.reduce((p,h)=>{const m=W.find(w=>w.id===h),y=M.answers[h];return!m||!y||!m.correctValue?p:p+(y.value===m.correctValue?1:0)},0);return{preStudyScore:`${n(t)} / ${t.length}`,postStudyScore:`${n(e)} / ${e.length}`,task2_tableCorrect:((o=M.answers.task2)==null?void 0:o.value)==="b",task3_chartCorrect:((a=M.answers.task3)==null?void 0:a.value)==="b",task4_noEncoding:(s=M.answers.task4)==null?void 0:s.value,task5_withEncoding:(d=M.answers.task5)==null?void 0:d.value,task5Correct:((c=M.answers.task5)==null?void 0:c.value)==="e",populationEncodingRating:(u=M.answers.post_q4)==null?void 0:u.value,preferredChart:(i=M.answers.post_q5)==null?void 0:i.value}}function ot(){const t=W[M.currentStep];M.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),n=document.getElementById("study-panel"),o=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),o.classList.remove("hidden"),Yt(t.vizConfig),Gt(t,o)):(o.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&Kt(t,n),t.type==="question"&&Ut(t,n),t.type==="complete"&&Jt(t,n)),Qt()}function Kt(t,e){var n,o;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${M.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const a=e.querySelector("#consent-checkbox"),s=e.querySelector("#study-next");a.addEventListener("change",()=>{s.disabled=!a.checked})}(n=e.querySelector("#study-next"))==null||n.addEventListener("click",st),(o=e.querySelector("#study-prev"))==null||o.addEventListener("click",rt)}function Ut(t,e){var o,a;const n=(o=M.answers[t.id])==null?void 0:o.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(s=>`
        <label class="study-option ${n===s.value?"selected":""}">
          <input type="radio" name="sq" value="${s.value}" ${n===s.value?"checked":""}/>
          ${s.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${M.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${n?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(s=>{s.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(c=>c.classList.remove("selected")),s.classList.add("selected");const d=s.querySelector("input").value;vt(t.id,d),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",st),(a=e.querySelector("#study-prev"))==null||a.addEventListener("click",rt)}let U="description";function Gt(t,e){U="description",e.innerHTML=Q(t),X(t,e)}function Q(t){var n;const e=(n=M.answers[t.id])==null?void 0:n.value;return U==="description"?`
      <div class="task-banner-inner">
        <div class="task-phase-tag">${t.phase}</div>
        <p class="task-desc">${t.taskText}</p>
        <div class="task-banner-nav">
          <button class="study-btn secondary" id="task-back">← Back</button>
          <button class="study-btn primary" id="task-ready">I've examined the chart — show question →</button>
        </div>
      </div>`:`
    <div class="task-banner-inner">
      <div class="task-phase-tag">${t.phase} — Question</div>
      <p class="task-question"><strong>${t.questionText}</strong></p>
      ${t.note?`<p class="study-note">${t.note}</p>`:""}
      <div class="task-options-row">
        ${t.options.map(o=>`
          <label class="task-option ${e===o.value?"selected":""}">
            <input type="radio" name="tq" value="${o.value}" ${e===o.value?"checked":""}/>
            ${o.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${e?"":"disabled"}>Submit →</button>
      </div>
    </div>`}function X(t,e){var n,o,a,s;(n=e.querySelector("#task-back"))==null||n.addEventListener("click",()=>{rt()}),(o=e.querySelector("#task-ready"))==null||o.addEventListener("click",()=>{U="question",e.innerHTML=Q(t),X(t,e)}),(a=e.querySelector("#task-back-q"))==null||a.addEventListener("click",()=>{U="description",e.innerHTML=Q(t),X(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(u=>u.classList.remove("selected")),d.classList.add("selected");const c=d.querySelector("input").value;vt(t.id,c),e.querySelector("#task-submit").disabled=!1})}),(s=e.querySelector("#task-submit"))==null||s.addEventListener("click",st)}function Jt(t,e){const n=kt();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Pre-study knowledge score</th><td>${n.preStudyScore}</td></tr>
        <tr><th>Post-study knowledge score</th><td>${n.postStudyScore}</td></tr>
        <tr><th>Task 2 (table) — correct?</th><td>${n.task2_tableCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 3 (bar chart) — correct?</th><td>${n.task3_chartCorrect?"✓ Yes":"✗ No"}</td></tr>
        <tr><th>Task 4 (no encoding) — group size answer</th><td>${n.task4_noEncoding??"—"}</td></tr>
        <tr><th>Task 5 (with encoding) — correct?</th><td>${n.task5Correct?"✓ Yes (Top 0.001%)":"✗ No"}</td></tr>
        <tr><th>Population encoding helpfulness</th><td>${n.populationEncodingRating??"—"} / 5</td></tr>
        <tr><th>Preferred chart type</th><td>${n.preferredChart??"—"}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",Ot)}function Qt(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),n=W.length-1,o=Math.round(M.currentStep/n*100);t&&(t.style.width=o+"%"),e&&(e.textContent=`Step ${M.currentStep+1} of ${W.length}`)}function st(){M.currentStep<W.length-1&&(M.currentStep++,ot())}function rt(){M.currentStep>0&&(M.currentStep--,ot())}function Xt(){Zt(),te();try{const t=localStorage.getItem(xt);if(t){const e=JSON.parse(t);e.version===nt&&e.state&&Object.assign(M,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),ot()})}function Zt(){document.body.insertAdjacentHTML("beforeend",`
    <!-- Launch button -->
    <div id="study-launcher" class="study-launcher">
      <button id="study-launch-btn" class="study-launch-btn">
        🎓 Start User Study
      </button>
    </div>

    <!-- Progress bar (shown during study) -->
    <div id="study-progress-container" class="study-progress-container hidden">
      <div id="study-progress-bar" class="study-progress-bar" style="width:0%"></div>
      <span id="study-progress-label" class="study-progress-label"></span>
    </div>

    <!-- Full-screen overlay (for info/question/complete steps) -->
    <div id="study-overlay" class="study-overlay hidden">
      <div id="study-panel" class="study-panel"></div>
    </div>

    <!-- Task banner (shown over the visualization) -->
    <div id="study-task-banner" class="study-task-banner hidden"></div>
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),n=document.getElementById("study-task-banner"),o=document.getElementById("study-progress-container");e.classList.contains("hidden")&&n.classList.contains("hidden")&&M.currentStep===0?o.classList.add("hidden"):o.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function te(){const t=document.createElement("style");t.textContent=`
/* ── Study launcher ── */
.study-launcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9000;
}
.study-launch-btn {
  background: #2b6cb0;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 14px 22px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  transition: background 0.2s;
}
.study-launch-btn:hover { background: #2c5282; }

/* ── Progress ── */
.study-progress-container {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 6px;
  background: #e2e8f0;
  z-index: 9100;
  display: flex;
  align-items: center;
}
.study-progress-bar {
  height: 100%;
  background: #2b6cb0;
  transition: width 0.4s ease;
}
.study-progress-label {
  position: fixed;
  top: 8px;
  right: 12px;
  font-size: 11px;
  color: #718096;
  z-index: 9101;
}

/* ── Full-screen overlay ── */
.study-overlay {
  position: fixed;
  inset: 0;
  background: rgba(247, 250, 252, 0.97);
  z-index: 9200;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 16px;
}
.study-panel {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  padding: 40px 48px;
  max-width: 680px;
  width: 100%;
}

/* ── Typography ── */
.study-phase-tag {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2b6cb0;
  margin-bottom: 10px;
}
.study-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 18px;
  line-height: 1.4;
}
.study-body { font-size: 15px; color: #2d3748; line-height: 1.7; }
.study-body p { margin: 0 0 12px; }
.study-body ul { margin: 0 0 12px; padding-left: 20px; }
.study-note { font-size: 13px; color: #718096; font-style: italic; margin-bottom: 16px; }

/* ── Consent checkbox ── */
.consent-check { display: flex; align-items: flex-start; gap: 10px; font-size: 14px;
  color: #2d3748; cursor: pointer; margin-top: 16px; }
.consent-check input { margin-top: 3px; flex-shrink: 0; width: 16px; height: 16px; }

/* ── Options ── */
.study-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.study-option {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #2d3748;
  transition: border-color 0.15s, background 0.15s;
}
.study-option:hover { border-color: #90cdf4; background: #ebf8ff; }
.study-option.selected { border-color: #2b6cb0; background: #ebf8ff; font-weight: 600; }
.study-option input { accent-color: #2b6cb0; width: 16px; height: 16px; flex-shrink: 0; }

/* ── Navigation ── */
.study-nav { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
.study-nav.centered { justify-content: center; }
.study-btn {
  padding: 10px 22px; border-radius: 7px; font-size: 14px;
  font-weight: 600; border: none; cursor: pointer; transition: 0.15s;
}
.study-btn.primary { background: #2b6cb0; color: #fff; }
.study-btn.primary:hover:not(:disabled) { background: #2c5282; }
.study-btn.primary:disabled { background: #a0aec0; cursor: not-allowed; }
.study-btn.secondary { background: #edf2f7; color: #2d3748; }
.study-btn.secondary:hover { background: #e2e8f0; }
.study-btn.large { padding: 14px 32px; font-size: 16px; }

/* ── Task banner ── */
.study-task-banner {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: rgba(255, 255, 255, 0.97);
  border-top: 3px solid #2b6cb0;
  z-index: 9200;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.12);
  max-height: 42vh;
  overflow-y: auto;
}
.task-banner-inner { padding: 16px 24px; max-width: 1100px; margin: 0 auto; }
.task-phase-tag {
  font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: #2b6cb0; margin-bottom: 6px;
}
.task-desc { font-size: 14px; color: #2d3748; line-height: 1.6; margin: 0 0 12px; }
.task-question { font-size: 15px; color: #1a202c; margin: 0 0 12px; }
.task-options-row {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;
}
.task-option {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  border: 2px solid #e2e8f0;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  color: #2d3748;
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}
.task-option:hover { border-color: #90cdf4; background: #ebf8ff; }
.task-option.selected { border-color: #2b6cb0; background: #ebf8ff; font-weight: 600; }
.task-option input { accent-color: #2b6cb0; width: 14px; height: 14px; flex-shrink: 0; }
.task-banner-nav { display: flex; gap: 10px; justify-content: flex-end; }

/* ── Summary table ── */
.study-summary { margin: 20px 0; }
.study-summary h3 { font-size: 15px; font-weight: 700; color: #2d3748; margin: 0 0 12px; }
.summary-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.summary-table th, .summary-table td {
  text-align: left; padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
}
.summary-table th { color: #718096; font-weight: 600; width: 55%; }
.summary-table td { color: #2d3748; font-weight: 600; }

/* ── Utilities ── */
.hidden { display: none !important; }

/* ── Responsive: push viz up when task banner is open ── */
body:has(#study-task-banner:not(.hidden)) #app {
  padding-bottom: 42vh;
}
  `,document.head.appendChild(t)}Xt();
