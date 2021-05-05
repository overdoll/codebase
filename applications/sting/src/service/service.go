package service

import (
	"context"
	"log"
	"os"

	"github.com/Shopify/sarama"
	"github.com/ThreeDotsLabs/watermill"
	"github.com/ThreeDotsLabs/watermill-kafka/v2/pkg/kafka"
	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	"github.com/ThreeDotsLabs/watermill/message"
	"github.com/ThreeDotsLabs/watermill/message/router/middleware"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/event"
	"overdoll/applications/sting/src/app/query"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/client"
	"overdoll/libraries/elasticsearch"
)

func NewApplication(ctx context.Context) (app.Application, *message.Router, func()) {

	evaClient, cleanup := client.NewEvaClient(ctx)

	logger := watermill.NewStdLogger(false, false)

	router, err := message.NewRouter(message.RouterConfig{}, logger)

	if err != nil {
		panic(err)
	}

	router.AddMiddleware(middleware.Recoverer)

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient), router), router,
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, *message.Router) {
	router, _ := message.NewRouter(message.RouterConfig{}, watermill.NewStdLogger(false, false))

	return createApplication(ctx, EvaServiceMock{}, router), router
}

func createApplication(ctx context.Context, eva app.EvaService, router *message.Router) app.Application {

	logger := watermill.NewStdLogger(false, false)

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := bootstrap.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("es session failed with errors: %s", err)
	}

	awsSession, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	saramaSubscriberConfig := kafka.DefaultSaramaSubscriberConfig()
	// equivalent of auto.offset.reset: earliest
	saramaSubscriberConfig.Consumer.Offsets.Initial = sarama.OffsetOldest

	kafkaSubscriberConfig := kafka.SubscriberConfig{
		Brokers:               []string{os.Getenv("KAFKA_URL")},
		Unmarshaler:           kafka.DefaultMarshaler{},
		OverwriteSaramaConfig: saramaSubscriberConfig,
		ConsumerGroup:         "sting",
	}

	kafkaPublisherConfig := kafka.PublisherConfig{
		Brokers:   []string{os.Getenv("KAFKA_URL")},
		Marshaler: kafka.DefaultMarshaler{},
	}

	commandsPublisher, err := kafka.NewPublisher(kafkaPublisherConfig, logger)

	if err != nil {
		panic(err)
	}

	commandsSubscriber, err := kafka.NewSubscriber(kafkaSubscriberConfig, logger)

	if err != nil {
		panic(err)
	}

	eventsPublisher, err := kafka.NewPublisher(kafkaPublisherConfig, logger)
	if err != nil {
		panic(err)
	}

	postRepo := adapters.NewPostsCassandraRepository(session)
	indexRepo := adapters.NewPostIndexElasticSearchRepository(es)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	// cqrs.Facade is facade for Command and Event buses and processors.
	// You can use facade, or create buses and processors manually (you can inspire with cqrs.NewFacade)
	facade, err := cqrs.NewFacade(cqrs.FacadeConfig{
		GenerateCommandsTopic: func(commandName string) string {
			return commandName
		},
		CommandHandlers: func(cb *cqrs.CommandBus, eb *cqrs.EventBus) []cqrs.CommandHandler {
			eventRepo := adapters.NewPostEventRepository(cb, eb)
			return []cqrs.CommandHandler{
				command.NewNewPostHandler(postRepo, indexRepo, contentRepo, eva, eventRepo),
				command.NewCreatePostHandler(postRepo, indexRepo, eva),
				command.NewReviewPostHandler(postRepo, eventRepo),
				command.NewCreateCategoryHandler(postRepo, indexRepo),
				command.NewCreateCharacterHandler(postRepo, indexRepo),
				command.NewCreateMediaHandler(postRepo, indexRepo),
				command.NewIndexAllArtistsHandler(postRepo, indexRepo),
				command.NewIndexAllCharactersHandler(postRepo, indexRepo),
				command.NewIndexAllCategoriesHandler(postRepo, indexRepo),
				command.NewIndexAllMediaHandler(postRepo, indexRepo),
			}
		},
		CommandsPublisher: commandsPublisher,
		CommandsSubscriberConstructor: func(handlerName string) (message.Subscriber, error) {
			return commandsSubscriber, nil
		},
		GenerateEventsTopic: func(eventName string) string {
			return eventName
		},
		EventHandlers: func(cb *cqrs.CommandBus, eb *cqrs.EventBus) []cqrs.EventHandler {
			eventRepo := adapters.NewPostEventRepository(cb, eb)
			return []cqrs.EventHandler{
				event.NewPublishPostHandler(postRepo, indexRepo, eventRepo, contentRepo, eva),
			}
		},
		EventsPublisher: eventsPublisher,
		EventsSubscriberConstructor: func(handlerName string) (message.Subscriber, error) {
			return kafka.NewSubscriber(
				kafkaSubscriberConfig,
				logger,
			)
		},
		Router:                router,
		CommandEventMarshaler: cqrs.ProtobufMarshaler{},
		Logger:                logger,
	})

	return app.Application{
		Commands: app.Commands{
			Bus: facade,
		},
		Queries: app.Queries{
			SearchMedias:     query.NewSearchMediasHandler(indexRepo),
			SearchCharacters: query.NewSearchCharactersHandler(indexRepo),
			SearchCategories: query.NewSearchCategoriesHandler(indexRepo),
			SearchArtist:     query.NewSearchArtistsHandler(indexRepo),
		},
	}
}
