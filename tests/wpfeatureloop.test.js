import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import WPFeatureLoop from "../src/wpfeatureloop.js";

/**
 * Mock data
 */
const mockFeatures = [
  {
    id: "feat_1",
    title: "Dark Mode Support",
    description: "Add a dark mode theme option.",
    votes: 47,
    userVote: null,
    status: "planned",
    commentsCount: 2,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "feat_2",
    title: "Export Data to CSV",
    description: "Allow users to export data in CSV format.",
    votes: 32,
    userVote: null,
    status: "in-progress",
    commentsCount: 1,
    createdAt: "2024-01-10T14:30:00Z",
  },
  {
    id: "feat_3",
    title: "API Webhooks",
    description: "Implement webhooks for external services.",
    votes: 28,
    userVote: "up",
    status: "open",
    commentsCount: 5,
    createdAt: "2024-01-08T09:15:00Z",
  },
];

const mockComments = [
  {
    id: "comm_1",
    author: "Sarah M.",
    initials: "SM",
    text: "This would be amazing!",
    time: "2 days ago",
    isTeamReply: false,
  },
  {
    id: "comm_2",
    author: "Dev Team",
    initials: "DT",
    text: "We're planning this for the next release!",
    time: "1 day ago",
    isTeamReply: true,
  },
];

/**
 * Mock fetch responses
 */
function createFetchMock() {
  return vi.fn((url, options = {}) => {
    const method = options.method || "GET";

    // GET /features
    if (url.endsWith("/features") && method === "GET") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFeatures),
      });
    }

    // POST /features
    if (url.endsWith("/features") && method === "POST") {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: "feat_new_" + Date.now(),
            title: body.title,
            description: body.description,
            votes: 1,
            userVote: "up",
            status: "open",
            commentsCount: 0,
            createdAt: new Date().toISOString(),
          }),
      });
    }

    // POST /features/:id/vote
    if (url.includes("/vote") && method === "POST") {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            featureId: url.split("/features/")[1].split("/vote")[0],
            vote: body.vote === "none" ? null : body.vote,
            totalVotes: body.vote === "up" ? 48 : body.vote === "down" ? 46 : 47,
          }),
      });
    }

    // GET /features/:id/comments
    if (url.includes("/comments") && method === "GET") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockComments),
      });
    }

    // POST /features/:id/comments
    if (url.includes("/comments") && method === "POST") {
      const body = JSON.parse(options.body);
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: "comm_new_" + Date.now(),
            author: "Test User",
            initials: "TU",
            text: body.text,
            time: "Just now",
            isTeamReply: false,
          }),
      });
    }

    // Default: 404
    return Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: "Not found" }),
    });
  });
}

/**
 * Helper to create a container element
 */
function createContainer(id = "wfl-test") {
  const container = document.createElement("div");
  container.id = id;
  document.body.appendChild(container);
  return container;
}

/**
 * Helper to cleanup container
 */
function cleanup(id = "wfl-test") {
  const container = document.getElementById(id);
  if (container) {
    container.remove();
  }
}

/**
 * Default config for tests
 */
const defaultConfig = {
  container: "#wfl-test",
  publicKey: "pk_test_123",
  projectId: "proj_test_abc",
  user: {
    id: 1,
    name: "Test User",
    email: "test@example.com",
  },
  signature: "test_signature",
  userRole: "administrator",
  allowedRoles: ["administrator"],
};

/**
 * Wait for async operations
 */
const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Wait for loading to complete (skeleton to disappear)
 */
const waitForLoad = async (container, timeout = 2000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (!container.querySelector(".wfl-skeleton")) {
      return true;
    }
    await wait(50);
  }
  return false;
};

// ============================================
// Initialization Tests
// ============================================

describe("WPFeatureLoop Initialization", () => {
  beforeEach(() => {
    createContainer();
    global.fetch = createFetchMock();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should create instance with valid config", () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    expect(wfl).toBeInstanceOf(WPFeatureLoop);
    expect(wfl.config.publicKey).toBe("pk_test_123");
    expect(wfl.config.projectId).toBe("proj_test_abc");
  });

  it("should throw error if container is missing", () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        container: undefined,
      });
    }).toThrow("container is required");
  });

  it("should throw error if publicKey is missing", () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        publicKey: undefined,
      });
    }).toThrow("publicKey is required");
  });

  it("should throw error if projectId is missing", () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        projectId: undefined,
      });
    }).toThrow("projectId is required");
  });

  it("should throw error if user.id is missing", () => {
    expect(() => {
      new WPFeatureLoop({
        ...defaultConfig,
        user: { name: "Test" },
      });
    }).toThrow("user.id is required");
  });

  it("should throw error if container element not found", async () => {
    cleanup(); // Remove container
    const wfl = new WPFeatureLoop(defaultConfig);

    await expect(wfl.init()).rejects.toThrow('Container "#wfl-test" not found');
  });

  it("should use default locale if not provided", () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    expect(wfl.locale).toBe("en");
  });

  it("should use provided locale", () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: "pt-BR",
    });
    expect(wfl.locale).toBe("pt-BR");
  });

  it("should fallback to english for unknown locale", () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: "unknown",
    });
    expect(wfl.t.title).toBe("What's Next?");
  });

  it("should have version property", () => {
    expect(WPFeatureLoop.version).toBeDefined();
  });

  it("should have static init method", () => {
    expect(typeof WPFeatureLoop.init).toBe("function");
  });
});

// ============================================
// Rendering Tests
// ============================================

describe("WPFeatureLoop Rendering", () => {
  let container;

  beforeEach(() => {
    container = createContainer();
    global.fetch = createFetchMock();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should render skeleton while loading", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);

    // Set container and render skeleton
    wfl.container = container;
    wfl.container.classList.add("wfl-container");
    wfl.renderSkeleton();

    expect(container.querySelector(".wfl-skeleton")).not.toBeNull();
    expect(container.querySelectorAll(".wfl-skeleton-card").length).toBe(1);
  });

  it("should render header with title", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const title = container.querySelector(".wfl-title");
    expect(title).not.toBeNull();
    expect(title.textContent).toBe("What's Next?");
  });

  it("should render header with Portuguese title", async () => {
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: "pt-BR",
    });
    await wfl.init();
    await waitForLoad(container);

    const title = container.querySelector(".wfl-title");
    expect(title.textContent).toBe("O que vem por aí?");
  });

  it("should render suggest button for allowed roles", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const btn = container.querySelector("#wfl-add-feature");
    expect(btn).not.toBeNull();
    expect(btn.textContent).toContain("Suggest Feature");
  });

  it("should render feature cards", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const cards = container.querySelectorAll(".wfl-card");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("should render vote buttons on cards", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const upBtn = container.querySelector(".wfl-vote-up");
    const downBtn = container.querySelector(".wfl-vote-down");
    expect(upBtn).not.toBeNull();
    expect(downBtn).not.toBeNull();
  });

  it("should render vote count", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const voteCount = container.querySelector(".wfl-vote-count");
    expect(voteCount).not.toBeNull();
  });

  it("should render status badges", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const status = container.querySelector(".wfl-status");
    expect(status).not.toBeNull();
  });

  it("should render comment triggers", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const commentTrigger = container.querySelector(".wfl-comment-trigger");
    expect(commentTrigger).not.toBeNull();
  });

  it("should render modals", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const featureModal = container.querySelector("#wfl-modal");
    const commentModal = container.querySelector("#wfl-comment-modal");
    expect(featureModal).not.toBeNull();
    expect(commentModal).not.toBeNull();
  });

  it("should render toast container", async () => {
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);

    const toast = container.querySelector("#wfl-toast");
    expect(toast).not.toBeNull();
  });
});

// ============================================
// Voting Tests
// ============================================

describe("WPFeatureLoop Voting", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should upvote a feature", async () => {
    const firstCard = container.querySelector(".wfl-card");
    const upBtn = firstCard.querySelector(".wfl-vote-up");
    const voteCount = firstCard.querySelector(".wfl-vote-count");
    const initialVotes = parseInt(voteCount.textContent);

    upBtn.click();
    await wait(50);

    expect(parseInt(voteCount.textContent)).toBe(initialVotes + 1);
    expect(upBtn.classList.contains("wfl-voted")).toBe(true);
  });

  it("should downvote a feature", async () => {
    const firstCard = container.querySelector(".wfl-card");
    const downBtn = firstCard.querySelector(".wfl-vote-down");
    const voteCount = firstCard.querySelector(".wfl-vote-count");
    const initialVotes = parseInt(voteCount.textContent);

    downBtn.click();
    await wait(50);

    // After downvote, votes should decrease
    expect(parseInt(voteCount.textContent)).toBeLessThan(initialVotes);
    expect(downBtn.classList.contains("wfl-voted")).toBe(true);
  });

  it("should show positive class for positive votes", async () => {
    const firstCard = container.querySelector(".wfl-card");
    const upBtn = firstCard.querySelector(".wfl-vote-up");
    const voteCount = firstCard.querySelector(".wfl-vote-count");

    upBtn.click();
    await wait(50);

    expect(voteCount.classList.contains("wfl-vote-positive")).toBe(true);
  });

  it("should animate vote count on change", async () => {
    const firstCard = container.querySelector(".wfl-card");
    const upBtn = firstCard.querySelector(".wfl-vote-up");
    const voteCount = firstCard.querySelector(".wfl-vote-count");

    upBtn.click();
    await wait(10);

    expect(voteCount.classList.contains("wfl-animating")).toBe(true);
  });
});

// ============================================
// Modal Tests
// ============================================

describe("WPFeatureLoop Modals", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should open feature modal when clicking suggest button", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const modal = container.querySelector("#wfl-modal");

    addBtn.click();
    await wait(10);

    expect(modal.classList.contains("wfl-active")).toBe(true);
  });

  it("should close feature modal when clicking close button", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const modal = container.querySelector("#wfl-modal");
    const closeBtn = container.querySelector("#wfl-modal-close");

    addBtn.click();
    await wait(10);
    expect(modal.classList.contains("wfl-active")).toBe(true);

    closeBtn.click();
    await wait(10);
    expect(modal.classList.contains("wfl-active")).toBe(false);
  });

  it("should close feature modal when clicking cancel button", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const modal = container.querySelector("#wfl-modal");
    const cancelBtn = container.querySelector("#wfl-modal-cancel");

    addBtn.click();
    await wait(10);

    cancelBtn.click();
    await wait(10);
    expect(modal.classList.contains("wfl-active")).toBe(false);
  });

  it("should close feature modal when clicking overlay", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const modal = container.querySelector("#wfl-modal");

    addBtn.click();
    await wait(10);

    modal.click(); // Click on overlay
    await wait(10);
    expect(modal.classList.contains("wfl-active")).toBe(false);
  });

  it("should clear inputs when closing feature modal", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const closeBtn = container.querySelector("#wfl-modal-close");
    const titleInput = container.querySelector("#wfl-feature-title");

    addBtn.click();
    await wait(10);

    titleInput.value = "Test Feature";
    closeBtn.click();
    await wait(10);

    addBtn.click();
    await wait(10);
    expect(titleInput.value).toBe("");
  });

  it("should open comment modal when clicking comment trigger", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");
    const modal = container.querySelector("#wfl-comment-modal");

    commentTrigger.click();
    await wait(10);

    expect(modal.classList.contains("wfl-active")).toBe(true);
  });

  it("should close comment modal when clicking close button", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");
    const modal = container.querySelector("#wfl-comment-modal");
    const closeBtn = container.querySelector("#wfl-comment-modal-close");

    commentTrigger.click();
    await wait(10);

    closeBtn.click();
    await wait(10);
    expect(modal.classList.contains("wfl-active")).toBe(false);
  });
});

// ============================================
// Feature Creation Tests
// ============================================

describe("WPFeatureLoop Feature Creation", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should show error toast when submitting empty form", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const submitBtn = container.querySelector("#wfl-modal-submit");

    addBtn.click();
    await wait(10);

    submitBtn.click();
    await wait(10);

    const toast = container.querySelector("#wfl-toast");
    expect(toast.classList.contains("wfl-active")).toBe(true);
    expect(toast.classList.contains("wfl-toast-error")).toBe(true);
  });

  it("should create feature when form is valid", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const submitBtn = container.querySelector("#wfl-modal-submit");
    const titleInput = container.querySelector("#wfl-feature-title");
    const descInput = container.querySelector("#wfl-feature-desc");
    const initialCount = container.querySelectorAll(".wfl-card").length;

    addBtn.click();
    await wait(10);

    titleInput.value = "New Test Feature";
    descInput.value = "This is a test feature description";

    submitBtn.click();
    await wait(200);

    const newCount = container.querySelectorAll(".wfl-card").length;
    expect(newCount).toBe(initialCount + 1);
  });

  it("should close modal after creating feature", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const modal = container.querySelector("#wfl-modal");
    const submitBtn = container.querySelector("#wfl-modal-submit");
    const titleInput = container.querySelector("#wfl-feature-title");
    const descInput = container.querySelector("#wfl-feature-desc");

    addBtn.click();
    await wait(10);

    titleInput.value = "New Test Feature";
    descInput.value = "This is a test feature description";

    submitBtn.click();
    await wait(200);

    expect(modal.classList.contains("wfl-active")).toBe(false);
  });

  it("should show success toast after creating feature", async () => {
    const addBtn = container.querySelector("#wfl-add-feature");
    const submitBtn = container.querySelector("#wfl-modal-submit");
    const titleInput = container.querySelector("#wfl-feature-title");
    const descInput = container.querySelector("#wfl-feature-desc");

    addBtn.click();
    await wait(10);

    titleInput.value = "New Test Feature";
    descInput.value = "This is a test feature description";

    submitBtn.click();
    await wait(200);

    const toast = container.querySelector("#wfl-toast");
    expect(toast.classList.contains("wfl-toast-success")).toBe(true);
  });
});

// ============================================
// Comment Tests
// ============================================

describe("WPFeatureLoop Comments", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should load comments when opening modal", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");

    commentTrigger.click();
    await wait(200);

    const comments = container.querySelectorAll(".wfl-comment");
    expect(comments.length).toBeGreaterThan(0);
  });

  it("should add comment when clicking submit", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");

    commentTrigger.click();
    await wait(200);

    const commentInput = container.querySelector("#wfl-comment-input");
    const submitBtn = container.querySelector("#wfl-comment-submit");
    const initialCount = container.querySelectorAll(".wfl-comment").length;

    commentInput.value = "This is a test comment";
    submitBtn.click();
    await wait(200);

    const newCount = container.querySelectorAll(".wfl-comment").length;
    expect(newCount).toBe(initialCount + 1);
  });

  it("should clear input after adding comment", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");

    commentTrigger.click();
    await wait(200);

    const commentInput = container.querySelector("#wfl-comment-input");
    const submitBtn = container.querySelector("#wfl-comment-submit");

    commentInput.value = "This is a test comment";
    submitBtn.click();
    await wait(200);

    const input = container.querySelector("#wfl-comment-input");
    expect(input.value).toBe("");
  });

  it("should not add empty comments", async () => {
    const commentTrigger = container.querySelector(".wfl-comment-trigger");

    commentTrigger.click();
    await wait(200);

    const submitBtn = container.querySelector("#wfl-comment-submit");
    const initialCount = container.querySelectorAll(".wfl-comment").length;

    submitBtn.click();
    await wait(100);

    const newCount = container.querySelectorAll(".wfl-comment").length;
    expect(newCount).toBe(initialCount);
  });
});

// ============================================
// Public API Tests
// ============================================

describe("WPFeatureLoop Public API", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should return features with getFeatures()", () => {
    const features = wfl.getFeatures();
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
  });

  it("should refresh features with refresh()", async () => {
    const spy = vi.spyOn(wfl.api, "getFeatures");

    await wfl.refresh();
    await waitForLoad(container);

    expect(spy).toHaveBeenCalled();
  });

  it("should show skeleton during refresh", () => {
    // Directly test the skeleton rendering
    wfl.renderSkeleton();
    expect(container.querySelector(".wfl-skeleton")).not.toBeNull();
  });

  it("should destroy widget with destroy()", () => {
    wfl.destroy();

    expect(container.innerHTML).toBe("");
    expect(container.classList.contains("wfl-container")).toBe(false);
  });

  it("should always allow creating features", () => {
    expect(wfl.canCreateFeature()).toBe(true);
  });
});

// ============================================
// API Service Tests
// ============================================

describe("WPFeatureLoop API Service", () => {
  let container;
  let wfl;

  beforeEach(async () => {
    container = createContainer();
    global.fetch = createFetchMock();
    wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(container);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should fetch features from API", async () => {
    const features = await wfl.api.getFeatures();

    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBeGreaterThan(0);
    expect(features[0]).toHaveProperty("id");
    expect(features[0]).toHaveProperty("title");
    expect(features[0]).toHaveProperty("votes");
  });

  it("should vote on feature", async () => {
    const result = await wfl.api.vote("feat_1", "up");

    expect(result.success).toBe(true);
    expect(result.vote).toBe("up");
  });

  it("should fetch comments for feature", async () => {
    const comments = await wfl.api.getComments("feat_1");

    expect(Array.isArray(comments)).toBe(true);
    expect(comments.length).toBeGreaterThan(0);
  });

  it("should add comment to feature", async () => {
    const comment = await wfl.api.addComment("feat_1", "Test comment");

    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("author");
    expect(comment.text).toBe("Test comment");
  });

  it("should create new feature", async () => {
    const feature = await wfl.api.createFeature({
      title: "Test Feature",
      description: "Test description",
    });

    expect(feature).toHaveProperty("id");
    expect(feature.title).toBe("Test Feature");
    expect(feature.status).toBe("open");
  });
});

// ============================================
// Translations Tests
// ============================================

describe("WPFeatureLoop Translations", () => {
  beforeEach(() => {
    global.fetch = createFetchMock();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("should use English translations by default", async () => {
    createContainer();
    const wfl = new WPFeatureLoop(defaultConfig);
    await wfl.init();
    await waitForLoad(document.getElementById("wfl-test"));

    expect(wfl.t.title).toBe("What's Next?");
    expect(wfl.t.suggestFeature).toBe("Suggest Feature");
  });

  it("should use Portuguese translations when locale is pt-BR", async () => {
    createContainer();
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: "pt-BR",
    });
    await wfl.init();
    await waitForLoad(document.getElementById("wfl-test"));

    expect(wfl.t.title).toBe("O que vem por aí?");
    expect(wfl.t.suggestFeature).toBe("Sugerir Feature");
  });

  it("should translate status labels", async () => {
    createContainer();
    const wfl = new WPFeatureLoop({
      ...defaultConfig,
      locale: "pt-BR",
    });

    expect(wfl.t.statusOpen).toBe("Aberto");
    expect(wfl.t.statusPlanned).toBe("Planejado");
    expect(wfl.t.statusProgress).toBe("Em Progresso");
    expect(wfl.t.statusCompleted).toBe("Concluído");
  });
});
