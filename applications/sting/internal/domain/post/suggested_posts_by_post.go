package post

func NewSuggestedPostsByPost(post *Post) (*Filters, error) {
	return &Filters{
		audienceIds: []string{post.audience.id},
		sortBy:      TopSort,
		state:       Published,
	}, nil
}
