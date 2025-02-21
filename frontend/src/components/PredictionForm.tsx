import React, { useState } from 'react';
import axios from 'axios';

interface PredictionData {
    price: number;
    volume: number;
    timestamp: string;
}

const PredictionForm: React.FC = () => {
    const [prediction, setPrediction] = useState<number | null>(null);
    
    const handleSubmit = async (data: PredictionData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/predict', data);
            setPrediction(response.data.predicted_price);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className="prediction-form">
            {/* Форма для ввода данных */}
        </div>
    );
};

export default PredictionForm; 