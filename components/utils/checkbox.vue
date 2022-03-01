<template>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">{{ label }}</span>
      <input
        style="transform: rotateX(0) rotateY(180deg)"
        :name="name"
        type="checkbox"
        :value="value"
        class="checkbox checkbox-accent"
        @change="$emit('input')"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'checkboxInput',
  props: ['label', 'value', 'name'],
})
</script>

<style>
</style>
