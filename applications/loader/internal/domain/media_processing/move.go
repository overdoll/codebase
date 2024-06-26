package media_processing

// Move is a struct that contains the info that would tell a repository where a file is located in the OS
type Move struct {
	fileName  string
	directory string
	isImage   bool
}

func (r *Move) Directory() string {
	return r.directory
}

func (r *Move) FileName() string {
	return r.fileName
}

func (r *Move) IsImage() bool {
	return r.isImage
}
