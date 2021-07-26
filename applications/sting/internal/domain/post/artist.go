package post

import (
	"overdoll/libraries/paging"
)

type Artist struct {
	*paging.Node

	id              string
	doNotPostReason string
}

func (a *Artist) ID() string {
	return a.id
}

func (a *Artist) DoNotPostReason() string {
	return a.doNotPostReason
}

func NewArtist(id string) *Artist {
	return &Artist{
		id:              id,
		doNotPostReason: "",
	}
}

func UnmarshalArtistFromDatabase(id, doNotPostReason string) *Artist {
	return &Artist{
		id:              id,
		doNotPostReason: doNotPostReason,
	}
}
