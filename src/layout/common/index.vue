<template>
  <div>
    <keep-alive :include="['Reserve']">
      <router-view />
    </keep-alive>
  </div>
</template>
