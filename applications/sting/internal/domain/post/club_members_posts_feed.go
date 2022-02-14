package post

func NewClubMembersPostsFeed(clubIds []string) (*Filters, error) {
	return &Filters{
		clubIds:             clubIds,
		showSuspendedClubs:  false,
		sortBy:              NewSort,
		state:               Published,
		supporterOnlyStatus: []SupporterOnlyStatus{Partial, None, Full},
	}, nil
}
