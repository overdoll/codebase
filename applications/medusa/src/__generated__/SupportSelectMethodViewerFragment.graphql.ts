/**
 * @generated SignedSource<<c6fd54543f9f8fbcf9bd99d57e7c4204>>
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
  readonly " $fragmentSpreads": FragmentRefs<"SelectMethodChoiceViewerFragment" | "SavedPaymentMethodViewerFragment" | "NewPaymentMethodViewerFragment">;
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
      "name": "SelectMethodChoiceViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavedPaymentMethodViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NewPaymentMethodViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();

(node as any).hash = "d60bfc66eadec2c683ab2378bd7029a8";

export default node;
