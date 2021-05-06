module overdoll

go 1.14

require (
	github.com/99designs/gqlgen v0.13.0
	github.com/Shopify/sarama v1.28.0 // indirect
	github.com/ThreeDotsLabs/watermill v1.1.1
	github.com/ThreeDotsLabs/watermill-kafka/v2 v2.2.1 // indirect
	github.com/aws/aws-sdk-go v1.37.21
	github.com/bxcodec/faker/v3 v3.6.0
	github.com/cenkalti/backoff/v4 v4.1.0
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/dustin/go-humanize v1.0.0
	github.com/elastic/go-elasticsearch/v8 v8.0.0-20210305160311-265434a3b4ca
	github.com/frankban/quicktest v1.11.3 // indirect
	github.com/gin-gonic/gin v1.6.3
	github.com/go-playground/validator/v10 v10.4.1
	github.com/gocql/gocql v0.0.0-20201215165327-e49edf966d90
	github.com/golang/protobuf v1.5.2
	github.com/golang/snappy v0.0.3 // indirect
	github.com/gomodule/redigo v1.8.3
	github.com/gorilla/securecookie v1.1.1
	github.com/gorilla/websocket v1.4.2
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0 // indirect
	github.com/h2non/filetype v1.1.1 // indirect
	github.com/joho/godotenv v1.3.0
	github.com/klauspost/compress v1.12.1 // indirect
	github.com/lithammer/shortuuid/v3 v3.0.6 // indirect
	github.com/mitchellh/mapstructure v1.1.2
	github.com/pierrec/lz4 v2.6.0+incompatible // indirect
	github.com/pkg/errors v0.9.1
	github.com/scylladb/gocqlx/v2 v2.3.0
	github.com/segmentio/kafka-go v0.4.10
	github.com/segmentio/ksuid v1.0.3
	github.com/spf13/cobra v1.1.3
	github.com/streadway/amqp v1.0.0
	github.com/stretchr/testify v1.7.0
	github.com/tus/tusd v1.5.1
	github.com/vektah/gqlparser/v2 v2.1.0
	go.uber.org/multierr v1.6.0 // indirect
	go.uber.org/zap v1.16.0 // indirect
	golang.org/x/crypto v0.0.0-20210421170649-83a5a9bb288b // indirect
	golang.org/x/net v0.0.0-20210505214959-0714010a04ed // indirect
	golang.org/x/sys v0.0.0-20210503173754-0981d6026fa6 // indirect
	google.golang.org/genproto v0.0.0-20210505142820-a42aa055cf76 // indirect
	google.golang.org/grpc v1.37.0
	google.golang.org/protobuf v1.26.0
)

replace github.com/gocql/gocql => github.com/scylladb/gocql v0.0.0-20201029162719-81a4afe636ae
