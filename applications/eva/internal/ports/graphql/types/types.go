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
	// The details of the account lock
	Lock *AccountLock `json:"lock"`
	// The language of the account.
	//
	// Note: this is the language that will be used to determine which emails should be sent where.
	//
	// You should make sure that the root level "langauge" is the same when the user loads the app, so they get a
	// consistent experience. Use "UpdateLanguage" when the languages are mismatched.
	Language *Language `json:"language"`
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
	//
	// May be null because unconfirmed emails are not yet actually attached to the account
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

type AccountLock struct {
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
	// If the session belongs to the currently authenticated account. This means that the session cannot be revoked (or else we get weird stuff)
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
	// Any validation errors from the backend
	Validation *AddAccountEmailValidation `json:"validation"`
}

// Input to assign account to a moderator role
type AssignAccountModeratorRole struct {
	// The account ID that the role needs to be assigned to
	AccountID relay.ID `json:"accountId"`
}

// Assigned account
type AssignAccountModeratorRolePayload struct {
	// The account that the role was assigned to
	Account *Account `json:"account"`
}

// Input to assign account to a staff role
type AssignAccountStaffRole struct {
	// The account ID that the role needs to be assigned to
	AccountID relay.ID `json:"accountId"`
}

// Assigned account
type AssignAccountStaffRolePayload struct {
	// The account that the role was assigned to
	Account *Account `json:"account"`
}

// Authentication token. Used for logging in.
type AuthenticationToken struct {
	// Unique ID of the token
	ID relay.ID `json:"id"`
	// Whether or not the token belongs to the same session as it was created in
	SameSession bool `json:"sameSession"`
	// Whether or not the token is verified
	Verified bool `json:"verified"`
	// Whether or not this token is "secure"
	// Secure means that the token has been viewed from the same network as originally created
	// if it wasn't viewed in the same network, the interface should take care and double-check with
	// the user that they want to verify the token.
	Secure bool `json:"secure"`
	// The device this token was created from.
	Device string `json:"device"`
	// The location where this token was created at.
	Location string `json:"location"`
	// The email that belongs to this token.
	Email string `json:"email"`
	// Once the token is verified, you can see the status of the account
	AccountStatus *AuthenticationTokenAccountStatus `json:"accountStatus"`
}

type AuthenticationTokenAccountStatus struct {
	// When verified, whether or not there is an account belonging to this token.
	Registered bool `json:"registered"`
	// If multi-factor is enabled for this account
	MultiFactor []MultiFactorType `json:"multiFactor"`
}

// Input for confirming the account email
type ConfirmAccountEmailInput struct {
	// The ID that is sent for confirmation
	ID string `json:"id"`
}

// Payload for confirming the account email
type ConfirmAccountEmailPayload struct {
	// Validation for confirming account email
	Validation *ConfirmAccountEmailValidation `json:"validation"`
	// The account email that was confirmed
	AccountEmail *AccountEmail `json:"accountEmail"`
}

// Payload for a created pending post
type CreateAccountWithAuthenticationTokenInput struct {
	Username string `json:"username"`
}

// Payload for creating an account
type CreateAccountWithAuthenticationTokenPayload struct {
	// Validation for creating an account
	Validation *CreateAccountWithAuthenticationTokenValidation `json:"validation"`
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
	AccountMultiFactorTotpEnabled *bool `json:"accountMultiFactorTotpEnabled"`
}

// Input for enrolling the account into TOTP
type EnrollAccountMultiFactorTotpInput struct {
	// The code that the TOTP expects
	Code string `json:"code"`
}

// Payload of the enrolled totp payload
type EnrollAccountMultiFactorTotpPayload struct {
	// Validation for enrolling TOTP
	Validation *EnrollAccountMultiFactorTotpValidation `json:"validation"`
	// TOTP that belongs to this account now
	AccountMultiFactorTotpEnabled *bool `json:"accountMultiFactorTotpEnabled"`
}

// Payload of the created account recovery codes
type GenerateAccountMultiFactorRecoveryCodesPayload struct {
	// The recovery codes that were created
	AccountMultiFactorRecoveryCodes []*AccountMultiFactorRecoveryCode `json:"accountMultiFactorRecoveryCodes"`
}

// Payload of the generated TOTP token
type GenerateAccountMultiFactorTotpPayload struct {
	// TOTP pair that was generated
	MultiFactorTotp *MultiFactorTotp `json:"multiFactorTotp"`
}

// Payload for granting access to an account using the token and the recovery code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput struct {
	RecoveryCode string `json:"recoveryCode"`
}

// Payload for granting access to an account using the authentication token and Recovery Code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload struct {
	// Validation options
	Validation *GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation `json:"validation"`
	// The account that granted access to
	Account *Account `json:"account"`
}

// Payload for granting access to an account using the token and the totp code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput struct {
	Code string `json:"code"`
}

// Payload for granting access to an account using the authentication token and TOTP code
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload struct {
	// Validation options
	Validation *GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation `json:"validation"`
	// The account that granted access to
	Account *Account `json:"account"`
}

type GrantAccountAccessWithAuthenticationTokenPayload struct {
	// Validation options
	Validation *GrantAccountAccessWithAuthenticationTokenValidation `json:"validation"`
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
	// Validation for granting an authentication token
	Validation *GrantAuthenticationTokenValidation `json:"validation"`
}

type Language struct {
	Locale string `json:"locale"`
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
	// Validation for reissuing authentication token
	Validation *ReissueAuthenticationTokenValidation `json:"validation"`
	// The authentication token
	AuthenticationToken *AuthenticationToken `json:"authenticationToken"`
}

// Payload for revoking the current viewer
type RevokeAccountAccessPayload struct {
	// The account that was revoked
	RevokedAccountID relay.ID `json:"revokedAccountId"`
}

// Input to revoke moderator role
type RevokeAccountModeratorRole struct {
	// The account ID that the role needs to be revoked from
	AccountID relay.ID `json:"accountId"`
}

// Revoked account
type RevokeAccountModeratorRolePayload struct {
	// The account that the role was revoked from
	Account *Account `json:"account"`
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

// Input to revoke staff role
type RevokeAccountStaffRole struct {
	// The account ID that the role needs to be revoked from
	AccountID relay.ID `json:"accountId"`
}

// Revoked account
type RevokeAccountStaffRolePayload struct {
	// The account that the role was revoked from
	Account *Account `json:"account"`
}

// Input for revoking an authentication token
type RevokeAuthenticationTokenInput struct {
	// If an ID is specified, the token can be revoked if a proper ID is specified
	//
	// If an ID is not specified, a token from the cookie will be used
	AuthenticationTokenID *string `json:"authenticationTokenId"`
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
	// The account email that was updated to primary
	PrimaryAccountEmail *AccountEmail `json:"primaryAccountEmail"`
	// The account email that was updated to 'confirmed' status
	UpdatedAccountEmail *AccountEmail `json:"updatedAccountEmail"`
}

// Input for updating the account language
type UpdateAccountLanguageInput struct {
	// The locale to update the language to
	Locale string `json:"locale"`
}

// Payload of the account language update
type UpdateAccountLanguagePayload struct {
	// The new language that is now set
	Language *Language `json:"language"`
	// The account that has the updated language
	Account *Account `json:"Account"`
}

// Input for updating an account's username
type UpdateAccountUsernameAndRetainPreviousInput struct {
	// The username that the account should be updated to
	Username string `json:"username"`
}

// Payload of the updated username
type UpdateAccountUsernameAndRetainPreviousPayload struct {
	// Validation for taking an account username
	Validation *UpdateAccountUsernameAndRetainPreviousValidation `json:"validation"`
	// The account username that was added
	AccountUsername *AccountUsername `json:"accountUsername"`
}

// Input for updating the current language
type UpdateLanguageInput struct {
	// The locale to update the language to
	Locale string `json:"locale"`
}

// Payload of the language update
type UpdateLanguagePayload struct {
	// The new language that is now set
	Language *Language `json:"language"`
}

// Input for verifying token account
type VerifyAuthenticationTokenInput struct {
	AuthenticationTokenID string `json:"authenticationTokenId"`
}

// Payload for verifying the authentication token
type VerifyAuthenticationTokenPayload struct {
	// Validation options
	Validation *VerifyAuthenticationTokenValidation `json:"validation"`
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

// Validation message for adding account email
type AddAccountEmailValidation string

const (
	AddAccountEmailValidationInvalidEmail AddAccountEmailValidation = "INVALID_EMAIL"
)

var AllAddAccountEmailValidation = []AddAccountEmailValidation{
	AddAccountEmailValidationInvalidEmail,
}

func (e AddAccountEmailValidation) IsValid() bool {
	switch e {
	case AddAccountEmailValidationInvalidEmail:
		return true
	}
	return false
}

func (e AddAccountEmailValidation) String() string {
	return string(e)
}

func (e *AddAccountEmailValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = AddAccountEmailValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid AddAccountEmailValidation", str)
	}
	return nil
}

func (e AddAccountEmailValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for confirming account email
type ConfirmAccountEmailValidation string

const (
	ConfirmAccountEmailValidationTokenExpired ConfirmAccountEmailValidation = "TOKEN_EXPIRED"
	ConfirmAccountEmailValidationEmailTaken   ConfirmAccountEmailValidation = "EMAIL_TAKEN"
)

var AllConfirmAccountEmailValidation = []ConfirmAccountEmailValidation{
	ConfirmAccountEmailValidationTokenExpired,
	ConfirmAccountEmailValidationEmailTaken,
}

func (e ConfirmAccountEmailValidation) IsValid() bool {
	switch e {
	case ConfirmAccountEmailValidationTokenExpired, ConfirmAccountEmailValidationEmailTaken:
		return true
	}
	return false
}

func (e ConfirmAccountEmailValidation) String() string {
	return string(e)
}

func (e *ConfirmAccountEmailValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ConfirmAccountEmailValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ConfirmAccountEmailValidation", str)
	}
	return nil
}

func (e ConfirmAccountEmailValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for creating an account with an authentication token
type CreateAccountWithAuthenticationTokenValidation string

const (
	CreateAccountWithAuthenticationTokenValidationEmailTaken    CreateAccountWithAuthenticationTokenValidation = "EMAIL_TAKEN"
	CreateAccountWithAuthenticationTokenValidationUsernameTaken CreateAccountWithAuthenticationTokenValidation = "USERNAME_TAKEN"
	CreateAccountWithAuthenticationTokenValidationTokenExpired  CreateAccountWithAuthenticationTokenValidation = "TOKEN_EXPIRED"
)

var AllCreateAccountWithAuthenticationTokenValidation = []CreateAccountWithAuthenticationTokenValidation{
	CreateAccountWithAuthenticationTokenValidationEmailTaken,
	CreateAccountWithAuthenticationTokenValidationUsernameTaken,
	CreateAccountWithAuthenticationTokenValidationTokenExpired,
}

func (e CreateAccountWithAuthenticationTokenValidation) IsValid() bool {
	switch e {
	case CreateAccountWithAuthenticationTokenValidationEmailTaken, CreateAccountWithAuthenticationTokenValidationUsernameTaken, CreateAccountWithAuthenticationTokenValidationTokenExpired:
		return true
	}
	return false
}

func (e CreateAccountWithAuthenticationTokenValidation) String() string {
	return string(e)
}

func (e *CreateAccountWithAuthenticationTokenValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CreateAccountWithAuthenticationTokenValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CreateAccountWithAuthenticationTokenValidation", str)
	}
	return nil
}

func (e CreateAccountWithAuthenticationTokenValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for enrolling in TOTP
type EnrollAccountMultiFactorTotpValidation string

const (
	EnrollAccountMultiFactorTotpValidationInvalidCode EnrollAccountMultiFactorTotpValidation = "INVALID_CODE"
)

var AllEnrollAccountMultiFactorTotpValidation = []EnrollAccountMultiFactorTotpValidation{
	EnrollAccountMultiFactorTotpValidationInvalidCode,
}

func (e EnrollAccountMultiFactorTotpValidation) IsValid() bool {
	switch e {
	case EnrollAccountMultiFactorTotpValidationInvalidCode:
		return true
	}
	return false
}

func (e EnrollAccountMultiFactorTotpValidation) String() string {
	return string(e)
}

func (e *EnrollAccountMultiFactorTotpValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = EnrollAccountMultiFactorTotpValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid EnrollAccountMultiFactorTotpValidation", str)
	}
	return nil
}

func (e EnrollAccountMultiFactorTotpValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for granting account access with multi factor
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation string

const (
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenExpired        GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "TOKEN_EXPIRED"
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationInvalidRecoveryCode GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "INVALID_RECOVERY_CODE"
)

var AllGrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = []GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation{
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenExpired,
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationInvalidRecoveryCode,
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation) IsValid() bool {
	switch e {
	case GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationTokenExpired, GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidationInvalidRecoveryCode:
		return true
	}
	return false
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation) String() string {
	return string(e)
}

func (e *GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation", str)
	}
	return nil
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for granting account access with multi factor
type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation string

const (
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenExpired GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "TOKEN_EXPIRED"
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationInvalidCode  GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "INVALID_CODE"
)

var AllGrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = []GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation{
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenExpired,
	GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationInvalidCode,
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation) IsValid() bool {
	switch e {
	case GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationTokenExpired, GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidationInvalidCode:
		return true
	}
	return false
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation) String() string {
	return string(e)
}

func (e *GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation", str)
	}
	return nil
}

func (e GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type GrantAccountAccessWithAuthenticationTokenValidation string

const (
	GrantAccountAccessWithAuthenticationTokenValidationTokenExpired GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_EXPIRED"
)

var AllGrantAccountAccessWithAuthenticationTokenValidation = []GrantAccountAccessWithAuthenticationTokenValidation{
	GrantAccountAccessWithAuthenticationTokenValidationTokenExpired,
}

func (e GrantAccountAccessWithAuthenticationTokenValidation) IsValid() bool {
	switch e {
	case GrantAccountAccessWithAuthenticationTokenValidationTokenExpired:
		return true
	}
	return false
}

func (e GrantAccountAccessWithAuthenticationTokenValidation) String() string {
	return string(e)
}

func (e *GrantAccountAccessWithAuthenticationTokenValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GrantAccountAccessWithAuthenticationTokenValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GrantAccountAccessWithAuthenticationTokenValidation", str)
	}
	return nil
}

func (e GrantAccountAccessWithAuthenticationTokenValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for granting an authentication token
type GrantAuthenticationTokenValidation string

const (
	GrantAuthenticationTokenValidationInvalidEmail GrantAuthenticationTokenValidation = "INVALID_EMAIL"
)

var AllGrantAuthenticationTokenValidation = []GrantAuthenticationTokenValidation{
	GrantAuthenticationTokenValidationInvalidEmail,
}

func (e GrantAuthenticationTokenValidation) IsValid() bool {
	switch e {
	case GrantAuthenticationTokenValidationInvalidEmail:
		return true
	}
	return false
}

func (e GrantAuthenticationTokenValidation) String() string {
	return string(e)
}

func (e *GrantAuthenticationTokenValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = GrantAuthenticationTokenValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid GrantAuthenticationTokenValidation", str)
	}
	return nil
}

func (e GrantAuthenticationTokenValidation) MarshalGQL(w io.Writer) {
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

// Validation for reissuing authentication token
type ReissueAuthenticationTokenValidation string

const (
	ReissueAuthenticationTokenValidationTokenExpired ReissueAuthenticationTokenValidation = "TOKEN_EXPIRED"
)

var AllReissueAuthenticationTokenValidation = []ReissueAuthenticationTokenValidation{
	ReissueAuthenticationTokenValidationTokenExpired,
}

func (e ReissueAuthenticationTokenValidation) IsValid() bool {
	switch e {
	case ReissueAuthenticationTokenValidationTokenExpired:
		return true
	}
	return false
}

func (e ReissueAuthenticationTokenValidation) String() string {
	return string(e)
}

func (e *ReissueAuthenticationTokenValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ReissueAuthenticationTokenValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ReissueAuthenticationTokenValidation", str)
	}
	return nil
}

func (e ReissueAuthenticationTokenValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation message for updating account username
type UpdateAccountUsernameAndRetainPreviousValidation string

const (
	UpdateAccountUsernameAndRetainPreviousValidationUsernameTaken UpdateAccountUsernameAndRetainPreviousValidation = "USERNAME_TAKEN"
)

var AllUpdateAccountUsernameAndRetainPreviousValidation = []UpdateAccountUsernameAndRetainPreviousValidation{
	UpdateAccountUsernameAndRetainPreviousValidationUsernameTaken,
}

func (e UpdateAccountUsernameAndRetainPreviousValidation) IsValid() bool {
	switch e {
	case UpdateAccountUsernameAndRetainPreviousValidationUsernameTaken:
		return true
	}
	return false
}

func (e UpdateAccountUsernameAndRetainPreviousValidation) String() string {
	return string(e)
}

func (e *UpdateAccountUsernameAndRetainPreviousValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = UpdateAccountUsernameAndRetainPreviousValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid UpdateAccountUsernameAndRetainPreviousValidation", str)
	}
	return nil
}

func (e UpdateAccountUsernameAndRetainPreviousValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

// Validation for granting account access
type VerifyAuthenticationTokenValidation string

const (
	VerifyAuthenticationTokenValidationTokenExpired VerifyAuthenticationTokenValidation = "TOKEN_EXPIRED"
)

var AllVerifyAuthenticationTokenValidation = []VerifyAuthenticationTokenValidation{
	VerifyAuthenticationTokenValidationTokenExpired,
}

func (e VerifyAuthenticationTokenValidation) IsValid() bool {
	switch e {
	case VerifyAuthenticationTokenValidationTokenExpired:
		return true
	}
	return false
}

func (e VerifyAuthenticationTokenValidation) String() string {
	return string(e)
}

func (e *VerifyAuthenticationTokenValidation) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = VerifyAuthenticationTokenValidation(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid VerifyAuthenticationTokenValidation", str)
	}
	return nil
}

func (e VerifyAuthenticationTokenValidation) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
