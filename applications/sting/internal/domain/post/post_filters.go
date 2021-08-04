package post

type PostFilters struct {
	moderatorId   *string
	contributorId *string
	brandId       *string
	id            string
	categoryIds   []string
	characterIds  []string
	seriesIds     []string
}

func NewPostFilters(moderatorId, contributorId, brandId *string, categoryIds, characterIds, seriesIds []string) (*PostFilters, error) {
	return &PostFilters{
		moderatorId:   moderatorId,
		contributorId: contributorId,
		brandId:       brandId,
		categoryIds:   categoryIds,
		characterIds:  characterIds,
		seriesIds:     seriesIds,
	}, nil
}

func (e *PostFilters) ID() string {
	return e.id
}

func (e *PostFilters) ModeratorId() *string {
	return e.moderatorId
}

func (e *PostFilters) ContributorId() *string {
	return e.contributorId
}

func (e *PostFilters) BrandId() *string {
	return e.brandId
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
