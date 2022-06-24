/**
 * @generated SignedSource<<563c65f4667534f5d0ef2e08b55e270f>>
 * @relayHash cf774420a10bf5d7b6ab60ad70f0ebcd
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cf774420a10bf5d7b6ab60ad70f0ebcd

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurationAudienceNextButtonMutation$variables = {
  audienceIds: ReadonlyArray<string>;
  skipped: boolean;
};
export type CurationAudienceNextButtonMutation$data = {
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
export type CurationAudienceNextButtonMutation = {
  response: CurationAudienceNextButtonMutation$data;
  variables: CurationAudienceNextButtonMutation$variables;
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
    "name": "CurationAudienceNextButtonMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationAudienceNextButtonMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "cf774420a10bf5d7b6ab60ad70f0ebcd",
    "metadata": {},
    "name": "CurationAudienceNextButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8d26970b91d67f351c4b21d9e3dc61b0";

export default node;
