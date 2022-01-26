package app

import (
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	IndexAllClubs command.IndexAllClubsHandler

	CreateClub                    command.CreateClubHandler
	UpdateClubName                command.UpdateClubNameHandler
	UpdateClubThumbnail           command.UpdateClubThumbnailHandler
	RemoveClubSlugAlias           command.RemoveClubSlugAliasHandler
	AddClubSlugAlias              command.AddClubSlugAliasHandler
	PromoteClubSlugAliasToDefault command.PromoteClubSlugAliasToDefaultHandler
	BecomeClubMember              command.BecomeClubMemberHandler
	WithdrawClubMembership        command.WithdrawClubMembershipHandler

	SuspendClub   command.SuspendClubHandler
	UnSuspendClub command.UnSuspendClubHandler

	SuspendClubOperator command.SuspendClubOperatorHandler
}

type Queries struct {
	SearchClubs                 query.SearchClubsHandler
	ClubBySlug                  query.ClubBySlugHandler
	ClubById                    query.ClubByIdHandler
	ClubsByIds                  query.ClubsByIdsHandler
	ClubSlugAliasesLimit        query.ClubSlugAliasesLimitHandler
	AccountClubMembershipsLimit query.AccountClubMembershipsLimitHandler
	AccountClubMemberships      query.AccountClubMembershipsHandler
	AccountClubMembershipsCount query.AccountClubMembershipsCountHandler
	CanAccountPostUnderClub     query.CanAccountPostUnderClubHandler

	AccountClubsCount query.AccountClubsCountHandler
	AccountClubsLimit query.AccountClubsLimitHandler

	PrincipalById     query.PrincipalByIdHandler
	ClubMemberById    query.ClubMemberByIdHandler
	ClubMembersByClub query.ClubMembersByClubHandler

	AccountClubMembershipsOperator query.AccountClubMembershipsOperatorHandler
}
