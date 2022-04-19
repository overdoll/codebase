package payout

type ClubPayoutsFilters struct {
	depositRequestId *string
	clubId           *string
	status           *Status
}

func NewClubPayoutsFilters(depositRequestId, clubId, status *string) (*ClubPayoutsFilters, error) {

	var st *Status

	if status != nil {
		t, err := StatusFromString(*status)
		if err != nil {
			return nil, err
		}
		st = &t
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

func (e *ClubPayoutsFilters) Status() *Status {
	return e.status
}
