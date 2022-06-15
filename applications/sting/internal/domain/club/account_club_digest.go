package club

type AccountClubDigest struct {
	supportedClubIds  []string
	clubMembershipIds []string
	ownerClubIds      []string
}

func (a *AccountClubDigest) SupportedClubIds() []string {
	return a.supportedClubIds
}

func (a *AccountClubDigest) ClubMembershipIds() []string {
	return a.clubMembershipIds
}

func (a *AccountClubDigest) OwnerClubIds() []string {
	return a.ownerClubIds
}

func UnmarshalAccountClubDigestFromDatabase(supportedClubIds, clubMembershipIds, ownerClubIds []string) *AccountClubDigest {
	return &AccountClubDigest{
		supportedClubIds:  supportedClubIds,
		clubMembershipIds: clubMembershipIds,
		ownerClubIds:      ownerClubIds,
	}
}
