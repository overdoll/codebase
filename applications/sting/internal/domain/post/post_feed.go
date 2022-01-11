package post

func NewPostFeed(audienceIds, categoryIds []string) (*Filters, error) {
	return &Filters{
		audienceIds: audienceIds,
		categoryIds: categoryIds,
		sortBy:      TopSort,
		state:       Published,
	}, nil
}
