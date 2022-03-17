package links

import (
	"net/url"
	"os"
	"path"
)

func CreateClubUrl(slug string) (*url.URL, error) {

	u, err := url.Parse(os.Getenv("APP_URL"))

	if err != nil {
		return nil, err
	}

	u.Path = path.Join(u.Path, slug)

	return u, nil
}
