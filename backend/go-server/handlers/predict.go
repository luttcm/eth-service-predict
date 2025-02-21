package handlers

import (
    "encoding/json"
    "net/http"
    "bytes"
)

type PredictionRequest struct {
    Price     float64 `json:"price"`
    Volume    float64 `json:"volume"`
    Timestamp string  `json:"timestamp"`
}

func PredictHandler(w http.ResponseWriter, r *http.Request) {
    var req PredictionRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    jsonData, err := json.Marshal(req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    resp, err := http.Post("http://python-service:5000/predict", 
        "application/json", 
        bytes.NewBuffer(jsonData))
    
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(resp)
} 