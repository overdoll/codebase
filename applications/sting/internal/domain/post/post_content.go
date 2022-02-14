package post

type Content struct {
	resourceId string

	resourceIdHidden string

	isSupporterOnly bool

	requesterIsSupporter bool
}

func (m *Content) ResourceId() string {
	return m.resourceId
}

func (m *Content) ResourceIdHidden() string {
	return m.resourceIdHidden
}

func (m *Content) IsSupporterOnly() bool {
	return m.isSupporterOnly
}

func (m *Content) RequesterIsSupporter() bool {
	return m.requesterIsSupporter
}
