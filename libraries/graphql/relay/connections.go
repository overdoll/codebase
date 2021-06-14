package relay

import (
	"fmt"
)

type NodeType interface{}
type EdgeType interface{}
type ConnectionType interface{}

type Type interface {
	Edger(value interface{}, offset int) interface{}
	ConMaker(edges []EdgeType, info PageInfo, totalCount int) (*ConnectionType, error)
}

func NodeTypeCon(source interface{}, nType Type, input ConnectionInput) (ConnectionType, error) {
	var edges []EdgeType
	var pageInfo PageInfo

	emptyCon, _ := nType.ConMaker(edges, pageInfo, 0)

	offset := 0

	src := source.([]*NodeType)

	if input.After != nil {
		for i, value := range src {
			edge := nType.Edger(value, i)
			if edge == nil {
				continue
			}

			if edge.GetCursor() == *input.After {
				// remove all previous element including the "after" one
				source = src[i+1:]
				offset = i + 1
				break
			}
		}
	}

	if input.Before != nil {
		for i, value := range src {
			edge := nType.Edger(value, i+offset)

			if edge.GetCursor() == *input.Before {
				// remove all after element including the "before" one
				break
			}

			edges = append(edges, edge)
		}
	} else {
		edges = make([]EdgeType, len(src))

		for i, value := range src {
			edges[i] = nType.Edger(value, i+offset)
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

	return nType.ConMaker(edges, pageInfo, len(src))
}
