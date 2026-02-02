(function(n){typeof define=="function"&&define.amd?define(n):n()})(function(){"use strict";/**
 * WPFeatureLoop SDK
 * A feature voting widget for WordPress plugins
 *
 * @version 1.0.0
 * @license MIT
 */(function(n,u){typeof exports=="object"&&typeof module<"u"?module.exports=u():typeof define=="function"&&define.amd?define(u):(n=typeof globalThis<"u"?globalThis:n||self,n.WPFeatureLoop=u())})(void 0,function(){const n={plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',arrowDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',comment:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="m22 2-11 11"/></svg>',empty:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',error:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>'},u={en:{title:"Feature Roadmap",subtitle:"Vote for features you want to see next",suggestFeature:"Suggest Feature",suggestTitle:"Suggest a Feature",titleLabel:"Title",titlePlaceholder:"Brief description of your feature idea",descriptionLabel:"Description",descriptionPlaceholder:"Explain the feature and why it would be valuable...",categoryLabel:"Category",categoryPlaceholder:"e.g., UI/UX, Performance, Integration",cancel:"Cancel",submit:"Submit Feature",comments:"comments",comment:"comment",addComment:"Add a comment...",noComments:"No comments yet. Be the first to share your thoughts!",emptyTitle:"No features yet",emptyText:"Be the first to suggest a feature!",errorTitle:"Failed to load features",errorText:"Please try again later.",retry:"Retry",fillAllFields:"Please fill in all fields",featureSubmitted:"Feature submitted successfully!",commentAdded:"Comment added!",voteSaved:"Vote saved!",statusOpen:"Open",statusPlanned:"Planned",statusProgress:"In Progress",statusCompleted:"Completed",upvote:"Upvote",downvote:"Downvote"},"pt-BR":{title:"Roadmap de Features",subtitle:"Vote nas funcionalidades que deseja ver",suggestFeature:"Sugerir Feature",suggestTitle:"Sugerir uma Feature",titleLabel:"Título",titlePlaceholder:"Breve descrição da sua ideia",descriptionLabel:"Descrição",descriptionPlaceholder:"Explique a feature e por que seria valiosa...",categoryLabel:"Categoria",categoryPlaceholder:"Ex: UI/UX, Performance, Integração",cancel:"Cancelar",submit:"Enviar Feature",comments:"comentários",comment:"comentário",addComment:"Adicionar um comentário...",noComments:"Nenhum comentário ainda. Seja o primeiro!",emptyTitle:"Nenhuma feature ainda",emptyText:"Seja o primeiro a sugerir uma feature!",errorTitle:"Erro ao carregar features",errorText:"Por favor, tente novamente mais tarde.",retry:"Tentar novamente",fillAllFields:"Por favor, preencha todos os campos",featureSubmitted:"Feature enviada com sucesso!",commentAdded:"Comentário adicionado!",voteSaved:"Voto salvo!",statusOpen:"Aberto",statusPlanned:"Planejado",statusProgress:"Em Progresso",statusCompleted:"Concluído",upvote:"Votar a favor",downvote:"Votar contra"}};class k{constructor(e){this.publicKey=e.publicKey,this.projectId=e.projectId,this.user=e.user,this.signature=e.signature,this.baseUrl=e.apiUrl||"https://api.wpfeatureloop.io/v1"}async _simulateDelay(e=800){return new Promise(t=>setTimeout(t,e))}_getHeaders(){var e,t;return{"Content-Type":"application/json","X-Public-Key":this.publicKey,"X-Project-Id":this.projectId,"X-User-Id":((t=(e=this.user)==null?void 0:e.id)==null?void 0:t.toString())||"","X-Signature":this.signature||""}}async getFeatures(){return await this._simulateDelay(),[{id:1,title:"Dark Mode Support",description:"Add a dark mode theme option that follows system preferences or can be toggled manually. Essential for users who work at night or prefer darker interfaces.",votes:47,userVote:null,status:"planned",commentsCount:2,tags:["UI/UX"],createdAt:"2024-01-15T10:00:00Z"},{id:2,title:"Export Data to CSV",description:"Allow users to export all their data in CSV format for backup or migration purposes. Include options to select specific date ranges and data types.",votes:32,userVote:null,status:"progress",commentsCount:1,tags:["Data"],createdAt:"2024-01-10T14:30:00Z"},{id:3,title:"API Webhooks",description:"Implement webhooks to notify external services when certain events occur, like new submissions or status changes.",votes:28,userVote:"up",status:"open",commentsCount:5,tags:["Integration"],createdAt:"2024-01-08T09:15:00Z"},{id:4,title:"Multi-language Support",description:"Add support for multiple languages to make the plugin accessible to users worldwide.",votes:15,userVote:null,status:"open",commentsCount:0,tags:["i18n"],createdAt:"2024-01-05T16:45:00Z"}]}async vote(e,t){return await this._simulateDelay(300),{success:!0,featureId:e,voteType:t}}async getComments(e){return await this._simulateDelay(500),{1:[{id:1,author:"Sarah M.",initials:"SM",text:"This would be amazing! My eyes would thank you.",time:"2 days ago"},{id:2,author:"Dev Team",initials:"DT",text:"We're planning this for the next major release!",time:"1 day ago"}],2:[{id:1,author:"Mike R.",initials:"MR",text:"Need this for compliance reporting!",time:"5 days ago"}],3:[{id:1,author:"John D.",initials:"JD",text:"Would love to integrate with Zapier!",time:"1 week ago"},{id:2,author:"Anna K.",initials:"AK",text:"Slack integration would be great too.",time:"6 days ago"},{id:3,author:"Dev Team",initials:"DT",text:"Great suggestions! Adding to our roadmap.",time:"5 days ago"},{id:4,author:"Peter S.",initials:"PS",text:"Any ETA on this?",time:"3 days ago"},{id:5,author:"Dev Team",initials:"DT",text:"Targeting Q2 2024!",time:"2 days ago"}]}[e]||[]}async addComment(e,t){var o;await this._simulateDelay(400);const i=((o=this.user)==null?void 0:o.name)||"You",s=i.split(" ").map(a=>a[0]).join("").toUpperCase().slice(0,2);return{id:Date.now(),author:i,initials:s,text:t,time:"Just now"}}async createFeature(e){return await this._simulateDelay(600),{id:Date.now(),title:e.title,description:e.description,votes:1,userVote:"up",status:"open",commentsCount:0,tags:[e.category||"General"],createdAt:new Date().toISOString()}}}class f{constructor(e){var t;if(this.config=e,this.container=null,this.features=[],this.isLoading=!0,this.hasError=!1,this.currentCommentFeatureId=null,this.currentComments=[],!e.container)throw new Error("WPFeatureLoop: container is required");if(!e.publicKey)throw new Error("WPFeatureLoop: publicKey is required");if(!e.projectId)throw new Error("WPFeatureLoop: projectId is required");if(!((t=e.user)!=null&&t.id))throw new Error("WPFeatureLoop: user.id is required");this.locale=e.locale||"en",this.t=u[this.locale]||u.en,this.allowedRoles=e.allowedRoles||["administrator"],this.userRole=e.userRole||"subscriber",this.api=new k(e)}canCreateFeature(){return this.allowedRoles.includes(this.userRole)}async init(){if(this.container=document.querySelector(this.config.container),!this.container)throw new Error(`WPFeatureLoop: Container "${this.config.container}" not found`);this.container.classList.add("wfl-container"),this.renderSkeleton();try{this.features=await this.api.getFeatures(),this.isLoading=!1,this.render()}catch(e){console.error("WPFeatureLoop: Failed to load features",e),this.isLoading=!1,this.hasError=!0,this.renderError()}}renderSkeleton(){const e=Array(3).fill(0).map(()=>`
        <div class="wfl-skeleton-card">
          <div class="wfl-skeleton-vote">
            <div class="wfl-skeleton wfl-skeleton-vote-btn"></div>
            <div class="wfl-skeleton wfl-skeleton-vote-count"></div>
            <div class="wfl-skeleton wfl-skeleton-vote-btn"></div>
          </div>
          <div class="wfl-skeleton-content">
            <div class="wfl-skeleton wfl-skeleton-title"></div>
            <div class="wfl-skeleton wfl-skeleton-desc"></div>
            <div class="wfl-skeleton wfl-skeleton-desc-2"></div>
            <div class="wfl-skeleton-footer">
              <div class="wfl-skeleton wfl-skeleton-meta"></div>
              <div class="wfl-skeleton wfl-skeleton-tag"></div>
            </div>
          </div>
        </div>
      `).join("");this.container.innerHTML=`
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature()?`
            <button class="wfl-btn wfl-btn-primary wfl-ripple" disabled>
              ${n.plus}
              ${this.t.suggestFeature}
            </button>
          `:""}
        </div>
        <div class="wfl-list">
          ${e}
        </div>
      `}renderError(){var e;this.container.innerHTML=`
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
        </div>
        <div class="wfl-error">
          <div class="wfl-error-icon">${n.error}</div>
          <h3 class="wfl-error-title">${this.t.errorTitle}</h3>
          <p class="wfl-error-text">${this.t.errorText}</p>
          <button class="wfl-btn wfl-btn-primary" id="wfl-retry">
            ${this.t.retry}
          </button>
        </div>
      `,(e=this.container.querySelector("#wfl-retry"))==null||e.addEventListener("click",()=>{this.hasError=!1,this.isLoading=!0,this.init()})}render(){const e=this.features.length>0?this.features.map(t=>this.renderCard(t)).join(""):this.renderEmpty();this.container.innerHTML=`
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature()?`
            <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-add-feature">
              ${n.plus}
              ${this.t.suggestFeature}
            </button>
          `:""}
        </div>
        <div class="wfl-list" id="wfl-list">
          ${e}
        </div>
        ${this.renderModal()}
        ${this.renderCommentModal()}
        <div class="wfl-toast" id="wfl-toast"></div>
      `,this.attachEventListeners()}renderCard(e){const t=e.votes>0?"wfl-vote-positive":e.votes<0?"wfl-vote-negative":"",i=e.userVote==="up",s=e.userVote==="down",o=e.commentsCount===1?this.t.comment:this.t.comments;return`
        <div class="wfl-card" data-id="${e.id}">
          <div class="wfl-vote">
            <button class="wfl-vote-btn wfl-vote-up wfl-tooltip ${i?"wfl-voted":""}"
                    data-id="${e.id}"
                    data-action="up"
                    data-tooltip="${this.t.upvote}">
              ${n.arrowUp}
            </button>
            <span class="wfl-vote-count ${t}" data-id="${e.id}">${e.votes}</span>
            <button class="wfl-vote-btn wfl-vote-down wfl-tooltip ${s?"wfl-voted":""}"
                    data-id="${e.id}"
                    data-action="down"
                    data-tooltip="${this.t.downvote}">
              ${n.arrowDown}
            </button>
          </div>
          <div class="wfl-content">
            <div class="wfl-content-header">
              <h3 class="wfl-feature-title" data-id="${e.id}">${e.title}</h3>
              ${this.renderStatus(e.status)}
            </div>
            <p class="wfl-description">${e.description}</p>
            <div class="wfl-footer">
              <button class="wfl-meta wfl-comment-trigger" data-id="${e.id}">
                ${n.comment}
                <span>${e.commentsCount} ${o}</span>
              </button>
              ${e.tags.map(a=>`<span class="wfl-tag">${a}</span>`).join("")}
            </div>
          </div>
        </div>
      `}renderStatus(e){const t={open:this.t.statusOpen,planned:this.t.statusPlanned,progress:this.t.statusProgress,completed:this.t.statusCompleted};return`
        <span class="wfl-status wfl-status-${e}">
          <span class="wfl-status-dot"></span>
          ${t[e]||e}
        </span>
      `}renderEmpty(){return`
        <div class="wfl-empty">
          <div class="wfl-empty-icon">${n.empty}</div>
          <h3 class="wfl-empty-title">${this.t.emptyTitle}</h3>
          <p class="wfl-empty-text">${this.t.emptyText}</p>
        </div>
      `}renderModal(){return this.canCreateFeature()?`
        <div class="wfl-modal-overlay" id="wfl-modal">
          <div class="wfl-modal">
            <div class="wfl-modal-header">
              <h2 class="wfl-modal-title">${this.t.suggestTitle}</h2>
              <button class="wfl-modal-close" id="wfl-modal-close">
                ${n.close}
              </button>
            </div>
            <div class="wfl-modal-body">
              <div class="wfl-form-group">
                <label class="wfl-label" for="wfl-feature-title">${this.t.titleLabel}</label>
                <input type="text" class="wfl-input" id="wfl-feature-title" placeholder="${this.t.titlePlaceholder}">
              </div>
              <div class="wfl-form-group">
                <label class="wfl-label" for="wfl-feature-desc">${this.t.descriptionLabel}</label>
                <textarea class="wfl-textarea" id="wfl-feature-desc" placeholder="${this.t.descriptionPlaceholder}"></textarea>
              </div>
              <div class="wfl-form-group">
                <label class="wfl-label" for="wfl-feature-tag">${this.t.categoryLabel}</label>
                <input type="text" class="wfl-input" id="wfl-feature-tag" placeholder="${this.t.categoryPlaceholder}">
              </div>
            </div>
            <div class="wfl-modal-footer">
              <button class="wfl-btn wfl-btn-secondary" id="wfl-modal-cancel">${this.t.cancel}</button>
              <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-modal-submit">${this.t.submit}</button>
            </div>
          </div>
        </div>
      `:""}renderCommentModal(){return`
        <div class="wfl-modal-overlay" id="wfl-comment-modal">
          <div class="wfl-modal">
            <div class="wfl-modal-header">
              <h2 class="wfl-modal-title" id="wfl-comment-title">${this.t.comments}</h2>
              <button class="wfl-modal-close" id="wfl-comment-modal-close">
                ${n.close}
              </button>
            </div>
            <div class="wfl-modal-body">
              <div class="wfl-comments-list" id="wfl-comments-list"></div>
              <div class="wfl-comment-input-wrapper">
                <input type="text" class="wfl-comment-input" id="wfl-comment-input" placeholder="${this.t.addComment}">
                <button class="wfl-comment-submit" id="wfl-comment-submit">
                  ${n.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      `}renderCommentsList(e){return e.length===0?`<p style="text-align: center; color: var(--wfl-gray-500); padding: 20px;">${this.t.noComments}</p>`:e.map(t=>`
        <div class="wfl-comment">
          <div class="wfl-comment-avatar">${t.initials}</div>
          <div class="wfl-comment-content">
            <div class="wfl-comment-header">
              <span class="wfl-comment-author">${t.author}</span>
              <span class="wfl-comment-time">${t.time}</span>
            </div>
            <p class="wfl-comment-text">${t.text}</p>
          </div>
        </div>
      `).join("")}attachEventListeners(){const e=this.container.querySelector("#wfl-add-feature");e&&e.addEventListener("click",()=>this.openModal());const t=this.container.querySelector("#wfl-modal");if(t){const s=this.container.querySelector("#wfl-modal-close"),o=this.container.querySelector("#wfl-modal-cancel"),a=this.container.querySelector("#wfl-modal-submit");s==null||s.addEventListener("click",()=>this.closeModal()),o==null||o.addEventListener("click",()=>this.closeModal()),t.addEventListener("click",r=>{r.target===t&&this.closeModal()}),a==null||a.addEventListener("click",()=>this.handleSubmitFeature())}const i=this.container.querySelector("#wfl-comment-modal");if(i){const s=this.container.querySelector("#wfl-comment-modal-close");s==null||s.addEventListener("click",()=>this.closeCommentModal()),i.addEventListener("click",o=>{o.target===i&&this.closeCommentModal()})}this.features.forEach(s=>this.attachCardListeners(s.id))}attachCardListeners(e){const t=this.container.querySelector(`.wfl-card[data-id="${e}"]`);if(!t)return;t.querySelectorAll(".wfl-vote-btn").forEach(s=>{s.addEventListener("click",o=>{o.stopPropagation(),this.handleVote(s)})});const i=t.querySelector(".wfl-comment-trigger");i&&i.addEventListener("click",()=>{this.openCommentModal(e)})}openModal(){const e=this.container.querySelector("#wfl-modal");e&&e.classList.add("wfl-active")}closeModal(){const e=this.container.querySelector("#wfl-modal");e&&(e.classList.remove("wfl-active"),this.container.querySelector("#wfl-feature-title").value="",this.container.querySelector("#wfl-feature-desc").value="",this.container.querySelector("#wfl-feature-tag").value="")}async handleSubmitFeature(){const e=this.container.querySelector("#wfl-feature-title").value.trim(),t=this.container.querySelector("#wfl-feature-desc").value.trim(),i=this.container.querySelector("#wfl-feature-tag").value.trim()||"General";if(!e||!t){this.showToast(this.t.fillAllFields,"error");return}const s=this.container.querySelector("#wfl-modal-submit");s.disabled=!0;try{const o=await this.api.createFeature({title:e,description:t,category:i});this.features.unshift(o),this.container.querySelector("#wfl-list").insertAdjacentHTML("afterbegin",this.renderCard(o)),this.attachCardListeners(o.id),this.closeModal(),this.showToast(this.t.featureSubmitted,"success")}catch(o){console.error("WPFeatureLoop: Failed to create feature",o),this.showToast(this.t.errorText,"error")}finally{s.disabled=!1}}async openCommentModal(e){const t=this.features.find(r=>r.id===e);if(!t)return;this.currentCommentFeatureId=e;const i=this.container.querySelector("#wfl-comment-modal"),s=this.container.querySelector("#wfl-comments-list"),o=this.container.querySelector("#wfl-comment-title"),a=this.container.querySelector("#wfl-comment-input");a.value="",o.textContent=t.title,s.innerHTML='<div class="wfl-skeleton" style="height: 60px; margin-bottom: 12px;"></div>'.repeat(2),i.classList.add("wfl-active");try{this.currentComments=await this.api.getComments(e),s.innerHTML=this.renderCommentsList(this.currentComments);const r=this,d=async()=>{const h=r.container.querySelector("#wfl-comment-input"),y=r.container.querySelector("#wfl-comment-submit"),b=h.value.trim();if(b){y.disabled=!0;try{const p=await r.api.addComment(e,b);r.currentComments.push(p),s.innerHTML=r.renderCommentsList(r.currentComments),t.commentsCount=r.currentComments.length;const v=r.container.querySelector(`.wfl-card[data-id="${e}"]`),C=v==null?void 0:v.querySelector(".wfl-comment-trigger span");if(C){const L=t.commentsCount===1?r.t.comment:r.t.comments;C.textContent=`${t.commentsCount} ${L}`}h.value="",r.showToast(r.t.commentAdded,"success")}catch(p){console.error("WPFeatureLoop: Failed to add comment",p),r.showToast(r.t.errorText,"error")}finally{y.disabled=!1}}},c=this.container.querySelector("#wfl-comment-submit"),l=this.container.querySelector("#wfl-comment-input"),m=c.cloneNode(!0);c.parentNode.replaceChild(m,c),m.addEventListener("click",d);const g=l.cloneNode(!0);l.parentNode.replaceChild(g,l),g.addEventListener("keypress",h=>{h.key==="Enter"&&d()})}catch(r){console.error("WPFeatureLoop: Failed to load comments",r),s.innerHTML=`<p style="text-align: center; color: var(--wfl-danger);">${this.t.errorText}</p>`}}closeCommentModal(){const e=this.container.querySelector("#wfl-comment-modal");if(e){e.classList.remove("wfl-active");const t=this.container.querySelector("#wfl-comment-input");t&&(t.value=""),this.currentCommentFeatureId=null,this.currentComments=[]}}async handleVote(e){const t=parseInt(e.dataset.id),i=e.dataset.action,s=this.features.find(m=>m.id===t);if(!s)return;const o=this.container.querySelector(`.wfl-card[data-id="${t}"]`),a=o.querySelector(".wfl-vote-count"),r=o.querySelector(".wfl-vote-up"),d=o.querySelector(".wfl-vote-down");r.disabled=!0,d.disabled=!0;let c="none",l=0;i==="up"?s.userVote==="up"?(l=-1,c="none"):s.userVote==="down"?(l=2,c="up"):(l=1,c="up"):s.userVote==="down"?(l=1,c="none"):s.userVote==="up"?(l=-2,c="down"):(l=-1,c="down"),s.votes+=l,s.userVote=c==="none"?null:c,r.classList.toggle("wfl-voted",s.userVote==="up"),d.classList.toggle("wfl-voted",s.userVote==="down"),a.textContent=s.votes,a.classList.remove("wfl-vote-positive","wfl-vote-negative"),s.votes>0?a.classList.add("wfl-vote-positive"):s.votes<0&&a.classList.add("wfl-vote-negative"),a.classList.add("wfl-animating"),setTimeout(()=>a.classList.remove("wfl-animating"),300),i==="up"&&c==="up"&&this.createConfetti(r);try{await this.api.vote(t,c)}catch(m){console.error("WPFeatureLoop: Failed to save vote",m),s.votes-=l,s.userVote=i==="up"?l===-1?"up":l===2?"down":null:l===1?"down":l===-2?"up":null,r.classList.toggle("wfl-voted",s.userVote==="up"),d.classList.toggle("wfl-voted",s.userVote==="down"),a.textContent=s.votes,this.showToast(this.t.errorText,"error")}finally{r.disabled=!1,d.disabled=!1}}createConfetti(e){const t=["#6366f1","#8b5cf6","#ec4899","#10b981","#f59e0b"],i=e.getBoundingClientRect();for(let s=0;s<6;s++){const o=document.createElement("div");o.className="wfl-confetti",o.style.left=`${i.left+i.width/2+(Math.random()-.5)*30}px`,o.style.top=`${i.top+i.height/2}px`,o.style.background=t[Math.floor(Math.random()*t.length)],o.style.position="fixed",document.body.appendChild(o),setTimeout(()=>o.remove(),600)}}showToast(e,t="default"){const i=this.container.querySelector("#wfl-toast");i&&(i.textContent=e,i.className="wfl-toast wfl-active",t==="success"?i.classList.add("wfl-toast-success"):t==="error"&&i.classList.add("wfl-toast-error"),setTimeout(()=>{i.classList.remove("wfl-active")},3e3))}getFeatures(){return[...this.features]}async refresh(){this.isLoading=!0,this.renderSkeleton();try{this.features=await this.api.getFeatures(),this.isLoading=!1,this.hasError=!1,this.render()}catch(e){console.error("WPFeatureLoop: Failed to refresh features",e),this.isLoading=!1,this.hasError=!0,this.renderError()}}destroy(){this.container&&(this.container.innerHTML="",this.container.classList.remove("wfl-container"))}}return f.init=function(w){const e=new f(w);return e.init(),e},f.version="1.0.0",f})});
//# sourceMappingURL=wpfeatureloop.umd.js.map
