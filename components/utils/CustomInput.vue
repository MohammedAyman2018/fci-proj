<template>
  <div class="form-control w-50 my-1">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input
      v-model.trim.lazy="$v.val.$model"
      v-bind="attrs"
      class="input"
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
import { validationMixin } from 'vuelidate'
const { required, email } = require('vuelidate/lib/validators')

export default Vue.extend({
  mixins: [validationMixin],
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
    message: { type: String, default: () => '' },
  },
  data() {
    return {
      val: '',
    }
  },
  computed: {
    classesVal() {
      return this.shouldValidate && this.$v.val.$error
        ? ['input-error', ...this.classes]
        : this.classes
    },
  },
  validations(): { [key: string]: any } {
    if (this.isEmail) {
      return {
        val: {
          required,
          email,
        },
      }
    } else if (this.isRequried) {
      return { val: { required } }
    } else {
      return { val: {} }
    }
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
