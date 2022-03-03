package post

import "overdoll/libraries/principal"

type Content struct {
	id string

	resourceId string

	resourceIdHidden string

	isSupporterOnly bool

	canViewSupporterOnly bool

	requester *principal.Principal
}

func (m *Content) Id() string {
	return m.id
}

func (m *Content) ResourceIdRequest(p *Post) string {

	if !m.canView(p) {
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

func (m *Content) canView(p *Post) bool {

	if p.state != Published {
		return true
	}

	if !m.isSupporterOnly {
		return true
	}

	if m.isSupporterOnly && m.canViewSupporterOnly {
		return true
	}

	if m.requester != nil && m.requester.IsStaff() {
		return true
	}

	return false
}

func (m *Content) CanViewSupporterOnly(p *Post) bool {
	return m.canView(p)
}
