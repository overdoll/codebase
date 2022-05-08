package post

type Filters struct {
	sortBy        Sorting
	contributorId *string
	clubIds       []string

	state State

	supporterOnlyStatus []SupporterOnlyStatus

	showSuspendedClubs bool

	characterIds []string
	seriesIds    []string
	audienceIds  []string
	categoryIds  []string
}

func NewPostFilters(sortBy string, state, contributorId *string, supporterOnlyStatus, clubIds, audienceIds, categoryIds, characterIds, seriesIds []string, showSuspendedClubs bool) (*Filters, error) {

	newState := Unknown
	var err error

	if state != nil {
		s := *state

		newState, err = StateFromString(s)

		if err != nil {
			return nil, err
		}
	}

	var supporterOnlyStatusItem []SupporterOnlyStatus

	for _, s := range supporterOnlyStatus {
		s := s

		newSuppStatus, err := SupporterOnlyStatusFromString(s)

		if err != nil {
			return nil, err
		}

		supporterOnlyStatusItem = append(supporterOnlyStatusItem, newSuppStatus)
	}

	sorting := UnknownSort

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &Filters{
		sortBy:              sorting,
		state:               newState,
		contributorId:       contributorId,
		clubIds:             clubIds,
		audienceIds:         audienceIds,
		categoryIds:         categoryIds,
		characterIds:        characterIds,
		seriesIds:           seriesIds,
		showSuspendedClubs:  showSuspendedClubs,
		supporterOnlyStatus: supporterOnlyStatusItem,
	}, nil
}

func (e *Filters) ContributorId() *string {
	return e.contributorId
}

func (e *Filters) ClubIds() []string {
	return e.clubIds
}

func (e *Filters) State() State {
	return e.state
}

func (e *Filters) SupporterOnlyStatus() []SupporterOnlyStatus {
	return e.supporterOnlyStatus
}

func (e *Filters) ShowSuspendedClubs() bool {
	return e.showSuspendedClubs
}

func (e *Filters) SortBy() Sorting {
	return e.sortBy
}

func (e *Filters) SeriesIds() []string {
	return e.seriesIds
}

func (e *Filters) CharacterIds() []string {
	return e.characterIds
}

func (e *Filters) CategoryIds() []string {
	return e.categoryIds
}

func (e *Filters) AudienceIds() []string {
	return e.audienceIds
}
