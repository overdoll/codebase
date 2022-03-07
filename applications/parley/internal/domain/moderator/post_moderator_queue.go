package moderator

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type PostModeratorQueue struct {
	*paging.Node

	accountId string
	postId    string
	placedAt  time.Time
}

func NewPostModeratorQueue(accountId, postId string) (*PostModeratorQueue, error) {
	return &PostModeratorQueue{
		accountId: accountId,
		postId:    postId,
		placedAt:  time.Now(),
	}, nil
}

func (m *PostModeratorQueue) AccountId() string {
	return m.accountId
}

func (m *PostModeratorQueue) PostId() string {
	return m.postId
}

func (m *PostModeratorQueue) PlacedAt() time.Time {
	return m.placedAt
}

func UnmarshalPostModeratorQueueFromDatabase(accountId, postId string, placedAt time.Time) *PostModeratorQueue {
	return &PostModeratorQueue{
		accountId: accountId,
		postId:    postId,
		placedAt:  placedAt,
	}
}

func CanViewPostModeratorQueue(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
