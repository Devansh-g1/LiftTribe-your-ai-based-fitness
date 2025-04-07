
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.cc7c44fbd3684e258b59f5b94e9e08c9',
  appName: 'lift-tribe-ai-fit',
  webDir: 'dist',
  server: {
    url: 'https://cc7c44fb-d368-4e25-8b59-f5b94e9e08c9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: "#0e101b"
  }
};

export default config;
