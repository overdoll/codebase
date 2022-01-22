package post

func NewSuggestedPostsByPost(post *Post) (*Filters, error) {
	return &Filters{
		audienceIds: []string{*post.audienceId},
		sortBy:      TopSort,
		state:       Published,
	}, nil
}
