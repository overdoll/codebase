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
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/app/command"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/search"
)

func NewApplication(ctx context.Context) (app.Application, *message.Router, func()) {

	evaConnection, err := grpc.DialContext(ctx, os.Getenv("EVA_SERVICE"), grpc.WithInsecure())

	if err != nil {
		panic(err)
	}

	evaGrpc := adapters.NewEvaGrpc(eva.NewEvaClient(evaConnection))

	logger := watermill.NewStdLogger(false, false)

	router, err := message.NewRouter(message.RouterConfig{}, logger)

	if err != nil {
		panic(err)
	}

	router.AddMiddleware(middleware.Recoverer)

	return createApplication(ctx, evaGrpc, router), router,
		func() {
			_ = evaConnection.Close()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	router, _ := message.NewRouter(message.RouterConfig{}, watermill.NewStdLogger(false, false))

	return createApplication(ctx, EvaServiceMock{}, router)
}

func createApplication(ctx context.Context, evaGrpc command.EvaService, router *message.Router) app.Application {

	logger := watermill.NewStdLogger(false, false)

	init, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

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

	categoryRepo := adapters.NewCategoryCassandraRepository(session)
	categoryIndexRepo := adapters.NewCategoryIndexElasticSearchRepository(es)

	characterRepo := adapters.NewCharacterCassandraRepository(session)
	characterIndexRepo := adapters.NewCharacterIndexElasticSearchRepository(es)

	artistRepo := adapters.NewArtistCassandraRepository(session)
	artistIndexRepo := adapters.NewArtistIndexElasticSearchRepository(es)

	postRepo := adapters.NewPostsCassandraRepository(session)
	_ = adapters.NewPostIndexElasticSearchRepository(es)

	contentRepo := adapters.NewContentS3Repository(awsSession)

	// cqrs.Facade is facade for Command and Event buses and processors.
	// You can use facade, or create buses and processors manually (you can inspire with cqrs.NewFacade)
	_, err = cqrs.NewFacade(cqrs.FacadeConfig{
		GenerateCommandsTopic: func(commandName string) string {
			return commandName
		},
		CommandHandlers: func(cb *cqrs.CommandBus, eb *cqrs.EventBus) []cqrs.CommandHandler {
			return []cqrs.CommandHandler{
				command.NewNewPostHandler(postRepo, characterRepo, categoryRepo, contentRepo, evaGrpc, eb),
				command.NewReviewPostHandler(postRepo, characterRepo, categoryRepo, eb),
				command.NewCreateCategoryHandler(categoryRepo, categoryIndexRepo),
				command.NewCreateCharacterHandler(characterRepo, characterIndexRepo),
				command.NewCreateMediaHandler(characterRepo, characterIndexRepo),
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
			return []cqrs.EventHandler{
				command.NewPublishPostHandler(postRepo, characterRepo, categoryRepo, cb),
			}
		},
		EventsPublisher: eventsPublisher,
		EventsSubscriberConstructor: func(handlerName string) (message.Subscriber, error) {
			return kafka.NewSubscriber(
				kafkaSubscriberConfig,
				watermill.NewStdLogger(false, false),
			)
		},
		Router:                router,
		CommandEventMarshaler: cqrs.ProtobufMarshaler{},
		Logger:                logger,
	})

	return app.Application{
		Commands: app.Commands{
			IndexMedia:      command.NewIndexAllMediaHandler(characterRepo, characterIndexRepo),
			IndexCharacters: command.NewIndexAllCharactersHandler(characterRepo, characterIndexRepo),
			IndexCategories: command.NewIndexAllCategoriesHandler(categoryRepo, categoryIndexRepo),
			IndexArtists:    command.NewIndexAllArtistsHandler(artistRepo, artistIndexRepo),
		},
	}
}
