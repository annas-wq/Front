<template>
  <div class="flex flex-col items-center justify-center bg-transparent p-4 gap-4">
    <div class="relative w-full max-w-5xl rounded-xl overflow-hidden border-4 border-white border-opacity-30">
      <video ref="video" autoplay playsinline class="w-full h-auto"></video>
      <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
let model: cocoSsd.ObjectDetection | null = null;
let stream: MediaStream | null = null;
let animationFrameId: number | null = null;

// Инициализация TensorFlow.js
const initTF = async () => {
  try {
    await tf.setBackend('webgl');
    await tf.ready();
    console.log('TensorFlow backend initialized');
  } catch (error) {
    console.error('Failed to initialize TensorFlow:', error);
  }
};

// Функция для запуска камеры
const startCamera = async () => {
  try {
    // Инициализируем TensorFlow
    await initTF();
    
    // Загружаем модель COCO-SSD
    model = await cocoSsd.load();
    console.log('Model loaded');

    // Получаем доступ к камере
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'environment' 
      } 
    });
    
    if (video.value) {
      video.value.srcObject = stream;
      video.value.onloadedmetadata = () => {
        console.log('Video metadata loaded');
        if (video.value && canvas.value) {
          canvas.value.width = video.value.videoWidth;
          canvas.value.height = video.value.videoHeight;
          console.log('Canvas dimensions set:', canvas.value.width, canvas.value.height);
          detectObjects();
        }
      };
    }
  } catch (error) {
    console.error('Camera error:', error);
    alert(`Camera access error: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Функция для обнаружения объектов
const detectObjects = async () => {
  if (!video.value || !model || !canvas.value) {
    console.log('Required elements not available');
    return;
  }
  
  try {
    const predictions = await model.detect(video.value);
    const ctx = canvas.value.getContext('2d');
    if (!ctx) return;
    
    // Очищаем canvas перед новой отрисовкой
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Отрисовка обнаруженных объектов
    predictions.forEach(pred => {
      const [x, y, w, h] = pred.bbox;
      ctx.strokeStyle = '#FF3D00';
      ctx.lineWidth = 4;
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = '#FF3D00';
      const text = `${pred.class} (${Math.round(pred.score * 100)}%)`;
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x, y > 30 ? y - 30 : 0, textWidth + 10, 30);
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 18px Arial';
      ctx.fillText(text, x + 5, y > 30 ? y - 10 : 20);
    });
    
    animationFrameId = requestAnimationFrame(detectObjects);
  } catch (error) {
    console.error('Detection error:', error);
  }
};

// Функция для очистки ресурсов
const stopCamera = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  
  if (video.value) {
    video.value.srcObject = null;
  }
  
  if (model) {
    model.dispose();
    model = null;
  }
};

onMounted(async () => {
  console.log('Component mounted');
  try {
    await startCamera();
  } catch (error) {
    console.error('Mounting error:', error);
  }
});

onUnmounted(() => {
  console.log('Component unmounted');
  stopCamera();
});
</script>

<style scoped>
.rounded-xl {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

video {
  display: block;
  background: #000;
}

canvas {
  pointer-events: none;
}
</style>