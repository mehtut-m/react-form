import WithState from './components/WithState';
import WithRef from './components/WithRef';
import WithFormik from './components/WithFormik';
import WithAnoterRef from './components/WithAnotherRef';
import './App.css';

function App() {
  return (
    <div className="App">
      <WithState />
      {/* <WithRef /> */}
      {/* <WithAnoterRef /> */}
      {/* <WithFormik /> */}
    </div>
  );
}

export default App;
