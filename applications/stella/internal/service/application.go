package service

import (
	"context"
	"os"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/applications/stella/internal/app"
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"

	"overdoll/applications/stella/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
		),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
		),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva command.EvaService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := bootstrap.InitializeElasticSearchSession()

	clubRepo := adapters.NewClubCassandraRepository(session)
	clubIndexRepo := adapters.NewClubIndexElasticSearchRepository(client, session)

	return app.Application{
		Commands: app.Commands{
			IndexAllClubs:                 command.NewIndexAllClubsHandler(clubRepo, clubIndexRepo),
			CreateClub:                    command.NewCreateClubHandler(clubRepo, clubIndexRepo),
			AddClubSlugAlias:              command.NewAddClubSlugAliasHandler(clubRepo, clubIndexRepo),
			RemoveClubSlugAlias:           command.NewRemoveClubSlugAliasHandler(clubRepo, clubIndexRepo),
			UpdateClubName:                command.NewUpdateClubNameHandler(clubRepo, clubIndexRepo),
			PromoteClubSlugAliasToDefault: command.NewPromoteClubSlugAliasToDefaultHandler(clubRepo, clubIndexRepo),
			BecomeClubMember:              command.NewBecomeClubMemberHandler(clubRepo),
			WithdrawClubMembership:        command.NewWithdrawClubMembershipHandler(clubRepo),
		},
		Queries: app.Queries{
			PrincipalById:           query.NewPrincipalByIdHandler(eva),
			CanAccountPostUnderClub: query.NewCanAccountPostUnderClubHandler(clubRepo),

			SearchClubs:                 query.NewSearchClubsHandler(clubIndexRepo),
			ClubBySlug:                  query.NewClubBySlugHandler(clubRepo),
			ClubById:                    query.NewClubByIdHandler(clubRepo),
			ClubSlugAliasesLimit:        query.NewClubSlugAliasesLimitHandler(clubRepo),
			AccountClubMemberships:      query.NewAccountClubMembershipsHandler(clubRepo),
			AccountClubMembershipsLimit: query.NewAccountClubMembershipsLimitHandler(clubRepo),
			AccountClubMembershipsCount: query.NewAccountClubMembershipsCountHandler(clubRepo),
			ClubMembersByClub:           query.NewClubMembersByClubHandler(clubRepo),
			ClubMemberById:              query.NewClubMemberByIdHandler(clubRepo),
		},
		Activities: activities.NewActivitiesHandler(clubRepo, clubIndexRepo),
	}
}
