from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from model.predict import ETHPredictor
from utils.data_processor import DataProcessor

app = FastAPI()
predictor = ETHPredictor()
processor = DataProcessor()

class PredictionRequest(BaseModel):
    price: float
    volume: float
    timestamp: str

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        # Предобработка данных
        processed_data = processor.process(request.dict())
        
        # Получение предсказания
        prediction = predictor.predict(processed_data)
        
        return {"predicted_price": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 