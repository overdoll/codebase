package club

type Club struct {
	slug           string
	name           string
	ownerAccountId string
}

func (i *Club) Slug() string {
	return i.slug
}

func (i *Club) Name() string {
	return i.name
}

func (i *Club) OwnerAccountId() string {
	return i.ownerAccountId
}

func UnmarshalClubFromDatabase(slug, name, ownerAccountId string) *Club {
	return &Club{
		slug:           slug,
		name:           name,
		ownerAccountId: ownerAccountId,
	}
}
