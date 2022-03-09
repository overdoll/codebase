/**
 * @generated SignedSource<<011ac5e78993ab286dce4542140ea88a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClosePaymentModalButtonFragment$data = {
  readonly savedPaymentMethods: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: string;
      };
    }>;
  };
  readonly " $fragmentType": "ClosePaymentModalButtonFragment";
};
export type ClosePaymentModalButtonFragment = ClosePaymentModalButtonFragment$data;
export type ClosePaymentModalButtonFragment$key = {
  readonly " $data"?: ClosePaymentModalButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClosePaymentModalButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClosePaymentModalButtonFragment",
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c220f0b999ac7fb7d0319ffde3dc80c8";

export default node;
