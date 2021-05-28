package service

import (
	"context"
	"fmt"
	"log"
	"os"
	"testing"

	"overdoll/applications/eva/src/ports"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/tests"
)

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

func TestGetUser(t *testing.T) {

}

func startService() bool {
	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	evaHttpAddr := fmt.Sprint(":7777")

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
