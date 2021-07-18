package relay

type Node struct {
	cursor string
}

func NewNode(cursor string) *Node {
	return &Node{cursor: cursor}
}

func (n *Node) Cursor() string {
	return n.cursor
}
