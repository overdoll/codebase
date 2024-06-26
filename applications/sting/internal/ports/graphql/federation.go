// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package gen

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"sync"

	"github.com/99designs/gqlgen/plugin/federation/fedruntime"
)

var (
	ErrUnknownType  = errors.New("unknown type")
	ErrTypeNotFound = errors.New("type not found")
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

func (ec *executionContext) __resolve_entities(ctx context.Context, representations []map[string]interface{}) []fedruntime.Entity {
	list := make([]fedruntime.Entity, len(representations))

	repsMap := map[string]struct {
		i []int
		r []map[string]interface{}
	}{}

	// We group entities by typename so that we can parallelize their resolution.
	// This is particularly helpful when there are entity groups in multi mode.
	buildRepresentationGroups := func(reps []map[string]interface{}) {
		for i, rep := range reps {
			typeName, ok := rep["__typename"].(string)
			if !ok {
				// If there is no __typename, we just skip the representation;
				// we just won't be resolving these unknown types.
				ec.Error(ctx, errors.New("__typename must be an existing string"))
				continue
			}

			_r := repsMap[typeName]
			_r.i = append(_r.i, i)
			_r.r = append(_r.r, rep)
			repsMap[typeName] = _r
		}
	}

	isMulti := func(typeName string) bool {
		switch typeName {
		default:
			return false
		}
	}

	resolveEntity := func(ctx context.Context, typeName string, rep map[string]interface{}, idx []int, i int) (err error) {
		// we need to do our own panic handling, because we may be called in a
		// goroutine, where the usual panic handling can't catch us
		defer func() {
			if r := recover(); r != nil {
				err = ec.Recover(ctx, r)
			}
		}()

		switch typeName {
		case "Account":
			resolverName, err := entityResolverNameForAccount(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Account": %w`, err)
			}
			switch resolverName {

			case "findAccountByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findAccountByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindAccountByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Account": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Audience":
			resolverName, err := entityResolverNameForAudience(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Audience": %w`, err)
			}
			switch resolverName {

			case "findAudienceByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findAudienceByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindAudienceByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Audience": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Category":
			resolverName, err := entityResolverNameForCategory(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Category": %w`, err)
			}
			switch resolverName {

			case "findCategoryByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findCategoryByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindCategoryByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Category": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Character":
			resolverName, err := entityResolverNameForCharacter(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Character": %w`, err)
			}
			switch resolverName {

			case "findCharacterByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findCharacterByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindCharacterByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Character": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Club":
			resolverName, err := entityResolverNameForClub(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Club": %w`, err)
			}
			switch resolverName {

			case "findClubByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findClubByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindClubByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Club": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "ClubMember":
			resolverName, err := entityResolverNameForClubMember(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "ClubMember": %w`, err)
			}
			switch resolverName {

			case "findClubMemberByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findClubMemberByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindClubMemberByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "ClubMember": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Post":
			resolverName, err := entityResolverNameForPost(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Post": %w`, err)
			}
			switch resolverName {

			case "findPostByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findPostByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindPostByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Post": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "PostLike":
			resolverName, err := entityResolverNameForPostLike(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "PostLike": %w`, err)
			}
			switch resolverName {

			case "findPostLikeByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findPostLikeByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindPostLikeByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "PostLike": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Series":
			resolverName, err := entityResolverNameForSeries(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Series": %w`, err)
			}
			switch resolverName {

			case "findSeriesByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findSeriesByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindSeriesByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Series": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}
		case "Topic":
			resolverName, err := entityResolverNameForTopic(ctx, rep)
			if err != nil {
				return fmt.Errorf(`finding resolver for Entity "Topic": %w`, err)
			}
			switch resolverName {

			case "findTopicByID":
				id0, err := ec.unmarshalNID2overdollᚋlibrariesᚋgraphqlᚋrelayᚐID(ctx, rep["id"])
				if err != nil {
					return fmt.Errorf(`unmarshalling param 0 for findTopicByID(): %w`, err)
				}
				entity, err := ec.resolvers.Entity().FindTopicByID(ctx, id0)
				if err != nil {
					return fmt.Errorf(`resolving Entity "Topic": %w`, err)
				}

				list[idx[i]] = entity
				return nil
			}

		}
		return fmt.Errorf("%w: %s", ErrUnknownType, typeName)
	}

	resolveManyEntities := func(ctx context.Context, typeName string, reps []map[string]interface{}, idx []int) (err error) {
		// we need to do our own panic handling, because we may be called in a
		// goroutine, where the usual panic handling can't catch us
		defer func() {
			if r := recover(); r != nil {
				err = ec.Recover(ctx, r)
			}
		}()

		switch typeName {

		default:
			return errors.New("unknown type: " + typeName)
		}
	}

	resolveEntityGroup := func(typeName string, reps []map[string]interface{}, idx []int) {
		if isMulti(typeName) {
			err := resolveManyEntities(ctx, typeName, reps, idx)
			if err != nil {
				ec.Error(ctx, err)
			}
		} else {
			// if there are multiple entities to resolve, parallelize (similar to
			// graphql.FieldSet.Dispatch)
			var e sync.WaitGroup
			e.Add(len(reps))
			for i, rep := range reps {
				i, rep := i, rep
				go func(i int, rep map[string]interface{}) {
					err := resolveEntity(ctx, typeName, rep, idx, i)
					if err != nil {
						ec.Error(ctx, err)
					}
					e.Done()
				}(i, rep)
			}
			e.Wait()
		}
	}
	buildRepresentationGroups(representations)

	switch len(repsMap) {
	case 0:
		return list
	case 1:
		for typeName, reps := range repsMap {
			resolveEntityGroup(typeName, reps.r, reps.i)
		}
		return list
	default:
		var g sync.WaitGroup
		g.Add(len(repsMap))
		for typeName, reps := range repsMap {
			go func(typeName string, reps []map[string]interface{}, idx []int) {
				resolveEntityGroup(typeName, reps, idx)
				g.Done()
			}(typeName, reps.r, reps.i)
		}
		g.Wait()
		return list
	}
}

func entityResolverNameForAccount(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findAccountByID", nil
	}
	return "", fmt.Errorf("%w for Account", ErrTypeNotFound)
}

func entityResolverNameForAudience(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findAudienceByID", nil
	}
	return "", fmt.Errorf("%w for Audience", ErrTypeNotFound)
}

func entityResolverNameForCategory(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findCategoryByID", nil
	}
	return "", fmt.Errorf("%w for Category", ErrTypeNotFound)
}

func entityResolverNameForCharacter(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findCharacterByID", nil
	}
	return "", fmt.Errorf("%w for Character", ErrTypeNotFound)
}

func entityResolverNameForClub(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findClubByID", nil
	}
	return "", fmt.Errorf("%w for Club", ErrTypeNotFound)
}

func entityResolverNameForClubMember(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findClubMemberByID", nil
	}
	return "", fmt.Errorf("%w for ClubMember", ErrTypeNotFound)
}

func entityResolverNameForPost(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findPostByID", nil
	}
	return "", fmt.Errorf("%w for Post", ErrTypeNotFound)
}

func entityResolverNameForPostLike(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findPostLikeByID", nil
	}
	return "", fmt.Errorf("%w for PostLike", ErrTypeNotFound)
}

func entityResolverNameForSeries(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findSeriesByID", nil
	}
	return "", fmt.Errorf("%w for Series", ErrTypeNotFound)
}

func entityResolverNameForTopic(ctx context.Context, rep map[string]interface{}) (string, error) {
	for {
		var (
			m   map[string]interface{}
			val interface{}
			ok  bool
		)
		_ = val
		m = rep
		if _, ok = m["id"]; !ok {
			break
		}
		return "findTopicByID", nil
	}
	return "", fmt.Errorf("%w for Topic", ErrTypeNotFound)
}
