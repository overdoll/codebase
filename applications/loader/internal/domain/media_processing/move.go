package media_processing

// Move is a struct that contains the info that would tell a repository where a file is located in the OS
type Move struct {
	fileName string
}

func (r *Move) FileName() string {
	return r.fileName
}
