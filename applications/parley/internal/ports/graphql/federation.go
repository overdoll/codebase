// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package gen

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/99designs/gqlgen/plugin/federation/fedruntime"
)

func (ec *executionContext) __resolve__service(ctx context.Context) (fedruntime.Service, error) {
	if ec.DisableIntrospection {
		return fedruntime.Service{}, errors.New("federated introspection disabled")
	}

	var sdl []string

	for _, src := range sources {
		if src.BuiltIn {
			continue
		}
		sdl = append(sdl, src.Input)
	}

	return fedruntime.Service{
		SDL: strings.Join(sdl, "\n"),
	}, nil
}

func (ec *executionContext) __resolve_entities(ctx context.Context, representations []map[string]interface{}) ([]fedruntime.Entity, error) {
	list := []fedruntime.Entity{}
	for _, rep := range representations {
		typeName, ok := rep["__typename"].(string)
		if !ok {
			return nil, errors.New("__typename must be an existing string")
		}
		switch typeName {

		case "Account":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindAccountByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "AccountInfractionHistory":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindAccountInfractionHistoryByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "Moderator":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindModeratorByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "Post":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindPostByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "PostAuditLog":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindPostAuditLogByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "PostRejectionReason":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindPostRejectionReasonByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "PostReport":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindPostReportByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		case "PostReportReason":
			id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
			if err != nil {
				return nil, errors.New(fmt.Sprintf("Field %s undefined in schema.", "id"))
			}

			entity, err := ec.resolvers.Entity().FindPostReportReasonByID(ctx,
				id0)
			if err != nil {
				return nil, err
			}

			list = append(list, entity)

		default:
			return nil, errors.New("unknown type: " + typeName)
		}
	}
	return list, nil
}
