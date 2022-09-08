package upload

type Upload struct {
	fileId   string
	fileName string
}

func NewUpload(fileId, fileName string) (*Upload, error) {
	return &Upload{
		fileId:   fileId,
		fileName: fileName,
	}, nil
}

func (u *Upload) FileId() string {
	return u.fileId
}

func (u *Upload) FileName() string {
	return u.fileName
}
