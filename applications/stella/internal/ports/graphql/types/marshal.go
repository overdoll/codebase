package types

import (
	"context"
	club2 "overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

func MarshalClubMemberToGraphql(ctx context.Context, result *club2.Member) *ClubMember {
	return &ClubMember{
		ID:       relay.NewID(ClubMember{}, result.ClubId(), result.AccountId()),
		JoinedAt: result.JoinedAt(),
		Club:     &Club{ID: relay.NewID(Club{}, result.ClubId())},
		Account:  &Account{ID: relay.NewID(Account{}, result.AccountId())},
	}
}

func MarshalClubToGraphQL(ctx context.Context, result *club2.Club) *Club {

	var res *Resource

	if result.ThumbnailResourceId() != "" {
		res = &Resource{ID: relay.NewID(Resource{}, result.ID(), result.ThumbnailResourceId())}
	}

	var slugAliases []*ClubSlugAlias

	for _, s := range result.SlugAliases() {
		slugAliases = append(slugAliases, &ClubSlugAlias{Slug: s})
	}

	return &Club{
		ID:           relay.NewID(Club{}, result.ID()),
		Reference:    result.ID(),
		Name:         result.Name().TranslateDefault(""),
		Slug:         result.Slug(),
		SlugAliases:  slugAliases,
		MembersCount: result.MembersCount(),
		Thumbnail:    res,
		Owner:        &Account{ID: relay.NewID(Account{}, result.OwnerAccountId())},
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
