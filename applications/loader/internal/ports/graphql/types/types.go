// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

import (
	"fmt"
	"io"
	"overdoll/libraries/graphql/relay"
	"strconv"
)

type ResourceProgress struct {
	ID relay.ID `json:"id"`
	// The state at which this resource is at.
	State ResourceProgressState `json:"state"`
	// The progress percent, in float. Will never be larger than 100.
	Progress float64 `json:"progress"`
}

func (ResourceProgress) IsEntity() {}

type ResourceProgressState string

const (
	// Resource is waiting to be processed.
	ResourceProgressStateWaiting ResourceProgressState = "WAITING"
	// Resource has started processing.
	ResourceProgressStateStarted ResourceProgressState = "STARTED"
	// Resource is finalizing processing.
	ResourceProgressStateFinalizing ResourceProgressState = "FINALIZING"
)

var AllResourceProgressState = []ResourceProgressState{
	ResourceProgressStateWaiting,
	ResourceProgressStateStarted,
	ResourceProgressStateFinalizing,
}

func (e ResourceProgressState) IsValid() bool {
	switch e {
	case ResourceProgressStateWaiting, ResourceProgressStateStarted, ResourceProgressStateFinalizing:
		return true
	}
	return false
}

func (e ResourceProgressState) String() string {
	return string(e)
}

func (e *ResourceProgressState) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = ResourceProgressState(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid ResourceProgressState", str)
	}
	return nil
}

func (e ResourceProgressState) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}