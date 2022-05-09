package club

type Club struct {
	id             string
	slug           string
	name           string
	isSuspended    bool
	canSupport     bool
	ownerAccountId string
}

func (c *Club) Id() string {
	return c.id
}

func (c *Club) Slug() string {
	return c.slug
}

func (c *Club) Name() string {
	return c.name
}

func (c *Club) IsSuspended() bool {
	return c.isSuspended
}

func (c *Club) CanSupport() bool {
	return c.canSupport
}

func (c *Club) OwnerAccountId() string {
	return c.ownerAccountId
}

func UnmarshalClubFromDatabase(id, slug, name string, isSuspended, canSupport bool, ownerAccountId string) *Club {
	return &Club{
		id:             id,
		slug:           slug,
		name:           name,
		isSuspended:    isSuspended,
		canSupport:     canSupport,
		ownerAccountId: ownerAccountId,
	}
}
