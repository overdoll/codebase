package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"log"
	"os"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/principal"
	"strings"
	"time"

	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
	"google.golang.org/grpc"
	"overdoll/applications/sting/internal/ports"
	"overdoll/applications/sting/internal/service"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
	"overdoll/libraries/config"
	"overdoll/libraries/passport"
	"overdoll/libraries/testing_tools"
)

const StingHttpAddr = ":4564"
const StingGraphqlClientAddr = "http://:4564/api/graphql"

const StingGrpcAddr = "localhost:6667"
const StingGrpcClientAddr = "localhost:6667"

func getGraphqlClientWithAuthenticatedAccount(t *testing.T, accountId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId, nil)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func getGraphqlClientWithDeviceId(t *testing.T, deviceId string) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil, &deviceId)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil, nil)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

type TestClub struct {
	Name string `faker:"title_male"`
	Slug string `faker:"username"`
}

func newPrincipal(t *testing.T, accountId string) *principal.Principal {
	return testing_tools.NewArtistPrincipal(accountId)
}

func newClub(t *testing.T, accountId string) *club.Club {

	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	clb, err := club.NewClub(newPrincipal(t, accountId), fake.Slug, fake.Name, 0)
	require.NoError(t, err)

	return clb
}

func refreshClubESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubsReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func refreshClubMembersESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.ClubMembersReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func getSeriesFromAdapter(t *testing.T, seriesId string) *post.Series {

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	aws := bootstrap.InitializeAWSSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, aws, cache)

	pst, err := adapter.GetSingleSeriesById(context.Background(), seriesId)
	require.NoError(t, err)

	return pst
}

func getClubFromAdapter(t *testing.T, clubId string) *club.Club {

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	redis := bootstrap.InitializeRedisSession()

	adapter := adapters.NewClubCassandraElasticsearchRepository(session, es, redis)

	pst, err := adapter.GetClubById(context.Background(), clubId)
	require.NoError(t, err)

	return pst
}

func getCharacterFromAdapter(t *testing.T, characterId string) *post.Character {

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	aws := bootstrap.InitializeAWSSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, aws, cache)

	pst, err := adapter.GetCharacterById(context.Background(), characterId)
	require.NoError(t, err)

	return pst
}

func getCategoryFromAdapter(t *testing.T, categoryId string) *post.Category {

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	aws := bootstrap.InitializeAWSSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, aws, cache)

	pst, err := adapter.GetCategoryById(context.Background(), categoryId)
	require.NoError(t, err)

	return pst
}

func getPostFromAdapter(t *testing.T, postId string) *post.Post {

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	aws := bootstrap.InitializeAWSSession()
	cache := bootstrap.InitializeRedisSession()
	adapter := adapters.NewPostsCassandraRepository(session, es, aws, cache)

	pst, err := adapter.GetPostByIdOperator(context.Background(), postId)
	require.NoError(t, err)

	return pst
}

func seedCharacter(t *testing.T, seriesId string) *post.Character {
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	prin := testing_tools.NewStaffPrincipal(uuid.New().String())
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      nil,
	})

	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	series, err := post.NewCharacter(prin, strings.ToLower(fake.Slug), fake.Name, post.UnmarshalSeriesFromDatabase(seriesId, "test-", nil, nil, nil, 0, 0, time.Now(), time.Now()), nil)
	require.NoError(t, err)

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, bootstrap.InitializeAWSSession(), cache)
	err = adapter.CreateCharacter(context.Background(), series)
	require.NoError(t, err)

	refreshCharacterIndex(t)

	return series
}

func seedSeries(t *testing.T) *post.Series {
	fake := TestClub{}
	err := faker.FakeData(&fake)
	require.NoError(t, err)

	prin := testing_tools.NewStaffPrincipal(uuid.New().String())
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      nil,
	})

	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	series, err := post.NewSeries(prin, strings.ToLower(fake.Slug), fake.Name)
	require.NoError(t, err)

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, bootstrap.InitializeAWSSession(), cache)
	err = adapter.CreateSeries(context.Background(), series)
	require.NoError(t, err)

	refreshSeriesIndex(t)

	return series
}

// helper which seeds a new post in the database
func seedClub(t *testing.T, accountId string) *club.Club {
	pst := newClub(t, accountId)
	pst.UpdateEnableSupporterOnlyPosts(testing_tools.NewStaffPrincipal(accountId))

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	redis := bootstrap.InitializeRedisSession()

	adapter := adapters.NewClubCassandraElasticsearchRepository(session, es, redis)
	err := adapter.ReserveSlugForClub(context.Background(), pst)
	require.NoError(t, err)
	err = adapter.CreateClub(context.Background(), pst)
	require.NoError(t, err)

	refreshClubESIndex(t)

	return pst
}

func seedPublishedPostWithCharacter(t *testing.T, characterId, seriesId string) {

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	prin := testing_tools.NewDefaultPrincipal(accountId)
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})

	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now(), false, 0, 0, 0, nil)

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.UpdateCharactersRequest(prin, []*post.Character{post.UnmarshalCharacterFromDatabase(
		characterId, "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		post.UnmarshalSeriesFromDatabase(
			seriesId, "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		),
		nil,
	)})

	err = pst.UpdateCategoriesRequest(prin, []*post.Category{
		post.UnmarshalCategoryFromDatabase("1q7MJ9eXjRsgWJNIbOMJ9qzg2S3", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFMVgDPo4mFjsfNag6rRwRy", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFk9Wof1qyQQORKBrJxGFhJ", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
	})

	err = pst.AddContentRequest(prin, []*media.Media{
		media.FromProto(&proto.Media{
			Id: uuid.New().String(),
			Link: &proto.MediaLink{
				Id:   uuid.New().String(),
				Type: proto.MediaLinkType_POST_CONTENT,
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
		}),
	})

	require.NoError(t, err)

	err = pst.SubmitPostRequest(clb, prin)

	require.NoError(t, err)

	err = pst.MakePublish()
	require.NoError(t, err)

	seedPost(t, pst)
}

func seedPublishedPostWithCategory(t *testing.T, categoryId string) {

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	prin := testing_tools.NewDefaultPrincipal(accountId)
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})

	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now(), false, 0, 0, 0, nil)

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.UpdateCharactersRequest(prin, []*post.Character{post.UnmarshalCharacterFromDatabase(
		"1q7MJnQXAtxer0fboBMHtlC0JMe", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		post.UnmarshalSeriesFromDatabase(
			"1pcKibRoqTAUgmOiNpGLIrztM9R", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		),
		nil,
	)})

	err = pst.UpdateCategoriesRequest(prin, []*post.Category{
		post.UnmarshalCategoryFromDatabase(categoryId, "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFMVgDPo4mFjsfNag6rRwRy", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFk9Wof1qyQQORKBrJxGFhJ", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
	})

	err = pst.AddContentRequest(prin, []*media.Media{
		media.FromProto(&proto.Media{
			Id: uuid.New().String(),
			Link: &proto.MediaLink{
				Id:   uuid.New().String(),
				Type: proto.MediaLinkType_POST_CONTENT,
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
		}),
	})

	require.NoError(t, err)

	err = pst.SubmitPostRequest(clb, prin)

	require.NoError(t, err)

	err = pst.MakePublish()
	require.NoError(t, err)

	seedPost(t, pst)
}

func seedPublishedPostWithAudience(t *testing.T, audienceId string) {

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	prin := testing_tools.NewDefaultPrincipal(accountId)
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})

	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now(), false, 0, 0, 0, nil)

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		audienceId, "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.UpdateCharactersRequest(prin, []*post.Character{post.UnmarshalCharacterFromDatabase(
		"1q7MJnQXAtxer0fboBMHtlC0JMe", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		post.UnmarshalSeriesFromDatabase(
			"1pcKibRoqTAUgmOiNpGLIrztM9R", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		),
		nil,
	)})

	err = pst.UpdateCategoriesRequest(prin, []*post.Category{
		post.UnmarshalCategoryFromDatabase("1q7MJ9eXjRsgWJNIbOMJ9qzg2S3", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFMVgDPo4mFjsfNag6rRwRy", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFk9Wof1qyQQORKBrJxGFhJ", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
	})

	err = pst.AddContentRequest(prin, []*media.Media{
		media.FromProto(&proto.Media{
			Id: uuid.New().String(),
			Link: &proto.MediaLink{
				Id:   uuid.New().String(),
				Type: proto.MediaLinkType_POST_CONTENT,
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
		}),
	})

	require.NoError(t, err)

	err = pst.SubmitPostRequest(clb, prin)

	require.NoError(t, err)

	err = pst.MakePublish()
	require.NoError(t, err)

	seedPost(t, pst)
}

func newPublishingPost(t *testing.T, accountId, clubId string) *post.Post {

	prin := testing_tools.NewDefaultPrincipal(accountId)
	ext, err := principal.NewClubExtension(&sting.GetAccountClubDigestResponse{
		SupportedClubIds:  nil,
		ClubMembershipIds: nil,
		OwnerClubIds:      []string{clubId},
	})
	require.NoError(t, err)

	err = prin.ExtendWithClubExtension(ext)
	require.NoError(t, err)

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now(), false, 0, 0, 0, nil)

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.UpdateCharactersRequest(prin, []*post.Character{post.UnmarshalCharacterFromDatabase(
		"1q7MJnQXAtxer0fboBMHtlC0JMe", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		post.UnmarshalSeriesFromDatabase(
			"1pcKibRoqTAUgmOiNpGLIrztM9R", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(),
		),
		nil,
	)})

	err = pst.UpdateCategoriesRequest(prin, []*post.Category{
		post.UnmarshalCategoryFromDatabase("1q7MJ9eXjRsgWJNIbOMJ9qzg2S3", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFMVgDPo4mFjsfNag6rRwRy", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
		post.UnmarshalCategoryFromDatabase("1q7MJFk9Wof1qyQQORKBrJxGFhJ", "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 0, 0, time.Now(), time.Now(), nil, nil),
	})

	require.NoError(t, err)

	err = pst.AddContentRequest(prin, []*media.Media{
		media.FromProto(&proto.Media{
			Id: uuid.New().String(),
			Link: &proto.MediaLink{
				Id:   uuid.New().String(),
				Type: proto.MediaLinkType_POST_CONTENT,
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
		}),
	})

	err = pst.SubmitPostRequest(clb, prin)

	require.NoError(t, err)
	return pst
}

func newPublishedPost(t *testing.T, accountId, clubId string) *post.Post {

	publishingPost := newPublishingPost(t, accountId, clubId)

	err := publishingPost.MakePublish()
	require.NoError(t, err)

	return publishingPost
}

func newPublishedPostWithClub(t *testing.T, accountId, clubId string) *post.Post {

	publishingPost := newPublishingPost(t, accountId, clubId)

	err := publishingPost.MakePublish()
	require.NoError(t, err)

	return publishingPost
}

func newFakeAccount(t *testing.T) string {
	return uuid.New().String()
}

func seedPost(t *testing.T, pst *post.Post) *post.Post {
	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	aws := bootstrap.InitializeAWSSession()
	cache := bootstrap.InitializeRedisSession()

	adapter := adapters.NewPostsCassandraRepository(session, es, aws, cache)
	err := adapter.CreatePost(context.Background(), pst)
	require.NoError(t, err)

	refreshPostESIndex(t)

	return pst
}

func seedPublishedPostWithClub(t *testing.T, accountId, clubId string) *post.Post {
	pst := newPublishedPostWithClub(t, accountId, clubId)
	seedPost(t, pst)
	return pst
}

func seedPublishedPost(t *testing.T, accountId, clubId string) *post.Post {
	pst := newPublishedPost(t, accountId, clubId)
	seedPost(t, pst)
	return pst
}

func seedPublishingPost(t *testing.T, accountId, clubId string) *post.Post {
	pst := newPublishingPost(t, accountId, clubId)
	seedPost(t, pst)
	return pst
}

func seedReviewPost(t *testing.T, accountId, clubId string) *post.Post {
	pst := newPublishingPost(t, accountId, clubId)
	err := pst.MakeReview()
	require.NoError(t, err)
	seedPost(t, pst)
	return pst
}

func refreshPostESIndex(t *testing.T) {
	es := bootstrap.InitializeElasticSearchSession()
	_, err := es.Refresh(adapters.PostReaderIndex).Do(context.Background())
	require.NoError(t, err)
}

func convertClubIdToRelayId(clubId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Club{}, clubId)))
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Account{}, accountId)))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(relay.MarshalRelayId(relay.NewID(types.Post{}, postId)))
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getGrpcCallbackClient(t *testing.T) proto.MediaCallbackClient {

	stingClient, _ := clients.NewMediaCallbackClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getWorkflowEnvironment() *testsuite.TestWorkflowEnvironment {

	suite := new(testsuite.WorkflowTestSuite)
	suite.SetLogger(testing_tools.NewDefaultTestWorkflowLogger())
	env := suite.NewTestWorkflowEnvironment()

	env.RegisterActivity(application.App.Activities)
	env.RegisterWorkflow(workflows.UpdateTotalPostsForPostTags)
	env.RegisterWorkflow(workflows.PublishPost)
	env.RegisterWorkflow(workflows.UpdateTotalLikesForPostTags)
	env.RegisterWorkflow(workflows.RemovePost)
	env.RegisterWorkflow(workflows.RemovePostLike)
	env.RegisterWorkflow(workflows.NewSupporterPost)
	env.RegisterWorkflow(workflows.ClubSupporterPostNotifications)
	env.RegisterWorkflow(workflows.AddClubMember)

	env.RegisterWorkflow(workflows.GenerateCategoryBanner)
	env.RegisterWorkflow(workflows.GenerateSeriesBanner)
	env.RegisterWorkflow(workflows.GenerateCharacterBanner)
	env.RegisterWorkflow(workflows.GenerateClubBannerFromPost)

	return env
}

func startService(m *testing.M) bool {
	config.Read("applications/sting")

	app := service.NewComponentTestApplication(context.Background())

	srv := ports.NewHttpServer(app.App)

	go bootstrap.InitializeHttpServer(StingHttpAddr, srv, func() {})

	ok := testing_tools.WaitForPort(StingHttpAddr)
	if !ok {
		log.Println("timed out waiting for sting HTTP to come up")
		return false
	}

	s := ports.NewGrpcServer(app.App)

	go bootstrap.InitializeGRPCServer(StingGrpcAddr, func(server *grpc.Server) {
		proto.RegisterMediaCallbackServer(server, s)
		sting.RegisterStingServer(server, s)
	})

	ok = testing_tools.WaitForPort(StingGrpcAddr)

	if !ok {
		log.Println("timed out waiting for sting GRPC to come up")
		return false
	}

	mockServices(app)

	return true
}

func TestMain(m *testing.M) {
	if !startService(m) {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
