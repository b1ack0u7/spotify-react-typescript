import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routes/AppRouter';
import './styles/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <AppRouter/>
    </Suspense>
  </React.StrictMode>,
)
