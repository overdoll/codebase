package artist

import (
	"os"

	"overdoll/libraries/ksuid"
)

type Artist struct {
	id       ksuid.UUID
	username string
	avatar   string
}

func (a *Artist) ID() ksuid.UUID {
	return a.id
}

func (a *Artist) Username() string {
	return a.username
}

func (a *Artist) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + a.avatar
}

func UnmarshalArtistFromDatabase(id ksuid.UUID, username string, avatar string) *Artist {
	return &Artist{
		id:       id,
		username: username,
		avatar:   avatar,
	}
}
