<script setup>
</script>

<template>
    <div class="cards">
        <div class="card intro-card clickable">Bar Chart</div>
        <div class="card intro-card clickable">Line Chart</div>
        <div class="card intro-card clickable">Scatter Plot</div>
        <div class="card intro-card clickable">Heatmap</div>
        <div class="card intro-card clickable">Treemap</div>
        <div class="card intro-card clickable">Network</div>
        <div class="card intro-card clickable">Choropleth</div>
        <div class="card intro-card clickable">Radar</div>
        <div class="card intro-card clickable">Box Plot</div>
        <div class="card intro-card clickable">Violin</div>
        <div class="card intro-card clickable">Bubble</div>
        <div class="card intro-card clickable">Sunburst</div>
        <div class="card intro-card clickable">Sankey</div>
        <div class="card intro-card clickable">Word Cloud</div>
        <div class="card intro-card clickable">Parallel</div>
        <div class="card intro-card clickable">Streamgraph</div>
        <div class="card intro-card clickable">Waffle</div>
        <div class="card intro-card clickable">Beeswarm</div>
        <div class="card intro-card clickable">Dendrogram</div>
        <div class="card intro-card clickable">Voronoi</div>
    </div>
</template>

<style scoped>
.cards {
    display: grid;
    gap: 0.25rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
}

.clickable {
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clickable:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@keyframes slide-fade-in {
    from {
        opacity: 0;
        box-shadow: none;
        transform: scale(0.6) translateY(15vh);
    }
}

@supports (animation-timeline: view()) {
    .card {
        animation: slide-fade-in both;
        animation-timeline: view();
        animation-range: contain 0% contain 20%;
    }
}

.cards {
    &>.card {
        display: grid;
        place-content: center;
        grid-row: span 6;
        padding: 0.6rem;
        text-align: center;
        font-size: 1rem;

        &:nth-of-type(3n) {
            grid-row: span 8;
        }

        &:nth-of-type(5n) {
            grid-row: span 10;
        }

        &:nth-of-type(4n) {
            grid-column: span 2;
        }
    }
}
</style>