package post

type Post struct {
	clubId    string
	accountId string
}

func (p *Post) ClubId() string {
	return p.clubId
}

func (p *Post) AccountId() string {
	return p.accountId
}

func UnmarshalPostFromDatabase(clubId, accountId string) *Post {
	return &Post{
		clubId:    clubId,
		accountId: accountId,
	}
}
