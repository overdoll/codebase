module overdoll

go 1.16

require (
	github.com/99designs/gqlgen v0.13.0
	github.com/aws/aws-sdk-go v1.37.21
	github.com/bazelbuild/rules_go v0.27.0
	github.com/bmizerany/assert v0.0.0-20160611221934-b7ed37b82869
	github.com/bmizerany/pat v0.0.0-20170815010413-6226ea591a40
	github.com/bxcodec/faker/v3 v3.6.0
	github.com/cenkalti/backoff/v4 v4.1.0
	github.com/dustin/go-humanize v1.0.0
	github.com/elastic/go-elasticsearch/v8 v8.0.0-20210305160311-265434a3b4ca
	github.com/gin-gonic/gin v1.6.3
	github.com/go-playground/validator/v10 v10.4.1 // indirect
	github.com/gocql/gocql v0.0.0-20201215165327-e49edf966d90
	github.com/golang/protobuf v1.5.2
	github.com/golang/snappy v0.0.3 // indirect
	github.com/google/uuid v1.2.0
	github.com/gorilla/securecookie v1.1.1
	github.com/gorilla/websocket v1.4.2
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0
	github.com/h2non/filetype v1.1.1
	github.com/joho/godotenv v1.3.0
	github.com/scylladb/gocqlx/v2 v2.4.0
	github.com/segmentio/ksuid v1.0.3
	github.com/shurcooL/graphql v0.0.0-20200928012149-18c5c3165e3a
	github.com/spf13/cobra v1.1.3
	github.com/spf13/viper v1.7.1
	github.com/stretchr/testify v1.7.0
	github.com/tus/tusd v1.5.1
	github.com/vektah/gqlparser/v2 v2.1.0
	go.temporal.io/sdk v1.6.0
	go.uber.org/multierr v1.6.0 // indirect
	go.uber.org/zap v1.16.0
	golang.org/x/crypto v0.0.0-20210421170649-83a5a9bb288b // indirect
	golang.org/x/net v0.0.0-20210525063256-abc453219eb5 // indirect
	golang.org/x/sys v0.0.0-20210503173754-0981d6026fa6 // indirect
	google.golang.org/genproto v0.0.0-20210505142820-a42aa055cf76 // indirect
	google.golang.org/grpc v1.37.0
	gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c // indirect
)

replace github.com/gocql/gocql => github.com/scylladb/gocql v0.0.0-20201029162719-81a4afe636ae
