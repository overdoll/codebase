/**
 * @generated SignedSource<<d14c139eaa3120faf107455e120d5e93>>
 * @relayHash 68da0474b2e4fcb274103c18742a4b23
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 68da0474b2e4fcb274103c18742a4b23

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffPayoutQuery$variables = {
  reference: string;
};
export type StaffPayoutQueryVariables = StaffPayoutQuery$variables;
export type StaffPayoutQuery$data = {
  readonly payout: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffClubPayoutCardFragment" | "StaffPayoutOptionsFragment">;
  } | null;
};
export type StaffPayoutQueryResponse = StaffPayoutQuery$data;
export type StaffPayoutQuery = {
  variables: StaffPayoutQueryVariables;
  response: StaffPayoutQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffClubPayoutCardFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPayoutOptionsFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "amount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depositDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "payoutAccount",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "urls",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mimeType",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "videoThumbnail",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "68da0474b2e4fcb274103c18742a4b23",
    "metadata": {},
    "name": "StaffPayoutQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5731da874ec6f4824005d0b9b7d42e19";

export default node;
