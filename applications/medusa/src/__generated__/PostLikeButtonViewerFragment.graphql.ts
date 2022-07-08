/**
 * @generated SignedSource<<5edb36ff1a38f7093ecc33942ed8c5cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonViewerFragment$data = {
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "842bfd7c0d2a945807c4a930d34b180d";

export default node;
