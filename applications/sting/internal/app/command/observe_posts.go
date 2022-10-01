package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/domain/stats"

	"overdoll/libraries/principal"
)

type ObservePosts struct {
	Principal *principal.Principal
	PostIds   []string
}

type ObservePostsHandler struct {
	pr post.Repository
	st stats.Repository
}

func NewObservePostsHandler(pr post.Repository, st stats.Repository) ObservePostsHandler {
	return ObservePostsHandler{pr: pr, st: st}
}

func (h ObservePostsHandler) Handle(ctx context.Context, cmd ObservePosts) ([]string, error) {

	if cmd.Principal.IsLocked() {
		return nil, principal.ErrNotAuthorized
	}

	if cmd.Principal.IsStaff() || cmd.Principal.IsWorker() || cmd.Principal.IsArtist() {
		return nil, nil
	}

	posts, err := h.pr.GetPostsByIds(ctx, cmd.Principal, cmd.PostIds)

	if err != nil {
		return nil, err
	}

	var postsToObserve []*post.Post

	for _, p := range posts {
		if p.IsPublished() {
			postsToObserve = append(postsToObserve, p)
		}
	}

	if len(postsToObserve) == 0 {
		return nil, nil
	}

	postIds, err := h.st.AddPostObservations(ctx, cmd.Principal, postsToObserve)

	if err != nil {
		return nil, err
	}

	return postIds, nil
}
