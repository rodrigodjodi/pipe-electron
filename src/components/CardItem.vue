<template>
    <div class="item-card">
        <slot name="img"></slot>
        <slot></slot>  
    </div>
</template>

<script>
export default {
  name: "cardItem"
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
