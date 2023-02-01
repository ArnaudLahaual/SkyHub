// == Import : npm
import { Provider } from 'react-redux';
import store from 'src/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

// == Import : local
import App from 'src/components/App';
import './index.css';


const rootReactElement = (
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
);


const root = createRoot(document.getElementById('root'));

root.render(rootReactElement);
