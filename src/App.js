import logo from './logo.svg';
import './App.css';
import ResultPage from './ResultPage/ResultPage';
import ResultPageProvider from './contexts/ResultPageContext';

function App() {
  return (
    <div>
      <ResultPageProvider>
      <ResultPage/>
      </ResultPageProvider>
    </div>
  );
}

export default App;
