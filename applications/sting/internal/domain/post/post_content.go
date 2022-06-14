package post

import "overdoll/libraries/principal"

type Content struct {
	post *Post

	id string

	resource *Resource

	resourceHidden *Resource

	isSupporterOnly bool
}

func (m *Content) Id() string {
	return m.id
}

func (m *Content) ResourceRequest(requester *principal.Principal) *Resource {

	if !m.canView(requester) {
		return m.resourceHidden
	}

	return m.resource
}

func (m *Content) Resource() *Resource {
	return m.resource
}

func (m *Content) ResourceHidden() *Resource {
	return m.resourceHidden
}

func (m *Content) UpdateResourceHidden(id *Resource) error {
	m.resourceHidden = id
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
