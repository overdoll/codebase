package queries

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

func marshalPendingPostsToGraphQL(results []*post.PostPending) []*types.PendingPost {
	resp := make([]*types.PendingPost, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var mediaRequests []string

		for _, med := range result.MediaRequests() {
			mediaRequests = append(mediaRequests, med.Title)
		}

		var characterRequests []*types.CharacterRequestType

		for _, med := range result.CharacterRequests() {
			characterRequests = append(characterRequests, &types.CharacterRequestType{
				Name:  med.Name,
				Media: med.Media,
			})
		}

		artist := result.Artist()
		id := artist.ID()

		var categories []*types.Category

		for _, cat := range result.Categories() {
			categories = append(categories, &types.Category{
				ID:        cat.ID(),
				Thumbnail: cat.Thumbnail(),
				Title:     cat.Title(),
			})
		}

		var characters []*types.Character

		for _, char := range result.Characters() {
			characters = append(characters, &types.Character{
				ID:        char.ID(),
				Thumbnail: char.Thumbnail(),
				Name:      char.Name(),
				Media: &types.Media{
					ID:        char.Media().ID(),
					Thumbnail: char.Media().Thumbnail(),
					Title:     char.Media().Title(),
				},
			})
		}

		resp = append(resp, &types.PendingPost{
			ID:        result.ID(),
			Moderator: result.ModeratorId(),
			Contributor: &types.Contributor{
				ID:       result.Contributor().ID(),
				Username: result.Contributor().Username(),
				Avatar:   result.Contributor().Avatar(),
			},
			Content:           result.Content(),
			Categories:        categories,
			Characters:        characters,
			MediaRequests:     mediaRequests,
			CharacterRequests: characterRequests,
			ArtistID:          &id,
			ArtistUsername:    artist.Username(),
		})
	}

	return resp
}

type PendingPost struct {
	App *app.Application
}

func (p PendingPost) Edger(node *types.PendingPost, offset int) *types.PendingPostEdge {
	return &types.PendingPostEdge{
		Node:   node,
		Cursor: relay.OffsetToCursor(offset),
	}
}

func (p PendingPost) ConMaker(edges []*types.PendingPostEdge, info *relay.PageInfo, totalCount int) (*types.PendingPostConnection, error) {
	return &types.PendingPostConnection{
		Edges:      edges,
		PageInfo:   info,
		TotalCount: totalCount,
	}, nil
}

func NodeTypeCon(source []*types.PendingPost, nType PendingPost, input relay.ConnectionInput) (*types.PendingPostConnection, error) {
	var edges []*types.PendingPostEdge
	var pageInfo *relay.PageInfo

	emptyCon, _ := nType.ConMaker(edges, pageInfo, 0)

	offset := 0

	if input.After != nil {
		for i, value := range source {
			edge := nType.Edger(value, i)

			if edge.GetCursor() == *input.After {
				// remove all previous element including the "after" one
				source = source[i+1:]
				offset = i + 1
				break
			}
		}
	}

	if input.Before != nil {
		for i, value := range source {
			edge := nType.Edger(value, i+offset)

			if edge.GetCursor() == *input.Before {
				// remove all after element including the "before" one
				break
			}

			edges = append(edges, edge)
		}
	} else {
		edges = make([]*types.PendingPostEdge, len(source))

		for i, value := range source {
			edges[i] = nType.Edger(value, i+offset)
		}
	}

	if input.First != nil {
		if *input.First < 0 {
			return emptyCon, fmt.Errorf("first less than zero")
		}

		if len(edges) > *input.First {
			// Slice result to be of length first by removing edges from the end
			edges = edges[:*input.First]
			pageInfo.HasNextPage = true
		}
	}

	if input.Last != nil {
		if *input.Last < 0 {
			return emptyCon, fmt.Errorf("last less than zero")
		}

		if len(edges) > *input.Last {
			// Slice result to be of length last by removing edges from the start
			edges = edges[len(edges)-*input.Last:]
			pageInfo.HasPreviousPage = true
		}
	}

	return nType.ConMaker(edges, pageInfo, len(source))
}

func (r *QueryResolver) PendingPosts(ctx context.Context, input relay.ConnectionInput, filter types.PendingPostFilters) (*types.PendingPostConnection, error) {

	//pass := passport.FromContext(ctx)

	//if !pass.IsAuthenticated() {
	//	return nil, passport.ErrNotAuthenticated
	//}

	results, err := r.App.Queries.GetPendingPosts.Handle(ctx, "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	if err != nil {
		return nil, err
	}

	source := marshalPendingPostsToGraphQL(results)

	conn, err := NodeTypeCon(source, PendingPost{App: r.App}, input)

	if err != nil {
		return nil, err
	}

	return conn, nil
}
