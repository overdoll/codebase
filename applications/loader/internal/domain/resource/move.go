package resource

// Move is a struct that contains the info that would tell a repository where a file is located in the OS
type Move struct {
	osFileLocation string
}

func (r *Move) OsFileLocation() string {
	return r.osFileLocation
}
