package post

import (
	"github.com/go-playground/validator/v10"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"time"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

var (
	ErrNotDraft = domainerror.NewValidation("post must be in draft")
)

type Post struct {
	*paging.Node

	id string

	state State

	description *localization.Translation

	supporterOnlyStatus SupporterOnlyStatus

	contributorId string

	clubId string

	audienceId *string

	characterIds []string

	characterRequests []*CharacterRequest

	seriesIds   []string
	categoryIds []string

	content []*Content

	createdAt time.Time
	updatedAt time.Time
	postedAt  *time.Time

	likes int
	views int
}

func NewPost(requester *principal.Principal, club *club.Club) (*Post, error) {
	id := uuid.New()

	if requester.IsLocked() {
		return nil, principal.ErrLocked
	}

	if !requester.IsWorker() {
		if err := requester.CheckClubOwner(club.ID()); err != nil {
			return nil, err
		}
	}

	return &Post{
		id:                  id.String(),
		clubId:              club.ID(),
		state:               Draft,
		supporterOnlyStatus: None,
		contributorId:       requester.AccountId(),
		createdAt:           time.Now(),
		updatedAt:           time.Now(),
	}, nil
}

func UnmarshalPostFromDatabase(id, state, supporterOnlyStatus string, likes, views int, contributorId string, contentResourceIds []string, contentMedia []*media.Media, contentSupporterOnly map[string]bool, contentSupporterOnlyResourceIds map[string]string, clubId string, audienceId *string, characterIds []string, seriesIds []string, categoryIds []string, createdAt, updatedAt time.Time, postedAt *time.Time, description map[string]string, characterRequests []*CharacterRequest) *Post {

	ps, _ := StateFromString(state)
	so, _ := SupporterOnlyStatusFromString(supporterOnlyStatus)

	var content []*Content

	for _, resourceId := range contentResourceIds {

		var res *media.Media
		var hiddenRes *media.Media

		for _, r := range contentMedia {

			if r.ID() == resourceId {
				res = r
			}

			hidden, okHidden := contentSupporterOnlyResourceIds[resourceId]

			if okHidden {
				if hidden == r.ID() {
					hiddenRes = r
				}
			}
		}

		if res != nil {
			content = append(content, &Content{
				post: &Post{
					id:                  id,
					state:               ps,
					supporterOnlyStatus: so,
					clubId:              clubId,
				},
				media:           res,
				mediaHidden:     hiddenRes,
				isSupporterOnly: contentSupporterOnly[resourceId],
			})
		}

	}

	return &Post{
		id:                  id,
		state:               ps,
		supporterOnlyStatus: so,
		clubId:              clubId,
		description:         localization.UnmarshalTranslationFromDatabase(description),
		likes:               likes,
		views:               views,
		audienceId:          audienceId,
		contributorId:       contributorId,
		content:             content,
		characterIds:        characterIds,
		seriesIds:           seriesIds,
		categoryIds:         categoryIds,
		createdAt:           createdAt,
		updatedAt:           updatedAt,
		postedAt:            postedAt,
		characterRequests:   characterRequests,
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

func (p *Post) Views() int {
	return p.views
}

func (p *Post) Description() *localization.Translation {
	return p.description
}

func (p *Post) State() State {
	return p.state
}

func (p *Post) SupporterOnlyStatus() SupporterOnlyStatus {
	return p.supporterOnlyStatus
}

func (p *Post) Content() []*Content {
	return p.content
}

func (p *Post) CategoryIds() []string {
	return p.categoryIds
}

func (p *Post) CharacterIds() []string {
	return p.characterIds
}

func (p *Post) CharacterRequests() []*CharacterRequest {
	return p.characterRequests
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

func (p *Post) UpdatedAt() time.Time {
	return p.updatedAt
}

func (p *Post) update() {
	p.updatedAt = time.Now()
}

func (p *Post) MakePostBackToDraft() error {

	// reset post back to draft and reset posted_at date
	p.postedAt = nil
	p.state = Draft
	p.update()

	return nil
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

	//p.content = []*Content{}

	return nil
}

func (p *Post) MakeRejected() error {

	p.state = Rejected

	return nil
}

func (p *Post) MakeRemoved() error {

	p.state = Removed

	//p.content = []*Content{}

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

func (p *Post) IsSubmitted() bool {
	return p.state == Submitted
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
	p.state = Submitted
	p.update()
	return nil
}

func (p *Post) UpdateDescription(requester *principal.Principal, description, locale string) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if err := validatePostDescription(description); err != nil {
		return err
	}

	if err := p.description.UpdateTranslation(description, locale); err != nil {
		return err
	}

	p.update()

	return nil
}

func (p *Post) SubmitPostRequest(clb *club.Club, requester *principal.Principal) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if p.state != Draft {
		return ErrNotDraft
	}

	if len(p.content) == 0 {
		return domainerror.NewValidation("cannot submit post without content")
	}

	if clb.SupporterOnlyPostsDisabled() {
		for _, cnt := range p.content {
			if cnt.isSupporterOnly {
				return domainerror.NewValidation("cannot submit post with supporter only content when it is disabled")
			}
		}
	}

	if p.audienceId == nil {
		return domainerror.NewValidation("cannot submit post without audience")
	}

	if len(p.categoryIds) < 3 {
		return domainerror.NewValidation("cannot submit post without at least 3 categories")
	}

	if len(p.characterIds) < 1 && len(p.characterRequests) < 1 {
		return domainerror.NewValidation("cannot submit post without at least 1 character or character request")
	}

	p.update()

	return nil
}

func (p *Post) AllContentResourceIds() []string {

	var resourceIds []string

	for _, cnt := range p.content {
		if cnt.media != nil {
			resourceIds = append(resourceIds, cnt.media.ID())
		}

		if cnt.mediaHidden != nil {
			resourceIds = append(resourceIds, cnt.mediaHidden.ID())
		}
	}

	return resourceIds
}

func (p *Post) UpdateAudienceRequest(requester *principal.Principal, audience *Audience) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}
	id := audience.ID()
	p.audienceId = &id

	p.update()

	return nil
}

func (p *Post) updatePostSupporterOnlyStatus() {

	var supporterOnlyContent []string

	for _, c := range p.content {
		if c.isSupporterOnly {
			supporterOnlyContent = append(supporterOnlyContent, c.media.ID())
		}
	}

	if len(supporterOnlyContent) == 0 {
		p.supporterOnlyStatus = None
	} else if len(supporterOnlyContent) == len(p.content) {
		p.supporterOnlyStatus = Full
	} else {
		p.supporterOnlyStatus = Partial
	}

	p.update()
}

func (p *Post) AddContentRequest(requester *principal.Principal, resources []*media.Media) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	var newContent []*Content

	for _, contentId := range resources {

		found := false

		// only add content if the resource ID is not identical, otherwise we could get issues, i.e. adding the same content twice
		for _, current := range p.content {
			if current.media.ID() == contentId.ID() {
				found = true
				break
			}
		}

		if !found {
			newContent = append(newContent, &Content{
				media:           contentId,
				mediaHidden:     nil,
				isSupporterOnly: false,
				post:            p,
			})
		}
	}

	if len(newContent) > 40 {
		return domainerror.NewValidation("only maximum 40 content pieces allowed")
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
		return domainerror.NewValidation("missing media")
	}

	var reorderedContent []*Content

	for _, newContent := range contentIds {

		foundContent := false

		for _, currentContent := range p.content {
			if currentContent.media.ID() == newContent {
				foundContent = true
				reorderedContent = append(reorderedContent, currentContent)
				break
			}
		}

		if !foundContent {
			return domainerror.NewValidation("content was not found as part of post. must send IDs already part of post")
		}
	}

	p.content = reorderedContent

	p.update()

	return nil
}

func (p *Post) UpdateContentSupporterOnly(clb *club.Club, requester *principal.Principal, contentIds []string, supporterOnly bool) error {

	if supporterOnly {
		if clb.SupporterOnlyPostsDisabled() {
			return domainerror.NewValidation("cannot make supporter only content when disabled for club")
		}
	}

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	if p.state == Published && supporterOnly {
		return domainerror.NewValidation("cannot mark supporter content only as true when already published")
	}

	var actualContent []*Content

	for _, content := range p.content {

		foundContent := false

		for _, updatedContent := range contentIds {
			if updatedContent == content.media.ID() {
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

func (p *Post) RemoveContentRequest(requester *principal.Principal, contentIds []string) ([]*media.Media, error) {

	if err := p.CanUpdate(requester); err != nil {
		return nil, err
	}

	var removedMedia []*media.Media

	var actualContent []*Content

	for _, content := range p.content {

		foundContent := false

		for _, removedContent := range contentIds {
			if removedContent == content.media.ID() {
				foundContent = true
				removedMedia = append(removedMedia, content.media)

				if content.mediaHidden != nil {
					removedMedia = append(removedMedia, content.mediaHidden)
				}

				continue
			}
		}

		if !foundContent {
			actualContent = append(actualContent, content)
		}
	}

	p.content = actualContent
	p.updatePostSupporterOnlyStatus()

	p.update()

	return removedMedia, nil
}

func (p *Post) UpdateCharactersRequests(requester *principal.Principal, characters []*CharacterRequest) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	p.characterRequests = characters
	p.update()

	return nil
}

func (p *Post) UpdateCharacters(characters []*Character) error {
	var characterIds []string
	var seriesIds []string
	visitedSeries := make(map[string]bool)

	for _, c := range characters {

		characterIds = append(characterIds, c.id)

		if c.series != nil {
			if _, ok := visitedSeries[c.series.id]; !ok {
				seriesIds = append(seriesIds, c.series.id)
				visitedSeries[c.series.id] = true
			}
		}
	}

	p.seriesIds = seriesIds
	p.characterIds = characterIds

	p.update()

	return nil
}

func (p *Post) UpdateCharactersRequest(requester *principal.Principal, characters []*Character) error {

	if err := p.CanUpdate(requester); err != nil {
		return err
	}

	return p.UpdateCharacters(characters)
}

func (p *Post) RemoveCategory(categoryId string) error {
	var categoryIds []string

	for _, c := range p.categoryIds {

		if c != categoryId {
			categoryIds = append(categoryIds, c)
		}

	}

	p.categoryIds = categoryIds
	p.update()

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

	p.update()

	return nil
}

func (p *Post) CanDelete(requester *principal.Principal) error {

	if p.state != Removed && p.state != Rejected && p.state != Discarded && p.state != Draft && p.state != Archived {
		return domainerror.NewValidation("invalid deletion state for post: post must be draft, removed, rejected, discarded, archived")
	}

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(p.ContributorId())
}

func (p *Post) CanArchive(requester *principal.Principal) error {

	if p.state != Published {
		return domainerror.NewValidation("only published posts can be archived")
	}

	if err := requester.CheckClubOwner(p.clubId); err != nil {
		return err
	}

	return p.MakeArchived()
}

func (p *Post) CanUnArchive(requester *principal.Principal) error {

	if p.state != Archived {
		return domainerror.NewValidation("only archived posts can be unarchived")
	}

	if err := requester.CheckClubOwner(p.clubId); err != nil {
		return err
	}

	return p.MakePublish()
}

func (p *Post) CanAddContent(requester *principal.Principal) error {
	return p.CanUpdate(requester)
}

func (p *Post) CanUpdate(requester *principal.Principal) error {

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	// staff && workers can update posts that are published
	if (requester.IsStaff() || requester.IsWorker() || requester.IsModerator()) && (p.state == Published || p.state == Review) {
		return nil
	}

	// artists who are club owners can also update the post
	if err := requester.CheckClubOwner(p.clubId); err == nil {
		if requester.IsArtist() && p.state == Published {
			return nil
		}
	}

	if p.state != Draft {
		return domainerror.NewValidation("can only update posts that are in draft")
	}

	if !requester.IsWorker() {
		if err := requester.CheckClubOwner(p.clubId); err != nil {
			return requester.BelongsToAccount(requester.AccountId())
		}
	}

	return nil
}

func (p *Post) CanView(suspendedClubIds []string, requester *principal.Principal) error {

	if !p.IsPublished() {

		if requester == nil {
			return principal.ErrNotAuthorized
		}

		if requester.IsStaff() || requester.IsModerator() || requester.IsWorker() {
			return nil
		}

		if err := requester.CheckClubOwner(p.clubId); err != nil {
			return requester.BelongsToAccount(requester.AccountId())
		}

		return nil
	}

	found := false

	for _, id := range suspendedClubIds {
		if id == p.clubId {
			found = true
			break
		}
	}

	// if club is suspended, return not found
	if found {

		// check for staff or moderator
		if requester.IsStaff() || requester.IsModerator() || requester.IsWorker() {
			return nil
		}

		// not owner, return not found
		if err := requester.CheckClubOwner(p.clubId); err != nil {

			if err := requester.BelongsToAccount(p.ContributorId()); err != nil {
				return apperror.NewNotFoundError("post", p.id)
			}

			return nil
		}

		return nil
	}

	return nil
}

func validateExistingResource(current *media.Media, new *media.Media) error {
	if current == nil {
		return media.ErrMediaNotPresent
	}

	if current.ID() != new.ID() {
		return media.ErrMediaNotPresent
	}

	return nil
}

func validatePostDescription(name string) error {

	err := validator.New().Var(name, "max=280")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
