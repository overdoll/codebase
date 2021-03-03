package server

import (
	pox "overdoll/applications/pox/proto"
)

type Server struct {}

func CreateServer() *Server {
	return &Server{}
}

// ProcessPost - process our images (diff check, etc...)
// and then tell Sting that we are finished, so it can put the post in review or call the next message
func (s *Server) ProcessPost(msg *pox.PostProcessImageEvent) {}

// PublishPost - make the images in the post publicly viewable, and then
// tell Sting about the images
func (s *Server) PublishPost(msg *pox.PostPublishImageEvent) {}