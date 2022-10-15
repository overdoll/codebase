/**
 * @generated SignedSource<<f25fb2de8b30f67ce99049be6fa5ea84>>
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
        readonly __typename: "AccountSavedPaymentMethod";
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPaymentMethodFragment" | "SavedPaymentMethodViewerFragment" | "SelectMethodChoiceViewerFragment">;
  readonly " $fragmentType": "SupportSelectMethodViewerFragment";
};
export type SupportSelectMethodViewerFragment$key = {
  readonly " $data"?: SupportSelectMethodViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportSelectMethodViewerFragment",
  "selections": [
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
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
      "name": "HeaderPaymentMethodFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "fb3d1bc70869c7c95832d7408410eddb";

export default node;
