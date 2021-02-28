module overdoll

go 1.14

require (
	github.com/99designs/gqlgen v0.13.0
	github.com/bxcodec/faker/v3 v3.6.0 // indirect
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-gonic/gin v1.6.3
	github.com/go-playground/validator/v10 v10.4.1 // indirect
	github.com/gocql/gocql v0.0.0-20201215165327-e49edf966d90 // indirect
	github.com/golang/protobuf v1.4.2
	github.com/golang/snappy v0.0.2 // indirect
	github.com/gomodule/redigo v1.8.3
	github.com/gorilla/csrf v1.7.0 // indirect
	github.com/gorilla/securecookie v1.1.1
	github.com/gwatts/gin-adapter v0.0.0-20170508204228-c44433c485ad // indirect
	github.com/joho/godotenv v1.3.0 // indirect
	github.com/rs/cors v1.7.0 // indirect
	github.com/scylladb/gocqlx/v2 v2.3.0 // indirect
	github.com/streadway/amqp v1.0.0
	github.com/vektah/gqlparser/v2 v2.1.0
	google.golang.org/grpc v1.29.1
	google.golang.org/protobuf v1.23.0
)

replace github.com/gocql/gocql => github.com/scylladb/gocql v0.0.0-20201029162719-81a4afe636ae
