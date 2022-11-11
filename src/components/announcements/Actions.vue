<template>
  <template v-if="action.learningObject && !action.learningObject?.isDeadlinePassed">
    <q-btn
      v-if="
        action.buttonAction == ButtonActionTypes.EnrollNow &&
        action.learningObject &&
        action.learningObject?.isEnrollable
      "
      unelevated
      color="primary"
      size="sm"
      @click="enroll(action.learningObject)"
      >+ {{ action.buttonLabel }}</q-btn
    >
    <!-- <q-btn
      v-if="
        action.buttonAction == ButtonActionTypes.EnrollNow &&
        action.learningObject &&
        action.learningObject?.isDeadlinePassed
      "
      outline
      unelevated
      text-color="secondary"
      color="secondary"
      size="sm"
      >Deadline passed</q-btn
    > -->
    <q-btn
      v-if="action.buttonAction == ButtonActionTypes.GoToCourse"
      unelevated
      color="primary"
      size="sm"
      @click="view(action)"
      >+ {{ action.buttonLabel }}</q-btn
    >
  </template>
  <template v-else>
    <q-btn
      v-if="action.buttonAction == ButtonActionTypes.GoToUrl"
      target="_blank"
      unelevated
      color="primary"
      size="sm"
      @click="goToUrl(action)"
      >{{ action.buttonLabel }}</q-btn
    >
    <q-btn
      v-else
      unelevated
      color="primary"
      size="sm"
      @click="
        openModal({
          title: 'Warning',
          message:
            'Oops, It looks like this content is not available at the moment. Please contact your Learning Manager for the details!',
          type: openModalTypes.Warning,
        })
      "
      >{{ action.buttonLabel }}</q-btn
    ></template
  >
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
// import { useStore } from 'src/stores';
import { useRouter } from 'vue-router';
import { formatLink, openModal, openModalTypes } from 'src/utils';
import { ILearningObject, ButtonActionTypes, IAction } from 'domain/entities';

// const store = useStore();
const router = useRouter();
const emit = defineEmits<{
  (e: 'click'): void;
}>();

defineProps({
  action: {
    type: Object as PropType<IAction>,
    default: () => null,
  },
});
const enroll = async (learningObject: ILearningObject | undefined) => {
  if (
    learningObject &&
    learningObject?.id &&
    learningObject?.instances &&
    learningObject?.instances?.length > 0 &&
    learningObject?.instances[0].id
  ) {
    // const enroll = await store.learningObjects.enroll(learningObject, learningObject.instances[0].id);
    // if (enroll)
    emit('click');
  }
};

const view = (action: IAction | undefined) => {
  try {
    if (action?.learningObject && action?.courseId) {
      action.learningObject.validateBeforeEnroll();

      void router.push(formatLink(action.courseId));
      emit('click');
    }
  } catch (e) {
    void openModal({
      title: 'Warning',
      message:
        'Oops, It looks like this content is not available at the moment. Please contact your Learning Manager for the details!',
      type: openModalTypes.Warning,
    });
  }
};

const goToUrl = (action: IAction | undefined) => {
  try {
    if (action?.url) {
      window.open(action.url);
      emit('click');
    }
  } catch (e) {
    void openModal({
      title: 'Warning',
      message:
        'Oops, It looks like this content is not available at the moment. Please contact your Learning Manager for the details!',
      type: openModalTypes.Warning,
    });
  }
};
</script>
