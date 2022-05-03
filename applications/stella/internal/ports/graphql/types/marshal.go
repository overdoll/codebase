package types

import (
	"context"
	club2 "overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

func MarshalClubMemberToGraphql(ctx context.Context, result *club2.Member) *ClubMember {
	return &ClubMember{
		ID:             relay.NewID(ClubMember{}, result.ClubId(), result.AccountId()),
		JoinedAt:       result.JoinedAt(),
		Club:           &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Account:        &Account{ID: relay.NewID(Account{}, result.AccountId())},
		IsSupporter:    result.IsSupporter(),
		SupporterSince: result.SupporterSince(),
	}
}

func MarshalClubSuspensionLogToGraphQL(ctx context.Context, result *club2.SuspensionLog) ClubSuspensionLog {

	if result.IsSuspensionRemoval() {
		return &ClubRemovedSuspensionLog{
			ID:      relay.NewID(ClubRemovedSuspensionLog{}, result.Id()),
			Account: &Account{ID: relay.NewID(Account{}, *result.AccountId())},
		}
	}

	var suspensionReason ClubSuspensionReason

	if *result.SuspensionReason() == club2.Manual {
		suspensionReason = ClubSuspensionReasonManual
	}

	if *result.SuspensionReason() == club2.PostModerationQueue {
		suspensionReason = ClubSuspensionReasonPostModerationQueue
	}

	if *result.SuspensionReason() == club2.PostRemoval {
		suspensionReason = ClubSuspensionReasonPostRemoval
	}

	return &ClubIssuedSuspensionLog{
		ID:             relay.NewID(ClubIssuedSuspensionLog{}, result.Id()),
		Account:        &Account{ID: relay.NewID(Account{}, *result.AccountId())},
		Reason:         suspensionReason,
		SuspendedUntil: *result.SuspendedUntil(),
	}
}

func MarshalClubToGraphQL(ctx context.Context, result *club2.Club) *Club {

	var res *Resource

	if result.ThumbnailResourceId() != nil {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), *result.ThumbnailResourceId())}
	}

	var slugAliases []*ClubSlugAlias

	for _, s := range result.SlugAliases() {
		slugAliases = append(slugAliases, &ClubSlugAlias{Slug: s})
	}

	var suspension *ClubSuspension

	if result.Suspended() {
		suspension = &ClubSuspension{Expires: *result.SuspendedUntil()}
	}

	accountId := ""

	if passport.FromContext(ctx).Authenticated() == nil {
		accountId = passport.FromContext(ctx).AccountID()
	}

	return &Club{
		ID:                    relay.NewID(Club{}, result.ID()),
		Reference:             result.ID(),
		Name:                  result.Name().TranslateDefault(""),
		Slug:                  result.Slug(),
		SlugAliases:           slugAliases,
		NextSupporterPostTime: result.NextSupporterPostTime(),
		CanSupport:            result.CanSupport(),
		MembersCount:          result.MembersCount(),
		Thumbnail:             res,
		Owner:                 &Account{ID: relay.NewID(Account{}, result.OwnerAccountId())},
		Suspension:            suspension,
		ViewerIsOwner:         accountId == result.OwnerAccountId(),
	}
}

func MarshalClubMembersToGraphQLConnection(ctx context.Context, results []*club2.Member, cursor *paging.Cursor) *ClubMemberConnection {
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

	var nodeAt func(int) *club2.Member

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club2.Member {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club2.Member {
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

func MarshalClubSuspensionLogsToGraphQLConnection(ctx context.Context, results []*club2.SuspensionLog, cursor *paging.Cursor) *ClubSuspensionLogConnection {
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

	var nodeAt func(int) *club2.SuspensionLog

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club2.SuspensionLog {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club2.SuspensionLog {
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

func MarshalClubsToGraphQLConnection(ctx context.Context, results []*club2.Club, cursor *paging.Cursor) *ClubConnection {
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

	var nodeAt func(int) *club2.Club

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club2.Club {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club2.Club {
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
