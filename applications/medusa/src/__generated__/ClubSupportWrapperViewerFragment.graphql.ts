/**
 * @generated SignedSource<<671d21f45e3d36f04210e2d9cbd2c2e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupportWrapperViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubTransactionProcessViewerFragment">;
  readonly " $fragmentType": "ClubSupportWrapperViewerFragment";
};
export type ClubSupportWrapperViewerFragment$key = {
  readonly " $data"?: ClubSupportWrapperViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportWrapperViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupportWrapperViewerFragment",
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

(node as any).hash = "daddb103a4c744bd1d1cf4616cb2e5d4";

export default node;
