package documents

type Media struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

type Artist struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

type Character struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Name      string `json:"name"`
	Media     Media  `json:"media"`
}

type Category struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}
