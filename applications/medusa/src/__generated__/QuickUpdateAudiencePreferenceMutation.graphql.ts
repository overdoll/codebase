/**
 * @generated SignedSource<<cff892895f7457ecc69993cb9cce2d4c>>
 * @relayHash aa676383a4338d8ced9097a3cca789d6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID aa676383a4338d8ced9097a3cca789d6

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type QuickUpdateAudiencePreferenceMutation$variables = {
  audienceIds: ReadonlyArray<string>;
  skipped: boolean;
};
export type QuickUpdateAudiencePreferenceMutation$data = {
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
export type QuickUpdateAudiencePreferenceMutation = {
  response: QuickUpdateAudiencePreferenceMutation$data;
  variables: QuickUpdateAudiencePreferenceMutation$variables;
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
    "name": "QuickUpdateAudiencePreferenceMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuickUpdateAudiencePreferenceMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "aa676383a4338d8ced9097a3cca789d6",
    "metadata": {},
    "name": "QuickUpdateAudiencePreferenceMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "93e1be00a050db5d5de64bdd1aceec73";

export default node;
