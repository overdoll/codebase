package billing

import "errors"

type CardType struct {
	slug string
}

var (
	Unknown    = CardType{""}
	Visa       = CardType{"VISA"}
	Mastercard = CardType{"MASTERCARD"}
	Discover   = CardType{"DISCOVER"}
	JCB        = CardType{"JCB"}
	Amex       = CardType{"AMEX"}
	Other      = CardType{"OTHER"}
)

func (r CardType) String() string {
	return r.slug
}

func CardTypeFromString(s string) (CardType, error) {
	switch s {
	case Visa.slug:
		return Visa, nil
	case Mastercard.slug:
		return Mastercard, nil
	case Discover.slug:
		return Discover, nil
	case JCB.slug:
		return JCB, nil
	case Amex.slug:
		return Amex, nil
	case Other.slug:
		return Other, nil
	}

	return Unknown, errors.New("unknown card type: " + s)
}
