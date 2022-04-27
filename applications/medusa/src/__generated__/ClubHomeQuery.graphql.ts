/**
 * @generated SignedSource<<8ac325fcb98d235593f7ec890e4506e2>>
 * @relayHash b48bab5efa7c32ff1ac8e379ba76ff72
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b48bab5efa7c32ff1ac8e379ba76ff72

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHomeQuery$variables = {
  slug: string;
};
export type ClubHomeQueryVariables = ClubHomeQuery$variables;
export type ClubHomeQuery$data = {
  readonly club: {
    readonly name: string;
    readonly membersCount: number;
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubBalanceFragment" | "ClubPayoutMethodAlertFragment">;
  } | null;
};
export type ClubHomeQueryResponse = ClubHomeQuery$data;
export type ClubHomeQuery = {
  variables: ClubHomeQueryVariables;
  response: ClubHomeQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "membersCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerIsOwner",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
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
    "name": "ClubHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LargeClubHeaderFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubBalanceFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPayoutMethodAlertFragment"
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
    "name": "ClubHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "thumbnail",
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
                  (v5/*: any*/),
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
                  (v5/*: any*/)
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
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Balance",
            "kind": "LinkedField",
            "name": "balance",
            "plural": false,
            "selections": [
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
              (v6/*: any*/)
            ],
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
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "payoutMethod",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "type": "AccountPaxumPayoutMethod",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b48bab5efa7c32ff1ac8e379ba76ff72",
    "metadata": {},
    "name": "ClubHomeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "76e6e6601db7c6f2ad5133ed7ece7a9e";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
