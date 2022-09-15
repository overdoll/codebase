package post

import (
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
)

type Content struct {
	post *Post

	media *media.Media

	mediaHidden *media.Media

	isSupporterOnly bool
}

func (m *Content) MediaRequest(requester *principal.Principal) *media.Media {

	if !m.canView(requester) {
		return m.mediaHidden
	}

	return m.media
}

func (m *Content) SupporterOnlyMediaRequest(requester *principal.Principal) *media.Media {

	if m.canView(requester) {
		return nil
	}

	return m.media
}

func (m *Content) Media() *media.Media {
	return m.media
}

func (m *Content) MediaHidden() *media.Media {
	return m.mediaHidden
}

func (m *Content) UpdateMedia(id *media.Media) error {
	m.media = id
	return nil
}

func (m *Content) UpdateMediaHidden(id *media.Media) error {
	m.mediaHidden = id
	return nil
}

func (m *Content) IsSupporterOnly() bool {
	return m.isSupporterOnly
}

func (m *Content) canView(requester *principal.Principal) bool {

	if m.post.state != Published {
		return true
	}

	if !m.isSupporterOnly {
		return true
	}

	if m.isSupporterOnly {

		if requester != nil && requester.IsStaff() {
			return true
		}

		if requester != nil {
			// false if check supporter fails
			if err := requester.CheckSupporter(m.post.clubId); err != nil {
				return false
			}

			return true
		}

		return false
	}

	return false
}

func (m *Content) CanViewSupporterOnly(requester *principal.Principal) bool {
	return m.canView(requester)
}
