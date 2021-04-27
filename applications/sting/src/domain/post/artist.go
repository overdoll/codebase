package post

import (
	"os"
)

type Artist struct {
	id       string
	username string
	avatar   string
}

func (a *Artist) ID() string {
	return a.id
}

func (a *Artist) Username() string {
	return a.username
}

func (a *Artist) RawAvatar() string {
	return a.avatar
}

func (a *Artist) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + a.avatar
}

func NewArtist(id string, username string) *Artist {
	return &Artist{
		id:       id,
		username: username,
		avatar:   "",
	}
}

func UnmarshalArtistFromDatabase(id string, username string, avatar string) *Artist {
	return &Artist{
		id:       id,
		username: username,
		avatar:   avatar,
	}
}
