/**
 * @generated SignedSource<<493e255e7979dee235c4a35daaf53229>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostFooterButtonsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonViewerFragment" | "PostMenuButtonViewerFragment">;
  readonly " $fragmentType": "PostFooterButtonsViewerFragment";
};
export type PostFooterButtonsViewerFragment$key = {
  readonly " $data"?: PostFooterButtonsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostFooterButtonsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostFooterButtonsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostMenuButtonViewerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "87d77ca330d39b8e262df22610c07dcd";

export default node;
