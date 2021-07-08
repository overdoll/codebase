package service

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/bxcodec/faker/v3"
	"github.com/pquerna/otp/totp"
	"github.com/shurcooL/graphql"
	"github.com/spf13/viper"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/ports"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/tests"
)

const EvaHttpAddr = ":7777"
const EvaHttpClientAddr = "http://:7777/graphql"

const EvaGrpcAddr = "localhost:7778"
const EvaGrpcClientAddr = "localhost:7778"

type TestUser struct {
	Email    string `faker:"email"`
	Username string `faker:"username"`
}

type AuthQuery struct {
	Authentication *types.Authentication
}

type Register struct {
	Register bool `graphql:"register(data: $data)"`
}

type Logout struct {
	Logout bool `graphql:"logout()"`
}

type Authenticate struct {
	Authenticate bool `graphql:"authenticate(data: $data)"`
}

type AddAccountEmail struct {
	AddAccountEmail types.Response `graphql:"addAccountEmail(email: $email)"`
}

type ConfirmAccountEmail struct {
	ConfirmAccountEmail types.Response `graphql:"confirmAccountEmail(id: $id)"`
}

type MakeAccountEmailPrimary struct {
	MakeAccountEmailPrimary types.Response `graphql:"makeAccountEmailPrimary(email: $email)"`
}

type ModifyAccountUsername struct {
	ModifyAccountUsername types.Response `graphql:"modifyAccountUsername(username: $username)"`
}

type GenerateAccountRecoveryCodes struct {
	GenerateAccountRecoveryCodes []types.AccountMultiFactorRecoveryCode `graphql:"modifyAccountUsername(username: $username)"`
}

type AccountMultiFactorRecoveryCodes struct {
	AccountMultiFactorRecoveryCodes []types.AccountMultiFactorRecoveryCode `graphql:"accountMultiFactorRecoveryCodes()"`
}

type GenerateAccountMultiFactorTOTP struct {
	GenerateAccountMultiFactorTOTP types.AccountMultiFactorTotp `graphql:"generateAccountMultiFactorTOTP()"`
}

type EnrollAccountMultiFactorTOTP struct {
	EnrollAccountMultiFactorTOTP types.Response `graphql:"enrollAccountMultiFactorTOTP(code: $code)"`
}

type ToggleAccountMultiFactor struct {
	ToggleAccountMultiFactor types.Response `graphql:"toggleAccountMultiFactor()"`
}

type AuthenticateTOTP struct {
	AuthenticateTOTP types.Response `graphql:"authenticateTOTP(code: $code)"`
}

type AuthenticateRecoveryCode struct {
	AuthenticateRecoveryCode types.Response `graphql:"authenticateRecoveryCode(code: $code)"`
}

type AccountSettings struct {
	AccountSettings types.AccountSettings `graphql:"accountSettings()"`
}

type RedeemCookie struct {
	RedeemCookie *types.Cookie `graphql:"redeemCookie(cookie: $cookie)"`
}

func mAuthenticate(t *testing.T, client *graphql.Client, email string) Authenticate {
	var authenticate Authenticate

	err := client.Mutate(context.Background(), &authenticate, map[string]interface{}{
		"data": &types.AuthenticationInput{Email: email},
	})

	require.NoError(t, err)

	return authenticate
}

func qRedeemCookie(t *testing.T, client *graphql.Client, cookie string) RedeemCookie {
	var redeemCookie RedeemCookie

	err := client.Query(context.Background(), &redeemCookie, map[string]interface{}{
		"cookie": graphql.String(cookie),
	})

	require.NoError(t, err)

	return redeemCookie
}

func qAccountSettings(t *testing.T, client *graphql.Client) AccountSettings {
	var accountSettings AccountSettings

	err := client.Query(context.Background(), &accountSettings, nil)

	require.NoError(t, err)

	return accountSettings
}

func qAuth(t *testing.T, client *graphql.Client) AuthQuery {
	var authRedeemed AuthQuery

	err := client.Query(context.Background(), &authRedeemed, nil)

	require.NoError(t, err)

	return authRedeemed
}

// TODO: this is kind of dependent on whatever adapter we are using at the time to generate email confirmation IDs
// we should probably make this lookup easier?? (by looking for the email directly?)
func getEmailConfirmation(t *testing.T, targetEmail string) string {

	// here, we initialize redis to get our one-time email confirmation since we dont have another way
	// to access this unless we use an email service (which would slow down this test)
	client, err := bootstrap.InitializeRedisSession(viper.GetInt("redis.db"))
	require.NoError(t, err)

	keys, err := client.Keys(context.Background(), adapters.ConfirmEmailPrefix).Result()
	require.NoError(t, err)

	for _, key := range keys {

		// get each key's value
		val, err := client.Get(context.Background(), key).Result()
		require.NoError(t, err)

		var emailConfirmation adapters.EmailConfirmation
		err = json.Unmarshal([]byte(val), &emailConfirmation)
		require.NoError(t, err)

		if emailConfirmation.Email == targetEmail {
			return strings.Split(key, ":")[0]
		}
	}

	return ""
}

// TestAccountRegistration_complete - complete a whole user registration flow using multiple graphql endpoints
// this is in one test because it requires a persistent state (in this case, it's cookies)
func TestAccountRegistration_complete(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getHttpClient(t, nil)

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	authenticate := mAuthenticate(t, client, fake.Email)

	// get cookies
	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	// make sure OTPKey is not empty
	require.True(t, otpCookie != nil)

	assert.Equal(t, authenticate.Authenticate, true)

	// check our auth query and make sure that it returns the correct cookie values
	authNotRedeemed := qAuth(t, client)

	// expect that the cookie is not redeemed
	assert.Equal(t, false, authNotRedeemed.Authentication.Cookie.Redeemed)

	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	// make sure cookie is redeemed
	assert.Equal(t, redeemCookie.RedeemCookie.Redeemed, true)
	// make sure in the same session
	assert.Equal(t, redeemCookie.RedeemCookie.SameSession, true)

	// check our auth query and make sure that it returns the correct cookie values
	authRedeemed := qAuth(t, client)

	// expect that our authentication query sees the cookie as redeemed
	assert.Equal(t, true, authRedeemed.Authentication.Cookie.Redeemed)

	// now, we register (cookie is redeemed from above query)
	var register Register

	err = client.Mutate(context.Background(), &register, map[string]interface{}{
		"data": &types.RegisterInput{Username: fake.Username},
	})

	require.NoError(t, err)
	assert.Equal(t, register.Register, true)

	otpCookie = getOTPCookieFromJar(t, httpUser.Jar)
	// Making sure that with "register" the OTP cookie is removed
	require.Nil(t, otpCookie)
}

func TestAccountUsername_modify(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, passport.FreshPassportWithUser("1pcKibRoqTAUgmOiNpGLIrztM9R"))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetUsername := fake.Username

	var modifyAccountUsername ModifyAccountUsername

	// modify account's username
	err = client.Mutate(context.Background(), &modifyAccountUsername, map[string]interface{}{
		"username": targetUsername,
	})

	require.NoError(t, err)
	require.True(t, modifyAccountUsername.ModifyAccountUsername.Ok)

	settings := qAccountSettings(t, client)

	foundNewUsername := false

	// go through the account's usernames and make sure the username exists here
	for _, email := range settings.AccountSettings.General.Usernames {
		if email.Username == targetUsername {
			foundNewUsername = true
		}
	}

	require.True(t, foundNewUsername)

	auth := qAuth(t, client)

	// make sure that the username is modified as well for the "authentication" query
	assert.Equal(t, targetUsername, auth.Authentication.User.Username)
}

// Go through a full flow of adding a new email to an account, confirming the email and making it the primary email
func TestAccountEmail_create_new_and_confirm_make_primary(t *testing.T) {
	t.Parallel()

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithUser("1pcKibRoqTAUgmOiNpGLIrztM9R"))

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	targetEmail := fake.Email

	var addAccountEmail AddAccountEmail

	// add an email to our account
	err = client.Mutate(context.Background(), &addAccountEmail, map[string]interface{}{
		"email": targetEmail,
	})

	require.NoError(t, err)
	require.True(t, addAccountEmail.AddAccountEmail.Ok)

	settings := qAccountSettings(t, client)

	foundUnconfirmedEmail := false

	// query account's settings and ensure this email is here, and unconfirmed
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumUnconfirmed {
			foundUnconfirmedEmail = true
		}
	}

	require.True(t, foundUnconfirmedEmail)

	// get confirmation key (this would be found in the email, but here we query our redis DB directly)
	confirmationKey := getEmailConfirmation(t, targetEmail)

	require.NotEmpty(t, confirmationKey)

	var confirmAccountEmail ConfirmAccountEmail

	// confirm the account's new email
	err = client.Query(context.Background(), &confirmAccountEmail, map[string]interface{}{
		"id": confirmationKey,
	})

	require.NoError(t, err)
	require.True(t, confirmAccountEmail.ConfirmAccountEmail.Ok)

	settings = qAccountSettings(t, client)

	foundConfirmedEmail := false

	// go through account settings and make sure that this email is now confirmed
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumConfirmed {
			foundConfirmedEmail = true
		}
	}

	require.True(t, foundConfirmedEmail)

	var makeEmailPrimary MakeAccountEmailPrimary

	// mark email as primary
	err = client.Mutate(context.Background(), &makeEmailPrimary, map[string]interface{}{
		"email": targetEmail,
	})

	require.NoError(t, err)
	require.True(t, makeEmailPrimary.MakeAccountEmailPrimary.Ok)

	foundPrimaryEmail := false

	// go through account settings and make sure that this email is now the primary email
	for _, email := range settings.AccountSettings.General.Emails {
		if email.Email == targetEmail && email.Status == types.AccountEmailStatusEnumPrimary {
			foundPrimaryEmail = true
		}
	}

	require.True(t, foundPrimaryEmail)
}

// TestAccountLogin_setup_multi_factor_and_login - fully test the MFA flow
// first we generate recovery codes, check the setting and make sure that our recovery codes are visible
// then we enroll into multi-factor authentication, and ensure that MFA is enabled in the settings
// finally, we will attempt a login with MFA TOTP and also attempt a login with one of the recovery codes
// last, we will disable MFA and login without MFA
func TestAccountLogin_setup_multi_factor_and_login(t *testing.T) {
	t.Parallel()

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

	var generateAccountRecoveryCodes GenerateAccountRecoveryCodes

	// generate some recovery codes
	err := client.Mutate(context.Background(), &generateAccountRecoveryCodes, nil)
	require.NoError(t, err)

	// make sure recovery codes are at least greater
	require.Greater(t, len(generateAccountRecoveryCodes.GenerateAccountRecoveryCodes), 0)

	// look up to make sure recovery code generation is true
	settings := qAccountSettings(t, client)

	require.True(t, settings.AccountSettings.Security.MultiFactor.RecoveryCodesGenerated)

	var accountMultiFactorRecoveryCodes AccountMultiFactorRecoveryCodes

	// get recovery codes
	err = client.Query(context.Background(), &accountMultiFactorRecoveryCodes, nil)
	require.NoError(t, err)

	// ensure recovery code set is the same as the one we generated
	for _, code := range accountMultiFactorRecoveryCodes.AccountMultiFactorRecoveryCodes {

		foundCode := false

		// check for code in set
		for _, codeTarget := range generateAccountRecoveryCodes.GenerateAccountRecoveryCodes {
			if codeTarget.Code == code.Code {
				foundCode = true
			}
		}

		require.True(t, foundCode)
	}

	var generateAccountMultiFactorTOTP GenerateAccountMultiFactorTOTP

	// generate TOTP secret
	err = client.Mutate(context.Background(), &generateAccountMultiFactorTOTP, nil)
	require.NoError(t, err)

	require.NotEmpty(t, generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTOTP.ImageSrc)

	// save for later (logging in)
	totpSecret := generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTOTP.Secret

	// generate a TOTP code (usually, this would happen from a user's authenticator app or something else that does TOTP
	// so we use a library here to do exactly that)
	otp, err := totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var enrollAccountMultiFactorTOTP EnrollAccountMultiFactorTOTP

	// submit the TOTP code so MFA can be setup correctly
	err = client.Mutate(context.Background(), &enrollAccountMultiFactorTOTP, map[string]interface{}{
		"code": otp,
	})

	require.NoError(t, err)
	require.True(t, enrollAccountMultiFactorTOTP.EnrollAccountMultiFactorTOTP.Ok)

	settings = qAccountSettings(t, client)

	// look up settings and ensure MFA is now enabled
	require.True(t, settings.AccountSettings.Security.MultiFactor.MultiFactorEnabled)
	// totp should be configured (since this is what we set up)
	require.True(t, settings.AccountSettings.Security.MultiFactor.MultiFactorTOTPConfigured)

	// log in with TOTP
	client, httpUser, pass := getHttpClient(t, passport.FreshPassport())

	_ = mAuthenticate(t, client, "poisonminion_test@overdoll.com")
	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)
	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	assert.NotNil(t, redeemCookie.RedeemCookie.MultiFactor)
	// when we try to login, TOTP should be in here to tell the user that they need to authenticate with MFA
	assert.Contains(t, redeemCookie.RedeemCookie.MultiFactor, types.MultiFactorTypeEnumTotp)

	// generate the OTP code for authentication
	otp, err = totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var authenticateTOTP AuthenticateTOTP
	err = client.Mutate(context.Background(), &authenticateTOTP, map[string]interface{}{
		"code": otp,
	})

	modified := pass.GetPassport()

	// ensure user is authenticated
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj", modified.AccountID())

	// log in with a Recovery Code
	client, httpUser, pass = getHttpClient(t, passport.FreshPassport())

	_ = mAuthenticate(t, client, "0eclipse_test@overdoll.com")
	otpCookie = getOTPCookieFromJar(t, httpUser.Jar)
	redeemCookie = qRedeemCookie(t, client, otpCookie.Value)

	var authenticateRecoveryCode AuthenticateRecoveryCode
	err = client.Mutate(context.Background(), &authenticateRecoveryCode, map[string]interface{}{
		// earlier we got a list of recovery codes for this account
		// we are going to go in and grab the first one and use it
		"code": accountMultiFactorRecoveryCodes.AccountMultiFactorRecoveryCodes[0].Code,
	})

	modified = pass.GetPassport()

	// ensure user is now authenticated
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj", modified.AccountID())

	// go in and disable MFA
	var toggleAccountMultiFactor ToggleAccountMultiFactor
	err = client.Mutate(context.Background(), &toggleAccountMultiFactor, nil)
	require.NoError(t, err)

	settings = qAccountSettings(t, client)

	// look up settings and ensure MFA is now disabled
	require.False(t, settings.AccountSettings.Security.MultiFactor.MultiFactorEnabled)
	// totp should also be no longer configured (since turning off MFA will remove all multi factor configuration)
	require.False(t, settings.AccountSettings.Security.MultiFactor.MultiFactorTOTPConfigured)

	// attempt one last login and ensure it doesn't ask for a MFA code
	client, httpUser, pass = getHttpClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "0eclipse_test@overdoll.com")

	otpCookie = getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate, true)

	redeemCookie = qRedeemCookie(t, client, otpCookie.Value)

	assert.Equal(t, true, redeemCookie.RedeemCookie.Registered)

	modified = pass.GetPassport()

	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", modified.AccountID())
}

// TestRedeemCookie_invalid - test by redeeming an invalid cookie
func TestRedeemCookie_invalid(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	redeemCookie := qRedeemCookie(t, client, "some-random-cookie")

	// check to make sure its returned as invalid
	assert.Equal(t, redeemCookie.RedeemCookie.Invalid, true)
}

// TestAccountLogin_existing - test is similar to registration, except that we do a login with an
// existing user
func TestAccountLogin_existing(t *testing.T) {
	t.Parallel()

	client, httpUser, pass := getHttpClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "poisonminion_test@overdoll.com")

	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate, true)

	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	// the RedeemCookie function will also log you in, if you redeem a cookie that's for a registered user
	// so we check for that here
	assert.Equal(t, true, redeemCookie.RedeemCookie.Registered)

	// the third parameter of getClient contains the most up-to-date version of the passport
	modified := pass.GetPassport()

	// since our passport is a pointer that is modified from a response, we can use it to check to make sure
	// that the user is logged into the correct one
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", modified.AccountID())
}

// TestUserLogin_from_another_session - we login, but redeem our cookie from another "session"
func TestUserLogin_from_another_session(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getHttpClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "poisonminion_test@overdoll.com")

	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate, true)

	clientFromAnotherSession, _, _ := getHttpClient(t, nil)

	redeemCookie := qRedeemCookie(t, clientFromAnotherSession, otpCookie.Value)

	// should have indicated that it was redeemed by another session
	assert.Equal(t, false, redeemCookie.RedeemCookie.SameSession)

	authRedeemed := qAuth(t, client)

	// since our user's cookie was redeemed from another session, when the user runs this query
	// the next time, it should just log them in
	assert.Equal(t, "poisonminion", authRedeemed.Authentication.User.Username)
}

// Test empty authentication - we didnt pass any passport so it shouldn't do anything
func TestGetAccountAuthentication_empty(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	query := qAuth(t, client)

	// at this point there is no user (since no passport is passed in) so expect that it doesnt send anything
	require.Nil(t, query.Authentication.Cookie)
	require.Nil(t, query.Authentication.User)
}

// TestGetAccountAuthentication_user - we assign a passport to our Http client, which will add it to the request body
// when doing a graphql request
// normally, passport is stored in session and assigned in the graphql gateway
// since we can't do this here, we assign it manually
func TestGetAccountAuthentication_user(t *testing.T) {
	t.Parallel()

	// userID is from one of our seeders (which will exist during testing)
	client, _, _ := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	query := qAuth(t, client)

	require.Nil(t, query.Authentication.Cookie)
	require.Equal(t, "poisonminion", query.Authentication.User.Username)
}

// test to make sure logout works (when passport is present)
func TestLogout_user(t *testing.T) {
	t.Parallel()

	client, _, pass := getHttpClient(t, passport.FreshPassportWithUser("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var mutation Logout

	err := client.Mutate(context.Background(), &mutation, nil)

	require.NoError(t, err)

	modified := pass.GetPassport()

	// should no longer be authenticated
	require.Equal(t, true, mutation.Logout)
	require.Equal(t, false, modified.IsAuthenticated())
}

// TestAccount_get - test GRPC endpoint for grabbing a user
func TestAccount_get(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	res, err := client.GetAccount(context.Background(), &eva.GetAccountRequest{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"})

	require.NoError(t, err)

	assert.Equal(t, res.Username, "poisonminion")
}

func TestAccount_lock_unlock(t *testing.T) {
	t.Parallel()

	client := getGrpcClient(t)

	res, err := client.LockAccount(context.Background(), &eva.LockAccountRequest{
		Id:       "1q7MIqqnkzew33q4elXuN1Ri27d",
		Duration: 100000000,
		Reason:   eva.LockAccountReason_POST_INFRACTION,
	})

	require.NoError(t, err)

	assert.Equal(t, true, res.Locked)

	res, err = client.LockAccount(context.Background(), &eva.LockAccountRequest{
		Id:       "1q7MIqqnkzew33q4elXuN1Ri27d",
		Duration: 0,
	})

	require.NoError(t, err)

	assert.Equal(t, false, res.Locked)
}

func getOTPCookieFromJar(t *testing.T, jar http.CookieJar) *http.Cookie {
	// get cookies
	cookies := jar.Cookies(&url.URL{
		Scheme: "http",
	})

	var otpCookie *http.Cookie

	// need to grab value from cookie, so we can redeem it
	for _, ck := range cookies {
		if ck.Name == cookie.OTPKey {
			otpCookie = ck
		}
	}

	return otpCookie
}

func getHttpClient(t *testing.T, pass *passport.Passport) (*graphql.Client, *http.Client, *clients.ClientPassport) {

	client, transport := clients.NewHTTPClientWithHeaders(pass)

	return graphql.NewClient(EvaHttpClientAddr, client), client, transport
}

func getGrpcClient(t *testing.T) eva.EvaClient {

	evaClient, _ := clients.NewEvaClient(context.Background(), EvaGrpcClientAddr)

	return evaClient
}

func startService() bool {
	// config file location (specified in BUILD file) will be absolute from repository path
	config.Read("applications/eva/config.toml")

	app, _ := NewApplication(context.Background())

	srv := ports.NewGraphQLServer(&app)

	go bootstrap.InitializeHttpServer(EvaHttpAddr, srv, func() {})

	ok := tests.WaitForPort(EvaHttpAddr)
	if !ok {
		log.Println("Timed out waiting for eva HTTP to come up")
		return false
	}
	s := ports.NewGrpcServer(&app)

	go bootstrap.InitializeGRPCServer(EvaGrpcAddr, func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})

	ok = tests.WaitForPort(EvaGrpcAddr)

	if !ok {
		log.Println("Timed out waiting for eva GRPC to come up")
	}

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
