package post

type Post struct {
	clubId               string
	accountId            string
	hasCharacterRequests bool
}

func (p *Post) ClubId() string {
	return p.clubId
}

func (p *Post) AccountId() string {
	return p.accountId
}

func (p *Post) HasCharacterRequests() bool {
	return p.hasCharacterRequests
}

func UnmarshalPostFromDatabase(clubId, accountId string, hasCharacterRequests bool) *Post {
	return &Post{
		clubId:               clubId,
		accountId:            accountId,
		hasCharacterRequests: hasCharacterRequests,
	}
}
