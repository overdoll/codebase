/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e87a86aa60ed99c76b7df20414240147 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type CreateClubMutationVariables = {
    name: string;
    slug: string;
};
export type CreateClubMutationResponse = {
    readonly createClub: {
        readonly club: {
            readonly id: string;
            readonly reference: string;
            readonly slug: string;
            readonly name: string;
            readonly owner: {
                readonly id: string;
            };
            readonly thumbnail: {
                readonly type: ResourceType;
                readonly urls: ReadonlyArray<{
                    readonly url: string;
                    readonly mimeType: string;
                }>;
            } | null;
        } | null;
    } | null;
};
export type CreateClubMutation = {
    readonly response: CreateClubMutationResponse;
    readonly variables: CreateClubMutationVariables;
};



/*
mutation CreateClubMutation(
  $name: String!
  $slug: String!
) {
  createClub(input: {name: $name, slug: $slug}) {
    club {
      id
      reference
      slug
      name
      owner {
        id
      }
      thumbnail {
        type
        urls {
          url
          mimeType
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "name",
            "variableName": "name"
          },
          {
            "kind": "Variable",
            "name": "slug",
            "variableName": "slug"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateClubPayload",
    "kind": "LinkedField",
    "name": "createClub",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reference",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "owner",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "thumbnail",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateClubMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateClubMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "e87a86aa60ed99c76b7df20414240147",
    "metadata": {},
    "name": "CreateClubMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '72bf91c5161f2e7ac52c21a90be1a5dc';
export default node;
