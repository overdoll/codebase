package passport

var (
	Unknown             = Action{""}
	RevokeAccount       = Action{"revoke_account"}
	AuthenticateAccount = Action{"auth_account"}
)

type Action struct {
	slug string
}

func (r Action) String() string {
	return r.slug
}

func actionFromString(s string) Action {
	switch s {
	case RevokeAccount.slug:
		return RevokeAccount
	case AuthenticateAccount.slug:
		return AuthenticateAccount
	}

	return Unknown
}
