package post

import (
	"errors"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrLikeNotFound = errors.New("post like not found")
)

type Like struct {
	postId    string
	accountId string
	likedAt   time.Time
}

func NewLike(acc *principal.Principal, post *Post) (*Like, error) {
	return &Like{
		accountId: acc.AccountId(),
		postId:    post.ID(),
		likedAt:   time.Now(),
	}, nil
}

func UnmarshalLikeFromDatabase(accountId, postId string, likedAt time.Time) *Like {
	return &Like{
		accountId: accountId,
		postId:    postId,
		likedAt:   likedAt,
	}
}

func (m *Like) AccountId() string {
	return m.accountId
}

func (m *Like) PostId() string {
	return m.postId
}

func (m *Like) LikedAt() time.Time {
	return m.likedAt
}

func (m *Like) CanRemove(requester *principal.Principal) error {
	return requester.BelongsToAccount(m.AccountId())
}

func (m *Like) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(m.AccountId())
}
