package post

type CategoryFilters struct {
	sortBy       Sorting
	slugs        []string
	title        *string
	topicId      *string
	excludeEmpty bool
}

func NewCategoryFilters(title *string, sortBy string, slugs []string, topicId *string, excludeEmpty bool) (*CategoryFilters, error) {

	sorting := UnknownSort
	var err error

	if sortBy != "" {
		sorting, err = SortingFromString(sortBy)

		if err != nil {
			return nil, err
		}
	}

	return &CategoryFilters{
		sortBy:       sorting,
		title:        title,
		slugs:        slugs,
		topicId:      topicId,
		excludeEmpty: excludeEmpty,
	}, nil
}

func (e *CategoryFilters) Title() *string {
	return e.title
}

func (e *CategoryFilters) TopicId() *string {
	return e.topicId
}

func (e *CategoryFilters) SortBy() Sorting {
	return e.sortBy
}

func (e *CategoryFilters) Slugs() []string {
	return e.slugs
}

func (e *CategoryFilters) ExcludeEmpty() bool {
	return e.excludeEmpty
}
