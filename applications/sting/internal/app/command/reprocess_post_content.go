package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type ReprocessPostContent struct {
	PostId string
}

type ReprocessPostContentHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewReprocessPostContentHandler(pr post.Repository, loader LoaderService) ReprocessPostContentHandler {
	return ReprocessPostContentHandler{pr: pr, loader: loader}
}

func (h ReprocessPostContentHandler) Handle(ctx context.Context, cmd ReprocessPostContent) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, cmd.PostId)

	if err != nil {
		return err
	}

	var collectedResourceIds []string

	for _, resource := range pst.Content() {
		if resource.Resource() != nil {
			collectedResourceIds = append(collectedResourceIds, resource.Resource().ID())
		}
	}

	if err := h.loader.ReprocessResources(ctx, pst.ID(), collectedResourceIds, 1080, 0); err != nil {
		return err
	}

	return nil
}
