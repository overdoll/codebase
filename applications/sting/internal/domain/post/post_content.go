package post

type Content struct {
	id string

	resourceId string

	resourceIdHidden string

	isSupporterOnly bool

	canViewSupporterOnly bool
}

func (m *Content) Id() string {
	return m.id
}

func (m *Content) ResourceIdRequest(p *Post) string {

	if p.state != Published {
		return m.resourceId
	}

	if !m.isSupporterOnly {
		return m.resourceId
	}

	if m.isSupporterOnly && m.canViewSupporterOnly {
		return m.resourceId
	}

	return m.resourceIdHidden
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

func (m *Content) CanViewSupporterOnly() bool {
	return m.canViewSupporterOnly
}
