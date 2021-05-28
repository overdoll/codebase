package service

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/ports"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/tests"
)

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

func TestGetUser(t *testing.T) {
	client := getClient()

	var query struct {
		Authentication struct {
			User struct {
				Username graphql.String
			}
			Cookie struct {
				Email graphql.String
			}
		}
	}

	err := client.Query(context.Background(), &query, nil)

	fmt.Println(query)

	require.NoError(t, err)
}

func getClient() *graphql.Client {
	return graphql.NewClient("http://:7777/graphql", nil)
}

func startService() bool {
	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	evaHttpAddr := ":7777"

	go bootstrap.InitializeGinHttpServerOnAddress(evaHttpAddr, srv, func() {})

	ok := tests.WaitForPort(evaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
