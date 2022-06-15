package types

import (
	"context"
	"go.opencensus.io/resource"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

func MarshalPostToGraphQL(ctx context.Context, result *post.Post) *Post {

	var categories []*Category

	for _, cat := range result.CategoryIds() {
		categories = append(categories, &Category{
			ID: relay.NewID(Category{}, cat),
		})
	}

	var characters []*Character

	for _, char := range result.CharacterIds() {
		characters = append(characters, &Character{
			ID: relay.NewID(Character{}, char),
		})
	}

	var state PostState

	if result.InDraft() {
		state = PostStateDraft
	}

	if result.InReview() {
		state = PostStateReview
	}

	if result.IsDiscarded() {
		state = PostStateDiscarded
	}

	if result.IsRejected() {
		state = PostStateRejected
	}

	if result.IsPublished() {
		state = PostStatePublished
	}

	if result.IsArchived() {
		state = PostStateArchived
	}

	if result.IsRemoved() {
		state = PostStateRemoved
	}

	var content []*PostContent

	for _, res := range result.Content() {

		resourceId := res.ResourceRequest(principal.FromContext(ctx))

		if resourceId != nil {
			content = append(content, &PostContent{
				ID:                                relay.NewID(PostContent{}, res.Id(), resourceId),
				Resource:                          &Resource{ID: relay.NewID(Resource{}, result.ID(), resourceId)},
				IsSupporterOnly:                   res.IsSupporterOnly(),
				ViewerCanViewSupporterOnlyContent: res.CanViewSupporterOnly(principal.FromContext(ctx)),
			})
		}
	}

	var audience *Audience

	if result.AudienceId() != nil {
		audience = &Audience{
			ID: relay.NewID(Audience{}, *result.AudienceId()),
		}
	}

	var supporterOnlyStatus SupporterOnlyStatus

	if result.SupporterOnlyStatus() == post.Full {
		supporterOnlyStatus = SupporterOnlyStatusFull
	}

	if result.SupporterOnlyStatus() == post.None {
		supporterOnlyStatus = SupporterOnlyStatusNone
	}

	if result.SupporterOnlyStatus() == post.Partial {
		supporterOnlyStatus = SupporterOnlyStatusPartial
	}

	return &Post{
		ID:                  relay.NewID(Post{}, result.ID()),
		SupporterOnlyStatus: supporterOnlyStatus,
		Reference:           result.ID(),
		Contributor:         &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Club:                &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Audience:            audience,
		State:               state,
		Content:             content,
		Categories:          categories,
		Characters:          characters,
		CreatedAt:           result.CreatedAt(),
		PostedAt:            result.PostedAt(),
		Likes:               result.Likes(),
	}
}

func MarshalCurationProfileToGraphQL(ctx context.Context, result *curation.Profile) *CurationProfile {

	var categories []*Category
	var audiences []*Audience

	for _, id := range result.AudienceIds() {
		audiences = append(audiences, &Audience{
			ID: relay.NewID(Audience{}, id),
		})
	}

	for _, id := range result.CategoryIds() {
		categories = append(categories, &Category{
			ID: relay.NewID(Category{}, id),
		})
	}

	return &CurationProfile{
		ID:        relay.NewID(CurationProfile{}, result.AccountId()),
		Completed: result.IsCompleted(),
		DateOfBirth: &DateOfBirthCurationProfile{
			Skipped:     result.DateOfBirthSkipped(),
			Completed:   result.DateOfBirthProfileCompleted(),
			DateOfBirth: result.DateOfBirth(),
		},
		Audience: &AudienceCurationProfile{
			Completed: result.AudienceProfileCompleted(),
			Skipped:   result.AudienceProfileSkipped(),
			Audiences: audiences,
		},
		Category: &CategoryCurationProfile{
			Completed:  result.CategoryProfileCompleted(),
			Skipped:    result.CategoryProfileSkipped(),
			Categories: categories,
		},
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

	if result.ThumbnailResourceId() != nil {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), *result.ThumbnailResourceId())}
	}

	var titleTranslations []*graphql.Translation

	for _, val := range result.Title().Translations() {
		titleTranslations = append(titleTranslations, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Audience{
		ID:                relay.NewID(Audience{}, result.ID()),
		TitleTranslations: titleTranslations,
		Slug:              result.Slug(),
		Thumbnail:         res,
		Standard:          result.IsStandard(),
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalSeriesToGraphQL(ctx context.Context, result *post.Series) *Series {

	var res *Resource

	if result.ThumbnailResourceId() != nil {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), *result.ThumbnailResourceId())}
	}

	var titleTranslations []*graphql.Translation

	for _, val := range result.Title().Translations() {
		titleTranslations = append(titleTranslations, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Series{
		ID:                relay.NewID(Series{}, result.ID()),
		Slug:              result.Slug(),
		TitleTranslations: titleTranslations,
		Thumbnail:         res,
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalCategoryToGraphQL(ctx context.Context, result *post.Category) *Category {

	var res *Resource

	if result.ThumbnailResourceId() != nil {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), *result.ThumbnailResourceId())}
	}

	var titleTranslations []*graphql.Translation

	for _, val := range result.Title().Translations() {
		titleTranslations = append(titleTranslations, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Category{
		ID:                relay.NewID(Category{}, result.ID()),
		Thumbnail:         res,
		Slug:              result.Slug(),
		TitleTranslations: titleTranslations,
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalCharacterToGraphQL(ctx context.Context, result *post.Character) *Character {

	var res *Resource

	if result.ThumbnailResourceId() != nil {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), *result.ThumbnailResourceId())}
	}

	var nameTranslations []*graphql.Translation

	for _, val := range result.Name().Translations() {
		nameTranslations = append(nameTranslations, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Character{
		ID:               relay.NewID(Character{}, result.ID()),
		Slug:             result.Slug(),
		Thumbnail:        res,
		NameTranslations: nameTranslations,
		Series:           MarshalSeriesToGraphQL(ctx, result.Series()),
		TotalLikes:       result.TotalLikes(),
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

func MarshalResourceToGraphQL(ctx context.Context, res *resource.Resource) *Resource {

	var urls []*ResourceURL
	var videoUrl *ResourceURL

	for _, url := range res.FullUrls() {
		urls = append(urls, &ResourceURL{
			URL:      graphql.URI(url.FullUrl()),
			MimeType: url.MimeType(),
		})
	}

	var tp ResourceType

	if res.IsImage() {
		tp = ResourceTypeImage
	}

	if res.IsVideo() {
		tp = ResourceTypeVideo
		url := res.VideoThumbnailFullUrl()

		if url != nil {
			videoUrl = &ResourceURL{
				URL:      graphql.URI(url.FullUrl()),
				MimeType: url.MimeType(),
			}
		}
	}

	return &Resource{
		ID:             relay.NewID(Resource{}, res.ItemId(), res.ID()),
		Processed:      res.IsProcessed(),
		Type:           tp,
		Urls:           urls,
		Width:          res.Width(),
		Height:         res.Height(),
		VideoDuration:  res.VideoDuration(),
		VideoThumbnail: videoUrl,
		Preview:        res.Preview(),
	}
}
