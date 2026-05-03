(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function l(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=l(n);fetch(n.href,a)}})();const o=window.d3;function Kt(t){const e=t.map(Math.floor);let l=100-o.sum(e);const s=t.map((n,a)=>({i:a,frac:n-Math.floor(n)})).sort((n,a)=>a.frac-n.frac);for(let n=0;n<s.length&&l>0;n+=1)e[s[n].i]+=1,l-=1;return e}const Ht=[{key:"bottom50",label:"Bottom 50%",color:"#4dabf7",pop:50},{key:"top10",label:"Top 10%",color:"#fcc419",pop:10},{key:"top1",label:"Top 1%",color:"#ff8787",pop:1},{key:"top01",label:"Top 0.1%",color:"#e599f7",pop:.1},{key:"top001",label:"Top 0.01%",color:"#ff6b6b",pop:.01},{key:"top0001",label:"Top 0.001%",color:"#c92a2a",pop:.001}];o.scaleSqrt().domain([.001,50]).range([.6,6]);let ft=[];async function Ut(){const e=(await o.text("./data/wealth_avg.csv")).split(`
`),l=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};ft=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<l.length)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};let h=!0;for(let m=1;m<l.length;m++){const r=s[l[m].trim()];if(!r)continue;const i=Number(a[m]);if(!Number.isFinite(i)){h=!1;break}d[r]=i}h&&d.bottom50!==void 0&&ft.push(d)}ft.sort((n,a)=>n.year-a.year),new Map(ft.map(n=>[n.year,n]))}let xt=[];async function Jt(){const e=(await o.text("./data/income_avg.csv")).split(`
`),l=e[0].split(","),s={"Bottom 50":"bottom50","Middle 40":"mid40","Top 10":"top10","Top 1":"top1","Top 0.1":"top01","Top 0.01":"top001","Top 0.001":"top0001"};xt=[];for(let n=1;n<e.length;n++){const a=e[n].split(",");if(a.length<2)continue;const u=Number(a[0]);if(!Number.isFinite(u))continue;const d={year:u};for(let h=1;h<l.length;h++){const m=s[l[h].trim()];m&&(d[m]=Number(a[h])||0)}d.bottom50!==void 0&&xt.push(d)}xt.sort((n,a)=>n.year-a.year),new Map(xt.map(n=>[n.year,n]))}function Qt(t){const e=Math.abs(t);return e>=1e9?(t/1e9).toFixed(1)+"B":e>=1e6?(t/1e6).toFixed(1)+"M":e>=1e3?(t/1e3).toFixed(0)+"K":t.toFixed(0)}function qt(t){return t>=1?`${t}%`:t>=.1?`${t.toFixed(1)}%`:t>=.01?`${t.toFixed(2)}%`:`${t.toFixed(3)}%`}function U(t){const e=Math.abs(t);return e>=1e9?`${(t/1e9).toFixed(e>=1e10?0:1)}B`:e>=1e6?`${(t/1e6).toFixed(e>=1e7?0:1)}M`:e>=1e3?`${(t/1e3).toFixed(e>=1e5?0:1)}K`:`${Math.round(t)}`}Ht.filter(t=>["top0001","top001"].includes(t.key));Ht.filter(t=>!["top0001","top001"].includes(t.key));o.scaleSqrt().domain([.001,50]).range([.6,6]);async function Zt(){await Promise.all([Ut(),Jt()]),de()}Zt();const Dt=[1980,1990,2e3,2010,2020,2024],A=[{key:"bottom50",label:"Bottom 50%",pop:50,color:"#4dabf7"},{key:"top9",label:"Top 10%",pop:9,color:"#ffd43b"},{key:"top0_9",label:"Top 1%",pop:.9,color:"#ff922b"},{key:"top0_09",label:"Top 0.1%",pop:.09,color:"#f06595"},{key:"top0_009",label:"Top 0.01%",pop:.009,color:"#e64980"},{key:"top0_001",label:"Top 0.001%",pop:.001,color:"#c92a2a"}],Ot=["bottom50","middle40","top9","top0_9","top0_09","top0_009","top0_001"];function mt(t,e,l){const s=Math.log10(.001),n=Math.log10(50),a=(Math.log10(Math.max(t,1e-4))-s)/(n-s);return e+a*(l-e)}let bt=[],Mt=[],Wt=new Map,Lt=new Map,pt=null;function jt(t){if(!t)return null;const e={bottom50:t.bottom50*50,middle40:t.mid40*40,top10:t.top10*10,top1:t.top1*1,top01:t.top01*.1,top001:t.top001*.01,top0001:t.top0001*.001};return{year:t.year,values:{bottom50:t.bottom50,middle40:t.mid40,top9:(e.top10-e.top1)/9,top0_9:(e.top1-e.top01)/.9,top0_09:(e.top01-e.top001)/.09,top0_009:(e.top001-e.top0001)/.009,top0_001:t.top0001},totals:{bottom50:e.bottom50,middle40:e.middle40,top9:e.top10-e.top1,top0_9:e.top1-e.top01,top0_09:e.top01-e.top001,top0_009:e.top001-e.top0001,top0_001:e.top0001}}}function te(){bt.length&&Mt.length||(bt=xt.map(jt).filter(Boolean),Mt=ft.map(jt).filter(Boolean),Wt=new Map(bt.map(t=>[t.year,t])),Lt=new Map(Mt.map(t=>[t.year,t])))}function ut(){return bt.map(t=>t.year).filter(t=>Lt.has(t))}function ee(t){var s;const e=new Set(ut()),l=Array.from(new Set(((s=String(t).match(/\d{4}/g))==null?void 0:s.map(Number))||[])).filter(n=>e.has(n)).sort((n,a)=>n-a);return l.length?l:Dt.filter(n=>e.has(n))}function Z(t,e){return(t==="income"?Wt:Lt).get(e)}function D(t){return t==="income"?bt:Mt}function W(t,e,l){return t.values[e.key]}function vt(t){return`${Qt(t)} SEK`}function ot(t,e){const l=document.createElement("div");if(l.className="cwi-card",e){const s=document.createElement("h3");s.textContent=e,l.appendChild(s)}return t.appendChild(l),l}function Tt(t,e,l,s){const n=document.createElement("div");n.className="cwi-anim-bar",n.innerHTML=`<button type="button" id="cwi-matrix-play">Play</button><input type="range" id="cwi-matrix-year" min="0" max="${e.length-1}" step="1" value="0"><span id="cwi-matrix-year-label">${e[0]}</span>`,t.appendChild(n);const a=ot(t,s),u=document.createElement("div");a.appendChild(u);const d=n.querySelector("#cwi-matrix-year"),h=n.querySelector("#cwi-matrix-play"),m=n.querySelector("#cwi-matrix-year-label"),r=i=>{const c=e[i];m.textContent=String(c),l(c,u)};d.addEventListener("input",()=>r(Number(d.value))),h.addEventListener("click",()=>{if(pt){clearInterval(pt),pt=null,h.textContent="Play";return}h.textContent="Pause",pt=setInterval(()=>{const i=(Number(d.value)+1)%e.length;d.value=String(i),r(i)},900)}),r(0)}function ae(t,e,l,s,n){const a=n.includes("income"),u=n.includes("wealth"),d=`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`,h=(m,r,i)=>{const c=s?`<td>${qt(m.pop)}</td>`:"",S=a?`<td>${vt(r.values[m.key])}</td>`:"",b=u?`<td>${vt(i.values[m.key])}</td>`:"";return`<tr><td>${m.label}</td>${c}${S}${b}</tr>`};if(l==="juxtaposition"){const m=document.createElement("div");m.className="cwi-years-grid",t.appendChild(m),e.forEach(r=>{const i=ot(m,String(r)),c=document.createElement("table");c.className="cwi-table",c.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${A.map(S=>h(S,Z("income",r),Z("wealth",r))).join("")}</tbody>`,i.appendChild(c)});return}if(l==="superposition"){const m=ot(t,"Combined table across selected years"),r=document.createElement("table");r.className="cwi-table";const i=n.length,c=`<tr><th rowspan="2">Group</th>${s?'<th rowspan="2">Pop.</th>':""}${e.map(v=>`<th colspan="${i}">${v}</th>`).join("")}</tr>`,S=`<tr>${e.map(()=>`${a?"<th>Income</th>":""}${u?"<th>Wealth</th>":""}`).join("")}</tr>`,b=A.map(v=>{const g=e.map($=>{const B=Z("income",$),C=Z("wealth",$);return`${a?`<td>${vt(B.values[v.key])}</td>`:""}${u?`<td>${vt(C.values[v.key])}</td>`:""}`}).join("");return`<tr><td>${v.label}</td>${s?`<td>${qt(v.pop)}</td>`:""}${g}</tr>`}).join("");r.innerHTML=`<thead>${c}${S}</thead><tbody>${b}</tbody>`,m.appendChild(r);return}Tt(t,ut(),(m,r)=>{r.innerHTML="";const i=document.createElement("table");i.className="cwi-table",i.innerHTML=`<thead><tr><th>Group</th>${s?"<th>Pop.</th>":""}${d}</tr></thead><tbody>${A.map(c=>h(c,Z("income",m),Z("wealth",m))).join("")}</tbody>`,r.appendChild(i)},"Animated table")}function Pt(t,e,l,s,n){const a=o.select(t),u=520,d=310,h={top:18,right:16,bottom:28,left:120},m=u-h.left-h.right,r=d-h.top-h.bottom,i=A.map(x=>W(e,x)),c=o.min(i),S=o.max(i),b=(n==null?void 0:n.min)!=null?n.min:Math.min(0,c),v=(n==null?void 0:n.max)!=null?n.max:S*1.05,g=o.scaleLinear().domain([b,v]).range([0,m]),$=r/A.length;a.attr("class","cwi-svg").attr("viewBox",`0 0 ${u} ${d}`),a.selectAll("*").remove();const B=`clip-hbar-${l}-${Math.random().toString(36).slice(2)}`;a.append("defs").append("clipPath").attr("id",B).append("rect").attr("width",m).attr("height",r);const C=a.append("g").attr("transform",`translate(${h.left},${h.top})`);if(C.append("g").attr("transform",`translate(0,${r})`).call(o.axisBottom(g).ticks(5).tickFormat(U)),b<0||v>0){const x=g(Math.max(b,Math.min(0,v)));C.append("line").attr("x1",x).attr("x2",x).attr("y1",0).attr("y2",r).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}const f=o.select("#cwi-tooltip"),H=C.append("g").attr("clip-path",`url(#${B})`);A.forEach((x,z)=>{const E=W(e,x),L=s?mt(x.pop,$*.18,$*.82):$*.7,y=z*$+$/2,k=y-L/2,T=g(Math.max(b,Math.min(0,E))),p=g(Math.min(v,Math.max(0,E)));C.append("text").attr("x",-10).attr("y",y).attr("dy","0.35em").attr("text-anchor","end").attr("font-size",10).text(x.label),H.append("rect").attr("x",Math.min(T,p)).attr("y",k).attr("width",Math.max(2,Math.abs(p-T))).attr("height",L).attr("rx",3).attr("fill",x.color).style("cursor","crosshair").on("mouseover",w=>{f.html(`<strong style="color:${x.color}">${x.label}</strong><br>${U(E)}`).style("display","block").style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mousemove",w=>{f.style("left",w.clientX+14+"px").style("top",w.clientY-36+"px")}).on("mouseleave",()=>f.style("display","none"))})}function ne(t,e,l,s,n,a){const u=d=>{if(n.length===1)return d;const h=document.createElement("div");return h.className="cwi-grid-2",d.appendChild(h),h};if(l==="juxtaposition"){const d=document.createElement("div");d.className="cwi-years-grid",t.appendChild(d),e.forEach(h=>{const m=ot(d,String(h)),r=u(m);n.forEach(i=>{const c=document.createElement("div");c.innerHTML=`<p class="cwi-chart-title">${i==="income"?"Income":"Wealth"}</p>`;const S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),r.appendChild(c),Pt(S,Z(i,h),i,s,a)})});return}if(l==="superposition"){const d=u(t);n.forEach(h=>{const r=ot(d,h==="income"?"Income by year — SEK  (dashed = baseline year)":"Wealth by year — SEK  (dashed = baseline year)"),i=(w,P)=>w?W(w,P):0,c=Z(h,e[0]),S=e.flatMap(w=>A.map(P=>i(Z(h,w),P))),b=o.max(S.map(Math.abs)),v=Math.min(0,o.min(S)),g=(a==null?void 0:a.min)!=null?a.min:v*1.1,$=(a==null?void 0:a.max)!=null?a.max:b*1.1,B=700,C=360,f={top:24,right:16,bottom:44,left:78},H=B-f.left-f.right,x=C-f.top-f.bottom,z=o.select(r).append("svg").attr("class","cwi-svg").attr("viewBox",`0 0 ${B} ${C}`),E=`clip-vbar-${h}-${Math.random().toString(36).slice(2)}`;z.append("defs").append("clipPath").attr("id",E).append("rect").attr("width",H).attr("height",x);const L=z.append("g").attr("transform",`translate(${f.left},${f.top})`),y=o.scaleBand().domain(e).range([0,H]).paddingInner(.2),k=o.scaleLinear().domain([g,$]).range([x,0]);L.append("g").attr("transform",`translate(0,${x})`).call(o.axisBottom(y).tickFormat(o.format("d"))),L.append("g").call(o.axisLeft(k).ticks(6).tickFormat(U)),g<0&&$>0&&L.append("line").attr("x1",0).attr("x2",H).attr("y1",k(0)).attr("y2",k(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3");const T=o.select("#cwi-tooltip"),p=L.append("g").attr("clip-path",`url(#${E})`);e.forEach(w=>{const P=Z(h,w);if(!P)return;const I=y.bandwidth(),q=2,R=A.length,V=I-q*R,st=A.map(j=>mt(j.pop,.1,1)),N=o.sum(st);let Y=y(w);A.forEach((j,F)=>{const X=Math.max(s?st[F]/N*V:V/R,3),O=i(P,j),et=Math.max(g,Math.min($,O)),rt=Math.max(g,Math.min($,0)),at=k(Math.max(et,rt)),dt=Math.max(1,Math.abs(k(et)-k(rt)));if(p.append("rect").attr("x",Y).attr("y",at).attr("width",X).attr("height",dt).attr("fill",j.color).attr("rx",2).attr("opacity",.85).style("cursor","crosshair").on("mouseover",J=>{T.html(`<strong style="color:${j.color}">${j.label}</strong><br>${w}<br>${U(O)}`).style("display","block").style("left",J.clientX+14+"px").style("top",J.clientY-36+"px")}).on("mousemove",J=>{T.style("left",J.clientX+14+"px").style("top",J.clientY-36+"px")}).on("mouseleave",()=>T.style("display","none")),c&&w!==e[0]){const J=i(c,j);J>=g&&J<=$&&L.append("line").attr("x1",Y).attr("x2",Y+X).attr("y1",k(J)).attr("y2",k(J)).attr("stroke","#202124").attr("stroke-width",1.5).attr("stroke-dasharray","4 3").attr("opacity",.5)}Y+=X+q})})});return}Tt(t,ut(),(d,h)=>{h.innerHTML="";const m=u(h);n.forEach(r=>{const i=document.createElement("div");i.innerHTML=`<p class="cwi-chart-title">${r==="income"?"Income":"Wealth"}</p>`;const c=document.createElementNS("http://www.w3.org/2000/svg","svg");i.appendChild(c),m.appendChild(i),Pt(c,Z(r,d),r,s,a)})},"Animated bars")}function oe(t,e,l,s,n,a,u){const d=o.select(t),h=400,m=250,r={top:14,right:58,bottom:30,left:70},i=h-r.left-r.right,c=m-r.top-r.bottom,S=ut(),b=o.scaleLinear().domain(o.extent(S)).range([0,i]),[v,g]=a,$=u?v:Math.min(0,v),B=u?g:g*1.08,C=$<0,f=o.scaleLinear().domain([$,B]).range([c,0]),H=f.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const x=d.append("g").attr("transform",`translate(${r.left},${r.top})`);x.selectAll("line.hg").data(H).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>f(p)).attr("y2",p=>f(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(b).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),x.append("g").call(o.axisLeft(f).tickValues(H).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),C&&x.append("line").attr("x1",0).attr("x2",i).attr("y1",f(0)).attr("y2",f(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>b(p)).attr("x2",p=>b(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const z=s?mt(e.pop,1,10):1.8;l.forEach((p,w)=>{const P=D(p),I=o.line().defined(q=>Number.isFinite(W(q,e))).x(q=>b(q.year)).y(q=>f(W(q,e)));x.append("path").datum(P).attr("fill","none").attr("stroke",e.color).attr("stroke-width",z).attr("stroke-dasharray",w===1?"5 3":null).attr("d",I)});const E=D(l[0]).at(-1);if(E){const p=W(E,e);Number.isFinite(p)&&x.append("text").attr("x",i+4).attr("y",f(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const L=o.select("#cwi-tooltip"),y=D(l[0]),k=o.bisector(p=>p.year).left,T=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),P=b.invert(w),I=k(y,P),q=y[Math.max(0,I-1)],R=y[Math.min(y.length-1,I)],V=R&&Math.abs(P-R.year)<Math.abs(P-q.year)?R:q;if(!V)return;T.attr("x1",b(V.year)).attr("x2",b(V.year)).style("display",null);const st=l.map(N=>{const Y=D(N).find(F=>F.year===V.year),j=Y?W(Y,e):null;return`${N}: ${j!=null?U(j):"n/a"}`});L.html(`<strong style="color:${e.color}">${e.label}</strong> · ${V.year}<br>${st.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{T.style("display","none"),L.style("display","none")})}function se(t,e,l,s,n,a="linear"){const u=D(e),d=o.select(t),h=620,m=340,r={top:20,right:110,bottom:28,left:80},i=h-r.left-r.right,c=m-r.top-r.bottom,S=u.flatMap(y=>A.map(k=>W(y,k))).filter(Number.isFinite),b=o.min(S),v=o.max(S);if(a==="break"){const y=A[A.length-2],k=o.max(u,M=>{const Q=W(M,y);return Number.isFinite(Q)?Q:-1/0}),T=Math.max(0,k)*1.15,p=Math.max(0,k)*1.8,w=Math.min(0,b),P=v*1.05,I=14,q=Math.round(c*.62),R=o.scaleLinear().domain([w,T]).range([c,q+Math.ceil(I/2)]),V=o.scaleLinear().domain([p,P]).range([q-Math.floor(I/2),0]),st=M=>Number.isFinite(M)?M<=T?R(Math.max(w,Math.min(T,M))):M>=p?V(Math.max(p,Math.min(P,M))):null:null;d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const N=d.append("defs"),Y=`brk-lo-${e}`;N.append("clipPath").attr("id",Y).append("rect").attr("x",0).attr("y",q+Math.ceil(I/2)).attr("width",i).attr("height",c-q-Math.ceil(I/2));const j=`brk-hi-${e}`;N.append("clipPath").attr("id",j).append("rect").attr("x",0).attr("y",0).attr("width",i).attr("height",q-Math.floor(I/2));const F=d.append("g").attr("transform",`translate(${r.left},${r.top})`),X=o.scaleLinear().domain(o.extent(u,M=>M.year)).range([0,i]);F.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(X).tickFormat(o.format("d"))),F.append("g").call(o.axisLeft(R).ticks(4).tickFormat(U)).call(M=>M.select(".domain").remove()),F.append("g").call(o.axisLeft(V).ticks(3).tickFormat(U)).call(M=>M.select(".domain").remove()),F.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",q-Math.floor(I/2)).attr("stroke","#495057").attr("stroke-width",1.5),F.append("line").attr("x1",0).attr("x2",0).attr("y1",q+Math.ceil(I/2)).attr("y2",c).attr("stroke","#495057").attr("stroke-width",1.5);const O=q,et=[-10,0,10,0,-10].map((M,Q)=>`${M},${O-6+Q*3}`).join(" "),rt=[-10,0,10,0,-10].map((M,Q)=>`${M},${O+1+Q*3}`).join(" ");if(F.append("polyline").attr("points",et).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round"),F.append("polyline").attr("points",rt).attr("fill","none").attr("stroke","#868e96").attr("stroke-width",1.8).attr("stroke-linecap","round"),w<0){const M=R(0);M>q&&M<=c&&F.append("line").attr("x1",0).attr("x2",i).attr("y1",M).attr("y2",M).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3")}F.selectAll(".yr-mark").data(s).join("line").attr("class","yr-mark").attr("x1",M=>X(M)).attr("x2",M=>X(M)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5"),A.forEach(M=>{const Q=l?mt(M.pop,1,10):2,lt=o.line().defined(K=>{const G=W(K,M);return Number.isFinite(G)&&G<=T}).x(K=>X(K.year)).y(K=>R(W(K,M)));F.append("path").datum(u).attr("fill","none").attr("stroke",M.color).attr("stroke-width",Q).attr("d",lt).attr("clip-path",`url(#${Y})`);const tt=o.line().defined(K=>{const G=W(K,M);return Number.isFinite(G)&&G>=p}).x(K=>X(K.year)).y(K=>V(W(K,M)));F.append("path").datum(u).attr("fill","none").attr("stroke",M.color).attr("stroke-width",Q).attr("d",tt).attr("clip-path",`url(#${j})`);const it=u[u.length-1],ct=st(W(it,M));ct!==null&&F.append("text").attr("x",i+5).attr("y",ct).attr("dy","0.35em").attr("font-size",10).attr("fill",M.color).text(M.label)});const at=o.select("#cwi-tooltip"),dt=o.bisector(M=>M.year).left,J=F.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");F.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",M=>{const[Q]=o.pointer(M),lt=X.invert(Q),tt=dt(u,lt),it=u[Math.max(0,tt-1)],ct=u[Math.min(u.length-1,tt)],K=ct&&Math.abs(lt-ct.year)<Math.abs(lt-it.year)?ct:it;if(!K)return;J.attr("x1",X(K.year)).attr("x2",X(K.year)).style("display",null);const G=`<strong>${K.year}</strong><br>`+A.map(nt=>{const ht=W(K,nt);return`<span style="color:${nt.color}">${nt.label}</span>: ${U(ht)}`}).join("<br>");at.html(G).style("display","block").style("left",M.clientX+16+"px").style("top",M.clientY-60+"px")}).on("mouseleave",()=>{J.style("display","none"),at.style("display","none")});return}const g=(n==null?void 0:n.min)!=null?n.min:Math.min(0,b),$=(n==null?void 0:n.max)!=null?n.max:v*1.05,B=o.scaleLinear().domain(o.extent(u,y=>y.year)).range([0,i]),C=o.scaleLinear().domain([g,$]).range([c,0]);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const f=d.append("g").attr("transform",`translate(${r.left},${r.top})`),H=`clip-line-${e}`;d.append("defs").append("clipPath").attr("id",H).append("rect").attr("width",i).attr("height",c),f.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(B).tickFormat(o.format("d"))),f.append("g").call(o.axisLeft(C).ticks(6).tickFormat(U)),g<0&&$>0&&f.append("line").attr("x1",0).attr("x2",i).attr("y1",C(0)).attr("y2",C(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),f.selectAll(".year-mark").data(s).join("line").attr("x1",y=>B(y)).attr("x2",y=>B(y)).attr("y1",0).attr("y2",c).attr("stroke","#f1f3f5");const x=f.append("g").attr("clip-path",`url(#${H})`);A.forEach(y=>{const k=o.line().defined(w=>Number.isFinite(W(w,y))).x(w=>B(w.year)).y(w=>C(W(w,y)));x.append("path").datum(u).attr("fill","none").attr("stroke",y.color).attr("stroke-width",l?mt(y.pop,1,10):2).attr("d",k);const T=u[u.length-1],p=W(T,y);Number.isFinite(p)&&p>=g&&p<=$&&f.append("text").attr("x",i+5).attr("y",C(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",y.color).text(y.label)});const z=o.select("#cwi-tooltip"),E=o.bisector(y=>y.year).left,L=f.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");f.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",y=>{const[k]=o.pointer(y),T=B.invert(k),p=E(u,T),w=u[Math.max(0,p-1)],P=u[Math.min(u.length-1,p)],I=P&&Math.abs(T-P.year)<Math.abs(T-w.year)?P:w;if(!I)return;L.attr("x1",B(I.year)).attr("x2",B(I.year)).style("display",null);const q=`<strong>${I.year}</strong><br>`+A.map(R=>{const V=W(I,R);return`<span style="color:${R.color}">${R.label}</span>: ${U(V)}`}).join("<br>");z.html(q).style("display","block").style("left",y.clientX+16+"px").style("top",y.clientY-60+"px")}).on("mouseleave",()=>{L.style("display","none"),z.style("display","none")})}function re(t,e,l,s,n,a,u="linear"){if(l==="juxtaposition"){const f=n.includes("income")?D("income"):[],H=n.includes("wealth")?D("wealth"):[],x=[...f.flatMap(T=>A.map(p=>W(T,p))),...H.flatMap(T=>A.map(p=>W(T,p)))].filter(Number.isFinite),z=o.min(x),E=o.max(x),L=(a==null?void 0:a.min)!=null||(a==null?void 0:a.max)!=null,y=[(a==null?void 0:a.min)!=null?a.min:z,(a==null?void 0:a.max)!=null?a.max:E];if(n.length>1){const T=document.createElement("p");T.className="cwi-note",T.textContent="Solid line = income · Dashed line = wealth. All panels share the same Y axis.",t.appendChild(T)}const k=document.createElement("div");k.className="cwi-sm-grid",t.appendChild(k),A.forEach(T=>{const p=ot(k,T.label),w=document.createElementNS("http://www.w3.org/2000/svg","svg");p.appendChild(w),oe(w,T,n,s,e,y,L)});return}if(n.length===1){const f=ot(t,n[0]==="income"?"Income over time":"Wealth over time"),H=document.createElementNS("http://www.w3.org/2000/svg","svg");f.appendChild(H),se(H,n[0],s,e,a,u);return}const d=ot(t,"Superposed indexed lines (income solid, wealth dashed)"),h=document.createElement("div");h.className="cwi-inline-legend",h.innerHTML='<span><i style="background:#495057"></i><span>Income solid</span></span><span><i style="background:#ffffff;border:2px dashed #495057"></i><span>Wealth dashed, indexed to 100</span></span>',d.appendChild(h);const m=o.select(d).append("svg").attr("class","cwi-svg tall"),r=840,i=380,c={top:20,right:120,bottom:28,left:70},S=r-c.left-c.right,b=i-c.top-c.bottom,v=ut(),g=v.map(f=>({year:f,income:Z("income",f),wealth:Z("wealth",f)})),$=o.scaleLinear().domain(o.extent(v)).range([0,S]),B=o.scaleLinear().domain([0,260]).range([b,0]);m.attr("viewBox",`0 0 ${r} ${i}`);const C=m.append("g").attr("transform",`translate(${c.left},${c.top})`);C.append("g").attr("transform",`translate(0,${b})`).call(o.axisBottom($).tickFormat(o.format("d"))),C.append("g").call(o.axisLeft(B).ticks(6).tickFormat(f=>`${Math.round(f)}%`)),A.forEach(f=>{const H=Math.abs(W(g[0].income,f))||1,x=Math.abs(W(g[0].wealth,f))||1,z=o.line().x(y=>$(y.year)).y(y=>B(Math.abs(W(y.income,f))/H*100)),E=o.line().x(y=>$(y.year)).y(y=>B(Math.abs(W(y.wealth,f))/x*100)),L=s?mt(f.pop,1,7):2;C.append("path").datum(g).attr("fill","none").attr("stroke",f.color).attr("stroke-width",L).attr("d",z),C.append("path").datum(g).attr("fill","none").attr("stroke",f.color).attr("stroke-width",L).attr("stroke-dasharray","5 4").attr("opacity",.85).attr("d",E)})}function le(t,e,l,s,n,a,u){const d=o.select(t),h=400,m=250,r={top:14,right:58,bottom:30,left:70},i=h-r.left-r.right,c=m-r.top-r.bottom,S=ut(),b=o.scaleLinear().domain(o.extent(S)).range([0,i]),[v,g]=a,$=u?v:Math.min(0,v),B=u?g:g*1.08,C=o.scaleLinear().domain([$,B]).range([c,0]),f=C.ticks(4);d.attr("class","cwi-svg").attr("viewBox",`0 0 ${h} ${m}`),d.selectAll("*").remove();const H=`clip-ga-${e.key}-${Math.random().toString(36).slice(2)}`;d.append("defs").append("clipPath").attr("id",H).append("rect").attr("width",i).attr("height",c);const x=d.append("g").attr("transform",`translate(${r.left},${r.top})`);x.selectAll("line.hg").data(f).join("line").attr("class","hg").attr("x1",0).attr("x2",i).attr("y1",p=>C(p)).attr("y2",p=>C(p)).attr("stroke","#e8eaed").attr("stroke-width",.8),x.append("g").attr("transform",`translate(0,${c})`).call(o.axisBottom(b).ticks(5).tickFormat(o.format("d"))).call(p=>p.selectAll("text").attr("font-size",10)),x.append("g").call(o.axisLeft(C).tickValues(f).tickFormat(U)).call(p=>p.selectAll("text").attr("font-size",10)),$<0&&B>0&&x.append("line").attr("x1",0).attr("x2",i).attr("y1",C(0)).attr("y2",C(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),x.selectAll(".yr-mark").data(n).join("line").attr("class","yr-mark").attr("x1",p=>b(p)).attr("x2",p=>b(p)).attr("y1",0).attr("y2",c).attr("stroke","#dee2e6").attr("stroke-width",1.5);const z=x.append("g").attr("clip-path",`url(#${H})`);l.forEach((p,w)=>{const P=D(p),I=o.area().x(q=>b(q.year)).y0(C(Math.max($,Math.min(B,0)))).y1(q=>C(Math.max($,Math.min(B,q.values[e.key]||0))));z.append("path").datum(P).attr("fill",e.color).attr("opacity",w===0?.72:.42).attr("stroke-dasharray",w===1?"5 3":null).attr("d",I)});const E=D(l[0]).at(-1);if(E){const p=E.values[e.key]||0;Number.isFinite(p)&&p>=$&&p<=B&&x.append("text").attr("x",i+4).attr("y",C(p)).attr("dy","0.35em").attr("font-size",10).attr("fill",e.color).text(U(p))}const L=o.select("#cwi-tooltip"),y=D(l[0]),k=o.bisector(p=>p.year).left,T=x.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",c).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");x.append("rect").attr("width",i).attr("height",c).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",p=>{const[w]=o.pointer(p),P=b.invert(w),I=k(y,P),q=y[Math.max(0,I-1)],R=y[Math.min(y.length-1,I)],V=R&&Math.abs(P-R.year)<Math.abs(P-q.year)?R:q;if(!V)return;T.attr("x1",b(V.year)).attr("x2",b(V.year)).style("display",null);const st=l.map(N=>{const Y=D(N).find(F=>F.year===V.year),j=Y?Y.values[e.key]||0:null;return`${N}: ${j!=null?U(j):"n/a"}`});L.html(`<strong style="color:${e.color}">${e.label}</strong> · ${V.year}<br>${st.join("<br>")}`).style("display","block").style("left",p.clientX+16+"px").style("top",p.clientY-50+"px")}).on("mouseleave",()=>{T.style("display","none"),L.style("display","none")})}function ie(t,e,l,s,n,a){const u=r=>{let i=0;return A.map(c=>{const S=r.values[c.key]||0,b=i;return i+=S,{grp:c,y0:b,y1:i}})},d=(r,i)=>{const c=D(i),S=c[c.length-1],b=c.flatMap(N=>u(N).flatMap(Y=>[Y.y0,Y.y1])),v=o.min(b),g=o.max(b),$=Math.min(0,v*1.05),B=g*1.05,C=(a==null?void 0:a.min)!=null?a.min:$,f=(a==null?void 0:a.max)!=null?a.max:B,H=700,x=340,z=22,L={top:20,right:s?168:112,bottom:28,left:80},y=H-L.left-L.right,k=x-L.top-L.bottom,T=o.select(r);T.attr("class","cwi-svg").attr("viewBox",`0 0 ${H} ${x}`),T.selectAll("*").remove();const p=o.scaleLinear().domain(o.extent(c,N=>N.year)).range([0,y]),w=o.scaleLinear().domain([C,f]).range([k,0]),P=`clip-area-${i}-${Math.random().toString(36).slice(2)}`;T.append("defs").append("clipPath").attr("id",P).append("rect").attr("width",y).attr("height",k);const I=T.append("g").attr("transform",`translate(${L.left},${L.top})`);I.append("g").attr("transform",`translate(0,${k})`).call(o.axisBottom(p).tickFormat(o.format("d"))),I.append("g").call(o.axisLeft(w).ticks(6).tickFormat(U)),C<0&&f>0&&I.append("line").attr("x1",0).attr("x2",y).attr("y1",w(0)).attr("y2",w(0)).attr("stroke","#adb5bd").attr("stroke-dasharray","4 3"),I.selectAll(".yr-ref").data(e).join("line").attr("x1",N=>p(N)).attr("x2",N=>p(N)).attr("y1",0).attr("y2",k).attr("stroke","#e9ecef");const q=I.append("g").attr("clip-path",`url(#${P})`);for(let N=A.length-1;N>=0;N--){const Y=A[N],j=o.area().x(F=>p(F.year)).y0(F=>w(Math.max(C,Math.min(f,u(F)[N].y0)))).y1(F=>w(Math.max(C,Math.min(f,u(F)[N].y1))));q.append("path").datum(c).attr("fill",Y.color).attr("opacity",.88).attr("d",j)}if(u(S).forEach(({grp:N,y0:Y,y1:j})=>{const F=(Y+j)/2;F>=C&&F<=f&&I.append("text").attr("x",y+5).attr("y",w(F)).attr("dy","0.35em").attr("font-size",10).attr("fill",N.color).text(N.label)}),s){const N=y+104,Y=N+z+7,j=8,F=16,X=o.sum(A,G=>G.pop);let O=0;const et=A.map(G=>{const nt=O;return O+=G.pop,{gr:G,start:nt,end:O}});let rt=0,at=X;const dt=.002,J=`clip-pbz-${Math.random().toString(36).slice(2)}`;T.select("defs").append("clipPath").attr("id",J).append("rect").attr("x",N-1).attr("y",0).attr("width",z+2).attr("height",k);const M=I.append("g").attr("clip-path",`url(#${J})`),Q=()=>{M.selectAll("*").remove();const G=at-rt;et.forEach(({gr:nt,start:ht,end:wt})=>{const yt=Math.max(ht,rt),Ft=Math.min(wt,at);if(Ft<=yt)return;const At=(yt-rt)/G*k,kt=Math.max(1,(Ft-yt)/G*k);M.append("rect").attr("x",N).attr("y",At).attr("width",z).attr("height",kt).attr("rx",2).attr("fill",nt.color).attr("opacity",.9),kt>=10&&M.append("text").attr("x",N+z/2).attr("y",At+kt/2).attr("dy","0.35em").attr("text-anchor","middle").attr("font-size",Math.min(8,kt*.45)).attr("fill","#fff").attr("pointer-events","none").text(`${nt.pop}%`)})};Q(),I.append("text").attr("x",N+z/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",9).attr("fill","#6c757d").text("Pop."),I.append("text").attr("x",Y+j/2).attr("y",-7).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("+"),I.append("text").attr("x",Y+j/2).attr("y",k+10).attr("text-anchor","middle").attr("font-size",8).attr("fill","#adb5bd").text("−"),I.append("rect").attr("x",Y+2).attr("y",0).attr("width",j-4).attr("height",k).attr("rx",3).attr("fill","#e9ecef");const lt=k-F;let tt=lt;const it=I.append("rect").attr("x",Y).attr("y",tt).attr("width",j).attr("height",F).attr("rx",3).attr("fill","#868e96").style("cursor","ns-resize"),ct=G=>{const nt=1-G/lt,ht=Math.log10(dt),wt=Math.log10(X),yt=Math.pow(10,wt+nt*(ht-wt));rt=Math.max(0,X-yt),at=X,Q()},K=o.drag().on("start",()=>it.attr("fill","#495057")).on("drag",G=>{tt=Math.max(0,Math.min(lt,tt+G.dy)),it.attr("y",tt),ct(tt)}).on("end",()=>it.attr("fill","#868e96"));it.call(K),I.append("rect").attr("x",Y).attr("y",0).attr("width",j).attr("height",k).attr("fill","none").style("pointer-events","all").on("click",G=>{const[,nt]=o.pointer(G);tt=Math.max(0,Math.min(lt,nt-F/2)),it.attr("y",tt),ct(tt)})}const R=o.select("#cwi-tooltip"),V=o.bisector(N=>N.year).left,st=I.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",k).attr("stroke","#6c757d").attr("stroke-dasharray","3 3").attr("pointer-events","none").style("display","none");I.append("rect").attr("width",y).attr("height",k).attr("fill","none").style("pointer-events","all").style("cursor","crosshair").on("mousemove",N=>{const[Y]=o.pointer(N),j=p.invert(Y),F=V(c,j),X=c[Math.max(0,F-1)],O=c[Math.min(c.length-1,F)],et=O&&Math.abs(j-O.year)<Math.abs(j-X.year)?O:X;if(!et)return;st.attr("x1",p(et.year)).attr("x2",p(et.year)).style("display",null);const rt=`<strong>${et.year}</strong><br>`+A.map(at=>{const dt=et.values[at.key]||0;return`<span style="color:${at.color}">${at.label}</span>: ${U(dt)}`}).join("<br>");R.html(rt).style("display","block").style("left",N.clientX+16+"px").style("top",N.clientY-60+"px")}).on("mouseleave",()=>{st.style("display","none"),R.style("display","none")})};if(l==="juxtaposition"){const r=n.flatMap(g=>D(g).flatMap($=>A.map(B=>$.values[B.key]||0))).filter(Number.isFinite),i=o.min(r),c=o.max(r),S=(a==null?void 0:a.max)!=null,b=[Math.min(0,i),(a==null?void 0:a.max)!=null?a.max:c];if(n.length>1){const g=document.createElement("p");g.className="cwi-note",g.textContent="Solid fill = income · Translucent dashed fill = wealth. All panels share the same Y axis.",t.appendChild(g)}const v=document.createElement("div");v.className="cwi-sm-grid",t.appendChild(v),A.forEach(g=>{const $=ot(v,g.label),B=document.createElementNS("http://www.w3.org/2000/svg","svg");$.appendChild(B),le(B,g,n,s,e,b,S)});return}const m=(r=>{if(n.length===1)return r;const i=document.createElement("div");return i.className="cwi-grid-2",r.appendChild(i),i})(t);n.forEach(r=>{const c=ot(m,r==="income"?"Average pre-tax income per person (SEK, linear scale, gray = Middle 40%)":"Average net wealth per person (SEK, linear scale, gray = Middle 40%, below 0 = net debt)"),S=document.createElementNS("http://www.w3.org/2000/svg","svg");c.appendChild(S),d(S,r)})}function _t(t){const e=Z("income",t),l=o.sum(Ot,s=>Math.max(0,e.totals[s]||0));return A.map(s=>{const n=Math.max(0,e.totals[s.key]||0);return l>0?n/l*100:0})}function Rt(t,e,l,s,n,a,u){e.forEach(m=>{t.append("rect").attr("x",m.x).attr("y",m.y).attr("width",l).attr("height",s).attr("rx",3).attr("fill",u)});let d=0;n.map((m,r)=>{const i={start:d,end:d+m,color:a[r]};return d+=m,i}).forEach(m=>{e.forEach(r=>{const i=Math.max(r.i,m.start),c=Math.min(r.i+1,m.end);if(c<=i+.001)return;const S=i-r.i,b=c-r.i,v=b-S>=.999,g=r.y+s*(1-b),$=Math.max(1,s*(b-S));t.append("rect").attr("x",r.x).attr("y",g).attr("width",l).attr("height",$).attr("rx",v?3:1).attr("fill",m.color)})})}function Yt(t,e,l){const s=o.select(t),n=250,a=l?290:240,u=20,d=_t(e);s.attr("class","cwi-svg").attr("viewBox",`0 0 ${n} ${a}`),s.selectAll("*").remove();const h=o.range(100).map(r=>({i:r,x:15+r%10*22,y:15+(9-Math.floor(r/10))*22})),m=s.append("g");if(Rt(m,h,u,u,d,A.map(r=>r.color),"#eef1ea"),l){const r=[...A.map(b=>b.pop),40],i=[...A.map(b=>b.color),"#dee2e6"],c=Kt(r);let S=0;s.append("text").attr("x",15).attr("y",255).attr("font-size",10).attr("fill","#5f6368").text("Population strip (gray = Middle 40%)"),c.forEach((b,v)=>{for(let g=0;g<b;g+=1)s.append("rect").attr("x",15+S*2.05).attr("y",265).attr("width",1.8).attr("height",10).attr("rx",1).attr("fill",i[v]).attr("opacity",.75),S+=1})}}function ce(t,e,l,s){const n=document.createElement("div");if(n.className="cwi-note",n.textContent="Income waffle shares: population share × average income for each disjoint group. Wealth excluded (negative values).",t.appendChild(n),l==="juxtaposition"){A.forEach((a,u)=>{const d=document.createElement("div");d.style.cssText="margin-bottom:1.2rem;";const h=document.createElement("h4");h.textContent=a.label,h.style.cssText=`font-size:0.95rem;font-weight:700;color:${a.color};margin:0 0 0.4rem;`,d.appendChild(h);const m=document.createElement("div");m.style.cssText="display:flex;flex-wrap:wrap;gap:0.6rem;",e.forEach(r=>{const i=ot(m,String(r));i.style.minWidth="170px";const S=_t(r)[u],b=o.select(i).append("svg").attr("class","cwi-svg").attr("viewBox","0 0 240 240"),v=o.range(100).map(B=>({i:B,x:10+B%10*22,y:10+(9-Math.floor(B/10))*22})),g=b.append("g");Rt(g,v,20,20,[S],[a.color],"#e9ecef");const $=document.createElement("p");$.textContent=`${S.toFixed(2)}%`,$.style.cssText="text-align:center;font-size:0.8rem;color:#5f6368;margin:0.2rem 0 0;",i.appendChild($)}),d.appendChild(m),t.appendChild(d)});return}if(l==="superposition"){const a=document.createElement("div");a.className="cwi-years-grid";const u=document.createElement("div");u.className="cwi-inline-legend",u.style.marginBottom="0.6rem",A.forEach(d=>{const h=document.createElement("span");h.innerHTML=`<i style="background:${d.color}"></i><span>${d.label}</span>`,u.appendChild(h)}),t.appendChild(u),t.appendChild(a),e.forEach(d=>{const h=ot(a,String(d)),m=document.createElementNS("http://www.w3.org/2000/svg","svg");h.appendChild(m),Yt(m,d,s)});return}Tt(t,ut(),(a,u)=>{u.innerHTML="";const d=document.createElementNS("http://www.w3.org/2000/svg","svg");u.appendChild(d),Yt(d,a,s)},"Animated income waffle")}function de(){te();const t=document.getElementById("cwi-years-input"),e=document.getElementById("cwi-representation"),l=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-render-root");if(!t||!e||!l||!s||!n||!a)return;const u=document.getElementById("cwi-yscale-ctrl"),d=document.getElementById("cwi-yscale-linear-zoom"),h=document.getElementById("cwi-yscale-linear"),m=document.getElementById("cwi-yscale-break");let r="linear-zoom";d==null||d.addEventListener("change",()=>{r="linear-zoom",x()}),h==null||h.addEventListener("change",()=>{r="linear",x()}),m==null||m.addEventListener("change",()=>{r="break",x()});const i=document.getElementById("cwi-yview"),c=document.getElementById("cwi-ymax-slider"),S=document.getElementById("cwi-ymax-val"),b=document.getElementById("cwi-yview-reset");let v={min:null,max:null},g=1;const $=z=>{const E=z.flatMap(L=>D(L).flatMap(y=>A.map(k=>y.values[k.key]||0))).filter(Number.isFinite);return o.max(E)},B=z=>{const E=Math.max(5,Math.log10(Math.abs(g))-4.5),L=Math.log10(Math.abs(g));return Math.pow(10,E+(L-E)*z/1e3)},C=z=>{const E=Math.max(5,Math.log10(Math.abs(g))-4.5),L=Math.log10(Math.abs(g));return Math.max(0,Math.min(1e3,Math.round((Math.log10(Math.max(z,1))-E)/(L-E)*1e3)))},f=()=>{const z=v.max!=null?v.max:g;S.textContent=U(z)},H=()=>{const z=v.max!=null?v.max:g;c.value=C(z),f()};c.addEventListener("input",()=>{v.max=B(Number(c.value)),f(),x()}),b.addEventListener("click",()=>{v={min:null,max:null},H(),x()});const x=()=>{pt&&(clearInterval(pt),pt=null);const z=ee(t.value),E=e.value,L=n.value==="with";s.disabled=E==="waffle",E==="waffle"&&(s.value="income");const y=s.value==="both"?["income","wealth"]:[s.value];Array.from(l.options).forEach(w=>{w.disabled=(E==="line"||E==="stacked")&&w.value==="animation"}),(E==="line"||E==="stacked")&&l.value==="animation"&&(l.value="juxtaposition");const k=l.value;E==="line"?u.classList.remove("hidden"):(u.classList.add("hidden"),r="linear-zoom",d&&(d.checked=!0)),E==="bar"||E==="stacked"||E==="line"&&r==="linear-zoom"?(i.classList.remove("hidden"),g=$(y),H()):(i.classList.add("hidden"),v={min:null,max:null});const p=r==="linear-zoom"?v:{min:null,max:null};a.innerHTML="",E==="table"&&ae(a,z,k,L,y),E==="bar"&&ne(a,z,k,L,y,v),E==="line"&&re(a,z,k,L,y,p,r),E==="stacked"&&ie(a,z,k,L,y,v),E==="waffle"&&ce(a,z,k,L)};e.addEventListener("change",x),l.addEventListener("change",x),s.addEventListener("change",x),n.addEventListener("change",x),t.addEventListener("change",x),t.addEventListener("blur",x),x()}const It="1.0",Vt="wealth-study-data",gt=[{id:"consent",type:"info",title:"Participant Information & Consent",content:`
      <p>You are invited to participate in a user study conducted as part of a Master's thesis at Linköping University.</p>
      <p><strong>What you will do:</strong> Interact with the visualization tool and answer a short question.</p>
      <p><strong>Data:</strong> Your responses are stored locally in your browser. No personal data is collected.</p>
      <p><strong>Participation is voluntary.</strong> You may close this window at any time.</p>
      <label class="consent-check">
        <input type="checkbox" id="consent-checkbox" />
        I have read the information above and agree to participate.
      </label>`,nextLabel:"Start",requireConsent:!0},{id:"task_test",type:"task",phase:"Task 1 of 1",vizConfig:{representation:"bar",comparison:"juxtaposition",metric:"wealth",popEncoding:"without",years:"1980,1990,2000,2010,2020,2024"},taskText:"test",questionText:"test",options:[{label:"a test",value:"a"},{label:"b test",value:"b"},{label:"c test",value:"c"},{label:"d test",value:"d"}]},{id:"complete",type:"complete",title:"Thank you!",content:"<p>Your response has been recorded.</p>"}],_={currentStep:0,startTime:Date.now(),stepTimes:{},answers:{},participantId:Math.random().toString(36).slice(2,9)};function pe(t){const e=document.getElementById("cwi-representation"),l=document.getElementById("cwi-comparison"),s=document.getElementById("cwi-metric"),n=document.getElementById("cwi-pop-encoding"),a=document.getElementById("cwi-years-input");e&&(t.representation&&(e.value=t.representation),t.years&&(a.value=t.years,a.dispatchEvent(new Event("change"))),t.metric&&(s.value=t.metric),t.comparison&&(l.value=t.comparison),t.popEncoding&&(n.value=t.popEncoding),e.dispatchEvent(new Event("change")))}function Gt(t,e,l={}){_.answers[t]={value:e,timestamp:Date.now(),elapsed:Date.now()-(_.stepTimes[t]||_.startTime),...l},localStorage.setItem(Vt,JSON.stringify({state:_,version:It}))}function ue(){gt.find(n=>n.id==="pre_q1");const t={participantId:_.participantId,studyVersion:It,startTime:new Date(_.startTime).toISOString(),completedTime:new Date().toISOString(),answers:_.answers,summary:Xt()},e=new Blob([JSON.stringify(t,null,2)],{type:"application/json"}),l=URL.createObjectURL(e),s=document.createElement("a");s.href=l,s.download=`study-${_.participantId}.json`,s.click(),URL.revokeObjectURL(l)}function Xt(){var t;return{taskTestAnswer:((t=_.answers.task_test)==null?void 0:t.value)??"—"}}function Bt(){const t=gt[_.currentStep];_.stepTimes[t.id]=Date.now();const e=document.getElementById("study-overlay"),l=document.getElementById("study-panel"),s=document.getElementById("study-task-banner");t.type==="task"?(e.classList.add("hidden"),s.classList.remove("hidden"),pe(t.vizConfig),ye(t,s)):(s.classList.add("hidden"),e.classList.remove("hidden"),t.type==="info"&&me(t,l),t.type==="question"&&he(t,l),t.type==="complete"&&fe(t,l)),xe()}function me(t,e){var l,s;if(e.innerHTML=`
    <div class="study-phase-tag">Information</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-nav">
      ${_.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${t.requireConsent?"disabled":""}>${t.nextLabel||"Next →"}</button>
    </div>`,t.requireConsent){const n=e.querySelector("#consent-checkbox"),a=e.querySelector("#study-next");n.addEventListener("change",()=>{a.disabled=!n.checked})}(l=e.querySelector("#study-next"))==null||l.addEventListener("click",Ct),(s=e.querySelector("#study-prev"))==null||s.addEventListener("click",Nt)}function he(t,e){var s,n;const l=(s=_.answers[t.id])==null?void 0:s.value;e.innerHTML=`
    <div class="study-phase-tag">${t.phase} — Question ${t.questionNum}</div>
    <h2 class="study-title">${t.text}</h2>
    ${t.note?`<p class="study-note">${t.note}</p>`:""}
    <div class="study-options" id="study-options">
      ${t.options.map(a=>`
        <label class="study-option ${l===a.value?"selected":""}">
          <input type="radio" name="sq" value="${a.value}" ${l===a.value?"checked":""}/>
          ${a.label}
        </label>`).join("")}
    </div>
    <div class="study-nav">
      ${_.currentStep>0?'<button class="study-btn secondary" id="study-prev">← Back</button>':""}
      <button class="study-btn primary" id="study-next" ${l?"":"disabled"}>Next →</button>
    </div>`,e.querySelectorAll(".study-option").forEach(a=>{a.addEventListener("click",()=>{e.querySelectorAll(".study-option").forEach(d=>d.classList.remove("selected")),a.classList.add("selected");const u=a.querySelector("input").value;Gt(t.id,u),e.querySelector("#study-next").disabled=!1})}),e.querySelector("#study-next").addEventListener("click",Ct),(n=e.querySelector("#study-prev"))==null||n.addEventListener("click",Nt)}let $t="description";function ye(t,e){$t="description",e.innerHTML=Et(t),St(t,e)}function Et(t){var l;const e=(l=_.answers[t.id])==null?void 0:l.value;return $t==="description"?`
      <div class="task-banner-inner">
        <button class="study-close-btn" id="task-close-btn" title="Close study">✕</button>
        <div class="task-phase-tag">${t.phase}</div>
        <p class="task-desc">${t.taskText}</p>
        <div class="task-banner-nav">
          <button class="study-btn secondary" id="task-back">← Back</button>
          <button class="study-btn primary" id="task-ready">I've examined the chart — show question →</button>
        </div>
      </div>`:`
    <div class="task-banner-inner">
      <button class="study-close-btn" id="task-close-btn" title="Close study">✕</button>
      <div class="task-phase-tag">${t.phase} — Question</div>
      <p class="task-question"><strong>${t.questionText}</strong></p>
      ${t.note?`<p class="study-note">${t.note}</p>`:""}
      <div class="task-options-row">
        ${t.options.map(s=>`
          <label class="task-option ${e===s.value?"selected":""}">
            <input type="radio" name="tq" value="${s.value}" ${e===s.value?"checked":""}/>
            ${s.label}
          </label>`).join("")}
      </div>
      <div class="task-banner-nav">
        <button class="study-btn secondary" id="task-back-q">← Re-read description</button>
        <button class="study-btn primary" id="task-submit" ${e?"":"disabled"}>Submit →</button>
      </div>
    </div>`}function St(t,e){var l,s,n,a,u;(l=e.querySelector("#task-back"))==null||l.addEventListener("click",()=>{Nt()}),(s=e.querySelector("#task-ready"))==null||s.addEventListener("click",()=>{$t="question",e.innerHTML=Et(t),St(t,e)}),(n=e.querySelector("#task-back-q"))==null||n.addEventListener("click",()=>{$t="description",e.innerHTML=Et(t),St(t,e)}),e.querySelectorAll(".task-option").forEach(d=>{d.addEventListener("click",()=>{e.querySelectorAll(".task-option").forEach(m=>m.classList.remove("selected")),d.classList.add("selected");const h=d.querySelector("input").value;Gt(t.id,h),e.querySelector("#task-submit").disabled=!1})}),(a=e.querySelector("#task-submit"))==null||a.addEventListener("click",Ct),(u=e.querySelector("#task-close-btn"))==null||u.addEventListener("click",zt)}function fe(t,e){const l=Xt();e.innerHTML=`
    <div class="study-phase-tag">Complete</div>
    <h2 class="study-title">${t.title}</h2>
    <div class="study-body">${t.content}</div>
    <div class="study-summary">
      <h3>Your response summary</h3>
      <table class="summary-table">
        <tr><th>Task answer</th><td>${l.taskTestAnswer}</td></tr>
      </table>
    </div>
    <div class="study-nav centered">
      <button class="study-btn primary large" id="study-download">⬇ Download my data (JSON)</button>
      <button class="study-btn secondary" id="study-close-complete">Close</button>
    </div>`,e.querySelector("#study-download").addEventListener("click",ue),e.querySelector("#study-close-complete").addEventListener("click",zt)}function xe(){const t=document.getElementById("study-progress-bar"),e=document.getElementById("study-progress-label"),l=gt.length-1,s=Math.round(_.currentStep/l*100);t&&(t.style.width=s+"%"),e&&(e.textContent=`Step ${_.currentStep+1} of ${gt.length}`)}function Ct(){_.currentStep<gt.length-1&&(_.currentStep++,Bt())}function Nt(){_.currentStep>0&&(_.currentStep--,Bt())}function be(){ge(),we();try{const t=localStorage.getItem(Vt);if(t){const e=JSON.parse(t);e.version===It&&e.state&&Object.assign(_,e.state)}}catch{}document.getElementById("study-launch-btn").addEventListener("click",()=>{document.getElementById("study-launcher").classList.add("hidden"),document.getElementById("study-overlay").classList.remove("hidden"),Bt()}),document.getElementById("study-close-btn").addEventListener("click",zt)}function zt(){document.getElementById("study-overlay").classList.add("hidden"),document.getElementById("study-task-banner").classList.add("hidden"),document.getElementById("study-progress-container").classList.add("hidden"),document.getElementById("study-launcher").classList.remove("hidden"),_.currentStep=0}function ge(){document.body.insertAdjacentHTML("beforeend",`
    <!-- Launch button -->
    <div id="study-launcher" class="study-launcher">
      <button id="study-launch-btn" class="study-launch-btn">Start User Study</button>
    </div>

    <!-- Progress bar (shown during study) -->
    <div id="study-progress-container" class="study-progress-container hidden">
      <div id="study-progress-bar" class="study-progress-bar" style="width:0%"></div>
      <span id="study-progress-label" class="study-progress-label"></span>
    </div>

    <!-- Full-screen overlay (for info/question/complete steps) -->
    <div id="study-overlay" class="study-overlay hidden">
      <button id="study-close-btn" class="study-close-btn" title="Close study">✕</button>
      <div id="study-panel" class="study-panel"></div>
    </div>

    <!-- Task banner (shown over the visualization) -->
    <div id="study-task-banner" class="study-task-banner hidden"></div>
  `),new MutationObserver(()=>{const e=document.getElementById("study-overlay"),l=document.getElementById("study-task-banner"),s=document.getElementById("study-progress-container");e.classList.contains("hidden")&&l.classList.contains("hidden")&&_.currentStep===0?s.classList.add("hidden"):s.classList.remove("hidden")}).observe(document.getElementById("study-overlay"),{attributes:!0})}function we(){const t=document.createElement("style");t.textContent=`
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
.study-close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  color: #6c757d;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10;
}
.study-close-btn:hover { background: #f1f3f5; color: #212529; }

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
  `,document.head.appendChild(t)}be();
