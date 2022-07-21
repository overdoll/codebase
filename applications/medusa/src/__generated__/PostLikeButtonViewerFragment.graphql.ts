/**
 * @generated SignedSource<<d45f9047e3431828fde724aff96a656e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "PostLikeButtonViewerFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "PostLikeButtonViewerFragment";
};
export type PostLikeButtonViewerFragment$key = {
  readonly " $data"?: PostLikeButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeButtonViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e3233293d702dd3d331ebbdb2b1e59fa";

export default node;
