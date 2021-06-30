package post

type Artist struct {
	id        string
	doNotPost bool
}

func (a *Artist) ID() string {
	return a.id
}

func (a *Artist) DoNotPost() bool {
	return a.doNotPost
}

func NewArtist(id string) *Artist {
	return &Artist{
		id:        id,
		doNotPost: false,
	}
}

func UnmarshalArtistFromDatabase(id string, doNotPost bool) *Artist {
	return &Artist{
		id:        id,
		doNotPost: doNotPost,
	}
}
