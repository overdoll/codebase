package relay

import (
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"

	"github.com/99designs/gqlgen/example/starwars/models"
	"overdoll/applications/sting/src/ports/graphql/types"
)

const cursorPrefix = "cursor:"

type Edge interface {
	GetCursor() string
}

// Creates the cursor string from an offset
func OffsetToCursor(offset int) string {
	str := fmt.Sprintf("%v%v", cursorPrefix, offset)
	return base64.StdEncoding.EncodeToString([]byte(str))
}

// Re-derives the offset from the cursor string.
func CursorToOffset(cursor string) (int, error) {
	str := ""
	b, err := base64.StdEncoding.DecodeString(cursor)
	if err == nil {
		str = string(b)
	}
	str = strings.Replace(str, cursorPrefix, "", -1)
	offset, err := strconv.Atoi(str)
	if err != nil {
		return 0, fmt.Errorf("invalid cursor")
	}
	return offset, nil
}

type NodeType interface{}
type EdgeType interface{}
type ConnectionType interface{}

type NodeTypeEdger func(value NodeType, offset int) Edge
type NodeTypeConMaker func(edges []EdgeType, info types.PageInfo, totalCount int) (ConnectionType, error)

func NodeTypeCon(source []NodeType, edger NodeTypeEdger, conMaker NodeTypeConMaker, input models.ConnectionInput) (ConnectionType, error) {
	var edges []EdgeType
	var pageInfo models.PageInfo

	emptyCon, _ := conMaker(edges, pageInfo, 0)

	offset := 0

	if input.After != nil {
		for i, value := range source {
			edge := edger(value, i)
			if edge.GetCursor() == *input.After {
				// remove all previous element including the "after" one
				source = source[i+1:]
				offset = i + 1
				break
			}
		}
	}

	if input.Before != nil {
		for i, value := range source {
			edge := edger(value, i+offset)

			if edge.GetCursor() == *input.Before {
				// remove all after element including the "before" one
				break
			}

			edges = append(edges, edge.(EdgeType))
		}
	} else {
		edges = make([]EdgeType, len(source))

		for i, value := range source {
			edges[i] = edger(value, i+offset).(EdgeType)
		}
	}

	if input.First != nil {
		if *input.First < 0 {
			return emptyCon, fmt.Errorf("first less than zero")
		}

		if len(edges) > *input.First {
			// Slice result to be of length first by removing edges from the end
			edges = edges[:*input.First]
			pageInfo.HasNextPage = true
		}
	}

	if input.Last != nil {
		if *input.Last < 0 {
			return emptyCon, fmt.Errorf("last less than zero")
		}

		if len(edges) > *input.Last {
			// Slice result to be of length last by removing edges from the start
			edges = edges[len(edges)-*input.Last:]
			pageInfo.HasPreviousPage = true
		}
	}

	return conMaker(edges, pageInfo, len(source))
}
