package ccbill

type TransactionDetails struct {
	subscriptionId string
	clubId         string
	approved       bool
	declineCode    int
	declineText    string
}

func UnmarshalTransactionDetailsFromDatabase(subscriptionId, clubId string, approved bool, declineCode int, declineText string) *TransactionDetails {
	return &TransactionDetails{
		subscriptionId: subscriptionId,
		clubId:         clubId,
		approved:       approved,
		declineCode:    declineCode,
		declineText:    declineText,
	}
}
