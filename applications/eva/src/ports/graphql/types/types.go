// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	graphql1 "overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"strconv"
)

type Account struct {
	// ID representing the account
	ID relay.ID `json:"id"`
	// The ID that the account can be referenced by
	Reference string `json:"reference"`
	// A URL pointing to the accounts's public avatar.
	Avatar graphql1.URI `json:"avatar"`
	// The username of the account.
	Username string `json:"username"`
	// Whether or not this account is a staff member
	IsStaff bool `json:"isStaff"`
	// Whether or not this account is part of the moderation team
	IsModerator bool `json:"isModerator"`
	// Whether or not this account is an artist
	IsArtist bool `json:"isArtist"`
	// Whether or not this account is locked
	IsLocked bool `json:"isLocked"`
	// The details of the account lock
	LockDetails *AccountLockDetails `json:"lockDetails"`
	// Usernames for account (history)
	Usernames *AccountUsernameConnection `json:"usernames"`
	// Emails for account (multiple emails per account)
	//
	// Only queryable if the currently logged-in account belongs to the requested account
	Emails *AccountEmailConnection `json:"emails"`
	// Sessions linked to this account
	//
	// Only queryable if the currently logged-in account belongs to the requested account
	Sessions *AccountSessionConnection `json:"sessions"`
	// Multi factor account settings
	//
	// Only queryable if the currently logged-in account belongs to the requested account
	MultiFactorSettings *AccountMultiFactorSettings `json:"multiFactorSettings"`
	// MFA Recovery codes belonging to this account
	//
	// Only queryable if the currently logged-in account belongs to the requested account
	RecoveryCodes []*AccountMultiFactorRecoveryCode `json:"recoveryCodes"`
}

func (Account) IsNode()   {}
func (Account) IsEntity() {}

// Connection of the account
type AccountConnection struct {
	Edges    []*AccountEdge  `json:"edges"`
	PageInfo *relay.PageInfo `json:"pageInfo"`
}

// Edge of the account
type AccountEdge struct {
	Node   *Account `json:"node"`
	Cursor string   `json:"cursor"`
}

// Email belonging to a specific account
type AccountEmail struct {
	// ID of the account email
	ID relay.ID `json:"id"`
	// The account email
	Email string `json:"email"`
	// The current status of the account email
	Status AccountEmailStatus `json:"status"`
	// The account that this email belongs to
	Account *Account `json:"account"`
}

func (AccountEmail) IsNode()   {}
func (AccountEmail) IsEntity() {}

// Connection of the account email
type AccountEmailConnection struct {
	PageInfo *relay.PageInfo     `json:"pageInfo"`
	Edges    []*AccountEmailEdge `json:"edges"`
}

// Edge of the account email
type AccountEmailEdge struct {
	Cursor string        `json:"cursor"`
	Node   *AccountEmail `json:"node"`
}

type AccountLockDetails struct {
	Expires int               `json:"expires"`
	Reason  AccountLockReason `json:"reason"`
}

// The multi-factor recovery code belonging to the account
type AccountMultiFactorRecoveryCode struct {
	// The multi factor recovery code
	Code string `json:"code"`
}

type AccountMultiFactorSettings struct {
	// Have recovery codes been generated? Required in order to configure TOTP
	RecoveryCodesGenerated bool `json:"recoveryCodesGenerated"`
	// Is multi factor enabled - can be toggled off if they want to
	MultiFactorEnabled bool `json:"multiFactorEnabled"`
	// Privileged users cannot disable MFA (moderators, staff)
	CanDisableMultiFactor bool `json:"canDisableMultiFactor"`
	// Has TOTP been configured? Recovery codes must be generated before configuring
	MultiFactorTotpConfigured bool `json:"multiFactorTotpConfigured"`
}

// Session belonging to a specific account
type AccountSession struct {
	// ID of the session
	ID relay.ID `json:"id"`
	// The user agent who first created the sesssion
	UserAgent string `json:"userAgent"`
	// The IP of who first created the session
	IP string `json:"ip"`
	// When the session was created
	Created string `json:"created"`
	// If the session belongs to the currently authenticated account
	Current bool `json:"current"`
}

func (AccountSession) IsNode()   {}
func (AccountSession) IsEntity() {}

// Edge of the account session
type AccountSessionConnection struct {
	PageInfo *relay.PageInfo       `json:"pageInfo"`
	Edges    []*AccountSessionEdge `json:"edges"`
}

// Edge of the account session
type AccountSessionEdge struct {
	Cursor string          `json:"cursor"`
	Node   *AccountSession `json:"node"`
}

// Username belonging to a specific account
type AccountUsername struct {
	// ID of the account username
	ID relay.ID `json:"id"`
	// The account username
	Username string `json:"username"`
	// The account that this username belongs to
	Account *Account `json:"account"`
}

func (AccountUsername) IsNode()   {}
func (AccountUsername) IsEntity() {}

// Connection of the account username
type AccountUsernameConnection struct {
	PageInfo *relay.PageInfo        `json:"pageInfo"`
	Edges    []*AccountUsernameEdge `json:"edges"`
}

// Edge of the account username
type AccountUsernameEdge struct {
	Cursor string           `json:"cursor"`
	Node   *AccountUsername `json:"node"`
}

// Add an email to the account
type AddAccountEmailInput struct {
	// The email that should be added to this account
	Email string `json:"email"`
}

// Email to add the account
type AddAccountEmailPayload struct {
	// The account email that was added to
	AccountEmail *AccountEmail `json:"accountEmail"`
}

type Artist struct {
	ID relay.ID `json:"id"`
	// The account linked to this artist
	Account *Account `json:"account"`
}

func (Artist) IsEntity() {}

type AuthenticationToken struct {
	SameSession   bool                              `json:"sameSession"`
	Verified      bool                              `json:"verified"`
	Session       string                            `json:"session"`
	Email         string                            `json:"email"`
	AccountStatus *AuthenticationTokenAccountStatus `json:"accountStatus"`
}

type AuthenticationTokenAccountStatus struct {
	Registered    bool              `json:"registered"`
	Authenticated bool              `json:"authenticated"`
	MultiFactor   []MultiFactorType `json:"multiFactor"`
}

// Input for confirming the account email
type ConfirmAccountEmailInput struct {
	// The ID that is sent for confirmation
	ID string `json:"id"`
}

// Payload for confirming the account email
type ConfirmAccountEmailPayload struct {
	// The account email that was confirmed
	AccountEmail *AccountEmail `json:"accountEmail"`
}

type Contributor struct {
	ID relay.ID `json:"id"`
	// The account linked to this contributor
	Account *Account `json:"account"`
}

func (Contributor) IsEntity() {}

// Payload for a created pending post
type CreateAccountWithAuthenticationTokenInput struct {
	Username string `json:"username"`
}

// Payload for creating an account
type CreateAccountWithAuthenticationTokenPayload struct {
	// The account that was created
	Account *Account `json:"account"`
}

// Input for removing an email from an account
type DeleteAccountEmailInput struct {
	// The email that should be removed
	AccountEmailID relay.ID `json:"accountEmailId"`
}

// Email to add the account
type DeleteAccountEmailPayload struct {
	// The ID of the account email that was removed
	AccountEmailID relay.ID `json:"accountEmailId"`
}

// Payload for disabling account multi factor
type DisableAccountMultiFactorPayload struct {
	// TOTP that was removed from this account, if it was removed
	AccountMultiFactorTOTPEnabled *bool `json:"accountMultiFactorTOTPEnabled"`
}

// Input for enrolling the account into TOTP
type EnrollAccountMultiFactorTotpInput struct {
	// The code that the TOTP expects
	Code string `json:"code"`
}

// Payload of the enrolled totp payload
type EnrollAccountMultiFactorTotpPayload struct {
	// TOTP that belongs to this account now
	AccountMultiFactorTOTPEnabled *bool `json:"accountMultiFactorTOTPEnabled"`
}

// Payload of the created account recovery codes
type GenerateAccountMultiFactorRecoveryCodesPayload struct {
	// The recovery codes that were created
	AccountMultiFactorRecoveryCodes []*AccountMultiFactorRecoveryCode `json:"accountMultiFactorRecoveryCodes"`
}

// Payload of the generated TOTP token
type GenerateAccountMultiFactorTotpPayload struct {
	// TOTP pair that was generated
	MultiFactorTotp *MultiFactorTotp `json:"multiFactorTOTP"`
}

// Payload for granting access to an account using the token and the recovery code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorInput struct {
	RecoveryCode *string `json:"recoveryCode"`
	Code         *string `json:"code"`
}

// Payload for granting access to an account using the authentication token and Recovery Code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorPayload struct {
	// The account that granted access to
	Account *Account `json:"account"`
}

// Input for granting an authentication token
type GrantAuthenticationTokenInput struct {
	Email string `json:"email"`
}

// Payload for starting an authentication
type GrantAuthenticationTokenPayload struct {
	// The authentication token after starting
	AuthenticationToken *AuthenticationToken `json:"authenticationToken"`
}

type Moderator struct {
	ID relay.ID `json:"id"`
	// The account linked to this moderator
	Account *Account `json:"account"`
}

func (Moderator) IsEntity() {}

// TOTP secret + image combination
type MultiFactorTotp struct {
	// The TOTP secret
	Secret string `json:"secret"`
	// Always html image compatible. Just set SRC tag to this and it will work!
	ImageSrc string `json:"imageSrc"`
}

// Payload re-sending authentication email
type ReissueAuthenticationTokenPayload struct {
	// The authentication token
	AuthenticationToken *AuthenticationToken `json:"authenticationToken"`
}

// Payload for revoking the current viewer
type RevokeAccountAccessPayload struct {
	// The account that was revoked
	RevokedAccountID relay.ID `json:"revokedAccountId"`
}

// Input for updating an account's username
type RevokeAccountSessionInput struct {
	// Session ID that should be revoked
	AccountSessionID relay.ID `json:"accountSessionId"`
}

// Payload of the revoked account session
type RevokeAccountSessionPayload struct {
	// The ID of the session that was revoked
	AccountSessionID relay.ID `json:"accountSessionId"`
}

// Payload for revoking the authentication token
type RevokeAuthenticationTokenPayload struct {
	// The authentication token that was removed
	RevokedAuthenticationTokenID relay.ID `json:"revokedAuthenticationTokenId"`
}

// Input for unlocking an account
type UnlockAccountInput struct {
	AccountID relay.ID `json:"accountID"`
}

// Payload for the unlocked account
type UnlockAccountPayload struct {
	// Account that was unlocked
	Account *Account `json:"account"`
}

// Input for updating the account status to primary
type UpdateAccountEmailStatusToPrimaryInput struct {
	// The email that should be updated
	AccountEmailID relay.ID `json:"accountEmailId"`
}

// Payload of the updated account email
type UpdateAccountEmailStatusToPrimaryPayload struct {
	// The account email that was updated
	AccountEmail *AccountEmail `json:"accountEmail"`
}

// Input for updating an account's username
type UpdateAccountUsernameAndRetainPreviousInput struct {
	// The username that the account should be updated to
	Username string `json:"username"`
}

// Payload of the updated username
type UpdateAccountUsernameAndRetainPreviousPayload struct {
	// The account username that was added
	AccountUsername *AccountUsername `json:"accountUsername"`
}

// Input for verifying and attempting access grant to an account
type VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput struct {
	AuthenticationTokenID string `json:"authenticationTokenId"`
}

// Payload for verifying the authentication token
type VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload struct {
	// The account that granted access to
	Account *Account `json:"account"`
	// The authentication token
	AuthenticationToken *AuthenticationToken `json:"authenticationToken"`
}

type AccountEmailStatus string

const (
	AccountEmailStatusConfirmed   AccountEmailStatus = "CONFIRMED"
	AccountEmailStatusUnconfirmed AccountEmailStatus = "UNCONFIRMED"
	AccountEmailStatusPrimary     AccountEmailStatus = "PRIMARY"
)

var AllAccountEmailStatus = []AccountEmailStatus{
	AccountEmailStatusConfirmed,
	AccountEmailStatusUnconfirmed,
	AccountEmailStatusPrimary,
}

func (e AccountEmailStatus) IsValid() bool {
	switch e {
	case AccountEmailStatusConfirmed, AccountEmailStatusUnconfirmed, AccountEmailStatusPrimary:
		return true
	}
	return false
}

func (e AccountEmailStatus) String() string {
	return string(e)
}

func (e *AccountEmailStatus) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountEmailStatus(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountEmailStatus", str)
	}
	return nil
}

func (e AccountEmailStatus) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type AccountLockReason string

const (
	AccountLockReasonPostInfraction AccountLockReason = "PostInfraction"
)

var AllAccountLockReason = []AccountLockReason{
	AccountLockReasonPostInfraction,
}

func (e AccountLockReason) IsValid() bool {
	switch e {
	case AccountLockReasonPostInfraction:
		return true
	}
	return false
}

func (e AccountLockReason) String() string {
	return string(e)
}

func (e *AccountLockReason) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AccountLockReason(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AccountLockReason", str)
	}
	return nil
}

func (e AccountLockReason) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type MultiFactorType string

const (
	MultiFactorTypeTotp MultiFactorType = "TOTP"
)

var AllMultiFactorType = []MultiFactorType{
	MultiFactorTypeTotp,
}

func (e MultiFactorType) IsValid() bool {
	switch e {
	case MultiFactorTypeTotp:
		return true
	}
	return false
}

func (e MultiFactorType) String() string {
	return string(e)
}

func (e *MultiFactorType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = MultiFactorType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid MultiFactorType", str)
	}
	return nil
}

func (e MultiFactorType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
