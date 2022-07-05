package service_test

import (
	"context"
	"encoding/base64"
	"github.com/bxcodec/faker/v3"
	"log"
	"os"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	resource_proto "overdoll/libraries/resource/proto"
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

	client, _ := passport.NewHTTPTestClientWithPassport(&accountId)

	return graphql.NewClient(StingGraphqlClientAddr, client)
}

func getGraphqlClient(t *testing.T) *graphql.Client {

	client, _ := passport.NewHTTPTestClientWithPassport(nil)

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

// helper which seeds a new post in the database
func seedClub(t *testing.T, accountId string) *club.Club {
	pst := newClub(t, accountId)

	session := bootstrap.InitializeDatabaseSession()
	es := bootstrap.InitializeElasticSearchSession()
	redis := bootstrap.InitializeRedisSession()

	serializer := resource.NewSerializer()

	adapter := adapters.NewClubCassandraElasticsearchRepository(session, es, redis, serializer)
	err := adapter.ReserveSlugForClub(context.Background(), pst)
	require.NoError(t, err)
	err = adapter.CreateClub(context.Background(), pst)
	require.NoError(t, err)

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

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now())

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
	)})

	err = pst.AddContentRequest(prin, []*resource.Resource{
		resource.UnmarshalResourceFromProto(context.Background(), &resource_proto.Resource{
			Id:        uuid.New().String(),
			ItemId:    uuid.New().String(),
			Private:   true,
			Processed: true,
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

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now())

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.UpdateCategoriesRequest(prin, []*post.Category{post.UnmarshalCategoryFromDatabase(
		categoryId, "StandardCategory", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, time.Now(), time.Now(), nil, nil,
	)})

	err = pst.AddContentRequest(prin, []*resource.Resource{
		resource.UnmarshalResourceFromProto(context.Background(), &resource_proto.Resource{
			Id:        uuid.New().String(),
			ItemId:    uuid.New().String(),
			Private:   true,
			Processed: true,
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

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now())

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		audienceId, "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	err = pst.AddContentRequest(prin, []*resource.Resource{
		resource.UnmarshalResourceFromProto(context.Background(), &resource_proto.Resource{
			Id:        uuid.New().String(),
			ItemId:    uuid.New().String(),
			Private:   true,
			Processed: true,
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

	clb := club.UnmarshalClubFromDatabase(clubId, "", nil, nil, nil, nil, 0, accountId, false, nil, nil, false, false, nil, false, time.Now(), time.Now())

	pst, err := post.NewPost(prin, clb)
	require.NoError(t, err)

	err = pst.UpdateAudienceRequest(prin, post.UnmarshalAudienceFromDatabase(
		"1pcKiQL7dgUW8CIN7uO1wqFaMql", "StandardAudience", map[string]string{"en": "Standard Audience"}, nil, nil, 1, 0, 0, time.Now(), time.Now(),
	))

	require.NoError(t, err)

	err = pst.AddContentRequest(prin, []*resource.Resource{
		resource.UnmarshalResourceFromProto(context.Background(), &resource_proto.Resource{
			Id:        uuid.New().String(),
			ItemId:    uuid.New().String(),
			Private:   true,
			Processed: true,
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

	serializer := resource.NewSerializer()

	adapter := adapters.NewPostsCassandraRepository(session, es, serializer)
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
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Club{}, clubId))))
}

func convertAccountIdToRelayId(accountId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Account{}, accountId))))
}

func convertPostIdToRelayId(postId string) relay.ID {
	return relay.ID(base64.StdEncoding.EncodeToString([]byte(relay.NewID(types.Post{}, postId))))
}

func getGrpcClient(t *testing.T) sting.StingClient {

	stingClient, _ := clients.NewStingClient(context.Background(), StingGrpcClientAddr)

	return stingClient
}

func getGrpcCallbackClient(t *testing.T) resource_proto.ResourceCallbackClient {

	stingClient, _ := clients.NewResourceCallbackClient(context.Background(), StingGrpcClientAddr)

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
		resource_proto.RegisterResourceCallbackServer(server, s)
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
