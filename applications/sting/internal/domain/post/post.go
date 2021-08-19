package post

import (
	"errors"
	"time"

	"overdoll/applications/sting/internal/domain/resource"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type postState string

const (
	draft      postState = "draft"
	publishing postState = "publishing"
	review     postState = "review"
	published  postState = "published"
	discarding postState = "discarding"
	discarded  postState = "discarded"
	rejected   postState = "rejected"
	processing postState = "processing"
)

var (
	ErrNotDraft         = errors.New("post must be in draft")
	ErrNotPublishing    = errors.New("post must be publishing")
	ErrNotReview        = errors.New("post must be in review")
	ErrNotComplete      = errors.New("post is incomplete")
	ErrNotFound         = errors.New("post not found")
	ErrAlreadyModerated = errors.New("already moderated")
)

type Post struct {
	*paging.Node

	id string

	state postState

	moderatorId   *string
	contributorId string

	brand    *Brand
	audience *Audience

	characters []*Character
	categories []*Category

	content        []*resource.Resource
	createdAt      time.Time
	postedAt       *time.Time
	reassignmentAt *time.Time
}

func NewPost(contributor *principal.Principal) (*Post, error) {
	id := uuid.New()

	return &Post{
		id:            id.String(),
		state:         draft,
		contributorId: contributor.AccountId(),
		createdAt:     time.Now(),
	}, nil
}

func UnmarshalPostFromDatabase(id, state string, moderatorId *string, contributorId string, content []string, brand *Brand, audience *Audience, characters []*Character, categories []*Category, createdAt time.Time, postedAt, reassignmentAt *time.Time) *Post {

	var resources []*resource.Resource

	for _, res := range content {
		resources = append(resources, resource.UnmarshalResourceFromDatabase(res))
	}

	return &Post{
		id:             id,
		moderatorId:    moderatorId,
		state:          postState(state),
		brand:          brand,
		audience:       audience,
		contributorId:  contributorId,
		content:        resources,
		characters:     characters,
		categories:     categories,
		createdAt:      createdAt,
		postedAt:       postedAt,
		reassignmentAt: reassignmentAt,
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

func (p *Post) Audience() *Audience {
	return p.audience
}

func (p *Post) Brand() *Brand {
	return p.brand
}

func (p *Post) State() string {
	return string(p.state)
}

func (p *Post) Content() []*resource.Resource {
	return p.content
}

func (p *Post) UpdateModerator(moderatorId string) error {

	if p.state != review {
		return ErrAlreadyModerated
	}

	newTime := time.Now().Add(time.Hour * 24)

	p.moderatorId = &moderatorId
	p.reassignmentAt = &newTime

	return nil
}

func (p *Post) Categories() []*Category {
	return p.categories
}

func (p *Post) CategoryIds() []string {

	var ids []string

	for _, cats := range p.categories {
		ids = append(ids, cats.ID())
	}

	return ids
}

func (p *Post) CharacterIds() []string {

	var ids []string

	for _, chars := range p.characters {
		ids = append(ids, chars.ID())
	}

	return ids
}

func (p *Post) Characters() []*Character {
	return p.characters
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
	if p.state != publishing {
		return ErrNotPublishing
	}

	p.state = published

	return nil
}

func (p *Post) MakeDiscarding() error {

	if p.state != review {
		return ErrNotReview
	}

	p.state = discarding

	return nil
}

func (p *Post) MakeDiscarded() error {

	if p.state != discarding {
		return ErrNotReview
	}

	p.state = discarded

	p.content = []*resource.Resource{}

	return nil
}

func (p *Post) MakeRejected() error {

	p.state = rejected

	return nil
}

func (p *Post) MakeUndo() error {

	if p.state == discarded || p.state == published {
		return ErrNotComplete
	}

	return nil
}

func (p *Post) MakePublishing() {
	p.state = publishing
}

func (p *Post) MakeProcessing() error {

	p.state = processing

	return nil
}

func (p *Post) InDraft() bool {
	return p.state == draft
}

func (p *Post) InReview() bool {
	return p.state == review
}

func (p *Post) IsPublished() bool {
	return p.state == published
}

func (p *Post) IsPublishing() bool {
	return p.state == publishing
}

func (p *Post) IsProcessing() bool {
	return p.state == processing
}

func (p *Post) IsRejected() bool {
	return p.state == rejected
}

func (p *Post) IsDiscarded() bool {
	return p.state == discarded
}

func (p *Post) IsDiscarding() bool {
	return p.state == discarding
}

func (p *Post) UpdateContent(resources []*resource.Resource) {
	p.content = resources
}

func (p *Post) MakeReview() error {
	p.state = review

	return nil
}

func (p *Post) SubmitPostRequest(requester *principal.Principal, moderatorId string) error {

	if err := p.CanView(requester); err != nil {
		return err
	}

	if p.state != draft {
		return ErrNotDraft
	}

	postTime := time.Now()
	reassignmentAt := time.Now().Add(time.Hour * 24)

	p.moderatorId = &moderatorId
	p.postedAt = &postTime
	p.reassignmentAt = &reassignmentAt
	p.state = processing

	return nil
}

func (p *Post) UpdateBrandRequest(requester *principal.Principal, brand *Brand) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.brand = brand
	return nil
}

func (p *Post) UpdateAudienceRequest(requester *principal.Principal, audience *Audience) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.audience = audience
	return nil
}

func (p *Post) UpdateContentRequest(requester *principal.Principal, content []*resource.Resource) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.content = content
	return nil
}

func (p *Post) UpdateCharactersRequest(requester *principal.Principal, characters []*Character) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.characters = characters
	return nil
}

func (p *Post) UpdateCategoriesRequest(requester *principal.Principal, categories []*Category) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.categories = categories
	return nil
}

func (p *Post) CanUpdate(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(requester.AccountId()); err != nil {
		return err
	}

	if p.state != draft {
		return errors.New("can only update post in draft")
	}

	return nil
}

func (p *Post) CanView(requester *principal.Principal) error {

	if !p.IsPublished() {
		if requester.IsStaff() || requester.IsModerator() {
			return nil
		}

		return requester.BelongsToAccount(requester.AccountId())
	}

	return nil
}
