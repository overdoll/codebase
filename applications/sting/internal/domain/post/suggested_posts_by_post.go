package post

func NewSuggestedPostsByPost(post *Post, suspendedClubIds, requesterSupportedClubIds []string) (*Filters, error) {
	return &Filters{
		audienceIds:               []string{*post.audienceId},
		requesterSupportedClubIds: requesterSupportedClubIds,
		suspendedClubIds:          suspendedClubIds,
		sortBy:                    TopSort,
		state:                     Published,
	}, nil
}
