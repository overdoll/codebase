package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/account"
	"overdoll/libraries/uuid"
)

var (
	errFailedPost = errors.New("post failed")
)

type CreatePendingPostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewCreatePendingPostHandler(pr post.Repository, eva EvaService, parley ParleyService) CreatePendingPostHandler {
	return CreatePendingPostHandler{pr: pr, eva: eva, parley: parley}
}

func (h CreatePendingPostHandler) Handle(ctx context.Context, contributorId, existingArtistId, artistUsername string, posterIsArtist bool, content, characterIds, categoryIds []string, characterRequests map[string]string, mediaRequests []string) (*post.Post, error) {

	// Get our contributor
	contributor, err := h.eva.GetAccount(ctx, contributorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil
	}

	if contributor.IsLocked() {
		return nil, errFailedPost
	}

	characters, err := h.pr.GetCharactersById(ctx, characterIds)

	if err != nil {
		return nil, errFailedPost
	}

	categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

	if err != nil {
		return nil, errFailedPost
	}

	var artist *account.Account

	if posterIsArtist {
		artist, err = h.eva.GetAccount(ctx, contributorId)

		if err != nil {
			zap.S().Errorf("failed to get account: %s", err)
			return nil, errFailedPost
		}
	} else if existingArtistId != "" {
		artist, err = h.eva.GetAccount(ctx, existingArtistId)

		if err != nil {
			zap.S().Errorf("failed to get account: %s", err)
			return nil, errFailedPost
		}
	}

	moderatorId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		zap.S().Errorf("failed to get moderator: %s", err)
		return nil, nil
	}

	pendingPost, err := post.NewPost(uuid.New().String(), moderatorId, artist, artistUsername, contributor, content, characters, categories)

	if err != nil {
		return nil, err
	}

	// Request new resources
	pendingPost.RequestResources(characterRequests, make([]string, 0), mediaRequests)

	_ = pendingPost.MakeProcessing()

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
