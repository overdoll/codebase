package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/libraries/uuid"
	"testing"
)

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
	mockAccountDigestNormal(t, testingAccountId)

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
	clubId := uuid.New().String()
	mockAccountNormal(t, testingAccountId)
	mockAccountDigestMembership(t, testingAccountId, clubId)

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
	clubId := uuid.New().String()
	mockAccountNormal(t, testingAccountId)
	mockAccountDigestNormal(t, testingAccountId)

	publishedPost := seedPublishedPost(t, testingAccountId, clubId)
	postId := publishedPost.ID()

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var suggestedPosts SuggestedPostsForPost

	err := client.Query(context.Background(), &suggestedPosts, map[string]interface{}{
		"reference": graphql.String(postId),
	})

	require.NoError(t, err, "no error grabbing suggested posts")
}
