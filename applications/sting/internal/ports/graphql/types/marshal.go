package types

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

func MarshalPostToGraphQL(ctx context.Context, result *post.Post) *Post {

	var categories []*Category

	for _, cat := range result.Categories() {
		categories = append(categories, MarshalCategoryToGraphQL(ctx, cat))
	}

	var characters []*Character

	for _, char := range result.Characters() {
		characters = append(characters, MarshalCharacterToGraphQL(ctx, char))
	}

	var state PostState

	if result.InDraft() {
		state = PostStateDraft
	}

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

	if result.IsRemoving() {
		state = PostStateRemoving
	}

	if result.IsRemoved() {
		state = PostStateRemoved
	}

	var content []*Resource

	for _, id := range result.ContentResourceIds() {
		content = append(content, &Resource{ID: relay.NewID(Resource{}, result.ID(), id)})
	}

	var audience *Audience

	if result.Audience() != nil {
		audience = MarshalAudienceToGraphQL(ctx, result.Audience())
	}

	var moderator *Account

	if result.ModeratorId() != nil {
		moderator = &Account{ID: relay.NewID(Account{}, *result.ModeratorId())}
	}

	return &Post{
		ID:             relay.NewID(Post{}, result.ID()),
		Reference:      result.ID(),
		Moderator:      moderator,
		Contributor:    &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Club:           &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Audience:       audience,
		State:          state,
		Content:        content,
		Categories:     categories,
		Characters:     characters,
		CreatedAt:      result.CreatedAt(),
		PostedAt:       result.PostedAt(),
		ReassignmentAt: result.ReassignmentAt(),
		Likes:          result.Likes(),
	}
}

func MarshalPostLikeToGraphQL(ctx context.Context, result *post.Like) *PostLike {
	return &PostLike{
		ID:      relay.NewID(PostLike{}, result.PostId(), result.AccountId()),
		LikedAt: result.LikedAt(),
		Post:    &Post{ID: relay.NewID(Post{}, result.PostId())},
		Account: &Account{ID: relay.NewID(Account{}, result.AccountId())},
	}
}

func MarshalAudienceToGraphQL(ctx context.Context, result *post.Audience) *Audience {

	var res *Resource

	if result.ThumbnailResourceId() != "" {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), result.ThumbnailResourceId())}
	}

	return &Audience{
		ID:         relay.NewID(Audience{}, result.ID()),
		Title:      result.Title().Translate(passport.FromContext(ctx).Language(), ""),
		Slug:       result.Slug(),
		Thumbnail:  res,
		TotalLikes: result.TotalLikes(),
	}
}

func MarshalSeriesToGraphQL(ctx context.Context, result *post.Series) *Series {

	var res *Resource

	if result.ThumbnailResourceId() != "" {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), result.ThumbnailResourceId())}
	}

	return &Series{
		ID:         relay.NewID(Series{}, result.ID()),
		Title:      result.Title().Translate(passport.FromContext(ctx).Language(), ""),
		Slug:       result.Slug(),
		Thumbnail:  res,
		TotalLikes: result.TotalLikes(),
	}
}

func MarshalCategoryToGraphQL(ctx context.Context, result *post.Category) *Category {

	var res *Resource

	if result.ThumbnailResourceId() != "" {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), result.ThumbnailResourceId())}
	}

	return &Category{
		ID:         relay.NewID(Category{}, result.ID()),
		Thumbnail:  res,
		Slug:       result.Slug(),
		Title:      result.Title().Translate(passport.FromContext(ctx).Language(), ""),
		TotalLikes: result.TotalLikes(),
	}
}

func MarshalCharacterToGraphQL(ctx context.Context, result *post.Character) *Character {

	var res *Resource

	if result.ThumbnailResourceId() != "" {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), result.ThumbnailResourceId())}
	}

	return &Character{
		ID:         relay.NewID(Character{}, result.ID()),
		Name:       result.Name().Translate(passport.FromContext(ctx).Language(), ""),
		Slug:       result.Slug(),
		Thumbnail:  res,
		Series:     MarshalSeriesToGraphQL(ctx, result.Series()),
		TotalLikes: result.TotalLikes(),
	}
}

func MarshalCategoryToGraphQLConnection(ctx context.Context, results []*post.Category, cursor *paging.Cursor) *CategoryConnection {

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
			Node:   MarshalCategoryToGraphQL(ctx, node),
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

func MarshalCharacterToGraphQLConnection(ctx context.Context, results []*post.Character, cursor *paging.Cursor) *CharacterConnection {
	var characters []*CharacterEdge

	conn := &CharacterConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: characters,
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

	var nodeAt func(int) *post.Character

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Character {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Character {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		characters = append(characters, &CharacterEdge{
			Node:   MarshalCharacterToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = characters

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalSeriesToGraphQLConnection(ctx context.Context, results []*post.Series, cursor *paging.Cursor) *SeriesConnection {
	var series []*SeriesEdge

	conn := &SeriesConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: series,
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

	var nodeAt func(int) *post.Series

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Series {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Series {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		series = append(series, &SeriesEdge{
			Node:   MarshalSeriesToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = series

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalAudienceToGraphQLConnection(ctx context.Context, results []*post.Audience, cursor *paging.Cursor) *AudienceConnection {
	var audiences []*AudienceEdge

	conn := &AudienceConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: audiences,
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

	var nodeAt func(int) *post.Audience

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Audience {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Audience {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		audiences = append(audiences, &AudienceEdge{
			Node:   MarshalAudienceToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = audiences

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalPostToGraphQLConnection(ctx context.Context, results []*post.Post, cursor *paging.Cursor) *PostConnection {
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
			Node:   MarshalPostToGraphQL(ctx, node),
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
