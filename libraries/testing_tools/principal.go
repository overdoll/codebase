package testing_tools

import "overdoll/libraries/principal"

func NewStaffPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"staff"}, false, false, false)
}

func NewModeratorPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"moderator"}, false, false, false)
}

func NewDefaultPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{}, false, false, false)
}
