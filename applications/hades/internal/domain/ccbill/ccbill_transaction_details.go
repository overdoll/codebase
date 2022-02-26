package ccbill

import "overdoll/libraries/principal"

type TransactionDetails struct {
	id          string
	clubId      *string
	accountId   string
	approved    bool
	declineCode *string
	declineText *string
}

func NewTransactionDetailsFromEncryptedToken(request *principal.Principal, token string) (*TransactionDetails, error) {

	decrypted, err := decryptCCBillTransaction(token)

	if err != nil {
		return nil, err
	}

	// make sure initiator matches the currently authorized account
	if err := request.BelongsToAccount(decrypted.CcbillPayment.AccountInitiator.AccountId); err != nil {
		return nil, err
	}

	var approved bool
	var id string

	if decrypted.CcbillTransactionAuthorized != nil {
		approved = true
		id = decrypted.CcbillTransactionAuthorized.SubscriptionId
	}

	var declineCode *string
	var declineText *string

	if decrypted.CcbillTransactionDenied != nil {
		approved = false
		declineCode = &decrypted.CcbillTransactionDenied.Code
		declineText = &decrypted.CcbillTransactionDenied.Code
		id = decrypted.CcbillTransactionDenied.Id
	}

	var clubId *string

	if decrypted.CcbillPayment.CcbillClubSupporter != nil {
		clubId = &decrypted.CcbillPayment.CcbillClubSupporter.ClubId
	}

	return &TransactionDetails{
		id:          id,
		clubId:      clubId,
		approved:    approved,
		declineCode: declineCode,
		accountId:   decrypted.CcbillPayment.AccountInitiator.AccountId,
		declineText: declineText,
	}, nil
}

func (t *TransactionDetails) Id() string {
	return t.id
}

func (t *TransactionDetails) AccountId() string {
	return t.accountId
}

func (t *TransactionDetails) ClubId() *string {
	return t.clubId
}

func (t *TransactionDetails) Approved() bool {
	return t.approved
}

func (t *TransactionDetails) DeclineCode() *string {
	return t.declineCode
}

func (t *TransactionDetails) DeclineText() *string {
	return t.declineText
}
