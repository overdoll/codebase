package event

import (
	"context"
	"time"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/post"
)

type PostPendingUpdatedHandler struct {
	pe  post.IndexRepository
	pr  post.Repository
	eva app.EvaService
}

func NewPostPendingUpdatedHandler(pr post.Repository, pe post.IndexRepository, eva app.EvaService) PostPendingUpdatedHandler {
	return PostPendingUpdatedHandler{pr: pr, pe: pe, eva: eva}
}

func (h PostPendingUpdatedHandler) HandlerName() string {
	return "PostPendingUpdatedHandler"
}

func (h PostPendingUpdatedHandler) NewEvent() interface{} {
	return &sting.PostPendingUpdated{}
}

func (h PostPendingUpdatedHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.PostPendingUpdated).Post

	post, err := h.pr.GetPendingPost(ctx, cmd.Id)

	characters, err := h.pr.GetCharactersById(ctx, cmd.Characters)

	if err != nil {
		return err
	}

	categories, err := h.pr.GetCategoriesById(ctx, cmd.Categories)

	if err != nil {
		return err
	}

	contributor, err := h.eva.GetUser(ctx, cmd.ContributorId)

	if err != nil {
		return err
	}

	artist, err = h.pr.GetArtistById(ctx, cmd.ArtistId)

	if err != nil {
		return err
	}

	tm, err := time.Parse(time.RFC1123, cmd.PostedAt)

	if err != nil {
		return err
	}

	pst, err := post.NewPendingPost(artist, cmd.ArtistUsername, contributor, cmd.Content, characters, categories, tm)

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
