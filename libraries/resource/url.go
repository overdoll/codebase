package resource

type Url struct {
	fullUrl  string
	mimeType string
}

func (r *Url) FullUrl() string {
	return r.fullUrl
}

func (r *Url) MimeType() string {
	return r.mimeType
}

func unmarshalUrlFromDatabase(fullUrl, mimeType string) *Url {
	return &Url{
		fullUrl:  fullUrl,
		mimeType: mimeType,
	}
}
