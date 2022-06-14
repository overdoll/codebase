package post

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

func UnmarshalUrlFromDatabase(fullUrl, mimeType string) *Url {
	return &Url{
		fullUrl:  fullUrl,
		mimeType: mimeType,
	}
}
