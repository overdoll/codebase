package post

import (
	"errors"
	"time"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

var (
	ErrNotDraft         = errors.New("post must be in draft")
	ErrNotPublishing    = errors.New("post must be publishing")
	ErrNotReview        = errors.New("post must be in review")
	ErrNotRemoving      = errors.New("post must be removing")
	ErrNotComplete      = errors.New("post is incomplete")
	ErrNotFound         = errors.New("post not found")
	ErrAlreadyModerated = errors.New("already moderated")
)

type Post struct {
	*paging.Node

	id string

	state State

	moderatorId   *string
	contributorId string

	clubId string

	audienceId *string

	characterIds []string
	seriesIds    []string
	categoryIds  []string

	contentResourceIds []string
	createdAt          time.Time
	postedAt           *time.Time
	reassignmentAt     *time.Time

	likes int
}

func NewPost(contributor *principal.Principal, clubId string) (*Post, error) {
	id := uuid.New()

	return &Post{
		id:            id.String(),
		clubId:        clubId,
		state:         Draft,
		contributorId: contributor.AccountId(),
		createdAt:     time.Now(),
	}, nil
}

func UnmarshalPostFromDatabase(id, state string, likes int, moderatorId *string, contributorId string, contentIds []string, clubId string, audienceId *string, characterIds []string, seriesIds []string, categoryIds []string, createdAt time.Time, postedAt, reassignmentAt *time.Time) *Post {

	ps, _ := StateFromString(state)

	return &Post{
		id:                 id,
		moderatorId:        moderatorId,
		state:              ps,
		clubId:             clubId,
		likes:              likes,
		audienceId:         audienceId,
		contributorId:      contributorId,
		contentResourceIds: contentIds,
		characterIds:       characterIds,
		seriesIds:          seriesIds,
		categoryIds:        categoryIds,
		createdAt:          createdAt,
		postedAt:           postedAt,
		reassignmentAt:     reassignmentAt,
	}
}

func (p *Post) ID() string {
	return p.id
}

func (p *Post) ModeratorId() *string {
	return p.moderatorId
}

func (p *Post) ContributorId() string {
	return p.contributorId
}

func (p *Post) AudienceId() *string {
	return p.audienceId
}

func (p *Post) ClubId() string {
	return p.clubId
}

func (p *Post) Likes() int {
	return p.likes
}

func (p *Post) State() State {
	return p.state
}

func (p *Post) ContentResourceIds() []string {
	return p.contentResourceIds
}

func (p *Post) UpdateModerator(moderatorId string) error {

	if p.state != Review {
		return ErrAlreadyModerated
	}

	newTime := time.Now().Add(time.Hour * 24)

	p.moderatorId = &moderatorId
	p.reassignmentAt = &newTime

	return nil
}

func (p *Post) CategoryIds() []string {
	return p.categoryIds
}

func (p *Post) CharacterIds() []string {
	return p.characterIds
}

func (p *Post) SeriesIds() []string {
	return p.seriesIds
}

func (p *Post) CreatedAt() time.Time {
	return p.createdAt
}

func (p *Post) PostedAt() *time.Time {
	return p.postedAt
}

func (p *Post) ReassignmentAt() *time.Time {
	return p.reassignmentAt
}

func (p *Post) MakePublish() error {

	// State of the post needs to be "publishing" before "published"
	if p.state != Publishing {
		return ErrNotPublishing
	}

	p.state = Published

	return nil
}

func (p *Post) AddLike() error {
	p.likes += 1
	return nil
}

func (p *Post) RemoveLike() error {
	p.likes -= 1
	return nil
}

func (p *Post) MakeDiscarding() error {

	if p.state != Review {
		return ErrNotReview
	}

	p.state = Discarding

	return nil
}

func (p *Post) MakeDiscarded() error {

	if p.state != Discarding {
		return ErrNotReview
	}

	p.state = Discarded

	p.contentResourceIds = []string{}

	return nil
}

func (p *Post) MakeRejected() error {

	p.state = Rejected

	return nil
}

func (p *Post) MakeRemoving() error {

	p.state = Removing

	return nil
}

func (p *Post) MakeRemoved() error {

	if p.state != Removing {
		return ErrNotRemoving
	}

	p.state = Removed

	p.contentResourceIds = []string{}

	return nil
}

func (p *Post) MakePublishing() {
	p.state = Publishing
}

func (p *Post) MakeProcessing() error {

	p.state = Processing

	return nil
}

func (p *Post) InDraft() bool {
	return p.state == Draft
}

func (p *Post) InReview() bool {
	return p.state == Review
}

func (p *Post) IsPublished() bool {
	return p.state == Published
}

func (p *Post) IsRemoving() bool {
	return p.state == Removing
}

func (p *Post) IsRemoved() bool {
	return p.state == Removed
}

func (p *Post) IsPublishing() bool {
	return p.state == Publishing
}

func (p *Post) IsProcessing() bool {
	return p.state == Processing
}

func (p *Post) IsRejected() bool {
	return p.state == Rejected
}

func (p *Post) IsDiscarded() bool {
	return p.state == Discarded
}

func (p *Post) IsDiscarding() bool {
	return p.state == Discarding
}

func (p *Post) MakeReview() error {
	p.state = Review

	return nil
}

func (p *Post) SubmitPostRequest(requester *principal.Principal, moderatorId string, allResourcesProcessed bool) error {

	if err := p.CanView(requester); err != nil {
		return err
	}

	if !allResourcesProcessed {
		return errors.New("all resources must be processed before submitting")
	}

	if p.state != Draft {
		return ErrNotDraft
	}

	postTime := time.Now()
	reassignmentAt := time.Now().Add(time.Hour * 24)

	p.moderatorId = &moderatorId
	p.postedAt = &postTime
	p.reassignmentAt = &reassignmentAt
	p.state = Processing

	return nil
}

func (p *Post) UpdateAudienceRequest(requester *principal.Principal, audience *Audience) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}
	id := audience.ID()
	p.audienceId = &id
	return nil
}

func (p *Post) AddContentRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.contentResourceIds = append(p.contentResourceIds, contentIds...)
	return nil
}

func (p *Post) UpdateContentOrderRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if len(contentIds) != len(p.contentResourceIds) {
		return errors.New("missing resources")
	}

	for _, currentContent := range p.contentResourceIds {

		foundContent := false

		for _, newContent := range contentIds {
			if currentContent == newContent {
				foundContent = true
				break
			}
		}

		if !foundContent {
			return errors.New("content was not found as part of post. must send IDs already part of post")
		}
	}

	p.contentResourceIds = contentIds
	return nil
}

func (p *Post) RemoveContentRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var actualContent []string

	for _, content := range p.contentResourceIds {

		foundContent := false

		for _, removedContent := range contentIds {
			if removedContent == content {
				foundContent = true
				continue
			}
		}

		if !foundContent {
			actualContent = append(actualContent, content)
		}
	}

	p.contentResourceIds = actualContent
	return nil
}

func (p *Post) UpdateCharactersRequest(requester *principal.Principal, characters []*Character) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var characterIds []string
	var seriesIds []string
	visitedSeries := make(map[string]bool)

	for _, c := range characters {
		characterIds = append(characterIds, c.id)

		if _, ok := visitedSeries[c.series.id]; !ok {
			seriesIds = append(seriesIds, c.series.id)
			visitedSeries[c.series.id] = true
		}
	}

	p.characterIds = characterIds
	return nil
}

func (p *Post) UpdateCategoriesRequest(requester *principal.Principal, categories []*Category) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var categoryIds []string

	for _, c := range categories {
		categoryIds = append(categoryIds, c.id)
	}

	p.categoryIds = categoryIds
	return nil
}

func (p *Post) CanUpdate(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(requester.AccountId()); err != nil {
		return err
	}

	if p.state != Draft {
		return errors.New("can only update post in draft")
	}

	return nil
}

func (p *Post) CanView(requester *principal.Principal) error {

	if !p.IsPublished() {

		if requester == nil {
			return principal.ErrNotAuthorized
		}

		if requester.IsStaff() || requester.IsModerator() {
			return nil
		}

		return requester.BelongsToAccount(requester.AccountId())
	}

	return nil
}
