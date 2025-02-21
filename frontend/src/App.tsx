import React from 'react';
import Chart from './components/Chart';
import PredictionForm from './components/PredictionForm';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>ETH Price Prediction</h1>
      <Chart />
      <PredictionForm />
    </div>
  );
};

export default App; 