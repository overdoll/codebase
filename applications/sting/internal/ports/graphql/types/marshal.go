package types

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
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
				ID:                                relay.NewID(PostContent{}, result.ID(), resourceId.ID()),
				Resource:                          graphql.MarshalResourceToGraphQL(ctx, resourceId),
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

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
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
		Standard:          result.IsStandard(),
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalSeriesToGraphQL(ctx context.Context, result *post.Series) *Series {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
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
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalCategoryToGraphQL(ctx context.Context, result *post.Category) *Category {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
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
		Reference:         result.ID(),
		Thumbnail:         res,
		Slug:              result.Slug(),
		TitleTranslations: titleTranslations,
		TotalLikes:        result.TotalLikes(),
	}
}

func MarshalCharacterToGraphQL(ctx context.Context, result *post.Character) *Character {

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
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
		Reference:        result.ID(),
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

	var res *graphql.Resource

	if result.ThumbnailResource() != nil {
		res = graphql.MarshalResourceToGraphQL(ctx, result.ThumbnailResource())
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
		Name:                        result.Name().TranslateDefault(""),
		Slug:                        result.Slug(),
		SlugAliases:                 slugAliases,
		NextSupporterPostTime:       result.NextSupporterPostTime(),
		CanSupport:                  result.CanSupport(),
		MembersCount:                result.MembersCount(),
		Thumbnail:                   res,
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
