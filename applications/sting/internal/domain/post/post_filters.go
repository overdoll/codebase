package post

type PostFilters struct {
	orderBy       string
	moderatorId   *string
	contributorId *string
	state         *string
	brandIds      []string
	audienceIds   []string
	categoryIds   []string
	characterIds  []string
	seriesIds     []string
}

func NewPostFilters(orderBy string, state, moderatorId, contributorId *string, brandIds, audienceIds, categoryIds, characterIds, seriesIds []string) (*PostFilters, error) {
	return &PostFilters{
		orderBy:       orderBy,
		state:         state,
		moderatorId:   moderatorId,
		audienceIds:   audienceIds,
		contributorId: contributorId,
		brandIds:      brandIds,
		categoryIds:   categoryIds,
		characterIds:  characterIds,
		seriesIds:     seriesIds,
	}, nil
}

func (e *PostFilters) ModeratorId() *string {
	return e.moderatorId
}

func (e *PostFilters) ContributorId() *string {
	return e.contributorId
}

func (e *PostFilters) State() *string {
	return e.state
}

func (e *PostFilters) OrderBy() string {
	return e.orderBy
}

func (e *PostFilters) BrandIds() []string {
	return e.brandIds
}

func (e *PostFilters) AudienceIds() []string {
	return e.audienceIds
}

func (e *PostFilters) SeriesIds() []string {
	return e.seriesIds
}

func (e *PostFilters) CategoryIds() []string {
	return e.categoryIds
}

func (e *PostFilters) CharacterIds() []string {
	return e.characterIds
}
