package event

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type PublishPostHandler struct {
	pi  post.IndexRepository
	pe  post.EventRepository
	pr  post.Repository
	cr  content.Repository
	eva app.EvaService
}

func NewPublishPostHandler(pr post.Repository, pi post.IndexRepository, pe post.EventRepository, cr content.Repository, eva app.EvaService) PublishPostHandler {
	return PublishPostHandler{pr: pr, pi: pi, pe: pe, cr: cr, eva: eva}
}

func (h PublishPostHandler) HandlerName() string {
	return "PublishPostHandler"
}

func (h PublishPostHandler) NewEvent() interface{} {
	return &sting.PostCompleted{}
}

func (h PublishPostHandler) Handle(ctx context.Context, c interface{}) error {

	cmd := c.(*sting.PostCompleted)

	pendingPost, err := h.pr.UpdatePendingPost(ctx, cmd.PostId, func(pending *post.PostPending) (*post.PostPending, error) {

		// Get our contributor
		usr, err := h.eva.GetUser(ctx, pending.Contributor().ID())

		if err != nil {
			return nil, err
		}

		// Update contributor, since our database doesn't contain the reference
		pending.UpdateContributor(usr)

		// This will make sure the state of the post is always "publishing" before publishing - we may get an outdated record
		// from the review stage so it will retry at some point
		if err := pending.MakePublish(); err != nil {
			return nil, err
		}

		// Update content - make the content public by moving it into the public bucket
		newContent, err := h.cr.MakeProcessedContentPublic(ctx, pending.Contributor().ID(), pending.RawContent())

		if err != nil {
			return nil, err
		}

		pending.UpdateContent(newContent)

		// Consume custom categories, characters, medias
		existingMedias, err := h.pr.GetMediasById(ctx, pending.GetExistingMediaIds())

		if err != nil {
			return nil, err
		}

		// use our custom ids from protobuf to ensure idempotency
		pending.UseCustomIdsForCustomResources(cmd.GeneratedIds)

		categories, chars, medias := pending.ConsumeCustomResources(existingMedias)

		// Dispatch events to create our new resources
		if err := h.pe.CategoriesCreated(ctx, categories); err != nil {
			return nil, err
		}

		if err := h.pe.CharactersCreated(ctx, chars); err != nil {
			return nil, err
		}

		if err := h.pe.MediaCreated(ctx, medias); err != nil {
			return nil, err
		}

		return pending, nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	if err := h.pi.IndexPendingPost(ctx, pendingPost); err != nil {
		return err
	}

	// Create a new post
	if err := h.pe.PostCreated(ctx, pendingPost); err != nil {
		return nil
	}

	return nil
}
