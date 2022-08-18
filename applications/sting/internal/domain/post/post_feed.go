package post

import "overdoll/libraries/errors/domainerror"

type Feed struct {
	audienceIds []string
	categoryIds []string
	seed        *string
}

func NewPostFeed(audienceIds, categoryIds []string, seed *string) (*Feed, error) {

	if seed != nil {
		if len(*seed) > 100 {
			return nil, domainerror.NewValidation("seed length too large")
		}
	}

	return &Feed{
		audienceIds: audienceIds,
		categoryIds: categoryIds,
		seed:        seed,
	}, nil
}

func (e *Feed) CategoryIds() []string {
	return e.categoryIds
}

func (e *Feed) AudienceIds() []string {
	return e.audienceIds
}

func (e *Feed) Seed() *string {
	return e.seed
}
