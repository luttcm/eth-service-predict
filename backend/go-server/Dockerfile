FROM golang:1.21-alpine

WORKDIR /app

COPY go.mod ./

RUN go mod download
RUN go mod verify

COPY . .

RUN go build -o main .

EXPOSE 8080

CMD ["./main"] 