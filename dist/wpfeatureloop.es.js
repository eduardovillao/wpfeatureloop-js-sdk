var F = (f, d) => () => (d || f((d = { exports: {} }).exports, d), d.exports);
var M = F((S, x) => {
  /**
   * WPFeatureLoop SDK
   * A feature voting widget for WordPress plugins
   *
   * @version 1.0.0
   * @license MIT
   */
  (function(f, d) {
    typeof S == "object" && typeof x < "u" ? x.exports = d() : typeof define == "function" && define.amd ? define(d) : (f = typeof globalThis < "u" ? globalThis : f || self, f.WPFeatureLoop = d());
  })(void 0, function() {
    const f = ':root{--wfl-primary:#6366f1;--wfl-primary-hover:#4f46e5;--wfl-primary-light:#eef2ff;--wfl-success:#10b981;--wfl-warning:#f59e0b;--wfl-danger:#ef4444;--wfl-gray-50:#f9fafb;--wfl-gray-100:#f3f4f6;--wfl-gray-200:#e5e7eb;--wfl-gray-300:#d1d5db;--wfl-gray-400:#9ca3af;--wfl-gray-500:#6b7280;--wfl-gray-600:#4b5563;--wfl-gray-700:#374151;--wfl-gray-800:#1f2937;--wfl-gray-900:#111827;--wfl-shadow-sm:0 1px 2px 0 rgb(0 0 0 / 0.05);--wfl-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--wfl-shadow-md:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--wfl-shadow-lg:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--wfl-shadow-xl:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--wfl-radius:12px;--wfl-radius-lg:16px;--wfl-transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1)}.wfl-container *{box-sizing:border-box;margin:0;padding:0}.wfl-container{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;max-width:720px;margin:0 auto;color:var(--wfl-gray-800);line-height:1.5}.wfl-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px}.wfl-header-content{display:flex;flex-direction:column;gap:4px}.wfl-title{font-size:24px;font-weight:700;color:var(--wfl-gray-900);display:flex;align-items:center;gap:10px}.wfl-title-icon{width:32px;height:32px;background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);border-radius:8px;display:flex;align-items:center;justify-content:center}.wfl-title-icon svg{width:18px;height:18px;color:white}.wfl-subtitle{font-size:14px;color:var(--wfl-gray-500)}.wfl-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;font-size:14px;font-weight:600;border-radius:10px;border:none;cursor:pointer;transition:var(--wfl-transition);position:relative;overflow:hidden}.wfl-btn::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 0%,rgba(255,255,255,0.1) 100%);opacity:0;transition:var(--wfl-transition)}.wfl-btn:hover::before{opacity:1}.wfl-btn-primary{background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);color:white;box-shadow:0 4px 14px 0 rgba(99,102,241,0.35)}.wfl-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px 0 rgba(99,102,241,0.45)}.wfl-btn-primary:active{transform:translateY(0)}.wfl-btn-secondary{background:white;color:var(--wfl-gray-700);border:1px solid var(--wfl-gray-200)}.wfl-btn-secondary:hover{background:var(--wfl-gray-50);border-color:var(--wfl-gray-300)}.wfl-btn svg{width:16px;height:16px}.wfl-btn:disabled{opacity:0.6;cursor:not-allowed;transform:none !important}.wfl-list{display:flex;flex-direction:column;gap:16px}.wfl-card{background:white;border-radius:var(--wfl-radius-lg);border:1px solid var(--wfl-gray-200);padding:16px;display:flex;gap:16px;transition:var(--wfl-transition);position:relative;overflow:hidden;align-items:center}.wfl-card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--wfl-primary),#8b5cf6,#ec4899);opacity:0;transition:var(--wfl-transition)}.wfl-card:hover{border-color:var(--wfl-gray-300);box-shadow:var(--wfl-shadow-md)}.wfl-card:hover::before{opacity:1}.wfl-vote{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:56px}.wfl-vote-btn{width:40px;height:32px;border-radius:8px;border:1.5px solid var(--wfl-gray-200);background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--wfl-transition);color:var(--wfl-gray-400)}.wfl-vote-btn svg{width:16px;height:16px;transition:var(--wfl-transition)}.wfl-vote-btn:hover{border-color:var(--wfl-primary);color:var(--wfl-primary);background:var(--wfl-primary-light)}.wfl-vote-btn:active{transform:scale(0.92)}.wfl-vote-btn.wfl-voted{background:var(--wfl-primary);border-color:var(--wfl-primary);color:white}.wfl-vote-btn.wfl-voted:hover{background:var(--wfl-primary-hover)}.wfl-vote-btn.wfl-vote-down.wfl-voted{background:var(--wfl-danger);border-color:var(--wfl-danger)}.wfl-vote-btn:disabled{opacity:0.5;cursor:not-allowed}.wfl-vote-count{font-size:18px;font-weight:700;color:var(--wfl-gray-900);min-height:28px;display:flex;align-items:center;transition:var(--wfl-transition)}.wfl-vote-count.wfl-vote-positive{color:var(--wfl-primary)}.wfl-vote-count.wfl-vote-negative{color:var(--wfl-danger)}@keyframes wfl-vote-pop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}.wfl-vote-count.wfl-animating{animation:wfl-vote-pop 0.3s ease-out}@keyframes wfl-confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-20px) rotate(180deg);opacity:0}}.wfl-confetti{position:absolute;width:6px;height:6px;border-radius:50%;animation:wfl-confetti 0.6s ease-out forwards;pointer-events:none}.wfl-content{flex:1;min-width:0}.wfl-content-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}.wfl-feature-title{font-size:16px;font-weight:600;color:var(--wfl-gray-900);cursor:pointer;transition:var(--wfl-transition)}.wfl-feature-title:hover{color:var(--wfl-primary)}.wfl-status{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;border-radius:20px;white-space:nowrap;flex-shrink:0}.wfl-status-dot{width:6px;height:6px;border-radius:50%}.wfl-status-open{background:var(--wfl-primary-light);color:var(--wfl-primary)}.wfl-status-open .wfl-status-dot{background:var(--wfl-primary)}.wfl-status-planned{background:#fef3c7;color:#d97706}.wfl-status-planned .wfl-status-dot{background:var(--wfl-warning)}.wfl-status-progress{background:#d1fae5;color:#059669}.wfl-status-progress .wfl-status-dot{background:var(--wfl-success);animation:wfl-pulse 2s infinite}@keyframes wfl-pulse{0%,100%{opacity:1}50%{opacity:0.5}}.wfl-status-completed{background:#d1fae5;color:#059669}.wfl-status-completed .wfl-status-dot{background:var(--wfl-success)}.wfl-description{font-size:14px;color:var(--wfl-gray-600);line-height:1.6;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.wfl-footer{display:flex;align-items:center;gap:16px}.wfl-meta{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--wfl-gray-500);cursor:pointer;padding:4px 8px;border-radius:6px;transition:var(--wfl-transition);border:1px solid var(--wfl-gray-100)}.wfl-meta:hover{background:var(--wfl-gray-100);color:var(--wfl-gray-700)}.wfl-meta svg{width:14px;height:14px}.wfl-tag{display:inline-flex;align-items:center;padding:3px 8px;font-size:11px;font-weight:500;background:var(--wfl-gray-100);color:var(--wfl-gray-600);border-radius:5px}.wfl-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;opacity:0;visibility:hidden;transition:var(--wfl-transition);padding:20px}.wfl-modal-overlay.wfl-active{opacity:1;visibility:visible}.wfl-modal{background:white;border-radius:var(--wfl-radius-lg);width:100%;max-width:520px;max-height:90vh;overflow:hidden;transform:scale(0.9) translateY(20px);transition:var(--wfl-transition);box-shadow:var(--wfl-shadow-xl)}.wfl-modal-overlay.wfl-active .wfl-modal{transform:scale(1) translateY(0)}.wfl-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--wfl-gray-200)}.wfl-modal-title{font-size:18px;font-weight:600;color:var(--wfl-gray-900)}.wfl-modal-close{width:32px;height:32px;border-radius:8px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--wfl-gray-500);transition:var(--wfl-transition)}.wfl-modal-close:hover{background:var(--wfl-gray-100);color:var(--wfl-gray-700)}.wfl-modal-close svg{width:20px;height:20px}.wfl-modal-body{padding:24px;overflow-y:auto;max-height:calc(90vh - 140px)}.wfl-form-group{margin-bottom:20px}.wfl-label{display:block;font-size:14px;font-weight:500;color:var(--wfl-gray-700);margin-bottom:8px}.wfl-input,.wfl-textarea,input.wfl-input{width:100%;padding:12px 14px;font-size:14px;border:1.5px solid var(--wfl-gray-200);border-radius:10px;background:white;color:var(--wfl-gray-800);transition:var(--wfl-transition);font-family:inherit}.wfl-input:focus,.wfl-textarea:focus{outline:none;border-color:var(--wfl-primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}.wfl-input::placeholder,.wfl-textarea::placeholder{color:var(--wfl-gray-400)}.wfl-textarea{resize:vertical;min-height:100px}.wfl-modal-footer{display:flex;justify-content:flex-end;gap:12px;padding:16px 24px;border-top:1px solid var(--wfl-gray-200);background:var(--wfl-gray-50)}.wfl-comments-section{margin-top:16px;padding-top:16px;border-top:1px solid var(--wfl-gray-200)}.wfl-comments-list{display:flex;flex-direction:column;gap:12px;margin-bottom:16px}.wfl-comment{display:flex;gap:12px}.wfl-comment-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:600;flex-shrink:0}.wfl-comment-content{flex:1;background:var(--wfl-gray-50);padding:10px 14px;border-radius:10px}.wfl-comment-header{display:flex;align-items:center;gap:8px;margin-bottom:4px}.wfl-comment-author{font-size:13px;font-weight:600;color:var(--wfl-gray-800)}.wfl-comment-time{font-size:12px;color:var(--wfl-gray-400)}.wfl-comment-text{font-size:14px;color:var(--wfl-gray-600);line-height:1.5}.wfl-comment-input-wrapper{display:flex;gap:12px}.wfl-comment-input{flex:1;padding:10px 14px;font-size:14px;border:1.5px solid var(--wfl-gray-200);border-radius:10px;background:white;color:var(--wfl-gray-800);transition:var(--wfl-transition);font-family:inherit}.wfl-comment-input:focus{outline:none;border-color:var(--wfl-primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}.wfl-comment-submit{width:40px;height:40px;border-radius:10px;border:none;background:var(--wfl-primary);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--wfl-transition)}.wfl-comment-submit:hover{background:var(--wfl-primary-hover);transform:scale(1.05)}.wfl-comment-submit:active{transform:scale(0.95)}.wfl-comment-submit svg{width:18px;height:18px}.wfl-empty{text-align:center;padding:48px 24px}.wfl-empty-icon{width:64px;height:64px;background:var(--wfl-gray-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}.wfl-empty-icon svg{width:28px;height:28px;color:var(--wfl-gray-400)}.wfl-empty-title{font-size:16px;font-weight:600;color:var(--wfl-gray-800);margin-bottom:4px}.wfl-empty-text{font-size:14px;color:var(--wfl-gray-500)}.wfl-toast{position:fixed;bottom:24px;right:24px;padding:14px 20px;background:var(--wfl-gray-900);color:white;font-size:14px;font-weight:500;border-radius:10px;box-shadow:var(--wfl-shadow-lg);z-index:999999;transform:translateY(100px);opacity:0;transition:var(--wfl-transition)}.wfl-toast.wfl-active{transform:translateY(0);opacity:1}.wfl-toast-success{background:var(--wfl-success)}.wfl-toast-error{background:var(--wfl-danger)}.wfl-skeleton{background:linear-gradient(90deg,var(--wfl-gray-200) 25%,var(--wfl-gray-100) 50%,var(--wfl-gray-200) 75%);background-size:200% 100%;animation:wfl-shimmer 1.5s infinite;border-radius:6px}@keyframes wfl-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}.wfl-skeleton-card{background:white;border-radius:var(--wfl-radius-lg);border:1px solid var(--wfl-gray-200);padding:16px;display:flex;gap:16px;align-items:center}.wfl-skeleton-vote{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:56px}.wfl-skeleton-vote-btn{width:40px;height:32px}.wfl-skeleton-vote-count{width:24px;height:20px}.wfl-skeleton-content{flex:1}.wfl-skeleton-title{height:20px;width:60%;margin-bottom:12px}.wfl-skeleton-desc{height:14px;width:90%;margin-bottom:8px}.wfl-skeleton-desc-2{height:14px;width:70%;margin-bottom:16px}.wfl-skeleton-footer{display:flex;gap:12px}.wfl-skeleton-meta{height:24px;width:80px}.wfl-skeleton-tag{height:20px;width:50px}@media (max-width:600px){.wfl-container{padding:16px}.wfl-header{flex-direction:column;align-items:stretch}.wfl-card{flex-direction:column;align-items:stretch}.wfl-vote{flex-direction:row;justify-content:flex-start}.wfl-modal{max-width:100%;margin:16px}.wfl-skeleton-card{flex-direction:column;align-items:stretch}.wfl-skeleton-vote{flex-direction:row;justify-content:flex-start}}.wfl-ripple{position:relative;overflow:hidden}.wfl-ripple::after{content:"";position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,255,255,0.3) 10%,transparent 10.01%);background-repeat:no-repeat;background-position:50%;transform:scale(10,10);opacity:0;transition:transform 0.5s,opacity 1s}.wfl-ripple:active::after{transform:scale(0,0);opacity:0.3;transition:0s}.wfl-tooltip{position:relative}.wfl-tooltip::after{content:attr(data-tooltip);position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(-4px);padding:6px 10px;background:var(--wfl-gray-900);color:white;font-size:12px;font-weight:500;border-radius:6px;white-space:nowrap;opacity:0;visibility:hidden;transition:var(--wfl-transition);pointer-events:none}.wfl-tooltip:hover::after{opacity:1;visibility:visible;transform:translateX(-50%) translateY(-8px)}.wfl-btn:focus-visible,.wfl-vote-btn:focus-visible,.wfl-input:focus-visible,.wfl-textarea:focus-visible{outline:2px solid var(--wfl-primary);outline-offset:2px}.wfl-error{text-align:center;padding:48px 24px;color:var(--wfl-danger)}.wfl-error-icon{width:64px;height:64px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}.wfl-error-icon svg{width:28px;height:28px;color:var(--wfl-danger)}.wfl-error-title{font-size:16px;font-weight:600;margin-bottom:4px}.wfl-error-text{font-size:14px;color:var(--wfl-gray-500);margin-bottom:16px}';
    function d() {
      if (typeof document > "u" || document.getElementById("wpfeatureloop-styles")) return;
      const p = document.createElement("style");
      p.id = "wpfeatureloop-styles", p.textContent = f, document.head.appendChild(p);
    }
    d();
    const c = {
      plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
      arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
      arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
      comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="m22 2-11 11"/></svg>',
      empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
      error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>'
    }, y = {
      en: {
        title: "Feature Roadmap",
        subtitle: "Vote for features you want to see next",
        suggestFeature: "Suggest Feature",
        suggestTitle: "Suggest a Feature",
        titleLabel: "Title",
        titlePlaceholder: "Brief description of your feature idea",
        descriptionLabel: "Description",
        descriptionPlaceholder: "Explain the feature and why it would be valuable...",
        categoryLabel: "Category",
        categoryPlaceholder: "e.g., UI/UX, Performance, Integration",
        cancel: "Cancel",
        submit: "Submit Feature",
        comments: "comments",
        comment: "comment",
        addComment: "Add a comment...",
        noComments: "No comments yet. Be the first to share your thoughts!",
        emptyTitle: "No features yet",
        emptyText: "Be the first to suggest a feature!",
        errorTitle: "Failed to load features",
        errorText: "Please try again later.",
        retry: "Retry",
        fillAllFields: "Please fill in all fields",
        featureSubmitted: "Feature submitted successfully!",
        commentAdded: "Comment added!",
        voteSaved: "Vote saved!",
        statusOpen: "Open",
        statusPlanned: "Planned",
        statusProgress: "In Progress",
        statusCompleted: "Completed",
        upvote: "Upvote",
        downvote: "Downvote"
      },
      "pt-BR": {
        title: "Roadmap de Features",
        subtitle: "Vote nas funcionalidades que deseja ver",
        suggestFeature: "Sugerir Feature",
        suggestTitle: "Sugerir uma Feature",
        titleLabel: "Título",
        titlePlaceholder: "Breve descrição da sua ideia",
        descriptionLabel: "Descrição",
        descriptionPlaceholder: "Explique a feature e por que seria valiosa...",
        categoryLabel: "Categoria",
        categoryPlaceholder: "Ex: UI/UX, Performance, Integração",
        cancel: "Cancelar",
        submit: "Enviar Feature",
        comments: "comentários",
        comment: "comentário",
        addComment: "Adicionar um comentário...",
        noComments: "Nenhum comentário ainda. Seja o primeiro!",
        emptyTitle: "Nenhuma feature ainda",
        emptyText: "Seja o primeiro a sugerir uma feature!",
        errorTitle: "Erro ao carregar features",
        errorText: "Por favor, tente novamente mais tarde.",
        retry: "Tentar novamente",
        fillAllFields: "Por favor, preencha todos os campos",
        featureSubmitted: "Feature enviada com sucesso!",
        commentAdded: "Comentário adicionado!",
        voteSaved: "Voto salvo!",
        statusOpen: "Aberto",
        statusPlanned: "Planejado",
        statusProgress: "Em Progresso",
        statusCompleted: "Concluído",
        upvote: "Votar a favor",
        downvote: "Votar contra"
      }
    };
    class $ {
      constructor(t) {
        this.publicKey = t.publicKey, this.projectId = t.projectId, this.user = t.user, this.signature = t.signature, this.baseUrl = t.apiUrl || "https://api.wpfeatureloop.io/v1";
      }
      /**
       * Simulate API delay
       */
      async _simulateDelay(t = 800) {
        return new Promise((e) => setTimeout(e, t));
      }
      /**
       * Get headers for API requests
       */
      _getHeaders() {
        var t, e;
        return {
          "Content-Type": "application/json",
          "X-Public-Key": this.publicKey,
          "X-Project-Id": this.projectId,
          "X-User-Id": ((e = (t = this.user) == null ? void 0 : t.id) == null ? void 0 : e.toString()) || "",
          "X-Signature": this.signature || ""
        };
      }
      /**
       * Fetch features list
       * @returns {Promise<Array>}
       */
      async getFeatures() {
        return await this._simulateDelay(), [
          {
            id: 1,
            title: "Dark Mode Support",
            description: "Add a dark mode theme option that follows system preferences or can be toggled manually. Essential for users who work at night or prefer darker interfaces.",
            votes: 47,
            userVote: null,
            status: "planned",
            commentsCount: 2,
            tags: ["UI/UX"],
            createdAt: "2024-01-15T10:00:00Z"
          },
          {
            id: 2,
            title: "Export Data to CSV",
            description: "Allow users to export all their data in CSV format for backup or migration purposes. Include options to select specific date ranges and data types.",
            votes: 32,
            userVote: null,
            status: "progress",
            commentsCount: 1,
            tags: ["Data"],
            createdAt: "2024-01-10T14:30:00Z"
          },
          {
            id: 3,
            title: "API Webhooks",
            description: "Implement webhooks to notify external services when certain events occur, like new submissions or status changes.",
            votes: 28,
            userVote: "up",
            status: "open",
            commentsCount: 5,
            tags: ["Integration"],
            createdAt: "2024-01-08T09:15:00Z"
          },
          {
            id: 4,
            title: "Multi-language Support",
            description: "Add support for multiple languages to make the plugin accessible to users worldwide.",
            votes: 15,
            userVote: null,
            status: "open",
            commentsCount: 0,
            tags: ["i18n"],
            createdAt: "2024-01-05T16:45:00Z"
          }
        ];
      }
      /**
       * Vote on a feature
       * @param {number} featureId
       * @param {string} voteType - 'up', 'down', or 'none'
       * @returns {Promise<Object>}
       */
      async vote(t, e) {
        return await this._simulateDelay(300), { success: !0, featureId: t, voteType: e };
      }
      /**
       * Get comments for a feature
       * @param {number} featureId
       * @returns {Promise<Array>}
       */
      async getComments(t) {
        return await this._simulateDelay(500), {
          1: [
            {
              id: 1,
              author: "Sarah M.",
              initials: "SM",
              text: "This would be amazing! My eyes would thank you.",
              time: "2 days ago"
            },
            {
              id: 2,
              author: "Dev Team",
              initials: "DT",
              text: "We're planning this for the next major release!",
              time: "1 day ago"
            }
          ],
          2: [
            {
              id: 1,
              author: "Mike R.",
              initials: "MR",
              text: "Need this for compliance reporting!",
              time: "5 days ago"
            }
          ],
          3: [
            {
              id: 1,
              author: "John D.",
              initials: "JD",
              text: "Would love to integrate with Zapier!",
              time: "1 week ago"
            },
            {
              id: 2,
              author: "Anna K.",
              initials: "AK",
              text: "Slack integration would be great too.",
              time: "6 days ago"
            },
            {
              id: 3,
              author: "Dev Team",
              initials: "DT",
              text: "Great suggestions! Adding to our roadmap.",
              time: "5 days ago"
            },
            {
              id: 4,
              author: "Peter S.",
              initials: "PS",
              text: "Any ETA on this?",
              time: "3 days ago"
            },
            {
              id: 5,
              author: "Dev Team",
              initials: "DT",
              text: "Targeting Q2 2024!",
              time: "2 days ago"
            }
          ]
        }[t] || [];
      }
      /**
       * Add a comment to a feature
       * @param {number} featureId
       * @param {string} text
       * @returns {Promise<Object>}
       */
      async addComment(t, e) {
        var r;
        await this._simulateDelay(400);
        const a = ((r = this.user) == null ? void 0 : r.name) || "You", o = a.split(" ").map((l) => l[0]).join("").toUpperCase().slice(0, 2);
        return {
          id: Date.now(),
          author: a,
          initials: o,
          text: e,
          time: "Just now"
        };
      }
      /**
       * Create a new feature suggestion
       * @param {Object} feature
       * @returns {Promise<Object>}
       */
      async createFeature(t) {
        return await this._simulateDelay(600), {
          id: Date.now(),
          title: t.title,
          description: t.description,
          votes: 1,
          userVote: "up",
          status: "open",
          commentsCount: 0,
          tags: [t.category || "General"],
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
      }
    }
    class m {
      /**
       * @param {Object} config
       * @param {string} config.container - CSS selector for the container element
       * @param {string} config.publicKey - Public API key
       * @param {string} config.projectId - Project ID
       * @param {string} [config.locale='en'] - Locale for translations
       * @param {Object} [config.user] - User data
       * @param {number|string} config.user.id - User ID (required)
       * @param {string} [config.user.email] - User email
       * @param {string} [config.user.name] - User display name
       * @param {string} [config.user.plan] - User plan (free, pro, etc)
       * @param {Object} [config.user.meta] - Additional user metadata
       * @param {string} [config.signature] - HMAC signature for user data
       * @param {Array<string>} [config.allowedRoles] - Roles allowed to create features
       * @param {string} [config.userRole] - Current user's role
       * @param {string} [config.apiUrl] - Custom API URL
       */
      constructor(t) {
        var e;
        if (this.config = t, this.container = null, this.features = [], this.isLoading = !0, this.hasError = !1, this.currentCommentFeatureId = null, this.currentComments = [], !t.container)
          throw new Error("WPFeatureLoop: container is required");
        if (!t.publicKey)
          throw new Error("WPFeatureLoop: publicKey is required");
        if (!t.projectId)
          throw new Error("WPFeatureLoop: projectId is required");
        if (!((e = t.user) != null && e.id))
          throw new Error("WPFeatureLoop: user.id is required");
        this.locale = t.locale || "en", this.t = y[this.locale] || y.en, this.allowedRoles = t.allowedRoles || ["administrator"], this.userRole = t.userRole || "subscriber", this.api = new $(t);
      }
      /**
       * Check if current user can create features
       */
      canCreateFeature() {
        return this.allowedRoles.includes(this.userRole);
      }
      /**
       * Initialize the widget
       */
      async init() {
        if (this.container = document.querySelector(this.config.container), !this.container)
          throw new Error(
            `WPFeatureLoop: Container "${this.config.container}" not found`
          );
        this.container.classList.add("wfl-container"), this.renderSkeleton();
        try {
          this.features = await this.api.getFeatures(), this.isLoading = !1, this.render();
        } catch (t) {
          console.error("WPFeatureLoop: Failed to load features", t), this.isLoading = !1, this.hasError = !0, this.renderError();
        }
      }
      /**
       * Render skeleton loading state
       */
      renderSkeleton() {
        const t = Array(3).fill(0).map(
          () => `
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
      `
        ).join("");
        this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature() ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" disabled>
              ${c.plus}
              ${this.t.suggestFeature}
            </button>
          ` : ""}
        </div>
        <div class="wfl-list">
          ${t}
        </div>
      `;
      }
      /**
       * Render error state
       */
      renderError() {
        var t;
        this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
        </div>
        <div class="wfl-error">
          <div class="wfl-error-icon">${c.error}</div>
          <h3 class="wfl-error-title">${this.t.errorTitle}</h3>
          <p class="wfl-error-text">${this.t.errorText}</p>
          <button class="wfl-btn wfl-btn-primary" id="wfl-retry">
            ${this.t.retry}
          </button>
        </div>
      `, (t = this.container.querySelector("#wfl-retry")) == null || t.addEventListener("click", () => {
          this.hasError = !1, this.isLoading = !0, this.init();
        });
      }
      /**
       * Main render method
       */
      render() {
        const t = this.features.length > 0 ? this.features.map((e) => this.renderCard(e)).join("") : this.renderEmpty();
        this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature() ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-add-feature">
              ${c.plus}
              ${this.t.suggestFeature}
            </button>
          ` : ""}
        </div>
        <div class="wfl-list" id="wfl-list">
          ${t}
        </div>
        ${this.renderModal()}
        ${this.renderCommentModal()}
        <div class="wfl-toast" id="wfl-toast"></div>
      `, this.attachEventListeners();
      }
      /**
       * Render a feature card
       */
      renderCard(t) {
        const e = t.votes > 0 ? "wfl-vote-positive" : t.votes < 0 ? "wfl-vote-negative" : "", a = t.userVote === "up", o = t.userVote === "down", r = t.commentsCount === 1 ? this.t.comment : this.t.comments;
        return `
        <div class="wfl-card" data-id="${t.id}">
          <div class="wfl-vote">
            <button class="wfl-vote-btn wfl-vote-up wfl-tooltip ${a ? "wfl-voted" : ""}"
                    data-id="${t.id}"
                    data-action="up"
                    data-tooltip="${this.t.upvote}">
              ${c.arrowUp}
            </button>
            <span class="wfl-vote-count ${e}" data-id="${t.id}">${t.votes}</span>
            <button class="wfl-vote-btn wfl-vote-down wfl-tooltip ${o ? "wfl-voted" : ""}"
                    data-id="${t.id}"
                    data-action="down"
                    data-tooltip="${this.t.downvote}">
              ${c.arrowDown}
            </button>
          </div>
          <div class="wfl-content">
            <div class="wfl-content-header">
              <h3 class="wfl-feature-title" data-id="${t.id}">${t.title}</h3>
              ${this.renderStatus(t.status)}
            </div>
            <p class="wfl-description">${t.description}</p>
            <div class="wfl-footer">
              <button class="wfl-meta wfl-comment-trigger" data-id="${t.id}">
                ${c.comment}
                <span>${t.commentsCount} ${r}</span>
              </button>
              ${t.tags.map((l) => `<span class="wfl-tag">${l}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
      }
      /**
       * Render status badge
       */
      renderStatus(t) {
        const e = {
          open: this.t.statusOpen,
          planned: this.t.statusPlanned,
          progress: this.t.statusProgress,
          completed: this.t.statusCompleted
        };
        return `
        <span class="wfl-status wfl-status-${t}">
          <span class="wfl-status-dot"></span>
          ${e[t] || t}
        </span>
      `;
      }
      /**
       * Render empty state
       */
      renderEmpty() {
        return `
        <div class="wfl-empty">
          <div class="wfl-empty-icon">${c.empty}</div>
          <h3 class="wfl-empty-title">${this.t.emptyTitle}</h3>
          <p class="wfl-empty-text">${this.t.emptyText}</p>
        </div>
      `;
      }
      /**
       * Render feature creation modal
       */
      renderModal() {
        return this.canCreateFeature() ? `
        <div class="wfl-modal-overlay" id="wfl-modal">
          <div class="wfl-modal">
            <div class="wfl-modal-header">
              <h2 class="wfl-modal-title">${this.t.suggestTitle}</h2>
              <button class="wfl-modal-close" id="wfl-modal-close">
                ${c.close}
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
      ` : "";
      }
      /**
       * Render comments modal
       */
      renderCommentModal() {
        return `
        <div class="wfl-modal-overlay" id="wfl-comment-modal">
          <div class="wfl-modal">
            <div class="wfl-modal-header">
              <h2 class="wfl-modal-title" id="wfl-comment-title">${this.t.comments}</h2>
              <button class="wfl-modal-close" id="wfl-comment-modal-close">
                ${c.close}
              </button>
            </div>
            <div class="wfl-modal-body">
              <div class="wfl-comments-list" id="wfl-comments-list"></div>
              <div class="wfl-comment-input-wrapper">
                <input type="text" class="wfl-comment-input" id="wfl-comment-input" placeholder="${this.t.addComment}">
                <button class="wfl-comment-submit" id="wfl-comment-submit">
                  ${c.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      }
      /**
       * Render comments list
       */
      renderCommentsList(t) {
        return t.length === 0 ? `<p style="text-align: center; color: var(--wfl-gray-500); padding: 20px;">${this.t.noComments}</p>` : t.map(
          (e) => `
        <div class="wfl-comment">
          <div class="wfl-comment-avatar">${e.initials}</div>
          <div class="wfl-comment-content">
            <div class="wfl-comment-header">
              <span class="wfl-comment-author">${e.author}</span>
              <span class="wfl-comment-time">${e.time}</span>
            </div>
            <p class="wfl-comment-text">${e.text}</p>
          </div>
        </div>
      `
        ).join("");
      }
      /**
       * Attach event listeners
       */
      attachEventListeners() {
        const t = this.container.querySelector("#wfl-add-feature");
        t && t.addEventListener("click", () => this.openModal());
        const e = this.container.querySelector("#wfl-modal");
        if (e) {
          const o = this.container.querySelector("#wfl-modal-close"), r = this.container.querySelector("#wfl-modal-cancel"), l = this.container.querySelector("#wfl-modal-submit");
          o == null || o.addEventListener("click", () => this.closeModal()), r == null || r.addEventListener("click", () => this.closeModal()), e.addEventListener("click", (i) => {
            i.target === e && this.closeModal();
          }), l == null || l.addEventListener(
            "click",
            () => this.handleSubmitFeature()
          );
        }
        const a = this.container.querySelector("#wfl-comment-modal");
        if (a) {
          const o = this.container.querySelector(
            "#wfl-comment-modal-close"
          );
          o == null || o.addEventListener("click", () => this.closeCommentModal()), a.addEventListener("click", (r) => {
            r.target === a && this.closeCommentModal();
          });
        }
        this.features.forEach((o) => this.attachCardListeners(o.id));
      }
      /**
       * Attach listeners to a specific card
       */
      attachCardListeners(t) {
        const e = this.container.querySelector(
          `.wfl-card[data-id="${t}"]`
        );
        if (!e) return;
        e.querySelectorAll(".wfl-vote-btn").forEach((o) => {
          o.addEventListener("click", (r) => {
            r.stopPropagation(), this.handleVote(o);
          });
        });
        const a = e.querySelector(".wfl-comment-trigger");
        a && a.addEventListener("click", () => {
          this.openCommentModal(t);
        });
      }
      /**
       * Open feature creation modal
       */
      openModal() {
        const t = this.container.querySelector("#wfl-modal");
        t && t.classList.add("wfl-active");
      }
      /**
       * Close feature creation modal
       */
      closeModal() {
        const t = this.container.querySelector("#wfl-modal");
        t && (t.classList.remove("wfl-active"), this.container.querySelector("#wfl-feature-title").value = "", this.container.querySelector("#wfl-feature-desc").value = "", this.container.querySelector("#wfl-feature-tag").value = "");
      }
      /**
       * Handle feature submission
       */
      async handleSubmitFeature() {
        const t = this.container.querySelector("#wfl-feature-title").value.trim(), e = this.container.querySelector("#wfl-feature-desc").value.trim(), a = this.container.querySelector("#wfl-feature-tag").value.trim() || "General";
        if (!t || !e) {
          this.showToast(this.t.fillAllFields, "error");
          return;
        }
        const o = this.container.querySelector("#wfl-modal-submit");
        o.disabled = !0;
        try {
          const r = await this.api.createFeature({
            title: t,
            description: e,
            category: a
          });
          this.features.unshift(r), this.container.querySelector("#wfl-list").insertAdjacentHTML("afterbegin", this.renderCard(r)), this.attachCardListeners(r.id), this.closeModal(), this.showToast(this.t.featureSubmitted, "success");
        } catch (r) {
          console.error("WPFeatureLoop: Failed to create feature", r), this.showToast(this.t.errorText, "error");
        } finally {
          o.disabled = !1;
        }
      }
      /**
       * Open comments modal
       */
      async openCommentModal(t) {
        const e = this.features.find((i) => i.id === t);
        if (!e) return;
        this.currentCommentFeatureId = t;
        const a = this.container.querySelector("#wfl-comment-modal"), o = this.container.querySelector("#wfl-comments-list"), r = this.container.querySelector("#wfl-comment-title"), l = this.container.querySelector("#wfl-comment-input");
        l.value = "", r.textContent = e.title, o.innerHTML = '<div class="wfl-skeleton" style="height: 60px; margin-bottom: 12px;"></div>'.repeat(
          2
        ), a.classList.add("wfl-active");
        try {
          this.currentComments = await this.api.getComments(t), o.innerHTML = this.renderCommentsList(this.currentComments);
          const i = this, w = async () => {
            const h = i.container.querySelector("#wfl-comment-input"), k = i.container.querySelector("#wfl-comment-submit"), C = h.value.trim();
            if (C) {
              k.disabled = !0;
              try {
                const g = await i.api.addComment(t, C);
                i.currentComments.push(g), o.innerHTML = i.renderCommentsList(
                  i.currentComments
                ), e.commentsCount = i.currentComments.length;
                const v = i.container.querySelector(
                  `.wfl-card[data-id="${t}"]`
                ), L = v == null ? void 0 : v.querySelector(
                  ".wfl-comment-trigger span"
                );
                if (L) {
                  const T = e.commentsCount === 1 ? i.t.comment : i.t.comments;
                  L.textContent = `${e.commentsCount} ${T}`;
                }
                h.value = "", i.showToast(i.t.commentAdded, "success");
              } catch (g) {
                console.error("WPFeatureLoop: Failed to add comment", g), i.showToast(i.t.errorText, "error");
              } finally {
                k.disabled = !1;
              }
            }
          }, n = this.container.querySelector("#wfl-comment-submit"), s = this.container.querySelector("#wfl-comment-input"), u = n.cloneNode(!0);
          n.parentNode.replaceChild(u, n), u.addEventListener("click", w);
          const b = s.cloneNode(!0);
          s.parentNode.replaceChild(b, s), b.addEventListener("keypress", (h) => {
            h.key === "Enter" && w();
          });
        } catch (i) {
          console.error("WPFeatureLoop: Failed to load comments", i), o.innerHTML = `<p style="text-align: center; color: var(--wfl-danger);">${this.t.errorText}</p>`;
        }
      }
      /**
       * Close comments modal
       */
      closeCommentModal() {
        const t = this.container.querySelector("#wfl-comment-modal");
        if (t) {
          t.classList.remove("wfl-active");
          const e = this.container.querySelector("#wfl-comment-input");
          e && (e.value = ""), this.currentCommentFeatureId = null, this.currentComments = [];
        }
      }
      /**
       * Handle vote
       */
      async handleVote(t) {
        const e = parseInt(t.dataset.id), a = t.dataset.action, o = this.features.find((u) => u.id === e);
        if (!o) return;
        const r = this.container.querySelector(`.wfl-card[data-id="${e}"]`), l = r.querySelector(".wfl-vote-count"), i = r.querySelector(".wfl-vote-up"), w = r.querySelector(".wfl-vote-down");
        i.disabled = !0, w.disabled = !0;
        let n = "none", s = 0;
        a === "up" ? o.userVote === "up" ? (s = -1, n = "none") : o.userVote === "down" ? (s = 2, n = "up") : (s = 1, n = "up") : o.userVote === "down" ? (s = 1, n = "none") : o.userVote === "up" ? (s = -2, n = "down") : (s = -1, n = "down"), o.votes += s, o.userVote = n === "none" ? null : n, i.classList.toggle("wfl-voted", o.userVote === "up"), w.classList.toggle("wfl-voted", o.userVote === "down"), l.textContent = o.votes, l.classList.remove("wfl-vote-positive", "wfl-vote-negative"), o.votes > 0 ? l.classList.add("wfl-vote-positive") : o.votes < 0 && l.classList.add("wfl-vote-negative"), l.classList.add("wfl-animating"), setTimeout(() => l.classList.remove("wfl-animating"), 300), a === "up" && n === "up" && this.createConfetti(i);
        try {
          await this.api.vote(e, n);
        } catch (u) {
          console.error("WPFeatureLoop: Failed to save vote", u), o.votes -= s, o.userVote = a === "up" ? s === -1 ? "up" : s === 2 ? "down" : null : s === 1 ? "down" : s === -2 ? "up" : null, i.classList.toggle("wfl-voted", o.userVote === "up"), w.classList.toggle("wfl-voted", o.userVote === "down"), l.textContent = o.votes, this.showToast(this.t.errorText, "error");
        } finally {
          i.disabled = !1, w.disabled = !1;
        }
      }
      /**
       * Create confetti animation
       */
      createConfetti(t) {
        const e = ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"], a = t.getBoundingClientRect();
        for (let o = 0; o < 6; o++) {
          const r = document.createElement("div");
          r.className = "wfl-confetti", r.style.left = `${a.left + a.width / 2 + (Math.random() - 0.5) * 30}px`, r.style.top = `${a.top + a.height / 2}px`, r.style.background = e[Math.floor(Math.random() * e.length)], r.style.position = "fixed", document.body.appendChild(r), setTimeout(() => r.remove(), 600);
        }
      }
      /**
       * Show toast notification
       */
      showToast(t, e = "default") {
        const a = this.container.querySelector("#wfl-toast");
        a && (a.textContent = t, a.className = "wfl-toast wfl-active", e === "success" ? a.classList.add("wfl-toast-success") : e === "error" && a.classList.add("wfl-toast-error"), setTimeout(() => {
          a.classList.remove("wfl-active");
        }, 3e3));
      }
      /**
       * Get all features
       */
      getFeatures() {
        return [...this.features];
      }
      /**
       * Refresh features from API
       */
      async refresh() {
        this.isLoading = !0, this.renderSkeleton();
        try {
          this.features = await this.api.getFeatures(), this.isLoading = !1, this.hasError = !1, this.render();
        } catch (t) {
          console.error("WPFeatureLoop: Failed to refresh features", t), this.isLoading = !1, this.hasError = !0, this.renderError();
        }
      }
      /**
       * Destroy the widget
       */
      destroy() {
        this.container && (this.container.innerHTML = "", this.container.classList.remove("wfl-container"));
      }
    }
    return m.init = function(p) {
      const t = new m(p);
      return t.init(), t;
    }, m.version = "1.0.0", m;
  });
});
export default M();
//# sourceMappingURL=wpfeatureloop.es.js.map
