/**
 * @generated SignedSource<<65e0cda705f9a9dc5dc5fa9363251d64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutMethodSetupFlowFragment$data = {
  readonly details: {
    readonly country: {
      readonly " $fragmentSpreads": FragmentRefs<"ChoosePayoutMethodFragment">;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"SetupPayoutMethodFragment">;
  readonly " $fragmentType": "PayoutMethodSetupFlowFragment";
};
export type PayoutMethodSetupFlowFragment$key = {
  readonly " $data"?: PayoutMethodSetupFlowFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutMethodSetupFlowFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutMethodSetupFlowFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "AccountDetails",
        "kind": "LinkedField",
        "name": "details",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "concreteType": "Country",
              "kind": "LinkedField",
              "name": "country",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ChoosePayoutMethodFragment"
                }
              ],
              "storageKey": null
            },
            "action": "THROW",
            "path": "details.country"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "details"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SetupPayoutMethodFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "16413067a979aab630c63bf858ab56ba";

export default node;
