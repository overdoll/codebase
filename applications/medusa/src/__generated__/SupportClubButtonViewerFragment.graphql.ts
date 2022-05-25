/**
 * @generated SignedSource<<bf3cc3997aef6356432bdc241418cf7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessViewerFragment">;
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
};
export type SupportClubButtonViewerFragment = SupportClubButtonViewerFragment$data;
export type SupportClubButtonViewerFragment$key = {
  readonly " $data"?: SupportClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubButtonViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SupportClubTransactionProcessViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b09111e12d636bf9a764d5eebc74d12f";

export default node;
