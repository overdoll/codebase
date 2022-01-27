package post

type Feed struct {
	audienceIds      []string
	categoryIds      []string
	suspendedClubIds []string
}

func NewPostFeed(audienceIds, categoryIds, suspendedClubIds []string) (*Feed, error) {
	return &Feed{
		audienceIds:      audienceIds,
		categoryIds:      categoryIds,
		suspendedClubIds: suspendedClubIds,
	}, nil
}

func (e *Feed) CategoryIds() []string {
	return e.categoryIds
}

func (e *Feed) AudienceIds() []string {
	return e.audienceIds
}

func (e *Feed) SuspendedClubIds() []string {
	return e.suspendedClubIds
}
