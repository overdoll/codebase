package passport

var (
	Unknown              = Action{""}
	RevokeAccount        = Action{"revoke_account"}
	AuthenticateAccount  = Action{"auth_account"}
	UpdateDeviceLanguage = Action{"update_device_language"}
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
	case UpdateDeviceLanguage.slug:
		return UpdateDeviceLanguage
	}

	return Unknown
}
