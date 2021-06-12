package relay

type ConnectionInput struct {
	After  *string `json:"after"`
	Before *string `json:"before"`
	First  *int    `json:"first"`
	Last   *int    `json:"last"`
}

type PageInfo struct {
	HasNextPage     bool    `json:"hasNextPage"`
	HasPreviousPage bool    `json:"hasPreviousPage"`
	StartCursor     *string `json:"startCursor"`
	EndCursor       *string `json:"endCursor"`
}
