package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/bxcodec/faker/v3"
	"github.com/pquerna/otp/totp"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type RevokeAccountAccess struct {
	RevokeAccountAccess types.RevokeAccountAccessPayload `graphql:"revokeAccountAccess()"`
}

// test to make sure logout works (when passport is present)
func TestLogout_user(t *testing.T) {
	t.Parallel()

	client, _, pass := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var mutation RevokeAccountAccess

	err := client.Mutate(context.Background(), &mutation, nil)

	require.NoError(t, err)

	modified := pass.GetPassport()

	// should no longer be authenticated
	require.NotNil(t, mutation.RevokeAccountAccess.RevokedAccountID)
	require.Error(t, modified.Authenticated())
}

// TestAccountAuthenticate_existing - test is similar to registration, except that we do a login with an
// existing user
func TestAccountAuthenticate_existing(t *testing.T) {
	t.Parallel()

	redeemCookie, client, pass := authenticateAndVerifyToken(t, "i2fhz.poisonminion@inbox.testmail.app")

	// the VerifyAuthenticationToken function will also log you in, if you redeem a cookie that's for a registered user
	// so we check for that here
	require.Equal(t, true, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.AccountStatus.Registered)

	// we need to now grant account access after verifying the token
	grant := grantAccountAccessWithAuthenticationToken(t, client)
	require.NotNil(t, grant.GrantAccountAccessWithAuthenticationToken.Account)

	// the third parameter of getClient contains the most up-to-date version of the passport
	modified := pass.GetPassport()

	// since our passport is a pointer that is modified from a response, we can use it to check to make sure
	// that the user is logged into the correct one
	require.NoError(t, modified.Authenticated())
	require.Equal(t, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6", modified.AccountID())
}


// TestAccountAuthenticate_from_another_session - we login, but redeem our cookie from another "session"
func TestAccountAuthenticate_from_another_session(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getHttpClient(t, passport.FreshPassport())

	authenticate := grantAuthenticationToken(t, client, "i2fhz.poisonminion@inbox.testmail.app")

	otpCookie := getOTPTokenFromJar(t, httpUser.Jar)

	require.NotNil(t, authenticate.GrantAuthenticationToken.AuthenticationToken)

	clientFromAnotherSession, _, _ := getHttpClient(t, passport.FreshPassport())

	redeemCookie := verifyAuthenticationToken(t, clientFromAnotherSession, otpCookie.Value)

	// should have indicated that it was redeemed by another session
	require.Equal(t, false, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.SameSession)

	// after verifying the token, we need  to grant account access
	grant := grantAccountAccessWithAuthenticationToken(t, client)
	require.Equal(t, graphql.String("poisonminion"), grant.GrantAccountAccessWithAuthenticationToken.Account.Username)

	var settings ViewerAccount
	err := client.Query(context.Background(), &settings, nil)
	require.NoError(t, err)

	// since our user's cookie was redeemed from another session, when the user runs this query
	// the next time, it should just log them in
	require.Equal(t, graphql.String("poisonminion"), settings.Viewer.Username)
}

type GenerateAccountMultiFactorRecoveryCodes struct {
	GenerateAccountMultiFactorRecoveryCodes types.GenerateAccountMultiFactorRecoveryCodesPayload `graphql:"generateAccountMultiFactorRecoveryCodes()"`
}

type GenerateAccountMultiFactorTotp struct {
	GenerateAccountMultiFactorTotp types.GenerateAccountMultiFactorTotpPayload `graphql:"generateAccountMultiFactorTotp()"`
}

type EnrollAccountMultiFactorTotp struct {
	EnrollAccountMultiFactorTotp types.EnrollAccountMultiFactorTotpPayload `graphql:"enrollAccountMultiFactorTotp(input: $input)"`
}

type DisableAccountMultiFactor struct {
	DisableAccountMultiFactor types.DisableAccountMultiFactorPayload `graphql:"disableAccountMultiFactor()"`
}

type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode struct {
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode struct {
		Account *struct {
			Username graphql.String
		}
	} `graphql:"grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input)"`
}

type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotp struct {
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotp struct {
		Account *struct {
			Username graphql.String
		}
	} `graphql:"grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input)"`
}

type ViewerAccountSettings struct {
	Viewer struct {
		MultiFactorSettings *types.AccountMultiFactorSettings
		RecoveryCodes       []*types.AccountMultiFactorRecoveryCode
	} `graphql:"viewer()"`
}

func viewerAccountSettings(t *testing.T, client *graphql.Client) ViewerAccountSettings {
	var settings ViewerAccountSettings
	err := client.Query(context.Background(), &settings, nil)
	require.NoError(t, err)

	return settings
}

// TestAccountLogin_setup_multi_factor_and_login - fully test the MFA flow
// first we generate recovery codes, check the setting and make sure that our recovery codes are visible
// then we enroll into multi-factor authentication, and ensure that MFA is enabled in the settings
// finally, we will attempt a login with MFA TOTP and also attempt a login with one of the recovery codes
// last, we will disable MFA and login without MFA
func TestAccountLogin_setup_multi_factor_and_login(t *testing.T) {
	t.Parallel()

	testAccountId := "1q7MIw0U6TEpELH0FqnxrcXt3E0"
	testAccountEmail := "i2fhz.artist_verified@inbox.testmail.app"

	// use passport with user
	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount(testAccountId))

	var generateAccountRecoveryCodes GenerateAccountMultiFactorRecoveryCodes

	// generate some recovery codes
	err := client.Mutate(context.Background(), &generateAccountRecoveryCodes, nil)
	require.NoError(t, err)

	// make sure recovery codes are at least greater
	require.Greater(t, len(generateAccountRecoveryCodes.GenerateAccountMultiFactorRecoveryCodes.AccountMultiFactorRecoveryCodes), 0)

	// get settings
	settings := viewerAccountSettings(t, client)

	require.True(t, settings.Viewer.MultiFactorSettings.RecoveryCodesGenerated)

	// ensure recovery code set is the same as the one we generated
	for _, code := range settings.Viewer.RecoveryCodes {

		foundCode := false

		// check for code in set
		for _, codeTarget := range generateAccountRecoveryCodes.GenerateAccountMultiFactorRecoveryCodes.AccountMultiFactorRecoveryCodes {
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

	require.NotEmpty(t, generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTotp.MultiFactorTotp.ImageSrc)

	// save for later (logging in)
	totpSecret := generateAccountMultiFactorTOTP.GenerateAccountMultiFactorTotp.MultiFactorTotp.Secret

	// generate a TOTP code (usually, this would happen from a user's authenticator app or something else that does TOTP
	// so we use a library here to do exactly that)
	otp, err := totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var enrollAccountMultiFactorTOTP EnrollAccountMultiFactorTotp

	// submit the TOTP code so MFA can be setup correctly
	err = client.Mutate(context.Background(), &enrollAccountMultiFactorTOTP, map[string]interface{}{
		"input": types.EnrollAccountMultiFactorTotpInput{Code: otp},
	})

	require.NoError(t, err)
	require.True(t, *enrollAccountMultiFactorTOTP.EnrollAccountMultiFactorTotp.AccountMultiFactorTotpEnabled)

	// get new settings
	settings = viewerAccountSettings(t, client)

	// look up settings and ensure MFA is now enabled
	require.True(t, settings.Viewer.MultiFactorSettings.MultiFactorEnabled)
	// totp should be configured (since this is what we set up)
	require.True(t, settings.Viewer.MultiFactorSettings.MultiFactorTotpConfigured)

	// log in with TOTP
	redeemCookie, client, pass := authenticateAndVerifyToken(t, testAccountEmail)

	require.NotNil(t, redeemCookie.VerifyAuthenticationToken.AuthenticationToken)
	// when we try to login, TOTP should be in here to tell the user that they need to authenticate with MFA
	require.Contains(t, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.AccountStatus.MultiFactor, types.MultiFactorTypeTotp)

	// generate the OTP code for authentication
	otp, err = totp.GenerateCode(totpSecret, time.Now())
	require.NoError(t, err)

	var authenticateTOTP GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotp
	err = client.Mutate(context.Background(), &authenticateTOTP, map[string]interface{}{
		"input": types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput{
			Code: otp,
		},
	})

	modified := pass.GetPassport()

	// ensure user is authenticated
	require.NoError(t, modified.Authenticated())
	require.Equal(t, testAccountId, modified.AccountID())

	// log in with a Recovery Code
	redeemCookie, client, pass = authenticateAndVerifyToken(t, testAccountEmail)

	require.NotNil(t, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.AccountStatus.MultiFactor)

	var authenticateRecoveryCode GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode
	err = client.Mutate(context.Background(), &authenticateRecoveryCode, map[string]interface{}{
		"input": types.GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput{
			RecoveryCode: settings.Viewer.RecoveryCodes[0].Code,
		},
	})

	require.NoError(t, err)

	modified = pass.GetPassport()

	// ensure user is now authenticated
	require.NoError(t, modified.Authenticated())
	require.Equal(t, testAccountId, modified.AccountID())

	// go in and disable MFA
	var toggleAccountMultiFactor DisableAccountMultiFactor
	err = client.Mutate(context.Background(), &toggleAccountMultiFactor, nil)
	require.NoError(t, err)

	// get settings again
	settings = viewerAccountSettings(t, client)

	// look up settings and ensure MFA is now disabled
	require.False(t, settings.Viewer.MultiFactorSettings.MultiFactorEnabled)
	// totp should also be no longer configured (since turning off MFA will remove all multi factor configuration)
	require.False(t, settings.Viewer.MultiFactorSettings.MultiFactorTotpConfigured)

	// attempt one last login and ensure it doesn't ask for a MFA code
	redeemCookie, client, pass = authenticateAndVerifyToken(t, testAccountEmail)

	require.Equal(t, true, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.AccountStatus.Registered)

	// now grant account access
	grant := grantAccountAccessWithAuthenticationToken(t, client)
	require.NotNil(t, grant.GrantAccountAccessWithAuthenticationToken.Account)

	modified = pass.GetPassport()

	require.NoError(t, modified.Authenticated())
	require.Equal(t, testAccountId, modified.AccountID())
}

type CreateAccountWithAuthenticationToken struct {
	CreateAccountWithAuthenticationToken struct {
		Account *struct {
			Username graphql.String
		}
	} `graphql:"createAccountWithAuthenticationToken(input: $input)"`
}

// TestAccountRegistration_complete - complete a whole user registration flow using multiple graphql endpoints
// this is in one test because it requires a persistent state (in this case, it's cookies)
func TestAccountRegistration_complete(t *testing.T) {
	t.Parallel()

	client, httpUser, _ := getHttpClient(t, nil)

	fake := TestUser{}

	err := faker.FakeData(&fake)

	require.NoError(t, err)

	authenticate := grantAuthenticationToken(t, client, fake.Email)

	// get cookies
	otpCookie := getOTPTokenFromJar(t, httpUser.Jar)

	// make sure OTPKey is not empty
	require.True(t, otpCookie != nil)

	require.NotNil(t, true, authenticate.GrantAuthenticationToken.AuthenticationToken)

	// check our auth query and make sure that it returns the correct cookie values
	authenticationToken := viewAuthenticationToken(t, client)

	// expect that the cookie is not redeemed
	require.Equal(t, false, authenticationToken.ViewAuthenticationToken.Verified)

	redeemCookie := verifyAuthenticationToken(t, client, otpCookie.Value)

	// make sure cookie is redeemed
	require.Equal(t, true, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.Verified)
	// make sure in the same session
	require.Equal(t, true, redeemCookie.VerifyAuthenticationToken.AuthenticationToken.SameSession)

	// check our auth query and make sure that it returns the correct cookie values
	authenticationToken = viewAuthenticationToken(t, client)

	// expect that our authentication query sees the cookie as redeemed
	require.Equal(t, true, authenticationToken.ViewAuthenticationToken.Verified)

	// now, we register (cookie is redeemed from above query)
	var register CreateAccountWithAuthenticationToken

	err = client.Mutate(context.Background(), &register, map[string]interface{}{
		"input": types.CreateAccountWithAuthenticationTokenInput{Username: fake.Username},
	})

	require.NoError(t, err)
	require.NotNil(t, register.CreateAccountWithAuthenticationToken.Account)

	otpCookie = getOTPTokenFromJar(t, httpUser.Jar)
	// Making sure that with "register" the OTP cookie is removed
	require.Nil(t, otpCookie)
}
