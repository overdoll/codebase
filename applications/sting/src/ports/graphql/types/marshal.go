package types

import (
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
)

func MarshalPendingPostToGraphQLConnection(results []*post.PendingPost, page *relay.Paging) *PendingPostConnection {

	var pendingPostEdges []*PendingPostEdge

	for _, pending := range results {
		pendingPostEdges = append(pendingPostEdges, &PendingPostEdge{
			Cursor: pending.Cursor(),
			Node:   MarshalPendingPostToGraphQL(pending),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &PendingPostConnection{
		Edges: pendingPostEdges,
		PageInfo: &relay.PageInfo{
			HasNextPage:     page.HasNextPage(),
			HasPreviousPage: page.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalPendingPostToGraphQL(result *post.PendingPost) *PendingPost {

	// Unmarshal our json into the correct model
	var mediaRequests []string

	for _, med := range result.MediaRequests() {
		mediaRequests = append(mediaRequests, med.Title)
	}

	var characterRequests []*CharacterRequestType

	for _, med := range result.CharacterRequests() {
		characterRequests = append(characterRequests, &CharacterRequestType{
			Name:  med.Name,
			Media: med.Media,
		})
	}

	var categories []*Category

	for _, cat := range result.Categories() {
		categories = append(categories, MarshalCategoryToGraphQL(cat))
	}

	var characters []*Character

	for _, char := range result.Characters() {
		characters = append(characters, MarshalCharacterToGraphQL(char))
	}

	var state PendingPostStateEnum

	if result.InReview() {
		state = PendingPostStateEnumReview
	}

	if result.IsDiscarded() {
		state = PendingPostStateEnumDiscarded
	}

	if result.IsPublished() {
		state = PendingPostStateEnumPublished
	}

	if result.IsRejected() {
		state = PendingPostStateEnumRejected
	}

	var content []*Content

	for _, id := range result.Content() {
		content = append(content, &Content{URL: graphql.NewURI(id)})
	}

	return &PendingPost{
		ID:                relay.NewID(PendingPost{}, result.ID()),
		Moderator:         nil,
		Contributor:       nil,
		Artist:            nil,
		State:             state,
		Content:           content,
		Categories:        categories,
		Characters:        characters,
		MediaRequests:     mediaRequests,
		CharacterRequests: characterRequests,
		PostedAt:          result.PostedAt(),
		ReassignmentAt:    result.ReassignmentAt(),
	}
}

func MarshalArtistToGraphQLConnection(results []*post.Artist, paging *relay.Paging) *ArtistConnection {
	resp := make([]*ArtistEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &ArtistEdge{
			Cursor: result.Cursor(),
			Node:   MarshalArtistToGraphQL(result),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &ArtistConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalArtistToGraphQL(result *post.Artist) *Artist {
	return &Artist{
		ID:       relay.NewID(Artist{}, result.ID()),
		Username: result.Username(),
		Avatar:   result.Avatar(),
	}
}

func MarshalCategoryToGraphQLConnection(results []*post.Category, paging *relay.Paging) *CategoryConnection {
	resp := make([]*CategoryEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &CategoryEdge{
			Cursor: result.Cursor(),
			Node:   MarshalCategoryToGraphQL(result),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &CategoryConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalCategoryToGraphQL(result *post.Category) *Category {
	return &Category{
		ID:        relay.NewID(Category{}, result.ID()),
		Thumbnail: result.Thumbnail(),
		Title:     result.Title(),
	}
}

func MarshalCharacterToGraphQLConnection(results []*post.Character, paging *relay.Paging) *CharacterConnection {
	resp := make([]*CharacterEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &CharacterEdge{
			Cursor: result.Cursor(),
			Node:   MarshalCharacterToGraphQL(result),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &CharacterConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalCharacterToGraphQL(result *post.Character) *Character {
	return &Character{
		ID:        relay.NewID(Character{}, result.ID()),
		Thumbnail: result.Thumbnail(),
		Name:      result.Name(),
		Media:     MarshalMediaToGraphQL(result.Media()),
	}
}

func MarshalMediaToGraphQLConnection(results []*post.Media, paging *relay.Paging) *MediaConnection {
	resp := make([]*MediaEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &MediaEdge{
			Cursor: result.Cursor(),
			Node:   MarshalMediaToGraphQL(result),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		res := results[0].Cursor()
		startCursor = &res
		res = results[len(results)-1].Cursor()
		endCursor = &res
	}

	return &MediaConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalMediaToGraphQL(result *post.Media) *Media {
	return &Media{
		ID:        relay.NewID(Media{}, result.ID()),
		Thumbnail: result.Thumbnail(),
		Title:     result.Title(),
	}
}
