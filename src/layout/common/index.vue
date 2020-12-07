<template>
  <div>
    <keep-alive :include="['Reserve', 'SelectCity']">
      <router-view />
    </keep-alive>
  </div>
</template>
