import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './components/Navbar';
import Page from './pages/Page';
import { Provider } from 'react-redux';
import store from './redux/store';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Navbar/>
    <Page/>
    </Provider>
  </StrictMode>,
)
