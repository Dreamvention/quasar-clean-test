<template>
  <!-- notice dialogRef here -->
  <q-dialog class="common-modal" :class="`--${type}`" ref="dialogRef" @hide="onDialogHide">
    <q-card class="common-modal__card">
      <div class="common-modal__icon">
        <q-icon v-if="type == openModalTypes.Warning" name="priority_high" />
        <q-icon v-if="type == openModalTypes.Negative" name="close" />
        <q-icon v-if="type == openModalTypes.Positive" name="check" />
        <q-icon v-if="type == openModalTypes.Primary" name="star" />
        <q-icon v-if="type == openModalTypes.Info" name="info" />
      </div>
      <div class="common-modal__title">{{ title }}</div>
      <div class="common-modal__message">{{ message }}</div>
      <q-card-actions align="center">
        <q-btn class="common-modal__button --ok" label="OK" unelevated rounded @click="onOKClick" />
        <q-btn
          v-if="confirm"
          class="common-modal__button --cancel"
          label="Cancel"
          unelevated
          rounded
          @click="onCancelClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar';
import { openModalTypes } from 'src/utils';
import { PropType } from 'vue';

defineProps({
  title: {
    type: String,
    default: () => '',
  },
  message: {
    type: String,
    default: () => '',
  },
  type: {
    type: String as PropType<openModalTypes>,
    default: () => openModalTypes.Primary,
  },
  confirm: {
    type: Boolean,
    default: () => false,
  },
});

defineEmits(useDialogPluginComponent.emits);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const onOKClick = onDialogOK;
const onCancelClick = onDialogCancel;
</script>
<style lang="scss">
//primary - 1f75d1
.common-modal {
  $self: &;

  &.--negative {
    #{$self}__card {
      // background: lighten($negative, 50);
      // color: $negative;
      background: #f24234;
      color: #fff;
    }
    #{$self}__button {
      &.--ok {
        background: #1365c0 !important;
        color: #fff !important;
      }
    }
  }

  &.--positive {
    #{$self}__card {
      // background: lighten($positive, 50);
      // color: $positive;
      background: #76b900;
      color: #fff;
    }
    #{$self}__button {
      &.--ok {
        background: #1365c0 !important;
        color: #fff !important;
      }
    }
  }

  &.--info {
    #{$self}__card {
      background: lighten($info, 25);
      // color: darken($info, 25);
    }
    #{$self}__button {
      &.--ok {
        background: #1365c0 !important;
        color: #fff !important;
      }
    }
  }

  &.--warning {
    #{$self}__card {
      // background: lighten($warning, 25);
      background: #ffee58;
      // color: darken($warning, 50);
    }
    #{$self}__button {
      &.--ok {
        background: #1365c0 !important;
        color: #fff !important;
      }
    }
  }

  &.--primary {
    #{$self}__card {
      // background: lighten($primary, 65);
      color: white;
      background: #1f75d1;
    }
    #{$self}__button {
      &.--ok {
        background: #fff !important;
        color: #000 !important;
      }
      &.--cancel {
        background: #1365c0 !important;
        color: #fff !important;
      }
    }
  }
  &__card {
    padding: 25px;
    text-align: center;
    width: 100%;

    max-width: 460px !important;
    > div {
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
  &__icon {
    padding: 15px;
    border-radius: 100% !important;
    background: rgba(0, 0, 0, 0.05);
    display: inline-block;
    > * {
      font-size: 30px;
    }
  }
  &__title {
    font-size: 20px;
  }
  &__message {
    font-size: 18px;
  }
  &__button {
    width: 170px;
    margin-bottom: 10px;
    &.--ok {
    }
    &.--cancel {
    }
  }
}
</style>
