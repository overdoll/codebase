package post

import (
	"time"

	"overdoll/libraries/ksuid"
)

type PostPendingState string

const (
	Processing PostPendingState = "processing"
	Review     PostPendingState = "review"
	Publishing PostPendingState = "publishing"
	Published  PostPendingState = "published"
)

type PostPending struct {
	id                 ksuid.UUID
	state              PostPendingState
	artistId           ksuid.UUID
	artistUsername     string
	contributorId      ksuid.UUID
	content            []string
	categories         []string
	characters         []string
	categoriesRequests []string
	charactersRequests []string
	postedAt           time.Time
	reviewRequired     bool
	publishedPostId    string
}
