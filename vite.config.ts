import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时需要设置 base 为仓库名
  // 如果部署到 username.github.io 则不需要 base
  // 如果部署到 username.github.io/repo-name 则设置为 '/repo-name/'
  base: process.env.GITHUB_PAGES ? '/retirement-portal/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
