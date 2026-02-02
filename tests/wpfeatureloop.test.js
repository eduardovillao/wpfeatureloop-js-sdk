import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import WPFeatureLoop from '../src/wpfeatureloop.js';

/**
 * Helper to create a container element
 */
function createContainer(id = 'wfl-test') {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
}

/**
 * Helper to cleanup container
 */
function cleanup(id = 'wfl-test') {
  const container = document.getElementById(id);
  if (container) {
    container.remove();
  }
}

/**
 * Default config for tests
 */
const defaultConfig = {
  container: '#wfl-test',
  publicKey: 'pk_test_123',
  projectId: 'proj_test_abc',
  user: {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  },
  signature: 'test_signature',
  userRole: 'administrator',
  allowedRoles: ['administrator']
};

/**
 * Wait for async operations
 */
const wait = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wait for loading to complete (skeleton to disappear)
 */
const waitForLoad = async (container, timeout = 2000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (!container.querySelector('.wfl-skeleton')) {
      return true;
    }
    await wait(50);
  }
  return false;
};

// ============================================
// Initialization Tests
// ============================================

describe('WPFeatureLoop Initialization', () => {
  beforeEach(() => {
    createContainer();
  });

  afterEach(() => {
    cleanup();
  });

  it('should create instance with valid config', () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    expect(wfl).toBeInstanceOf(WPFeatureLoop);
    expect(wfl.config.publicKey).toBe('pk_test_123');
    expect(wfl.config.projectId).toBe('proj_test_abc');
  });

  it('should throw error if container is missing', () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        container: undefined
      });
    }).toThrow('container is required');
  });

  it('should throw error if publicKey is missing', () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        publicKey: undefined
      });
    }).toThrow('publicKey is required');
  });

  it('should throw error if projectId is missing', () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        projectId: undefined
      });
    }).toThrow('projectId is required');
  });

  it('should throw error if user.id is missing', () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        user: { name: 'Test' }
      });
    }).toThrow('user.id is required');
  });

  it('should throw error if container element not found', async () => {
    cleanup(); // Remove container
    const wfl = new WPFeatureLoop(defaultConfig);

    await expect(wfl.init()).rejects.toThrow('Container "#wfl-test" not found');
  });

  it('should use default locale if not provided', () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    expect(wfl.locale).toBe('en');
  });

  it('should use provided locale', () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: 'pt-BR'
    });
    expect(wfl.locale).toBe('pt-BR');
  });

  it('should fallback to english for unknown locale', () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: 'unknown'
    });
    expect(wfl.t.title).toBe('Feature Roadmap');
  });

  it('should have version property', () => {
    expect(WPFeatureLoop.version).toBe('1.0.0');
  });

  it('should have static init method', () => {
    expect(typeof WPFeatureLoop.init).toBe('function');
  });
});

// ============================================
// Rendering Tests
// ============================================

describe('WPFeatureLoop Rendering', () => {
  let container;

  beforeEach(() => {
    container = createContainer();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render skeleton while loading', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    wfl.init(); // Don't await

    // Check skeleton is shown immediately
    await wait(10);
    expect(container.querySelector('.wfl-skeleton')).not.toBeNull();
    expect(container.querySelectorAll('.wfl-skeleton-card').length).toBe(3);
  });

  it('should render header with title', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const title = container.querySelector('.wfl-title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Feature Roadmap');
  });

  it('should render header with Portuguese title', async () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: 'pt-BR'
    });
    await wfl.init();
    await waitForLoad(container);

    const title = container.querySelector('.wfl-title');
    expect(title.textContent).toBe('Roadmap de Features');
  });

  it('should render suggest button for allowed roles', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const btn = container.querySelector('#wfl-add-feature');
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain('Suggest Feature');
  });

  it('should hide suggest button for non-allowed roles', async () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      userRole: 'subscriber'
    });
    await wfl.init();
    await waitForLoad(container);

    const btn = container.querySelector('#wfl-add-feature');
    expect(btn).toBeNull();
  });

  it('should render feature cards', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const cards = container.querySelectorAll('.wfl-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render vote buttons on cards', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const upBtn = container.querySelector('.wfl-vote-up');
    const downBtn = container.querySelector('.wfl-vote-down');
    expect(upBtn).not.toBeNull();
    expect(downBtn).not.toBeNull();
  });

  it('should render vote count', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const voteCount = container.querySelector('.wfl-vote-count');
    expect(voteCount).not.toBeNull();
  });

  it('should render status badges', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const status = container.querySelector('.wfl-status');
    expect(status).not.toBeNull();
  });

  it('should render comment triggers', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const commentTrigger = container.querySelector('.wfl-comment-trigger');
    expect(commentTrigger).not.toBeNull();
  });

  it('should render tags', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const tag = container.querySelector('.wfl-tag');
    expect(tag).not.toBeNull();
  });

  it('should render modals', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const featureModal = container.querySelector('#wfl-modal');
    const commentModal = container.querySelector('#wfl-comment-modal');
    expect(featureModal).not.toBeNull();
    expect(commentModal).not.toBeNull();
  });

  it('should render toast container', async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const toast = container.querySelector('#wfl-toast');
    expect(toast).not.toBeNull();
  });
});

// ============================================
// Voting Tests
// ============================================

describe('WPFeatureLoop Voting', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should upvote a feature', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const upBtn = firstCard.querySelector('.wfl-vote-up');
    const voteCount = firstCard.querySelector('.wfl-vote-count');
    const initialVotes = parseInt(voteCount.textContent);

    upBtn.click();
    await wait(50);

    expect(parseInt(voteCount.textContent)).toBe(initialVotes + 1);
    expect(upBtn.classList.contains('wfl-voted')).toBe(true);
  });

  it('should remove upvote when clicking again', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const upBtn = firstCard.querySelector('.wfl-vote-up');
    const voteCount = firstCard.querySelector('.wfl-vote-count');
    const initialVotes = parseInt(voteCount.textContent);

    // First click - upvote
    upBtn.click();
    await wait(50);
    expect(parseInt(voteCount.textContent)).toBe(initialVotes + 1);

    // Wait for API to complete (buttons are disabled during API call)
    await wait(400);

    // Second click - remove upvote
    upBtn.click();
    await wait(50);
    expect(parseInt(voteCount.textContent)).toBe(initialVotes);
    expect(upBtn.classList.contains('wfl-voted')).toBe(false);
  });

  it('should downvote a feature', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const downBtn = firstCard.querySelector('.wfl-vote-down');
    const voteCount = firstCard.querySelector('.wfl-vote-count');
    const initialVotes = parseInt(voteCount.textContent);

    downBtn.click();
    await wait(50);

    expect(parseInt(voteCount.textContent)).toBe(initialVotes - 1);
    expect(downBtn.classList.contains('wfl-voted')).toBe(true);
  });

  it('should switch from upvote to downvote', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const upBtn = firstCard.querySelector('.wfl-vote-up');
    const downBtn = firstCard.querySelector('.wfl-vote-down');
    const voteCount = firstCard.querySelector('.wfl-vote-count');
    const initialVotes = parseInt(voteCount.textContent);

    // Upvote
    upBtn.click();
    await wait(50);
    expect(parseInt(voteCount.textContent)).toBe(initialVotes + 1);

    // Wait for API to complete (buttons are disabled during API call)
    await wait(400);

    // Switch to downvote
    downBtn.click();
    await wait(50);
    expect(parseInt(voteCount.textContent)).toBe(initialVotes - 1);
    expect(upBtn.classList.contains('wfl-voted')).toBe(false);
    expect(downBtn.classList.contains('wfl-voted')).toBe(true);
  });

  it('should show positive class for positive votes', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const upBtn = firstCard.querySelector('.wfl-vote-up');
    const voteCount = firstCard.querySelector('.wfl-vote-count');

    // Ensure we have positive votes
    upBtn.click();
    await wait(50);

    expect(voteCount.classList.contains('wfl-vote-positive')).toBe(true);
  });

  it('should animate vote count on change', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const upBtn = firstCard.querySelector('.wfl-vote-up');
    const voteCount = firstCard.querySelector('.wfl-vote-count');

    upBtn.click();
    await wait(10);

    expect(voteCount.classList.contains('wfl-animating')).toBe(true);
  });
});

// ============================================
// Modal Tests
// ============================================

describe('WPFeatureLoop Modals', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should open feature modal when clicking suggest button', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const modal = container.querySelector('#wfl-modal');

    addBtn.click();
    await wait(10);

    expect(modal.classList.contains('wfl-active')).toBe(true);
  });

  it('should close feature modal when clicking close button', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const modal = container.querySelector('#wfl-modal');
    const closeBtn = container.querySelector('#wfl-modal-close');

    addBtn.click();
    await wait(10);
    expect(modal.classList.contains('wfl-active')).toBe(true);

    closeBtn.click();
    await wait(10);
    expect(modal.classList.contains('wfl-active')).toBe(false);
  });

  it('should close feature modal when clicking cancel button', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const modal = container.querySelector('#wfl-modal');
    const cancelBtn = container.querySelector('#wfl-modal-cancel');

    addBtn.click();
    await wait(10);

    cancelBtn.click();
    await wait(10);
    expect(modal.classList.contains('wfl-active')).toBe(false);
  });

  it('should close feature modal when clicking overlay', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const modal = container.querySelector('#wfl-modal');

    addBtn.click();
    await wait(10);

    modal.click(); // Click on overlay
    await wait(10);
    expect(modal.classList.contains('wfl-active')).toBe(false);
  });

  it('should clear inputs when closing feature modal', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const closeBtn = container.querySelector('#wfl-modal-close');
    const titleInput = container.querySelector('#wfl-feature-title');

    addBtn.click();
    await wait(10);

    titleInput.value = 'Test Feature';
    closeBtn.click();
    await wait(10);

    addBtn.click();
    await wait(10);
    expect(titleInput.value).toBe('');
  });

  it('should open comment modal when clicking comment trigger', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');
    const modal = container.querySelector('#wfl-comment-modal');

    commentTrigger.click();
    await wait(10);

    expect(modal.classList.contains('wfl-active')).toBe(true);
  });

  it('should show skeleton in comment modal while loading', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(10);

    const skeleton = container.querySelector('#wfl-comments-list .wfl-skeleton');
    expect(skeleton).not.toBeNull();
  });

  it('should load comments in modal', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(600); // Wait for API delay

    const comments = container.querySelectorAll('.wfl-comment');
    expect(comments.length).toBeGreaterThanOrEqual(0);
  });

  it('should close comment modal when clicking close button', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');
    const modal = container.querySelector('#wfl-comment-modal');
    const closeBtn = container.querySelector('#wfl-comment-modal-close');

    commentTrigger.click();
    await wait(10);

    closeBtn.click();
    await wait(10);
    expect(modal.classList.contains('wfl-active')).toBe(false);
  });

  it('should clear comment input when closing modal', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');
    const modal = container.querySelector('#wfl-comment-modal');
    const closeBtn = container.querySelector('#wfl-comment-modal-close');

    commentTrigger.click();
    await wait(600);

    const commentInput = container.querySelector('#wfl-comment-input');
    commentInput.value = 'Test comment';

    closeBtn.click();
    await wait(10);

    // Reopen
    commentTrigger.click();
    await wait(10);

    const newInput = container.querySelector('#wfl-comment-input');
    expect(newInput.value).toBe('');
  });
});

// ============================================
// Feature Creation Tests
// ============================================

describe('WPFeatureLoop Feature Creation', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should show error toast when submitting empty form', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const submitBtn = container.querySelector('#wfl-modal-submit');

    addBtn.click();
    await wait(10);

    submitBtn.click();
    await wait(10);

    const toast = container.querySelector('#wfl-toast');
    expect(toast.classList.contains('wfl-active')).toBe(true);
    expect(toast.classList.contains('wfl-toast-error')).toBe(true);
  });

  it('should create feature when form is valid', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const submitBtn = container.querySelector('#wfl-modal-submit');
    const titleInput = container.querySelector('#wfl-feature-title');
    const descInput = container.querySelector('#wfl-feature-desc');
    const initialCount = container.querySelectorAll('.wfl-card').length;

    addBtn.click();
    await wait(10);

    titleInput.value = 'New Test Feature';
    descInput.value = 'This is a test feature description';

    submitBtn.click();
    await wait(800); // Wait for API delay

    const newCount = container.querySelectorAll('.wfl-card').length;
    expect(newCount).toBe(initialCount + 1);
  });

  it('should close modal after creating feature', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const modal = container.querySelector('#wfl-modal');
    const submitBtn = container.querySelector('#wfl-modal-submit');
    const titleInput = container.querySelector('#wfl-feature-title');
    const descInput = container.querySelector('#wfl-feature-desc');

    addBtn.click();
    await wait(10);

    titleInput.value = 'New Test Feature';
    descInput.value = 'This is a test feature description';

    submitBtn.click();
    await wait(800);

    expect(modal.classList.contains('wfl-active')).toBe(false);
  });

  it('should show success toast after creating feature', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const submitBtn = container.querySelector('#wfl-modal-submit');
    const titleInput = container.querySelector('#wfl-feature-title');
    const descInput = container.querySelector('#wfl-feature-desc');

    addBtn.click();
    await wait(10);

    titleInput.value = 'New Test Feature';
    descInput.value = 'This is a test feature description';

    submitBtn.click();
    await wait(800);

    const toast = container.querySelector('#wfl-toast');
    expect(toast.classList.contains('wfl-toast-success')).toBe(true);
  });

  it('should add new feature at the top of the list', async () => {
    const addBtn = container.querySelector('#wfl-add-feature');
    const submitBtn = container.querySelector('#wfl-modal-submit');
    const titleInput = container.querySelector('#wfl-feature-title');
    const descInput = container.querySelector('#wfl-feature-desc');

    addBtn.click();
    await wait(10);

    titleInput.value = 'New First Feature';
    descInput.value = 'This should be at the top';

    submitBtn.click();
    await wait(800);

    const firstCard = container.querySelector('.wfl-card');
    const title = firstCard.querySelector('.wfl-feature-title');
    expect(title.textContent).toBe('New First Feature');
  });
});

// ============================================
// Comment Tests
// ============================================

describe('WPFeatureLoop Comments', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should add comment when clicking submit', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(600); // Wait for comments to load

    const commentInput = container.querySelector('#wfl-comment-input');
    const submitBtn = container.querySelector('#wfl-comment-submit');
    const initialCount = container.querySelectorAll('.wfl-comment').length;

    commentInput.value = 'This is a test comment';
    submitBtn.click();
    await wait(500);

    const newCount = container.querySelectorAll('.wfl-comment').length;
    expect(newCount).toBe(initialCount + 1);
  });

  it('should clear input after adding comment', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(600);

    const commentInput = container.querySelector('#wfl-comment-input');
    const submitBtn = container.querySelector('#wfl-comment-submit');

    commentInput.value = 'This is a test comment';
    submitBtn.click();
    await wait(500);

    const input = container.querySelector('#wfl-comment-input');
    expect(input.value).toBe('');
  });

  it('should update comment count on card after adding comment', async () => {
    const firstCard = container.querySelector('.wfl-card');
    const commentTrigger = firstCard.querySelector('.wfl-comment-trigger');
    const countSpan = commentTrigger.querySelector('span');
    const initialText = countSpan.textContent;
    const initialCount = parseInt(initialText);

    commentTrigger.click();
    await wait(600);

    const commentInput = container.querySelector('#wfl-comment-input');
    const submitBtn = container.querySelector('#wfl-comment-submit');

    commentInput.value = 'New comment';
    submitBtn.click();
    await wait(500);

    // Check the card's comment count was updated
    const newCountSpan = firstCard.querySelector('.wfl-comment-trigger span');
    const newCount = parseInt(newCountSpan.textContent);
    expect(newCount).toBe(initialCount + 1);
  });

  it('should not add empty comments', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(600);

    const submitBtn = container.querySelector('#wfl-comment-submit');
    const initialCount = container.querySelectorAll('.wfl-comment').length;

    // Try to submit empty comment
    submitBtn.click();
    await wait(100);

    const newCount = container.querySelectorAll('.wfl-comment').length;
    expect(newCount).toBe(initialCount);
  });

  it('should add comment when pressing Enter', async () => {
    const commentTrigger = container.querySelector('.wfl-comment-trigger');

    commentTrigger.click();
    await wait(600);

    const commentInput = container.querySelector('#wfl-comment-input');
    const initialCount = container.querySelectorAll('.wfl-comment').length;

    commentInput.value = 'Comment via Enter';
    commentInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    await wait(500);

    const newCount = container.querySelectorAll('.wfl-comment').length;
    expect(newCount).toBe(initialCount + 1);
  });
});

// ============================================
// Public API Tests
// ============================================

describe('WPFeatureLoop Public API', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should return features with getFeatures()', () => {
    const features = wfl.getFeatures();
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
  });

  it('should refresh features with refresh()', async () => {
    const spy = vi.spyOn(wfl.api, 'getFeatures');

    await wfl.refresh();
    await waitForLoad(container);

    expect(spy).toHaveBeenCalled();
  });

  it('should show skeleton during refresh', async () => {
    wfl.refresh(); // Don't await
    await wait(10);

    expect(container.querySelector('.wfl-skeleton')).not.toBeNull();
  });

  it('should destroy widget with destroy()', () => {
    wfl.destroy();

    expect(container.innerHTML).toBe('');
    expect(container.classList.contains('wfl-container')).toBe(false);
  });

  it('should check canCreateFeature() based on role', () => {
    expect(wfl.canCreateFeature()).toBe(true);

    const wfl2 = new WPFeatureLoop({
      ...defaultConfig,
      container: '#wfl-test',
      userRole: 'subscriber'
    });
    expect(wfl2.canCreateFeature()).toBe(false);
  });
});

// ============================================
// API Service Tests
// ============================================

describe('WPFeatureLoop API Service', () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
  });

  it('should fetch features from API', async () => {
    const features = await wfl.api.getFeatures();

    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
    expect(features[0]).toHaveProperty('id');
    expect(features[0]).toHaveProperty('title');
    expect(features[0]).toHaveProperty('votes');
  });

  it('should vote on feature', async () => {
    const result = await wfl.api.vote(1, 'up');

    expect(result.success).toBe(true);
    expect(result.featureId).toBe(1);
    expect(result.voteType).toBe('up');
  });

  it('should fetch comments for feature', async () => {
    const comments = await wfl.api.getComments(1);

    expect(Array.isArray(comments)).toBe(true);
  });

  it('should add comment to feature', async () => {
    const comment = await wfl.api.addComment(1, 'Test comment');

    expect(comment).toHaveProperty('id');
    expect(comment).toHaveProperty('author');
    expect(comment.text).toBe('Test comment');
  });

  it('should create new feature', async () => {
    const feature = await wfl.api.createFeature({
      title: 'Test Feature',
      description: 'Test description',
      category: 'Test'
    });

    expect(feature).toHaveProperty('id');
    expect(feature.title).toBe('Test Feature');
    expect(feature.status).toBe('open');
  });
});

// ============================================
// Translations Tests
// ============================================

describe('WPFeatureLoop Translations', () => {
  afterEach(() => {
    cleanup();
  });

  it('should use English translations by default', async () => {
    createContainer();
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(document.getElementById('wfl-test'));

    expect(wfl.t.title).toBe('Feature Roadmap');
    expect(wfl.t.suggestFeature).toBe('Suggest Feature');
  });

  it('should use Portuguese translations when locale is pt-BR', async () => {
    createContainer();
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: 'pt-BR'
    });
    await wfl.init();
    await waitForLoad(document.getElementById('wfl-test'));

    expect(wfl.t.title).toBe('Roadmap de Features');
    expect(wfl.t.suggestFeature).toBe('Sugerir Feature');
  });

  it('should translate status labels', async () => {
    createContainer();
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: 'pt-BR'
    });

    expect(wfl.t.statusOpen).toBe('Aberto');
    expect(wfl.t.statusPlanned).toBe('Planejado');
    expect(wfl.t.statusProgress).toBe('Em Progresso');
    expect(wfl.t.statusCompleted).toBe('Concluído');
  });
});
