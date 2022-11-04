package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubModified struct {
	ID          relay.ID
	Reference   string
	Slug        string
	Name        string
	Blurb       string
	Termination *struct {
		Account struct {
			Id string
		}
	}
	SlugAliases []struct {
		Slug string
	}
	ThumbnailMedia *struct {
		ImageMedia struct {
			Id relay.ID
		} `graphql:"... on ImageMedia"`
	}
	BannerMedia *struct {
		ImageMedia struct {
			Id relay.ID
		} `graphql:"... on ImageMedia"`
	}
	Header *struct {
		ImageMedia struct {
			Id relay.ID
		} `graphql:"... on ImageMedia"`
	}
	ViewerIsOwner               bool
	CanSupport                  bool
	CanCreateSupporterOnlyPosts bool
	NextSupporterPostTime       *time.Time
	Suspension                  *types.ClubSuspension
}

type Club struct {
	Club *ClubModified `graphql:"club(slug: $slug)"`
}

func getClub(t *testing.T, client *graphql.Client, id string) Club {

	var club Club

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

type AccountClubs struct {
	Entities []struct {
		Account struct {
			HasNonTerminatedClubs bool
			ID                    string
			ClubsLimit            int
			ClubsCount            int
			Clubs                 *struct {
				Edges []*struct {
					Node struct {
						ID    string
						Owner struct {
							ID string
						}
					}
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}
type _Any map[string]interface{}

type CreateClub struct {
	CreateClub *struct {
		Club *ClubModified
	} `graphql:"createClub(input: $input)"`
}

type TransferClubOwnership struct {
	TransferClubOwnership *struct {
		Club *ClubModified
	} `graphql:"transferClubOwnership(input: $input)"`
}

func TestCreateClub_and_check_permission(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	grpcClient := getGrpcClient(t)

	can, err := grpcClient.CanDeleteAccountData(context.Background(), &sting.CanDeleteAccountDataRequest{AccountId: testingAccountId})
	require.NoError(t, err, "no error seeing if you can delete account data")
	require.True(t, can.CanDelete, "should be able to delete")

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.CreateClub, mock.Anything)

	flowRun := &mocks.WorkflowRun{}

	flowRun.
		On("Get", mock.Anything, mock.Anything).
		Return(nil)

	application.TemporalClient.
		On("GetWorkflow", mock.Anything, "sting.CreateClub_"+testingAccountId, mock.Anything).
		// on GetWorkflow command, this would check if the workflow was completed
		// so we run our workflow to make sure it's completed
		Run(
			func(args mock.Arguments) {
				workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())
				refreshClubESIndex(t)
			},
		).
		Return(flowRun)

	var createClub CreateClub

	fake := TestClub{}
	err = faker.FakeData(&fake)
	require.NoError(t, err)

	err = client.Mutate(context.Background(), &createClub, map[string]interface{}{
		"input": types.CreateClubInput{
			Slug: fake.Slug,
			Name: fake.Name,
		},
	})

	require.NoError(t, err)

	newClb := getClub(t, client, fake.Slug)
	require.Equal(t, newClb.Club.Slug, fake.Slug, "should see club with correct slug")
	require.True(t, newClb.Club.ViewerIsOwner, "creator should be owner of club")
	require.False(t, newClb.Club.CanSupport, "should not be able to support a newly created club")
	require.Nil(t, newClb.Club.NextSupporterPostTime, "next support time should be nil")

	can, err = grpcClient.CanDeleteAccountData(context.Background(), &sting.CanDeleteAccountDataRequest{AccountId: testingAccountId})
	require.NoError(t, err, "no error seeing if you can delete account data")
	require.False(t, can.CanDelete, "cannot delete account anymore")

	// refresh index or else we don't see it
	refreshClubESIndex(t)

	// check permissions
	res, err := grpcClient.GetAccountClubDigest(context.Background(), &sting.GetAccountClubDigestRequest{
		AccountId: testingAccountId,
	})

	require.NoError(t, err, "no error checking permission")
	require.Equal(t, newClb.Club.Reference, res.OwnerClubIds[0], "should be owner of club")

	_, err = grpcClient.GetClubById(context.Background(), &sting.GetClubByIdRequest{
		ClubId: newClb.Club.Reference,
	})
	require.NoError(t, err, "no error getting club")

	var accountClubs AccountClubs
	err = client.Query(context.Background(), &accountClubs, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err)
	require.Equal(t, 1, len(accountClubs.Entities[0].Account.Clubs.Edges), "should have 1 club")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsCount, "should have 1 count")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsLimit, "should have 3 limit")

	require.True(t, accountClubs.Entities[0].Account.HasNonTerminatedClubs, "has non terminated clubs")

	newAccountId := newFakeAccount(t)
	mockAccountNormal(t, newAccountId)

	staffAccountId := newFakeAccount(t)
	mockAccountStaff(t, staffAccountId)

	client = getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.TransferClubOwnership, mock.Anything)

	var transferClubOwnership TransferClubOwnership

	err = client.Mutate(context.Background(), &transferClubOwnership, map[string]interface{}{
		"input": types.TransferClubOwnershipInput{
			ClubID:    newClb.Club.ID,
			AccountID: convertAccountIdToRelayId(newAccountId),
		},
	})

	require.NoError(t, err, "no error transferring club ownership")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	refreshClubESIndex(t)

	client = getGraphqlClientWithAuthenticatedAccount(t, newAccountId)
	newClb = getClub(t, client, fake.Slug)

	require.True(t, newClb.Club.ViewerIsOwner, "viewer is owner now")

	err = client.Query(context.Background(), &accountClubs, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(newAccountId),
			},
		},
	})

	require.NoError(t, err)
	require.Equal(t, 1, len(accountClubs.Entities[0].Account.Clubs.Edges), "should have 1 clubs")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsCount, "should have 1 count")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsLimit, "should have 1 limit")

	client = getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	newClb = getClub(t, client, fake.Slug)

	require.False(t, newClb.Club.ViewerIsOwner, "old viewer is no longer owner")

	err = client.Query(context.Background(), &accountClubs, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err)
	require.Equal(t, 0, len(accountClubs.Entities[0].Account.Clubs.Edges), "should have 0 clubs")
	require.Equal(t, 0, accountClubs.Entities[0].Account.ClubsCount, "should have 0 count")
	require.Equal(t, 1, accountClubs.Entities[0].Account.ClubsLimit, "should have 1 limit")
}

type AddClubSlugAlias struct {
	AddClubSlugAlias *struct {
		Club *ClubModified
	} `graphql:"addClubSlugAlias(input: $input)"`
}

type PromoteClubSlugAliasToDefault struct {
	PromoteClubSlugAliasToDefault *struct {
		Club *ClubModified
	} `graphql:"promoteClubSlugAliasToDefault(input: $input)"`
}

type RemoveClubSlugAlias struct {
	RemoveClubSlugAlias *struct {
		Club *ClubModified
	} `graphql:"removeClubSlugAlias(input: $input)"`
}

// TestCreatClub_and_edit_slugs - create a club and edit its slugs
func TestCreateClub_edit_slugs(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)
	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	oldSlug := clb.Slug()

	// create a test slug we can use
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake data for club")

	newSlug := fake.Slug

	// add the alias
	var addClubSlugAlias AddClubSlugAlias
	err = client.Mutate(context.Background(), &addClubSlugAlias, map[string]interface{}{
		"input": types.AddClubSlugAliasInput{
			ID:   relayId,
			Slug: newSlug,
		},
	})
	require.NoError(t, err, "no error adding slug")

	updatedClb := getClub(t, client, newSlug)
	require.NotNil(t, updatedClb.Club, "can find club using new slug")

	foundNewAlias := false
	for _, alias := range updatedClb.Club.SlugAliases {
		if alias.Slug == newSlug {
			foundNewAlias = true
		}
	}
	require.True(t, foundNewAlias, "found alias in list")

	// promote the slug to primary
	var promoteClubSlugAliasToDefault PromoteClubSlugAliasToDefault
	err = client.Mutate(context.Background(), &promoteClubSlugAliasToDefault, map[string]interface{}{
		"input": types.PromoteClubSlugAliasToDefaultInput{
			ID:   relayId,
			Slug: newSlug,
		},
	})
	require.NoError(t, err, "no error promoting slug to primary")

	// should be new slug
	updatedClb = getClub(t, client, newSlug)
	require.Equal(t, newSlug, updatedClb.Club.Slug)

	// find old slug in list
	foundOldAlias := false
	for _, alias := range updatedClb.Club.SlugAliases {
		if alias.Slug == oldSlug {
			foundOldAlias = true
		}
	}
	require.True(t, foundOldAlias, "found old alias in list")

	// should be able to find club with old slug
	updatedClb = getClub(t, client, oldSlug)
	require.NotNil(t, updatedClb.Club, "can find club using old slug")

	// remove club slug alias
	var removeClubSlugAlias RemoveClubSlugAlias
	err = client.Mutate(context.Background(), &removeClubSlugAlias, map[string]interface{}{
		"input": types.RemoveClubSlugAliasInput{
			ID:   relayId,
			Slug: oldSlug,
		},
	})
	require.NoError(t, err, "no error removing old slug")

	// make sure you cannot find club using that slug anymore
	updatedClb = getClub(t, client, oldSlug)
	require.Nil(t, updatedClb.Club, "cannot find club after removing slug")

	// make sure it doesn't exist in the list
	updatedClb = getClub(t, client, newSlug)

	require.Len(t, updatedClb.Club.SlugAliases, 0, "alias list should be 0 now")
}

type UpdateClubName struct {
	UpdateClubName *struct {
		Club *ClubModified
	} `graphql:"updateClubName(input: $input)"`
}

// TestCreateClub_edit_name - create a club and edit the name
func TestCreateClub_edit_name(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	// create a test name
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake data for club")

	newName := fake.Name

	var updateClubName UpdateClubName
	err = client.Mutate(context.Background(), &updateClubName, map[string]interface{}{
		"input": types.UpdateClubNameInput{
			ID:   relayId,
			Name: newName,
		},
	})
	require.NoError(t, err, "no error updating name")

	// make sure name is updated
	updatedClb := getClub(t, client, clb.Slug())
	require.Equal(t, newName, updatedClb.Club.Name)
}

type UpdateClubBlurb struct {
	UpdateClubBlurb *struct {
		Club *ClubModified
	} `graphql:"updateClubBlurb(input: $input)"`
}

// TestCreateClub_edit_blurb - create a club and edit the name
func TestCreateClub_edit_blurb(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	// create a test name
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake data for club")

	newName := fake.Name

	var updateClubBlurb UpdateClubBlurb
	err = client.Mutate(context.Background(), &updateClubBlurb, map[string]interface{}{
		"input": types.UpdateClubBlurbInput{
			ID:    relayId,
			Blurb: newName,
		},
	})
	require.NoError(t, err, "no error updating blurb")

	// make sure blurb is updated
	updatedClb := getClub(t, client, clb.Slug())
	require.Equal(t, newName, updatedClb.Club.Blurb)
}

type UpdateClubThumbnail struct {
	UpdateClubName *struct {
		Club *ClubModified
	} `graphql:"updateClubThumbnail(input: $input)"`
}

// TestCreateClub_edit_thumbnail - create a club and edit the thumbnail
func TestCreateClub_edit_thumbnail(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	thumbnailId := "test-thumbnail"

	var updateClubThumbnail UpdateClubThumbnail
	err := client.Mutate(context.Background(), &updateClubThumbnail, map[string]interface{}{
		"input": types.UpdateClubThumbnailInput{
			ID:        relayId,
			Thumbnail: thumbnailId,
		},
	})

	require.NoError(t, err, "no error updating thumbnail")

	// make sure thumbnail is set
	updatedClb := getClub(t, client, clb.Slug())
	require.Empty(t, updatedClb.Club.ThumbnailMedia.ImageMedia.Id, "thumbnail is not nil")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: thumbnailId,
		Link: &proto.MediaLink{
			Id:   clb.ID(),
			Type: proto.MediaLinkType_CLUB_THUMBNAIL,
		},
		ImageData: &proto.ImageData{Id: uuid.New().String(), Sizes: []*proto.ImageDataSize{
			{
				Width:  0,
				Height: 0,
			},
		}},
		State: &proto.MediaState{
			Processed: true,
			Failed:    false,
		},
	}})

	require.NoError(t, err, "no error updating resource")

	updatedClb = getClub(t, client, clb.Slug())
	require.NotEmpty(t, updatedClb.Club.ThumbnailMedia.ImageMedia.Id, "thumbnail is should be processed now")
}

type UpdateClubHeader struct {
	UpdateClubHeader *struct {
		Club *ClubModified
	} `graphql:"updateClubHeader(input: $input)"`
}

// TestCreateClub_edit_header - create a club and edit the header
func TestCreateClub_edit_header(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	relayId := convertClubIdToRelayId(clb.ID())

	thumbnailId := "test-header"

	var updateClubHeader UpdateClubHeader
	err := client.Mutate(context.Background(), &updateClubHeader, map[string]interface{}{
		"input": types.UpdateClubHeaderInput{
			ID:     relayId,
			Header: thumbnailId,
		},
	})

	require.NoError(t, err, "no error updating header")

	// make sure thumbnail is set
	updatedClb := getClub(t, client, clb.Slug())
	require.Empty(t, updatedClb.Club.Header.ImageMedia.Id, "thumbnail is not nil")

	grpcClient := getGrpcCallbackClient(t)

	_, err = grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: thumbnailId,
		Link: &proto.MediaLink{
			Id:   clb.ID(),
			Type: proto.MediaLinkType_CLUB_HEADER,
		},
		ImageData: &proto.ImageData{Id: uuid.New().String(), Sizes: []*proto.ImageDataSize{
			{
				Width:  0,
				Height: 0,
			},
		}},
		State: &proto.MediaState{
			Processed: true,
			Failed:    false,
		},
	}})

	require.NoError(t, err, "no error updating resource")

	updatedClb = getClub(t, client, clb.Slug())
	require.NotEmpty(t, updatedClb.Club.Header.ImageMedia.Id, "header should be processed now")
}

// TestCreateClub_edit_banner - create a club and edit the banner
func TestCreateClub_edit_banner(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, testingAccountId)
	pst := seedPublishedPost(t, testingAccountId, clb.ID())

	env := getWorkflowEnvironment()

	refreshPostESIndex(t)
	env.ExecuteWorkflow(workflows.GenerateClubBannerFromPost, workflows.GenerateClubBannerFromPostInput{PostId: pst.ID()})

	require.True(t, env.IsWorkflowCompleted(), "generating banner workflow is complete")
	require.NoError(t, env.GetWorkflowError(), "no error generating banner")

	updatedClb := getClub(t, client, clb.Slug())
	require.Empty(t, updatedClb.Club.BannerMedia.ImageMedia.Id, "banner not yet processed initially")

	grpcClient := getGrpcCallbackClient(t)

	cat := getClubFromAdapter(t, clb.ID())

	_, err := grpcClient.UpdateMedia(context.Background(), &proto.UpdateMediaRequest{Media: &proto.Media{
		Id: cat.BannerMedia().ID(),
		Link: &proto.MediaLink{
			Id:   clb.ID(),
			Type: proto.MediaLinkType_CLUB_BANNER,
		},
		ImageData: &proto.ImageData{Id: uuid.New().String(), Sizes: []*proto.ImageDataSize{
			{
				Width:  0,
				Height: 0,
			},
		}},
		State: &proto.MediaState{
			Processed: true,
			Failed:    false,
		},
	}})

	require.NoError(t, err, "no error updating resource")

	updatedClb = getClub(t, client, clb.Slug())
	require.NotEmpty(t, updatedClb.Club.BannerMedia.ImageMedia.Id, "banner should be processed now")
}
