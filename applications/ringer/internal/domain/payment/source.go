package payment

import "errors"

type Source struct {
	slug string
}

var (
	Unknown                   = Source{""}
	ClubSupporterSubscription = Source{"CLUB_SUPPORTER_SUBSCRIPTION"}
)

func (r Source) String() string {
	return r.slug
}

func SourceFromString(s string) (Source, error) {
	switch s {
	case ClubSupporterSubscription.slug:
		return ClubSupporterSubscription, nil
	}

	return Unknown, errors.New("unknown source: " + s)
}
