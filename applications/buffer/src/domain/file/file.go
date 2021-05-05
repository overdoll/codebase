package file

type File struct {
	prefix string
	key    string
}

func NewFile(prefix string, key string) *File {
	return &File{
		prefix: prefix,
		key:    key,
	}
}

func (f *File) GetLocation() string {
	return f.prefix + "/" + f.key
}

func (f *File) CanViewFile() bool {
	return true
}
