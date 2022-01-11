package post

func NewClubMembersPostsFeed(clubIds []string) (*Filters, error) {
	return &Filters{
		clubIds: clubIds,
		sortBy:  NewSort,
		state:   Published,
	}, nil
}
