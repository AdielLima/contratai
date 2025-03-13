// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   "/webhook-test": {
    //     target: "http://localhost:5678",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
    proxy: {
      "/webhook": {
        target: "http://localhost:5678",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


