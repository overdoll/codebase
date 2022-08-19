/**
 * @generated SignedSource<<795b2bf8e13b78f71b51523c1f69b7fc>>
 * @relayHash e61a6e434076035b3c5b2b0fdf32986e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e61a6e434076035b3c5b2b0fdf32986e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdateAudienceBannerInput = {
  banner: string;
  id: string;
};
export type ChangeAudienceThumbnailFormMutation$variables = {
  input: UpdateAudienceBannerInput;
};
export type ChangeAudienceThumbnailFormMutation$data = {
  readonly updateAudienceBanner: {
    readonly audience: {
      readonly banner: {
        readonly type: ResourceType;
        readonly urls: ReadonlyArray<{
          readonly mimeType: string;
          readonly url: string;
        }>;
      } | null;
      readonly id: string;
    } | null;
  } | null;
};
export type ChangeAudienceThumbnailFormMutation = {
  response: ChangeAudienceThumbnailFormMutation$data;
  variables: ChangeAudienceThumbnailFormMutation$variables;
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
        "concreteType": "UpdateAudienceBannerPayload",
        "kind": "LinkedField",
        "name": "updateAudienceBanner",
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
                "name": "banner",
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
        "concreteType": "UpdateAudienceBannerPayload",
        "kind": "LinkedField",
        "name": "updateAudienceBanner",
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
                "name": "banner",
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
    "id": "e61a6e434076035b3c5b2b0fdf32986e",
    "metadata": {},
    "name": "ChangeAudienceThumbnailFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6fa463452a18d8b50991b7c5da245876";

export default node;
