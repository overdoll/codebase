package command

import (
	"context"
	"errors"

	"github.com/gocql/gocql"
	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/uuid"
)

var (
	ErrFailedPost = errors.New("post failed")
)

type CreatePendingPostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewCreatePendingPostHandler(pr post.Repository, eva EvaService, parley ParleyService) CreatePendingPostHandler {
	return CreatePendingPostHandler{pr: pr, eva: eva, parley: parley}
}

func (h CreatePendingPostHandler) Handle(ctx context.Context, contributorId, artistId, artistUsername string, content, characterIds, categoryIds []string, characterRequests map[string]string, mediaRequests []string) (*post.PendingPost, error) {

	// Get our contributor
	usr, err := h.eva.GetAccount(ctx, contributorId)

	if err != nil {
		zap.S().Errorf("failed to get user: %s", err)
		return nil, nil
	}

	if usr.IsLocked() {
		return nil, ErrFailedPost
	}

	characters, err := h.pr.GetCharactersById(ctx, characterIds)

	if err != nil {
		return nil, ErrFailedPost
	}

	categories, err := h.pr.GetCategoriesById(ctx, categoryIds)

	if err != nil {
		return nil, ErrFailedPost
	}

	contributorIsArtist := false

	// no artist ID or username, contributor is our artist
	if artistId == "" && artistUsername == "" {
		artistId = usr.ID()
		artistUsername = usr.Username()
		contributorIsArtist = true
	}

	artist := post.NewArtist(artistId, artistUsername)

	// Artist ID is not null, they are not requesting an artist - look for an existing one in the DB
	if artistId != "" && !contributorIsArtist {
		artist, err = h.pr.GetArtistById(ctx, artistId)

		if err != nil {

			if err == gocql.ErrNotFound {
				return nil, ErrFailedPost
			}

			zap.S().Errorf("failed to get artist: %s", err)
			return nil, ErrFailedPost
		}
	}

	moderatorId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		zap.S().Errorf("failed to get moderator: %s", err)
		return nil, nil
	}

	pendingPost, err := post.NewPendingPost(uuid.New().String(), moderatorId, artist, usr, content, characters, categories)

	if err != nil {
		return nil, err
	}

	// Request new resources
	pendingPost.RequestResources(characterRequests, make([]string, 0), mediaRequests)

	_ = pendingPost.MakeProcessing()

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePendingPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
