package post

type PostFilters struct {
	moderatorId   *string
	contributorId *string
	brandId       *string
	audienceId    *string
	categoryIds   []string
	characterIds  []string
	seriesIds     []string
}

func NewPostFilters(moderatorId, contributorId, brandId, audienceId *string, categoryIds, characterIds, seriesIds []string) (*PostFilters, error) {
	return &PostFilters{
		moderatorId:   moderatorId,
		audienceId:    audienceId,
		contributorId: contributorId,
		brandId:       brandId,
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

func (e *PostFilters) BrandId() *string {
	return e.brandId
}

func (e *PostFilters) AudienceId() *string {
	return e.audienceId
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
