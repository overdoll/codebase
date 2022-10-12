/**
 * @generated SignedSource<<f54eba4f4f7adf083ba362a78b6c735c>>
 * @relayHash 9dbaca06489c777d39cd4ae9b8d550ab
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9dbaca06489c777d39cd4ae9b8d550ab

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurationProfileAudienceButtonMutation$variables = {
  audienceIds: ReadonlyArray<string>;
  skipped: boolean;
};
export type CurationProfileAudienceButtonMutation$data = {
  readonly updateCurationProfileAudience: {
    readonly curationProfile: {
      readonly audience: {
        readonly audiences: ReadonlyArray<{
          readonly id: string;
        }>;
        readonly completed: boolean;
        readonly skipped: boolean;
      };
      readonly completed: boolean;
      readonly id: string;
    } | null;
  } | null;
};
export type CurationProfileAudienceButtonMutation = {
  response: CurationProfileAudienceButtonMutation$data;
  variables: CurationProfileAudienceButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "audienceIds"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skipped"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "audienceIds",
            "variableName": "audienceIds"
          },
          {
            "kind": "Variable",
            "name": "skipped",
            "variableName": "skipped"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateCurationProfileAudiencePayload",
    "kind": "LinkedField",
    "name": "updateCurationProfileAudience",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CurationProfile",
        "kind": "LinkedField",
        "name": "curationProfile",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AudienceCurationProfile",
            "kind": "LinkedField",
            "name": "audience",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "skipped",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Audience",
                "kind": "LinkedField",
                "name": "audiences",
                "plural": true,
                "selections": [
                  (v1/*: any*/)
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
    "name": "CurationProfileAudienceButtonMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationProfileAudienceButtonMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "9dbaca06489c777d39cd4ae9b8d550ab",
    "metadata": {},
    "name": "CurationProfileAudienceButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a167184e993a7a9d1f711f7917d1b7be";

export default node;
