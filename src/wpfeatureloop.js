/**
 * WPFeatureLoop SDK
 * A feature voting widget for WordPress plugins
 *
 * @version 1.1.0
 * @license MIT
 */

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
      ? define(factory)
      : ((global =
          typeof globalThis !== "undefined" ? globalThis : global || self),
        (global.WPFeatureLoop = factory()));
})(this, function () {
  "use strict";

  /**
   * Embedded Styles
   */
  const styles = `:root{--wfl-primary:#6366f1;--wfl-primary-hover:#4f46e5;--wfl-primary-light:#eef2ff;--wfl-success:#10b981;--wfl-warning:#f59e0b;--wfl-danger:#ef4444;--wfl-gray-50:#f9fafb;--wfl-gray-100:#f3f4f6;--wfl-gray-200:#e5e7eb;--wfl-gray-300:#d1d5db;--wfl-gray-400:#9ca3af;--wfl-gray-500:#6b7280;--wfl-gray-600:#4b5563;--wfl-gray-700:#374151;--wfl-gray-800:#1f2937;--wfl-gray-900:#111827;--wfl-shadow-sm:0 1px 2px 0 rgb(0 0 0 / 0.05);--wfl-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);--wfl-shadow-md:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--wfl-shadow-lg:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--wfl-shadow-xl:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--wfl-radius:12px;--wfl-radius-lg:16px;--wfl-transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1)}.wfl-container *{box-sizing:border-box;margin:0;padding:0}.wfl-container{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;max-width:720px;margin:0 auto;color:var(--wfl-gray-800);line-height:1.5}.wfl-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px}.wfl-header-content{display:flex;flex-direction:column;gap:4px}.wfl-title{font-size:24px;font-weight:700;color:var(--wfl-gray-900);display:flex;align-items:center;gap:10px}.wfl-title-icon{width:32px;height:32px;background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);border-radius:8px;display:flex;align-items:center;justify-content:center}.wfl-title-icon svg{width:18px;height:18px;color:white}.wfl-subtitle{font-size:14px;color:var(--wfl-gray-500)}.wfl-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;font-size:14px;font-weight:600;border-radius:10px;border:none;cursor:pointer;transition:var(--wfl-transition);position:relative;overflow:hidden}.wfl-btn::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 0%,rgba(255,255,255,0.1) 100%);opacity:0;transition:var(--wfl-transition)}.wfl-btn:hover::before{opacity:1}.wfl-btn-primary{background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);color:white;box-shadow:0 4px 14px 0 rgba(99,102,241,0.35)}.wfl-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px 0 rgba(99,102,241,0.45)}.wfl-btn-primary:active{transform:translateY(0)}.wfl-btn-secondary{background:white;color:var(--wfl-gray-700);border:1px solid var(--wfl-gray-200)}.wfl-btn-secondary:hover{background:var(--wfl-gray-50);border-color:var(--wfl-gray-300)}.wfl-btn svg{width:16px;height:16px}.wfl-btn:disabled{opacity:0.6;cursor:not-allowed;transform:none !important}.wfl-list{display:flex;flex-direction:column;gap:16px}.wfl-card{background:white;border-radius:var(--wfl-radius-lg);border:1px solid var(--wfl-gray-200);padding:16px;display:flex;gap:16px;transition:var(--wfl-transition);position:relative;overflow:hidden;align-items:center}.wfl-card::before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--wfl-primary),#8b5cf6,#ec4899);opacity:0;transition:var(--wfl-transition)}.wfl-card:hover{border-color:var(--wfl-gray-300);box-shadow:var(--wfl-shadow-md)}.wfl-card:hover::before{opacity:1}.wfl-vote{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:56px}.wfl-vote-btn{width:40px;height:32px;border-radius:8px;border:1.5px solid var(--wfl-gray-200);background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--wfl-transition);color:var(--wfl-gray-400)}.wfl-vote-btn svg{width:16px;height:16px;transition:var(--wfl-transition)}.wfl-vote-btn:hover{border-color:var(--wfl-primary);color:var(--wfl-primary);background:var(--wfl-primary-light)}.wfl-vote-btn:active{transform:scale(0.92)}.wfl-vote-btn.wfl-voted{background:var(--wfl-primary);border-color:var(--wfl-primary);color:white}.wfl-vote-btn.wfl-voted:hover{background:var(--wfl-primary-hover)}.wfl-vote-btn.wfl-vote-down.wfl-voted{background:var(--wfl-danger);border-color:var(--wfl-danger)}.wfl-vote-btn:disabled{opacity:0.5;cursor:not-allowed}.wfl-vote-count{font-size:18px;font-weight:700;color:var(--wfl-gray-900);min-height:28px;display:flex;align-items:center;transition:var(--wfl-transition)}.wfl-vote-count.wfl-vote-positive{color:var(--wfl-primary)}.wfl-vote-count.wfl-vote-negative{color:var(--wfl-danger)}@keyframes wfl-vote-pop{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}.wfl-vote-count.wfl-animating{animation:wfl-vote-pop 0.3s ease-out}@keyframes wfl-confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-20px) rotate(180deg);opacity:0}}.wfl-confetti{position:absolute;width:6px;height:6px;border-radius:50%;animation:wfl-confetti 0.6s ease-out forwards;pointer-events:none}.wfl-content{flex:1;min-width:0}.wfl-content-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:8px}.wfl-feature-title{font-size:16px;font-weight:600;color:var(--wfl-gray-900);cursor:pointer;transition:var(--wfl-transition)}.wfl-feature-title:hover{color:var(--wfl-primary)}.wfl-status{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;border-radius:20px;white-space:nowrap;flex-shrink:0}.wfl-status-dot{width:6px;height:6px;border-radius:50%}.wfl-status-open{background:var(--wfl-primary-light);color:var(--wfl-primary)}.wfl-status-open .wfl-status-dot{background:var(--wfl-primary)}.wfl-status-planned{background:#fef3c7;color:#d97706}.wfl-status-planned .wfl-status-dot{background:var(--wfl-warning)}.wfl-status-progress{background:#d1fae5;color:#059669}.wfl-status-progress .wfl-status-dot{background:var(--wfl-success);animation:wfl-pulse 2s infinite}@keyframes wfl-pulse{0%,100%{opacity:1}50%{opacity:0.5}}.wfl-status-completed{background:#d1fae5;color:#059669}.wfl-status-completed .wfl-status-dot{background:var(--wfl-success)}.wfl-description{font-size:14px;color:var(--wfl-gray-600);line-height:1.6;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.wfl-footer{display:flex;align-items:center;gap:16px}.wfl-meta{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--wfl-gray-500);cursor:pointer;padding:4px 8px;border-radius:6px;transition:var(--wfl-transition);border:1px solid var(--wfl-gray-100)}.wfl-meta:hover{background:var(--wfl-gray-100);color:var(--wfl-gray-700)}.wfl-meta svg{width:14px;height:14px}.wfl-tag{display:inline-flex;align-items:center;padding:3px 8px;font-size:11px;font-weight:500;background:var(--wfl-gray-100);color:var(--wfl-gray-600);border-radius:5px}.wfl-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;opacity:0;visibility:hidden;transition:var(--wfl-transition);padding:20px}.wfl-modal-overlay.wfl-active{opacity:1;visibility:visible}.wfl-modal{background:white;border-radius:var(--wfl-radius-lg);width:100%;max-width:520px;max-height:90vh;overflow:hidden;transform:scale(0.9) translateY(20px);transition:var(--wfl-transition);box-shadow:var(--wfl-shadow-xl)}.wfl-modal-overlay.wfl-active .wfl-modal{transform:scale(1) translateY(0)}.wfl-modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--wfl-gray-200)}.wfl-modal-title{font-size:18px;font-weight:600;color:var(--wfl-gray-900)}.wfl-modal-close{width:32px;height:32px;border-radius:8px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--wfl-gray-500);transition:var(--wfl-transition)}.wfl-modal-close:hover{background:var(--wfl-gray-100);color:var(--wfl-gray-700)}.wfl-modal-close svg{width:20px;height:20px}.wfl-modal-body{padding:24px;overflow-y:auto;max-height:calc(90vh - 140px)}.wfl-form-group{margin-bottom:20px}.wfl-label{display:block;font-size:14px;font-weight:500;color:var(--wfl-gray-700);margin-bottom:8px}.wfl-input,.wfl-textarea,input.wfl-input{width:100%;padding:12px 14px;font-size:14px;border:1.5px solid var(--wfl-gray-200);border-radius:10px;background:white;color:var(--wfl-gray-800);transition:var(--wfl-transition);font-family:inherit}.wfl-input:focus,.wfl-textarea:focus{outline:none;border-color:var(--wfl-primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}.wfl-input::placeholder,.wfl-textarea::placeholder{color:var(--wfl-gray-400)}.wfl-textarea{resize:vertical;min-height:100px}.wfl-modal-footer{display:flex;justify-content:flex-end;gap:12px;padding:16px 24px;border-top:1px solid var(--wfl-gray-200);background:var(--wfl-gray-50)}.wfl-comments-section{margin-top:16px;padding-top:16px;border-top:1px solid var(--wfl-gray-200)}.wfl-comments-list{display:flex;flex-direction:column;gap:12px;margin-bottom:16px}.wfl-comment{display:flex;gap:12px}.wfl-comment-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--wfl-primary) 0%,#8b5cf6 100%);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:600;flex-shrink:0}.wfl-comment-content{flex:1;background:var(--wfl-gray-50);padding:10px 14px;border-radius:10px}.wfl-comment-header{display:flex;align-items:center;gap:8px;margin-bottom:4px}.wfl-comment-author{font-size:13px;font-weight:600;color:var(--wfl-gray-800)}.wfl-comment-time{font-size:12px;color:var(--wfl-gray-400)}.wfl-comment-text{font-size:14px;color:var(--wfl-gray-600);line-height:1.5}.wfl-comment-input-wrapper{display:flex;gap:12px}.wfl-comment-input{flex:1;padding:10px 14px;font-size:14px;border:1.5px solid var(--wfl-gray-200);border-radius:10px;background:white;color:var(--wfl-gray-800);transition:var(--wfl-transition);font-family:inherit}.wfl-comment-input:focus{outline:none;border-color:var(--wfl-primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1)}.wfl-comment-submit{width:40px;height:40px;border-radius:10px;border:none;background:var(--wfl-primary);color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--wfl-transition)}.wfl-comment-submit:hover{background:var(--wfl-primary-hover);transform:scale(1.05)}.wfl-comment-submit:active{transform:scale(0.95)}.wfl-comment-submit svg{width:18px;height:18px}.wfl-empty{text-align:center;padding:48px 24px}.wfl-empty-icon{width:64px;height:64px;background:var(--wfl-gray-100);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}.wfl-empty-icon svg{width:28px;height:28px;color:var(--wfl-gray-400)}.wfl-empty-title{font-size:16px;font-weight:600;color:var(--wfl-gray-800);margin-bottom:4px}.wfl-empty-text{font-size:14px;color:var(--wfl-gray-500)}.wfl-toast{position:fixed;bottom:24px;right:24px;padding:14px 20px;background:var(--wfl-gray-900);color:white;font-size:14px;font-weight:500;border-radius:10px;box-shadow:var(--wfl-shadow-lg);z-index:999999;transform:translateY(100px);opacity:0;transition:var(--wfl-transition)}.wfl-toast.wfl-active{transform:translateY(0);opacity:1}.wfl-toast-success{background:var(--wfl-success)}.wfl-toast-error{background:var(--wfl-danger)}.wfl-skeleton{background:linear-gradient(90deg,var(--wfl-gray-200) 25%,var(--wfl-gray-100) 50%,var(--wfl-gray-200) 75%);background-size:200% 100%;animation:wfl-shimmer 1.5s infinite;border-radius:6px}@keyframes wfl-shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}.wfl-skeleton-card{background:white;border-radius:var(--wfl-radius-lg);border:1px solid var(--wfl-gray-200);padding:16px;display:flex;gap:16px;align-items:center}.wfl-skeleton-vote{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:56px}.wfl-skeleton-vote-btn{width:40px;height:32px}.wfl-skeleton-vote-count{width:24px;height:20px}.wfl-skeleton-content{flex:1}.wfl-skeleton-title{height:20px;width:60%;margin-bottom:12px}.wfl-skeleton-desc{height:14px;width:90%;margin-bottom:8px}.wfl-skeleton-desc-2{height:14px;width:70%;margin-bottom:16px}.wfl-skeleton-footer{display:flex;gap:12px}.wfl-skeleton-meta{height:24px;width:80px}.wfl-skeleton-tag{height:20px;width:50px}@media (max-width:600px){.wfl-container{padding:16px}.wfl-header{flex-direction:column;align-items:stretch}.wfl-card{flex-direction:column;align-items:stretch}.wfl-vote{flex-direction:row;justify-content:flex-start}.wfl-modal{max-width:100%;margin:16px}.wfl-skeleton-card{flex-direction:column;align-items:stretch}.wfl-skeleton-vote{flex-direction:row;justify-content:flex-start}}.wfl-ripple{position:relative;overflow:hidden}.wfl-ripple::after{content:"";position:absolute;width:100%;height:100%;top:0;left:0;pointer-events:none;background-image:radial-gradient(circle,rgba(255,255,255,0.3) 10%,transparent 10.01%);background-repeat:no-repeat;background-position:50%;transform:scale(10,10);opacity:0;transition:transform 0.5s,opacity 1s}.wfl-ripple:active::after{transform:scale(0,0);opacity:0.3;transition:0s}.wfl-tooltip{position:relative}.wfl-tooltip::after{content:attr(data-tooltip);position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(-4px);padding:6px 10px;background:var(--wfl-gray-900);color:white;font-size:12px;font-weight:500;border-radius:6px;white-space:nowrap;opacity:0;visibility:hidden;transition:var(--wfl-transition);pointer-events:none}.wfl-tooltip:hover::after{opacity:1;visibility:visible;transform:translateX(-50%) translateY(-8px)}.wfl-btn:focus-visible,.wfl-vote-btn:focus-visible,.wfl-input:focus-visible,.wfl-textarea:focus-visible{outline:2px solid var(--wfl-primary);outline-offset:2px}.wfl-error{text-align:center;padding:48px 24px;color:var(--wfl-danger)}.wfl-error-icon{width:64px;height:64px;background:#fef2f2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}.wfl-error-icon svg{width:28px;height:28px;color:var(--wfl-danger)}.wfl-error-title{font-size:16px;font-weight:600;margin-bottom:4px}.wfl-error-text{font-size:14px;color:var(--wfl-gray-500);margin-bottom:16px}`;

  /**
   * Inject styles into the document head
   */
  function injectStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById("wpfeatureloop-styles")) return;

    const styleElement = document.createElement("style");
    styleElement.id = "wpfeatureloop-styles";
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }

  // Auto-inject styles when module loads
  injectStyles();

  /**
   * SVG Icons
   */
  const icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    arrowUp:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    arrowDown:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    comment:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="m22 2-11 11"/></svg>',
    empty:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    error:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>',
  };

  /**
   * Translations
   */
  const translations = {
    en: {
      title: "Feature Roadmap",
      subtitle: "Vote for features you want to see next",
      suggestFeature: "Suggest Feature",
      suggestTitle: "Suggest a Feature",
      titleLabel: "Title",
      titlePlaceholder: "Brief description of your feature idea",
      descriptionLabel: "Description",
      descriptionPlaceholder:
        "Explain the feature and why it would be valuable...",
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
      downvote: "Downvote",
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
      downvote: "Votar contra",
    },
  };

  /**
   * API Service
   * Handles all API communication
   */
  class ApiService {
    constructor(config) {
      this.publicKey = config.publicKey;
      this.projectId = config.projectId;
      this.user = config.user;
      this.signature = config.signature;
      this.baseUrl = config.apiUrl || "https://app.wpfeatureloop.com/api/v1";
    }

    /**
     * Get headers for API requests
     */
    _getHeaders() {
      return {
        "Content-Type": "application/json",
        "X-Public-Key": this.publicKey,
        "X-Project-Id": this.projectId,
        "X-User-Id": this.user?.id?.toString() || "",
        "X-User-Name": this.user?.name || "",
        "X-Signature": this.signature || "",
      };
    }

    /**
     * Handle API response
     */
    async _handleResponse(response) {
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const error = new Error(data.error || `HTTP error ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      return response.json();
    }

    /**
     * Fetch features list
     * @returns {Promise<Array>}
     */
    async getFeatures() {
      const response = await fetch(`${this.baseUrl}/features`, {
        method: "GET",
        headers: this._getHeaders(),
      });
      return this._handleResponse(response);
    }

    /**
     * Vote on a feature
     * @param {string} featureId
     * @param {string} voteType - 'up', 'down', or 'none'
     * @returns {Promise<Object>}
     */
    async vote(featureId, voteType) {
      const response = await fetch(
        `${this.baseUrl}/features/${featureId}/vote`,
        {
          method: "POST",
          headers: this._getHeaders(),
          body: JSON.stringify({ vote: voteType }),
        },
      );
      return this._handleResponse(response);
    }

    /**
     * Get comments for a feature
     * @param {string} featureId
     * @returns {Promise<Array>}
     */
    async getComments(featureId) {
      const response = await fetch(
        `${this.baseUrl}/features/${featureId}/comments`,
        {
          method: "GET",
          headers: this._getHeaders(),
        },
      );
      return this._handleResponse(response);
    }

    /**
     * Add a comment to a feature
     * @param {string} featureId
     * @param {string} text
     * @returns {Promise<Object>}
     */
    async addComment(featureId, text) {
      const response = await fetch(
        `${this.baseUrl}/features/${featureId}/comments`,
        {
          method: "POST",
          headers: this._getHeaders(),
          body: JSON.stringify({ text }),
        },
      );
      return this._handleResponse(response);
    }

    /**
     * Create a new feature suggestion
     * @param {Object} feature
     * @returns {Promise<Object>}
     */
    async createFeature(feature) {
      const response = await fetch(`${this.baseUrl}/features`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({
          title: feature.title,
          description: feature.description,
        }),
      });
      return this._handleResponse(response);
    }
  }

  /**
   * WPFeatureLoop Main Class
   */
  class WPFeatureLoop {
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
    constructor(config) {
      this.config = config;
      this.container = null;
      this.features = [];
      this.isLoading = true;
      this.hasError = false;
      this.currentCommentFeatureId = null;
      this.currentComments = [];

      // Validate required config
      if (!config.container) {
        throw new Error("WPFeatureLoop: container is required");
      }
      if (!config.publicKey) {
        throw new Error("WPFeatureLoop: publicKey is required");
      }
      if (!config.projectId) {
        throw new Error("WPFeatureLoop: projectId is required");
      }
      if (!config.user?.id) {
        throw new Error("WPFeatureLoop: user.id is required");
      }

      // Set defaults
      this.locale = config.locale || "en";
      this.t = translations[this.locale] || translations["en"];
      this.allowedRoles = config.allowedRoles || ["administrator"];
      this.userRole = config.userRole || "subscriber";

      // Initialize API service
      this.api = new ApiService(config);
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
      this.container = document.querySelector(this.config.container);

      if (!this.container) {
        throw new Error(
          `WPFeatureLoop: Container "${this.config.container}" not found`,
        );
      }

      this.container.classList.add("wfl-container");
      this.renderSkeleton();

      try {
        this.features = await this.api.getFeatures();
        this.isLoading = false;
        this.render();
      } catch (error) {
        console.error("WPFeatureLoop: Failed to load features", error);
        this.isLoading = false;
        this.hasError = true;
        this.renderError();
      }
    }

    /**
     * Render skeleton loading state
     */
    renderSkeleton() {
      const skeletonCards = Array(3)
        .fill(0)
        .map(
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
      `,
        )
        .join("");

      this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${
            this.canCreateFeature()
              ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" disabled>
              ${icons.plus}
              ${this.t.suggestFeature}
            </button>
          `
              : ""
          }
        </div>
        <div class="wfl-list">
          ${skeletonCards}
        </div>
      `;
    }

    /**
     * Render error state
     */
    renderError() {
      this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
        </div>
        <div class="wfl-error">
          <div class="wfl-error-icon">${icons.error}</div>
          <h3 class="wfl-error-title">${this.t.errorTitle}</h3>
          <p class="wfl-error-text">${this.t.errorText}</p>
          <button class="wfl-btn wfl-btn-primary" id="wfl-retry">
            ${this.t.retry}
          </button>
        </div>
      `;

      this.container
        .querySelector("#wfl-retry")
        ?.addEventListener("click", () => {
          this.hasError = false;
          this.isLoading = true;
          this.init();
        });
    }

    /**
     * Main render method
     */
    render() {
      const featuresHtml =
        this.features.length > 0
          ? this.features.map((f) => this.renderCard(f)).join("")
          : this.renderEmpty();

      this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${
            this.canCreateFeature()
              ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-add-feature">
              ${icons.plus}
              ${this.t.suggestFeature}
            </button>
          `
              : ""
          }
        </div>
        <div class="wfl-list" id="wfl-list">
          ${featuresHtml}
        </div>
        ${this.renderModal()}
        ${this.renderCommentModal()}
        <div class="wfl-toast" id="wfl-toast"></div>
      `;

      this.attachEventListeners();
    }

    /**
     * Render a feature card
     */
    renderCard(feature) {
      const voteClass =
        feature.votes > 0
          ? "wfl-vote-positive"
          : feature.votes < 0
            ? "wfl-vote-negative"
            : "";
      const upVoted = feature.userVote === "up";
      const downVoted = feature.userVote === "down";
      const commentText =
        feature.commentsCount === 1 ? this.t.comment : this.t.comments;

      return `
        <div class="wfl-card" data-id="${feature.id}">
          <div class="wfl-vote">
            <button class="wfl-vote-btn wfl-vote-up wfl-tooltip ${upVoted ? "wfl-voted" : ""}"
                    data-id="${feature.id}"
                    data-action="up"
                    data-tooltip="${this.t.upvote}">
              ${icons.arrowUp}
            </button>
            <span class="wfl-vote-count ${voteClass}" data-id="${feature.id}">${feature.votes}</span>
            <button class="wfl-vote-btn wfl-vote-down wfl-tooltip ${downVoted ? "wfl-voted" : ""}"
                    data-id="${feature.id}"
                    data-action="down"
                    data-tooltip="${this.t.downvote}">
              ${icons.arrowDown}
            </button>
          </div>
          <div class="wfl-content">
            <div class="wfl-content-header">
              <h3 class="wfl-feature-title" data-id="${feature.id}">${feature.title}</h3>
              ${this.renderStatus(feature.status)}
            </div>
            <p class="wfl-description">${feature.description}</p>
            <div class="wfl-footer">
              <button class="wfl-meta wfl-comment-trigger" data-id="${feature.id}">
                ${icons.comment}
                <span>${feature.commentsCount} ${commentText}</span>
              </button>
              ${(feature.tags || []).map((tag) => `<span class="wfl-tag">${tag}</span>`).join("")}
            </div>
          </div>
        </div>
      `;
    }

    /**
     * Render status badge
     */
    renderStatus(status) {
      const labels = {
        open: this.t.statusOpen,
        planned: this.t.statusPlanned,
        progress: this.t.statusProgress,
        completed: this.t.statusCompleted,
      };

      return `
        <span class="wfl-status wfl-status-${status}">
          <span class="wfl-status-dot"></span>
          ${labels[status] || status}
        </span>
      `;
    }

    /**
     * Render empty state
     */
    renderEmpty() {
      return `
        <div class="wfl-empty">
          <div class="wfl-empty-icon">${icons.empty}</div>
          <h3 class="wfl-empty-title">${this.t.emptyTitle}</h3>
          <p class="wfl-empty-text">${this.t.emptyText}</p>
        </div>
      `;
    }

    /**
     * Render feature creation modal
     */
    renderModal() {
      if (!this.canCreateFeature()) return "";

      return `
        <div class="wfl-modal-overlay" id="wfl-modal">
          <div class="wfl-modal">
            <div class="wfl-modal-header">
              <h2 class="wfl-modal-title">${this.t.suggestTitle}</h2>
              <button class="wfl-modal-close" id="wfl-modal-close">
                ${icons.close}
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
            </div>
            <div class="wfl-modal-footer">
              <button class="wfl-btn wfl-btn-secondary" id="wfl-modal-cancel">${this.t.cancel}</button>
              <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-modal-submit">${this.t.submit}</button>
            </div>
          </div>
        </div>
      `;
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
                ${icons.close}
              </button>
            </div>
            <div class="wfl-modal-body">
              <div class="wfl-comments-list" id="wfl-comments-list"></div>
              <div class="wfl-comment-input-wrapper">
                <input type="text" class="wfl-comment-input" id="wfl-comment-input" placeholder="${this.t.addComment}">
                <button class="wfl-comment-submit" id="wfl-comment-submit">
                  ${icons.send}
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
    renderCommentsList(comments) {
      if (comments.length === 0) {
        return `<p style="text-align: center; color: var(--wfl-gray-500); padding: 20px;">${this.t.noComments}</p>`;
      }

      return comments
        .map(
          (c) => `
        <div class="wfl-comment${c.isTeamReply ? ' wfl-comment-team' : ''}">
          <div class="wfl-comment-avatar${c.isTeamReply ? ' wfl-comment-avatar-team' : ''}">${c.initials}</div>
          <div class="wfl-comment-content${c.isTeamReply ? ' wfl-comment-content-team' : ''}">
            <div class="wfl-comment-header">
              <span class="wfl-comment-author">${c.author}</span>
              ${c.isTeamReply ? '<span class="wfl-comment-team-badge">Team</span>' : ''}
              <span class="wfl-comment-time">${c.time}</span>
            </div>
            <p class="wfl-comment-text">${c.text}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
      // Add feature button
      const addBtn = this.container.querySelector("#wfl-add-feature");
      if (addBtn) {
        addBtn.addEventListener("click", () => this.openModal());
      }

      // Modal events
      const modal = this.container.querySelector("#wfl-modal");
      if (modal) {
        const modalClose = this.container.querySelector("#wfl-modal-close");
        const modalCancel = this.container.querySelector("#wfl-modal-cancel");
        const modalSubmit = this.container.querySelector("#wfl-modal-submit");

        modalClose?.addEventListener("click", () => this.closeModal());
        modalCancel?.addEventListener("click", () => this.closeModal());
        modal.addEventListener("click", (e) => {
          if (e.target === modal) this.closeModal();
        });
        modalSubmit?.addEventListener("click", () =>
          this.handleSubmitFeature(),
        );
      }

      // Comment modal events
      const commentModal = this.container.querySelector("#wfl-comment-modal");
      if (commentModal) {
        const commentClose = this.container.querySelector(
          "#wfl-comment-modal-close",
        );

        commentClose?.addEventListener("click", () => this.closeCommentModal());
        commentModal.addEventListener("click", (e) => {
          if (e.target === commentModal) this.closeCommentModal();
        });
      }

      // Card events
      this.features.forEach((f) => this.attachCardListeners(f.id));
    }

    /**
     * Attach listeners to a specific card
     */
    attachCardListeners(featureId) {
      const card = this.container.querySelector(
        `.wfl-card[data-id="${featureId}"]`,
      );
      if (!card) return;

      // Vote buttons
      card.querySelectorAll(".wfl-vote-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.handleVote(btn);
        });
      });

      // Comment trigger
      const commentTrigger = card.querySelector(".wfl-comment-trigger");
      if (commentTrigger) {
        commentTrigger.addEventListener("click", () => {
          this.openCommentModal(featureId);
        });
      }
    }

    /**
     * Open feature creation modal
     */
    openModal() {
      const modal = this.container.querySelector("#wfl-modal");
      if (modal) {
        modal.classList.add("wfl-active");
      }
    }

    /**
     * Close feature creation modal
     */
    closeModal() {
      const modal = this.container.querySelector("#wfl-modal");
      if (modal) {
        modal.classList.remove("wfl-active");
        this.container.querySelector("#wfl-feature-title").value = "";
        this.container.querySelector("#wfl-feature-desc").value = "";
      }
    }

    /**
     * Handle feature submission
     */
    async handleSubmitFeature() {
      const title = this.container
        .querySelector("#wfl-feature-title")
        .value.trim();
      const description = this.container
        .querySelector("#wfl-feature-desc")
        .value.trim();

      if (!title || !description) {
        this.showToast(this.t.fillAllFields, "error");
        return;
      }

      const submitBtn = this.container.querySelector("#wfl-modal-submit");
      submitBtn.disabled = true;

      try {
        const newFeature = await this.api.createFeature({
          title,
          description,
        });
        this.features.unshift(newFeature);

        const list = this.container.querySelector("#wfl-list");
        list.insertAdjacentHTML("afterbegin", this.renderCard(newFeature));
        this.attachCardListeners(newFeature.id);

        this.closeModal();
        this.showToast(this.t.featureSubmitted, "success");
      } catch (error) {
        console.error("WPFeatureLoop: Failed to create feature", error);
        this.showToast(this.t.errorText, "error");
      } finally {
        submitBtn.disabled = false;
      }
    }

    /**
     * Open comments modal
     */
    async openCommentModal(featureId) {
      const feature = this.features.find((f) => f.id === featureId);
      if (!feature) return;

      this.currentCommentFeatureId = featureId;
      const commentModal = this.container.querySelector("#wfl-comment-modal");
      const commentsList = this.container.querySelector("#wfl-comments-list");
      const commentTitle = this.container.querySelector("#wfl-comment-title");
      const commentInput = this.container.querySelector("#wfl-comment-input");

      // Clear input and show modal
      commentInput.value = "";
      commentTitle.textContent = feature.title;
      commentsList.innerHTML =
        '<div class="wfl-skeleton" style="height: 60px; margin-bottom: 12px;"></div>'.repeat(
          2,
        );
      commentModal.classList.add("wfl-active");

      try {
        this.currentComments = await this.api.getComments(featureId);
        commentsList.innerHTML = this.renderCommentsList(this.currentComments);

        // Create submit handler that reads input value at call time
        const self = this;
        const handleSubmit = async () => {
          // Get fresh reference to input element
          const input = self.container.querySelector("#wfl-comment-input");
          const submitBtn = self.container.querySelector("#wfl-comment-submit");
          const text = input.value.trim();

          if (!text) return;

          submitBtn.disabled = true;

          try {
            const newComment = await self.api.addComment(featureId, text);
            self.currentComments.push(newComment);
            commentsList.innerHTML = self.renderCommentsList(
              self.currentComments,
            );

            // Update comment count on card
            feature.commentsCount = self.currentComments.length;
            const card = self.container.querySelector(
              `.wfl-card[data-id="${featureId}"]`,
            );
            const commentTrigger = card?.querySelector(
              ".wfl-comment-trigger span",
            );
            if (commentTrigger) {
              const commentText =
                feature.commentsCount === 1 ? self.t.comment : self.t.comments;
              commentTrigger.textContent = `${feature.commentsCount} ${commentText}`;
            }

            input.value = "";
            self.showToast(self.t.commentAdded, "success");
          } catch (error) {
            console.error("WPFeatureLoop: Failed to add comment", error);
            self.showToast(self.t.errorText, "error");
          } finally {
            submitBtn.disabled = false;
          }
        };

        // Attach listeners (replace elements to remove old listeners)
        const oldSubmit = this.container.querySelector("#wfl-comment-submit");
        const oldInput = this.container.querySelector("#wfl-comment-input");

        const newSubmit = oldSubmit.cloneNode(true);
        oldSubmit.parentNode.replaceChild(newSubmit, oldSubmit);
        newSubmit.addEventListener("click", handleSubmit);

        const newInput = oldInput.cloneNode(true);
        oldInput.parentNode.replaceChild(newInput, oldInput);
        newInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") handleSubmit();
        });
      } catch (error) {
        console.error("WPFeatureLoop: Failed to load comments", error);
        commentsList.innerHTML = `<p style="text-align: center; color: var(--wfl-danger);">${this.t.errorText}</p>`;
      }
    }

    /**
     * Close comments modal
     */
    closeCommentModal() {
      const commentModal = this.container.querySelector("#wfl-comment-modal");
      if (commentModal) {
        commentModal.classList.remove("wfl-active");

        // Clear input
        const commentInput = this.container.querySelector("#wfl-comment-input");
        if (commentInput) {
          commentInput.value = "";
        }

        this.currentCommentFeatureId = null;
        this.currentComments = [];
      }
    }

    /**
     * Handle vote
     */
    async handleVote(btn) {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const feature = this.features.find((f) => String(f.id) === String(id));

      if (!feature) return;

      const card = this.container.querySelector(`.wfl-card[data-id="${id}"]`);
      const voteCount = card.querySelector(".wfl-vote-count");
      const upBtn = card.querySelector(".wfl-vote-up");
      const downBtn = card.querySelector(".wfl-vote-down");

      // Disable buttons during request
      upBtn.disabled = true;
      downBtn.disabled = true;

      // Store original values for rollback
      const originalVotes = feature.votes;
      const originalUserVote = feature.userVote;

      // Calculate new vote state
      let newVoteType = "none";
      let voteDelta = 0;

      if (action === "up") {
        if (feature.userVote === "up") {
          voteDelta = -1;
          newVoteType = "none";
        } else if (feature.userVote === "down") {
          voteDelta = 2;
          newVoteType = "up";
        } else {
          voteDelta = 1;
          newVoteType = "up";
        }
      } else {
        if (feature.userVote === "down") {
          voteDelta = 1;
          newVoteType = "none";
        } else if (feature.userVote === "up") {
          voteDelta = -2;
          newVoteType = "down";
        } else {
          voteDelta = -1;
          newVoteType = "down";
        }
      }

      // Optimistic update
      feature.votes += voteDelta;
      feature.userVote = newVoteType === "none" ? null : newVoteType;

      // Update UI
      upBtn.classList.toggle("wfl-voted", feature.userVote === "up");
      downBtn.classList.toggle("wfl-voted", feature.userVote === "down");
      voteCount.textContent = feature.votes;
      voteCount.classList.remove("wfl-vote-positive", "wfl-vote-negative");
      if (feature.votes > 0) {
        voteCount.classList.add("wfl-vote-positive");
      } else if (feature.votes < 0) {
        voteCount.classList.add("wfl-vote-negative");
      }

      // Animation
      voteCount.classList.add("wfl-animating");
      setTimeout(() => voteCount.classList.remove("wfl-animating"), 300);

      // Confetti on upvote
      if (action === "up" && newVoteType === "up") {
        this.createConfetti(upBtn);
      }

      try {
        const result = await this.api.vote(id, newVoteType);

        // Sync with server response
        feature.votes = result.totalVotes;
        feature.userVote = result.vote;
        voteCount.textContent = feature.votes;
        voteCount.classList.remove("wfl-vote-positive", "wfl-vote-negative");
        if (feature.votes > 0) {
          voteCount.classList.add("wfl-vote-positive");
        } else if (feature.votes < 0) {
          voteCount.classList.add("wfl-vote-negative");
        }
      } catch (error) {
        console.error("WPFeatureLoop: Failed to save vote", error);
        // Revert to original values
        feature.votes = originalVotes;
        feature.userVote = originalUserVote;

        upBtn.classList.toggle("wfl-voted", feature.userVote === "up");
        downBtn.classList.toggle("wfl-voted", feature.userVote === "down");
        voteCount.textContent = feature.votes;
        voteCount.classList.remove("wfl-vote-positive", "wfl-vote-negative");
        if (feature.votes > 0) {
          voteCount.classList.add("wfl-vote-positive");
        } else if (feature.votes < 0) {
          voteCount.classList.add("wfl-vote-negative");
        }

        this.showToast(this.t.errorText, "error");
      } finally {
        upBtn.disabled = false;
        downBtn.disabled = false;
      }
    }

    /**
     * Create confetti animation
     */
    createConfetti(element) {
      const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"];
      const rect = element.getBoundingClientRect();

      for (let i = 0; i < 6; i++) {
        const confetti = document.createElement("div");
        confetti.className = "wfl-confetti";
        confetti.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 30}px`;
        confetti.style.top = `${rect.top + rect.height / 2}px`;
        confetti.style.background =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = "fixed";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 600);
      }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = "default") {
      const toast = this.container.querySelector("#wfl-toast");
      if (!toast) return;

      toast.textContent = message;
      toast.className = "wfl-toast wfl-active";

      if (type === "success") {
        toast.classList.add("wfl-toast-success");
      } else if (type === "error") {
        toast.classList.add("wfl-toast-error");
      }

      setTimeout(() => {
        toast.classList.remove("wfl-active");
      }, 3000);
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
      this.isLoading = true;
      this.renderSkeleton();

      try {
        this.features = await this.api.getFeatures();
        this.isLoading = false;
        this.hasError = false;
        this.render();
      } catch (error) {
        console.error("WPFeatureLoop: Failed to refresh features", error);
        this.isLoading = false;
        this.hasError = true;
        this.renderError();
      }
    }

    /**
     * Destroy the widget
     */
    destroy() {
      if (this.container) {
        this.container.innerHTML = "";
        this.container.classList.remove("wfl-container");
      }
    }
  }

  /**
   * Static init method for convenience
   */
  WPFeatureLoop.init = function (config) {
    const instance = new WPFeatureLoop(config);
    instance.init();
    return instance;
  };

  /**
   * Version
   */
  WPFeatureLoop.version = "1.1.0";

  return WPFeatureLoop;
});
