<template>
  <svg class="loading-circle">
    <circle class="path" cx="8" cy="8" r="7" fill="none" />
  </svg>
</template>
<style lang="scss">
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 50;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 30, 50;
    stroke-dashoffset: -10px;
  }
  100% {
    stroke-dasharray: 30, 50;
    // stroke-dashoffset: -35px;
    stroke-dashoffset: -40px;
  }
}
.loading-circle {
  animation: rotating 2s linear infinite;
  .path {
    stroke: currentColor;
    stroke-width: 1;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    stroke-dasharray: 30, 50;
    animation: loading-dash 1.5s ease-in-out infinite;
  }
}
</style>