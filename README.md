# eth-service-predict
Сервис для предсказания курса криптовалют

---

## **Документация проекта**

### **1. Описание проекта**
Проект представляет собой аналитическую платформу для прогнозирования цен на Ethereum (ETH) с использованием машинного обучения. Платформа включает:
- **Backend (Go)**: Высокопроизводительный сервер для обработки HTTP-запросов и управления API.
- **Backend (Python)**: Микросервис для работы с ML-моделью (CatBoost).
- **Frontend (React.js/Vue.js)**: Веб-интерфейс для визуализации данных и отображения прогнозов.
- **База данных (PostgreSQL/MySQL)**: Хранение исторических данных о ценах ETH, объемах торгов и других показателях.
- **Docker**: Контейнеризация всех компонентов для упрощения деплоя.

---

### **2. Архитектура проекта**
#### **2.1. Компоненты**
1. **Backend (Go)**:
   - Обработка HTTP-запросов.
   - Управление API для взаимодействия с фронтендом.
   - Работа с базой данных (PostgreSQL/MySQL).
   - Вызов Python-микросервиса для прогнозирования.

2. **Backend (Python)**:
   - Загрузка и предобработка данных.
   - Обучение и использование ML-модели (CatBoost).
   - Прогнозирование цен на ETH.
   - Возврат результатов в Go-сервер.

3. **Frontend (React.js/Vue.js)**:
   - Отображение графиков и диаграмм.
   - Взаимодействие с пользователем (фильтры, настройки).
   - Запросы к API для получения данных.

4. **База данных (PostgreSQL/MySQL)**:
   - Хранение исторических данных о ценах ETH, объемах торгов и других показателях.

5. **Docker**:
   - Контейнеризация всех компонентов (Go-сервер, Python-микросервис, фронтенд, база данных).

---

### **3. Этапы реализации**
#### **3.1. Backend (Go)**
- Создание сервера на Go для обработки HTTP-запросов.
- Реализация API для взаимодействия с фронтендом.
- Интеграция с базой данных (PostgreSQL/MySQL).
- Вызов Python-микросервиса для прогнозирования.

Пример кода на Go:
```go
package main

import (
    "fmt"
    "net/http"
    "io/ioutil"
    "bytes"
)

func callPythonMLService(data string) (string, error) {
    resp, err := http.Post("http://python-ml-service:5000/predict", "application/json", bytes.NewBuffer([]byte(data)))
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()
    body, _ := ioutil.ReadAll(resp.Body)
    return string(body), nil
}

func predictHandler(w http.ResponseWriter, r *http.Request) {
    result, err := callPythonMLService(`{"input": "data"}`)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, result)
}

func main() {
    http.HandleFunc("/predict", predictHandler)
    http.ListenAndServe(":8080", nil)
}
```

#### **3.2. Backend (Python)**
- Загрузка данных из внешних источников (например, CoinGecko API).
- Предобработка данных (очистка, нормализация).
- Обучение модели CatBoost.
- Прогнозирование цен на ETH.

Пример кода на Python (FastAPI):
```python
from fastapi import FastAPI
from pydantic import BaseModel
from catboost import CatBoostRegressor
import pandas as pd

app = FastAPI()

class InputData(BaseModel):
    input: str

model = CatBoostRegressor()
model.load_model('eth_model.cbm')

@app.post("/predict")
def predict(data: InputData):
    df = pd.DataFrame([data.input])
    prediction = model.predict(df)
    return {"prediction": prediction.tolist()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
```

#### **3.3. Frontend (React.js)**
- Создание интерфейса для отображения графиков и прогнозов.
- Интеграция с API для получения данных.

Пример кода на React:
```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/predict')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>ETH Price Prediction</h1>
      {/* Отображение данных */}
    </div>
  );
}

export default App;
```

#### **3.4. Docker**
- Создание Dockerfile для каждого компонента (Go-сервер, Python-микросервис, фронтенд, база данных).
- Использование Docker Compose для управления контейнерами.

### **4. Деплой**
- Использование Docker для деплоя на любую платформу (например, AWS, Google Cloud, Heroku).
- Настройка CI/CD (GitHub Actions/GitLab CI) для автоматизации деплоя.

