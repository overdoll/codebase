package moderator

import (
	"errors"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrInvalidModerator      = errors.New("moderator does not match")
	ErrPostModeratorNotFound = errors.New("post moderator not found")
)

type PostModerator struct {
	*paging.Node

	accountId      string
	postId         string
	placedAt       time.Time
	reassignmentAt time.Time
}

func NewPostModerator(accountId, postId string) (*PostModerator, error) {
	return &PostModerator{
		accountId:      accountId,
		postId:         postId,
		placedAt:       time.Now(),
		reassignmentAt: time.Now().Add(time.Hour * 24),
	}, nil
}

func (m *PostModerator) AccountId() string {
	return m.accountId
}

func (m *PostModerator) PostId() string {
	return m.postId
}

func (m *PostModerator) PlacedAt() time.Time {
	return m.placedAt
}

func (m *PostModerator) ReassignmentAt() time.Time {
	return m.reassignmentAt
}

func (m *PostModerator) CanRejectPost(requester *principal.Principal, ruleInstance *rule.Rule) error {
	// Do some permission checks here to make sure the proper user is doing everything

	if ruleInstance.Deprecated() {
		return rule.ErrRuleDeprecated
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != m.AccountId() {
			return ErrInvalidModerator
		}
	}

	return nil
}

func (m *PostModerator) CanApprovePost(requester *principal.Principal) error {
	if !requester.IsStaff() {
		// ensure moderator is the same as the one who is doing the moderation
		if requester.AccountId() != m.AccountId() {
			return ErrInvalidModerator
		}
	}

	return nil
}

func UnmarshalPostModeratorFromDatabase(accountId, postId string, placedAt, reassignmentAt time.Time) *PostModerator {
	return &PostModerator{
		accountId:      accountId,
		postId:         postId,
		placedAt:       placedAt,
		reassignmentAt: reassignmentAt,
	}
}

func CanViewPostModerator(requester *principal.Principal, accountId string) error {

	if !requester.IsStaff() {

		if requester.IsModerator() {

			if err := requester.BelongsToAccount(accountId); err != nil {
				return err
			}

			return nil
		}
	}

	return principal.ErrNotAuthorized
}
