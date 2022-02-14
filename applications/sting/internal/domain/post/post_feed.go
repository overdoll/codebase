package post

type Feed struct {
	audienceIds []string
	categoryIds []string
}

func NewPostFeed(audienceIds, categoryIds []string) (*Feed, error) {
	return &Feed{
		audienceIds: audienceIds,
		categoryIds: categoryIds,
	}, nil
}

func (e *Feed) CategoryIds() []string {
	return e.categoryIds
}

func (e *Feed) AudienceIds() []string {
	return e.audienceIds
}
