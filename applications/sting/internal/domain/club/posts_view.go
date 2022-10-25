package club

import (
	"overdoll/libraries/errors/domainerror"
)

type PostsView struct {
	slug string
}

var (
	UnknownView = PostsView{""}
	GalleryView = PostsView{"GALLERY"}
	CardView    = PostsView{"CARD"}
)

func (r PostsView) String() string {
	return r.slug
}

func PostsViewFromString(s string) (PostsView, error) {

	switch s {
	case GalleryView.slug:
		return GalleryView, nil
	case CardView.slug:
		return CardView, nil
	}

	return UnknownView, domainerror.NewValidation("unknown posts view type: " + s)
}

func GetDefaultView() PostsView {
	return CardView
}
