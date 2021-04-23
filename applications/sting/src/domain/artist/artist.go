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


func (a *Artist) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + a.avatar
}
