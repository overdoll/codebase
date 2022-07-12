/**
 * @generated SignedSource<<53045fb70c6ca771f8ce6af19ae30bf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupportClubButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubModalViewerFragment">;
  readonly " $fragmentType": "SupportClubButtonViewerFragment";
};
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
      "name": "SupportClubModalViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "8f62c1a4013dfb397a6ce76b0de09fc8";

export default node;
