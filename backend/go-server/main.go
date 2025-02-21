package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
    _ "github.com/lib/pq"
    "eth-service-predict/handlers"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/api/predict", handlers.PredictHandler).Methods("POST")
    r.HandleFunc("/api/historical", handlers.GetHistoricalDataHandler).Methods("GET")

    c := cors.New(cors.Options{
        AllowedOrigins: []string{"*"},
        AllowedMethods: []string{"GET", "POST", "OPTIONS"},
    })

    log.Fatal(http.ListenAndServe(":8080", c.Handler(r)))
} 