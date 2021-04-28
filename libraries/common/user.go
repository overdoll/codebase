package common

type User struct {
	Id       string
	Username string
	Avatar   string
	Roles    []string
	Verified bool
}

func (u *User) CanViewFile(filePrefix string) bool {
	return true
}