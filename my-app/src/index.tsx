import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from './components/ProductDetails';
import NotFound from './components/redirect/NotFound';

export default function Index() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<App/>}>

          <Route index element={<Home/>} />

          <Route path='/product/:idCode' element={<ProductDetails/>} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Index />);
