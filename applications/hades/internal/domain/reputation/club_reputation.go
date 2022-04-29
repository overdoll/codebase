package billing

import (
	"overdoll/libraries/paging"
)

type ClubReputation struct {
	*paging.Node

	clubId string
	score  int64
}

func (c *ClubReputation) ClubId() string {
	return c.clubId
}

func (c *ClubReputation) Score() int64 {
	return c.score
}
