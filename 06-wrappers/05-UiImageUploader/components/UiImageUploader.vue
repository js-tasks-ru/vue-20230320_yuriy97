<template>
  <div class="image-uploader">
    <label 
      class="image-uploader__preview" 
      :class="{'image-uploader__preview-loading': isLoading}" 
      :style="image ?`--bg-url: url(${image})`:''">
      <span class="image-uploader__text">{{ previewText }}</span>
      <input 
        type="file" 
        accept="image/*" 
        class="image-uploader__input"
        ref="input"
        v-bind="$attrs" 
        @change="uploadImage"
        @click="removeImage"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default:''
    },
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      isLoading: false,
      image: this.preview,
    };
  },

  computed: {
    previewText(){
      return this.isLoading ? 'Загрузка...' : this.image ? 'Удалить изображение?' : 'Загрузить изображение';
    },
  },

  methods: {
    async uploadImage($event){
      const file = $event.target.files[0];
      this.$emit('select',file);
      
      if(this.uploader){
        try{
          this.isLoading = true;
          const result = await this.uploader(file);
          this.image = result.image;
          this.$emit('upload',result);

        }catch(error){
          this.$refs.input.value = '';
          this.$emit('error',error);
        } 
      }else
        this.image = URL.createObjectURL(file);
      
      this.isLoading = false;
    },

    removeImage($event){
      if(!this.isLoading && this.image){
        $event.preventDefault();
        this.image = '';
        this.$refs.input.value = '';
        this.$emit('remove');
      }
    }
  }
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
