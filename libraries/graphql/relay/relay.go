package relay

import (
	"fmt"
	"sort"
	"strings"

	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/codegen/templates"
	"github.com/99designs/gqlgen/plugin"
	"github.com/vektah/gqlparser/v2/ast"
)

type relay struct {
	Nodes []*Node
}

// Name returns the plugin name
func (f *relay) Name() string {
	return "relay"
}

// MutateConfig mutates the configuration
func (f *relay) MutateConfig(cfg *config.Config) error {
	builtins := config.TypeMap{
		"Node": {
			Model: config.StringList{
				"overdoll/libraries/graphql/relay/relayruntime.Node",
			},
		},
	}
	for typeName, entry := range builtins {
		if cfg.Models.Exists(typeName) {
			return fmt.Errorf("%v already exists which must be reserved when Relay is enabled", typeName)
		}
		cfg.Models[typeName] = entry
	}
	cfg.Directives["external"] = config.DirectiveConfig{SkipRuntime: true}
	cfg.Directives["requires"] = config.DirectiveConfig{SkipRuntime: true}
	cfg.Directives["provides"] = config.DirectiveConfig{SkipRuntime: true}
	cfg.Directives["key"] = config.DirectiveConfig{SkipRuntime: true}
	cfg.Directives["extends"] = config.DirectiveConfig{SkipRuntime: true}

	return nil
}

func (f *relay) InjectSourceEarly() *ast.Source {
	return &ast.Source{
		Name: "relay/directives.graphql",
		Input: `
directive @connection on FIELD_DEFINITION
`,
		BuiltIn: true,
	}
}


// InjectSources creates a GraphQL Node type with all
// the fields that implement the Node interface
func (f *relay) InjectSourceLate(schema *ast.Schema) *ast.Source {
	f.setNodes(schema)
}

// New returns a federation plugin that injects
// federated directives and types into the schema
func New() plugin.Plugin {
	return &relay{}
}

// Node represents a federated type
// that was declared in the GQL schema.
type Node struct {
	Name         string      // The same name as the type declaration
	KeyFields    []*KeyField // The fields declared in @key.
	ResolverName string      // The resolver name, such as FindUserByID
	Def          *ast.Definition
	Requires     []*Requires
}

type KeyField struct {
	Field         *ast.FieldDefinition
	TypeReference *config.TypeReference // The Go representation of that field type
}

// Requires represents an @requires clause
type Requires struct {
	Name   string          // the name of the field
	Fields []*RequireField // the name of the sibling fields
}

// RequireField is similar to an entity but it is a field not
// an object
type RequireField struct {
	Name          string                // The same name as the type declaration
	NameGo        string                // The Go struct field name
	TypeReference *config.TypeReference // The Go representation of that field type
}


func (f *relay) getKeyField(keyFields []*KeyField, fieldName string) *KeyField {
	for _, field := range keyFields {
		if field.Field.Name == fieldName {
			return field
		}
	}
	return nil
}

func (f *relay) setNodes(schema *ast.Schema) {
	for _, schemaType := range schema.Types {
		if schemaType.Kind == ast.Object {
			interfaces := schemaType.Interfaces

			foundNodeInterface := false

			// get any types that implement "Node"
			for _, inter := range interfaces {
				if inter == "Node" {
					foundNodeInterface = true
				}
			}

			if foundNodeInterface {
				requires := []*Requires{}
				for _, f := range schemaType.Fields {
					dir := f.Directives.ForName("requires")
					if dir == nil {
						continue
					}
					fields := strings.Split(dir.Arguments[0].Value.Raw, " ")
					requireFields := []*RequireField{}
					for _, f := range fields {
						requireFields = append(requireFields, &RequireField{
							Name: f,
						})
					}
					requires = append(requires, &Requires{
						Name:   f.Name,
						Fields: requireFields,
					})
				}

				resolverName := fmt.Sprintf("find%sBy", schemaType.Name)

				e := &Node{
					Name:         schemaType.Name,
					KeyFields:    keyFields,
					Def:          schemaType,
					ResolverName: resolverName,
					Requires:     requires,
				}

				f.Nodes = append(f.Nodes, e)
			}
		}
	}

	// make sure order remains stable across multiple builds
	sort.Slice(f.Nodes, func(i, j int) bool {
		return f.Nodes[i].Name < f.Nodes[j].Name
	})
}