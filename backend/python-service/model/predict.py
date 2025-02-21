import numpy as np

class ETHPredictor:
    def __init__(self):
        self.model = None
    
    def predict(self, data):
        return float(np.random.uniform(1500, 2500)) 