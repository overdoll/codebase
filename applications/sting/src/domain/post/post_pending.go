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

type CharacterRequest struct {
	Name  string
	Media string
}

type CategoryRequest struct {
	Title string
}

type MediaRequest struct {
	Title string
}

type PostPending struct {
	id                 ksuid.UUID
	state              PostPendingState
	artistId           string
	artistUsername     string
	contributorId      ksuid.UUID
	content            []string
	categories         []ksuid.UUID
	characters         []ksuid.UUID
	charactersRequests []CharacterRequest
	categoriesRequests []CategoryRequest
	mediaRequests      []MediaRequest
	postedAt           time.Time
	reviewRequired     bool
	publishedPostId    string
}

func NewPendingPost(id ksuid.UUID, artistId string, artistUsername string, contributorId ksuid.UUID, content []string, characters []ksuid.UUID, categories []ksuid.UUID, review bool) (*PostPending, error) {
	return &PostPending{
		id:             id,
		state:          Processing,
		artistId:       artistId,
		artistUsername: artistUsername,
		contributorId:  contributorId,
		content:        content,
		characters:     characters,
		categories:     categories,
		reviewRequired: review,
		postedAt:       time.Now(),
	}, nil
}

func (p *PostPending) ID() ksuid.UUID {
	return p.id
}

func (p *PostPending) State() PostPendingState {
	return p.state
}

func (p *PostPending) ArtistId() string {
	return p.artistId
}

func (p *PostPending) ArtistUsername() string {
	return p.artistUsername
}

func (p *PostPending) ContributorId() ksuid.UUID {
	return p.contributorId
}

func (p *PostPending) Content() []string {
	return p.content
}

func (p *PostPending) Categories() []ksuid.UUID {
	return p.categories
}

func (p *PostPending) Characters() []ksuid.UUID {
	return p.characters
}

func (p *PostPending) PostedAt() time.Time {
	return p.postedAt
}

func (p *PostPending) ReviewRequired() bool {
	return p.reviewRequired
}

func (p *PostPending) PublishedPostId() string {
	return p.publishedPostId
}

func (p *PostPending) IsPublished() bool {
	return p.publishedPostId != ""
}

func (p *PostPending) CharacterRequests() []CharacterRequest {
	return p.charactersRequests
}

func (p *PostPending) CategoryRequests() []CategoryRequest {
	return p.categoriesRequests
}

func (p *PostPending) MediaRequests() []MediaRequest {
	return p.mediaRequests
}

func (p *PostPending) RequestCharacter(name string, media string, newMedia bool) error {

	p.charactersRequests = append(p.charactersRequests, CharacterRequest{Name: name, Media: media})

	if newMedia {
		p.mediaRequests = append(p.mediaRequests, MediaRequest{Title: media})
	}

	return nil
}

func (p *PostPending) RequestCategory(title string) error {
	p.categoriesRequests = append(p.categoriesRequests, CategoryRequest{Title: title})

	return nil
}

func (p *PostPending) ConfirmRequests() error {
	return nil
}
