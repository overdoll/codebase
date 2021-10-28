/**
 * @flow
 * @relayHash 1b7fbcb46fe8ce2118cf9fd6946331ab
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { ArrangeFragment$ref } from "./ArrangeFragment.graphql";
import type { UpdatePostFlowFragment$ref } from "./UpdatePostFlowFragment.graphql";
import type { UpdatePostFlowTagFragment$ref } from "./UpdatePostFlowTagFragment.graphql";
export type CreatePostQueryVariables = {|
  reference: string
|};
export type CreatePostQueryResponse = {|
  +post: ?{|
    +__typename: string,
    +$fragmentRefs: ArrangeFragment$ref & UpdatePostFlowFragment$ref,
  |},
  +$fragmentRefs: UpdatePostFlowTagFragment$ref,
|};
export type CreatePostQuery = {|
  variables: CreatePostQueryVariables,
  response: CreatePostQueryResponse,
|};


/*
query CreatePostQuery(
  $reference: String!
) {
  post(reference: $reference) {
    __typename
    ...ArrangeFragment
    ...UpdatePostFlowFragment
    id
  }
  ...UpdatePostFlowTagFragment
}

fragment ArrangeFragment on Post {
  content {
    id
    urls {
      url
      mimeType
    }
  }
  ...ArrangeUploadsFragment
  ...ProcessUploadsFragment
}

fragment ArrangeUploadsFragment on Post {
  content {
    id
    type
    urls {
      url
      mimeType
    }
  }
}

fragment AudienceFragment on Post {
  audience {
    id
    title
  }
}

fragment AudienceTagFragment on Query {
  audiences {
    edges {
      node {
        id
      }
    }
  }
}

fragment FlowFooterFragment on Post {
  ...FlowForwardButtonFragment
}

fragment FlowForwardButtonFragment on Post {
  id
  content {
    id
  }
}

fragment FlowStepsFragment on Post {
  ...ArrangeFragment
  ...AudienceFragment
}

fragment FlowStepsTagFragment on Query {
  ...AudienceTagFragment
}

fragment ProcessUploadsFragment on Post {
  id
  content {
    urls {
      url
    }
  }
}

fragment UpdatePostFlowFragment on Post {
  ...FlowStepsFragment
  ...FlowFooterFragment
}

fragment UpdatePostFlowTagFragment on Query {
  ...FlowStepsTagFragment
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArrangeFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UpdatePostFlowFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "UpdatePostFlowTagFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreatePostQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "post",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mimeType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AudienceConnection",
        "kind": "LinkedField",
        "name": "audiences",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AudienceEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Audience",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "1b7fbcb46fe8ce2118cf9fd6946331ab",
    "metadata": {},
    "name": "CreatePostQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'daf866e7354660002319bc5db666248d';
module.exports = node;
