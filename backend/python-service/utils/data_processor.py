class DataProcessor:
    def __init__(self):
        self.scaler = None  # Здесь будет инициализация скейлера

    def process(self, data: dict) -> dict:
        # Базовая обработка данных
        processed_data = {
            'price': float(data['price']),
            'volume': float(data['volume']),
            'timestamp': data['timestamp']
        }
        return processed_data 