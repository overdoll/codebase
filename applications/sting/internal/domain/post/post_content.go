package post

import "overdoll/libraries/principal"

type Content struct {
	id string

	resourceId string

	resourceIdHidden string

	isSupporterOnly bool
}

func (m *Content) Id() string {
	return m.id
}

func (m *Content) ResourceIdRequest(requester *principal.Principal, p *Post) string {

	if !m.canView(requester, p) {
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

func (m *Content) canView(requester *principal.Principal, p *Post) bool {

	if p.state != Published {
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
			if err := requester.CheckSupporter(p.clubId); err != nil {
				return false
			}

			return true
		}

		return false
	}

	return false
}

func (m *Content) CanViewSupporterOnly(requester *principal.Principal, p *Post) bool {
	return m.canView(requester, p)
}
