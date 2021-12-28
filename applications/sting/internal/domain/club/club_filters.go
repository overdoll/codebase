package club

type Filters struct {
	orderBy        string
	slugs          []string
	search         *string
	ownerAccountId *string
}

func NewFilters(search *string, orderBy string, slugs []string, ownerAccountId *string) (*Filters, error) {
	return &Filters{
		orderBy:        orderBy,
		search:         search,
		slugs:          slugs,
		ownerAccountId: ownerAccountId,
	}, nil
}

func (e *Filters) Search() *string {
	return e.search
}

func (e *Filters) OrderBy() string {
	return e.orderBy
}

func (e *Filters) Slugs() []string {
	return e.slugs
}

func (e *Filters) OwnerAccountId() *string {
	return e.ownerAccountId
}
