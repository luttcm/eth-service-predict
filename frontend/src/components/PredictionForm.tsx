import React, { useState } from 'react';
import axios from 'axios';

interface PredictionData {
    price: number;
    volume: number;
    timestamp: string;
}

const PredictionForm: React.FC = () => {
    const [formData, setFormData] = useState<PredictionData>({
        price: 0,
        volume: 0,
        timestamp: new Date().toISOString()
    });
    const [prediction, setPrediction] = useState<number | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/predict', formData);
            setPrediction(response.data.predicted_price);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div className="prediction-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="price">Текущая цена ETH (USD)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="volume">Объем торгов</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Получить прогноз</button>
            </form>
            {prediction && (
                <div className="prediction-result">
                    <h3>Прогноз цены: ${prediction.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default PredictionForm; 