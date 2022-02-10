/**
 * @generated SignedSource<<b2ed6eb299a8baa166068f17d47ac917>>
 * @relayHash f87375f46093693974320541c25ad564
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f87375f46093693974320541c25ad564

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateClubValidation = "SLUG_TAKEN" | "%future added value";
export type CreateClubFormMutation$variables = {
  name: string;
  slug: string;
  connections: ReadonlyArray<string>;
};
export type CreateClubFormMutationVariables = CreateClubFormMutation$variables;
export type CreateClubFormMutation$data = {
  readonly createClub: {
    readonly club: {
      readonly id: string;
      readonly slug: string;
      readonly name: string;
      readonly owner: {
        readonly id: string;
      };
    } | null;
    readonly validation: CreateClubValidation | null;
  } | null;
};
export type CreateClubFormMutationResponse = CreateClubFormMutation$data;
export type CreateClubFormMutation = {
  variables: CreateClubFormMutationVariables;
  response: CreateClubFormMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v3 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        (v4/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateClubPayload",
        "kind": "LinkedField",
        "name": "createClub",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CreateClubPayload",
        "kind": "LinkedField",
        "name": "createClub",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "club",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createClubPrimaryEdge"
              }
            ]
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f87375f46093693974320541c25ad564",
    "metadata": {},
    "name": "CreateClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "030f1a6bd72a51940a30905dcaafc1f9";

export default node;
