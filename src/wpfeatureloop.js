/**
 * WPFeatureLoop SDK
 * A feature voting widget for WordPress plugins
 *
 * @version 1.0.0
 * @license MIT
 */

(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WPFeatureLoop = factory());
})(this, function() {
  'use strict';

  /**
   * SVG Icons
   */
  const icons = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="m22 2-11 11"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>'
  };

  /**
   * Translations
   */
  const translations = {
    'en': {
      title: 'Feature Roadmap',
      subtitle: 'Vote for features you want to see next',
      suggestFeature: 'Suggest Feature',
      suggestTitle: 'Suggest a Feature',
      titleLabel: 'Title',
      titlePlaceholder: 'Brief description of your feature idea',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Explain the feature and why it would be valuable...',
      categoryLabel: 'Category',
      categoryPlaceholder: 'e.g., UI/UX, Performance, Integration',
      cancel: 'Cancel',
      submit: 'Submit Feature',
      comments: 'comments',
      comment: 'comment',
      addComment: 'Add a comment...',
      noComments: 'No comments yet. Be the first to share your thoughts!',
      emptyTitle: 'No features yet',
      emptyText: 'Be the first to suggest a feature!',
      errorTitle: 'Failed to load features',
      errorText: 'Please try again later.',
      retry: 'Retry',
      fillAllFields: 'Please fill in all fields',
      featureSubmitted: 'Feature submitted successfully!',
      commentAdded: 'Comment added!',
      voteSaved: 'Vote saved!',
      statusOpen: 'Open',
      statusPlanned: 'Planned',
      statusProgress: 'In Progress',
      statusCompleted: 'Completed',
      upvote: 'Upvote',
      downvote: 'Downvote'
    },
    'pt-BR': {
      title: 'Roadmap de Features',
      subtitle: 'Vote nas funcionalidades que deseja ver',
      suggestFeature: 'Sugerir Feature',
      suggestTitle: 'Sugerir uma Feature',
      titleLabel: 'Título',
      titlePlaceholder: 'Breve descrição da sua ideia',
      descriptionLabel: 'Descrição',
      descriptionPlaceholder: 'Explique a feature e por que seria valiosa...',
      categoryLabel: 'Categoria',
      categoryPlaceholder: 'Ex: UI/UX, Performance, Integração',
      cancel: 'Cancelar',
      submit: 'Enviar Feature',
      comments: 'comentários',
      comment: 'comentário',
      addComment: 'Adicionar um comentário...',
      noComments: 'Nenhum comentário ainda. Seja o primeiro!',
      emptyTitle: 'Nenhuma feature ainda',
      emptyText: 'Seja o primeiro a sugerir uma feature!',
      errorTitle: 'Erro ao carregar features',
      errorText: 'Por favor, tente novamente mais tarde.',
      retry: 'Tentar novamente',
      fillAllFields: 'Por favor, preencha todos os campos',
      featureSubmitted: 'Feature enviada com sucesso!',
      commentAdded: 'Comentário adicionado!',
      voteSaved: 'Voto salvo!',
      statusOpen: 'Aberto',
      statusPlanned: 'Planejado',
      statusProgress: 'Em Progresso',
      statusCompleted: 'Concluído',
      upvote: 'Votar a favor',
      downvote: 'Votar contra'
    }
  };

  /**
   * API Service
   * Handles all API communication (fake data for now)
   */
  class ApiService {
    constructor(config) {
      this.publicKey = config.publicKey;
      this.projectId = config.projectId;
      this.user = config.user;
      this.signature = config.signature;
      this.baseUrl = config.apiUrl || 'https://api.wpfeatureloop.io/v1';
    }

    /**
     * Simulate API delay
     */
    async _simulateDelay(ms = 800) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Get headers for API requests
     */
    _getHeaders() {
      return {
        'Content-Type': 'application/json',
        'X-Public-Key': this.publicKey,
        'X-Project-Id': this.projectId,
        'X-User-Id': this.user?.id?.toString() || '',
        'X-Signature': this.signature || ''
      };
    }

    /**
     * Fetch features list
     * @returns {Promise<Array>}
     */
    async getFeatures() {
      await this._simulateDelay();

      // TODO: Replace with real API call
      // const response = await fetch(`${this.baseUrl}/features`, {
      //   method: 'GET',
      //   headers: this._getHeaders()
      // });
      // return response.json();

      // Fake data for now
      return [
        {
          id: 1,
          title: 'Dark Mode Support',
          description: 'Add a dark mode theme option that follows system preferences or can be toggled manually. Essential for users who work at night or prefer darker interfaces.',
          votes: 47,
          userVote: null,
          status: 'planned',
          commentsCount: 2,
          tags: ['UI/UX'],
          createdAt: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Export Data to CSV',
          description: 'Allow users to export all their data in CSV format for backup or migration purposes. Include options to select specific date ranges and data types.',
          votes: 32,
          userVote: null,
          status: 'progress',
          commentsCount: 1,
          tags: ['Data'],
          createdAt: '2024-01-10T14:30:00Z'
        },
        {
          id: 3,
          title: 'API Webhooks',
          description: 'Implement webhooks to notify external services when certain events occur, like new submissions or status changes.',
          votes: 28,
          userVote: 'up',
          status: 'open',
          commentsCount: 5,
          tags: ['Integration'],
          createdAt: '2024-01-08T09:15:00Z'
        },
        {
          id: 4,
          title: 'Multi-language Support',
          description: 'Add support for multiple languages to make the plugin accessible to users worldwide.',
          votes: 15,
          userVote: null,
          status: 'open',
          commentsCount: 0,
          tags: ['i18n'],
          createdAt: '2024-01-05T16:45:00Z'
        }
      ];
    }

    /**
     * Vote on a feature
     * @param {number} featureId
     * @param {string} voteType - 'up', 'down', or 'none'
     * @returns {Promise<Object>}
     */
    async vote(featureId, voteType) {
      await this._simulateDelay(300);

      // TODO: Replace with real API call
      // const response = await fetch(`${this.baseUrl}/features/${featureId}/vote`, {
      //   method: 'POST',
      //   headers: this._getHeaders(),
      //   body: JSON.stringify({ vote: voteType })
      // });
      // return response.json();

      return { success: true, featureId, voteType };
    }

    /**
     * Get comments for a feature
     * @param {number} featureId
     * @returns {Promise<Array>}
     */
    async getComments(featureId) {
      await this._simulateDelay(500);

      // TODO: Replace with real API call
      // const response = await fetch(`${this.baseUrl}/features/${featureId}/comments`, {
      //   method: 'GET',
      //   headers: this._getHeaders()
      // });
      // return response.json();

      // Fake data based on feature
      const commentsMap = {
        1: [
          { id: 1, author: 'Sarah M.', initials: 'SM', text: 'This would be amazing! My eyes would thank you.', time: '2 days ago' },
          { id: 2, author: 'Dev Team', initials: 'DT', text: "We're planning this for the next major release!", time: '1 day ago' }
        ],
        2: [
          { id: 1, author: 'Mike R.', initials: 'MR', text: 'Need this for compliance reporting!', time: '5 days ago' }
        ],
        3: [
          { id: 1, author: 'John D.', initials: 'JD', text: 'Would love to integrate with Zapier!', time: '1 week ago' },
          { id: 2, author: 'Anna K.', initials: 'AK', text: 'Slack integration would be great too.', time: '6 days ago' },
          { id: 3, author: 'Dev Team', initials: 'DT', text: 'Great suggestions! Adding to our roadmap.', time: '5 days ago' },
          { id: 4, author: 'Peter S.', initials: 'PS', text: 'Any ETA on this?', time: '3 days ago' },
          { id: 5, author: 'Dev Team', initials: 'DT', text: 'Targeting Q2 2024!', time: '2 days ago' }
        ]
      };

      return commentsMap[featureId] || [];
    }

    /**
     * Add a comment to a feature
     * @param {number} featureId
     * @param {string} text
     * @returns {Promise<Object>}
     */
    async addComment(featureId, text) {
      await this._simulateDelay(400);

      // TODO: Replace with real API call
      // const response = await fetch(`${this.baseUrl}/features/${featureId}/comments`, {
      //   method: 'POST',
      //   headers: this._getHeaders(),
      //   body: JSON.stringify({ text })
      // });
      // return response.json();

      const userName = this.user?.name || 'You';
      const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

      return {
        id: Date.now(),
        author: userName,
        initials,
        text,
        time: 'Just now'
      };
    }

    /**
     * Create a new feature suggestion
     * @param {Object} feature
     * @returns {Promise<Object>}
     */
    async createFeature(feature) {
      await this._simulateDelay(600);

      // TODO: Replace with real API call
      // const response = await fetch(`${this.baseUrl}/features`, {
      //   method: 'POST',
      //   headers: this._getHeaders(),
      //   body: JSON.stringify(feature)
      // });
      // return response.json();

      return {
        id: Date.now(),
        title: feature.title,
        description: feature.description,
        votes: 1,
        userVote: 'up',
        status: 'open',
        commentsCount: 0,
        tags: [feature.category || 'General'],
        createdAt: new Date().toISOString()
      };
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
        throw new Error('WPFeatureLoop: container is required');
      }
      if (!config.publicKey) {
        throw new Error('WPFeatureLoop: publicKey is required');
      }
      if (!config.projectId) {
        throw new Error('WPFeatureLoop: projectId is required');
      }
      if (!config.user?.id) {
        throw new Error('WPFeatureLoop: user.id is required');
      }

      // Set defaults
      this.locale = config.locale || 'en';
      this.t = translations[this.locale] || translations['en'];
      this.allowedRoles = config.allowedRoles || ['administrator'];
      this.userRole = config.userRole || 'subscriber';

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
        throw new Error(`WPFeatureLoop: Container "${this.config.container}" not found`);
      }

      this.container.classList.add('wfl-container');
      this.renderSkeleton();

      try {
        this.features = await this.api.getFeatures();
        this.isLoading = false;
        this.render();
      } catch (error) {
        console.error('WPFeatureLoop: Failed to load features', error);
        this.isLoading = false;
        this.hasError = true;
        this.renderError();
      }
    }

    /**
     * Render skeleton loading state
     */
    renderSkeleton() {
      const skeletonCards = Array(3).fill(0).map(() => `
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
      `).join('');

      this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature() ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" disabled>
              ${icons.plus}
              ${this.t.suggestFeature}
            </button>
          ` : ''}
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

      this.container.querySelector('#wfl-retry')?.addEventListener('click', () => {
        this.hasError = false;
        this.isLoading = true;
        this.init();
      });
    }

    /**
     * Main render method
     */
    render() {
      const featuresHtml = this.features.length > 0
        ? this.features.map(f => this.renderCard(f)).join('')
        : this.renderEmpty();

      this.container.innerHTML = `
        <div class="wfl-header">
          <div class="wfl-header-content">
            <h1 class="wfl-title">${this.t.title}</h1>
            <p class="wfl-subtitle">${this.t.subtitle}</p>
          </div>
          ${this.canCreateFeature() ? `
            <button class="wfl-btn wfl-btn-primary wfl-ripple" id="wfl-add-feature">
              ${icons.plus}
              ${this.t.suggestFeature}
            </button>
          ` : ''}
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
      const voteClass = feature.votes > 0 ? 'wfl-vote-positive' : (feature.votes < 0 ? 'wfl-vote-negative' : '');
      const upVoted = feature.userVote === 'up';
      const downVoted = feature.userVote === 'down';
      const commentText = feature.commentsCount === 1 ? this.t.comment : this.t.comments;

      return `
        <div class="wfl-card" data-id="${feature.id}">
          <div class="wfl-vote">
            <button class="wfl-vote-btn wfl-vote-up wfl-tooltip ${upVoted ? 'wfl-voted' : ''}"
                    data-id="${feature.id}"
                    data-action="up"
                    data-tooltip="${this.t.upvote}">
              ${icons.arrowUp}
            </button>
            <span class="wfl-vote-count ${voteClass}" data-id="${feature.id}">${feature.votes}</span>
            <button class="wfl-vote-btn wfl-vote-down wfl-tooltip ${downVoted ? 'wfl-voted' : ''}"
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
              ${feature.tags.map(tag => `<span class="wfl-tag">${tag}</span>`).join('')}
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
        completed: this.t.statusCompleted
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
      if (!this.canCreateFeature()) return '';

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

      return comments.map(c => `
        <div class="wfl-comment">
          <div class="wfl-comment-avatar">${c.initials}</div>
          <div class="wfl-comment-content">
            <div class="wfl-comment-header">
              <span class="wfl-comment-author">${c.author}</span>
              <span class="wfl-comment-time">${c.time}</span>
            </div>
            <p class="wfl-comment-text">${c.text}</p>
          </div>
        </div>
      `).join('');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
      // Add feature button
      const addBtn = this.container.querySelector('#wfl-add-feature');
      if (addBtn) {
        addBtn.addEventListener('click', () => this.openModal());
      }

      // Modal events
      const modal = this.container.querySelector('#wfl-modal');
      if (modal) {
        const modalClose = this.container.querySelector('#wfl-modal-close');
        const modalCancel = this.container.querySelector('#wfl-modal-cancel');
        const modalSubmit = this.container.querySelector('#wfl-modal-submit');

        modalClose?.addEventListener('click', () => this.closeModal());
        modalCancel?.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModal();
        });
        modalSubmit?.addEventListener('click', () => this.handleSubmitFeature());
      }

      // Comment modal events
      const commentModal = this.container.querySelector('#wfl-comment-modal');
      if (commentModal) {
        const commentClose = this.container.querySelector('#wfl-comment-modal-close');

        commentClose?.addEventListener('click', () => this.closeCommentModal());
        commentModal.addEventListener('click', (e) => {
          if (e.target === commentModal) this.closeCommentModal();
        });
      }

      // Card events
      this.features.forEach(f => this.attachCardListeners(f.id));
    }

    /**
     * Attach listeners to a specific card
     */
    attachCardListeners(featureId) {
      const card = this.container.querySelector(`.wfl-card[data-id="${featureId}"]`);
      if (!card) return;

      // Vote buttons
      card.querySelectorAll('.wfl-vote-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleVote(btn);
        });
      });

      // Comment trigger
      const commentTrigger = card.querySelector('.wfl-comment-trigger');
      if (commentTrigger) {
        commentTrigger.addEventListener('click', () => {
          this.openCommentModal(featureId);
        });
      }
    }

    /**
     * Open feature creation modal
     */
    openModal() {
      const modal = this.container.querySelector('#wfl-modal');
      if (modal) {
        modal.classList.add('wfl-active');
      }
    }

    /**
     * Close feature creation modal
     */
    closeModal() {
      const modal = this.container.querySelector('#wfl-modal');
      if (modal) {
        modal.classList.remove('wfl-active');
        this.container.querySelector('#wfl-feature-title').value = '';
        this.container.querySelector('#wfl-feature-desc').value = '';
        this.container.querySelector('#wfl-feature-tag').value = '';
      }
    }

    /**
     * Handle feature submission
     */
    async handleSubmitFeature() {
      const title = this.container.querySelector('#wfl-feature-title').value.trim();
      const description = this.container.querySelector('#wfl-feature-desc').value.trim();
      const category = this.container.querySelector('#wfl-feature-tag').value.trim() || 'General';

      if (!title || !description) {
        this.showToast(this.t.fillAllFields, 'error');
        return;
      }

      const submitBtn = this.container.querySelector('#wfl-modal-submit');
      submitBtn.disabled = true;

      try {
        const newFeature = await this.api.createFeature({ title, description, category });
        this.features.unshift(newFeature);

        const list = this.container.querySelector('#wfl-list');
        list.insertAdjacentHTML('afterbegin', this.renderCard(newFeature));
        this.attachCardListeners(newFeature.id);

        this.closeModal();
        this.showToast(this.t.featureSubmitted, 'success');
      } catch (error) {
        console.error('WPFeatureLoop: Failed to create feature', error);
        this.showToast(this.t.errorText, 'error');
      } finally {
        submitBtn.disabled = false;
      }
    }

    /**
     * Open comments modal
     */
    async openCommentModal(featureId) {
      const feature = this.features.find(f => f.id === featureId);
      if (!feature) return;

      this.currentCommentFeatureId = featureId;
      const commentModal = this.container.querySelector('#wfl-comment-modal');
      const commentsList = this.container.querySelector('#wfl-comments-list');
      const commentTitle = this.container.querySelector('#wfl-comment-title');
      const commentInput = this.container.querySelector('#wfl-comment-input');

      // Clear input and show modal
      commentInput.value = '';
      commentTitle.textContent = feature.title;
      commentsList.innerHTML = '<div class="wfl-skeleton" style="height: 60px; margin-bottom: 12px;"></div>'.repeat(2);
      commentModal.classList.add('wfl-active');

      try {
        this.currentComments = await this.api.getComments(featureId);
        commentsList.innerHTML = this.renderCommentsList(this.currentComments);

        // Create submit handler that reads input value at call time
        const self = this;
        const handleSubmit = async () => {
          // Get fresh reference to input element
          const input = self.container.querySelector('#wfl-comment-input');
          const submitBtn = self.container.querySelector('#wfl-comment-submit');
          const text = input.value.trim();

          if (!text) return;

          submitBtn.disabled = true;

          try {
            const newComment = await self.api.addComment(featureId, text);
            self.currentComments.push(newComment);
            commentsList.innerHTML = self.renderCommentsList(self.currentComments);

            // Update comment count on card
            feature.commentsCount = self.currentComments.length;
            const card = self.container.querySelector(`.wfl-card[data-id="${featureId}"]`);
            const commentTrigger = card?.querySelector('.wfl-comment-trigger span');
            if (commentTrigger) {
              const commentText = feature.commentsCount === 1 ? self.t.comment : self.t.comments;
              commentTrigger.textContent = `${feature.commentsCount} ${commentText}`;
            }

            input.value = '';
            self.showToast(self.t.commentAdded, 'success');
          } catch (error) {
            console.error('WPFeatureLoop: Failed to add comment', error);
            self.showToast(self.t.errorText, 'error');
          } finally {
            submitBtn.disabled = false;
          }
        };

        // Attach listeners (replace elements to remove old listeners)
        const oldSubmit = this.container.querySelector('#wfl-comment-submit');
        const oldInput = this.container.querySelector('#wfl-comment-input');

        const newSubmit = oldSubmit.cloneNode(true);
        oldSubmit.parentNode.replaceChild(newSubmit, oldSubmit);
        newSubmit.addEventListener('click', handleSubmit);

        const newInput = oldInput.cloneNode(true);
        oldInput.parentNode.replaceChild(newInput, oldInput);
        newInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') handleSubmit();
        });

      } catch (error) {
        console.error('WPFeatureLoop: Failed to load comments', error);
        commentsList.innerHTML = `<p style="text-align: center; color: var(--wfl-danger);">${this.t.errorText}</p>`;
      }
    }

    /**
     * Close comments modal
     */
    closeCommentModal() {
      const commentModal = this.container.querySelector('#wfl-comment-modal');
      if (commentModal) {
        commentModal.classList.remove('wfl-active');

        // Clear input
        const commentInput = this.container.querySelector('#wfl-comment-input');
        if (commentInput) {
          commentInput.value = '';
        }

        this.currentCommentFeatureId = null;
        this.currentComments = [];
      }
    }

    /**
     * Handle vote
     */
    async handleVote(btn) {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      const feature = this.features.find(f => f.id === id);

      if (!feature) return;

      const card = this.container.querySelector(`.wfl-card[data-id="${id}"]`);
      const voteCount = card.querySelector('.wfl-vote-count');
      const upBtn = card.querySelector('.wfl-vote-up');
      const downBtn = card.querySelector('.wfl-vote-down');

      // Disable buttons during request
      upBtn.disabled = true;
      downBtn.disabled = true;

      // Calculate new vote state
      let newVoteType = 'none';
      let voteDelta = 0;

      if (action === 'up') {
        if (feature.userVote === 'up') {
          voteDelta = -1;
          newVoteType = 'none';
        } else if (feature.userVote === 'down') {
          voteDelta = 2;
          newVoteType = 'up';
        } else {
          voteDelta = 1;
          newVoteType = 'up';
        }
      } else {
        if (feature.userVote === 'down') {
          voteDelta = 1;
          newVoteType = 'none';
        } else if (feature.userVote === 'up') {
          voteDelta = -2;
          newVoteType = 'down';
        } else {
          voteDelta = -1;
          newVoteType = 'down';
        }
      }

      // Optimistic update
      feature.votes += voteDelta;
      feature.userVote = newVoteType === 'none' ? null : newVoteType;

      // Update UI
      upBtn.classList.toggle('wfl-voted', feature.userVote === 'up');
      downBtn.classList.toggle('wfl-voted', feature.userVote === 'down');
      voteCount.textContent = feature.votes;
      voteCount.classList.remove('wfl-vote-positive', 'wfl-vote-negative');
      if (feature.votes > 0) {
        voteCount.classList.add('wfl-vote-positive');
      } else if (feature.votes < 0) {
        voteCount.classList.add('wfl-vote-negative');
      }

      // Animation
      voteCount.classList.add('wfl-animating');
      setTimeout(() => voteCount.classList.remove('wfl-animating'), 300);

      // Confetti on upvote
      if (action === 'up' && newVoteType === 'up') {
        this.createConfetti(upBtn);
      }

      try {
        await this.api.vote(id, newVoteType);
      } catch (error) {
        console.error('WPFeatureLoop: Failed to save vote', error);
        // Revert on error
        feature.votes -= voteDelta;
        feature.userVote = action === 'up'
          ? (voteDelta === -1 ? 'up' : (voteDelta === 2 ? 'down' : null))
          : (voteDelta === 1 ? 'down' : (voteDelta === -2 ? 'up' : null));

        upBtn.classList.toggle('wfl-voted', feature.userVote === 'up');
        downBtn.classList.toggle('wfl-voted', feature.userVote === 'down');
        voteCount.textContent = feature.votes;

        this.showToast(this.t.errorText, 'error');
      } finally {
        upBtn.disabled = false;
        downBtn.disabled = false;
      }
    }

    /**
     * Create confetti animation
     */
    createConfetti(element) {
      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
      const rect = element.getBoundingClientRect();

      for (let i = 0; i < 6; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'wfl-confetti';
        confetti.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 30}px`;
        confetti.style.top = `${rect.top + rect.height / 2}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 600);
      }
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'default') {
      const toast = this.container.querySelector('#wfl-toast');
      if (!toast) return;

      toast.textContent = message;
      toast.className = 'wfl-toast wfl-active';

      if (type === 'success') {
        toast.classList.add('wfl-toast-success');
      } else if (type === 'error') {
        toast.classList.add('wfl-toast-error');
      }

      setTimeout(() => {
        toast.classList.remove('wfl-active');
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
        console.error('WPFeatureLoop: Failed to refresh features', error);
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
        this.container.innerHTML = '';
        this.container.classList.remove('wfl-container');
      }
    }
  }

  /**
   * Static init method for convenience
   */
  WPFeatureLoop.init = function(config) {
    const instance = new WPFeatureLoop(config);
    instance.init();
    return instance;
  };

  /**
   * Version
   */
  WPFeatureLoop.version = '1.0.0';

  return WPFeatureLoop;
});
