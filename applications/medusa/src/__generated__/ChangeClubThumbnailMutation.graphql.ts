/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 69bfd7f2a4245402cf60d66094adf319 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type ChangeClubThumbnailMutationVariables = {
    id: string;
    thumbnail: string;
};
export type ChangeClubThumbnailMutationResponse = {
    readonly updateClubThumbnail: {
        readonly club: {
            readonly id: string;
            readonly name: string;
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
export type ChangeClubThumbnailMutation = {
    readonly response: ChangeClubThumbnailMutationResponse;
    readonly variables: ChangeClubThumbnailMutationVariables;
};



/*
mutation ChangeClubThumbnailMutation(
  $id: ID!
  $thumbnail: String!
) {
  updateClubThumbnail(input: {id: $id, thumbnail: $thumbnail}) {
    club {
      id
      name
      thumbnail {
        type
        urls {
          url
          mimeType
        }
        id
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
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "thumbnail"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "thumbnail",
        "variableName": "thumbnail"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeClubThumbnailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClubThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateClubThumbnail",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeClubThumbnailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClubThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateClubThumbnail",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v2/*: any*/)
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
    "id": "69bfd7f2a4245402cf60d66094adf319",
    "metadata": {},
    "name": "ChangeClubThumbnailMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '2b0f438e8b304946a1e85db946277c48';
export default node;
