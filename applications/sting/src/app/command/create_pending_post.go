package command

import (
	"context"
	"errors"
	"time"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
)

var (
	ErrFailedPost = errors.New("post failed")
)

type CreatePendingPostHandler struct {
	pr     post.Repository
	pe     post.WorkflowRepository
	parley ParleyService
	eva    EvaService
}

func NewCreatePendingPostHandler(pr post.Repository, pe post.WorkflowRepository, eva EvaService, parley ParleyService) CreatePendingPostHandler {
	return CreatePendingPostHandler{pr: pr, eva: eva, pe: pe, parley: parley}
}

func (h CreatePendingPostHandler) Handle(ctx context.Context, artistId, artistUsername string, content, characterIds, categoryIds []string, characterRequests map[string]string, mediaRequests []string) (*post.PostPending, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, ErrFailedPost
	}

	contributorId := pass.UserID()

	characters, err := h.pr.GetCharactersById(ctx, characterIds)

	if err != nil {
		return nil, ErrFailedPost
	}

	categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

	if err != nil {
		return nil, ErrFailedPost
	}

	artist := post.NewArtist(artistId, artistUsername)

	// Artist ID is not null, they are not requesting an artist - look for an existing one in the DB
	if artistId != "" {
		artist, err = h.pr.GetArtistById(ctx, artistId)

		if err != nil {

			if err == gocql.ErrNotFound {
				return nil, ErrFailedPost
			}

			zap.S().Errorf("failed to get artist: %s", err)
			return nil, ErrFailedPost
		}
	}

	// Get our contributor
	usr, err := h.eva.GetUser(ctx, contributorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil
	}

	moderatorId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		zap.S().Errorf("failed to get moderator: %s", err)
		return nil, nil
	}

	pendingPost, err := post.NewPendingPost(uuid.New().String(), moderatorId, artist, usr, content, characters, categories, time.Now())

	if err != nil {
		return nil, err
	}

	// Request new resources
	pendingPost.RequestResources(characterRequests, make([]string, 0), mediaRequests)

	_ = pendingPost.MakePublicOrReview()

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePendingPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	err = h.pe.CreatePostWorkflow(ctx, pendingPost)

	if err != nil {
		zap.S().Errorf("failed to create post event: %s", err)
		return nil, err
	}

	return pendingPost, nil
}
