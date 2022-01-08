<template>
  <div class="form-control w-50 my-1">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input
      v-model.trim.lazy="$v.val.$model"
      v-bind="attrs"
      :class="classesVal"
      @change="handleInput"
    />
    <label v-if="shouldValidate && $v.val.$error" class="label">
      <span class="label-text-alt">{{ message }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isRequried: { type: Boolean, default: () => false },
    isEmail: { type: Boolean, default: () => false },
    shouldValidate: { type: Boolean, default: () => false },
    label: { type: String, required: true },
    attrs: {
      type: Object,
      required: true,
    },
    classes: { type: Array, default: () => ['input', 'input-bordered'] },
    initialValue: { type: String, default: () => '' },
    message: { type: String, default: () => '' },
  },
  data() {
    return {
      changedOnce: 0,
      val: '',
    }
  },
  computed: {
    classesVal(): any[] {
      return this.shouldValidate && this.$v.val.$error
        ? ['input-error', ...this.classes]
        : this.classes
    },
  },
  watch: {
    initialValue(val: string) {
      if (this.changedOnce === 0) {
        this.val = val
        this.changedOnce++
      }
    },
  },
  methods: {
    handleInput() {
      this.$emit('changed', this.$v.val.$model)
    },
  },
})
</script>

<style scoped>
</style>
