<template>
    <div class="bg-gray-400 h-16 w-12 relative" style="border-radius: 100%;">
        <div class="flex bg-gray-900 dark:bg-dark-900 h-8 w-6 absolute bottom-2 animated-eye" style="border-radius: 100%;"></div>
    </div>
</template>


<style>
.animated-eye {
    animation: eye-rotate 2s ease-in-out infinite alternate;
}

@keyframes eye-rotate {
    from {
        left: 0.25rem;
    }
    to {
        left: 1.25rem;
    }
}
</style>