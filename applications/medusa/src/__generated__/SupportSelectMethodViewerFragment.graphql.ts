/**
 * @generated SignedSource<<119fcc7b5f095d0fbdcee3ca85a0022e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportSelectMethodViewerFragment$data = {
  readonly savedPaymentMethods: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly __typename: "Account";
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodViewerFragment" | "SelectMethodChoiceViewerFragment">;
  readonly " $fragmentType": "SupportSelectMethodViewerFragment";
};
export type SupportSelectMethodViewerFragment = SupportSelectMethodViewerFragment$data;
export type SupportSelectMethodViewerFragment$key = {
  readonly " $data"?: SupportSelectMethodViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodViewerFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportSelectMethodViewerFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountSavedPaymentMethodConnection",
      "kind": "LinkedField",
      "name": "savedPaymentMethods",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountSavedPaymentMethodEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountSavedPaymentMethod",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewPaymentMethodViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectMethodChoiceViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "fb786bc7887d8cda891b1ef029737181";

export default node;
