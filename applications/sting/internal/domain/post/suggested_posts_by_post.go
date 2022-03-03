package post

func NewSuggestedPostsByPost(post *Post) (*Filters, error) {
	return &Filters{
		audienceIds:         []string{*post.audienceId},
		showSuspendedClubs:  false,
		sortBy:              TopSort,
		state:               Published,
		supporterOnlyStatus: []SupporterOnlyStatus{Partial, None},
	}, nil
}
