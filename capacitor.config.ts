import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cd.entraide.rdc',
  appName: "ENTR'AIDE RDC",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
