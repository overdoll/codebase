/**
 * @generated SignedSource<<116555035c4e16960a24b3c5f9e71c78>>
 * @relayHash 871e900bd0799c0a5b76d45a8f6daab0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 871e900bd0799c0a5b76d45a8f6daab0

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateCharacterThumbnailInput = {
  id: string;
  thumbnail: string;
};
export type ChangeCharacterThumbnailFormMutation$variables = {
  input: UpdateCharacterThumbnailInput;
};
export type ChangeCharacterThumbnailFormMutationVariables = ChangeCharacterThumbnailFormMutation$variables;
export type ChangeCharacterThumbnailFormMutation$data = {
  readonly updateCharacterThumbnail: {
    readonly character: {
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
export type ChangeCharacterThumbnailFormMutationResponse = ChangeCharacterThumbnailFormMutation$data;
export type ChangeCharacterThumbnailFormMutation = {
  variables: ChangeCharacterThumbnailFormMutationVariables;
  response: ChangeCharacterThumbnailFormMutation$data;
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
    "name": "ChangeCharacterThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCharacterThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateCharacterThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
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
    "name": "ChangeCharacterThumbnailFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateCharacterThumbnailPayload",
        "kind": "LinkedField",
        "name": "updateCharacterThumbnail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Character",
            "kind": "LinkedField",
            "name": "character",
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
    "id": "871e900bd0799c0a5b76d45a8f6daab0",
    "metadata": {},
    "name": "ChangeCharacterThumbnailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "61781b92002358814c4e3c684819b6e4";

export default node;
