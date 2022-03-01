/**
 * @generated SignedSource<<e4e210afa215cb762ef5ee722076ad6c>>
 * @relayHash 146c8a879a9dbc1a95456dc223278c0d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 146c8a879a9dbc1a95456dc223278c0d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateAudienceThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeAudienceThumbnailFormMutation$variables = {
  input: UpdateAudienceThumbnailInput;
};
export type ChangeAudienceThumbnailFormMutationVariables = ChangeAudienceThumbnailFormMutation$variables;
export type ChangeAudienceThumbnailFormMutation$data = {
  readonly updateAudienceThumbnail: {
    readonly audience: {
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
export type ChangeAudienceThumbnailFormMutationResponse = ChangeAudienceThumbnailFormMutation$data;
export type ChangeAudienceThumbnailFormMutation = {
  variables: ChangeAudienceThumbnailFormMutationVariables;
  response: ChangeAudienceThumbnailFormMutation$data;
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
    "name": "ChangeAudienceThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAudienceThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateAudienceThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
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
    "name": "ChangeAudienceThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAudienceThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateAudienceThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Audience",
            "kind": "LinkedField",
            "name": "audience",
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
    "id": "146c8a879a9dbc1a95456dc223278c0d",
    "metadata": {},
    "name": "ChangeAudienceThumbnailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6d177d2bca68d32238373d29dea19f95";

export default node;
