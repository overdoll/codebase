/**
 * @generated SignedSource<<5d6c2df405c56ddadd5303ba8d32dd00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DescriptionPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostViewerFragment">;
  readonly " $fragmentType": "DescriptionPublicPostViewerFragment";
};
export type DescriptionPublicPostViewerFragment$key = {
  readonly " $data"?: DescriptionPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DescriptionPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DescriptionPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPublicPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "a54447a2183020d7d54597ebcd3a4c2a";

export default node;
