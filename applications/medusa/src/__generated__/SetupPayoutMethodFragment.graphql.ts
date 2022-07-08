/**
 * @generated SignedSource<<6943e41d2aa97a9ef50683058d753de9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetupPayoutMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SetupPaxumAccountPayoutMethodFragment">;
  readonly " $fragmentType": "SetupPayoutMethodFragment";
};
export type SetupPayoutMethodFragment$key = {
  readonly " $data"?: SetupPayoutMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SetupPayoutMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SetupPayoutMethodFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SetupPaxumAccountPayoutMethodFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "c1b149a5875c9a54dd757363d100ed76";

export default node;
