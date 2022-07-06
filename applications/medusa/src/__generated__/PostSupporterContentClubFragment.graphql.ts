/**
 * @generated SignedSource<<addf681874f79379fdcf163a47379e66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentClubFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedFragment">;
  readonly " $fragmentType": "PostSupporterContentClubFragment";
};
export type PostSupporterContentClubFragment$key = {
  readonly " $data"?: PostSupporterContentClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentClubFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostSupporterContentLockedFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "37c8399c17dac6cc669dd78752df4e54";

export default node;
