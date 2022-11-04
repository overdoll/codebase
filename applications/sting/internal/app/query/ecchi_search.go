package query

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"strings"
)

type EcchiSearch struct {
	Query string
	Seed  *string
}

type EcchiSearchHandler struct {
	pr post.Repository
}

func NewEcchiSearchHandler(pr post.Repository) EcchiSearchHandler {
	return EcchiSearchHandler{pr: pr}
}

func (h EcchiSearchHandler) Handle(ctx context.Context, query EcchiSearch) ([]*post.Post, error) {

	var categoryIds []string
	var err error

	quer := strings.ToLower(query.Query)

	if quer == "rule34" {
		categoryIds, err = h.pr.GetCategoryIdsFromSlugs(ctx, []string{"rule34"})

		if err != nil {
			return nil, err
		}
	}

	if quer == "boobs" {
		categoryIds, err = h.pr.GetCategoryIdsFromSlugs(ctx, []string{"big-breasts"})

		if err != nil {
			return nil, err
		}
	}

	if quer == "hentai" {
		categoryIds, err = h.pr.GetCategoryIdsFromSlugs(ctx, []string{"hentai"})

		if err != nil {
			return nil, err
		}
	}

	if len(categoryIds) == 0 {
		return nil, nil
	}

	pub := post.Published.String()
	sort := post.AlgorithmSort.String()
	supp := post.None.String()

	filters, err := post.NewPostFilters(
		sort,
		&pub,
		nil,
		[]string{supp},
		nil,
		nil,
		categoryIds,
		nil,
		nil,
		nil,
		false,
		query.Seed,
	)

	if err != nil {
		return nil, err
	}

	limit := 10

	cursor, err := paging.NewCursor(nil, nil, &limit, nil)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	posts, err := h.pr.SearchPosts(ctx, nil, cursor, filters)

	if err != nil {
		return nil, err
	}

	return posts, nil
}
