package handlers

import (
    "encoding/json"
    "net/http"
)

type HistoricalData struct {
    Price     float64 `json:"price"`
    Volume    float64 `json:"volume"`
    Timestamp string  `json:"timestamp"`
}

func GetHistoricalDataHandler(w http.ResponseWriter, r *http.Request) {
    data := []HistoricalData{
        {
            Price: 2000.0,
            Volume: 1000000.0,
            Timestamp: "2024-03-20T10:00:00Z",
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(data)
} 