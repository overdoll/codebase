package links

import (
	"net/url"
	"os"
	"path"
)

func CreateConfirmEmailUrl(id, secret string) (*url.URL, error) {

	u, err := url.Parse(os.Getenv("APP_URL"))

	if err != nil {
		return nil, err
	}

	u.Path = path.Join(u.Path, "confirm-email")

	u.RawQuery = "id=" + id + "&secret=" + secret

	return u, nil
}
