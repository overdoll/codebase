/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash cf774420a10bf5d7b6ab60ad70f0ebcd */

import { ConcreteRequest } from "relay-runtime";
export type CurationAudienceNextButtonMutationVariables = {
    audienceIds: Array<string>;
    skipped: boolean;
};
export type CurationAudienceNextButtonMutationResponse = {
    readonly updateCurationProfileAudience: {
        readonly curationProfile: {
            readonly id: string;
            readonly completed: boolean;
            readonly audience: {
                readonly skipped: boolean;
                readonly completed: boolean;
                readonly audiences: ReadonlyArray<{
                    readonly id: string;
                }>;
            };
        } | null;
    } | null;
};
export type CurationAudienceNextButtonMutation = {
    readonly response: CurationAudienceNextButtonMutationResponse;
    readonly variables: CurationAudienceNextButtonMutationVariables;
};



/*
mutation CurationAudienceNextButtonMutation(
  $audienceIds: [ID!]!
  $skipped: Boolean!
) {
  updateCurationProfileAudience(input: {audienceIds: $audienceIds, skipped: $skipped}) {
    curationProfile {
      id
      completed
      audience {
        skipped
        completed
        audiences {
          id
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
(node as any).hash = '8d26970b91d67f351c4b21d9e3dc61b0';
export default node;
