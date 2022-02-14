package post

func NewClubMembersPostsFeed(clubIds, suspendedClubIds, requesterSupportedClubIds []string) (*Filters, error) {
	return &Filters{
		clubIds:                   clubIds,
		suspendedClubIds:          suspendedClubIds,
		requesterSupportedClubIds: requesterSupportedClubIds,
		sortBy:                    NewSort,
		state:                     Published,
	}, nil
}
