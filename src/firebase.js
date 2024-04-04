import { initializeApp } from 'firebase/app'
import { getMessaging } from "firebase/messaging"
import env from 'react-dotenv'

export const firebaseConfig = {
  apiKey: env.VITE_APP_API_KEY,
  authDomain: env.VITE_APP_AUTH_DOMAIN,
  projectId: env.VITE_APP_PROJECT_ID,
  storageBucket: env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: env.VITE_APP_MESSAGING_SENDER_ID,
  appId: env.VITE_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig)
export const messaging = getMessaging(firebaseApp)