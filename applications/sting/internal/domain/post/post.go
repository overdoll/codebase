package post

import (
	"errors"
	"os"
	"time"

	"overdoll/libraries/graphql"
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

	moderatorId   string
	contributorId string
	brandId       string

	characters []*Character
	categories []*Category

	content        []string
	createdAt      time.Time
	postedAt       time.Time
	reassignmentAt time.Time
}

func NewPost(contributor *principal.Principal, content []string) (*Post, error) {
	id := uuid.New()

	return &Post{
		id:            id.String(),
		moderatorId:   "",
		state:         draft,
		brandId:       "",
		contributorId: contributor.AccountId(),
		content:       content,
		createdAt:     time.Now(),
	}, nil
}

func UnmarshalPostFromDatabase(id, state, moderatorId, brandId, contributorId string, content []string, characters []*Character, categories []*Category, createdAt, postedAt, reassignmentAt time.Time) *Post {
	return &Post{
		id:             id,
		moderatorId:    moderatorId,
		state:          postState(state),
		brandId:        brandId,
		contributorId:  contributorId,
		content:        content,
		characters:     characters,
		categories:     categories,
		createdAt:      createdAt,
		postedAt:       postedAt,
		reassignmentAt: reassignmentAt,
	}
}

func (p *Post) UpdatePost(brandId string, content []string, characters []*Character, categories []*Category) error {
	p.brandId = brandId
	p.content = content
	p.characters = characters
	p.categories = categories
	return nil
}

func (p *Post) ID() string {
	return p.id
}

func (p *Post) ModeratorId() string {
	return p.moderatorId
}

func (p *Post) ContributorId() string {
	return p.contributorId
}

func (p *Post) BrandId() string {
	return p.brandId
}

func (p *Post) State() string {
	return string(p.state)
}

func (p *Post) Content() []string {
	return p.content
}

func (p *Post) ConvertContentToURI() []graphql.URI {

	var generatedContent []graphql.URI

	for _, image := range p.content {

		baseUrl := os.Getenv("STATIC_URL") + "/" + "pending_posts"

		if p.state == published {
			baseUrl = os.Getenv("POSTS_URL")
		}

		// generate the proper content url
		generatedContent = append(generatedContent, graphql.NewURI(baseUrl+"/"+p.contributorId+"/"+image))
	}

	return generatedContent
}

func (p *Post) UpdateModerator(moderatorId string) error {

	if p.state != review {
		return ErrAlreadyModerated
	}

	p.moderatorId = moderatorId
	p.reassignmentAt = time.Now().Add(time.Hour * 24)

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

func (p *Post) PostedAt() time.Time {
	return p.postedAt
}

func (p *Post) ReassignmentAt() time.Time {
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

	p.content = []string{}

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

func (p *Post) UpdateContent(content []string) {
	p.content = content
}

func (p *Post) MakeReview() error {
	p.state = review

	return nil
}

func (p *Post) UploadPost(moderatorId string) {
	p.moderatorId = moderatorId
	p.postedAt = time.Now()
	p.reassignmentAt = time.Now().Add(time.Hour * 24)
	p.state = processing
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

func CanViewWithFilters(requester *principal.Principal, filter *PostFilters) error {

	// filtering by moderator
	if filter.ModeratorId() != nil {

		if requester.IsStaff() {
			return nil
		}

		return requester.BelongsToAccount(*filter.ModeratorId())
	}

	return nil
}
