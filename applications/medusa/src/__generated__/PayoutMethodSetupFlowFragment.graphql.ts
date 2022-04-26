/**
 * @generated SignedSource<<5d529fce2b3ebd0bbf0107424f85baad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutMethodSetupFlowFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChoosePayoutMethodFragment">;
  readonly " $fragmentType": "PayoutMethodSetupFlowFragment";
};
export type PayoutMethodSetupFlowFragment = PayoutMethodSetupFlowFragment$data;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChoosePayoutMethodFragment"
    }
  ],
  "type": "Country",
  "abstractKey": null
};

(node as any).hash = "fc0a976be223248e5c19c71e302e3c51";

export default node;
