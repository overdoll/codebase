/**
 * @generated SignedSource<<0c57039e28bbf880ea3cd29d7f41ec6d>>
 * @relayHash e03c56ce443ad26b84756273f6a74498
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e03c56ce443ad26b84756273f6a74498

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateSeriesThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeSeriesThumbnailMutation$variables = {
  input: UpdateSeriesThumbnailInput;
};
export type ChangeSeriesThumbnailMutationVariables = ChangeSeriesThumbnailMutation$variables;
export type ChangeSeriesThumbnailMutation$data = {
  readonly updateSeriesThumbnail: {
    readonly series: {
      readonly id: string;
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
export type ChangeSeriesThumbnailMutationResponse = ChangeSeriesThumbnailMutation$data;
export type ChangeSeriesThumbnailMutation = {
  variables: ChangeSeriesThumbnailMutationVariables;
  response: ChangeSeriesThumbnailMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "type",
  "storageKey": null
},
v4 = {
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
    "name": "ChangeSeriesThumbnailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSeriesThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateSeriesThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Series",
            "kind": "LinkedField",
            "name": "series",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/)
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
    "name": "ChangeSeriesThumbnailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateSeriesThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateSeriesThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Series",
            "kind": "LinkedField",
            "name": "series",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "thumbnail",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
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
    "id": "e03c56ce443ad26b84756273f6a74498",
    "metadata": {},
    "name": "ChangeSeriesThumbnailMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "df6d8fc3e697804dfc23cc0115526c39";

export default node;
