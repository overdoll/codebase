package post

import (
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
)

type Content struct {
	post *Post

	resource *resource.Resource

	resourceHidden *resource.Resource

	isSupporterOnly bool
}

func (m *Content) ResourceRequest(requester *principal.Principal) *resource.Resource {

	if !m.canView(requester) {
		return m.resourceHidden
	}

	return m.resource
}

func (m *Content) SupporterOnlyResourceRequest(requester *principal.Principal) *resource.Resource {

	if m.canView(requester) {
		return nil
	}

	return m.resource.AsEmpty()
}

func (m *Content) Resource() *resource.Resource {
	return m.resource
}

func (m *Content) ResourceHidden() *resource.Resource {
	return m.resourceHidden
}

func (m *Content) UpdateResource(id *resource.Resource) error {
	m.resource = id
	return nil
}

func (m *Content) UpdateResourceHidden(id *resource.Resource) error {
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
