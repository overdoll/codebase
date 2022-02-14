package post

func NewSuggestedPostsByPost(post *Post, suspendedClubIds []string) (*Filters, error) {
	return &Filters{
		audienceIds:         []string{*post.audienceId},
		suspendedClubIds:    suspendedClubIds,
		sortBy:              TopSort,
		state:               Published,
		supporterOnlyStatus: []SupporterOnlyStatus{Partial, None},
	}, nil
}
