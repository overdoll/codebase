package club

type MemberFilters struct {
	supporter bool
	clubId    *string
	accountId *string
	sortBy    MemberSorting
}

func NewMemberFilters(supporter bool, accountId, clubId *string, sortBy string) (*MemberFilters, error) {

	sorting := UnknownMemberSort
	var err error

	if sortBy != "" {
		sorting, err = MemberSortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &MemberFilters{
		supporter: supporter,
		accountId: accountId,
		clubId:    clubId,
		sortBy:    sorting,
	}, nil
}

func (e *MemberFilters) AccountId() *string {
	return e.accountId
}

func (e *MemberFilters) ClubId() *string {
	return e.clubId
}

func (e *MemberFilters) Supporter() bool {
	return e.supporter
}

func (e *MemberFilters) SortBy() MemberSorting {
	return e.sortBy
}
