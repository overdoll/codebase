package event

import (
	"context"
	"time"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type PostPendingUpdatedHandler struct {
	pe  post.IndexRepository
	cr  character.Repository
	ctr category.Repository
	eva command.EvaService
}

func NewPostPendingUpdatedHandler(pe post.IndexRepository, cr character.Repository, ctr category.Repository) PostPendingUpdatedHandler {
	return PostPendingUpdatedHandler{pe: pe, cr: cr, ctr: ctr}
}

func (h PostPendingUpdatedHandler) HandlerName() string {
	return "PostPendingUpdatedHandler"
}

func (h PostPendingUpdatedHandler) NewEvent() interface{} {
	return &sting.PostPendingUpdated{}
}

func (h PostPendingUpdatedHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.PostPendingUpdated).Post

	categoryIds, err := ksuid.ToUUIDArray(cmd.Categories)

	if err != nil {
		return err
	}

	characterIds, err := ksuid.ToUUIDArray(cmd.Characters)

	if err != nil {
		return err
	}

	characters, err := h.cr.GetCharactersById(ctx, characterIds)

	if err != nil {
		return err
	}

	categories, err := h.ctr.GetCategoriesById(ctx, categoryIds)

	if err != nil {
		return err
	}

	contributorId, err := ksuid.Parse(cmd.ContributorId)

	if err != nil {
		return err
	}

	contributor, err := h.eva.GetUser(ctx, contributorId)

	if err != nil {
		return err
	}

	postId, err := ksuid.Parse(cmd.Id)

	if err != nil {
		return err
	}

	tm, err := time.Parse(time.RFC1123, cmd.PostedAt)

	if err != nil {
		return err
	}

	pst, err := post.NewPendingPost(postId, cmd.ArtistId, cmd.ArtistUsername, contributor, cmd.Content, characters, categories, tm)

	if err != nil {
		return err
	}

	pst.RequestResources(cmd.CharacterRequests, cmd.CategoriesRequests, cmd.MediaRequests)

	var pendingPosts []*post.PostPending
	pendingPosts = append(pendingPosts, pst)

	if err := h.pe.BulkIndexPendingPosts(ctx, pendingPosts); err != nil {
		return err
	}

	return nil
}
