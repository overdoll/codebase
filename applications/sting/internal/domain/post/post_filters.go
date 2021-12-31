package post

import (
	"errors"
	"strings"

	"overdoll/libraries/principal"
)

var (
	ErrInvalidOrderBy = errors.New("invalid order_by column")
)

type PostFilters struct {
	orderBy       string
	moderatorId   *string
	contributorId *string
	clubId        *string

	state          *string
	audienceSlugs  []string
	categorySlugs  []string
	characterSlugs []string
	seriesSlugs    []string
}

func NewPostFilters(orderBy string, state, moderatorId, contributorId, clubId *string, audienceSlugs, categorySlugs, characterSlugs, seriesSlugs []string) (*PostFilters, error) {

	var newState *string

	if state != nil {
		s := strings.ToLower(*state)
		newState = &s
	}

	newOrderBy := strings.ToLower(orderBy)

	if newOrderBy != "created_at" {
		return nil, ErrInvalidOrderBy
	}

	return &PostFilters{
		orderBy:        newOrderBy,
		state:          newState,
		moderatorId:    moderatorId,
		contributorId:  contributorId,
		clubId:         clubId,
		audienceSlugs:  audienceSlugs,
		categorySlugs:  categorySlugs,
		characterSlugs: characterSlugs,
		seriesSlugs:    seriesSlugs,
	}, nil
}

func (e *PostFilters) ModeratorId() *string {
	return e.moderatorId
}

func (e *PostFilters) ContributorId() *string {
	return e.contributorId
}

func (e *PostFilters) ClubId() *string {
	return e.clubId
}

func (e *PostFilters) State() *string {
	return e.state
}

func (e *PostFilters) OrderBy() string {
	return e.orderBy
}

func (e *PostFilters) AudienceSlugs() []string {
	return e.audienceSlugs
}

func (e *PostFilters) SeriesSlugs() []string {
	return e.seriesSlugs
}

func (e *PostFilters) CategorySlugs() []string {
	return e.categorySlugs
}

func (e *PostFilters) CharacterSlugs() []string {
	return e.characterSlugs
}

// permission checks to gate what can actually be filtered
func CanViewWithFilters(requester *principal.Principal, filter *PostFilters) error {

	// any state that isnt published needs permission checks
	if (filter.state == nil) || (filter.state != nil && *filter.state != "published") {
		if filter.ContributorId() != nil {
			return requester.BelongsToAccount(*filter.ContributorId())
		}

		if filter.ModeratorId() != nil {
			return requester.BelongsToAccount(*filter.ModeratorId())
		}

		if !requester.IsStaff() {
			return principal.ErrNotAuthorized
		}
	}

	// filtering by moderator
	if filter.ModeratorId() != nil {

		if requester.IsStaff() {
			return nil
		}

		return requester.BelongsToAccount(*filter.ModeratorId())
	}

	return nil
}
