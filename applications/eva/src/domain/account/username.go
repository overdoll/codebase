package account

type Username struct {
	username string
}

func UnmarshalUsernameFromDatabase(username string) *Username {
	return &Username{
		username: username,
	}
}

func (c *Username) Username() string {
	return c.username
}
