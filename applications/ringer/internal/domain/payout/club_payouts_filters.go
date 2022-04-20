package payout

type ClubPayoutsFilters struct {
	depositRequestId *string
	clubId           *string
	status           []Status
}

func NewClubPayoutsFilters(depositRequestId, clubId *string, status []string) (*ClubPayoutsFilters, error) {

	var st []Status

	for _, s := range status {
		t, err := StatusFromString(s)
		if err != nil {
			return nil, err
		}
		st = append(st, t)
	}

	return &ClubPayoutsFilters{
		depositRequestId: depositRequestId,
		clubId:           clubId,
		status:           st,
	}, nil
}

func (e *ClubPayoutsFilters) DepositRequestId() *string {
	return e.depositRequestId
}

func (e *ClubPayoutsFilters) ClubId() *string {
	return e.clubId
}

func (e *ClubPayoutsFilters) Status() []Status {
	return e.status
}
