package post

func NewModeratorPostsQueue(moderatorId string) (*Filters, error) {
	return &Filters{
		moderatorId: &moderatorId,
		sortBy:      NewSort,
		state:       Review,
	}, nil
}
