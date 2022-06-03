package support

import (
	"errors"
	"fmt"
	realelastic "github.com/olivere/elastic/v7"
	"net/http"
	"overdoll/libraries/errors/elastic"
)

func ParseElasticError(err error) error {
	e, ok := err.(*realelastic.Error)
	if !ok {
		return err
	}

	if e.Details != nil && e.Details.Reason != "" {

		// if root cause exists, we want to check this because it shows a more accurate error
		if len(e.Details.RootCause) > 0 {
			return elastic.NewError(errors.New(fmt.Sprintf("elastic: Error %d (%s): %s [type=%s]", e.Status, http.StatusText(e.Status), e.Details.RootCause[0].Reason, e.Details.RootCause[0].Type)))
		}

		return elastic.NewError(errors.New(fmt.Sprintf("elastic: Error %d (%s): %s [type=%s]", e.Status, http.StatusText(e.Status), e.Details.Reason, e.Details.Type)))
	}
	return elastic.NewError(errors.New(fmt.Sprintf("elastic: Error %d (%s)", e.Status, http.StatusText(e.Status))))
}
