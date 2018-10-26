<template>
    <router-link :to="linkTo" tag="div" append class="item-card">
        <slot name="img"></slot>
        <slot></slot>  
    </router-link>
</template>

<script>
export default {
  name: "cardItem",
  props: ["linkTo"]
};
</script>

<style>
.item-card {
  margin-bottom: 8px;
  border-radius: 4px;
  background: #505050;
  min-height: 32px;
  padding: 4px 6px;
  cursor: pointer;
}
</style>
