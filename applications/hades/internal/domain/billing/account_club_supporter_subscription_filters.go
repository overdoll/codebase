package billing

type AccountClubSupporterSubscriptionFilters struct {
	accountId *string
	clubId    *string
	status    []SupportStatus
}

func NewAccountClubSupporterSubscriptionFilters(accountId, clubId *string, status []string) (*AccountClubSupporterSubscriptionFilters, error) {

	var newStatus []SupportStatus

	for _, i := range status {
		s, err := SupportStatusFromString(i)
		if err != nil {
			return nil, err
		}

		newStatus = append(newStatus, s)
	}

	return &AccountClubSupporterSubscriptionFilters{
		accountId: accountId,
		clubId:    clubId,
	}, nil
}

func (e *AccountClubSupporterSubscriptionFilters) AccountId() *string {
	return e.accountId
}

func (e *AccountClubSupporterSubscriptionFilters) ClubId() *string {
	return e.clubId
}

func (e *AccountClubSupporterSubscriptionFilters) Status() []SupportStatus {
	return e.status
}
