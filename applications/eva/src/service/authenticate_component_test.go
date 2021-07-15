package service

import (
	"context"
	"testing"
	"time"

	"github.com/bxcodec/faker/v3"
	"github.com/pquerna/otp/totp"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type Logout struct {
	Logout types.Response `graphql:"logout()"`
}

// test to make sure logout works (when passport is present)
func TestLogout_user(t *testing.T) {
	t.Parallel()

	client, _, pass := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var mutation Logout

	err := client.Mutate(context.Background(), &mutation, nil)

	require.NoError(t, err)

	modified := pass.GetPassport()

	// should no longer be authenticated
	require.Equal(t, true, mutation.Logout.Ok)
	require.Equal(t, false, modified.IsAuthenticated())
}

// TestAccountAuthenticate_existing - test is similar to registration, except that we do a login with an
// existing user
func TestAccountAuthenticate_existing(t *testing.T) {
	t.Parallel()

	redeemCookie, _, pass := authenticateAndRedeemCookie(t, "poisonminion_test@overdoll.com")

	// the RedeemAuthenticationToken function will also log you in, if you redeem a cookie that's for a registered user
	// so we check for that here
	assert.Equal(t, true, redeemCookie.RedeemCookie.Registered)

	// the third parameter of getClient contains the most up-to-date version of the passport
	modified := pass.GetPassport()

	// since our passport is a pointer that is modified from a response, we can use it to check to make sure
	// that the user is logged into the correct one
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", modified.AccountID())
}

// TestAccountAuthenticate_from_another_session - we login, but redeem our cookie from another "session"
func TestAccountAuthenticate_from_another_session(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getHttpClient(t, passport.FreshPassport())

	authenticate := mAuthenticate(t, client, "poisonminion_test@overdoll.com")

	otpCookie := getOTPCookieFromJar(t, httpUser.Jar)

	assert.Equal(t, authenticate.Authenticate.Ok, true)

	clientFromAnotherSession, _, _ := getHttpClient(t, passport.FreshPassport())

	redeemCookie := qRedeemCookie(t, clientFromAnotherSession, otpCookie.Value)

	// should have indicated that it was redeemed by another session
	assert.Equal(t, false, redeemCookie.RedeemCookie.SameSession)

	authRedeemed := qAuth(t, client)

	// since our user's cookie was redeemed from another session, when the user runs this query
	// the next time, it should just log them in
	assert.Equal(t, "poisonminion", authRedeemed.Authentication.Account.Username)
}

type GenerateAccountMultiFactorRecoveryCodes struct {
	GenerateAccountMultiFactorRecoveryCodes []types.AccountMultiFactorRecoveryCode `graphql:"generateAccountMultiFactorRecoveryCodes()"`
}

type AccountMultiFactorRecoveryCodes struct {
	AccountMultiFactorRecoveryCodes []types.AccountMultiFactorRecoveryCode `graphql:"accountMultiFactorRecoveryCodes()"`
}

type GenerateAccountMultiFactorTotp struct {
	GenerateAccountMultiFactorTotp types.AccountMultiFactorTotp `graphql:"generateAccountMultiFactorTotp()"`
}

type EnrollAccountMultiFactorTotp struct {
	EnrollAccountMultiFactorTotp types.Response `graphql:"enrollAccountMultiFactorTotp(code: $code)"`
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

// TestAccountLogin_setup_multi_factor_and_login - fully test the MFA flow
// first we generate recovery codes, check the setting and make sure that our recovery codes are visible
// then we enroll into multi-factor authentication, and ensure that MFA is enabled in the settings
// finally, we will attempt a login with MFA TOTP and also attempt a login with one of the recovery codes
// last, we will disable MFA and login without MFA
func TestAccountLogin_setup_multi_factor_and_login(t *testing.T) {
	t.Parallel()

	testAccountId := "1q7MIw0U6TEpELH0FqnxrcXt3E0"
	testAccountEmail := "artist_verified_test@overdoll.com"

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	var generateAccountRecoveryCodes GenerateAccountMultiFactorRecoveryCodes

	// generate some recovery codes
	err := client.Mutate(context.Background(), &generateAccountRecoveryCodes, nil)
	require.NoError(t, err)

	// make sure recovery codes are at least greater
	require.Greater(t, len(generateAccountRecoveryCodes.GenerateAccountMultiFactorRecoveryCodes), 0)

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
		for _, codeTarget := range generateAccountRecoveryCodes.GenerateAccountMultiFactorRecoveryCodes {
			if codeTarget.Code == code.Code {
				foundCode = true
			}
		}

		require.True(t, foundCode)
	}

	var generateAccountMultiFactorTOTP GenerateAccountMultiFactorTotp

	// generate TOTP secret
	err = client.Mutate(context.Background(), &generateAccountMultiFactorTOTP, nil)
	require.NoError(t, err)

	require.NotEmpty(t, generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTotp.ImageSrc)

	// save for later (logging in)
	totpSecret := generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTotp.Secret

	// generate a TOTP code (usually, this would happen from a user's authenticator app or something else that does TOTP
	// so we use a library here to do exactly that)
	otp, err := totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var enrollAccountMultiFactorTOTP EnrollAccountMultiFactorTotp

	// submit the TOTP code so MFA can be setup correctly
	err = client.Mutate(context.Background(), &enrollAccountMultiFactorTOTP, map[string]interface{}{
		"code": graphql.String(otp),
	})

	require.NoError(t, err)
	require.True(t, enrollAccountMultiFactorTOTP.EnrollAccountMultiFactorTotp.Ok)

	settings = qAccountSettings(t, client)

	// look up settings and ensure MFA is now enabled
	require.True(t, settings.AccountSettings.Security.MultiFactor.MultiFactorEnabled)
	// totp should be configured (since this is what we set up)
	require.True(t, settings.AccountSettings.Security.MultiFactor.MultiFactorTotpConfigured)

	// log in with TOTP
	redeemCookie, client, pass := authenticateAndRedeemCookie(t, testAccountEmail)

	assert.NotNil(t, redeemCookie.RedeemCookie.MultiFactor)
	// when we try to login, TOTP should be in here to tell the user that they need to authenticate with MFA
	assert.Contains(t, redeemCookie.RedeemCookie.MultiFactor, types.MultiFactorTypeEnumTotp)

	// generate the OTP code for authentication
	otp, err = totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var authenticateTOTP AuthenticateTOTP
	err = client.Mutate(context.Background(), &authenticateTOTP, map[string]interface{}{
		"code": graphql.String(otp),
	})

	modified := pass.GetPassport()

	// ensure user is authenticated
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, testAccountId, modified.AccountID())

	// log in with a Recovery Code
	redeemCookie, client, pass = authenticateAndRedeemCookie(t, testAccountEmail)

	assert.NotNil(t, redeemCookie.RedeemCookie.MultiFactor)

	var authenticateRecoveryCode AuthenticateRecoveryCode
	err = client.Mutate(context.Background(), &authenticateRecoveryCode, map[string]interface{}{
		// earlier we got a list of recovery codes for this account
		// we are going to go in and grab the first one and use it
		"code": graphql.String(accountMultiFactorRecoveryCodes.AccountMultiFactorRecoveryCodes[0].Code),
	})

	modified = pass.GetPassport()

	// ensure user is now authenticated
	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, testAccountId, modified.AccountID())

	// go in and disable MFA
	var toggleAccountMultiFactor ToggleAccountMultiFactor
	err = client.Mutate(context.Background(), &toggleAccountMultiFactor, nil)
	require.NoError(t, err)

	settings = qAccountSettings(t, client)

	// look up settings and ensure MFA is now disabled
	require.False(t, settings.AccountSettings.Security.MultiFactor.MultiFactorEnabled)
	// totp should also be no longer configured (since turning off MFA will remove all multi factor configuration)
	require.False(t, settings.AccountSettings.Security.MultiFactor.MultiFactorTotpConfigured)

	// attempt one last login and ensure it doesn't ask for a MFA code
	redeemCookie, client, pass = authenticateAndRedeemCookie(t, testAccountEmail)

	assert.Equal(t, true, redeemCookie.RedeemCookie.Registered)

	modified = pass.GetPassport()

	assert.Equal(t, true, modified.IsAuthenticated())
	assert.Equal(t, testAccountId, modified.AccountID())
}

type Register struct {
	Register types.Response `graphql:"register(data: $data)"`
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

	assert.Equal(t, true, authenticate.Authenticate.Ok)

	// check our auth query and make sure that it returns the correct cookie values
	authNotRedeemed := qAuth(t, client)

	// expect that the cookie is not redeemed
	assert.Equal(t, false, authNotRedeemed.Authentication.Cookie.Redeemed)

	redeemCookie := qRedeemCookie(t, client, otpCookie.Value)

	// make sure cookie is redeemed
	assert.Equal(t, true, redeemCookie.RedeemCookie.Redeemed)
	// make sure in the same session
	assert.Equal(t, true, redeemCookie.RedeemCookie.SameSession)

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
	assert.Equal(t, true, register.Register.Ok)

	otpCookie = getOTPCookieFromJar(t, httpUser.Jar)
	// Making sure that with "register" the OTP cookie is removed
	require.Nil(t, otpCookie)
}
