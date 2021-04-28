package ports

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/errcode"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/mitchellh/mapstructure"
	"github.com/vektah/gqlparser/v2/gqlerror"
	gen "overdoll/applications/hades/src/ports/graphql"
	"overdoll/libraries/middleware"
)

type GraphQLServer struct {
	app app.Application
}

func NewGraphQLServer(app app.Application) *http.Server {
	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Add gin context to context
	router.Use(middleware.GinContextToContextMiddleware())

	// Add user to context, if session cookie exists
	router.Use(func(c *gin.Context) {
		cookie, err := c.Request.Cookie("session")

		// Allow unauthenticated users in
		if err != nil || cookie == nil {
			c.Next()
			return
		}

		jwtService := jwt.JWTAuthService()

		// Verify JWT token
		jwtToken, err := jwtService.ValidateToken(cookie.Value)

		if err != nil || jwtToken == nil {
			// If token invalid, remove it
			// c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			c.Next()
			return
		}

		claims := jwtToken.Claims.(*jwt.AuthCustomClaims)

		// make sure our session token also exists in the Redis Set
		existing, err := redis.Do("SISMEMBER", "session:"+claims.Id, cookie.Value)

		// If it doesn't exist in Redis, we remove it
		if err != nil || existing == 0 {
			// Instead of a 403 abort, we just remove this invalid session cookie
			//c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			c.Next()
			return
		}

		// Verify user exists with this token by grabbing the user
		user, err := services.Eva().GetUser(c, &eva.GetUserRequest{Id: claims.Id})

		if err != nil {
			// No user - we just remove this token from our set
			// c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			redis.Do("SREM", "session:"+claims.Id, cookie.Value)
			c.Next()
			return
		}

		_, err = helpers.CreateUserSession(c, redis, claims.Id)

		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// remove old token since its not valid anymore (we "expired" it)
		existing, err = redis.Do("SREM", "session:"+claims.Id, cookie.Value)

		// Redis error
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// put it in context
		ctx := context.WithValue(c.Request.Context(), "UserContextKey",
			&models.AuthenticatedUser{
				Id:       user.Id,
				Username: user.Username,
				Token:    jwtToken.Raw,
				Roles:    user.Roles,
				Verified: user.Verified,
			},
		)

		// and call the next with our new context
		c.Request = c.Request.WithContext(ctx)
		c.Next()
		return
	})

	// APQ cache
	cache, err := extension2.NewCache()

	// Create resolver, with services
	gqlResolver := gen.NewResolver(svc, redisSvc, rabbitSvc, es)

	// Create graphApi handlers - GET and POST
	gqlHandler := HandleGraphQL(gqlResolver, cache)

	// We only do CSRF middleware on here, because it doesn't work on WS
	router.POST("/graphql", middleware.CSRFCheck(), gqlHandler)
	router.GET("/graphql", gqlHandler)

	return &http.Server{
		Addr:         fmt.Sprint(":8080"),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}
}

// HandleGraphQL - handle graphQL
func HandleGraphQL(resolver gen.ResolverRoot, cache *extension2.Cache) gin.HandlerFunc {

	return func(c *gin.Context) {
		graphAPIHandler := handler.New(gen.NewExecutableSchema(gen.Config{
			Resolvers:  resolver,
			Directives: gen.Directive(),
		}))

		graphAPIHandler.AddTransport(&transport.Websocket{
			KeepAlivePingInterval: 10 * time.Second,
			Upgrader: websocket.Upgrader{
				ReadBufferSize:  1024,
				WriteBufferSize: 1024,
			},
		})

		if os.Getenv("APP_DEBUG") == "true" {
			graphAPIHandler.Use(extension.Introspection{})
		} else {
			graphAPIHandler.Use(extension.FixedComplexityLimit(3))
		}

		graphAPIHandler.AddTransport(transport.POST{})
		graphAPIHandler.AddTransport(transport.GET{})

		var mb int64 = 1 << 20
		graphAPIHandler.AddTransport(transport.MultipartForm{
			MaxMemory:     32 * mb,
			MaxUploadSize: 50 * mb,
		})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Add APQ
		graphAPIHandler.Use(extension2.AutomaticPersistedQuery{Cache: cache})

		// Query complexity limit

		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}

type Cache struct {
	queries map[string]interface{}
}

func NewCache() (*Cache, error) {
	// Open our jsonFile
	jsonFile, err := os.Open("applications/hades/queries.json")

	if err != nil {
		fmt.Println(err)
	}
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	return &Cache{queries: result}, nil
}

func (c *Cache) Get(ctx context.Context, key string) (interface{}, bool) {
	s := c.queries[key]
	return s, true
}

func (c *Cache) Add(ctx context.Context, key string, value interface{}) {
	log.Printf("query not found. please generate the queries.json file")
}

const errPersistedQueryNotFound = "PersistedQueryNotFound"
const errPersistedQueryNotFoundCode = "PERSISTED_QUERY_NOT_FOUND"

type AutomaticPersistedQuery struct {
	Cache graphql.Cache
}

type ApqStats struct {
	// The hash of the incoming query
	Hash string

	// SentQuery is true if the incoming request sent the full query
	SentQuery bool
}

const apqExtension = "APQ"

var _ interface {
	graphql.OperationParameterMutator
	graphql.HandlerExtension
} = AutomaticPersistedQuery{}

func (a AutomaticPersistedQuery) ExtensionName() string {
	return "AutomaticPersistedQuery"
}

func (a AutomaticPersistedQuery) Validate(schema graphql.ExecutableSchema) error {
	if a.Cache == nil {
		return fmt.Errorf("AutomaticPersistedQuery.Cache can not be nil")
	}
	return nil
}

// Custom implementation of APQ
// We just check the "query" parameter, which contains the string
// Avoids an incompatibility with a JS library, and we can later customize this transport to be even smaller
func (a AutomaticPersistedQuery) MutateOperationParameters(ctx context.Context, rawParams *graphql.RawParams) *gqlerror.Error {
	if rawParams.Extensions["apq"] == nil {
		return nil
	}

	var extension struct {
		Sha256 string `mapstructure:"hash"`
	}

	if err := mapstructure.Decode(rawParams.Extensions["apq"], &extension); err != nil {
		return gqlerror.Errorf("invalid APQ extension data")
	}

	fullQuery := false
	if rawParams.Query == "" {
		// client sent optimistic query hash without query string, get it from the cache
		query, ok := a.Cache.Get(ctx, extension.Sha256)
		if !ok {
			err := gqlerror.Errorf(extension.Sha256)
			errcode.Set(err, errPersistedQueryNotFoundCode)
			return err
		}
		rawParams.Query = query.(string)
	} else {

		// If introspection enabled, we allow full queries
		if os.Getenv("APP_DEBUG") == "true" {
			// Dont do anything if client sends a full query
			fullQuery = true
		}

	}

	graphql.GetOperationContext(ctx).Stats.SetExtension(apqExtension, &ApqStats{
		Hash:      extension.Sha256,
		SentQuery: fullQuery,
	})

	return nil
}
