/**
 * @generated SignedSource<<447c0735e77ab9ddd55d710ca563185c>>
 * @relayHash 0f80e5048d1ba22d29ef0ecf2b3fe4aa
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0f80e5048d1ba22d29ef0ecf2b3fe4aa

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateSeriesThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeSeriesThumbnailFormMutation$variables = {
  input: UpdateSeriesThumbnailInput;
};
export type ChangeSeriesThumbnailFormMutation$data = {
  readonly updateSeriesThumbnail: {
    readonly series: {
      readonly id: string;
      readonly thumbnail: {
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
          readonly mimeType: string;
          readonly url: string;
        }>;
      } | null;
    } | null;
  } | null;
};
export type ChangeSeriesThumbnailFormMutation = {
  response: ChangeSeriesThumbnailFormMutation$data;
  variables: ChangeSeriesThumbnailFormMutation$variables;
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
    "name": "ChangeSeriesThumbnailFormMutation",
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
    "name": "ChangeSeriesThumbnailFormMutation",
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
    "id": "0f80e5048d1ba22d29ef0ecf2b3fe4aa",
    "metadata": {},
    "name": "ChangeSeriesThumbnailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d1bb8f6d30171b1bc5d4de028bb2e99c";

export default node;
