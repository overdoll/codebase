package resource

type Url struct {
	fullUrl  string
	mimeType string
}

func (r *Url) GetFullUrl() string {
	return r.fullUrl
}

func (r *Url) GetMimeType() string {
	return r.mimeType
}
