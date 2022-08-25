package types

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func MarshalPostToGraphQL(ctx context.Context, result *post.Post, like *post.Like) *Post {

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

	if result.IsSubmitted() {
		state = PostStateSubmitted
	}

	var content []*PostContent

	for _, res := range result.Content() {

		req := principal.FromContext(ctx)

		resourceId := res.ResourceRequest(req)

		if resourceId != nil {
			content = append(content, &PostContent{
				ID:                                relay.NewID(PostContent{}, result.ID(), resourceId.ID()),
				Resource:                          graphql.MarshalResourceToGraphQL(ctx, resourceId),
				SupporterOnlyResource:             graphql.MarshalResourceToGraphQL(ctx, res.SupporterOnlyResourceRequest(req)),
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

	var descriptionTranslations []*graphql.Translation

	if result.Description() != nil {
		for _, val := range result.Description().Translations() {
			descriptionTranslations = append(descriptionTranslations, &graphql.Translation{
				Language: &graphql.Language{
					Locale: val.Locale(),
					Name:   val.Name(),
				},
				Text: val.Data(),
			})
		}
	}

	var viewerLiked *PostLike

	if like != nil {
		viewerLiked = MarshalPostLikeToGraphQL(ctx, like)
	}

	return &Post{
		ID:                      relay.NewID(Post{}, result.ID()),
		SupporterOnlyStatus:     supporterOnlyStatus,
		Reference:               result.ID(),
		DescriptionTranslations: descriptionTranslations,
		Contributor:             &Account{ID: relay.NewID(Account{}, result.ContributorId())},
		Club:                    &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Audience:                audience,
		ViewerLiked:             viewerLiked,
		State:                   state,
		Content:                 content,
		Categories:              categories,
		Characters:              characters,
		CreatedAt:               result.CreatedAt(),
		PostedAt:                result.PostedAt(),
		Likes:                   result.Likes(),
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

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
	}

	var banner *graphql.Resource

	if result.BannerResource() != nil {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
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
		Reference:         result.ID(),
		TitleTranslations: titleTranslations,
		Slug:              result.Slug(),
		Thumbnail:         res,
		Banner:            banner,
		Standard:          result.IsStandard(),
		TotalLikes:        result.TotalLikes(),
		TotalPosts:        result.TotalPosts(),
	}
}

func MarshalTopicToGraphQL(ctx context.Context, result *post.Topic) *Topic {

	var banner *graphql.Resource

	if result.BannerResource() != nil {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
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

	var descriptionTranslations []*graphql.Translation

	for _, val := range result.Description().Translations() {
		descriptionTranslations = append(descriptionTranslations, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Topic{
		ID:                      relay.NewID(Topic{}, result.ID()),
		Reference:               result.ID(),
		Slug:                    result.Slug(),
		Banner:                  banner,
		TitleTranslations:       titleTranslations,
		DescriptionTranslations: descriptionTranslations,
		Weight:                  result.Weight(),
	}
}

func MarshalRouletteGameStateToGraphQL(ctx context.Context, result *games.RouletteGameState) *RouletteGameState {

	if result == nil {
		return nil
	}

	return &RouletteGameState{
		ID:        relay.NewID(RouletteGameState{}, result.GameSessionId()),
		DiceOne:   result.DiceOne(),
		DiceTwo:   result.DiceTwo(),
		DiceThree: result.DiceThree(),
		Post:      &Post{ID: relay.NewID(Post{}, result.SelectedPostId())},
	}
}

func MarshalGameSessionToGraphQL(ctx context.Context, result *games.Session) *GameSession {

	var gameType GameType

	if result.GameType() == games.Roulette {
		gameType = GameTypeRoulette
	}

	return &GameSession{
		ID:             relay.NewID(GameSession{}, result.Id()),
		Reference:      result.Id(),
		IsClosed:       result.IsClosed(),
		ViewerIsPlayer: result.IsPlayer(passport.FromContext(ctx)),
		Seed:           result.Seed(),
		GameType:       gameType,
	}
}

func MarshalSeriesToGraphQL(ctx context.Context, result *post.Series) *Series {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
	}

	var banner *graphql.Resource

	if result.BannerResource() != nil && result.BannerResource().IsProcessed() {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
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
		Reference:         result.ID(),
		Slug:              result.Slug(),
		TitleTranslations: titleTranslations,
		Thumbnail:         res,
		Banner:            banner,
		TotalLikes:        result.TotalLikes(),
		TotalPosts:        result.TotalPosts(),
	}
}

func MarshalCategoryToGraphQL(ctx context.Context, result *post.Category) *Category {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
	}

	var banner *graphql.Resource

	if result.BannerResource() != nil && result.BannerResource().IsProcessed() {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
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

	var alternativeTitles []*graphql.Translation

	for _, val := range result.AlternativeTitles() {
		alternativeTitles = append(alternativeTitles, &graphql.Translation{
			Language: &graphql.Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	var topic *Topic

	if result.TopicId() != nil {
		topic = &Topic{ID: relay.NewID(Topic{}, *result.TopicId())}
	}

	return &Category{
		ID:                relay.NewID(Category{}, result.ID()),
		Reference:         result.ID(),
		Thumbnail:         res,
		Banner:            banner,
		Slug:              result.Slug(),
		Topic:             topic,
		TitleTranslations: titleTranslations,
		AlternativeTitles: alternativeTitles,
		TotalLikes:        result.TotalLikes(),
		TotalPosts:        result.TotalPosts(),
	}
}

func MarshalCharacterToGraphQL(ctx context.Context, result *post.Character) *Character {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
	}

	var banner *graphql.Resource

	if result.BannerResource() != nil && result.BannerResource().IsProcessed() {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
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
	var series *Series

	if result.Series() != nil {
		series = MarshalSeriesToGraphQL(ctx, result.Series())
	}

	var clb *Club

	if result.ClubId() != nil {
		clb = &Club{ID: relay.NewID(Club{}, *result.ClubId())}
	}

	return &Character{
		ID:               relay.NewID(Character{}, result.ID()),
		Reference:        result.ID(),
		Slug:             result.Slug(),
		Club:             clb,
		Thumbnail:        res,
		Banner:           banner,
		NameTranslations: nameTranslations,
		Series:           series,
		TotalLikes:       result.TotalLikes(),
		TotalPosts:       result.TotalPosts(),
	}
}

func MarshalTopicsToGraphQLConnection(ctx context.Context, results []*post.Topic, cursor *paging.Cursor) *TopicConnection {

	var topics []*TopicEdge

	conn := &TopicConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: topics,
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

	var nodeAt func(int) *post.Topic

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.Topic {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.Topic {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		topics = append(topics, &TopicEdge{
			Node:   MarshalTopicToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = topics

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
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

func MarshalLikedPostToGraphQLConnection(ctx context.Context, results []*post.LikedPost, cursor *paging.Cursor) *PostConnection {
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

	var nodeAt func(int) *post.LikedPost

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post.LikedPost {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post.LikedPost {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		posts = append(posts, &PostEdge{
			Node:   MarshalPostToGraphQL(ctx, node.Post(), node.Like()),
			Cursor: node.Post().Cursor(),
		})
	}

	conn.Edges = posts

	if len(results) > 0 {
		res := results[0].Post().Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Post().Cursor()
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
			Node:   MarshalPostToGraphQL(ctx, node, nil),
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

func MarshalClubMemberToGraphql(ctx context.Context, result *club.Member) *ClubMember {
	return &ClubMember{
		ID:             relay.NewID(ClubMember{}, result.ClubId(), result.AccountId()),
		JoinedAt:       result.JoinedAt(),
		Club:           &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Account:        &Account{ID: relay.NewID(Account{}, result.AccountId())},
		IsSupporter:    result.IsSupporter(),
		SupporterSince: result.SupporterSince(),
	}
}

func MarshalClubSuspensionLogToGraphQL(ctx context.Context, result *club.SuspensionLog) ClubSuspensionLog {

	if result.IsSuspensionRemoval() {
		return &ClubRemovedSuspensionLog{
			ID:      relay.NewID(ClubRemovedSuspensionLog{}, result.Id()),
			Account: &Account{ID: relay.NewID(Account{}, *result.AccountId())},
		}
	}

	var suspensionReason ClubSuspensionReason

	if *result.SuspensionReason() == club.Manual {
		suspensionReason = ClubSuspensionReasonManual
	}

	if *result.SuspensionReason() == club.PostModerationQueue {
		suspensionReason = ClubSuspensionReasonPostModerationQueue
	}

	if *result.SuspensionReason() == club.PostRemoval {
		suspensionReason = ClubSuspensionReasonPostRemoval
	}

	return &ClubIssuedSuspensionLog{
		ID:             relay.NewID(ClubIssuedSuspensionLog{}, result.Id()),
		Account:        &Account{ID: relay.NewID(Account{}, *result.AccountId())},
		Reason:         suspensionReason,
		SuspendedUntil: *result.SuspendedUntil(),
	}
}

func MarshalClubToGraphQL(ctx context.Context, result *club.Club) *Club {

	var thumbnail *graphql.Resource

	if result.ThumbnailResource() != nil {
		thumbnail = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
	}

	var banner *graphql.Resource

	if result.BannerResource() != nil {
		banner = graphql.MarshalResourceToGraphQL(ctx, result.BannerResource())
	}

	var slugAliases []*ClubSlugAlias

	for _, s := range result.SlugAliases() {
		slugAliases = append(slugAliases, &ClubSlugAlias{Slug: s})
	}

	var suspension *ClubSuspension

	if result.Suspended() {
		suspension = &ClubSuspension{Expires: *result.SuspendedUntil()}
	}

	var termination *ClubTermination

	if result.TerminatedByAccountId() != nil {
		termination = &ClubTermination{Account: &Account{ID: relay.NewID(Account{}, *result.TerminatedByAccountId())}}
	}

	accountId := ""

	if passport.FromContext(ctx).Authenticated() == nil {
		accountId = passport.FromContext(ctx).AccountID()
	}

	return &Club{
		ID:                          relay.NewID(Club{}, result.ID()),
		Reference:                   result.ID(),
		CanCreateSupporterOnlyPosts: result.CanCreateSupporterOnlyPosts(),
		CharactersLimit:             result.CharactersLimit(),
		SlugAliasesLimit:            result.SlugAliasLimit(),
		CharactersEnabled:           result.CharactersEnabled(),
		TotalPosts:                  result.TotalPosts(),
		TotalLikes:                  result.TotalLikes(),
		Name:                        result.Name().TranslateDefault(""),
		Slug:                        result.Slug(),
		SlugAliases:                 slugAliases,
		NextSupporterPostTime:       result.NextSupporterPostTime(),
		CanSupport:                  result.CanSupport(),
		MembersCount:                result.MembersCount(),
		Thumbnail:                   thumbnail,
		Banner:                      banner,
		Owner:                       &Account{ID: relay.NewID(Account{}, result.OwnerAccountId())},
		Suspension:                  suspension,
		Termination:                 termination,
		ViewerIsOwner:               accountId == result.OwnerAccountId(),
	}
}

func MarshalClubMembersToGraphQLConnection(ctx context.Context, results []*club.Member, cursor *paging.Cursor) *ClubMemberConnection {
	var clubs []*ClubMemberEdge

	conn := &ClubMemberConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: clubs,
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

	var nodeAt func(int) *club.Member

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club.Member {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club.Member {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		clubs = append(clubs, &ClubMemberEdge{
			Node:   MarshalClubMemberToGraphql(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = clubs

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalClubSuspensionLogsToGraphQLConnection(ctx context.Context, results []*club.SuspensionLog, cursor *paging.Cursor) *ClubSuspensionLogConnection {
	var clubs []*ClubSuspensionLogEdge

	conn := &ClubSuspensionLogConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: clubs,
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

	var nodeAt func(int) *club.SuspensionLog

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club.SuspensionLog {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club.SuspensionLog {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		clubs = append(clubs, &ClubSuspensionLogEdge{
			Node:   MarshalClubSuspensionLogToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = clubs

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalSearchToGraphQLConnection(ctx context.Context, results []interface{}, cursor *paging.Cursor) *SearchConnection {

	var clubs []*SearchEdge

	for _, result := range results {
		switch v := result.(type) {
		case *club.Club:
			clubs = append(clubs, &SearchEdge{
				Cursor: "U2VhcmNoOjo=",
				Node:   MarshalClubToGraphQL(ctx, v),
			})
			break
		case *post.Category:
			clubs = append(clubs, &SearchEdge{
				Cursor: "U2VhcmNoOjo=",
				Node:   MarshalCategoryToGraphQL(ctx, v),
			})
			break
		case *post.Character:
			clubs = append(clubs, &SearchEdge{
				Cursor: "U2VhcmNoOjo=",
				Node:   MarshalCharacterToGraphQL(ctx, v),
			})
			break
		case *post.Series:
			clubs = append(clubs, &SearchEdge{
				Cursor: "U2VhcmNoOjo=",
				Node:   MarshalSeriesToGraphQL(ctx, v),
			})
			break
		default:
			continue
		}

	}

	return &SearchConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: clubs,
	}
}

func MarshalClubsToGraphQLConnection(ctx context.Context, results []*club.Club, cursor *paging.Cursor) *ClubConnection {

	var clubs []*ClubEdge

	conn := &ClubConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: clubs,
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

	var nodeAt func(int) *club.Club

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club.Club {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club.Club {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		clubs = append(clubs, &ClubEdge{
			Node:   MarshalClubToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = clubs

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}
