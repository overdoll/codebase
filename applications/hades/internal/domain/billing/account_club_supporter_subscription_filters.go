package billing

type AccountClubSupporterSubscriptionFilters struct {
	accountId string
	status    []SupportStatus
}

func NewAccountClubSupporterSubscriptionFilters(accountId string, status []string) (*AccountClubSupporterSubscriptionFilters, error) {

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
	}, nil
}

func (e *AccountClubSupporterSubscriptionFilters) AccountId() string {
	return e.accountId
}

func (e *AccountClubSupporterSubscriptionFilters) Status() []SupportStatus {
	return e.status
}
