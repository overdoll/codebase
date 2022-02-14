package club

type Supporter struct {
	accountId string
	clubIds   []string
}

func (m *Supporter) AccountId() string {
	return m.accountId
}

func (m *Supporter) ClubIds() []string {
	return m.clubIds
}

func UnmarshalSupporterFromDatabase(accountId string, clubIds []string) *Supporter {
	return &Supporter{
		accountId: accountId,
		clubIds:   clubIds,
	}
}
