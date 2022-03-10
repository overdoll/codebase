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
	ErrNotFound         = errors.New("post not found")
	ErrAlreadyModerated = errors.New("already moderated")
)

type Post struct {
	*paging.Node

	id string

	state State

	supporterOnlyStatus SupporterOnlyStatus

	contributorId string

	clubId string

	audienceId *string

	characterIds []string
	seriesIds    []string
	categoryIds  []string

	content []Content

	createdAt time.Time
	postedAt  *time.Time

	likes int
}

func NewPost(requester *principal.Principal, clubId string) (*Post, error) {
	id := uuid.New()

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	return &Post{
		id:                  id.String(),
		clubId:              clubId,
		state:               Draft,
		supporterOnlyStatus: None,
		contributorId:       requester.AccountId(),
		createdAt:           time.Now(),
	}, nil
}

func UnmarshalPostFromDatabase(id, state, supporterOnlyStatus string, likes int, contributorId string, contentResourceIds []string, contentSupporterOnly map[string]bool, contentSupporterOnlyResourceIds map[string]string, clubId string, audienceId *string, characterIds []string, seriesIds []string, categoryIds []string, createdAt time.Time, postedAt *time.Time, requester *principal.Principal, supportedClubIds []string) *Post {

	ps, _ := StateFromString(state)
	so, _ := SupporterOnlyStatusFromString(supporterOnlyStatus)

	requesterIsSupporter := false

	for _, requesterClubId := range supportedClubIds {
		if clubId == requesterClubId {
			requesterIsSupporter = true
			break
		}
	}

	var content []Content

	for _, resourceId := range contentResourceIds {
		content = append(content, Content{
			resourceId:           resourceId,
			resourceIdHidden:     contentSupporterOnlyResourceIds[resourceId],
			isSupporterOnly:      contentSupporterOnly[resourceId],
			canViewSupporterOnly: requesterIsSupporter,
			requester:            requester,
		})
	}

	return &Post{
		id:                  id,
		state:               ps,
		supporterOnlyStatus: so,
		clubId:              clubId,
		likes:               likes,
		audienceId:          audienceId,
		contributorId:       contributorId,
		content:             content,
		characterIds:        characterIds,
		seriesIds:           seriesIds,
		categoryIds:         categoryIds,
		createdAt:           createdAt,
		postedAt:            postedAt,
	}
}

func (p *Post) ID() string {
	return p.id
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

func (p *Post) SupporterOnlyStatus() SupporterOnlyStatus {
	return p.supporterOnlyStatus
}

func (p *Post) Content() []Content {
	return p.content
}

func (p *Post) AllContentResourceIds() []string {
	var resourceIdsToDelete []string
	var resourceIds2ToDelete []string

	for _, cnt := range p.Content() {
		resourceIdsToDelete = append(resourceIdsToDelete, cnt.ResourceId())
		if cnt.ResourceIdHidden() != "" {
			resourceIds2ToDelete = append(resourceIds2ToDelete, cnt.ResourceIdHidden())
		}
	}

	return append(resourceIdsToDelete, resourceIds2ToDelete...)
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

func (p *Post) MakePublish() error {

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

func (p *Post) MakeDiscarded() error {

	p.state = Discarded

	p.content = []Content{}

	return nil
}

func (p *Post) MakeRejected() error {

	p.state = Rejected

	return nil
}

func (p *Post) MakeRemoved() error {

	p.state = Removed

	p.content = []Content{}

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

func (p *Post) IsRemoved() bool {
	return p.state == Removed
}

func (p *Post) IsRejected() bool {
	return p.state == Rejected
}

func (p *Post) IsArchived() bool {
	return p.state == Archived
}

func (p *Post) IsDiscarded() bool {
	return p.state == Discarded
}

func (p *Post) MakeReview() error {
	p.state = Review

	return nil
}

func (p *Post) MakeArchived() error {
	p.state = Archived
	return nil
}

func (p *Post) UpdatePostPostedDate(date time.Time) error {
	p.postedAt = &date
	return nil
}

func (p *Post) SubmitPostRequest(requester *principal.Principal, allResourcesProcessed bool) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if !allResourcesProcessed {
		return errors.New("all resources must be processed before submitting")
	}

	if p.state != Draft {
		return ErrNotDraft
	}

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

func (p *Post) updatePostSupporterOnlyStatus() {

	var supporterOnlyContent []string

	for _, c := range p.content {
		if c.isSupporterOnly {
			supporterOnlyContent = append(supporterOnlyContent, c.resourceId)
		}
	}

	if len(supporterOnlyContent) == 0 {
		p.supporterOnlyStatus = None
	} else if len(supporterOnlyContent) == len(p.content) {
		p.supporterOnlyStatus = Full
	} else {
		p.supporterOnlyStatus = Partial
	}
}

func (p *Post) AddContentRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var newContent []Content

	for _, contentId := range contentIds {
		newContent = append(newContent, Content{
			resourceId:       contentId,
			resourceIdHidden: "",
			isSupporterOnly:  false,
		})
	}

	p.content = append(p.content, newContent...)
	p.updatePostSupporterOnlyStatus()
	return nil
}

func (p *Post) UpdateContentOrderRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if len(contentIds) != len(p.content) {
		return errors.New("missing resources")
	}

	var reorderedContent []Content

	for _, newContent := range contentIds {

		foundContent := false

		for _, currentContent := range p.content {
			if currentContent.resourceId == newContent {
				foundContent = true
				reorderedContent = append(reorderedContent, currentContent)
				break
			}
		}

		if !foundContent {
			return errors.New("content was not found as part of post. must send IDs already part of post")
		}
	}

	p.content = reorderedContent

	return nil
}

func (p *Post) UpdateContentSupporterOnly(requester *principal.Principal, contentIds []string, supporterOnly bool) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var actualContent []Content

	for _, content := range p.content {

		foundContent := false

		for _, updatedContent := range contentIds {
			if updatedContent == content.resourceId {
				foundContent = true
				continue
			}
		}

		if !foundContent {
			actualContent = append(actualContent, content)
		} else {
			content.isSupporterOnly = supporterOnly
			actualContent = append(actualContent, content)
		}
	}

	p.content = actualContent
	p.updatePostSupporterOnlyStatus()
	return nil
}

func (p *Post) RemoveContentRequest(requester *principal.Principal, contentIds []string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var actualContent []Content

	for _, content := range p.content {

		foundContent := false

		for _, removedContent := range contentIds {
			if removedContent == content.resourceId {
				foundContent = true
				continue
			}
		}

		if !foundContent {
			actualContent = append(actualContent, content)
		}
	}

	p.content = actualContent
	p.updatePostSupporterOnlyStatus()
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

func (p *Post) CanDelete(requester *principal.Principal) error {

	if p.state != Published && p.state != Archived && p.state != Removed && p.state != Rejected && p.state != Discarded {
		return errors.New("invalid deletion state for post: post must be archived, draft, removed, rejected, discarded")
	}

	return nil
}

func (p *Post) CanArchive(requester *principal.Principal) error {

	if p.state != Published {
		return errors.New("only published posts can be archived")
	}

	return p.MakeArchived()
}

func (p *Post) CanUnArchive(requester *principal.Principal) error {

	if p.state != Archived {
		return errors.New("only archived posts can be unarchived")
	}

	return p.MakePublish()
}

func (p *Post) CanUpdate(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(requester.AccountId()); err != nil {
		return err
	}

	if requester.IsLocked() {
		return principal.ErrLocked
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
