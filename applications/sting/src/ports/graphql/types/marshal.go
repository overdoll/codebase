package types

import (
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalPostToGraphQL(result *post.Post) *Post {

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

	var state PostState

	if result.InReview() {
		state = PostStateReview
	}

	if result.IsProcessing() {
		state = PostStateProcessing
	}

	if result.IsPublishing() {
		state = PostStatePublishing
	}

	if result.IsDiscarded() {
		state = PostStateDiscarded
	}

	if result.IsDiscarding() {
		state = PostStateDiscarding
	}

	if result.IsPublished() {
		state = PostStatePublished
	}

	if result.IsRejected() {
		state = PostStateRejected
	}

	var content []*Content

	for _, id := range result.Content() {
		content = append(content, &Content{URL: graphql.NewURI(id)})
	}

	return &Post{
		ID:                relay.NewID(Post{}, result.ID()),
		Reference:         result.ID(),
		Moderator:         &Account{ID: relay.NewID(Account{}, result.ModeratorId())},
		Contributor:       &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Artist:            &Account{ID: relay.NewID(Account{}, result.ArtistId())},
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

func MarshalArtistToGraphQL(result *post.Artist) *Artist {
	return &Artist{
		ID: relay.NewID(Artist{}, result.ID()),
	}
}

func MarshalMediaToGraphQL(result *post.Media) *Media {
	return &Media{
		ID:        relay.NewID(Media{}, result.ID()),
		Title:     result.Title(),
		Thumbnail: result.ConvertThumbnailToURI(),
	}
}

func MarshalCategoryToGraphQL(result *post.Category) *Category {
	return &Category{
		ID:        relay.NewID(Category{}, result.ID()),
		Thumbnail: result.ConvertThumbnailToURI(),
		Title:     result.Title(),
	}
}

func MarshalCharacterToGraphQL(result *post.Character) *Character {
	return &Character{
		ID:        relay.NewID(Character{}, result.ID()),
		Name:      result.Name(),
		Thumbnail: result.ConvertThumbnailToURI(),
		Media:     MarshalMediaToGraphQL(result.Media()),
	}
}

func MarshalCategoryToGraphQLConnection(results []*post.Category, cursor *paging.Cursor) *CategoryConnection {

	var categories []*CategoryEdge

	conn := &CategoryConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: categories,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *post.Category

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Category {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Category {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		categories = append(categories, &CategoryEdge{
			Node:   MarshalCategoryToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = categories

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalCharacterToGraphQLConnection(results []*post.Character, cursor *paging.Cursor) *CharacterConnection {
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
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalMediaToGraphQLConnection(results []*post.Media, cursor *paging.Cursor) *MediaConnection {
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
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
	}
}

func MarshalPostToGraphQLConnection(results []*post.Post, cursor *paging.Cursor) *PostConnection {
	var posts []*PostEdge

	conn := &PostConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: posts,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *post.Post

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Post {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Post {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		posts = append(posts, &PostEdge{
			Node:   MarshalPostToGraphQL(node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = posts

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}
