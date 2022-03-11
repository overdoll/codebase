/**
 * @generated SignedSource<<91d2e4c176eb912d78968083e7c1d17b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminSearchRulesFragment$data = {
  readonly rules: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly reference: string;
        readonly " $fragmentSpreads": FragmentRefs<"RuleTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "AdminSearchRulesFragment";
};
export type AdminSearchRulesFragment = AdminSearchRulesFragment$data;
export type AdminSearchRulesFragment$key = {
  readonly " $data"?: AdminSearchRulesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminSearchRulesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "rules"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./AdminSearchRulesPaginationFragment.graphql')
    }
  },
  "name": "AdminSearchRulesFragment",
  "selections": [
    {
      "alias": "rules",
      "args": null,
      "concreteType": "RuleConnection",
      "kind": "LinkedField",
      "name": "__AdminRulesConnection_rules_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RuleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Rule",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "reference",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RuleTileOverlayFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "f285adde0d36615808899e46260ea62c";

export default node;
