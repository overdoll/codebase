/**
 * @generated SignedSource<<53070308b19d91ece5977c0f2eac3a3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubTransactionProcessViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodViewerFragment">;
  readonly " $fragmentType": "SupportClubTransactionProcessViewerFragment";
};
export type SupportClubTransactionProcessViewerFragment$key = {
  readonly " $data"?: SupportClubTransactionProcessViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubTransactionProcessViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportSelectMethodViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cad775042649ee07e7acc9b540fc5a95";

export default node;
