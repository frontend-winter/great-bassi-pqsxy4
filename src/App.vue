<template>
  <div>
    <a-upload
      :customRequest="handleUpload"
      multiple
      :beforeUpload="beforeUpload"
    >
      <a-button icon="upload">Click to Upload</a-button>
    </a-upload>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { Upload, Button } from 'ant-design-vue';

const fileList = ref([]);
let lastSelectedFile = ref(null);

const handleUpload = (options) => {
  const { onSuccess, onError, file, onProgress } = options;

  fileList.value.push(file);

  // 检查是否是最后一个文件
  if (file === lastSelectedFile.value) {
    const formData = new FormData();
    fileList.value.forEach((f, index) => {
      formData.append(`file${index + 1}`, f);
    });

    axios.post('/api/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    })
    .then(response => {
      onSuccess(response.data);
      fileList.value = []; // 清空文件队列
    })
    .catch(error => {
      onError(error);
    });
  }
};

const beforeUpload = (file, fileList) => {
  lastSelectedFile.value = fileList[fileList.length - 1];
  return false; // 阻止默认上传行为
};
</script>
