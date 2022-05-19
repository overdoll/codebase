package testing_tools

import "overdoll/libraries/principal"

func NewStaffPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"STAFF"}, false, false, false, false)
}

func NewModeratorPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"MODERATOR"}, false, false, false, false)
}

func NewDefaultPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{}, false, false, false, false)
}

func NewArtistPrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"ARTIST"}, false, false, false, false)
}

func NewArtistSecurePrincipal(accountID string) *principal.Principal {
	return principal.NewPrincipal(accountID, "", []string{"ARTIST"}, false, false, true, false)
}
