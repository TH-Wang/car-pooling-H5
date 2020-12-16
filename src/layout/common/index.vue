<template>
  <div>
    <keep-alive :include="['Reserve', 'EditTrip']">
      <router-view />
    </keep-alive>
  </div>
</template>
