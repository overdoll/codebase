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
	RemoveClubSlugAlias           command.RemoveClubSlugAliasHandler
	AddClubSlugAlias              command.AddClubSlugAliasHandler
	PromoteClubSlugAliasToDefault command.PromoteClubSlugAliasToDefaultHandler
	BecomeClubMember              command.BecomeClubMemberHandler
	WithdrawClubMembership        command.WithdrawClubMembershipHandler
}

type Queries struct {
	SearchClubs                 query.SearchClubsHandler
	ClubBySlug                  query.ClubBySlugHandler
	ClubById                    query.ClubByIdHandler
	ClubSlugAliasesLimit        query.ClubSlugAliasesLimitHandler
	AccountClubMembershipsLimit query.AccountClubMembershipsLimitHandler
	AccountClubMemberships      query.AccountClubMembershipsHandler
	AccountClubMembershipsCount query.AccountClubMembershipsCountHandler
	CanAccountPostUnderClub     query.CanAccountPostUnderClubHandler

	PrincipalById     query.PrincipalByIdHandler
	ClubMemberById    query.ClubMemberByIdHandler
	ClubMembersByClub query.ClubMembersByClubHandler
}
