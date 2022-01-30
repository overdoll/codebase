package post

func NewClubMembersPostsFeed(clubIds, suspendedClubIds []string) (*Filters, error) {
	return &Filters{
		clubIds:          clubIds,
		suspendedClubIds: suspendedClubIds,
		sortBy:           NewSort,
		state:            Published,
	}, nil
}
