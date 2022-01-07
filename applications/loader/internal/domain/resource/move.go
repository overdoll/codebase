package resource

// Move is a struct that contains the info that would tell a repository where a file is located in the OS,
// and where it needs to be moved in a remote storage (s3, etc...)
type Move struct {
	osFileLocation  string
	remoteUrlTarget string
}

func (r *Move) OsFileLocation() string {
	return r.osFileLocation
}

func (r *Move) RemoteUrlTarget() string {
	return r.remoteUrlTarget
}
