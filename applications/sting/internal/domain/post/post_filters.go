package post

import "overdoll/libraries/errors/domainerror"

type Filters struct {
	sortBy        Sorting
	contributorId *string
	clubIds       []string

	seed *string

	state State

	supporterOnlyStatus []SupporterOnlyStatus

	showTerminatedClubs bool

	characterIds []string
	seriesIds    []string
	audienceIds  []string
	categoryIds  []string
}

func NewPostFilters(sortBy string, state, contributorId *string, supporterOnlyStatus, clubIds, audienceIds, categoryIds, characterIds, seriesIds []string, showTerminatedClubs bool, seed *string) (*Filters, error) {

	if seed != nil {
		if len(*seed) > 100 {
			return nil, domainerror.NewValidation("seed length too large")
		}
	}

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
		showTerminatedClubs: showTerminatedClubs,
		supporterOnlyStatus: supporterOnlyStatusItem,
		seed:                seed,
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

func (e *Filters) ShowTerminatedClubs() bool {
	return e.showTerminatedClubs
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

func (e *Filters) Seed() *string {
	return e.seed
}
