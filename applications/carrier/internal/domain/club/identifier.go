package club

type Club struct {
	slug string
	name string
}

func (i *Club) Slug() string {
	return i.slug
}

func (i *Club) Name() string {
	return i.name
}

func UnmarshalClubFromDatabase(slug, name string) *Club {
	return &Club{
		slug: slug,
		name: name,
	}
}
