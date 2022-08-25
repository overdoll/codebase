package post

type Post struct {
	clubId    string
	accountId string
}

func (i *Post) ClubId() string {
	return i.clubId
}

func (i *Post) AccountId() string {
	return i.accountId
}

func UnmarshalPostFromDatabase(clubId, accountId string) *Post {
	return &Post{
		clubId:    clubId,
		accountId: accountId,
	}
}
