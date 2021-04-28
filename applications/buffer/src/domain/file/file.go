package file

import (
	"overdoll/libraries/common"
)

type File struct {
	requester *common.User

	prefix string
	key    string
}

func NewFile(user *common.User, prefix string, key string) *File {
	return &File{
		requester: user,
		prefix:    prefix,
		key:       key,
	}
}

func (f *File) GetLocation() string {
	return f.prefix + "/" + f.key
}

func (f *File) CanViewFile() bool {
	return true
}
