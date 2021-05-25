package service

import (
	"context"
	"os"
	"testing"
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
	_ = NewComponentTestApplication(context.Background())

	//go bootstrap.InitializeGRPCServer(func(server *grpc.Server) {
	//	eva.RegisterEvaServer(server, ports.CreateServer(app))
	//})

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
