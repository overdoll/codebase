/**
 * @generated SignedSource<<96ed03039073565a17db081e4f180fea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostUpdateDescriptionFragment$data = {
  readonly description: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionModalFragment">;
  readonly " $fragmentType": "PostUpdateDescriptionFragment";
};
export type PostUpdateDescriptionFragment$key = {
  readonly " $data"?: PostUpdateDescriptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostUpdateDescriptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostUpdateDescriptionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionModalFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "618b2202a9002ba16535ac43875f1462";

export default node;
