package service

import (
	"context"
	"log"
	"os"
	"testing"

	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/ports"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/tests"
)

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

// Test a full 'flow' - create a cookie, redeem the cookie and then register the user
//func TestCreateRedeemRegisterCookie(t *testing.T) {
//	t.Parallel()
//
//	fake := TestUser{}
//
//	err := faker.FakeData(&fake)
//
//	if err != nil {
//		t.Fatal("error generating fake data: ", err)
//	}
//
//	app := NewComponentTestApplication(context.Background())
//
//	srv := ports.CreateServer(app)
//
//	res, err := srv.CreateAuthenticationCookie(context.Background(), &eva.CreateAuthenticationCookieRequest{Email: fake.Email, Session: ""})
//
//	require.NoError(t, err)
//	assert.NotNil(t, res)
//
//	redeem, err := srv.RedeemAuthenticationCookie(context.Background(), &eva.GetAuthenticationCookieRequest{Cookie: res.Cookie})
//
//	require.NoError(t, err)
//	assert.False(t, redeem.Registered)
//
//	create, err := srv.RegisterUserFromCookie(context.Background(), &eva.RegisterUserRequest{Username: fake.Username, CookieId: redeem.Cookie.Cookie})
//
//	require.NoError(t, err)
//	assert.Equal(t, create.Username, fake.Username)
//}

func startService() bool {
	app := NewComponentTestApplication(context.Background())

	go bootstrap.InitializeGRPCServer(func(server *grpc.Server) {
		eva.RegisterEvaServer(server, ports.CreateServer(app))
	})

	ok := tests.WaitForPort("8080")
	if !ok {
		log.Println("Timed out waiting for grpc to come up")
	}

	return ok
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
