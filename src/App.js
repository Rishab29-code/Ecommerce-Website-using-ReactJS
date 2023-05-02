import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import PageContent from './components/PageContent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppHeader />
      <PageContent/>
      <AppFooter/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
