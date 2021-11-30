package gateway

import (
	"context"
	"encoding/json"
	"github.com/jensneuse/graphql-go-tools/pkg/engine/plan"
	"io"
)

type Configuration struct {
	Data string `json:"data"`
}

type Factory struct{}

func (f *Factory) Planner(ctx context.Context) plan.DataSourcePlanner {
	return &Planner{}
}

type Planner struct {
	config Configuration
}

func (p *Planner) DownstreamResponseFieldAlias(downstreamFieldRef int) (alias string, exists bool) {
	// skip, not required
	return
}

func (p *Planner) DataSourcePlanningBehavior() plan.DataSourcePlanningBehavior {
	return plan.DataSourcePlanningBehavior{
		MergeAliasedRootNodes:      false,
		OverrideFieldPathFromAlias: false,
	}
}

func (p *Planner) Register(visitor *plan.Visitor, customConfiguration json.RawMessage, isNested bool) error {
	return json.Unmarshal(customConfiguration, &p.config)
}

func (p *Planner) ConfigureFetch() plan.FetchConfiguration {
	return plan.FetchConfiguration{
		Input:      p.config.Data,
		DataSource: Source{},
	}
}

func (p *Planner) ConfigureSubscription() plan.SubscriptionConfiguration {
	return plan.SubscriptionConfiguration{
		Input: p.config.Data,
	}
}

type Source struct{}

func (_ Source) Load(ctx context.Context, input []byte, w io.Writer) (err error) {
	_, err = w.Write(input)
	return
}
