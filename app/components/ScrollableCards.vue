<script setup>
</script>

<template>
    <div class="cards">
        <div class="card intro-card">html</div>
        <div class="card intro-card">&lt;base&gt;</div>
        <div class="card intro-card">&lt;head&gt;</div>
        <div class="card intro-card">&lt;link&gt;</div>
        <div class="card intro-card">&lt;meta&gt;</div>
        <div class="card intro-card">&lt;script&gt;</div>
        <div class="card intro-card">&lt;style&gt;</div>
        <div class="card intro-card">&lt;title&gt;</div>
        <div class="card intro-card">&lt;body&gt;</div>
        <div class="card intro-card">&lt;address&gt;</div>
        <div class="card intro-card">&lt;article&gt;</div>
        <div class="card intro-card">&lt;aside&gt;</div>
        <div class="card intro-card">&lt;footer&gt;</div>
        <div class="card intro-card">&lt;header&gt;</div>
        <div class="card intro-card">&lt;h1&gt;</div>
        <div class="card intro-card">&lt;article&gt;</div>
        <div class="card intro-card">&lt;aside&gt;</div>
        <div class="card intro-card">&lt;footer&gt;</div>
        <div class="card intro-card">&lt;header&gt;</div>
        <div class="card intro-card">&lt;h1&gt;</div>
    </div>
</template>

<style scoped>
.cards {
    display: grid;
    gap: 1rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(3, 30%);
    height: 100%;
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
        grid-row: span 3;

        &:nth-of-type(4n) {
            grid-row: span 4;
        }

        &:nth-of-type(7n) {
            grid-row: span 5;
        }

        &:nth-of-type(5n) {
            grid-column: span 2;
        }
    }
}
</style>