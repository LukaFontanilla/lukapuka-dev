<script setup lang="ts">
import LlmWorker from '~/assets/workers/llm.worker?worker'
import { onMounted, ref, watchEffect, computed } from "vue";

const props = withDefaults(defineProps<{
  isMini?: boolean
  isMobile?: boolean
}>(), {
  isMini: false,
  isMobile: false
})

// No script logic is needed for just styling
const items = [0, 1, 2, 3]

const webWorker = ref()

const handleClick = () => {
    // Prepare a JSON object
    const message = {
        greeting: 'Hello',
        target: 'World',
        data: 'the packaging was really hard to open and directions unclear'
    }

    // Convert the object to a JSON string and post it to the worker
    webWorker.value.postMessage(JSON.stringify(message))
}

const projects = ref([
    { name: 'MCP Toolbox for Databases', category: 'mcp', link: 'https://github.com/googleapis/mcp-toolbox' },
    { name: 'Looker Agents in Gemini Enterprise', category: 'agents', link: 'https://github.com/lkrdev/looker-oauth-gemini-enterprise' },
    { name: 'Chrome Tab Auto-Classifier', category: 'javascript', link: 'https://github.com/LukaFontanilla/tab-classifier-chrome-extension' },
    { name: 'Project Delta', category: 'experiments', link: '#' }
])


const getProjectIcon = (category: string) => {
  switch (category) {
    case 'mcp': return '⚙'
    case 'agents': return '◈'
    case 'javascript': return '⁛'
    case 'experiments': return '🧪'
    default: return '▲'
  }
}

const getCategoryBadge = (category: string) => {
  switch (category) {
    case 'mcp': return 'MCP TOOL'
    case 'agents': return 'AI AGENT'
    case 'javascript': return 'EXTENSION'
    case 'experiments': return 'EXP'
    default: return 'PROJECT'
  }
}

const vizGroups = [
    {
        name: 'Distributions',
        items: [
            { name: 'Bar Chart', slug: 'bar-chart', glyph: '▮▮' },
            { name: 'Line Chart', slug: 'line-chart', glyph: '∿' },
            { name: 'Scatter Plot', slug: 'scatter-plot', glyph: '·˙' },
            { name: 'Box Plot', slug: 'box-plot', glyph: '⬚' },
            { name: 'Violin', slug: 'violin', glyph: '≀≀' },
            { name: 'Beeswarm', slug: 'beeswarm', glyph: '⁛⁛' }
        ]
    },
    {
        name: 'Hierarchies',
        items: [
            { name: 'Treemap', slug: 'treemap', glyph: '▣' },
            { name: 'Sunburst', slug: 'sunburst', glyph: '◎' },
            { name: 'Dendrogram', slug: 'dendrogram', glyph: '⑂' }
        ]
    },
    {
        name: 'Relationships',
        items: [
            { name: 'Network', slug: 'network', glyph: '◌─◌' },
            { name: 'Sankey', slug: 'sankey', glyph: '⇉' },
            { name: 'Parallel', slug: 'parallel', glyph: '‖' }
        ]
    },
    {
        name: 'Specialized',
        items: [
            { name: 'Heatmap', slug: 'heatmap', glyph: '▓' },
            { name: 'Waffle', slug: 'waffle', glyph: '▦' },
            { name: 'Bubble', slug: 'bubble', glyph: '∘°' },
            { name: 'Choropleth', slug: 'choropleth', glyph: '▨' },
            { name: 'Radar', slug: 'radar', glyph: '⬡' },
            { name: 'Word Cloud', slug: 'word-cloud', glyph: '☁' },
            { name: 'Streamgraph', slug: 'streamgraph', glyph: '≈' },
            { name: 'Voronoi', slug: 'voronoi', glyph: '⬢' }
        ]
    }
]

const activeFilter = ref<string | null>(null)
const toggleFilter = (filter: string) => {
    if (activeFilter.value === filter) {
        activeFilter.value = null
    } else {
        activeFilter.value = filter
    }
}

const filteredProjects = computed(() => {
    if (!activeFilter.value) return projects.value
    return projects.value.filter(p => p.category === activeFilter.value)
})

const activeSection = ref<string | null>('projects')

const toggleSection = (section: string, event: Event) => {
  event.preventDefault()
  if (activeSection.value === section) {
    activeSection.value = null
  } else {
    activeSection.value = section
  }
}

onMounted(() => {
    // const worker = new LlmWorker()

    // webWorker.value = worker

    // // Optionally, handle messages from the worker
    // worker.onmessage = (event) => {
    //   console.log(event.data) // Log the message from the worker
    // }

    const cardsContainer = document.getElementById('cards');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    if (cardsContainer && scrollLeftBtn && scrollRightBtn) {
        // Calculate the width of a single card to scroll by
        const card = cardsContainer.querySelector('.scrollable-cards_item');
        // The scroll amount is the card's width plus the gap
        const scrollAmount = card ? card.offsetWidth + 15 : 215;
        scrollLeftBtn.addEventListener('click', () => {
            cardsContainer.scrollLeft -= scrollAmount;
        });
        scrollRightBtn.addEventListener('click', () => {
            cardsContainer.scrollLeft += scrollAmount;
        });
    }
});
</script>

<template>
    <div class="column sidebar" :class="{ 'sidebar--mini': props.isMini }">
        <!-- Minimal Header when mini on Mobile -->
        <div v-if="props.isMini && props.isMobile" class="minimal-sidebar-header">
            <div class="minimal-title-group">
                <div class="eyebrow-text" style="margin-bottom: 0;">VOL. 01</div>
                <h1 class="minimal-title" @click="handleClick">lukapuka</h1>
            </div>
            <div class="minimal-sub-group">
                <h2>Creative Developer</h2>
            </div>
            <Socials class="socials-mini" />
        </div>

        <!-- Minimal Vertical Sidebar when mini on Desktop -->
        <div v-else-if="props.isMini && !props.isMobile" class="minimal-sidebar-vertical">
            <div class="minimal-vertical-logo" title="lukapuka">
                <span class="vertical-logo-icon" @click="handleClick" style="cursor: pointer;">❖</span>
                <span class="vertical-logo-text">LUKAPUKA</span>
            </div>
            
            <div class="vertical-divider"></div>
            
            <div class="vertical-nav-icons">
                <NuxtLink to="/" class="vertical-nav-btn" title="Home">
                    <span class="nav-btn-icon">🏠</span>
                </NuxtLink>
                <NuxtLink to="/writings" class="vertical-nav-btn" title="Writings">
                    <span class="nav-btn-icon">📝</span>
                </NuxtLink>
                <NuxtLink to="/readings" class="vertical-nav-btn" title="Readings">
                    <span class="nav-btn-icon">📚</span>
                </NuxtLink>
                <NuxtLink to="/listenings" class="vertical-nav-btn" title="Listenings">
                    <span class="nav-btn-icon">🎧</span>
                </NuxtLink>
            </div>
            
            <div class="vertical-social-icons">
                <Socials class="socials-vertical" />
            </div>
        </div>

        <!-- Full Sidebar Content -->
        <template v-else>
            <div class="intro-card field-guide-cover">
                <div class="eyebrow-text">VOL. 01 · EST. 2026</div>
                <h1 @click="handleClick">lukapuka</h1>
                <h2>Creative Developer & Visual Designer</h2>
                <p>
                    A little portfolio, some writing, mostly data and infographics of both real and fictional tales.
                </p>
                <Socials class="socials-large" />
            </div>
            
            <!-- Scrollable Middle Content -->
            <div class="sidebar-scroll-content">
                <div class="hr-title-container">
                    <hr class="style-infographics">
                    <div class="title-wrapper">
                        <span class="title-lang lang-jp">図鑑</span>
                        <span class="title-lang lang-en">INDEX</span>
                    </div>
                </div>
                
                <div class="organic-list">
                    <details class="list-section" :open="activeSection === 'projects'">
                        <summary class="section-header" @click="toggleSection('projects', $event)">PROJECTS</summary>
                        <div class="list-content project-layout-cards">
                            
                            <!-- Dynamic Projects Loop -->
                            <div v-for="(project, index) in filteredProjects" :key="project.name" class="project-row-item">
                                <a :href="project.link" class="project-link-wrapper" :target="project.link !== '#' ? '_blank' : undefined">
                                    <div class="card-inner">
                                      <div class="card-top">
                                        <span class="card-num">NO. 00{{ index + 1 }}</span>
                                        <span class="card-badge">{{ getCategoryBadge(project.category) }}</span>
                                      </div>
                                      <div class="card-main">
                                        <span class="project-icon">{{ getProjectIcon(project.category) }}</span>
                                        <span class="project-name">{{ project.name }}</span>
                                      </div>
                                    </div>
                                </a>
                            </div>

                            <!-- View All row -->
                            <div class="project-row-item view-all-row">
                                <a href="https://github.com/LukaFontanilla" target="_blank" class="project-link-wrapper">
                                    <div class="card-inner">
                                      <div class="card-top">
                                        <span class="card-num">NO. ★</span>
                                        <span class="card-badge">GITHUB</span>
                                      </div>
                                      <div class="card-main">
                                        <span class="project-icon">★</span>
                                        <span class="project-name">View all on GitHub</span>
                                      </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </details>
                </div>
                
                <hr class="style-other" />
                <div class="organic-list">
                    <details class="list-section" :open="activeSection === 'index'">
                        <summary class="section-header" @click="toggleSection('index', $event)">VISUAL INDEX</summary>
                        <div class="list-content">
                            <div class="wip-banner">
                                <div class="wip-badge">WIP</div>
                                <div class="wip-title">Visual Index</div>
                                <div class="wip-desc">An interactive catalog of infographics, custom charts, and topological diagrams.</div>
                                <div class="wip-grid">
                                    <div class="wip-grid-item">
                                        <span>STATUS</span>
                                        <span>DRAFTING</span>
                                    </div>
                                    <div class="wip-grid-item">
                                        <span>PHASE</span>
                                        <span>01 / 03</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>
                    
                    <details class="list-section" style="margin-top: 1rem;" :open="activeSection === 'sites'">
                        <summary class="section-header" @click="toggleSection('sites', $event)">OTHER SITES</summary>
                        <div class="list-content">
                            <div class="wip-banner">
                                <div class="wip-badge">WIP</div>
                                <div class="wip-title">External Hubs</div>
                                <div class="wip-desc">A collection of other related personal projects, blogs, and digital portfolios currently under development.</div>
                                <div class="wip-grid">
                                    <div class="wip-grid-item">
                                        <span>STATUS</span>
                                        <span>DRAFTING</span>
                                    </div>
                                    <div class="wip-grid-item">
                                        <span>PHASE</span>
                                        <span>01 / 03</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
            
            <div class="marginalia">
                <span>↳ pg. 01</span>
                <span>37.7749° N, 122.4194° W</span>
            </div>
        </template>
    </div>
</template>

<style scoped>
@keyframes reveal {
    from {
        opacity: 0.05;
    }

    to {
        opacity: 1;
    }
}

.hr-title-container {
    position: relative;
    /* This is the anchor for the absolute-positioned title */
    text-align: center;
    /* This will center the title wrapper */
    margin-bottom: 15px;
    /* Spacing below the title/hr */
}

.title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Perfectly centers the element */
    padding: 0 0.25em;
    /* Restored your original padding for a tighter fit */
    background-color: var(--clr-bg-primary);
    /* Changed to match card background */
    cursor: default;

    /* NEW: Use Grid to stack the text and auto-size the wrapper */
    display: grid;
    place-items: center;
}

.title-lang {
    /* NEW: Both text elements occupy the same grid cell */
    grid-area: 1 / 1;

    /* REMOVED: absolute positioning and manual centering */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    white-space: nowrap;
    /* Prevents text from wrapping */
    font-size: 14px;
    color: var(--text-color);
    font-weight: normal;
}

.lang-jp {
    opacity: 0.7;
    transform: translateY(0);
}

.lang-en {
    opacity: 0;
    transform: translateY(5px);
}

.title-wrapper:hover .lang-jp {
    opacity: 0;
    transform: translateY(-5px);
}

.title-wrapper:hover .lang-en {
    opacity: 1;
    transform: translateY(0);
}

.notepaper {
    height: 20rem;
    overflow-y: scroll;
    background-image:
        linear-gradient(to bottom, transparent 24px, var(--clr-border) 25px, var(--clr-border) 26px, transparent 27px);
    /* Horizontal lines (blue) */
    background-size: 100% 27px, 25px 100%;
    /* Spacing for lines and margin */
    background-position: 0 0, 40px 0;
    /* Position of lines and margin */
    /* padding: 6px 10px; Padding for content */
    line-height: 27px;
    /* Align text with lines */
    background-attachment: local;
}

.notepaper p {
    margin: 0;
}

.notepaper::-webkit-scrollbar {
    display: none;
}

.column {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
}

.field-guide-cover {
    background-color: var(--clr-bg-secondary);
    border: 0.1rem dashed var(--clr-border);
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    border-radius: 0.6rem;
}

.eyebrow-text {
    font-family: var(--font-family-mono);
    font-size: 0.75rem;
    color: var(--clr-accent-primary);
    margin-bottom: 0.25rem;
    letter-spacing: 0.1em;
}

.socials-large {
    font-size: 1.2rem;
    margin-top: 0.5rem;
}

.style-infographics,
.style-other {
    width: 100%;
    overflow: visible;
    padding: 0;
    border: none;
    border-top: medium double var(--clr-border);
    color: #333;
    text-align: center;
    margin: 1.5rem 0;
}

.style-infographics:after,
.style-other:after {
    height: 100%;
    color: var(--clr-text-primary);
    display: inline-block;
    position: relative;
    border-radius: 50%;
    top: -0.8em;
    font-size: 1em;
    background-color: var(--clr-bg-primary);
    padding: 0 0.25em;
}

.style-other:after {
    content: "他の情報";
}

.group-header {
    font-family: var(--font-family-mono);
    font-size: 0.75rem;
    color: var(--clr-text-muted);
    margin-top: 0.75rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding-left: 0.5rem;
}

.viz-group {
    margin-bottom: 0.5rem;
}

.viz-list-scroll {
    max-height: 15rem;
    overflow-y: auto;
    padding-right: 0.5rem;
}

.viz-list-scroll::-webkit-scrollbar {
    width: 4px;
}

.viz-list-scroll::-webkit-scrollbar-thumb {
    background-color: var(--clr-border);
    border-radius: 2px;
}

.organic-list {
    margin-top: 0.5rem;
    font-family: var(--font-family-sans);
}

.section-header {
    font-family: var(--font-family-mono);
    font-size: 0.9rem;
    color: var(--clr-accent-primary);
    font-weight: bold;
    margin-bottom: 0.5rem;
    letter-spacing: 0.05em;
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
}

.section-header::-webkit-details-marker {
    display: none;
}

.section-header::after {
    content: '▾';
    font-family: var(--font-family-sans);
    margin-left: 0.5rem;
    font-size: 0.8rem;
    transition: transform 0.2s ease;
}

details:not([open]) .section-header::after {
    transform: rotate(-90deg);
}

.list-content {
    margin-top: 0.25rem;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--clr-border);
    position: relative;
}

.list-item:last-child {
    border-bottom: none;
}

.item-icon {
    width: 24px;
    text-align: center;
    margin-right: 0.75rem;
    color: var(--clr-text-secondary);
    font-size: 1.1rem;
}

.item-link {
    color: var(--clr-text-primary);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease, transform 0.2s ease;
    display: block;
    flex: 1;
}

.item-link:hover {
    color: var(--clr-accent-primary);
    transform: translateX(3px);
}

.view-all .item-link {
    color: var(--clr-accent-secondary);
    font-weight: bold;
}

.view-all .item-link:hover {
    color: var(--clr-accent-primary);
}

.marginalia {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-family-mono);
    font-size: 0.75rem;
    color: var(--clr-text-secondary);
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid var(--clr-border);
}

.sidebar--mini {
  padding: 0.5rem !important;
  justify-content: center;
}

.minimal-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--clr-bg-secondary);
  border: 1px dashed var(--clr-border);
  border-radius: 0.6rem;
  gap: 1rem;
  box-sizing: border-box;
}

.minimal-title-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.minimal-title {
  color: var(--clr-accent-primary) !important;
  font-size: 1.4rem !important;
  font-family: 'Oswald', var(--font-family-sans) !important;
  margin: 0 !important;
  cursor: pointer;
}

.minimal-sub-group h2 {
  color: var(--clr-text-secondary) !important;
  font-size: 0.9rem !important;
  margin: 0 !important;
  font-style: italic;
  font-weight: normal !important;
}

.socials-mini {
  font-size: 1rem;
}

.minimal-sidebar-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 1.5rem;
  padding-top: 1rem;
  box-sizing: border-box;
}

.minimal-vertical-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.vertical-logo-icon {
  font-size: 1.5rem;
  color: var(--clr-accent-primary);
  user-select: none;
}

.vertical-logo-text {
  font-family: 'Oswald', var(--font-family-sans);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--clr-text-primary);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin-top: 0.25rem;
}

.vertical-divider {
  width: 30px;
  height: 1px;
  background-color: var(--clr-border);
}

.vertical-nav-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

.vertical-nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--clr-bg-secondary);
  border: 1px solid var(--clr-border);
  color: var(--clr-text-primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.vertical-nav-btn:hover {
  background-color: var(--clr-bg-primary);
  color: var(--clr-accent-primary);
  border-color: var(--clr-accent-primary);
  transform: scale(1.1);
}

.nav-btn-icon {
  font-size: 1.1rem;
}

.vertical-social-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding-bottom: 1rem;
}

:deep(.socials-vertical) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
}

:deep(.socials-vertical .socials) {
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 1.2rem !important;
}

.sidebar-scroll-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.sidebar-scroll-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* --- CORE PROJECT ROW ITEM --- */
.project-row-item {
  position: relative;
  transition: all 0.2s ease;
}

.project-link-wrapper {
  display: flex;
  align-items: center;
  color: var(--clr-text-primary);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: var(--font-weight-medium);
  width: 100%;
  transition: all 0.2s ease;
}

.project-icon {
  width: 24px;
  text-align: center;
  margin-right: 0.5rem;
  color: var(--clr-text-secondary);
  font-size: 1.05rem;
  font-family: var(--font-family-mono);
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.project-name {
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --- CARDS LAYOUT STYLES --- */
.project-layout-cards {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-xs);
  
  /* Localized scrolling */
  max-height: 290px; /* Restricts card block height */
  overflow-y: auto;
  padding-right: 6px; /* Breathing room for scrollbar */
  padding-bottom: 50px; /* Increased scroll pad to push the last card fully up */
}

/* Custom delicate scrollbar for cards container */
.project-layout-cards::-webkit-scrollbar {
  width: 4px;
}

.project-layout-cards::-webkit-scrollbar-track {
  background: transparent;
}

.project-layout-cards::-webkit-scrollbar-thumb {
  background-color: var(--clr-border);
  border-radius: 2px;
}

.project-layout-cards .project-row-item {
  border: none;
}

.project-layout-cards .project-link-wrapper {
  padding: 0;
}

.card-inner {
  width: 100%;
  background-color: var(--clr-bg-primary);
  border: 1px dashed var(--clr-border);
  border-radius: var(--border-radius-sm);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-family-mono);
  font-size: 0.62rem;
  color: var(--clr-text-muted);
  border-bottom: 1px dotted var(--clr-border);
  padding-bottom: var(--spacing-xs);
}

.card-badge {
  text-transform: uppercase;
  font-weight: bold;
}

.card-main {
  display: flex;
  align-items: center;
}

.project-layout-cards .project-row-item:hover .card-inner {
  border: 1px solid var(--clr-accent-primary);
  background-color: var(--clr-bg-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.project-layout-cards .project-row-item:hover .project-link-wrapper {
  color: var(--clr-accent-primary);
}

.project-layout-cards .project-row-item:hover .project-icon {
  transform: scale(1.1);
  color: var(--clr-accent-primary);
}

/* Custom view-all adjustments */
.project-layout-cards .view-all-row .card-inner {
  border-style: dotted;
}

.view-all-row .project-link-wrapper {
  color: var(--clr-accent-secondary);
  font-weight: bold;
}

.view-all-row:hover .project-link-wrapper {
  color: var(--clr-accent-primary) !important;
}

/* --- WIP / COMING SOON PLACEHOLDERS --- */
.wip-banner {
  padding: var(--spacing-md);
  background-color: var(--clr-bg-primary);
  border: 1px dashed var(--clr-border);
  border-radius: var(--border-radius-sm);
  font-family: var(--font-family-mono);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  position: relative;
  overflow: hidden;
  margin-top: var(--spacing-xs);
}

.wip-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: var(--clr-accent-primary);
}

.wip-badge {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: bold;
  color: var(--clr-accent-primary);
  border: 1px solid var(--clr-accent-primary);
  padding: 1px 5px;
  border-radius: var(--border-radius-sm);
  width: fit-content;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background-color: rgba(217, 111, 46, 0.05);
}

.wip-badge--standby {
  color: var(--clr-text-muted);
  border-color: var(--clr-border);
  background-color: rgba(141, 155, 169, 0.05);
}

.wip-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: var(--clr-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.wip-desc {
  font-size: 0.72rem;
  color: var(--clr-text-secondary);
  line-height: 1.4;
  font-family: var(--font-family-sans);
}

.wip-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
  border-top: 1px dotted var(--clr-border);
  padding-top: var(--spacing-sm);
  margin-top: var(--spacing-xs);
}

.wip-grid-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wip-grid-item span:first-child {
  font-size: 0.58rem;
  color: var(--clr-text-muted);
  font-weight: bold;
  letter-spacing: 0.05em;
}

.wip-grid-item span:last-child {
  font-size: 0.65rem;
  color: var(--clr-text-secondary);
}

@media (max-width: 1100px) {
  .column {
    height: auto !important;
  }

  .sidebar-scroll-content {
    flex: none !important;
    height: auto !important;
    overflow-y: visible !important;
  }

  .project-layout-cards {
    max-height: none !important;
    overflow-y: visible !important;
    padding-bottom: var(--spacing-md) !important;
  }
}
</style>