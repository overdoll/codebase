package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"testing"
)

type Search struct {
	Search *struct {
		Edges []*struct {
			Node struct {
				Item CharacterModified `graphql:"... on Character"`
			}
		}
	} `graphql:"search(query: $query)"`
}

func TestSearch(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var search Search

	err := client.Query(context.Background(), &search, map[string]interface{}{
		"query": graphql.String("Margaret Lee"),
	})

	require.NoError(t, err, "no error searching")

	require.Len(t, search.Search.Edges, 1, "should have found 1 result")
}

type DiscoverClubs struct {
	DiscoverClubs *struct {
		Edges []*struct {
			Node ClubModified
		}
	} `graphql:"discoverClubs()"`
}

func TestDiscoverClubs(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var discoverClubs DiscoverClubs

	err := client.Query(context.Background(), &discoverClubs, nil)

	require.NoError(t, err, "no error grabbing discover clubs")
}

type PostsFeed struct {
	PostsFeed *struct {
		Edges []*struct {
			Node PostModified
		}
	} `graphql:"postsFeed()"`
}

func TestGetPostsFeed(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var postsFeed PostsFeed

	err := client.Query(context.Background(), &postsFeed, nil)

	require.NoError(t, err, "no error grabbing posts feed")
}

type AccountClubMembershipsPostsFeed struct {
	Entities []struct {
		Account struct {
			ID                   string
			ClubMembersPostsFeed *struct {
				Edges []*struct {
					Node PostModified
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func TestGetClubMembershipPostsFeed(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	// seed a post with the club ID that is the account ID for easy lookup in tests
	seedPublishedPostWithClub(t, testingAccountId, clubId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var accountClubMembershipsPostsFeed AccountClubMembershipsPostsFeed

	err := client.Query(context.Background(), &accountClubMembershipsPostsFeed, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing club memberships posts feed")
	require.Len(t, accountClubMembershipsPostsFeed.Entities[0].Account.ClubMembersPostsFeed.Edges, 1, "should have 1 post in club feed")
}

type SuggestedPostsForPost struct {
	Post struct {
		SuggestedPosts *struct {
			Edges []*struct {
				Node PostModified
			}
		}
	} `graphql:"post(reference: $reference)"`
}

func TestGetSuggestedPostsForPost(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	publishedPost := seedPublishedPost(t, testingAccountId, clubId)
	postId := publishedPost.ID()

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var suggestedPosts SuggestedPostsForPost

	err := client.Query(context.Background(), &suggestedPosts, map[string]interface{}{
		"reference": graphql.String(postId),
	})

	require.NoError(t, err, "no error grabbing suggested posts")
}

type ClubTags struct {
	Entities []struct {
		Club struct {
			ID        string
			PostsView types.ClubPostsView
			Tags      *struct {
				Edges []*struct {
					Node struct {
						Item CharacterModified `graphql:"... on Character"`
					}
				}
			}
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func TestGetClubTags(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	clb := seedClub(t, testingAccountId)
	clubId := clb.ID()
	mockAccountNormal(t, testingAccountId)

	// seed a post with the club ID that is the account ID for easy lookup in tests
	seedPublishedPostWithClub(t, testingAccountId, clubId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var clubTags ClubTags

	err := client.Query(context.Background(), &clubTags, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         convertClubIdToRelayId(clubId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing club memberships posts feed")
	require.Len(t, clubTags.Entities[0].Club.Tags.Edges, 1, "should have 1 tag")
	require.Equal(t, types.ClubPostsViewCard, clubTags.Entities[0].Club.PostsView, "should have the correct view")

}
