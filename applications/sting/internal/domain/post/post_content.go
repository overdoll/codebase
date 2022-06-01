package post

import "overdoll/libraries/principal"

type Content struct {
	post *Post

	id string

	resourceId string

	resourceIdHidden string

	isSupporterOnly bool
}

func (m *Content) Id() string {
	return m.id
}

func (m *Content) ResourceIdRequest(requester *principal.Principal) string {

	if !m.canView(requester) {
		return m.resourceIdHidden
	}

	return m.resourceId
}

func (m *Content) ResourceId() string {
	return m.resourceId
}

func (m *Content) ResourceIdHidden() string {
	return m.resourceIdHidden
}

func (m *Content) UpdateResourceIdHidden(id string) error {
	m.resourceIdHidden = id
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
