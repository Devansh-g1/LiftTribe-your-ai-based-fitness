import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.LiftTribe',
  appName: 'LiftTribe',
  webDir: 'dist', // assuming you're using Vite — confirm this is the correct folder
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: "#0e101b"
  }
};

export default config;
