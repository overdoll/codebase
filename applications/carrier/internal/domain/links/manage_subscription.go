package links

import (
	"net/url"
	"os"
	"path"
)

func CreateManageSubscriptionUrl() (*url.URL, error) {

	u, err := url.Parse(os.Getenv("APP_URL"))

	if err != nil {
		return nil, err
	}

	u.Path = path.Join(u.Path, "/settings/billing/subscriptions")

	return u, nil
}
