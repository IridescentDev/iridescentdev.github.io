const nt="ENTRIES",V="KEYS",T="VALUES",F="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===F)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==F).join("")}value(){return E(this._path).node.get(F)}result(){switch(this._type){case T:return this.value();case V:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ot=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const h=u*i;t:for(const c of e.keys())if(c===F){const d=o[h-1];d<=s&&n.set(r,[e.get(c),d])}else{let d=u;for(let l=0;l<c.length;++l,++d){const p=c[l],f=i*d,g=f-i;let a=o[f];const m=Math.max(0,d-s-1),y=Math.min(i-1,d+s);for(let _=m;_<y;++_){const b=p!==t[_],z=o[g+_]+ +b,A=o[g+_+1]+1,w=o[f+_]+1,L=o[f+_+1]=Math.min(z,A,w);L<a&&(a=L)}if(a>s)continue t}W(e.get(c),t,s,n,o,d,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==F&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ut(this._tree,t)}entries(){return new D(this,nt)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ot(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(F):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(F)}keys(){return new D(this,V)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,M(this._tree,t).set(F,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);return n.set(F,s(n.get(F))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=M(this._tree,t);let o=n.get(F);return o===void 0&&n.set(F,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==F&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==F&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},M=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==F&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const h=e.get(u);if(r===u.length)e=h;else{const c=new Map;c.set(u.slice(r),h),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ut=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(F),s.size===0)R(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},R=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)R(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==F&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],it=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},rt=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",q="and",ct="and_not",lt=(e,t)=>{e.includes(t)||e.push(t)},P=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,ht=()=>new Map,k=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},N=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,dt={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),P(n.terms,u)}}return e},[q]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);P(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[ct]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},at=(e,t,s,n,o,u)=>{const{k:i,b:r,d:h}=u;return Math.log(1+(s-t+.5)/(t+.5))*(h+e*(i+1)/(e+i*(1-r+r*n/o)))},ft=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},gt=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,ht),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},mt={k:1.2,b:.7,d:.5},pt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(rt),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:mt},Ft={combineWith:q,prefix:(e,t,s)=>t===s.length-1},_t={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},yt={..._t,...U},Y=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(dt[s])||new Map},B=(e,t,s,n,o,u,i,r,h=new Map)=>{if(o==null)return h;for(const c of Object.keys(u)){const d=u[c],l=e._fieldIds[c],p=o.get(l);if(p==null)continue;let f=p.size;const g=e._avgFieldLength[l];for(const a of p.keys()){if(!e._documentIds.has(a)){gt(e,l,a,s),f-=1;continue}const m=i?i(e._documentIds.get(a),s,e._storedFields.get(a)):1;if(!m)continue;const y=p.get(a),_=e._fieldLength.get(a)[l],b=at(y,f,e._documentCount,_,g,r),z=n*d*m*b,A=h.get(a);if(A){A.score+=z,lt(A.terms,t);const w=N(A.match,s);w?w.push(c):A.match[s]=[c]}else h.set(a,{score:z,terms:[t],match:{[s]:[c]}})}}return h},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((a,m)=>({...a,[m]:N(n.boost,m)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:h}=n,{fuzzy:c,prefix:d}={...J.weights,...i},l=e._index.get(t.term),p=B(e,t.term,t.term,1,l,o,u,h);let f,g;if(t.prefix&&(f=e._index.atPrefix(t.term)),t.fuzzy){const a=t.fuzzy===!0?.2:t.fuzzy,m=a<1?Math.min(r,Math.round(t.term.length*a)):a;m&&(g=e._index.fuzzyGet(t.term,m))}if(f)for(const[a,m]of f){const y=a.length-t.term.length;if(!y)continue;g==null||g.delete(a);const _=d*a.length/(a.length+.3*y);B(e,t.term,a,_,m,o,u,h,p)}if(g)for(const a of g.keys()){const[m,y]=g.get(a);if(!y)continue;const _=c*a.length/(a.length+y);B(e,t.term,a,_,m,o,u,h,p)}return p},X=(e,t,s={})=>{if(typeof t!="string"){const d={...s,...t,queries:void 0},l=t.queries.map(p=>X(e,p,d));return Y(l,d.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:h}=i,c=r(t).flatMap(d=>h(d)).filter(d=>!!d).map(ft(i)).map(d=>At(e,d,i));return Y(c,i.combineWith)},K=(e,t,s={})=>{const n=X(e,t,s),o=[];for(const[u,{score:i,terms:r,match:h}]of n){const c=r.length,d={id:e._documentIds.get(u),score:i*c,terms:Object.keys(h),match:h};Object.assign(d,e._storedFields.get(u)),(s.filter==null||s.filter(d))&&o.push(d)}return o.sort(G),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of K(e,t,s)){const r=i.join(" "),h=n.get(r);h!=null?(h.score+=u,h.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:h}]of n)o.push({suggestion:u,terms:r,score:i/h});return o.sort(G),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if((t==null?void 0:t.fields)==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...pt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...Ft,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:h,serializationVersion:c},d)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const l=new Et(d);l._documentCount=t,l._nextId=s,l._documentIds=k(n),l._idToShortId=new Map,l._fieldIds=o,l._fieldLength=k(u),l._avgFieldLength=i,l._storedFields=k(r),l._dirtCount=h||0,l._index=new C;for(const[p,f]of l._documentIds)l._idToShortId.set(f,p);for(const[p,f]of e){const g=new Map;for(const a of Object.keys(f)){let m=f[a];c===1&&(m=m.ds),g.set(parseInt(a,10),k(m))}l._index.set(p,g)}return l},Q=Object.entries,wt=Object.fromEntries,j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,d=!1)=>{let l="";i===0?l=c.length>20?`… ${c.slice(-20)}`:c:d?l=c.length+i>100?`${c.slice(0,100-i)}… `:c:l=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,l&&o.push(l),i+=l.length,d||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let h=s.indexOf(n,u);if(h===-1)return null;for(;h>=0;){const c=h+n.length;if(r(e.slice(u,h)),u=c,i>100)break;h=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),kt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return K(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,h=u.includes("@"),c=u.includes("#"),[d,l]=u.split(/[#@]/),{contents:p}=n[d]??={title:"",contents:[]};if(h)p.push([{type:"customField",key:d,index:l,display:i.map(f=>o.c.map(g=>j(g,f))).flat().filter(f=>f!==null)},r]);else{const f=i.map(g=>j(o.h,g)).filter(g=>g!==null);if(f.length&&p.push([{type:c?"heading":"title",key:d,...c&&{anchor:l},display:f},r]),"t"in o)for(const g of o.t){const a=i.map(m=>j(g,m)).filter(m=>m!==null);a.length&&p.push([{type:"text",key:d,...c&&{anchor:l},display:a},r])}}}),Q(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):kt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=it(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Ct(t,e,tt(s)).map(({suggestion:n})=>n),v=wt(Q(JSON.parse("{\"/\":{\"documentCount\":41,\"nextId\":41,\"documentIds\":{\"0\":\"v-2672e8bd\",\"1\":\"v-2672e8bd#iridescent-finale\",\"2\":\"v-2672e8bd#雪镇\",\"3\":\"v-2672e8bd#atlantis-ender-base\",\"4\":\"v-2672e8bd#栖息地\",\"5\":\"v-2672e8bd#旅者\",\"6\":\"v-1473bf53\",\"7\":\"v-1473bf53#目录\",\"8\":\"v-4e65ec78\",\"9\":\"v-c151bf32\",\"10\":\"v-438ffe52\",\"11\":\"v-438ffe52#markdown-介绍\",\"12\":\"v-438ffe52#markdown-配置\",\"13\":\"v-438ffe52#markdown-扩展\",\"14\":\"v-438ffe52#vuepress-扩展\",\"15\":\"v-438ffe52#主题扩展\",\"16\":\"v-438ffe52#自定义容器\",\"17\":\"v-438ffe52#代码块\",\"18\":\"v-438ffe52#上下角标\",\"19\":\"v-438ffe52#自定义对齐\",\"20\":\"v-438ffe52#attrs\",\"21\":\"v-438ffe52#脚注\",\"22\":\"v-438ffe52#标记\",\"23\":\"v-438ffe52#任务列表\",\"24\":\"v-438ffe52#图片增强\",\"25\":\"v-438ffe52#卡片\",\"26\":\"v-438ffe52#图表\",\"27\":\"v-438ffe52#echarts\",\"28\":\"v-438ffe52#流程图\",\"29\":\"v-438ffe52#mermaid\",\"30\":\"v-438ffe52#tex-语法\",\"31\":\"v-438ffe52#导入文件\",\"32\":\"v-438ffe52#代码演示\",\"33\":\"v-438ffe52#样式化\",\"34\":\"v-438ffe52#交互演示\",\"35\":\"v-438ffe52#vue-交互演示\",\"36\":\"v-438ffe52#幻灯片\",\"37\":\"v-6e19edb7\",\"38\":\"v-6e19edb7#页面信息\",\"39\":\"v-6e19edb7#页面内容\",\"40\":\"v-6e19edb7#页面结构\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1],\"1\":[2],\"2\":[1],\"3\":[3],\"4\":[1],\"5\":[1],\"6\":[1],\"7\":[1],\"8\":[1],\"9\":[1],\"10\":[2,7],\"11\":[2],\"12\":[2],\"13\":[2],\"14\":[2],\"15\":[1],\"16\":[1],\"17\":[1],\"18\":[1],\"19\":[1],\"20\":[1],\"21\":[1],\"22\":[1],\"23\":[1],\"24\":[1],\"25\":[1],\"26\":[1],\"27\":[1],\"28\":[1],\"29\":[1],\"30\":[2],\"31\":[1],\"32\":[1],\"33\":[1],\"34\":[1],\"35\":[2],\"36\":[1],\"37\":[1],\"38\":[1],\"39\":[1],\"40\":[1]},\"averageFieldLength\":[1.2439024390243902,0.6363636363636364],\"storedFields\":{\"0\":{\"h\":\"故事\"},\"1\":{\"h\":\"Iridescent Finale\"},\"2\":{\"h\":\"雪镇\"},\"3\":{\"h\":\"Atlantis Ender Base\"},\"4\":{\"h\":\"栖息地\"},\"5\":{\"h\":\"旅者\"},\"6\":{\"h\":\"主要功能与配置演示\"},\"7\":{\"h\":\"目录\"},\"8\":{\"h\":\"布局与功能禁用\"},\"9\":{\"h\":\"密码加密的文章\"},\"10\":{\"h\":\"Markdown 展示\",\"t\":[\"VuePress 主要从 Markdown 文件生成页面。因此，你可以使用它轻松生成文档或博客站点。\"]},\"11\":{\"h\":\"Markdown 介绍\"},\"12\":{\"h\":\"Markdown 配置\"},\"13\":{\"h\":\"Markdown 扩展\"},\"14\":{\"h\":\"VuePress 扩展\"},\"15\":{\"h\":\"主题扩展\"},\"16\":{\"h\":\"自定义容器\"},\"17\":{\"h\":\"代码块\"},\"18\":{\"h\":\"上下角标\"},\"19\":{\"h\":\"自定义对齐\"},\"20\":{\"h\":\"Attrs\"},\"21\":{\"h\":\"脚注\"},\"22\":{\"h\":\"标记\"},\"23\":{\"h\":\"任务列表\"},\"24\":{\"h\":\"图片增强\"},\"25\":{\"h\":\"卡片\"},\"26\":{\"h\":\"图表\"},\"27\":{\"h\":\"Echarts\"},\"28\":{\"h\":\"流程图\"},\"29\":{\"h\":\"Mermaid\"},\"30\":{\"h\":\"Tex 语法\"},\"31\":{\"h\":\"导入文件\"},\"32\":{\"h\":\"代码演示\"},\"33\":{\"h\":\"样式化\"},\"34\":{\"h\":\"交互演示\"},\"35\":{\"h\":\"Vue 交互演示\"},\"36\":{\"h\":\"幻灯片\"},\"37\":{\"h\":\"页面配置\"},\"38\":{\"h\":\"页面信息\"},\"39\":{\"h\":\"页面内容\"},\"40\":{\"h\":\"页面结构\"}},\"dirtCount\":0,\"index\":[[\"页面结构\",{\"0\":{\"40\":1}}],[\"页面内容\",{\"0\":{\"39\":1}}],[\"页面信息\",{\"0\":{\"38\":1}}],[\"页面配置\",{\"0\":{\"37\":1}}],[\"幻灯片\",{\"0\":{\"36\":1}}],[\"vue\",{\"0\":{\"35\":1}}],[\"vuepress\",{\"0\":{\"14\":1},\"1\":{\"10\":1}}],[\"交互演示\",{\"0\":{\"34\":1,\"35\":1}}],[\"样式化\",{\"0\":{\"33\":1}}],[\"代码演示\",{\"0\":{\"32\":1}}],[\"代码块\",{\"0\":{\"17\":1}}],[\"导入文件\",{\"0\":{\"31\":1}}],[\"语法\",{\"0\":{\"30\":1}}],[\"tex\",{\"0\":{\"30\":1}}],[\"mermaid\",{\"0\":{\"29\":1}}],[\"markdown\",{\"0\":{\"10\":1,\"11\":1,\"12\":1,\"13\":1},\"1\":{\"10\":1}}],[\"流程图\",{\"0\":{\"28\":1}}],[\"echarts\",{\"0\":{\"27\":1}}],[\"ender\",{\"0\":{\"3\":1}}],[\"图表\",{\"0\":{\"26\":1}}],[\"图片增强\",{\"0\":{\"24\":1}}],[\"卡片\",{\"0\":{\"25\":1}}],[\"任务列表\",{\"0\":{\"23\":1}}],[\"标记\",{\"0\":{\"22\":1}}],[\"脚注\",{\"0\":{\"21\":1}}],[\"attrs\",{\"0\":{\"20\":1}}],[\"atlantis\",{\"0\":{\"3\":1}}],[\"自定义对齐\",{\"0\":{\"19\":1}}],[\"自定义容器\",{\"0\":{\"16\":1}}],[\"上下角标\",{\"0\":{\"18\":1}}],[\"主题扩展\",{\"0\":{\"15\":1}}],[\"主要从\",{\"1\":{\"10\":1}}],[\"主要功能与配置演示\",{\"0\":{\"6\":1}}],[\"扩展\",{\"0\":{\"13\":1,\"14\":1}}],[\"配置\",{\"0\":{\"12\":1}}],[\"介绍\",{\"0\":{\"11\":1}}],[\"你可以使用它轻松生成文档或博客站点\",{\"1\":{\"10\":1}}],[\"因此\",{\"1\":{\"10\":1}}],[\"文件生成页面\",{\"1\":{\"10\":1}}],[\"展示\",{\"0\":{\"10\":1}}],[\"密码加密的文章\",{\"0\":{\"9\":1}}],[\"布局与功能禁用\",{\"0\":{\"8\":1}}],[\"目录\",{\"0\":{\"7\":1}}],[\"旅者\",{\"0\":{\"5\":1}}],[\"栖息地\",{\"0\":{\"4\":1}}],[\"base\",{\"0\":{\"3\":1}}],[\"雪镇\",{\"0\":{\"2\":1}}],[\"finale\",{\"0\":{\"1\":1}}],[\"iridescent\",{\"0\":{\"1\":1}}],[\"故事\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,v[s],n)):e==="search"?self.postMessage(et(t,v[s],n)):self.postMessage({suggestions:st(t,v[s],n),results:et(t,v[s],n)})};
//# sourceMappingURL=index.js.map
