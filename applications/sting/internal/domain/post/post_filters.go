package post

import (
	"strings"
)

type Filters struct {
	sortBy        Sorting
	moderatorId   *string
	contributorId *string
	clubIds       []string

	state State

	supporterOnlyStatus []SupporterOnlyStatus

	suspendedClubIds []string

	characterIds []string
	seriesIds    []string
	audienceIds  []string
	categoryIds  []string
}

func NewPostFilters(sortBy string, state, moderatorId, contributorId *string, supporterOnlyStatus, clubIds, audienceIds, categoryIds, characterIds, seriesIds, suspendedClubIds []string) (*Filters, error) {

	newState := Unknown
	var err error

	if state != nil {
		s := strings.ToLower(*state)

		newState, err = StateFromString(s)

		if err != nil {
			return nil, err
		}
	}

	var supporterOnlyStatusItem []SupporterOnlyStatus

	for _, s := range supporterOnlyStatus {
		s := strings.ToLower(s)

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
		moderatorId:         moderatorId,
		contributorId:       contributorId,
		clubIds:             clubIds,
		audienceIds:         audienceIds,
		categoryIds:         categoryIds,
		characterIds:        characterIds,
		seriesIds:           seriesIds,
		suspendedClubIds:    suspendedClubIds,
		supporterOnlyStatus: supporterOnlyStatusItem,
	}, nil
}

func (e *Filters) ModeratorId() *string {
	return e.moderatorId
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

func (e *Filters) SuspendedClubIds() []string {
	return e.suspendedClubIds
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
