import React, { Suspense } from 'react';
import './styles/styles.css';
import { AppRouter } from './routes/AppRouter';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense>
        <AppRouter/>
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
